import { validateCartBrandServer } from '@/lib/commerce/brand-validator';
import { priceCartServer } from '@/lib/commerce/server-pricing';
import { cartFingerprint, getSupabaseAdminClient, orderRefForPayment, persistOrderToSupabase } from '@/lib/commerce/order-storage';
import { escapeHtml } from '@/lib/security/escape-html';
import { recordCouponUse } from '@/lib/commerce/coupon-storage';
import { syncOrderToShiprocket } from '@/lib/commerce/shiprocket-order-sync';
import {
fetchRazorpayOrder,
isRazorpayConfigured,
isSesConfigured,
sendEmail,
sendOrderConfirmationEmail,
sendPaymentReceiptEmail,
verifyPaymentSignature,
} from '@/lib/integrations';
import { NextRequest,NextResponse } from 'next/server';

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, checkout: rawCheckout } = body;

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

    // Our order reference is derived from the payment ID, so a replay maps to the same order.
    const derivedOrderRef = orderRefForPayment(razorpay_payment_id);

    if (existingPayment) {
      return NextResponse.json(
        {
          success: true,
          configured: true,
          data: {
            verified: true,
            orderId: existingPayment._id === `PAY-${razorpay_payment_id}` ? derivedOrderRef : existingPayment.order_id,
            paymentId: razorpay_payment_id,
          },
        },
        { status: 200 }
      );
    }

    // 3. Re-price the cart server-side and confirm Razorpay charged exactly that amount
    if (!rawCheckout || !Array.isArray(rawCheckout.items) || rawCheckout.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          configured: true,
          error: { code: 'VALIDATION_ERROR', message: 'Order details are missing. Please contact support with your payment ID.' },
        },
        { status: 400 }
      );
    }

    const brandValidation = validateCartBrandServer(rawCheckout.items, body.brand || rawCheckout.brand);
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

    const priced = await priceCartServer(rawCheckout.items, rawCheckout.couponCode || rawCheckout.coupon);
    if (!priced.ok) {
      console.error('[Online Order] Cart re-pricing failed after payment', { razorpay_order_id, razorpay_payment_id, code: priced.code });
      return NextResponse.json(
        { success: false, configured: true, error: { code: priced.code, message: priced.message } },
        { status: priced.status }
      );
    }

    const gatewayOrder = await fetchRazorpayOrder(razorpay_order_id);
    if (!gatewayOrder.success || !gatewayOrder.data) {
      console.error('[Online Order] Unable to fetch Razorpay order for amount check', { razorpay_order_id, razorpay_payment_id });
      return NextResponse.json(
        {
          success: false,
          configured: true,
          error: {
            code: 'EXTERNAL_SERVICE_ERROR',
            message: 'We could not confirm your payment amount. Please contact support with your payment ID.',
          },
        },
        { status: 502 }
      );
    }

    const expectedPaise = Math.round(priced.totalInr * 100);
    if (gatewayOrder.data.amount !== expectedPaise || gatewayOrder.data.currency !== 'INR') {
      console.error('[Online Order] AMOUNT MISMATCH — order not recorded, review/refund required', {
        razorpay_order_id,
        razorpay_payment_id,
        chargedPaise: gatewayOrder.data.amount,
        expectedPaise,
      });
      return NextResponse.json(
        {
          success: false,
          configured: true,
          error: {
            code: 'AMOUNT_MISMATCH',
            message: 'The amount paid does not match your order. Please contact support with your payment ID.',
          },
        },
        { status: 409 }
      );
    }

    // The items must be exactly the ones this Razorpay order was created for (not just the same total).
    const expectedFingerprint = gatewayOrder.data.notes?.cart_fp;
    const actualFingerprint = cartFingerprint(priced.items, priced.couponCode);
    if (expectedFingerprint && expectedFingerprint !== actualFingerprint) {
      console.error('[Online Order] CART MISMATCH — order not recorded, review/refund required', {
        razorpay_order_id,
        razorpay_payment_id,
      });
      return NextResponse.json(
        {
          success: false,
          configured: true,
          error: {
            code: 'CART_MISMATCH',
            message: 'The items in your order do not match the payment. Please contact support with your payment ID.',
          },
        },
        { status: 409 }
      );
    }
    if (!expectedFingerprint) {
      console.warn('[Online Order] Razorpay order has no cart fingerprint (created before cart binding was added)', { razorpay_order_id });
    }

    // From here on, only server-verified items and totals are used (storage, shipping, emails).
    const checkout = {
      ...rawCheckout,
      items: priced.items,
      subtotalInr: priced.subtotalInr,
      discountInr: priced.discountInr,
      totalInr: priced.totalInr,
      couponCode: priced.couponCode,
    };

    // 4. Persist order & payment record to Supabase. The order must be recorded before
    //    anything is shipped or emailed; a duplicate means another request already did it.
    const orderRef = derivedOrderRef;
    const saveRes = await persistOrderToSupabase({
      orderRef,
      checkout: {
        ...checkout,
        paymentMethod: 'online',
      },
      status: 'processing',
      paymentInfo: {
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        amount: priced.totalInr,
      },
    });

    if (saveRes.duplicate) {
      return NextResponse.json(
        {
          success: true,
          configured: true,
          data: { verified: true, orderId: orderRef, paymentId: razorpay_payment_id },
        },
        { status: 200 }
      );
    }

    if (!saveRes.success) {
      console.error('[CRITICAL][Online Order] Payment verified but order could not be recorded — manual follow-up required', {
        orderRef,
        razorpay_order_id,
        razorpay_payment_id,
        error: saveRes.error,
      });
      const alertTo = process.env.SES_TO_EMAIL || process.env.SES_LEADS_EMAIL;
      if (isSesConfigured() && alertTo) {
        try {
          await sendEmail({
            to: alertTo,
            subject: `[ACTION REQUIRED] Paid order not recorded — payment ${razorpay_payment_id}`,
            html: `<p>A Razorpay payment was verified but the order could not be saved. Nothing was shipped.</p><ul><li>Payment ID: ${escapeHtml(razorpay_payment_id)}</li><li>Razorpay order: ${escapeHtml(razorpay_order_id)}</li><li>Intended order ref: ${escapeHtml(orderRef)}</li><li>Customer email: ${escapeHtml(String(checkout.email || ''))}</li></ul>`,
          });
        } catch (alertErr) {
          console.error('[Online Order] Failed to send unrecorded-order alert:', alertErr);
        }
      }
      return NextResponse.json(
        {
          success: false,
          configured: true,
          error: {
            code: 'ORDER_NOT_RECORDED',
            message: `Your payment was received, but we could not record your order automatically. Our team has been notified and will contact you. Payment ID: ${razorpay_payment_id}`,
          },
        },
        { status: 500 }
      );
    }

    if (priced.couponCode) {
      await recordCouponUse(priced.couponCode);
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
              <p><strong>Order ID:</strong> ${escapeHtml(orderRef)}</p>
              <p><strong>Payment ID:</strong> ${escapeHtml(String(razorpay_payment_id))}</p>
              <p><strong>Customer:</strong> ${escapeHtml(String(checkout.fullName ?? ''))} (${escapeHtml(String(checkout.phone ?? ''))}, ${escapeHtml(String(checkout.email ?? ''))})</p>
              <p><strong>Total Amount:</strong> ₹${Number(checkout.totalInr).toLocaleString('en-IN')}</p>
              <p><strong>Destination:</strong> ${escapeHtml(String(checkout.city ?? ''))}, ${escapeHtml(String(checkout.state ?? ''))} (${escapeHtml(String(checkout.pincode ?? ''))})</p>
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
    console.error('[Online Order] Unexpected verify error:', error);
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
