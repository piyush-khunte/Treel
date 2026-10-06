import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/commerce/order-storage';
import { isSesConfigured, sendShippingNotificationEmail } from '@/lib/integrations';

export async function POST(req: NextRequest) {
  try {
    // Optional secret verification if SHIPROCKET_WEBHOOK_TOKEN is configured
    const expectedToken = process.env.SHIPROCKET_WEBHOOK_TOKEN || process.env.SHIPROCKET_WEBHOOK_SECRET;
    if (expectedToken) {
      const headerToken =
        req.headers.get('x-api-key') ||
        req.headers.get('authorization')?.replace('Bearer ', '') ||
        new URL(req.url).searchParams.get('token');

      if (!headerToken || headerToken !== expectedToken) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized webhook request' },
          { status: 401 }
        );
      }
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
    const trackingUrl =
      body.tracking_url ||
      (awbCode ? `https://shiprocket.co/tracking/${awbCode}` : undefined);

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
            trackingUrl: trackingUrl || (awbCode ? `https://shiprocket.co/tracking/${awbCode}` : undefined),
          });
        } catch (emailErr) {
          console.error('[Shiprocket Webhook] Shipping notification email error:', emailErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Shiprocket webhook processed successfully',
      mappedStatus,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown webhook error';
    console.error('[Shiprocket Webhook Exception]', message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
