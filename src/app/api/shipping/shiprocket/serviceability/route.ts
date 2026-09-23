import { NextRequest, NextResponse } from 'next/server';
import { checkServiceability, isShiprocketConfigured } from '@/lib/integrations';

export async function GET(req: NextRequest) {
  if (!isShiprocketConfigured()) {
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error: {
          code: 'SERVICE_NOT_CONFIGURED',
          message: 'Shiprocket logistics service is currently disabled. Server credentials are not configured.',
        },
      },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(req.url);
  const pickup_postcode = searchParams.get('pickup_postcode') || '';
  const delivery_postcode = searchParams.get('delivery_postcode') || '';
  const weight = searchParams.get('weight') ? parseFloat(searchParams.get('weight')!) : 0.5;
  const cod = searchParams.get('cod') === '1' ? 1 : 0;

  const result = await checkServiceability({
    pickup_postcode,
    delivery_postcode,
    weight,
    cod,
  });

  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}

export async function POST(req: NextRequest) {
  if (!isShiprocketConfigured()) {
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error: {
          code: 'SERVICE_NOT_CONFIGURED',
          message: 'Shiprocket logistics service is currently disabled. Server credentials are not configured.',
        },
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const result = await checkServiceability(body);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
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
