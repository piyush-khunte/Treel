"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, ProductVariant } from "@/types/database";

interface CartContextType {
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
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Load from localStorage on client
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("treel_guest_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to parse cart from storage", e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("treel_guest_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.variant_id === newItem.variant_id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variant_id !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.variant_id === variantId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode("");
    setDiscountPercent(0);
    try {
      localStorage.removeItem("treel_guest_cart");
    } catch (e) {}
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "TREEL10" || clean === "WELCOME10") {
      setCouponCode(clean);
      setDiscountPercent(10);
      return true;
    }
    if (clean === "FREESHIP") {
      setCouponCode(clean);
      setDiscountPercent(5);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
  };

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotalInr = items.reduce((acc, i) => acc + i.price_inr * i.quantity, 0);
  const discountInr = Math.round((subtotalInr * discountPercent) / 100);
  const taxInr = Math.round(((subtotalInr - discountInr) * 0.18) / 1.18); // Inclusive 18% GST calculation
  const shippingInr = subtotalInr > 0 ? 0 : 0; // Free express delivery across India
  const totalInr = subtotalInr - discountInr + shippingInr;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalInr,
        discountInr,
        taxInr,
        shippingInr,
        totalInr,
        couponCode,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
