import { NextRequest, NextResponse } from "next/server";
import { validateCartBrandServer } from "@/lib/commerce/brand-validator";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const brand = body.brand || "personal";
    const item = body.item || body;
    const items = Array.isArray(body.items) ? body.items : [item];

    const validation = validateCartBrandServer(items, brand);

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: validation.code || "CART_BRAND_CONTAMINATION",
            message: validation.error || "Cross-brand cart item rejected.",
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Item validated successfully for ${brand} cart.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: err.message || "Failed to validate cart item",
        },
      },
      { status: 400 }
    );
  }
}
