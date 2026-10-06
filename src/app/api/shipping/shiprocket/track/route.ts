import { NextRequest, NextResponse } from 'next/server';
import { isShiprocketConfigured, trackShipment } from '@/lib/integrations';
import { getSupabaseAdminClient } from '@/lib/commerce/order-storage';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const awbCode = searchParams.get('awb') || searchParams.get('awbCode') || undefined;
  const orderId = searchParams.get('orderId') || searchParams.get('order_id') || undefined;
  const email = searchParams.get('email') || searchParams.get('contact') || undefined;

  // 1. If orderId or email is provided, check database first
  let dbOrder: any = null;
  if (orderId) {
    try {
      const supabase = getSupabaseAdminClient();
      let query = supabase.from('TreelEcommerce.checkouts').select('*').eq('_id', orderId);
      if (email) {
        query = query.ilike('contact', email.trim());
      }
      const { data } = await query.limit(1);
      if (data && data.length > 0) {
        dbOrder = data[0];
      }
    } catch (dbErr) {
      console.error('[Track Route] DB query error:', dbErr);
    }
  }

  const effectiveAwb = awbCode || dbOrder?.awb_code;
  const effectiveOrderId = orderId || dbOrder?._id;

  // 2. If Shiprocket is configured and we have AWB or order ID, attempt carrier tracking
  let shiprocketData: any = null;
  if (isShiprocketConfigured() && (effectiveAwb || effectiveOrderId)) {
    try {
      const res = await trackShipment({ awbCode: effectiveAwb, orderId: effectiveOrderId });
      if (res.success && res.data) {
        shiprocketData = res.data;
      }
    } catch (trackErr) {
      console.error('[Track Route] Shiprocket API tracking error:', trackErr);
    }
  }

  // 3. If we found a DB order or Shiprocket data, synthesize the response
  if (dbOrder || shiprocketData) {
    const rawStatus = (shiprocketData?.current_status || dbOrder?.status || 'processing').toLowerCase();
    let status = 'preparing';
    let statusLabel = 'Preparing to Ship';

    if (rawStatus.includes('delivered')) {
      status = 'delivered';
      statusLabel = 'Delivered';
    } else if (rawStatus.includes('out_for_delivery') || rawStatus.includes('out for delivery')) {
      status = 'out_for_delivery';
      statusLabel = 'Out for Delivery';
    } else if (rawStatus.includes('dispatched') || rawStatus.includes('in transit') || rawStatus.includes('shipped')) {
      status = 'dispatched';
      statusLabel = 'Dispatched & In Transit';
    } else if (rawStatus.includes('placed') || rawStatus.includes('pending')) {
      status = 'placed';
      statusLabel = 'Order Placed';
    } else if (rawStatus.includes('return')) {
      status = 'return_initiated';
      statusLabel = 'Return Initiated';
    }

    const orderDate = dbOrder?.date
      ? new Date(dbOrder.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      : 'Recently Placed';

    const productName = dbOrder?.['cartData[0].title'] || 'Personal TPMS (Smart Sensor Kit)';
    const quantity = dbOrder?.['cartData[0].quantity'] || 1;
    const totalAmount = dbOrder?.price || 8999;
    const shippingAddress = dbOrder
      ? `${dbOrder.address || ''}${dbOrder.addressoptional ? `, ${dbOrder.addressoptional}` : ''}, ${dbOrder.city || ''}, ${dbOrder.state || ''} ${dbOrder.pin || ''}`.trim()
      : 'Shipping Address on File';

    const carrier = dbOrder?.courier_name || shiprocketData?.courier_name || 'Shiprocket Express Logistics';
    const finalAwb = effectiveAwb || 'SR-' + (orderId ? orderId.replace(/\D/g, '').slice(-8) : 'PENDING');
    const courierUrl = dbOrder?.tracking_url || (finalAwb ? `https://shiprocket.co/tracking/${finalAwb}` : 'https://www.shiprocket.in');

    const steps = [
      {
        title: 'Order Placed',
        date: orderDate,
        completed: true,
        current: status === 'placed',
      },
      {
        title: 'Preparing to Ship',
        date: status === 'placed' ? 'In Progress' : orderDate,
        completed: status !== 'placed',
        current: status === 'preparing',
      },
      {
        title: 'Dispatched',
        date: status === 'dispatched' || status === 'out_for_delivery' || status === 'delivered' ? 'In Transit' : 'Pending',
        completed: status === 'dispatched' || status === 'out_for_delivery' || status === 'delivered',
        current: status === 'dispatched',
      },
      {
        title: 'Out for Delivery',
        date: status === 'out_for_delivery' || status === 'delivered' ? 'Out with Courier' : 'Expected soon',
        completed: status === 'out_for_delivery' || status === 'delivered',
        current: status === 'out_for_delivery',
      },
      {
        title: 'Delivered',
        date: status === 'delivered' ? 'Delivered' : 'Pending',
        completed: status === 'delivered',
        current: status === 'delivered',
      },
    ];

    return NextResponse.json({
      success: true,
      configured: isShiprocketConfigured(),
      data: {
        orderId: effectiveOrderId || orderId || 'TRL-ORDER',
        orderDate,
        status,
        statusLabel,
        estimatedDelivery: status === 'delivered' ? 'Delivered' : '3-5 Business Days',
        productName,
        quantity,
        totalAmount,
        shippingAddress,
        carrier,
        awbNumber: finalAwb,
        courierUrl,
        steps,
        shiprocket: shiprocketData || undefined,
      },
    });
  }

  // If no DB record or live Shiprocket data was found:
  if (!orderId && !awbCode) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Please provide an order ID or AWB code to track.',
        },
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'ORDER_NOT_FOUND',
        message: "We couldn't find an order matching that order number and email. Please check your confirmation email.",
      },
    },
    { status: 404 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderId = body.orderId || body.order_id;
    const awbCode = body.awbCode || body.awb;
    const email = body.email || body.contact;

    const url = new URL(req.url);
    if (orderId) url.searchParams.set('orderId', orderId);
    if (awbCode) url.searchParams.set('awb', awbCode);
    if (email) url.searchParams.set('email', email);

    const getReq = new NextRequest(url.toString(), { method: 'GET', headers: req.headers });
    return GET(getReq);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid request payload';
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message,
        },
      },
      { status: 400 }
    );
  }
}

