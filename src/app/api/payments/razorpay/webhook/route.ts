import { NextRequest, NextResponse } from 'next/server';
import { isRazorpayWebhookConfigured, verifyWebhookSignature } from '@/lib/integrations';

export async function POST(req: NextRequest) {
  if (!isRazorpayWebhookConfigured()) {
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error: {
          code: 'SERVICE_NOT_CONFIGURED',
          message: 'Razorpay webhook handler is disabled. RAZORPAY_WEBHOOK_SECRET is not configured.',
        },
      },
      { status: 503 }
    );
  }

  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing x-razorpay-signature header.',
          },
        },
        { status: 400 }
      );
    }

    const verificationResult = verifyWebhookSignature({ rawBody, signature });
    if (!verificationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'AUTHENTICATION_FAILED',
            message: 'Invalid webhook signature.',
          },
        },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);

    // Process webhook events safely (e.g. payment.captured, payment.failed, order.paid)
    // Production event routing can hook in here once credentials are live
    console.log(`[Razorpay Webhook Verified] Event: ${event.event}, Entity ID: ${event.payload?.payment?.entity?.id || 'N/A'}`);

    return NextResponse.json({ received: true, event: event.event }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error handling webhook';
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'EXTERNAL_API_ERROR',
          message,
        },
      },
      { status: 500 }
    );
  }
}
