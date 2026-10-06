import { NextRequest, NextResponse } from 'next/server';
import { persistOrderToSupabase } from '@/lib/commerce/order-storage';
import { syncOrderToShiprocket } from '@/lib/commerce/shiprocket-order-sync';
import { isSesConfigured, sendOrderConfirmationEmail, sendEmail } from '@/lib/integrations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { checkout } = body;

    if (
      !checkout ||
      !checkout.fullName ||
      !checkout.phone ||
      !checkout.address ||
      !checkout.city ||
      !checkout.pincode
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message:
              'Incomplete checkout information. All address fields and contact details are required.',
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

    // 1. Primary Operation: Persist COD order to Supabase
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

    const orderId = saveRes.orderId;

    // 2. Logistics Pipeline: Trigger Shiprocket if configured
    let shiprocketSync: any = null;
    try {
      shiprocketSync = await syncOrderToShiprocket({
        orderId,
        checkout: {
          ...checkout,
          paymentMethod: 'cod',
        },
        paymentMethod: 'cod',
      });
    } catch (shipErr) {
      console.error('[COD Order] Shiprocket dispatch error:', shipErr);
    }

    // 3. Email Pipeline: Trigger Amazon SES order confirmation if configured
    if (isSesConfigured() && checkout.email) {
      try {
        const orderItems = (checkout.items || []).map((it: any) => ({
          name: it.name || it.title || 'Treel Smart Tyre Sensor Kit',
          quantity: Number(it.quantity) || 1,
          price: Number(it.price_inr || it.price) || 0,
        }));

        await sendOrderConfirmationEmail({
          customerName: checkout.fullName,
          customerEmail: checkout.email,
          orderId,
          items: orderItems,
          total: Number(checkout.totalInr) || 0,
          shippingAddress: {
            address1: checkout.address,
            address2: checkout.addressoptional || '',
            city: checkout.city,
            state: checkout.state || 'Maharashtra',
            pincode: checkout.pincode,
          },
        });

        // Also notify admin store operations if SES_TO_EMAIL / SES_LEADS_EMAIL is set
        const adminEmail = process.env.SES_TO_EMAIL || process.env.SES_LEADS_EMAIL;
        if (adminEmail && adminEmail !== checkout.email) {
          const adminNoticeHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
              <h2 style="color: #0284c7;">New Cash on Delivery (COD) Order Placed</h2>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Customer:</strong> ${checkout.fullName} (${checkout.phone}, ${checkout.email})</p>
              <p><strong>Total Amount:</strong> ₹${Number(checkout.totalInr).toLocaleString('en-IN')}</p>
              <p><strong>Destination:</strong> ${checkout.city}, ${checkout.state} (${checkout.pincode})</p>
              <p><strong>Status:</strong> Pending Delivery &amp; Collection</p>
            </div>
          `;
          await sendEmail({
            to: adminEmail,
            subject: `[New COD Order] ${orderId} — ₹${Number(checkout.totalInr).toLocaleString('en-IN')} (${checkout.fullName})`,
            html: adminNoticeHtml,
            replyTo: checkout.email,
          });
        }
      } catch (mailErr) {
        console.error('[COD Order] Amazon SES email dispatch error:', mailErr);
      }
    }

    // 4. Return Success Response
    return NextResponse.json(
      {
        success: true,
        data: {
          orderId,
          paymentMethod: 'cod',
          status: 'pending',
          shiprocket: shiprocketSync?.success ? {
            orderId: shiprocketSync.shiprocketOrderId,
            shipmentId: shiprocketSync.shipmentId,
          } : undefined,
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
