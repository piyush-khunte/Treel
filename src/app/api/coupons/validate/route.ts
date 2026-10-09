import { NextRequest, NextResponse } from "next/server";
import { validateCouponServer } from "@/lib/commerce/coupon-validator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawCode = (body.code || "").trim();
    const items = Array.isArray(body.items) ? body.items : [];
    const subtotalInr =
      Number(body.subtotalInr) ||
      items.reduce(
        (acc: number, it: any) =>
          acc + (Number(it.price_inr || it.price) || 0) * (Number(it.quantity) || 1),
        0
      );

    if (!rawCode) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: "Please enter a coupon code.",
        },
        { status: 400 }
      );
    }

    if (items.length === 0 || subtotalInr <= 0) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: "Your cart is empty. Add items to apply a coupon.",
        },
        { status: 400 }
      );
    }

    const brand = body.brand === "suraksha" ? "suraksha" : body.brand === "personal" ? "personal" : undefined;

    const result = await validateCouponServer({
      code: rawCode,
      items,
      subtotalInr,
      brand,
    });

    if (!result.valid) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: result.error || result.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      valid: true,
      data: {
        code: result.code,
        discountType: result.discountType,
        discountValue: result.discountValue,
        discountAmountInr: result.discountAmountInr,
        message: result.message,
        appliedProductName: result.appliedProductName,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        valid: false,
        error: error?.message || "Failed to validate coupon code.",
      },
      { status: 500 }
    );
  }
}
