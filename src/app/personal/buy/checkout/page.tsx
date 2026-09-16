"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Lock, Truck, CreditCard } from "lucide-react";
import { useCart } from "@/lib/commerce/cart-context";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalInr, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    paymentMethod: "online"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      clearCart();
      router.push("/personal/buy/success");
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="py-24 text-center bg-white min-h-screen text-[#111827] font-manrope">
        <div className="max-w-md mx-auto space-y-6">
          <h1 className="text-3xl font-bold">No Items to Checkout</h1>
          <p className="text-[#4B5563]">Your cart is currently empty.</p>
          <Link href="/personal/buy" className="inline-block px-6 py-3 rounded-full bg-[#2563EB] text-white font-bold text-sm">
            Browse TPMS Kits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0 bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Header Banner */}
      <section className="pt-24 pb-12 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <Breadcrumb
              variant="personal"
              items={[
                { label: "Personal TPMS", href: "/personal" },
                { label: "Product Store", href: "/personal/buy" },
                { label: "Cart", href: "/personal/buy/cart" },
                { label: "Checkout" },
              ]}
            />
            <div className="text-xs font-bold uppercase tracking-widest text-[#2563EB] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> SECURE 256-BIT ENCRYPTED GUEST CHECKOUT
            </div>
            <h1 className="font-manrope text-3xl sm:text-4xl font-bold tracking-tight text-[#111827]">
              Shipping & Order Details
            </h1>
          </div>
        </div>
      </section>

      {/* Main Checkout Grid */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7 space-y-8">
              {/* Contact Details */}
              <div className="border border-black/[0.06] rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-[#111827]">1. Contact & Delivery Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-[#4B5563]">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singh"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-black/[0.12] text-[#111827] focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-[#4B5563]">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-black/[0.12] text-[#111827] focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase text-[#4B5563]">Email Address (for order invoice & warranty) *</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-black/[0.12] text-[#111827] focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase text-[#4B5563]">Street Address & Landmark *</label>
                    <input
                      type="text"
                      required
                      placeholder="House/Flat No., Building, Street Name, Landmark"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-black/[0.12] text-[#111827] focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-[#4B5563]">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-black/[0.12] text-[#111827] focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-[#4B5563]">PIN Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="6-digit PIN code"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-black/[0.12] text-[#111827] focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border border-black/[0.06] rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-[#111827]">2. Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-blue-500 bg-blue-50/40 rounded-xl cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === "online"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "online" })}
                      className="text-[#2563EB]"
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-sm text-[#111827]">Online Payment (UPI, Credit/Debit Card, Net Banking)</div>
                        <div className="text-xs text-[#6B7280]">Instant order confirmation with Razorpay / Treel Secure Gateway</div>
                      </div>
                      <CreditCard className="w-5 h-5 text-[#2563EB]" />
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-black/[0.06] rounded-xl cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === "cod"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                      className="text-[#2563EB]"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#111827]">Cash on Delivery (COD)</div>
                      <div className="text-xs text-[#6B7280]">Pay upon delivery across verified pincodes</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Review Column */}
            <div className="lg:col-span-5">
              <div className="bg-[#F9FAFB] border border-black/[0.06] p-8 rounded-3xl space-y-6 sticky top-28">
                <h3 className="text-xl font-bold text-[#111827]">Order Summary ({items.length} items)</h3>

                <div className="divide-y divide-black/[0.06]">
                  {items.map((it) => (
                    <div key={it.variant_id} className="py-3 flex justify-between items-center text-sm">
                      <div>
                        <div className="font-bold text-[#111827]">{it.name}</div>
                        <div className="text-xs text-[#6B7280]">Qty: {it.quantity} × ₹{it.price_inr.toLocaleString()}</div>
                      </div>
                      <div className="font-bold text-[#111827]">₹{(it.price_inr * it.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-black/[0.06] text-sm">
                  <div className="flex justify-between text-[#4B5563]">
                    <span>Subtotal:</span>
                    <span className="font-bold text-[#111827]">₹{totalInr.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#4B5563]">
                    <span>Express Shipping:</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                  <div className="pt-3 border-t border-black/[0.06] flex justify-between text-xl font-bold text-[#111827]">
                    <span>Total Payable:</span>
                    <span className="text-[#2563EB]">₹{totalInr.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#2563EB] text-white font-bold text-base hover:bg-[#1D4ED8] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" /> {isSubmitting ? "Processing Order..." : `Place Order (₹${totalInr.toLocaleString()})`}
                </button>

                <div className="text-center text-xs text-[#6B7280]">
                  By clicking Place Order you agree to Treel's <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/personal/returns" className="underline">Returns Policy</Link>.
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
