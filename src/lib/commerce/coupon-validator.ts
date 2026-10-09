import { getSupabaseAdminClient } from "./order-storage";
import { PERSONAL_PRODUCTS } from "@/lib/data/personal-products";

export interface CouponValidationResult {
  valid: boolean;
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  discountAmountInr: number;
  message: string;
  appliedProductName?: string;
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

const SURAKSHA_CODES = new Set(["SURAKSHA10", "FLEET10"]);
const PERSONAL_PROMO_CODES = new Set(["TREEL10", "WELCOME10", "FREESHIP", "TREEL500"]);

export async function validateCouponServer(params: {
  code: string;
  items?: any[];
  subtotalInr: number;
  brand?: "personal" | "suraksha";
}): Promise<CouponValidationResult> {
  const { code, items = [], subtotalInr, brand } = params;
  const cleanCode = (code || "").trim().toUpperCase();

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

  // Detect brand from items if not explicitly supplied
  let detectedBrand: "personal" | "suraksha" = brand || "personal";
  if (!brand && items.length > 0) {
    const isSuraksha = items.some((it: any) => {
      const vid = (it.variant_id || "").toLowerCase();
      const sku = (it.sku || "").toUpperCase();
      const cat = (it.category || it.vehicle_type || "").toLowerCase();
      return vid.startsWith("suraksha") || sku.includes("SURAKSHA") || cat === "truck";
    });
    if (isSuraksha) detectedBrand = "suraksha";
  }

  // 1. Strict Brand Separation Enforcement
  if (detectedBrand === "suraksha" && PERSONAL_PROMO_CODES.has(cleanCode)) {
    return {
      valid: false,
      code: cleanCode,
      discountType: "percent",
      discountValue: 0,
      discountAmountInr: 0,
      message: `Coupon "${cleanCode}" is valid only for Personal TPMS products.`,
      error: `Coupon "${cleanCode}" is valid only for Personal TPMS products.`,
    };
  }

  if (detectedBrand === "personal" && SURAKSHA_CODES.has(cleanCode)) {
    return {
      valid: false,
      code: cleanCode,
      discountType: "percent",
      discountValue: 0,
      discountAmountInr: 0,
      message: `Coupon "${cleanCode}" is valid only for Suraksha Commercial Fleet orders.`,
      error: `Coupon "${cleanCode}" is valid only for Suraksha Commercial Fleet orders.`,
    };
  }

  // 2. Suraksha Promotional Codes
  if (detectedBrand === "suraksha" && SURAKSHA_CODES.has(cleanCode)) {
    const discountAmount = Math.round((subtotalInr * 10) / 100);
    return {
      valid: true,
      code: cleanCode,
      discountType: "percent",
      discountValue: 10,
      discountAmountInr: discountAmount,
      message: `Suraksha 10% commercial fleet discount applied! You saved ₹${discountAmount.toLocaleString("en-IN")}.`,
    };
  }

  // 3. Check Database (Supabase TreelEcommerce.products) for Admin-managed coupons
  let dbMatch: any = null;
  try {
    const supabase = getSupabaseAdminClient();
    const { data: dbProducts } = await supabase
      .from("TreelEcommerce.products")
      .select("_id, title, price, saleprice, couponcode, couponamount, productsku, category")
      .ilike("couponcode", cleanCode);

    if (dbProducts && dbProducts.length > 0) {
      dbMatch = dbProducts[0];
    }
  } catch (dbErr) {
    console.warn("Supabase coupon lookup fallback:", dbErr);
  }

  // 4. Fallback to catalog PERSONAL_PRODUCTS if offline/seeded
  if (!dbMatch) {
    const localMatch = PERSONAL_PRODUCTS.find(
      (p) => (p.couponcode || "").toUpperCase() === cleanCode
    );
    if (localMatch) {
      dbMatch = {
        _id: localMatch.id,
        title: localMatch.title,
        price: localMatch.price,
        saleprice: localMatch.saleprice,
        couponcode: localMatch.couponcode,
        couponamount: localMatch.couponamount,
        productsku: localMatch.productsku,
        category: "Personal TPMS",
      };
    }
  }

  // A. Product-Specific Admin Coupon Found
  if (dbMatch && dbMatch.couponcode) {
    // If user is on Suraksha but product coupon belongs to Personal TPMS product
    const isCommercialProduct =
      (dbMatch.category || "").toLowerCase().includes("commercial") ||
      (dbMatch.category || "").toLowerCase().includes("truck") ||
      (dbMatch.title || "").toLowerCase().includes("suraksha");

    if (detectedBrand === "suraksha" && !isCommercialProduct) {
      return {
        valid: false,
        code: cleanCode,
        discountType: "fixed",
        discountValue: 0,
        discountAmountInr: 0,
        message: `Coupon "${cleanCode}" is valid only for Personal TPMS (${dbMatch.title}).`,
        error: `Coupon "${cleanCode}" is valid only for Personal TPMS (${dbMatch.title}).`,
      };
    }

    if (detectedBrand === "personal" && isCommercialProduct) {
      return {
        valid: false,
        code: cleanCode,
        discountType: "fixed",
        discountValue: 0,
        discountAmountInr: 0,
        message: `Coupon "${cleanCode}" is valid only for Suraksha Commercial Fleet orders.`,
        error: `Coupon "${cleanCode}" is valid only for Suraksha Commercial Fleet orders.`,
      };
    }

    const rawAmount = String(dbMatch.couponamount || "").trim();
    let discountAmount = 0;
    let discountType: "percent" | "fixed" = "fixed";
    let discountValue = 0;

    if (rawAmount.endsWith("%")) {
      const pct = parseFloat(rawAmount.replace("%", ""));
      discountType = "percent";
      discountValue = isNaN(pct) ? 10 : pct;
      discountAmount = Math.round((subtotalInr * discountValue) / 100);
    } else {
      const parsedFixed = parseFloat(rawAmount);
      if (!isNaN(parsedFixed) && parsedFixed > 0) {
        discountType = "fixed";
        discountValue = parsedFixed;
        discountAmount = Math.min(parsedFixed, subtotalInr);
      } else {
        discountType = "percent";
        discountValue = 10;
        discountAmount = Math.round((subtotalInr * 10) / 100);
      }
    }

    return {
      valid: true,
      code: cleanCode,
      discountType,
      discountValue,
      discountAmountInr: discountAmount,
      message: `Coupon "${cleanCode}" applied successfully! You saved ₹${discountAmount.toLocaleString("en-IN")}.`,
      appliedProductName: dbMatch.title,
    };
  }

  // B. Personal TPMS Sitewide Promotional Coupons
  if (detectedBrand === "personal") {
    if (cleanCode === "TREEL10" || cleanCode === "WELCOME10") {
      const discountAmount = Math.round((subtotalInr * 10) / 100);
      return {
        valid: true,
        code: cleanCode,
        discountType: "percent",
        discountValue: 10,
        discountAmountInr: discountAmount,
        message: `Special 10% discount applied! You saved ₹${discountAmount.toLocaleString("en-IN")}.`,
      };
    }

    if (cleanCode === "FREESHIP") {
      const discountAmount = Math.round((subtotalInr * 5) / 100);
      return {
        valid: true,
        code: cleanCode,
        discountType: "percent",
        discountValue: 5,
        discountAmountInr: discountAmount,
        message: `Free express shipping & 5% bonus discount applied! You saved ₹${discountAmount.toLocaleString("en-IN")}.`,
      };
    }

    if (cleanCode === "TREEL500") {
      if (subtotalInr < 2500) {
        return {
          valid: false,
          code: cleanCode,
          discountType: "fixed",
          discountValue: 500,
          discountAmountInr: 0,
          message: "Coupon TREEL500 requires a minimum order value of ₹2,500.",
          error: "Coupon TREEL500 requires a minimum order value of ₹2,500.",
        };
      }
      const discountAmount = Math.min(500, subtotalInr);
      return {
        valid: true,
        code: cleanCode,
        discountType: "fixed",
        discountValue: 500,
        discountAmountInr: discountAmount,
        message: "Flat ₹500 discount applied!",
      };
    }
  }

  // Invalid code
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

/**
 * Returns strictly filtered available coupons for the specified brand.
 */
export async function getAvailableCouponsServer(params: {
  brand: "personal" | "suraksha";
  subtotalInr?: number;
}): Promise<AvailableCouponItem[]> {
  const { brand, subtotalInr = 0 } = params;
  const list: AvailableCouponItem[] = [];

  if (brand === "personal") {
    // 1. Fetch live product coupons from Supabase
    try {
      const supabase = getSupabaseAdminClient();
      const { data: dbProducts } = await supabase
        .from("TreelEcommerce.products")
        .select("_id, title, price, saleprice, couponcode, couponamount, productsku, category")
        .not("couponcode", "is", null);

      if (dbProducts && Array.isArray(dbProducts)) {
        for (const p of dbProducts) {
          const rawCode = (p.couponcode || "").trim().toUpperCase();
          if (rawCode && !SURAKSHA_CODES.has(rawCode)) {
            const rawAmount = String(p.couponamount || "").trim();
            let discountType: "percent" | "fixed" = "fixed";
            let discountValue = 0;

            if (rawAmount.endsWith("%")) {
              discountType = "percent";
              discountValue = parseFloat(rawAmount.replace("%", "")) || 10;
            } else {
              discountType = "fixed";
              discountValue = parseFloat(rawAmount) || 0;
            }

            list.push({
              code: rawCode,
              title: `${p.title} Special Offer`,
              discountType,
              discountValue,
              discountLabel: discountType === "percent" ? `${discountValue}% OFF` : `₹${discountValue.toLocaleString("en-IN")} FLAT OFF`,
              description: `Special discount for ${p.title} (SKU: ${p.productsku || "TRL"})`,
              minOrderValue: 0,
              brand: "personal",
              productTitle: p.title,
              isEligible: true,
            });
          }
        }
      }
    } catch (e) {
      console.warn("Error fetching product coupons:", e);
    }

    // 2. Personal TPMS Sitewide Promo Codes
    list.push(
      {
        code: "TREEL10",
        title: "10% Sitewide Discount",
        discountType: "percent",
        discountValue: 10,
        discountLabel: "10% OFF",
        description: "Official promotional discount valid on all Personal TPMS kits.",
        minOrderValue: 0,
        brand: "personal",
        isEligible: true,
      },
      {
        code: "WELCOME10",
        title: "Welcome Customer Offer",
        discountType: "percent",
        discountValue: 10,
        discountLabel: "10% OFF",
        description: "Special 10% introductory offer on your first smart TPMS order.",
        minOrderValue: 0,
        brand: "personal",
        isEligible: true,
      },
      {
        code: "FREESHIP",
        title: "Express Shipping Bonus",
        discountType: "percent",
        discountValue: 5,
        discountLabel: "5% OFF",
        description: "Free express pan-India delivery + 5% bonus checkout discount.",
        minOrderValue: 0,
        brand: "personal",
        isEligible: true,
      },
      {
        code: "TREEL500",
        title: "Flat ₹500 Mega Savings",
        discountType: "fixed",
        discountValue: 500,
        discountLabel: "₹500 FLAT OFF",
        description: "Flat ₹500 instant discount on orders of ₹2,500 and above.",
        minOrderValue: 2500,
        brand: "personal",
        isEligible: subtotalInr >= 2500 || subtotalInr === 0,
        ineligibilityReason: subtotalInr > 0 && subtotalInr < 2500 ? `Requires minimum order of ₹2,500 (Add ₹${(2500 - subtotalInr).toLocaleString("en-IN")} more)` : undefined,
      }
    );
  } else if (brand === "suraksha") {
    // Suraksha Commercial Fleet Promo Codes
    list.push(
      {
        code: "SURAKSHA10",
        title: "Suraksha Fleet Safety Discount",
        discountType: "percent",
        discountValue: 10,
        discountLabel: "10% OFF",
        description: "10% discount on complete commercial truck TPMS safety kits.",
        minOrderValue: 0,
        brand: "suraksha",
        isEligible: true,
      },
      {
        code: "FLEET10",
        title: "Commercial Transporter Promo",
        discountType: "percent",
        discountValue: 10,
        discountLabel: "10% OFF",
        description: "Special 10% fleet pricing discount for verified truck transporters.",
        minOrderValue: 0,
        brand: "suraksha",
        isEligible: true,
      }
    );
  }

  // Deduplicate by code
  const uniqueMap = new Map<string, AvailableCouponItem>();
  for (const item of list) {
    if (!uniqueMap.has(item.code)) {
      uniqueMap.set(item.code, item);
    }
  }

  return Array.from(uniqueMap.values());
}
