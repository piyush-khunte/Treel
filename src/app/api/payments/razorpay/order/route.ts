import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder, isRazorpayConfigured } from '@/lib/integrations';
import { priceCartServer } from '@/lib/commerce/server-pricing';
import { validateCartBrandServer } from '@/lib/commerce/brand-validator';
import { cartFingerprint } from '@/lib/commerce/order-storage';

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
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, configured: true, error: { code: 'VALIDATION_ERROR', message: 'Invalid request payload.' } },
        { status: 400 }
      );
    }

    // Enforce strict server-side brand validation
    if (Array.isArray(body.items) && body.items.length > 0) {
      const brandValidation = validateCartBrandServer(body.items, body.brand);
      if (!brandValidation.valid) {
        return NextResponse.json(
          {
            success: false,
            configured: true,
            error: {
              code: brandValidation.code || 'CART_BRAND_CONTAMINATION',
              message: brandValidation.error || 'Cart items do not match the requested storefront brand.',
            },
          },
          { status: 400 }
        );
      }
    }

    // Price the cart entirely server-side (catalogue prices, validated quantities, re-validated coupon).
    // Client-supplied prices, totals and raw amounts are ignored.
    const priced = await priceCartServer(body.items, body.couponCode);
    if (!priced.ok) {
      return NextResponse.json(
        { success: false, configured: true, error: { code: priced.code, message: priced.message } },
        { status: priced.status }
      );
    }
    const amountInPaise = Math.round(priced.totalInr * 100);

    // Client notes are informational only: short strings, never overriding the verified fields below.
    const clientNotes: Record<string, string> = {};
    if (body.notes && typeof body.notes === 'object') {
      for (const [k, v] of Object.entries(body.notes).slice(0, 5)) {
        if (typeof v === 'string' || typeof v === 'number') clientNotes[String(k).slice(0, 40)] = String(v).slice(0, 200);
      }
    }

    const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const result = await createRazorpayOrder({
      amount: amountInPaise,
      currency: 'INR',
      receipt,
      notes: {
        ...clientNotes,
        customer_name: String(body.customer?.fullName || body.fullName || '').slice(0, 200),
        customer_phone: String(body.customer?.phone || body.phone || '').slice(0, 20),
        customer_email: String(body.customer?.email || body.email || '').slice(0, 200),
        brand: priced.brand,
        verified_total_inr: String(priced.totalInr),
        coupon_code: priced.couponCode,
        // Binds this payment to exactly these items; re-checked in /verify.
        cart_fp: cartFingerprint(priced.items, priced.couponCode),
      },
    });

    if (!result.success) {
      const status = result.error?.code === 'SERVICE_NOT_CONFIGURED' ? 503 : 400;
      return NextResponse.json(result, { status });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error('[Razorpay Order] Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        configured: true,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request payload',
        },
      },
      { status: 400 }
    );
  }
}
