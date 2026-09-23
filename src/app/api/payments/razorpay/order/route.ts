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
    const result = await createRazorpayOrder(body);

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
