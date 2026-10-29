"use client";

import { useSurakshaCart } from "@/lib/commerce/cart-context";
import { ArrowRight, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface PricingBuyButtonProps {
  tyres: number;
  type: string;
  title?: string;
  price?: number;
  sku?: string;
  productId?: string;
}

export function PricingBuyButton({
  tyres,
  title,
  price,
  sku,
  productId,
}: PricingBuyButtonProps) {
  const router = useRouter();
  const { addItem, updateQuantity, removeItem, items } = useSurakshaCart();
  const [justAdded, setJustAdded] = useState(false);

  const kitPrice = price && price > 0 ? price : tyres * 1700;
  const effectiveSku = sku || `SKU-SURAKSHA-${tyres}W`;
  const effectiveName = title || `Treel Suraksha Commercial Safety Kit (${tyres} Tyres)`;
  const variantId = `suraksha_${tyres}w`;

  const existingItem = items.find((i) => i.variant_id === variantId);
  const isInCart = Boolean(existingItem && existingItem.quantity > 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    const surakshaItem = {
      id: productId || variantId,
      variant_id: variantId,
      sku: effectiveSku,
      name: effectiveName,
      price_inr: kitPrice,
      mrp_inr: Math.round(kitPrice * 1.18),
      quantity: 1,
      sensor_count: tyres,
      vehicle_type: "truck",
      image_url:
        "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
    };

    addItem(surakshaItem);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!existingItem) return;
    if (existingItem.quantity <= 1) {
      removeItem(variantId);
    } else {
      updateQuantity(variantId, existingItem.quantity - 1);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!existingItem) return;
    updateQuantity(variantId, existingItem.quantity + 1);
  };

  if (isInCart && existingItem) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-[4px] border-2 border-[#DC2626] bg-white overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={handleDecrease}
            className="w-8 h-8 flex items-center justify-center text-[#DC2626] hover:bg-[#FEF3C7] transition-colors cursor-pointer"
            aria-label="Decrease quantity"
            title="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 h-8 flex items-center justify-center font-anton text-sm text-[#451A03] border-x border-[#DC2626]/20 bg-[#FFFBEB]">
            {existingItem.quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center text-[#DC2626] hover:bg-[#FEF3C7] transition-colors cursor-pointer"
            aria-label="Increase quantity"
            title="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.push("/suraksha/cart")}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[4px] font-rubik text-xs font-bold bg-[#047857] text-white hover:bg-[#065F46] transition-all shadow-sm cursor-pointer"
          title="View Cart & Checkout"
        >
          <Check className="w-3.5 h-3.5" />
          <span>In Cart</span>
          <ArrowRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] font-rubik text-xs font-bold transition-all shadow-sm cursor-pointer ${
        justAdded
          ? "bg-[#047857] text-white"
          : "bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] active:scale-[0.98]"
      }`}
    >
      {justAdded ? (
        <>
          <Check className="w-3.5 h-3.5 text-white animate-in zoom-in" />
          <span>Added to Cart!</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Get Suraksha</span>
          <Plus className="w-3.5 h-3.5 ml-0.5" />
        </>
      )}
    </button>
  );
}
