import { NextRequest, NextResponse } from "next/server";
import { registerWarrantySubmission } from "@/lib/content/warranty-storage";
import { isSesConfigured, sendWarrantyRegistrationConfirmationEmail } from "@/lib/integrations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload format." },
        { status: 400 }
      );
    }

    const orderId = (body.orderId || body.order_id || "").trim();
    const customerEmail = (body.customerEmail || body.email || "").trim().toLowerCase();
    const customerName = (body.customerName || body.name || "").trim();
    const customerPhone = (body.customerPhone || body.phone || "").trim();
    const productName = (body.productName || body.product || "").trim();

    // 1. Validation
    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 2. Database Persistence
    const res = await registerWarrantySubmission({
      orderId,
      customerEmail,
      customerName: customerName || undefined,
      customerPhone: customerPhone || undefined,
      productName: productName || "Personal TPMS (4-Tyre Kit)",
    });

    if (!res.success || !res.data) {
      return NextResponse.json(
        { success: false, error: res.error || "Failed to save warranty registration." },
        { status: 500 }
      );
    }

    // 3. Dispatch confirmation email from hello@treel.in to customer
    if (isSesConfigured() && res.data) {
      try {
        await sendWarrantyRegistrationConfirmationEmail({
          registrationId: res.data.registrationId,
          orderId: res.data.orderId,
          customerName: res.data.customerName || customerName || "Customer",
          customerEmail: res.data.customerEmail,
          customerPhone: res.data.customerPhone || customerPhone,
          productName: res.data.productName || productName || "Personal TPMS",
        });
      } catch (mailErr) {
        console.warn("[Warranty Registration] Confirmation email error:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      data: res.data,
      isDuplicate: res.isDuplicate || false,
      message: res.isDuplicate
        ? "This order has already been registered."
        : "Warranty registered successfully.",
    });
  } catch (err: any) {
    console.error("API /api/warranty/register error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error during registration." },
      { status: 500 }
    );
  }
}

