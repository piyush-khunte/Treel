import { NextRequest, NextResponse } from 'next/server';
import { isRazorpayConfigured, verifyPaymentSignature } from '@/lib/integrations';
import { persistOrderToSupabase, getSupabaseAdminClient } from '@/lib/commerce/order-storage';

export async function POST(req: NextRequest) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error: {
          code: 'SERVICE_NOT_CONFIGURED',
          message: 'Razorpay payment verification is disabled. Server credentials are not configured.',
        },
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, checkout } = body;

    // 1. Verify Razorpay HMAC signature
    const result = verifyPaymentSignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!result.success) {
      const status = result.error?.code === 'AUTHENTICATION_FAILED' ? 400 : 500;
      return NextResponse.json(result, { status });
    }

    // 2. Prevent duplicate processing if payment_id already recorded
    const supabase = getSupabaseAdminClient();
    const { data: existingPayment } = await supabase
      .from('TreelEcommerce.payments')
      .select('_id, order_id')
      .eq('payment_id', razorpay_payment_id)
      .maybeSingle();

    if (existingPayment) {
      return NextResponse.json(
        {
          success: true,
          configured: true,
          data: {
            verified: true,
            orderId: existingPayment.order_id,
            paymentId: razorpay_payment_id,
          },
        },
        { status: 200 }
      );
    }

    // 3. Persist order & payment record to Supabase
    let orderRef = `TRL-ORD-${Date.now().toString().slice(-6)}`;
    if (checkout) {
      const saveRes = await persistOrderToSupabase({
        checkout: {
          ...checkout,
          paymentMethod: 'online',
        },
        status: 'processing',
        paymentInfo: {
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          amount: Number(checkout.totalInr) || 0,
        },
      });

      if (saveRes.success) {
        orderRef = saveRes.orderId;
      }
    }

    return NextResponse.json(
      {
        success: true,
        configured: true,
        data: {
          verified: true,
          orderId: orderRef,
          paymentId: razorpay_payment_id,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid request payload';
    return NextResponse.json(
      {
        success: false,
        configured: true,
        error: {
          code: 'VALIDATION_ERROR',
          message,
        },
      },
      { status: 400 }
    );
  }
}
