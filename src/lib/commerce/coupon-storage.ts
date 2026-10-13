import fs from "fs";
import path from "path";
import { AdminCoupon, CouponCategory } from "@/types/admin";
import { createClient } from "@supabase/supabase-js";

function isSupabaseConfigured(): boolean {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && !url.includes("placeholder");
}

function getAdminClient() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://placeholder-treel.supabase.co";
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "placeholder-key";
  return createClient(url, key, { auth: { persistSession: false } });
}

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "coupons-store.json");

export const SEED_COUPONS: AdminCoupon[] = [
  // =========================================================================
  // PERSONAL TPMS COUPONS
  // =========================================================================
  {
    _id: "coup_promo_treel10",
    code: "TREEL10",
    discountType: "percent",
    discountValue: 10,
    productId: null,
    productTitle: "All Personal TPMS Products (Sitewide)",
    productSku: "PERSONAL-SITEWIDE",
    category: "PERSONAL_TPMS",
    minOrderValue: 0,
    status: "Active",
    description: "Official 10% sitewide promotional code for Personal TPMS",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "coup_promo_welcome10",
    code: "WELCOME10",
    discountType: "percent",
    discountValue: 10,
    productId: null,
    productTitle: "All Personal TPMS Products (Sitewide)",
    productSku: "PERSONAL-SITEWIDE",
    category: "PERSONAL_TPMS",
    minOrderValue: 0,
    status: "Active",
    description: "New customer 10% welcome discount code for Personal TPMS",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "coup_promo_freeship",
    code: "FREESHIP",
    discountType: "percent",
    discountValue: 5,
    productId: null,
    productTitle: "All Personal TPMS Products (Sitewide)",
    productSku: "PERSONAL-SITEWIDE",
    category: "PERSONAL_TPMS",
    minOrderValue: 0,
    status: "Active",
    description: "Free express shipping + 5% additional cart savings for Personal TPMS",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "coup_promo_treel500",
    code: "TREEL500",
    discountType: "fixed",
    discountValue: 500,
    productId: null,
    productTitle: "Personal TPMS Orders over ₹2,500",
    productSku: "PERSONAL-TIER-500",
    category: "PERSONAL_TPMS",
    minOrderValue: 2500,
    status: "Active",
    description: "Flat ₹500 instant savings on Personal TPMS orders of ₹2,500 and above",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },

  // =========================================================================
  // SURAKSHA COMMERCIAL FLEET COUPONS
  // =========================================================================
  {
    _id: "coup_promo_suraksha10",
    code: "SURAKSHA10",
    discountType: "percent",
    discountValue: 10,
    productId: null,
    productTitle: "All Suraksha Commercial Fleet Orders (Sitewide)",
    productSku: "SURAKSHA-SITEWIDE",
    category: "SURAKSHA",
    minOrderValue: 0,
    status: "Active",
    description: "10% commercial truck fleet safety discount code for Suraksha",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "coup_promo_fleet10",
    code: "FLEET10",
    discountType: "percent",
    discountValue: 10,
    productId: null,
    productTitle: "All Suraksha Commercial Fleet Orders (Sitewide)",
    productSku: "SURAKSHA-SITEWIDE",
    category: "SURAKSHA",
    minOrderValue: 0,
    status: "Active",
    description: "Special 10% fleet pricing discount for verified truck transporters",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

/**
 * Normalizes any coupon record ensuring backward compatibility and strict category assignment.
 */
export function normalizeCoupon(raw: any): AdminCoupon {
  const code = (raw.code || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  
  // Backward compatibility migration: determine explicit category if missing or legacy string
  let category: CouponCategory = "PERSONAL_TPMS";
  if (raw.category === "SURAKSHA" || raw.category === "Suraksha Commercial" || raw.category === "suraksha") {
    category = "SURAKSHA";
  } else if (raw.category === "PERSONAL_TPMS" || raw.category === "personal") {
    category = "PERSONAL_TPMS";
  } else {
    // Infer based on code or product metadata
    const codeCheck = code.toUpperCase();
    const productCheck = `${raw.productTitle || ""} ${raw.productSku || ""} ${raw.description || ""}`.toLowerCase();
    if (
      codeCheck === "SURAKSHA10" ||
      codeCheck === "FLEET10" ||
      productCheck.includes("suraksha") ||
      productCheck.includes("commercial") ||
      productCheck.includes("truck")
    ) {
      category = "SURAKSHA";
    } else {
      category = "PERSONAL_TPMS";
    }
  }

  const isExplicitProductScope =
    raw.scope === "product" ||
    (raw.scope !== "category" &&
      ((raw.productId && raw.productId !== "all") ||
        (Array.isArray(raw.productIds) && raw.productIds.length > 0)));

  const scope: "category" | "product" = isExplicitProductScope ? "product" : "category";

  let productIds: string[] | null = null;
  if (Array.isArray(raw.productIds)) {
    productIds = raw.productIds.filter(Boolean);
  } else if (raw.productId && raw.productId !== "all") {
    productIds = [raw.productId];
  }

  let productSkus: string[] | null = null;
  if (Array.isArray(raw.productSkus)) {
    productSkus = raw.productSkus.filter(Boolean);
  } else if (raw.productSku && !raw.productSku.toUpperCase().includes("SITEWIDE")) {
    productSkus = [raw.productSku];
  }

  const productId =
    scope === "category"
      ? null
      : raw.productId && raw.productId !== "all"
      ? raw.productId
      : productIds && productIds.length > 0
      ? productIds[0]
      : null;

  const productSku =
    scope === "category"
      ? (category === "SURAKSHA" ? "SURAKSHA-SITEWIDE" : "PERSONAL-SITEWIDE")
      : raw.productSku || (productSkus && productSkus.length > 0 ? productSkus[0] : null);

  const productTitle =
    scope === "category"
      ? (category === "SURAKSHA" ? "All Suraksha Commercial Fleet Orders (Sitewide)" : "All Personal TPMS Products (Sitewide)")
      : raw.productTitle || "Specified Product(s)";

  const discountType = raw.discountType === "fixed" ? "fixed" : "percent";
  const discountValue = Number(raw.discountValue) || 0;
  const status = raw.status === "Inactive" ? "Inactive" : "Active";
  const now = new Date().toISOString();

  return {
    _id: raw._id || `coup_${code.toLowerCase()}_${Date.now()}`,
    code,
    discountType,
    discountValue,
    scope,
    productId,
    productTitle,
    productSku,
    productIds,
    productSkus,
    category,
    minOrderValue: typeof raw.minOrderValue === "number" ? raw.minOrderValue : (Number(raw.minOrderValue) || 0),
    maxDiscount: typeof raw.maxDiscount === "number" ? raw.maxDiscount : (raw.maxDiscount ? Number(raw.maxDiscount) : null),
    startDate: raw.startDate || null,
    expiryDate: raw.expiryDate || null,
    maxUses: typeof raw.maxUses === "number" ? raw.maxUses : null,
    usedCount: typeof raw.usedCount === "number" ? raw.usedCount : 0,
    status,
    description: raw.description || "",
    createdAt: raw.createdAt || now,
    updatedAt: raw.updatedAt || now,
  };
}

function readLocalStore(): AdminCoupon[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeCoupon);
      }
    }
  } catch (err) {
    console.error("readLocalStore coupons error:", err);
  }
  writeLocalStore(SEED_COUPONS);
  return [...SEED_COUPONS];
}

function writeLocalStore(items: AdminCoupon[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalStore coupons error:", err);
  }
}

/**
 * Retrieves all coupons from persistent storage, optionally filtered by category.
 */
export async function getAllCoupons(category?: CouponCategory): Promise<AdminCoupon[]> {
  let list = readLocalStore();
  // Try sync with Supabase t_test table if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getAdminClient();
      const { data, error } = await supabase
        .from("TreelEcommerce.t_test")
        .select("*")
        .eq("testKey", "treel_coupons")
        .maybeSingle();

      if (!error && data && data.testValue) {
        try {
          const parsed = JSON.parse(data.testValue);
          if (Array.isArray(parsed) && parsed.length > 0) {
            list = parsed.map(normalizeCoupon);
            writeLocalStore(list);
          }
        } catch (parseErr) {
          console.error("Failed to parse TreelEcommerce.t_test coupons payload:", parseErr);
        }
      }
    } catch (syncErr) {
      // Fall back to local store
    }
  }

  // Ensure all seed coupons exist
  const existingCodes = new Set(list.map((c) => c.code.toUpperCase()));
  let modified = false;
  for (const seed of SEED_COUPONS) {
    if (!existingCodes.has(seed.code.toUpperCase())) {
      list.push(seed);
      modified = true;
    }
  }
  if (modified) {
    writeLocalStore(list);
  }

  if (category) {
    return list.filter((c) => c.category === category);
  }
  return list;
}

/**
 * Finds a coupon by code (case-insensitive).
 */
export async function getCouponByCode(code: string): Promise<AdminCoupon | null> {
  const cleanCode = (code || "").trim().toUpperCase();
  if (!cleanCode) return null;
  const all = await getAllCoupons();
  return all.find((c) => c.code.toUpperCase() === cleanCode) || null;
}

/**
 * Persists a coupon with strict server-side validation.
 */
export async function saveCoupon(
  coupon: Partial<AdminCoupon> & { code: string; category: CouponCategory }
): Promise<{ success: boolean; data?: AdminCoupon; error?: string }> {
  const cleanCode = (coupon.code || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  if (!cleanCode || cleanCode.length < 3) {
    return { success: false, error: "Coupon code must be at least 3 alphanumeric characters." };
  }

  if (!coupon.category || (coupon.category !== "PERSONAL_TPMS" && coupon.category !== "SURAKSHA")) {
    return {
      success: false,
      error: "Category must be strictly specified as either 'PERSONAL_TPMS' or 'SURAKSHA'.",
    };
  }

  const discountValue = Number(coupon.discountValue) || 0;
  if (discountValue <= 0) {
    return { success: false, error: "Discount value must be greater than zero." };
  }

  if (coupon.discountType === "percent" && discountValue > 100) {
    return { success: false, error: "Percentage discount cannot exceed 100%." };
  }

  const isProductScope =
    coupon.scope === "product" ||
    (coupon.scope !== "category" &&
      ((coupon.productId && coupon.productId !== "all") ||
        (Array.isArray(coupon.productIds) && coupon.productIds.length > 0)));

  if (isProductScope) {
    const hasProduct =
      (Array.isArray(coupon.productIds) && coupon.productIds.length > 0) ||
      (coupon.productId && coupon.productId !== "all");
    if (!hasProduct) {
      return {
        success: false,
        error: "At least one specific product must be selected for product-specific coupons.",
      };
    }
  }

  const all = await getAllCoupons();
  const now = new Date().toISOString();

  // Check if coupon exists with same code
  const existingIndex = all.findIndex((c) => c.code.toUpperCase() === cleanCode);
  const existing = existingIndex >= 0 ? all[existingIndex] : null;

  const updatedCoupon: AdminCoupon = normalizeCoupon({
    ...(existing || {}),
    ...coupon,
    _id: existing?._id || `coup_${cleanCode.toLowerCase()}_${Date.now()}`,
    code: cleanCode,
    category: coupon.category,
    discountType: coupon.discountType || "percent",
    discountValue,
    status: coupon.status || "Active",
    updatedAt: now,
    createdAt: existing?.createdAt || now,
  });

  let newList: AdminCoupon[];
  if (existingIndex >= 0) {
    newList = [...all];
    newList[existingIndex] = updatedCoupon;
  } else {
    newList = [updatedCoupon, ...all];
  }

  writeLocalStore(newList);

  // Sync to Supabase t_test table if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getAdminClient();
      await supabase.from("TreelEcommerce.t_test").upsert(
        {
          testKey: "treel_coupons",
          testValue: JSON.stringify(newList),
        },
        { onConflict: "testKey" }
      );

      // If attached to a product, sync to products table
      if (updatedCoupon.productId) {
        const formattedAmount =
          updatedCoupon.discountType === "percent"
            ? `${discountValue}%`
            : String(discountValue);

        await supabase
          .from("TreelEcommerce.products")
          .update({
            couponcode: updatedCoupon.status === "Inactive" ? null : cleanCode,
            couponamount: updatedCoupon.status === "Inactive" ? null : formattedAmount,
          })
          .eq("_id", updatedCoupon.productId);
      }
    } catch (dbErr) {
      console.warn("Failed to sync coupon to Supabase:", dbErr);
    }
  }

  return { success: true, data: updatedCoupon };
}

/**
 * Deletes a coupon by code.
 */
export async function deleteCoupon(
  code: string,
  category?: CouponCategory
): Promise<{ success: boolean; error?: string }> {
  const cleanCode = (code || "").trim().toUpperCase();
  if (!cleanCode) return { success: false, error: "Coupon code required." };

  const all = await getAllCoupons();
  const target = all.find(
    (c) => c.code.toUpperCase() === cleanCode && (!category || c.category === category)
  );

  if (!target) {
    return { success: false, error: `Coupon "${cleanCode}" not found.` };
  }

  const newList = all.filter(
    (c) => !(c.code.toUpperCase() === cleanCode && (!category || c.category === category))
  );

  writeLocalStore(newList);

  if (isSupabaseConfigured()) {
    try {
      const supabase = getAdminClient();
      await supabase.from("TreelEcommerce.t_test").upsert(
        {
          testKey: "treel_coupons",
          testValue: JSON.stringify(newList),
        },
        { onConflict: "testKey" }
      );

      // If product coupon, clear product's couponcode
      if (target.productId) {
        await supabase
          .from("TreelEcommerce.products")
          .update({ couponcode: null, couponamount: null })
          .eq("_id", target.productId);
      }
    } catch (err) {
      console.warn("Supabase coupon delete sync warning:", err);
    }
  }

  return { success: true };
}

/**
 * Toggles a coupon's active/inactive status.
 */
export async function toggleCouponStatus(
  code: string,
  category?: CouponCategory
): Promise<{ success: boolean; newStatus?: "Active" | "Inactive"; error?: string }> {
  const cleanCode = (code || "").trim().toUpperCase();
  const all = await getAllCoupons();
  const target = all.find(
    (c) => c.code.toUpperCase() === cleanCode && (!category || c.category === category)
  );

  if (!target) {
    return { success: false, error: `Coupon "${cleanCode}" not found.` };
  }

  const newStatus: "Active" | "Inactive" = target.status === "Active" ? "Inactive" : "Active";
  const saveRes = await saveCoupon({
    ...target,
    status: newStatus,
    category: target.category,
  });

  if (!saveRes.success) {
    return { success: false, error: saveRes.error };
  }

  return { success: true, newStatus };
}
