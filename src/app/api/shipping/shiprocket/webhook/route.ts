import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdminClient } from '@/lib/commerce/order-storage';
import { isSesConfigured, sendShippingNotificationEmail } from '@/lib/integrations';

function tokensEqual(provided: string, expected: string): boolean {
  // Hash both so the comparison is constant-time regardless of length.
  const a = crypto.createHash('sha256').update(provided).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

/** Only trust tracking links that point at Shiprocket; anything else would end up in customer emails. */
function safeTrackingUrl(value: unknown, awbCode: unknown): string | undefined {
  if (typeof value === 'string') {
    try {
      const u = new URL(value);
      const host = u.hostname.toLowerCase();
      const isShiprocket = ['shiprocket.co', 'shiprocket.in'].some((d) => host === d || host.endsWith(`.${d}`));
      if (u.protocol === 'https:' && isShiprocket) return u.toString();
    } catch {
      // fall through
    }
  }
  if (typeof awbCode === 'string' || typeof awbCode === 'number') {
    return `https://shiprocket.co/tracking/${encodeURIComponent(String(awbCode))}`;
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    // Shared-secret verification is mandatory: fail closed when it isn't configured.
    // Configure the same value as the "Token" in Shiprocket → Settings → API → Webhooks
    // (Shiprocket sends it in the x-api-key header).
    const expectedToken = process.env.SHIPROCKET_WEBHOOK_TOKEN || process.env.SHIPROCKET_WEBHOOK_SECRET;
    if (!expectedToken) {
      console.error('[Shiprocket Status Update] SHIPROCKET_WEBHOOK_TOKEN is not configured; rejecting webhook.');
      return NextResponse.json(
        { success: false, error: 'Webhook not configured' },
        { status: 503 }
      );
    }

    const authHeader = req.headers.get('authorization');
    const providedToken =
      req.headers.get('x-api-key') ||
      (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);

    if (!providedToken || !tokensEqual(providedToken, expectedToken)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized status update request' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Extract Shiprocket shipment/order update attributes
    const channelOrderId =
      body.channel_order_id ||
      body.order_id ||
      body.custom_order_id ||
      body.order_ref;
    const awbCode = body.awb || body.awb_code || body.airway_bill_no;
    const courierName = body.courier_name || body.courier || 'Shiprocket Logistics';
    const rawStatus = (
      body.current_status ||
      body.status ||
      body.shipment_status ||
      body.order_status ||
      ''
    ).toUpperCase();
    const trackingUrl = safeTrackingUrl(body.tracking_url, awbCode);

    let mappedStatus = 'processing';
    if (rawStatus.includes('DELIVERED')) {
      mappedStatus = 'delivered';
    } else if (rawStatus.includes('OUT FOR DELIVERY')) {
      mappedStatus = 'out_for_delivery';
    } else if (
      rawStatus.includes('IN TRANSIT') ||
      rawStatus.includes('SHIPPED') ||
      rawStatus.includes('PICKED UP') ||
      rawStatus.includes('DISPATCHED')
    ) {
      mappedStatus = 'dispatched';
    } else if (
      rawStatus.includes('AWB ASSIGNED') ||
      rawStatus.includes('LABEL GENERATED') ||
      rawStatus.includes('READY TO SHIP') ||
      rawStatus.includes('PICKUP SCHEDULED')
    ) {
      mappedStatus = 'preparing';
    } else if (rawStatus.includes('CANCEL')) {
      mappedStatus = 'cancelled';
    } else if (rawStatus.includes('RTO') || rawStatus.includes('RETURN')) {
      mappedStatus = 'return_initiated';
    }

    const supabase = getSupabaseAdminClient();

    // Query order record
    let query = supabase.from('TreelEcommerce.checkouts').select('*');
    if (channelOrderId) {
      query = query.eq('_id', channelOrderId);
    } else if (awbCode) {
      query = query.eq('awb_code', awbCode);
    } else {
      return NextResponse.json(
        { success: false, error: 'Missing order_id or awb identifier' },
        { status: 400 }
      );
    }

    const { data: existingOrders } = await query.limit(1);
    const existingOrder = existingOrders && existingOrders.length > 0 ? existingOrders[0] : null;

    if (existingOrder) {
      const orderId = existingOrder._id;
      const updateData: Record<string, any> = {
        status: mappedStatus,
      };

      if (awbCode) updateData.awb_code = awbCode;
      if (courierName) updateData.courier_name = courierName;
      if (trackingUrl) updateData.tracking_url = trackingUrl;

      await supabase
        .from('TreelEcommerce.checkouts')
        .update(updateData)
        .eq('_id', orderId);

      // Trigger dispatch notification email when transitioned to dispatched / in-transit
      if (
        (mappedStatus === 'dispatched' || mappedStatus === 'out_for_delivery') &&
        isSesConfigured() &&
        existingOrder.contact &&
        existingOrder.status !== mappedStatus
      ) {
        try {
          const customerName = `${existingOrder.firstname || ''} ${existingOrder.lastname || ''}`.trim() || 'Valued Customer';
          await sendShippingNotificationEmail({
            customerName,
            customerEmail: existingOrder.contact,
            orderId,
            courierName: courierName || 'Shiprocket Partner Carrier',
            awbCode: awbCode || 'N/A',
            trackingUrl,
          });
        } catch (emailErr) {
          console.error('[Shiprocket Status Update] Shipping notification email error:', emailErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Shiprocket status update processed successfully',
      mappedStatus,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown status update error';
    console.error('[Shiprocket Status Update Exception]', message);
    return NextResponse.json(
      { success: false, error: 'Failed to process status update' },
      { status: 500 }
    );
  }
}
