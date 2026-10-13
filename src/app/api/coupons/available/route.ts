import { NextRequest, NextResponse } from "next/server";
import { getAvailableCouponsServer } from "@/lib/commerce/coupon-validator";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandParam = searchParams.get("brand");
    const subtotalParam = searchParams.get("subtotal") || searchParams.get("subtotalInr");
    const itemsParam = searchParams.get("items");

    const brand: "personal" | "suraksha" = brandParam === "suraksha" ? "suraksha" : "personal";
    const subtotalInr = Number(subtotalParam) || 0;

    let items: any[] = [];
    if (itemsParam) {
      try {
        const parsed = JSON.parse(itemsParam);
        if (Array.isArray(parsed)) items = parsed;
      } catch {}
    }

    const coupons = await getAvailableCouponsServer({
      brand,
      subtotalInr,
      items,
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const brand: "personal" | "suraksha" = body.brand === "suraksha" ? "suraksha" : "personal";
    const subtotalInr = Number(body.subtotalInr || body.subtotal) || 0;
    const items = Array.isArray(body.items) ? body.items : [];

    const coupons = await getAvailableCouponsServer({
      brand,
      subtotalInr,
      items,
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
