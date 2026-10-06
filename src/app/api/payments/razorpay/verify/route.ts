import { NextRequest, NextResponse } from 'next/server';
import {
  isRazorpayConfigured,
  verifyPaymentSignature,
  isSesConfigured,
  sendOrderConfirmationEmail,
  sendPaymentReceiptEmail,
  sendEmail,
} from '@/lib/integrations';
import { persistOrderToSupabase, getSupabaseAdminClient } from '@/lib/commerce/order-storage';
import { syncOrderToShiprocket } from '@/lib/commerce/shiprocket-order-sync';

export async function POST(req: NextRequest) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error: {
          code: 'SERVICE_NOT_CONFIGURED',
          message:
            'Razorpay payment verification is disabled. Server credentials are not configured.',
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

    // 4. Logistics Pipeline: Trigger Shiprocket if configured
    let shiprocketSync: any = null;
    if (checkout) {
      try {
        shiprocketSync = await syncOrderToShiprocket({
          orderId: orderRef,
          checkout: {
            ...checkout,
            paymentMethod: 'online',
          },
          paymentMethod: 'online',
        });
      } catch (shipErr) {
        console.error('[Online Order] Shiprocket dispatch error:', shipErr);
      }
    }

    // 5. Email Pipeline: Trigger Amazon SES order & receipt emails if configured
    if (isSesConfigured() && checkout?.email) {
      try {
        const orderItems = (checkout.items || []).map((it: any) => ({
          name: it.name || it.title || 'Treel Smart Tyre Sensor Kit',
          quantity: Number(it.quantity) || 1,
          price: Number(it.price_inr || it.price) || 0,
        }));

        // A. Send Order Confirmation Email
        await sendOrderConfirmationEmail({
          customerName: checkout.fullName,
          customerEmail: checkout.email,
          orderId: orderRef,
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

        // B. Send Payment Receipt Email
        await sendPaymentReceiptEmail({
          customerName: checkout.fullName,
          customerEmail: checkout.email,
          paymentId: razorpay_payment_id,
          orderId: orderRef,
          amount: (Number(checkout.totalInr) || 0) * 100, // paise
          currency: 'INR',
          status: 'Captured / Paid',
          date: new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
        });

        // C. Notify Admin Store Operations
        const adminEmail = process.env.SES_TO_EMAIL || process.env.SES_LEADS_EMAIL;
        if (adminEmail && adminEmail !== checkout.email) {
          const adminNoticeHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
              <h2 style="color: #059669;">New Prepaid Razorpay Order Confirmed</h2>
              <p><strong>Order ID:</strong> ${orderRef}</p>
              <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
              <p><strong>Customer:</strong> ${checkout.fullName} (${checkout.phone}, ${checkout.email})</p>
              <p><strong>Total Amount:</strong> ₹${Number(checkout.totalInr).toLocaleString('en-IN')}</p>
              <p><strong>Destination:</strong> ${checkout.city}, ${checkout.state} (${checkout.pincode})</p>
              <p><strong>Status:</strong> Processing for Shipment</p>
            </div>
          `;
          await sendEmail({
            to: adminEmail,
            subject: `[New Paid Order] ${orderRef} — ₹${Number(checkout.totalInr).toLocaleString('en-IN')} (${checkout.fullName})`,
            html: adminNoticeHtml,
            replyTo: checkout.email,
          });
        }
      } catch (mailErr) {
        console.error('[Online Order] Amazon SES email dispatch error:', mailErr);
      }
    }

    // 6. Return Success Response
    return NextResponse.json(
      {
        success: true,
        configured: true,
        data: {
          verified: true,
          orderId: orderRef,
          paymentId: razorpay_payment_id,
          shiprocket: shiprocketSync?.success
            ? {
                orderId: shiprocketSync.shiprocketOrderId,
                shipmentId: shiprocketSync.shipmentId,
              }
            : undefined,
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
