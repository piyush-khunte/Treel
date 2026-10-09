import { NextRequest, NextResponse } from "next/server";
import { getAvailableCouponsServer } from "@/lib/commerce/coupon-validator";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandParam = searchParams.get("brand");
    const subtotalParam = searchParams.get("subtotal") || searchParams.get("subtotalInr");

    const brand: "personal" | "suraksha" = brandParam === "suraksha" ? "suraksha" : "personal";
    const subtotalInr = Number(subtotalParam) || 0;

    const coupons = await getAvailableCouponsServer({
      brand,
      subtotalInr,
    });

    return NextResponse.json({
      success: true,
      brand,
      count: coupons.length,
      coupons,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch available coupons.",
      },
      { status: 500 }
    );
  }
}
