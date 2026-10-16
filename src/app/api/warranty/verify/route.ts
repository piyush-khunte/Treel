import { NextRequest, NextResponse } from "next/server";
import { verifyOrderForWarranty } from "@/lib/content/warranty-storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const orderId = (body.orderId || body.order_id || "").trim();
    const email = (body.email || body.customerEmail || "").trim().toLowerCase();

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Please enter your Order ID." },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const verification = await verifyOrderForWarranty(orderId, email);

    return NextResponse.json({
      success: true,
      verified: verification.verified,
      orderFound: verification.orderFound,
      productTitle: verification.productTitle,
      customerName: verification.customerName,
      orderDate: verification.orderDate,
      message: verification.message,
    });
  } catch (err: any) {
    console.error("API /api/warranty/verify error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to verify order." },
      { status: 500 }
    );
  }
}

