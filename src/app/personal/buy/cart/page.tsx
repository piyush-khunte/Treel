"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Trash2, ShoppingBag, Plus, Minus, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/lib/commerce/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalInr, totalItems } = useCart();

  return (
    <div className="space-y-0 bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em] inline-block">
              SHOPPING CART
            </div>
            <h1 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827]">
              Your Personal TPMS Cart
            </h1>
            <p className="text-[#4B5563] text-sm sm:text-base font-manrope">
              Review your items before proceeding to secure guest checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          {items.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16 space-y-6">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-manrope text-2xl font-bold text-[#111827]">Your cart is empty</h2>
              <p className="text-[#4B5563] text-sm">
                Explore our smart TPMS kits for cars, SUVs, motorcycles, and commercial vehicles.
              </p>
              <div>
                <Link
                  href="/personal/buy"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-md"
                >
                  Shop Smart TPMS Kits <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Items List */}
              <div className="lg:col-span-8 space-y-6">
                <div className="border border-black/[0.06] rounded-3xl overflow-hidden divide-y divide-black/[0.06]">
                  {items.map((item) => (
                    <div key={item.variant_id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <h3 className="font-manrope font-bold text-lg text-[#111827]">{item.name}</h3>
                        <div className="text-xs text-[#6B7280]">SKU: {item.sku} · Official 1-Year Warranty</div>
                        <div className="text-base font-extrabold text-[#2563EB] pt-1">₹{item.price_inr.toLocaleString()}</div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center border border-black/[0.06] rounded-lg overflow-hidden bg-[#F9FAFB]">
                          <button
                            onClick={() => updateQuantity(item.variant_id, Math.max(1, item.quantity - 1))}
                            className="p-2 text-[#4B5563] hover:bg-[#E5E7EB] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-4 text-sm font-bold text-[#111827]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                            className="p-2 text-[#4B5563] hover:bg-[#E5E7EB] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <div className="text-base font-bold text-[#111827]">
                            ₹{(item.price_inr * item.quantity).toLocaleString()}
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.variant_id)}
                          className="p-2 text-[#9CA3AF] hover:text-red-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Link href="/personal/buy" className="text-[#2563EB] font-bold text-sm hover:underline">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="bg-[#F9FAFB] border border-black/[0.06] p-8 rounded-3xl space-y-6 shadow-sm">
                  <h3 className="font-manrope text-xl font-bold text-[#111827]">Order Summary</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-[#4B5563]">
                      <span>Total Items:</span>
                      <span className="font-bold text-[#111827]">{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-[#4B5563]">
                      <span>Subtotal:</span>
                      <span className="font-bold text-[#111827]">₹{totalInr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#4B5563]">
                      <span>Express Shipping (India):</span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-[#4B5563]">
                      <span>GST (Included):</span>
                      <span className="font-bold text-[#111827]">18%</span>
                    </div>
                    <div className="pt-3 border-t border-black/[0.06] flex justify-between text-lg font-bold text-[#111827]">
                      <span>Estimated Total:</span>
                      <span className="text-[#2563EB]">₹{totalInr.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    href="/personal/buy/checkout"
                    className="w-full py-4 rounded-full bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-md flex items-center justify-center gap-2 block text-center"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="space-y-2 pt-2 text-xs text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span>Free Express Pan-India Delivery (2-4 business days)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span>1-Year Official Replacement Warranty Included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
