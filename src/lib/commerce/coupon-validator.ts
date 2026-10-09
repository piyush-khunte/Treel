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

export async function validateCouponServer(params: {
  code: string;
  items?: any[];
  subtotalInr: number;
}): Promise<CouponValidationResult> {
  const { code, items = [], subtotalInr } = params;
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

  // 1. Check Database (Supabase TreelEcommerce.products) for Admin-managed coupons
  let dbMatch: any = null;
  try {
    const supabase = getSupabaseAdminClient();
    const { data: dbProducts } = await supabase
      .from("TreelEcommerce.products")
      .select("_id, title, price, saleprice, couponcode, couponamount, productsku")
      .ilike("couponcode", cleanCode);

    if (dbProducts && dbProducts.length > 0) {
      dbMatch = dbProducts[0];
    }
  } catch (dbErr) {
    console.warn("Supabase coupon lookup fallback:", dbErr);
  }

  // 2. Fallback to catalog PERSONAL_PRODUCTS if offline/seeded
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
      };
    }
  }

  // A. Product-Specific Admin Coupon Found
  if (dbMatch && dbMatch.couponcode) {
    const rawAmount = String(dbMatch.couponamount || "").trim();
    let discountAmount = 0;
    let discountType: "percent" | "fixed" = "fixed";
    let discountValue = 0;

    // Check if coupon is percentage (e.g. "25%" or "10%")
    if (rawAmount.endsWith("%")) {
      const pct = parseFloat(rawAmount.replace("%", ""));
      discountType = "percent";
      discountValue = isNaN(pct) ? 10 : pct;
      discountAmount = Math.round((subtotalInr * discountValue) / 100);
    } else {
      // Fixed INR amount (e.g. "2249" or "500")
      const parsedFixed = parseFloat(rawAmount);
      if (!isNaN(parsedFixed) && parsedFixed > 0) {
        discountType = "fixed";
        discountValue = parsedFixed;
        // Apply fixed discount, capped at subtotal
        discountAmount = Math.min(parsedFixed, subtotalInr);
      } else {
        // Default percentage if amount is unspecified
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

  // B. Sitewide Promotional Coupons
  if (cleanCode === "TREEL10" || cleanCode === "WELCOME10" || cleanCode === "SURAKSHA10" || cleanCode === "FLEET10") {
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
