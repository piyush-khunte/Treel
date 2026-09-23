import { NextRequest, NextResponse } from 'next/server';
import { isShiprocketConfigured, trackShipment } from '@/lib/integrations';

export async function GET(req: NextRequest) {
  if (!isShiprocketConfigured()) {
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error: {
          code: 'SERVICE_NOT_CONFIGURED',
          message: 'Shiprocket tracking service is currently disabled. Server credentials are not configured.',
        },
      },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(req.url);
  const awbCode = searchParams.get('awb') || searchParams.get('awbCode') || undefined;
  const orderId = searchParams.get('orderId') || searchParams.get('order_id') || undefined;

  const result = await trackShipment({ awbCode, orderId });
  const status = result.success ? 200 : result.error?.code === 'SERVICE_NOT_CONFIGURED' ? 503 : 400;
  return NextResponse.json(result, { status });
}

export async function POST(req: NextRequest) {
  if (!isShiprocketConfigured()) {
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error: {
          code: 'SERVICE_NOT_CONFIGURED',
          message: 'Shiprocket tracking service is currently disabled. Server credentials are not configured.',
        },
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const result = await trackShipment(body);
    const status = result.success ? 200 : result.error?.code === 'SERVICE_NOT_CONFIGURED' ? 503 : 400;
    return NextResponse.json(result, { status });
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
