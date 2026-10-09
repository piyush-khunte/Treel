"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useSurakshaCart } from "@/lib/commerce/cart-context";

interface PricingBuyButtonProps {
  tyres: number;
  type: string;
}

export function PricingBuyButton({ tyres, type }: PricingBuyButtonProps) {
  const router = useRouter();
  const { addItem, updateQuantity, items } = useSurakshaCart();
  const [loading, setLoading] = useState(false);

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const surakshaItem = {
      variant_id: "suraksha-sensor-kit",
      sku: `SKU-SURAKSHA-${tyres}TYRE`,
      name: `Treel Suraksha Commercial Safety Kit (${tyres} Tyres)`,
      price_inr: 1700,
      mrp_inr: 2000,
      quantity: tyres,
      sensor_count: tyres,
      vehicle_type: "truck",
      image_url:
        "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
    };

    const existing = items.find((i) => i.variant_id === "suraksha-sensor-kit");
    if (existing) {
      updateQuantity("suraksha-sensor-kit", tyres);
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
