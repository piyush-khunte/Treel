import { NextRequest, NextResponse } from 'next/server';
import { persistOrderToSupabase } from '@/lib/commerce/order-storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { checkout } = body;

    if (!checkout || !checkout.fullName || !checkout.phone || !checkout.address || !checkout.city || !checkout.pincode) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Incomplete checkout information. All address fields and contact details are required.',
          },
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(checkout.items) || checkout.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Cart is empty.',
          },
        },
        { status: 400 }
      );
    }

    // Persist COD order to Supabase
    const saveRes = await persistOrderToSupabase({
      checkout: {
        ...checkout,
        paymentMethod: 'cod',
      },
      status: 'pending', // COD is pending payment on delivery
    });

    if (!saveRes.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: saveRes.error || 'Failed to save order to database.',
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          orderId: saveRes.orderId,
          paymentMethod: 'cod',
          status: 'pending',
        },
      },
      { status: 200 }
    );
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
