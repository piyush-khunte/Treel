"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartItem } from "@/types/database";

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

  // Load from localStorage on client with strict brand sanitization
  useEffect(() => {
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
          setSurakshaItems(cleanSuraksha);
          if (cleanSuraksha.length !== parsed.length) {
            localStorage.setItem("treel_suraksha_cart", JSON.stringify(cleanSuraksha));
          }
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
    }
  }, []);

  // Save Personal items to localStorage
  useEffect(() => {
    try {
      const cleanPersonal = personalItems.filter(isPersonalItem);
      localStorage.setItem("treel_guest_cart", JSON.stringify(cleanPersonal));
    } catch (e) {
      console.error("Failed to save personal cart", e);
    }
  }, [personalItems]);

  // Save Personal coupon to localStorage
  useEffect(() => {
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
    try {
      const cleanSuraksha = surakshaItems.filter(isSurakshaItem);
      localStorage.setItem("treel_suraksha_cart", JSON.stringify(cleanSuraksha));
    } catch (e) {
      console.error("Failed to save suraksha cart", e);
    }
  }, [surakshaItems]);

  // Save Suraksha coupon to localStorage
  useEffect(() => {
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
      addSurakshaItem(newItem);
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
    } catch (e) {}
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
    } catch (e) {}
  };

  const personalTotalItems = personalItems.reduce((acc, i) => acc + i.quantity, 0);
  const personalSubtotalInr = personalItems.reduce((acc, i) => acc + i.price_inr * i.quantity, 0);

  // Compute discount accurately based on coupon type
  let personalDiscountInr = 0;
  if (personalAppliedCoupon && personalSubtotalInr > 0) {
    if (personalAppliedCoupon.discountType === "percent") {
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
          quantity: newItem.quantity,
          sensor_count: newItem.sensor_count || newItem.quantity,
        };
        return updated;
      }
      return [...cleanPrev, newItem];
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
              sensor_count: quantity,
              name: `Treel Suraksha Commercial Safety Kit (${quantity} Tyres)`,
              sku: `SKU-SURAKSHA-${quantity}TYRE`,
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
    } catch (e) {}
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
    } catch (e) {}
  };

  const surakshaTotalItems = surakshaItems.reduce((acc, i) => acc + i.quantity, 0);
  const surakshaSubtotalInr = surakshaItems.reduce((acc, i) => acc + i.price_inr * i.quantity, 0);
  let surakshaDiscountInr = 0;
  if (surakshaAppliedCoupon && surakshaSubtotalInr > 0) {
    if (surakshaAppliedCoupon.discountType === "percent") {
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
