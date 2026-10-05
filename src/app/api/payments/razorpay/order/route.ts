import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder, isRazorpayConfigured } from '@/lib/integrations';

export async function GET() {
  const configured = isRazorpayConfigured();
  return NextResponse.json({
    service: 'razorpay',
    configured,
    status: configured ? 'active' : 'disabled',
    message: configured
      ? 'Razorpay credentials configured.'
      : 'Razorpay integration disabled: missing credentials.',
  });
}

export async function POST(req: NextRequest) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error: {
          code: 'SERVICE_NOT_CONFIGURED',
          message: 'Razorpay payment service is currently disabled. Server credentials are not configured.',
        },
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();

    let amountInPaise = 0;
    if (Array.isArray(body.items) && body.items.length > 0) {
      const subtotal = body.items.reduce((acc: number, it: any) => {
        const p = Number(it.price_inr || it.price) || 0;
        const q = Number(it.quantity) || 1;
        return acc + p * q;
      }, 0);
      let discount = 0;
      const coupon = (body.couponCode || '').trim().toUpperCase();
      if (coupon === 'TREEL10' || coupon === 'WELCOME10') {
        discount = Math.round((subtotal * 10) / 100);
      } else if (coupon === 'FREESHIP') {
        discount = Math.round((subtotal * 5) / 100);
      }
      const total = Math.max(1, subtotal - discount);
      amountInPaise = Math.round(total * 100);
    } else if (typeof body.amountInPaise === 'number' && body.amountInPaise > 0) {
      amountInPaise = Math.round(body.amountInPaise);
    } else if (typeof body.amount === 'number' && body.amount > 0) {
      // Amount in INR converted to paise
      amountInPaise = Math.round(body.amount * 100);
    } else {
      return NextResponse.json(
        {
          success: false,
          configured: true,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Cart items or valid order amount are required.',
          },
        },
        { status: 400 }
      );
    }

    const receipt = body.receipt || `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const result = await createRazorpayOrder({
      amount: amountInPaise,
      currency: body.currency || 'INR',
      receipt,
      notes: {
        customer_name: body.customer?.fullName || body.fullName || '',
        customer_phone: body.customer?.phone || body.phone || '',
        customer_email: body.customer?.email || body.email || '',
        ...(body.notes || {}),
      },
    });

    if (!result.success) {
      const status = result.error?.code === 'SERVICE_NOT_CONFIGURED' ? 503 : 400;
      return NextResponse.json(result, { status });
    }

    return NextResponse.json(result, { status: 200 });
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
