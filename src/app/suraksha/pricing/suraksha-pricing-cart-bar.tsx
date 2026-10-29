"use client";

import { useSurakshaCart } from "@/lib/commerce/cart-context";
import { ArrowRight, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";

export function SurakshaPricingCartBar() {
  const { items, totalInr, totalItems } = useSurakshaCart();

  if (items.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Suraksha Cart Summary Bar"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#451A03] text-[#FEF3C7] border-t-3 border-[#DC2626] shadow-2xl backdrop-blur-md px-4 py-3 sm:py-3.5 transition-all transform animate-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Left: Cart items badge and summary */}
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#DC2626] text-[#FEF3C7] shrink-0 shadow-md">
            <Truck className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FEF3C7] text-[#DC2626] font-anton text-xs flex items-center justify-center font-bold shadow-sm border border-[#DC2626]">
              {totalItems}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-anton text-base sm:text-lg tracking-wide uppercase text-[#FEF3C7]">
                SURAKSHA CART: {totalItems} {totalItems === 1 ? "KIT" : "KITS"}
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded bg-[#FEF3C7]/15 text-[10px] font-bold text-[#FEF3C7] uppercase tracking-wider">
                Fleet Ready
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#FEF3C7]/80 truncate max-w-[280px] sm:max-w-md">
              {items.map((item, idx) => {
                const sensors =
                  item.sensor_count ||
                  (item.variant_id && item.variant_id.match(/(\d+)w/i)
                    ? parseInt(item.variant_id.match(/(\d+)w/i)![1], 10)
                    : 6);
                return (
                  <span key={item.variant_id} className="inline-flex items-center gap-1">
                    {idx > 0 && <span className="opacity-40">+</span>}
                    <strong className="text-white font-semibold">{sensors}-Wheeler</strong>
                    <span className="opacity-90">(×{item.quantity})</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Price Total & Action Button */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#FEF3C7]/15">
          <div className="text-left sm:text-right">
            <div className="font-anton text-xl sm:text-2xl text-[#FEF3C7] tracking-tight leading-none">
              ₹{totalInr.toLocaleString("en-IN")}
            </div>
            <div className="text-[10px] font-medium text-[#FEF3C7]/70 mt-0.5">
              GST Included · Free Delivery
            </div>
          </div>

          <Link
            href="/suraksha/cart"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-[4px] bg-[#DC2626] text-[#FEF3C7] font-rubik text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#B91C1C] active:scale-[0.98] transition-all shadow-md shrink-0 cursor-pointer"
          >
            <span>View Cart &amp; Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

