import { NextRequest, NextResponse } from 'next/server';
import { persistOrderToSupabase } from '@/lib/commerce/order-storage';
import { syncOrderToShiprocket } from '@/lib/commerce/shiprocket-order-sync';
import { isSesConfigured, sendOrderConfirmationEmail, sendEmail } from '@/lib/integrations';
import { priceCartServer } from '@/lib/commerce/server-pricing';
import { validateCartBrandServer } from '@/lib/commerce/brand-validator';
import { guardLeadSubmission } from '@/lib/security/lead-guard';
import { escapeHtml } from '@/lib/security/escape-html';
import { recordCouponUse } from '@/lib/commerce/coupon-storage';

const PHONE_RE = /^(?:\+?91)?\d{10}$/;
const PIN_RE = /^[1-9]\d{5}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function tooLong(v: unknown, max: number): boolean {
  return typeof v === 'string' && v.length > max;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid request payload' } },
        { status: 400 }
      );
    }

    // COD orders create real shipments and emails, so throttle per IP and drop bot submissions.
    const blocked = await guardLeadSubmission('cod-order', req.headers, body.checkout ?? body);
    if (blocked) return blocked;

    const { checkout: rawCheckout } = body;

    if (
      !rawCheckout ||
      !rawCheckout.fullName ||
      !rawCheckout.phone ||
      !rawCheckout.address ||
      !rawCheckout.city ||
      !rawCheckout.pincode
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

    const phoneDigits = String(rawCheckout.phone).replace(/[\s-]/g, '');
    if (
      !PHONE_RE.test(phoneDigits) ||
      !PIN_RE.test(String(rawCheckout.pincode).trim()) ||
      (rawCheckout.email && !EMAIL_RE.test(String(rawCheckout.email).trim())) ||
      tooLong(rawCheckout.fullName, 120) ||
      tooLong(rawCheckout.address, 300) ||
      tooLong(rawCheckout.addressoptional, 300) ||
      tooLong(rawCheckout.city, 100) ||
      tooLong(rawCheckout.state, 100) ||
      tooLong(rawCheckout.email, 254)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Please enter a valid 10-digit mobile number, 6-digit pincode and email address.',
          },
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(rawCheckout.items) || rawCheckout.items.length === 0) {
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

    // Enforce strict server-side brand validation
    const brandValidation = validateCartBrandServer(rawCheckout.items, body.brand || rawCheckout.brand);
    if (!brandValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: brandValidation.code || 'CART_BRAND_CONTAMINATION',
            message: brandValidation.error || 'Cart items do not match the requested storefront brand.',
          },
        },
        { status: 400 }
      );
    }

    // Price the cart entirely server-side (catalogue prices, validated quantities, re-validated coupon).
    // Client-supplied prices and totals are ignored.
    const priced = await priceCartServer(rawCheckout.items, rawCheckout.couponCode || rawCheckout.coupon);
    if (!priced.ok) {
      return NextResponse.json(
        { success: false, error: { code: priced.code, message: priced.message } },
        { status: priced.status }
      );
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

    // 1. Primary Operation: Persist COD order to Supabase
    const saveRes = await persistOrderToSupabase({
      checkout: {
        ...checkout,
        paymentMethod: 'cod',
      },
      status: 'pending', // COD is pending payment on delivery
    });

    if (!saveRes.success) {
      console.error('[COD Order] Failed to persist order:', saveRes.error);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'We could not place your order right now. Please try again or call 1800 833 0233.',
          },
        },
        { status: 500 }
      );
    }

    const orderId = saveRes.orderId;

    if (priced.couponCode) {
      await recordCouponUse(priced.couponCode);
    }

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
              <p><strong>Order ID:</strong> ${escapeHtml(orderId)}</p>
              <p><strong>Customer:</strong> ${escapeHtml(checkout.fullName)} (${escapeHtml(checkout.phone)}, ${escapeHtml(checkout.email)})</p>
              <p><strong>Total Amount:</strong> ₹${Number(checkout.totalInr).toLocaleString('en-IN')}</p>
              <p><strong>Destination:</strong> ${escapeHtml(checkout.city)}, ${escapeHtml(checkout.state)} (${escapeHtml(checkout.pincode)})</p>
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
    console.error('[COD Order] Unexpected error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request payload',
        },
      },
      { status: 400 }
    );
  }
}
