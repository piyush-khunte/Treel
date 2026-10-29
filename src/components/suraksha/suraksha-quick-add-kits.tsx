"use client";

import { useSurakshaCart } from "@/lib/commerce/cart-context";
import { Check, Plus, Sparkles } from "lucide-react";
import React from "react";

export const SURAKSHA_KITS = [
  {
    type: "6-Wheeler",
    tyres: 6,
    price: 10200,
    axleSetup: "2 Axles · Steer & Drive",
    variant_id: "suraksha_6w",
    sku: "SKU-SURAKSHA-6W",
    name: "Treel Suraksha Commercial Safety Kit (6 Tyres)",
  },
  {
    type: "10-Wheeler",
    tyres: 10,
    price: 17000,
    axleSetup: "3 Axles · Multi-Axle",
    variant_id: "suraksha_10w",
    sku: "SKU-SURAKSHA-10W",
    name: "Treel Suraksha Commercial Safety Kit (10 Tyres)",
  },
  {
    type: "12-Wheeler",
    tyres: 12,
    price: 20400,
    axleSetup: "4 Axles · Heavy Commercial",
    variant_id: "suraksha_12w",
    sku: "SKU-SURAKSHA-12W",
    name: "Treel Suraksha Commercial Safety Kit (12 Tyres)",
  },
  {
    type: "14-Wheeler",
    tyres: 14,
    price: 23800,
    axleSetup: "4-5 Axles · Multi-Axle Goods",
    variant_id: "suraksha_14w",
    sku: "SKU-SURAKSHA-14W",
    name: "Treel Suraksha Commercial Safety Kit (14 Tyres)",
  },
  {
    type: "16-Wheeler",
    tyres: 16,
    price: 27200,
    axleSetup: "5 Axles · Heavy Haulage",
    variant_id: "suraksha_16w",
    sku: "SKU-SURAKSHA-16W",
    name: "Treel Suraksha Commercial Safety Kit (16 Tyres)",
  },
  {
    type: "18-Wheeler",
    tyres: 18,
    price: 30600,
    axleSetup: "Multi-Axle Trailer",
    variant_id: "suraksha_18w",
    sku: "SKU-SURAKSHA-18W",
    name: "Treel Suraksha Commercial Safety Kit (18 Tyres)",
  },
];

interface SurakshaQuickAddKitsProps {
  title?: string;
  subtitle?: string;
}

export function SurakshaQuickAddKits({
  title = "Add Kits For Other Trucks In Your Fleet",
  subtitle = "Have multiple commercial vehicles? Add kits for each truck configuration at ₹1,700 per tyre with 1 click.",
}: SurakshaQuickAddKitsProps) {
  const { items, addItem, updateQuantity } = useSurakshaCart();

  return (
    <div className="rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 p-5 sm:p-6 space-y-4 shadow-sm">
      <div className="border-b border-[#451A03]/10 pb-3">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#DC2626] bg-[#DC2626]/10 px-2 py-0.5 rounded">
          <Sparkles className="w-3 h-3" /> Multi-Vehicle Fleet Order
        </div>
        <h3 className="font-anton text-xl sm:text-2xl text-[#451A03] uppercase mt-1">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#78350F] font-medium mt-0.5">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SURAKSHA_KITS.map((kit) => {
          const inCartItem = items.find((i) => i.variant_id === kit.variant_id);
          return (
            <div
              key={kit.variant_id}
              className={`p-3.5 rounded-[6px] border-2 transition-all flex flex-col justify-between gap-3 ${
                inCartItem
                  ? "bg-[#FEF3C7] border-[#047857]/40 ring-2 ring-[#047857]/20"
                  : "bg-white border-[#451A03]/15 hover:border-[#DC2626]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-anton text-lg text-[#451A03] uppercase">
                    {kit.type}
                  </span>
                  <span className="font-anton text-base text-[#DC2626]">
                    ₹{kit.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-[11px] text-[#78350F] font-semibold mt-0.5">
                  {kit.tyres} tyres · ₹1,700/tyre
                </div>
                <div className="text-[10px] text-[#78350F]/80">
                  {kit.axleSetup}
                </div>
              </div>

              <div className="pt-2 border-t border-[#451A03]/10">
                {inCartItem ? (
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#047857]">
                      <Check className="w-3.5 h-3.5" /> Added (×{inCartItem.quantity})
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(kit.variant_id, inCartItem.quantity + 1)}
                      className="px-2.5 py-1 rounded bg-[#047857] text-white font-bold text-[11px] hover:bg-[#065F46] transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                      title="Add another kit of this configuration"
                    >
                      <Plus className="w-3 h-3" /> Add +1
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        id: kit.variant_id,
                        variant_id: kit.variant_id,
                        sku: kit.sku,
                        name: kit.name,
                        price_inr: kit.price,
                        mrp_inr: Math.round(kit.price * 1.18),
                        quantity: 1,
                        sensor_count: kit.tyres,
                        vehicle_type: "truck",
                        image_url:
                          "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
                      })
                    }
                    className="w-full py-1.5 px-3 rounded-[4px] bg-[#DC2626] text-[#FEF3C7] font-bold text-xs hover:bg-[#B91C1C] transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase font-rubik shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add {kit.type} Kit
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

