/**
 * Server-side & shared brand validation for Treel commerce.
 * Strictly separates Personal TPMS and Treel Suraksha commercial items.
 */

export type CommercialBrand = "personal" | "suraksha";

export function isSurakshaProductOrItem(item: any): boolean {
  if (!item) return false;

  const brand = (item.brand || item.brand_scope || "").toLowerCase().trim();
  if (brand === "suraksha") return true;
  if (brand === "personal") return false;

  const vid = (item.variant_id || item.id || item._id || "").toString().toLowerCase();
  const sku = (item.sku || item.productsku || "").toString().toUpperCase();
  const vtype = (item.vehicle_type || "").toString().toLowerCase();
  const cat = (item.category || "").toString().toLowerCase();
  const title = (item.title || item.name || "").toString().toLowerCase();

  return (
    vid.startsWith("suraksha") ||
    sku.includes("SURAKSHA") ||
    vtype === "truck" ||
    vtype === "commercial" ||
    cat.includes("suraksha") ||
    cat.includes("commercial") ||
    cat.includes("truck") ||
    title.includes("suraksha")
  );
}

export function isPersonalProductOrItem(item: any): boolean {
  if (!item) return false;

  const brand = (item.brand || item.brand_scope || "").toLowerCase().trim();
  if (brand === "personal") return true;
  if (brand === "suraksha") return false;

  return !isSurakshaProductOrItem(item);
}

export interface CartBrandValidationResult {
  valid: boolean;
  code?: string;
  error?: string;
}

export function validateCartBrandServer(
  items: any[],
  requestedBrand?: string
): CartBrandValidationResult {
  if (!Array.isArray(items) || items.length === 0) {
    return { valid: true };
  }

  const hasSuraksha = items.some(isSurakshaProductOrItem);
  const hasPersonal = items.some(isPersonalProductOrItem);

  if (hasSuraksha && hasPersonal) {
    return {
      valid: false,
      code: "CART_BRAND_CONTAMINATION",
      error: "Orders cannot mix Personal TPMS and Suraksha Commercial items. Please purchase them separately.",
    };
  }

  const cleanBrand = (requestedBrand || "").toLowerCase().trim();

  if (cleanBrand === "personal" && hasSuraksha) {
    return {
      valid: false,
      code: "CART_BRAND_CONTAMINATION",
      error: "Suraksha Commercial products cannot be checked out or added to Personal TPMS.",
    };
  }

  if (cleanBrand === "suraksha" && hasPersonal) {
    return {
      valid: false,
      code: "CART_BRAND_CONTAMINATION",
      error: "Personal TPMS products cannot be checked out or added to Suraksha Commercial.",
    };
  }

  return { valid: true };
}
