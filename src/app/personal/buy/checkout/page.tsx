"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, CreditCard, AlertCircle } from "lucide-react";
import { useCart } from "@/lib/commerce/cart-context";
import { Breadcrumb } from "@/components/ui/breadcrumb";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalInr, discountInr, totalInr, couponCode, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    paymentMethod: "online" as "online" | "cod",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return false;
    }
    const phoneClean = formData.phone.replace(/\D/g, "");
    if (phoneClean.length !== 10 || !/^[6-9]/.test(phoneClean)) {
      setErrorMessage("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.");
      return false;
    }
    if (!formData.email || !formData.email.includes("@") || !formData.email.includes(".")) {
      setErrorMessage("Please enter a valid email address for your order invoice and warranty.");
      return false;
    }
    if (!formData.address || formData.address.trim().length < 5) {
      setErrorMessage("Please enter your street address and landmark.");
      return false;
    }
    if (!formData.city || formData.city.trim().length < 2) {
      setErrorMessage("Please enter your city.");
      return false;
    }
    const pinClean = formData.pincode.replace(/\D/g, "");
    if (pinClean.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit Indian PIN code.");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);
    if (!validateForm()) return;

    if (items.length === 0) {
      setErrorMessage("Your cart is empty. Please add items to checkout.");
      return;
    }

    setIsSubmitting(true);

    try {
      // -------------------------------------------------------------
      // FLOW A: ONLINE PAYMENT VIA RAZORPAY CHECKOUT
      // -------------------------------------------------------------
      if (formData.paymentMethod === "online") {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          setErrorMessage("Failed to load Razorpay payment gateway. Please check your internet connection and try again.");
          setIsSubmitting(false);
          return;
        }

        // 1. Create server-side Razorpay Order
        const orderRes = await fetch("/api/payments/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items,
            subtotalInr,
            discountInr,
            totalInr,
            couponCode,
            customer: formData,
          }),
        });

        const orderResult = await orderRes.json();
        if (!orderRes.ok || !orderResult.success || !orderResult.data?.id) {
          setErrorMessage(
            orderResult.error?.message || "Unable to initiate payment with gateway. Please try again or select Cash on Delivery."
          );
          setIsSubmitting(false);
          return;
        }

        const razorpayOrder = orderResult.data;
        const keyId = razorpayOrder.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

        // 2. Open Razorpay Checkout modal
        const options = {
          key: keyId,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency || "INR",
          name: "Treel Mobility Solutions",
          description: "Personal Smart TPMS Kit",
          image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
          order_id: razorpayOrder.id,
          prefill: {
            name: formData.fullName.trim(),
            email: formData.email.trim(),
            contact: formData.phone.replace(/\D/g, ""),
          },
          notes: {
            shipping_address: `${formData.address.trim()}, ${formData.city.trim()}, ${formData.state} - ${formData.pincode.trim()}`,
          },
          theme: {
            color: "#2563EB",
          },
          handler: async function (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) {
            try {
              // 3. Verify Razorpay signature server-side & persist order to Supabase
              const verifyRes = await fetch("/api/payments/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  checkout: {
                    ...formData,
                    items,
                    subtotalInr,
                    discountInr,
                    totalInr,
                    couponCode,
                  },
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                clearCart();
                router.push(
                  `/personal/buy/success?order_id=${verifyData.data?.orderId || razorpayOrder.id}&payment_id=${response.razorpay_payment_id}`
                );
              } else {
                router.push(
                  `/personal/buy/failed?reason=verification_failed&message=${encodeURIComponent(
                    verifyData.error?.message || "Payment signature verification failed."
                  )}`
                );
              }
            } catch (err: any) {
              router.push(
                `/personal/buy/failed?reason=network_error&message=${encodeURIComponent(
                  err?.message || "Network error occurred while confirming payment."
                )}`
              );
            } finally {
              setIsSubmitting(false);
            }
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", function (failResponse: any) {
          setIsSubmitting(false);
          setErrorMessage(failResponse.error?.description || "Payment was declined or cancelled.");
        });
        rzp.open();
        return;
      }

      // -------------------------------------------------------------
      // FLOW B: CASH ON DELIVERY (COD)
      // -------------------------------------------------------------
      if (formData.paymentMethod === "cod") {
        const codRes = await fetch("/api/payments/cod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            checkout: {
              ...formData,
              items,
              subtotalInr,
              discountInr,
              totalInr,
              couponCode,
            },
          }),
        });

        const codData = await codRes.json();
        if (codRes.ok && codData.success) {
          clearCart();
          router.push(`/personal/buy/success?order_id=${codData.data?.orderId}&method=cod`);
        } else {
          setErrorMessage(codData.error?.message || "Failed to place COD order. Please check your details and try again.");
          setIsSubmitting(false);
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
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
          {errorMessage && (
            <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm font-medium">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

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
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                      maxLength={10}
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
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                      maxLength={6}
                      className="w-full px-4 py-3 rounded-lg border border-black/[0.12] text-[#111827] focus:outline-none focus:border-blue-600 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border border-black/[0.06] rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-[#111827]">2. Payment Method</h3>
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                    formData.paymentMethod === "online" ? "border-blue-500 bg-blue-50/40" : "border-black/[0.06] hover:bg-slate-50"
                  }`}>
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
                        <div className="text-xs text-[#6B7280]">Instant order confirmation via official Razorpay checkout</div>
                      </div>
                      <CreditCard className="w-5 h-5 text-[#2563EB]" />
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                    formData.paymentMethod === "cod" ? "border-blue-500 bg-blue-50/40" : "border-black/[0.06] hover:bg-slate-50"
                  }`}>
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
                    <span className="font-bold text-[#111827]">₹{subtotalInr.toLocaleString()}</span>
                  </div>
                  {discountInr > 0 && (
                    <div className="flex justify-between text-[#10B981]">
                      <span>Discount ({couponCode}):</span>
                      <span className="font-bold">-₹{discountInr.toLocaleString()}</span>
                    </div>
                  )}
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
                  <Lock className="w-4 h-4" />{" "}
                  {isSubmitting
                    ? formData.paymentMethod === "online"
                      ? "Opening Razorpay..."
                      : "Placing Order..."
                    : formData.paymentMethod === "online"
                    ? `Pay with Razorpay (₹${totalInr.toLocaleString()})`
                    : `Place COD Order (₹${totalInr.toLocaleString()})`}
                </button>

                <div className="text-center text-xs text-[#6B7280]">
                  By clicking Place Order you agree to Treel&apos;s <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/personal/returns" className="underline">Returns Policy</Link>.
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
