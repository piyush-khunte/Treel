"use client";

import { CartItem } from "@/types/database";
import React,{ createContext,useContext,useEffect,useState,useRef } from "react";

export interface AppliedCoupon {
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  discountAmountInr: number;
  message?: string;
  appliedProductName?: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalInr: number;
  discountInr: number;
  taxInr: number;
  shippingInr: number;
  totalInr: number;
  couponCode: string;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message?: string; discountInr?: number }>;
  removeCoupon: () => void;
}

interface CombinedCartContextType {
  personalCart: CartContextType;
  surakshaCart: CartContextType;
}

const CombinedCartContext = createContext<CombinedCartContextType | undefined>(undefined);

export function isSurakshaItem(item: { variant_id?: string; sku?: string; vehicle_type?: string; name?: string; title?: string }): boolean {
  if (!item) return false;
  const vid = (item.variant_id || "").toLowerCase();
  const sku = (item.sku || "").toUpperCase();
  const vtype = (item.vehicle_type || "").toLowerCase();
  const name = (item.name || item.title || "").toLowerCase();

  return (
    vid.startsWith("suraksha") ||
    sku.includes("SURAKSHA") ||
    vtype === "truck" ||
    vtype === "commercial" ||
    name.includes("suraksha")
  );
}

export function isPersonalItem(item: { variant_id?: string; sku?: string; vehicle_type?: string; name?: string; title?: string }): boolean {
  return !isSurakshaItem(item);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // -------------------------------------------------------------
  // 1. PERSONAL TPMS CART STATE (Namespace: treel_guest_cart)
  // -------------------------------------------------------------
  const [personalItems, setPersonalItems] = useState<CartItem[]>([]);
  const [personalCoupon, setPersonalCoupon] = useState<string>("");
  const [personalAppliedCoupon, setPersonalAppliedCoupon] = useState<AppliedCoupon | null>(null);

  // -------------------------------------------------------------
  // 2. SURAKSHA COMMERCIAL CART STATE (Namespace: treel_suraksha_cart)
  // -------------------------------------------------------------
  const [surakshaItems, setSurakshaItems] = useState<CartItem[]>([]);
  const [surakshaCoupon, setSurakshaCoupon] = useState<string>("");
  const [surakshaAppliedCoupon, setSurakshaAppliedCoupon] = useState<AppliedCoupon | null>(null);

  const isInitializedRef = useRef(false);

  // Load from localStorage on client during browser idle to avoid blocking initial paint
  useEffect(() => {
    const initCart = () => {
      try {
        // Personal cart
        const savedPersonal = localStorage.getItem("treel_guest_cart");
        if (savedPersonal) {
          const parsed = JSON.parse(savedPersonal);
          if (Array.isArray(parsed)) {
            const cleanPersonal = parsed.filter(isPersonalItem);
            setPersonalItems(cleanPersonal);
            if (cleanPersonal.length !== parsed.length) {
              localStorage.setItem("treel_guest_cart", JSON.stringify(cleanPersonal));
            }
          }
        }

        const savedPersonalCoupon = localStorage.getItem("treel_personal_coupon");
        if (savedPersonalCoupon) {
          try {
            const parsedCoupon = JSON.parse(savedPersonalCoupon);
            if (parsedCoupon && parsedCoupon.code) {
              setPersonalCoupon(parsedCoupon.code);
              setPersonalAppliedCoupon(parsedCoupon);
            }
          } catch {}
        }

        // Suraksha cart
        const savedSuraksha = localStorage.getItem("treel_suraksha_cart");
        if (savedSuraksha) {
          const parsed = JSON.parse(savedSuraksha);
          if (Array.isArray(parsed)) {
            const cleanSuraksha = parsed.filter(isSurakshaItem);
            const normalizedSuraksha = cleanSuraksha.map((item) => {
              if (item.price_inr === 1700 && ((item.sensor_count && item.sensor_count > 1) || (item.quantity && item.quantity > 1))) {
                const sensors = item.sensor_count || item.quantity || 6;
                return {
                  ...item,
                  price_inr: sensors * 1700,
                  mrp_inr: Math.round(sensors * 1700 * 1.18),
                  quantity: 1,
                  sensor_count: sensors,
                };
              }
              return item;
            });
            setSurakshaItems(normalizedSuraksha);
            localStorage.setItem("treel_suraksha_cart", JSON.stringify(normalizedSuraksha));
          }
        }

        const savedSurakshaCoupon = localStorage.getItem("treel_suraksha_coupon");
        if (savedSurakshaCoupon) {
          try {
            const parsedCoupon = JSON.parse(savedSurakshaCoupon);
            if (parsedCoupon && parsedCoupon.code) {
              setSurakshaCoupon(parsedCoupon.code);
              setSurakshaAppliedCoupon(parsedCoupon);
            }
          } catch {}
        }
      } catch (e) {
        console.error("Failed to parse carts from storage", e);
      } finally {
        isInitializedRef.current = true;
      }
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const id = (window as unknown as { requestIdleCallback: (fn: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(initCart, { timeout: 1000 });
        return () => {
          if ("cancelIdleCallback" in window) {
            (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
          }
        };
      } else {
        const timer = setTimeout(initCart, 100);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Save Personal items to localStorage
  useEffect(() => {
    if (!isInitializedRef.current) return;
    try {
      const cleanPersonal = personalItems.filter(isPersonalItem);
      localStorage.setItem("treel_guest_cart", JSON.stringify(cleanPersonal));
    } catch (e) {
      console.error("Failed to save personal cart", e);
    }
  }, [personalItems]);

  // Save Personal coupon to localStorage
  useEffect(() => {
    if (!isInitializedRef.current) return;
    try {
      if (personalAppliedCoupon) {
        localStorage.setItem("treel_personal_coupon", JSON.stringify(personalAppliedCoupon));
      } else {
        localStorage.removeItem("treel_personal_coupon");
      }
    } catch (e) {
      console.error("Failed to save personal coupon", e);
    }
  }, [personalAppliedCoupon]);

  // Save Suraksha items to localStorage
  useEffect(() => {
    if (!isInitializedRef.current) return;
    try {
      const cleanSuraksha = surakshaItems.filter(isSurakshaItem);
      localStorage.setItem("treel_suraksha_cart", JSON.stringify(cleanSuraksha));
    } catch (e) {
      console.error("Failed to save suraksha cart", e);
    }
  }, [surakshaItems]);

  // Save Suraksha coupon to localStorage
  useEffect(() => {
    if (!isInitializedRef.current) return;
    try {
      if (surakshaAppliedCoupon) {
        localStorage.setItem("treel_suraksha_coupon", JSON.stringify(surakshaAppliedCoupon));
      } else {
        localStorage.removeItem("treel_suraksha_coupon");
      }
    } catch (e) {
      console.error("Failed to save suraksha coupon", e);
    }
  }, [surakshaAppliedCoupon]);

  // -------------------------------------------------------------
  // PERSONAL CART METHODS
  // -------------------------------------------------------------
  const addPersonalItem = (newItem: CartItem) => {
    if (isSurakshaItem(newItem)) {
      console.warn("[Cart] Cross-brand item rejected: Suraksha commercial items cannot be added to Personal TPMS cart.", newItem);
      return;
    }
    setPersonalItems((prev) => {
      const cleanPrev = prev.filter(isPersonalItem);
      const existingIndex = cleanPrev.findIndex((i) => i.variant_id === newItem.variant_id);
      if (existingIndex > -1) {
        const updated = [...cleanPrev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...cleanPrev, newItem];
    });
  };

  const removePersonalItem = (variantId: string) => {
    setPersonalItems((prev) => prev.filter((i) => i.variant_id !== variantId));
  };

  const updatePersonalQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removePersonalItem(variantId);
      return;
    }
    setPersonalItems((prev) =>
      prev.map((i) => (i.variant_id === variantId ? { ...i, quantity } : i))
    );
  };

  const clearPersonalCart = () => {
    setPersonalItems([]);
    setPersonalCoupon("");
    setPersonalAppliedCoupon(null);
    try {
      localStorage.removeItem("treel_guest_cart");
      localStorage.removeItem("treel_personal_coupon");
    } catch {}
  };

  const applyPersonalCoupon = async (code: string): Promise<{ success: boolean; message?: string; discountInr?: number }> => {
    const clean = (code || "").trim().toUpperCase();
    if (!clean) {
      return { success: false, message: "Please enter a coupon code." };
    }

    if (personalItems.length === 0) {
      return { success: false, message: "Your cart is empty." };
    }

    const currentSubtotal = personalItems.reduce((acc, i) => acc + i.price_inr * i.quantity, 0);

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: clean,
          items: personalItems,
          subtotalInr: currentSubtotal,
          brand: "personal",
        }),
      });

      const json = await res.json();
      if (res.ok && json.success && json.data) {
        const couponData: AppliedCoupon = {
          code: json.data.code,
          discountType: json.data.discountType,
          discountValue: json.data.discountValue,
          discountAmountInr: json.data.discountAmountInr,
          message: json.data.message,
          appliedProductName: json.data.appliedProductName,
        };
        setPersonalCoupon(couponData.code);
        setPersonalAppliedCoupon(couponData);
        return {
          success: true,
          message: couponData.message || `Coupon "${couponData.code}" applied!`,
          discountInr: couponData.discountAmountInr,
        };
      } else {
        return {
          success: false,
          message: json.error || "Invalid or expired coupon code.",
        };
      }
    } catch (err: any) {
      // Offline fallback for known promotional codes
      if (clean === "TREEL10" || clean === "WELCOME10") {
        const discountAmount = Math.round((currentSubtotal * 10) / 100);
        const fallbackCoupon: AppliedCoupon = {
          code: clean,
          discountType: "percent",
          discountValue: 10,
          discountAmountInr: discountAmount,
          message: "10% promotional discount applied!",
        };
        setPersonalCoupon(clean);
        setPersonalAppliedCoupon(fallbackCoupon);
        return { success: true, message: fallbackCoupon.message, discountInr: discountAmount };
      }
      return {
        success: false,
        message: err?.message || "Could not validate coupon code. Please try again.",
      };
    }
  };

  const removePersonalCoupon = () => {
    setPersonalCoupon("");
    setPersonalAppliedCoupon(null);
    try {
      localStorage.removeItem("treel_personal_coupon");
    } catch {}
  };

  const personalTotalItems = personalItems.reduce((acc, i) => acc + i.quantity, 0);
  const personalSubtotalInr = personalItems.reduce((acc, i) => acc + i.price_inr * i.quantity, 0);

  // Compute discount accurately based on verified coupon data
  let personalDiscountInr = 0;
  if (personalAppliedCoupon && personalSubtotalInr > 0) {
    if (typeof personalAppliedCoupon.discountAmountInr === "number" && personalAppliedCoupon.discountAmountInr > 0) {
      personalDiscountInr = Math.min(personalAppliedCoupon.discountAmountInr, personalSubtotalInr);
    } else if (personalAppliedCoupon.discountType === "percent") {
      personalDiscountInr = Math.round((personalSubtotalInr * personalAppliedCoupon.discountValue) / 100);
    } else {
      personalDiscountInr = Math.min(personalAppliedCoupon.discountValue, personalSubtotalInr);
    }
  }

  const personalTaxInr = Math.round(((personalSubtotalInr - personalDiscountInr) * 0.18) / 1.18);
  const personalShippingInr = 0;
  const personalTotalInr = Math.max(0, personalSubtotalInr - personalDiscountInr + personalShippingInr);

  // -------------------------------------------------------------
  // SURAKSHA CART METHODS
  // -------------------------------------------------------------
  const addSurakshaItem = (newItem: CartItem) => {
    if (!isSurakshaItem(newItem)) {
      console.warn("[Cart] Cross-brand item rejected: Non-Suraksha / Personal TPMS items cannot be added to Suraksha cart.", newItem);
      return;
    }
    setSurakshaItems((prev) => {
      const cleanPrev = prev.filter(isSurakshaItem);
      const existingIndex = cleanPrev.findIndex((i) => i.variant_id === newItem.variant_id);
      if (existingIndex > -1) {
        const updated = [...cleanPrev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          ...newItem,
          quantity: (updated[existingIndex].quantity || 1) + (newItem.quantity || 1),
        };
        return updated;
      }
      return [...cleanPrev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  const removeSurakshaItem = (variantId: string) => {
    setSurakshaItems((prev) => prev.filter((i) => i.variant_id !== variantId));
  };

  const updateSurakshaQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeSurakshaItem(variantId);
      return;
    }
    setSurakshaItems((prev) =>
      prev.map((i) =>
        i.variant_id === variantId
          ? {
              ...i,
              quantity,
            }
          : i
      )
    );
  };

  const clearSurakshaCart = () => {
    setSurakshaItems([]);
    setSurakshaCoupon("");
    setSurakshaAppliedCoupon(null);
    try {
      localStorage.removeItem("treel_suraksha_cart");
    } catch {}
  };

  const applySurakshaCoupon = async (code: string): Promise<{ success: boolean; message?: string; discountInr?: number }> => {
    const clean = (code || "").trim().toUpperCase();
    if (!clean) {
      return { success: false, message: "Please enter a coupon code." };
    }

    if (surakshaItems.length === 0) {
      return { success: false, message: "Your Suraksha cart is empty." };
    }

    const currentSubtotal = surakshaItems.reduce((acc, i) => acc + i.price_inr * i.quantity, 0);

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: clean,
          items: surakshaItems,
          subtotalInr: currentSubtotal,
          brand: "suraksha",
        }),
      });

      const json = await res.json();
      if (res.ok && json.success && json.data) {
        const couponData: AppliedCoupon = {
          code: json.data.code,
          discountType: json.data.discountType,
          discountValue: json.data.discountValue,
          discountAmountInr: json.data.discountAmountInr,
          message: json.data.message,
          appliedProductName: json.data.appliedProductName,
        };
        setSurakshaCoupon(couponData.code);
        setSurakshaAppliedCoupon(couponData);
        return {
          success: true,
          message: couponData.message || `Coupon "${couponData.code}" applied!`,
          discountInr: couponData.discountAmountInr,
        };
      } else {
        return {
          success: false,
          message: json.error || "Invalid or expired coupon code.",
        };
      }
    } catch (err: any) {
      // Offline fallback for known Suraksha promotional codes
      if (clean === "SURAKSHA10" || clean === "FLEET10") {
        const discountAmount = Math.round((currentSubtotal * 10) / 100);
        const fallbackCoupon: AppliedCoupon = {
          code: clean,
          discountType: "percent",
          discountValue: 10,
          discountAmountInr: discountAmount,
          message: "10% Fleet discount applied!",
        };
        setSurakshaCoupon(clean);
        setSurakshaAppliedCoupon(fallbackCoupon);
        return { success: true, message: fallbackCoupon.message, discountInr: discountAmount };
      }
      return {
        success: false,
        message: err?.message || "Could not validate coupon code. Please try again.",
      };
    }
  };

  const removeSurakshaCoupon = () => {
    setSurakshaCoupon("");
    setSurakshaAppliedCoupon(null);
    try {
      localStorage.removeItem("treel_suraksha_coupon");
    } catch {}
  };

  const surakshaTotalItems = surakshaItems.reduce((acc, i) => acc + i.quantity, 0);
  const surakshaSubtotalInr = surakshaItems.reduce((acc, i) => acc + i.price_inr * i.quantity, 0);
  let surakshaDiscountInr = 0;
  if (surakshaAppliedCoupon && surakshaSubtotalInr > 0) {
    if (typeof surakshaAppliedCoupon.discountAmountInr === "number" && surakshaAppliedCoupon.discountAmountInr > 0) {
      surakshaDiscountInr = Math.min(surakshaAppliedCoupon.discountAmountInr, surakshaSubtotalInr);
    } else if (surakshaAppliedCoupon.discountType === "percent") {
      surakshaDiscountInr = Math.round((surakshaSubtotalInr * surakshaAppliedCoupon.discountValue) / 100);
    } else {
      surakshaDiscountInr = Math.min(surakshaAppliedCoupon.discountValue, surakshaSubtotalInr);
    }
  }
  const surakshaTaxInr = Math.round(((surakshaSubtotalInr - surakshaDiscountInr) * 0.18) / 1.18);
  const surakshaShippingInr = 0;
  const surakshaTotalInr = Math.max(0, surakshaSubtotalInr - surakshaDiscountInr + surakshaShippingInr);

  const personalCartContextValue: CartContextType = {
    items: personalItems,
    addItem: addPersonalItem,
    removeItem: removePersonalItem,
    updateQuantity: updatePersonalQuantity,
    clearCart: clearPersonalCart,
    totalItems: personalTotalItems,
    subtotalInr: personalSubtotalInr,
    discountInr: personalDiscountInr,
    taxInr: personalTaxInr,
    shippingInr: personalShippingInr,
    totalInr: personalTotalInr,
    couponCode: personalCoupon,
    appliedCoupon: personalAppliedCoupon,
    applyCoupon: applyPersonalCoupon,
    removeCoupon: removePersonalCoupon,
  };

  const surakshaCartContextValue: CartContextType = {
    items: surakshaItems,
    addItem: addSurakshaItem,
    removeItem: removeSurakshaItem,
    updateQuantity: updateSurakshaQuantity,
    clearCart: clearSurakshaCart,
    totalItems: surakshaTotalItems,
    subtotalInr: surakshaSubtotalInr,
    discountInr: surakshaDiscountInr,
    taxInr: surakshaTaxInr,
    shippingInr: surakshaShippingInr,
    totalInr: surakshaTotalInr,
    couponCode: surakshaCoupon,
    appliedCoupon: surakshaAppliedCoupon,
    applyCoupon: applySurakshaCoupon,
    removeCoupon: removeSurakshaCoupon,
  };

  return (
    <CombinedCartContext.Provider
      value={{
        personalCart: personalCartContextValue,
        surakshaCart: surakshaCartContextValue,
      }}
    >
      {children}
    </CombinedCartContext.Provider>
  );
}

/**
 * Standard hook for Personal TPMS Cart.
 * Maintains 100% backward compatibility for all existing Personal TPMS store pages.
 */
export function useCart(): CartContextType {
  const context = useContext(CombinedCartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context.personalCart;
}

/**
 * Hook for Personal TPMS Cart explicitly.
 */
export function usePersonalCart(): CartContextType {
  return useCart();
}

/**
 * Dedicated hook for Suraksha Commercial Cart.
 * Reads & writes ONLY to treel_suraksha_cart.
 */
export function useSurakshaCart(): CartContextType {
  const context = useContext(CombinedCartContext);
  if (!context) {
    throw new Error("useSurakshaCart must be used within a CartProvider");
  }
  return context.surakshaCart;
}
