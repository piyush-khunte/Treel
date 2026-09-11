"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Trash2, ShoppingBag, Plus, Minus, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/lib/commerce/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalInr, totalItems } = useCart();

  return (
    <div className="space-y-0 bg-white text-slate-900 font-manrope min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 font-manrope text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              SHOPPING CART
            </div>
            <h1 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Your Personal TPMS Cart
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-manrope">
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
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-manrope text-2xl font-bold text-slate-900">Your cart is empty</h2>
              <p className="text-slate-600 text-sm">
                Explore our smart TPMS kits for cars, SUVs, motorcycles, and commercial vehicles.
              </p>
              <div>
                <Link
                  href="/personal/buy"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-md"
                >
                  Shop Smart TPMS Kits <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Items List */}
              <div className="lg:col-span-8 space-y-6">
                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200">
                  {items.map((item) => (
                    <div key={item.variant_id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <h3 className="font-manrope font-bold text-lg text-slate-900">{item.name}</h3>
                        <div className="text-xs text-slate-500">SKU: {item.sku} · Official 1-Year Warranty</div>
                        <div className="text-base font-extrabold text-blue-600 pt-1">₹{item.price_inr.toLocaleString()}</div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => updateQuantity(item.variant_id, Math.max(1, item.quantity - 1))}
                            className="p-2 text-slate-600 hover:bg-slate-200 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-4 text-sm font-bold text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                            className="p-2 text-slate-600 hover:bg-slate-200 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <div className="text-base font-bold text-slate-900">
                            ₹{(item.price_inr * item.quantity).toLocaleString()}
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.variant_id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Link href="/personal/buy" className="text-blue-600 font-bold text-sm hover:underline">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl space-y-6 shadow-sm">
                  <h3 className="font-manrope text-xl font-bold text-slate-900">Order Summary</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Items:</span>
                      <span className="font-bold text-slate-900">{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-bold text-slate-900">₹{totalInr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Express Shipping (India):</span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>GST (Included):</span>
                      <span className="font-bold text-slate-900">18%</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex justify-between text-lg font-bold text-slate-900">
                      <span>Estimated Total:</span>
                      <span className="text-blue-600">₹{totalInr.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    href="/personal/buy/checkout"
                    className="w-full py-4 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2 block text-center"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="space-y-2 pt-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Free Express Pan-India Delivery (2-4 business days)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
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
