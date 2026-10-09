"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  CreditCard,
  AlertCircle,
  Truck,
  ShieldCheck,
  Tag,
  Check,
  Sparkles,
} from "lucide-react";
import { useSurakshaCart } from "@/lib/commerce/cart-context";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AvailableCouponsModal } from "@/components/commerce/available-coupons-modal";

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

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi NCR",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function SurakshaCheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotalInr,
    discountInr,
    totalInr,
    couponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    totalItems,
    clearCart,
  } = useSurakshaCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    fleetName: "",
    paymentMethod: "online" as "online" | "cod",
  });

  const [inputCoupon, setInputCoupon] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false);
  const [couponStatus, setCouponStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCoupon.trim().toUpperCase();
    if (!clean) {
      setCouponStatus({ type: "error", text: "Please enter a coupon code." });
      return;
    }

    setIsValidatingCoupon(true);
    setCouponStatus(null);

    const res = await applyCoupon(clean);
    setIsValidatingCoupon(false);

    if (res.success) {
      setCouponStatus({
        type: "success",
        text: res.message || `Coupon "${clean}" applied successfully!`,
      });
      setInputCoupon("");
    } else {
      setCouponStatus({
        type: "error",
        text: res.message || `Coupon code "${clean}" is invalid or expired.`,
      });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponStatus(null);
    setInputCoupon("");
  };

  const validateForm = (): boolean => {
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      setErrorMessage("Please enter your full name or transporter name.");
      return false;
    }
    const phoneClean = formData.phone.replace(/\D/g, "");
    if (phoneClean.length !== 10 || !/^[6-9]/.test(phoneClean)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.");
      return false;
    }
    // Email is OPTIONAL for Suraksha checkout. Validate syntax ONLY if provided.
    if (formData.email && formData.email.trim().length > 0) {
      const emailTrim = formData.email.trim();
      if (!emailTrim.includes("@") || !emailTrim.includes(".")) {
        setErrorMessage("Please enter a valid email address or leave the field blank.");
        return false;
      }
    }
    if (!formData.address || formData.address.trim().length < 5) {
      setErrorMessage("Please enter complete delivery address (Transport Nagar, yard, street, or shop).");
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
      setErrorMessage("Your Suraksha cart is empty. Please configure a truck kit first.");
      return;
    }

    setIsSubmitting(true);

    try {
      // -------------------------------------------------------------
      // FLOW A: ONLINE PAYMENT VIA RAZORPAY (Suraksha Branded)
      // -------------------------------------------------------------
      if (formData.paymentMethod === "online") {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          setErrorMessage("Failed to load secure payment gateway. Please check your network and try again.");
          setIsSubmitting(false);
          return;
        }

        // 1. Create server-side Razorpay Order for Suraksha
        const orderRes = await fetch("/api/payments/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brand: "suraksha",
            items,
            subtotalInr,
            discountInr,
            totalInr,
            couponCode,
            customer: formData,
            notes: {
              brand: "suraksha",
              truck_tyres: totalItems,
              fleet_name: formData.fleetName || "",
            },
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

        // 2. Open Razorpay Checkout Modal (Suraksha Red Palette)
        const options = {
          key: keyId,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency || "INR",
          name: "Treel Suraksha Commercial Safety",
          description: `Suraksha ${totalItems}-Tyre Commercial Kit`,
          image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
          order_id: razorpayOrder.id,
          prefill: {
            name: formData.fullName.trim(),
            email: formData.email ? formData.email.trim() : "",
            contact: formData.phone.replace(/\D/g, ""),
          },
          notes: {
            brand: "suraksha",
            shipping_address: `${formData.address.trim()}, ${formData.city.trim()}, ${formData.state} - ${formData.pincode.trim()}`,
          },
          theme: {
            color: "#DC2626", // Suraksha Red
          },
          handler: async function (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) {
            try {
              // 3. Verify signature server-side & persist Suraksha order
              const verifyRes = await fetch("/api/payments/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  brand: "suraksha",
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  checkout: {
                    ...formData,
                    category: "Suraksha Commercial TPMS",
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
                  `/suraksha/order-confirmation?order_id=${verifyData.data?.orderId || razorpayOrder.id}&payment_id=${response.razorpay_payment_id}&amount=${totalInr}`
                );
              } else {
                router.push(
                  `/suraksha/buy/failed?reason=verification_failed&message=${encodeURIComponent(
                    verifyData.error?.message || "Payment verification failed."
                  )}`
                );
              }
            } catch (err: any) {
              router.push(
                `/suraksha/buy/failed?reason=network_error&message=${encodeURIComponent(
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
      // FLOW B: CASH ON DELIVERY (COD) FOR SURAKSHA
      // -------------------------------------------------------------
      if (formData.paymentMethod === "cod") {
        const codRes = await fetch("/api/payments/cod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brand: "suraksha",
            checkout: {
              ...formData,
              category: "Suraksha Commercial TPMS",
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
          router.push(
            `/suraksha/order-confirmation?order_id=${codData.data?.orderId}&method=cod&amount=${totalInr}`
          );
        } else {
          setErrorMessage(
            codData.error?.message || "Failed to place COD order. Please check your address and try again."
          );
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
      <div className="py-24 text-center bg-[#FEF3C7] min-h-screen text-[#451A03] font-rubik">
        <div className="max-w-md mx-auto space-y-6 px-6">
          <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center mx-auto">
            <Truck className="w-8 h-8" />
          </div>
          <h1 className="font-anton text-3xl uppercase">No Suraksha Items in Cart</h1>
          <p className="text-[#78350F] text-sm">
            Please pick a tyre configuration for your truck to proceed to checkout.
          </p>
          <Link
            href="/suraksha/pricing"
            className="inline-block px-6 py-3.5 rounded-[4px] bg-[#DC2626] text-[#FEF3C7] font-bold text-sm uppercase shadow-md hover:bg-[#B91C1C]"
          >
            Go to Suraksha Pricing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* Header Banner */}
      <section className="pt-16 pb-12 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Cart", href: "/suraksha/cart" },
                { label: "Commercial Checkout" },
              ]}
            />
            <div className="text-xs font-bold uppercase tracking-widest text-[#DC2626] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> SECURE 256-BIT ENCRYPTED COMMERCIAL CHECKOUT
            </div>
            <h1 className="font-anton text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              DELIVERY &amp; TRUCK <span className="italic text-[#DC2626]">ORDER DETAILS</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Checkout Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          {errorMessage && (
            <div className="mb-8 p-4 rounded-lg bg-red-100 border-2 border-[#DC2626] text-[#DC2626] flex items-start gap-3 text-sm font-bold shadow-sm">
              <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Customer & Delivery Yard Address */}
              <div className="rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#DC2626] text-[#FEF3C7] font-bold text-xs flex items-center justify-center font-mono">
                    1
                  </div>
                  <h3 className="font-anton text-xl sm:text-2xl text-[#451A03] uppercase">
                    Delivery Address &amp; Transporter Contact
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-[#78350F]">
                      Full Name / Transporter Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Singh / Balaji Logistics"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-[4px] border-2 border-[#451A03]/20 bg-white text-[#451A03] text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-[#78350F]">
                      10-Digit Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        })
                      }
                      maxLength={10}
                      className="w-full px-4 py-3 rounded-[4px] border-2 border-[#451A03]/20 bg-white text-[#451A03] text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold uppercase text-[#78350F]">
                      Email Address (Optional — for digital GST tax invoice &amp; warranty card)
                    </label>
                    <input
                      type="email"
                      placeholder="transporter@example.com (optional)"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-[4px] border-2 border-[#451A03]/20 bg-white text-[#451A03] text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold uppercase text-[#78350F]">
                      Delivery Address (Transport Yard, Godown, Office, or Shop) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Shop/Office No., Transport Nagar, Road / Landmark"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-[4px] border-2 border-[#451A03]/20 bg-white text-[#451A03] text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-[#78350F]">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Indore, Pune, Raipur"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-[4px] border-2 border-[#451A03]/20 bg-white text-[#451A03] text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-[#78350F]">State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 rounded-[4px] border-2 border-[#451A03]/20 bg-white text-[#451A03] text-sm focus:outline-none focus:border-[#DC2626]"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-[#78350F]">
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 452010"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                        })
                      }
                      maxLength={6}
                      className="w-full px-4 py-3 rounded-[4px] border-2 border-[#451A03]/20 bg-white text-[#451A03] text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-[#78350F]">
                      Truck Registration / Fleet Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MH12 AB 1234"
                      value={formData.fleetName}
                      onChange={(e) => setFormData({ ...formData, fleetName: e.target.value })}
                      className="w-full px-4 py-3 rounded-[4px] border-2 border-[#451A03]/20 bg-white text-[#451A03] text-sm focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#DC2626] text-[#FEF3C7] font-bold text-xs flex items-center justify-center font-mono">
                    2
                  </div>
                  <h3 className="font-anton text-xl sm:text-2xl text-[#451A03] uppercase">
                    Select Payment Method
                  </h3>
                </div>

                <div className="space-y-3 pt-2">
                  <label
                    className={`flex items-center gap-3.5 p-4 rounded-[4px] border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "online"
                        ? "border-[#DC2626] bg-[#FEF3C7] ring-2 ring-[#DC2626]/20"
                        : "border-[#451A03]/15 bg-white hover:border-[#DC2626]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === "online"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "online" })}
                      className="accent-[#DC2626] w-4 h-4"
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-sm text-[#451A03]">
                          Prepaid Online Payment (UPI, Google Pay, PhonePe, Cards, Net Banking)
                        </div>
                        <div className="text-xs text-[#78350F]">
                          Instant dispatch prioritization &amp; digital invoice via Razorpay
                        </div>
                      </div>
                      <CreditCard className="w-5 h-5 text-[#DC2626] shrink-0" />
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3.5 p-4 rounded-[4px] border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "border-[#DC2626] bg-[#FEF3C7] ring-2 ring-[#DC2626]/20"
                        : "border-[#451A03]/15 bg-white hover:border-[#DC2626]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === "cod"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                      className="accent-[#DC2626] w-4 h-4"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#451A03]">
                        Cash on Delivery (COD)
                      </div>
                      <div className="text-xs text-[#78350F]">
                        Pay in cash or UPI at the time of courier delivery
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Placement */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-lg bg-[#FFFBEB] border-3 border-[#DC2626] shadow-xl space-y-6 sticky top-28">
                <div>
                  <div className="font-rubik text-xs font-bold uppercase tracking-wider text-[#78350F]">
                    Commercial Checkout Summary
                  </div>
                  <h3 className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase mt-1">
                    SURAKSHA {totalItems}-TYRE KIT
                  </h3>
                </div>

                {/* Items preview */}
                <div className="divide-y-2 divide-[#451A03]/10 text-sm">
                  {items.map((it) => (
                    <div key={it.variant_id} className="py-3 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-[#451A03]">{it.name}</div>
                        <div className="text-xs text-[#78350F]">
                          {it.quantity} sensors @ ₹1,700/tyre
                        </div>
                      </div>
                      <div className="font-anton text-lg text-[#DC2626]">
                        ₹{(it.price_inr * it.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="p-4 rounded-[4px] bg-white border-2 border-[#451A03]/20 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#78350F]">
                      <Tag className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>Apply Coupon / Fleet Discount</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCouponsModalOpen(true)}
                      className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1 cursor-pointer font-rubik uppercase tracking-tight"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>View Available Coupons</span>
                    </button>
                  </div>

                  {couponCode ? (
                    <div className="flex items-center justify-between p-3 rounded-[4px] bg-emerald-50 border-2 border-emerald-500">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-emerald-950 font-mono tracking-wider">
                            {couponCode}
                          </div>
                          <div className="text-[11px] text-emerald-800 font-bold">
                            You save ₹{discountInr.toLocaleString("en-IN")}
                            {appliedCoupon?.appliedProductName ? ` (${appliedCoupon.appliedProductName})` : ""}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-xs font-bold text-red-600 hover:text-red-800 hover:underline px-2 py-1 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Coupon code (e.g. SURAKSHA10)"
                          value={inputCoupon}
                          onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                          className="flex-1 px-3.5 py-2.5 rounded-[4px] border-2 border-[#451A03]/20 bg-white text-xs font-mono font-bold text-[#451A03] uppercase placeholder:font-sans placeholder:normal-case placeholder:font-normal focus:outline-none focus:border-[#DC2626]"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={isValidatingCoupon || !inputCoupon.trim()}
                          className="px-5 py-2.5 rounded-[4px] bg-[#DC2626] text-[#FEF3C7] text-xs font-bold uppercase hover:bg-[#B91C1C] transition-all disabled:opacity-50 cursor-pointer shrink-0"
                        >
                          {isValidatingCoupon ? "Checking..." : "Apply"}
                        </button>
                      </div>
                    </div>
                  )}

                  {couponStatus && (
                    <div
                      className={`p-2.5 rounded-[4px] text-xs flex items-start gap-2 ${
                        couponStatus.type === "success"
                          ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
                          : "bg-red-50 text-red-800 border border-red-300"
                      }`}
                    >
                      {couponStatus.type === "success" ? (
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      )}
                      <span className="font-medium">{couponStatus.text}</span>
                    </div>
                  )}
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-2.5 pt-2 border-t-2 border-[#451A03]/10 text-sm">
                  <div className="flex justify-between text-[#78350F]">
                    <span>Subtotal ({totalItems} Sensors):</span>
                    <span className="font-mono font-bold text-[#451A03]">
                      ₹{subtotalInr.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {discountInr > 0 && (
                    <div className="flex justify-between text-[#047857] font-bold">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> Coupon Discount ({couponCode}):
                      </span>
                      <span>-₹{discountInr.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#78350F]">
                    <span>In-Cab Visual Display Unit:</span>
                    <span className="font-bold text-[#047857] text-xs uppercase">INCLUDED</span>
                  </div>
                  <div className="flex justify-between text-[#78350F]">
                    <span>Express Transport Delivery:</span>
                    <span className="font-bold text-[#047857] text-xs uppercase">FREE</span>
                  </div>
                  <div className="flex justify-between text-[#78350F]">
                    <span>18% GST (Tax Invoice Included):</span>
                    <span className="text-xs text-[#78350F]">Included</span>
                  </div>

                  <div className="pt-3 border-t-2 border-[#451A03]/10 flex justify-between items-baseline">
                    <span className="font-anton text-lg text-[#451A03] uppercase">
                      TOTAL PAYABLE:
                    </span>
                    <div className="text-right">
                      <div className="font-anton text-3xl sm:text-4xl text-[#DC2626]">
                        ₹{totalInr.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[11px] font-semibold text-[#78350F]">
                        (All-Inclusive Price)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] active:scale-[0.98] uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Lock className="w-4 h-4" />
                  {isSubmitting
                    ? formData.paymentMethod === "online"
                      ? "Opening Secure Razorpay..."
                      : "Confirming Order..."
                    : formData.paymentMethod === "online"
                    ? `Pay ₹${totalInr.toLocaleString("en-IN")} with Razorpay`
                    : `Confirm COD Order (₹${totalInr.toLocaleString("en-IN")})`}
                </button>

                <div className="space-y-2 pt-2 text-xs text-[#78350F]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#047857] shrink-0" />
                    <span>3-Year Direct Sensor Replacement Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#DC2626] shrink-0" />
                    <span>Express Pan-India Dispatch in 24-48 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Available Coupons Modal */}
      <AvailableCouponsModal
        isOpen={isCouponsModalOpen}
        onClose={() => setIsCouponsModalOpen(false)}
        brand="suraksha"
        subtotalInr={subtotalInr}
        currentCouponCode={couponCode}
        onApplyCoupon={async (code) => {
          const res = await applyCoupon(code);
          if (res.success) {
            setCouponStatus({
              type: "success",
              text: res.message || `Coupon "${code}" applied successfully!`,
            });
          } else {
            setCouponStatus({
              type: "error",
              text: res.message || `Coupon "${code}" could not be applied.`,
            });
          }
        }}
      />
    </div>
  );
}
