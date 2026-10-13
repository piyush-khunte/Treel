import { getAllCoupons, getCouponByCode } from "./coupon-storage";
import { AdminCoupon, CouponCategory } from "@/types/admin";

export interface CouponValidationResult {
  valid: boolean;
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  discountAmountInr: number;
  message: string;
  appliedProductName?: string;
  eligibleSubtotalInr?: number;
  error?: string;
}

export interface AvailableCouponItem {
  code: string;
  title: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  discountLabel: string;
  description: string;
  minOrderValue?: number;
  maxDiscount?: number;
  brand: "personal" | "suraksha";
  productTitle?: string;
  isEligible: boolean;
  ineligibilityReason?: string;
}

export interface CanonicalSurakshaProduct {
  id: string;
  title: string;
  sku: string;
  price: number;
  tyres: number;
  aliases: string[];
}

export const CANONICAL_SURAKSHA_PRODUCTS: CanonicalSurakshaProduct[] = [
  {
    id: "suraksha_6w",
    title: "Suraksha 6-Wheel Commercial Kit",
    sku: "SKU-SURAKSHA-6W",
    price: 10200,
    tyres: 6,
    aliases: ["SKU-SURAKSHA-6W", "SKU-SURAKSHA-6TYRE", "TRL-SUR-6W", "6W", "6-WHEEL", "6-WHEELER"],
  },
  {
    id: "suraksha_10w",
    title: "Suraksha 10-Wheel Multi-Axle Kit",
    sku: "SKU-SURAKSHA-10W",
    price: 17000,
    tyres: 10,
    aliases: ["SKU-SURAKSHA-10W", "SKU-SURAKSHA-10TYRE", "TRL-SUR-10W", "10W", "10-WHEEL", "10-WHEELER"],
  },
  {
    id: "suraksha_12w",
    title: "Suraksha 12-Wheel Heavy Haul Kit",
    sku: "SKU-SURAKSHA-12W",
    price: 20400,
    tyres: 12,
    aliases: ["SKU-SURAKSHA-12W", "SKU-SURAKSHA-12TYRE", "TRL-SUR-12W", "12W", "12-WHEEL", "12-WHEELER"],
  },
  {
    id: "suraksha_14w",
    title: "Suraksha 14-Wheel Freight Kit",
    sku: "SKU-SURAKSHA-14W",
    price: 23800,
    tyres: 14,
    aliases: ["SKU-SURAKSHA-14W", "SKU-SURAKSHA-14TYRE", "TRL-SUR-14W", "14W", "14-WHEEL", "14-WHEELER"],
  },
  {
    id: "suraksha_16w",
    title: "Suraksha 16-Wheel Commercial Kit",
    sku: "SKU-SURAKSHA-16W",
    price: 27200,
    tyres: 16,
    aliases: ["SKU-SURAKSHA-16W", "SKU-SURAKSHA-16TYRE", "TRL-SUR-16W", "16W", "16-WHEEL", "16-WHEELER"],
  },
  {
    id: "suraksha_18w",
    title: "Suraksha 18-Wheel Multi-Axle Kit",
    sku: "SKU-SURAKSHA-18W",
    price: 30600,
    tyres: 18,
    aliases: ["SKU-SURAKSHA-18W", "SKU-SURAKSHA-18TYRE", "TRL-SUR-18W", "18W", "18-WHEEL", "18-WHEELER"],
  },
  {
    id: "suraksha_22w",
    title: "Suraksha 22-Wheel Prime Mover Kit",
    sku: "SKU-SURAKSHA-22W",
    price: 37400,
    tyres: 22,
    aliases: ["SKU-SURAKSHA-22W", "SKU-SURAKSHA-22TYRE", "TRL-SUR-22W", "22W", "22-WHEEL", "22-WHEELER"],
  },
];

export function isSurakshaCartItem(item: any): boolean {
  if (!item) return false;
  const vid = (item.variant_id || "").toLowerCase();
  const sku = (item.sku || "").toUpperCase();
  const vtype = (item.vehicle_type || "").toLowerCase();
  const cat = (item.category || "").toLowerCase();
  const name = (item.name || item.title || "").toLowerCase();

  return (
    vid.startsWith("suraksha") ||
    sku.includes("SURAKSHA") ||
    vtype === "truck" ||
    vtype === "commercial" ||
    cat.includes("truck") ||
    cat.includes("commercial") ||
    cat.includes("suraksha") ||
    name.includes("suraksha")
  );
}

/**
 * Determines whether a specific cart item is eligible for the given coupon.
 * Enforces exact product IDs, canonical SKUs, and Suraksha axle/tyre configurations.
 */
export function isItemEligibleForCoupon(item: any, coupon: AdminCoupon): boolean {
  if (!item || !coupon) return false;

  // 1. Strict Brand/Category boundary check
  const isSuraksha = isSurakshaCartItem(item);
  if (coupon.category === "SURAKSHA" && !isSuraksha) return false;
  if (coupon.category === "PERSONAL_TPMS" && isSuraksha) return false;

  // 2. Check if coupon is category-wide
  const isCategoryWide =
    coupon.scope === "category" ||
    ((!coupon.productId || coupon.productId === "all") &&
      (!coupon.productIds || coupon.productIds.length === 0) &&
      (!coupon.productSku || coupon.productSku.toUpperCase().includes("SITEWIDE")));

  if (isCategoryWide) {
    return true;
  }

  // 3. Product-specific check:
  // Gather target product identifiers from the coupon
  const targetIds = new Set<string>();
  if (coupon.productId && coupon.productId !== "all") {
    targetIds.add(coupon.productId.toLowerCase());
  }
  if (Array.isArray(coupon.productIds)) {
    for (const pid of coupon.productIds) {
      if (pid && pid !== "all") targetIds.add(pid.toLowerCase());
    }
  }

  const targetSkus = new Set<string>();
  if (coupon.productSku && !coupon.productSku.toUpperCase().includes("SITEWIDE")) {
    targetSkus.add(coupon.productSku.toUpperCase());
  }
  if (Array.isArray(coupon.productSkus)) {
    for (const psku of coupon.productSkus) {
      if (psku && !psku.toUpperCase().includes("SITEWIDE")) targetSkus.add(psku.toUpperCase());
    }
  }

  // A. For Suraksha commercial items
  if (coupon.category === "SURAKSHA") {
    // Determine which tyre configurations this coupon is valid for
    const validTyreCounts = new Set<number>();
    for (const prod of CANONICAL_SURAKSHA_PRODUCTS) {
      const matchesId = targetIds.has(prod.id.toLowerCase());
      const matchesSku =
        targetSkus.has(prod.sku.toUpperCase()) ||
        prod.aliases.some((a) => targetSkus.has(a.toUpperCase()));
      if (matchesId || matchesSku) {
        validTyreCounts.add(prod.tyres);
      }
    }

    // Direct match against target IDs or target SKUs
    const itId = (item.id || item._id || item.variant_id || "").toLowerCase();
    const itSku = (item.sku || "").toUpperCase();
    if (targetIds.has(itId) || targetSkus.has(itSku)) {
      return true;
    }

    // Determine the tyre count of this cart item
    let itemTyres: number | null = null;
    const itQty = Number(item.quantity) || 0;
    const itSensors = Number(item.sensor_count) || 0;
    const itName = (item.name || item.title || "").toUpperCase();

    for (const prod of CANONICAL_SURAKSHA_PRODUCTS) {
      if (
        itId === prod.id ||
        itSku === prod.sku ||
        prod.aliases.some((a) => itSku === a.toUpperCase()) ||
        itName.includes(`${prod.tyres} TYRE`) ||
        itName.includes(`${prod.tyres}-WHEEL`) ||
        itName.includes(`${prod.tyres} WHEEL`) ||
        itQty === prod.tyres ||
        itSensors === prod.tyres
      ) {
        itemTyres = prod.tyres;
        break;
      }
    }

    if (itemTyres !== null && validTyreCounts.size > 0) {
      return validTyreCounts.has(itemTyres);
    }

    return false;
  }

  // B. For Personal TPMS consumer items
  const itId = (item.id || item._id || item.variant_id || "").toLowerCase();
  const itSku = (item.sku || item.productsku || "").toUpperCase();

  if (targetIds.has(itId)) return true;
  if (targetSkus.has(itSku)) return true;

  return false;
}

/**
 * Validates a coupon against cart contents, subtotal, and brand.
 * Strictly enforces product-level eligibility and brand boundaries.
 */
export async function validateCouponServer(params: {
  code: string;
  items?: any[];
  subtotalInr: number;
  brand?: "personal" | "suraksha";
}): Promise<CouponValidationResult> {
  const { code, items = [], subtotalInr, brand } = params;
  const cleanCode = (code || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");

  if (!cleanCode) {
    return {
      valid: false,
      code: "",
      discountType: "fixed",
      discountValue: 0,
      discountAmountInr: 0,
      message: "Please enter a coupon code.",
      error: "Please enter a coupon code.",
    };
  }

  if (subtotalInr <= 0) {
    return {
      valid: false,
      code: cleanCode,
      discountType: "fixed",
      discountValue: 0,
      discountAmountInr: 0,
      message: "Cart is empty.",
      error: "Your cart is empty. Add items to apply a coupon.",
    };
  }

  // Detect brand from cart items if not explicitly specified
  let detectedBrand: "personal" | "suraksha" = brand || "personal";
  if (!brand && items.length > 0) {
    if (items.some(isSurakshaCartItem)) {
      detectedBrand = "suraksha";
    }
  }

  // Look up coupon from persistent storage
  const coupon = await getCouponByCode(cleanCode);

  if (!coupon) {
    return {
      valid: false,
      code: cleanCode,
      discountType: "fixed",
      discountValue: 0,
      discountAmountInr: 0,
      message: `Coupon code "${cleanCode}" is invalid or expired.`,
      error: `Coupon code "${cleanCode}" is invalid or expired.`,
    };
  }

  // Check if coupon is active
  if (coupon.status !== "Active") {
    return {
      valid: false,
      code: cleanCode,
      discountType: coupon.discountType,
      discountValue: 0,
      discountAmountInr: 0,
      message: `Coupon "${cleanCode}" is currently inactive.`,
      error: `Coupon "${cleanCode}" is currently inactive.`,
    };
  }

  // 1. Strict Brand Separation Enforcement
  if (detectedBrand === "personal" && coupon.category === "SURAKSHA") {
    return {
      valid: false,
      code: cleanCode,
      discountType: coupon.discountType,
      discountValue: 0,
      discountAmountInr: 0,
      message: `Coupon "${cleanCode}" is valid only for Suraksha Commercial Fleet orders.`,
      error: `Coupon "${cleanCode}" is valid only for Suraksha Commercial Fleet orders.`,
    };
  }

  if (detectedBrand === "suraksha" && coupon.category === "PERSONAL_TPMS") {
    return {
      valid: false,
      code: cleanCode,
      discountType: coupon.discountType,
      discountValue: 0,
      discountAmountInr: 0,
      message: `Coupon "${cleanCode}" is valid only for Personal TPMS products.`,
      error: `Coupon "${cleanCode}" is valid only for Personal TPMS products.`,
    };
  }

  // 2. Product-Specific Scope & Cart Item Filtering
  const isProductSpecific =
    coupon.scope === "product" ||
    (coupon.scope !== "category" &&
      ((coupon.productId && coupon.productId !== "all") ||
        (Array.isArray(coupon.productIds) && coupon.productIds.length > 0)));

  const eligibleItems = items.filter((it: any) => isItemEligibleForCoupon(it, coupon));

  if (isProductSpecific) {
    if (items.length > 0 && eligibleItems.length === 0) {
      return {
        valid: false,
        code: cleanCode,
        discountType: coupon.discountType,
        discountValue: 0,
        discountAmountInr: 0,
        message: `Coupon "${cleanCode}" applies only to "${coupon.productTitle || "the specified product(s)"}".`,
        error: `Coupon "${cleanCode}" applies only to "${coupon.productTitle || "the specified product(s)"}".`,
      };
    }
  }

  // 3. Minimum Order Value Check (against total cart subtotal)
  if (coupon.minOrderValue && coupon.minOrderValue > 0 && subtotalInr < coupon.minOrderValue) {
    return {
      valid: false,
      code: cleanCode,
      discountType: coupon.discountType,
      discountValue: 0,
      discountAmountInr: 0,
      message: `Coupon "${cleanCode}" requires a minimum order value of ₹${coupon.minOrderValue.toLocaleString("en-IN")}.`,
      error: `Coupon "${cleanCode}" requires a minimum order value of ₹${coupon.minOrderValue.toLocaleString("en-IN")}.`,
    };
  }

  // 4. Calculate Verified Discount Amount against ONLY eligible items
  // In mixed carts or product-restricted coupons, ineligible items do not contribute to the discount
  const applicableItems = isProductSpecific ? eligibleItems : items;
  const eligibleSubtotalInr = applicableItems.reduce((acc: number, it: any) => {
    const isSur = isSurakshaCartItem(it);
    const unitPrice = isSur ? 1700 : Number(it.price_inr || it.price) || 0;
    const q = Number(it.quantity) || 1;
    return acc + unitPrice * q;
  }, 0);

  const basisSubtotal = eligibleSubtotalInr > 0 ? eligibleSubtotalInr : subtotalInr;

  let discountAmount = 0;
  if (coupon.discountType === "percent") {
    discountAmount = Math.round((basisSubtotal * coupon.discountValue) / 100);
    if (coupon.maxDiscount && coupon.maxDiscount > 0) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscount);
    }
  } else {
    // Fixed INR discount capped at eligible items subtotal
    discountAmount = Math.min(coupon.discountValue, basisSubtotal);
  }

  discountAmount = Math.max(0, discountAmount);

  return {
    valid: true,
    code: cleanCode,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    discountAmountInr: discountAmount,
    eligibleSubtotalInr: basisSubtotal,
    message: `Coupon "${cleanCode}" applied successfully! You saved ₹${discountAmount.toLocaleString("en-IN")}.`,
    appliedProductName: isProductSpecific ? (coupon.productTitle || undefined) : undefined,
  };
}

/**
 * Returns available coupons for the specified brand, strictly filtered by cart item eligibility.
 * Product-specific coupons ONLY appear if at least one eligible product is in the cart.
 */
export async function getAvailableCouponsServer(params: {
  brand: "personal" | "suraksha";
  subtotalInr?: number;
  items?: any[];
}): Promise<AvailableCouponItem[]> {
  const { brand, subtotalInr = 0, items = [] } = params;
  const targetCategory: CouponCategory = brand === "suraksha" ? "SURAKSHA" : "PERSONAL_TPMS";

  const allCoupons = await getAllCoupons(targetCategory);
  const activeCoupons = allCoupons.filter((c) => c.status === "Active" && c.category === targetCategory);

  const eligibleCoupons: AvailableCouponItem[] = [];

  for (const c of activeCoupons) {
    const isProductSpecific =
      c.scope === "product" ||
      (c.scope !== "category" &&
        ((c.productId && c.productId !== "all") ||
          (Array.isArray(c.productIds) && c.productIds.length > 0)));

    // If product-specific and cart items are provided, check if the cart contains a matching product
    if (isProductSpecific && items.length > 0) {
      const hasMatchingProduct = items.some((it) => isItemEligibleForCoupon(it, c));
      if (!hasMatchingProduct) {
        // Exclude coupon completely: does not apply to current cart items
        continue;
      }
    }

    const isEligible = !c.minOrderValue || subtotalInr >= c.minOrderValue || subtotalInr === 0;
    const ineligibilityReason =
      c.minOrderValue && subtotalInr > 0 && subtotalInr < c.minOrderValue
        ? `Requires minimum order of ₹${c.minOrderValue.toLocaleString("en-IN")} (Add ₹${(c.minOrderValue - subtotalInr).toLocaleString("en-IN")} more)`
        : undefined;

    const discountLabel =
      c.discountType === "percent"
        ? `${c.discountValue}% OFF`
        : `₹${c.discountValue.toLocaleString("en-IN")} FLAT OFF`;

    eligibleCoupons.push({
      code: c.code,
      title: c.productTitle || (brand === "suraksha" ? "Suraksha Fleet Safety Offer" : "Personal TPMS Offer"),
      discountType: c.discountType,
      discountValue: c.discountValue,
      discountLabel,
      description:
        c.description ||
        (c.discountType === "percent"
          ? `${c.discountValue}% discount on your order`
          : `Flat ₹${c.discountValue} savings`),
      minOrderValue: c.minOrderValue || 0,
      maxDiscount: c.maxDiscount || undefined,
      brand,
      productTitle: isProductSpecific ? (c.productTitle || undefined) : undefined,
      isEligible,
      ineligibilityReason,
    });
  }

  // Deduplicate by code
  const uniqueMap = new Map<string, AvailableCouponItem>();
  for (const item of eligibleCoupons) {
    if (!uniqueMap.has(item.code)) {
      uniqueMap.set(item.code, item);
    }
  }

  return Array.from(uniqueMap.values());
}
