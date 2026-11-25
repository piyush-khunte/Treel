import { NextRequest, NextResponse } from "next/server";
import { validateCartBrandServer } from "@/lib/commerce/brand-validator";
import { priceCartServer } from "@/lib/commerce/server-pricing";

export const dynamic = "force-dynamic";

/**
 * Validates one item (`{ item }` or a bare item) or a cart (`{ items: [...] }`):
 * - at least one item with a variant id or SKU,
 * - no cross-brand mixing,
 * - every item exists in the catalogue with a valid quantity (1–50; defaults to 1 if omitted).
 * Returns the server-side prices for the validated items.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { success: false, error: { code: "VALIDATION_ERROR", message: "Invalid request payload." } },
      { status: 400 }
    );
  }

  const brand = body.brand === "suraksha" ? "suraksha" : "personal";
  const rawItems: unknown[] = Array.isArray(body.items) ? body.items : [body.item ?? body];

  const items = rawItems
    .filter((it): it is Record<string, unknown> => !!it && typeof it === "object")
    .filter((it) => String(it.variant_id ?? "").trim() !== "" || String(it.sku ?? "").trim() !== "")
    .map((it) => ({ ...it, quantity: it.quantity === undefined ? 1 : it.quantity }));

  if (items.length === 0 || items.length !== rawItems.length) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "VALIDATION_ERROR", message: "Each cart item needs a product (variant_id or sku)." },
      },
      { status: 400 }
    );
  }

  const brandCheck = validateCartBrandServer(items, brand);
  if (!brandCheck.valid) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: brandCheck.code || "CART_BRAND_CONTAMINATION",
          message: brandCheck.error || "Cross-brand cart item rejected.",
        },
      },
      { status: 400 }
    );
  }

  const priced = await priceCartServer(items);
  if (!priced.ok) {
    return NextResponse.json(
      { success: false, error: { code: priced.code, message: priced.message } },
      { status: priced.status }
    );
  }

  return NextResponse.json({
    success: true,
    message: `${priced.items.length === 1 ? "Item" : "Items"} validated successfully for ${brand} cart.`,
    data: { items: priced.items, subtotalInr: priced.subtotalInr },
  });
}
