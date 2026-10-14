"use client";

import { useSurakshaCart } from "@/lib/commerce/cart-context";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React,{ useState } from "react";

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
  const { addItem, updateQuantity, items } = useSurakshaCart();
  const [loading, setLoading] = useState(false);

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const effectivePrice = price && price > 0 ? price : tyres * 1700;
    const pricePerTyre = tyres > 0 ? Math.round(effectivePrice / tyres) : 1700;
    const effectiveSku = sku || `SKU-SURAKSHA-${tyres}W`;
    const effectiveName = title || `Treel Suraksha Commercial Safety Kit (${tyres} Tyres)`;
    const variantId = `suraksha_${tyres}w`;

    const surakshaItem = {
      id: productId || variantId,
      variant_id: variantId,
      sku: effectiveSku,
      name: effectiveName,
      price_inr: pricePerTyre,
      mrp_inr: Math.round(pricePerTyre * 1.18),
      quantity: tyres,
      sensor_count: tyres,
      vehicle_type: "truck",
      image_url:
        "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
    };

    const existing = items.find(
      (i) =>
        i.id === (productId || variantId) ||
        i.variant_id === variantId ||
        i.variant_id === "suraksha-sensor-kit"
    );
    if (existing) {
      updateQuantity(existing.variant_id, tyres);
    } else {
      addItem(surakshaItem);
    }

    router.push("/suraksha/cart");
  };

  return (
    <button
      type="button"
      onClick={handleBuy}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] font-rubik text-xs font-bold bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] transition-all shadow-sm cursor-pointer disabled:opacity-60"
    >
      <span>{loading ? "Adding..." : "Get Suraksha"}</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  );
}
