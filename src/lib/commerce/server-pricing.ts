/**
 * Server-side cart pricing.
 *
 * The browser's cart (prices, totals, discounts) is never trusted. Every
 * payment/order route must price the cart here, from the product catalogue,
 * before charging a customer or persisting an order.
 */
import { getAllProducts, resolveProductBrand } from "@/lib/commerce/product-storage";
import { validateCouponServer } from "@/lib/commerce/coupon-validator";
import type { CartItem } from "@/types/database";

export const SURAKSHA_UNIT_PRICE_INR = 1700;
const SURAKSHA_MIN_TYRES = 1;
const SURAKSHA_MAX_TYRES = 36;
const MAX_QUANTITY_PER_LINE = 50;
const MAX_CART_LINES = 25;

export interface PricedCart {
  ok: true;
  brand: "personal" | "suraksha";
  items: CartItem[];
  subtotalInr: number;
  discountInr: number;
  totalInr: number;
  couponCode: string;
}

export interface PricingError {
  ok: false;
  status: number;
  code: string;
  message: string;
}

const fail = (code: string, message: string, status = 400): PricingError => ({ ok: false, status, code, message });

const str = (v: unknown): string => (typeof v === "string" || typeof v === "number" ? String(v) : "").trim();

/** Returns the tyre count for a Suraksha kit line, or null if the line is not a Suraksha kit. */
function parseSurakshaTyres(variantId: string, sku: string): number | null {
  const m = variantId.toLowerCase().match(/^suraksha_(\d+)w$/) || sku.toUpperCase().match(/^SKU-SURAKSHA-(\d+)W$/);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * Prices a cart entirely from server-side data.
 * - Personal TPMS lines: unit price from the product catalogue (matched by slug / id / SKU).
 * - Suraksha lines: tyres × ₹1,700, tyre count taken from the kit variant id / SKU.
 * - Quantities must be whole numbers between 1 and 50.
 * - An optional coupon is re-validated against the server-priced items.
 */
export async function priceCartServer(rawItems: unknown, rawCouponCode?: unknown): Promise<PricedCart | PricingError> {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return fail("VALIDATION_ERROR", "Cart is empty.");
  }
  if (rawItems.length > MAX_CART_LINES) {
    return fail("VALIDATION_ERROR", "Too many items in cart.");
  }

  let catalogue: Awaited<ReturnType<typeof getAllProducts>> | null = null;
  const items: CartItem[] = [];

  for (const raw of rawItems) {
    if (!raw || typeof raw !== "object") return fail("INVALID_ITEM", "Cart contains an invalid item.");
    const it = raw as Record<string, unknown>;
    const variantId = str(it.variant_id);
    const sku = str(it.sku);
    const quantity = Number(it.quantity);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_LINE) {
      return fail("INVALID_QUANTITY", `Quantity must be a whole number between 1 and ${MAX_QUANTITY_PER_LINE}.`);
    }

    const tyres = parseSurakshaTyres(variantId, sku);
    if (tyres !== null) {
      if (tyres < SURAKSHA_MIN_TYRES || tyres > SURAKSHA_MAX_TYRES) {
        return fail("INVALID_ITEM", "Suraksha kit size is not available.");
      }
      const unitPrice = tyres * SURAKSHA_UNIT_PRICE_INR;
      items.push({
        variant_id: `suraksha_${tyres}w`,
        sku: `SKU-SURAKSHA-${tyres}W`,
        name: `Treel Suraksha Commercial Safety Kit (${tyres} Tyres)`,
        price_inr: unitPrice,
        mrp_inr: Math.round(unitPrice * 1.18),
        quantity,
        image_url: str(it.image_url),
        sensor_count: tyres,
        vehicle_type: "truck",
      });
      continue;
    }

    // Personal TPMS: must match a catalogue product
    catalogue ??= await getAllProducts(true, "all");
    const key = variantId.toLowerCase();
    const product =
      (key && catalogue.find((p) => (p.slug || "").toLowerCase() === key || (p._id || "").toLowerCase() === key)) ||
      (sku && catalogue.find((p) => p.productsku && p.productsku === sku)) ||
      null;

    if (!product || (product.brand || resolveProductBrand(product)) !== "personal") {
      return fail("INVALID_ITEM", "One or more items in your cart are no longer available. Please refresh your cart.");
    }
    const unitPrice = Number(product.price);
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      return fail("INVALID_ITEM", `"${product.title}" is not available for purchase right now.`);
    }
    const sensorCount = Number(it.sensor_count);
    const vehicleType = str(it.vehicle_type) === "2w" ? "2w" : "4w";
    items.push({
      variant_id: product.slug,
      sku: product.productsku || product.slug,
      name: product.title,
      price_inr: unitPrice,
      mrp_inr: Number(product.saleprice) > 0 ? Number(product.saleprice) : unitPrice,
      quantity,
      image_url: product.image || str(it.image_url),
      sensor_count:
        Number.isInteger(sensorCount) && sensorCount > 0 && sensorCount <= 10 ? sensorCount : vehicleType === "2w" ? 2 : 4,
      vehicle_type: vehicleType,
      category: product.category,
      productsku: product.productsku || undefined,
    });
  }

  const brand: "personal" | "suraksha" = items.some((i) => i.vehicle_type === "truck") ? "suraksha" : "personal";
  const subtotalInr = items.reduce((acc, i) => acc + i.price_inr * i.quantity, 0);

  let discountInr = 0;
  const couponCode = str(rawCouponCode).toUpperCase();
  if (couponCode) {
    const coupon = await validateCouponServer({ code: couponCode, items, subtotalInr, brand });
    if (!coupon.valid) {
      return fail("INVALID_COUPON", coupon.error || coupon.message || `Coupon "${couponCode}" is invalid for this order.`);
    }
    discountInr = Math.min(Math.max(0, Number(coupon.discountAmountInr) || 0), subtotalInr);
  }

  const totalInr = subtotalInr - discountInr;
  if (totalInr < 1) {
    return fail("VALIDATION_ERROR", "Order total must be at least ₹1.");
  }

  return { ok: true, brand, items, subtotalInr, discountInr, totalInr, couponCode };
}
