"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ExternalLink, 
  AlertCircle, 
  ArrowRight,
  Radio,
  RotateCcw,
  Loader2,
  HelpCircle,
  ShieldCheck,
  Calendar
} from "lucide-react";

interface OrderData {
  orderId: string;
  orderDate: string;
  status: "placed" | "preparing" | "dispatched" | "out_for_delivery" | "delivered" | "return_initiated";
  statusLabel: string;
  estimatedDelivery: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  shippingAddress: string;
  carrier: string;
  awbNumber: string;
  courierUrl: string;
  steps: {
    title: string;
    date: string;
    completed: boolean;
    current: boolean;
  }[];
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const performLookup = (ord: string, eml: string) => {
    setValidationError(null);
    setErrorMessage(null);
    setLoading(true);

    const cleanOrd = ord.trim().toUpperCase();
    const cleanEml = eml.trim().toLowerCase();

    setTimeout(() => {
      setLoading(false);

      // Known invalid mock triggers
      if (cleanOrd === "INVALID" || cleanOrd === "00000" || cleanOrd.length < 3) {
        setErrorMessage(
          "We couldn't find an order matching that order number and email. Check that both are entered correctly. Order numbers are in your confirmation email."
        );
        setOrderData(null);
        return;
      }

      // Valid order tracking resolution
      const isDelivered = cleanOrd.includes("DELIVERED") || cleanOrd.endsWith("99");
      const isPreparing = cleanOrd.includes("PREP");

      let currentStatus: OrderData["status"] = "dispatched";
      let statusLabel = "Dispatched & In Transit";
      if (isDelivered) {
        currentStatus = "delivered";
        statusLabel = "Delivered";
      } else if (isPreparing) {
        currentStatus = "preparing";
        statusLabel = "Preparing to Ship";
      }

      const orderResult: OrderData = {
        orderId: cleanOrd.startsWith("TR-") ? cleanOrd : `TR-${cleanOrd}`,
        orderDate: "10 Sep 2026",
        status: currentStatus,
        statusLabel: statusLabel,
        estimatedDelivery: isDelivered ? "Delivered on 11 Sep 2026" : "13 Sep 2026",
        productName: "Personal TPMS (4-Tyre Smart Sensor Kit)",
        quantity: 1,
        totalAmount: 8999,
        shippingAddress: "42 Palm Grove Avenue, Indiranagar, Bengaluru, Karnataka 560038",
        carrier: "Blue Dart Express (Shiprocket)",
        awbNumber: "SR-9842194812",
        courierUrl: "https://www.shiprocket.in",
        steps: [
          {
            title: "Order Placed",
            date: "10 Sep, 10:30 AM",
            completed: true,
            current: false,
          },
          {
            title: "Preparing to Ship",
            date: "10 Sep, 02:15 PM",
            completed: true,
            current: isPreparing,
          },
          {
            title: "Dispatched",
            date: isPreparing ? "Pending" : "11 Sep, 09:00 AM",
            completed: !isPreparing,
            current: !isPreparing && !isDelivered,
          },
          {
            title: "Out for Delivery",
            date: isDelivered ? "11 Sep, 01:45 PM" : "Expected 13 Sep",
            completed: isDelivered,
            current: false,
          },
          {
            title: "Delivered",
            date: isDelivered ? "11 Sep, 04:30 PM" : "Pending",
            completed: isDelivered,
            current: isDelivered,
          },
        ],
      };

      setOrderData(orderResult);
    }, 450);
  };

  useEffect(() => {
    const orderParam = searchParams.get("order") || searchParams.get("order_id");
    const emailParam = searchParams.get("email") || searchParams.get("token");
    if (orderParam) {
      setOrderNumber(orderParam);
      if (emailParam) {
        setEmail(emailParam);
      }
      performLookup(orderParam, emailParam || "customer@treel.in");
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) {
      setValidationError("Please enter both your Order Number and Email Address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setValidationError("Please enter a valid email address (e.g. you@email.com).");
      return;
    }
    performLookup(orderNumber, email);
  };

  const handleReset = () => {
    setOrderData(null);
    setErrorMessage(null);
    setValidationError(null);
    setOrderNumber("");
    setEmail("");
  };

  const getStatusBadgeClass = (status: OrderData["status"]) => {
    switch (status) {
      case "placed":
        return "bg-[#2563EB]/15 text-[#1D4ED8] border-[#2563EB]/20";
      case "preparing":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "dispatched":
      case "out_for_delivery":
        return "bg-[#2563EB]/15 text-[#1D4ED8] border-[#2563EB]/20";
      case "delivered":
        return "bg-[#10B981]/15 text-[#059669] border-[#10B981]/20";
      case "return_initiated":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-[#F3F4F6] text-[#1F2937] border-black/[0.06]";
    }
  };

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em] inline-block">
              TRACK ORDER
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
              Where is your order?
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              Enter your order number and the email you used to place the order. No account required.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Results Stage */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          {/* Tracking Form (When no order is displayed) */}
          {!orderData && !errorMessage && (
            <div className="max-w-xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-black/[0.06] shadow-xl space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#111827]">Order Lookup</h2>
                  <p className="text-[#4B5563] text-sm mt-1">
                    Track the real-time shipping progress of your Personal TPMS kit.
                  </p>
                </div>

                {validationError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label 
                      htmlFor="orderNumber" 
                      className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2"
                    >
                      Order Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="orderNumber"
                      type="text"
                      required
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="e.g. TR-12345"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-[#6B7280] mt-1.5">
                      You'll find this in your order confirmation email.
                    </p>
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-[#6B7280] mt-1.5">
                      The email you used to place the order.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] active:scale-[0.99] transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Checking Order Status…</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Track order →</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Loading Indicator Stage */}
          {loading && (
            <div className="max-w-md mx-auto p-12 text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#2563EB] mx-auto" />
              <p className="text-sm font-bold text-[#374151]">Verifying order with logistics network…</p>
            </div>
          )}

          {/* Error / No Result View */}
          {errorMessage && !loading && (
            <div className="max-w-xl mx-auto p-8 sm:p-10 rounded-3xl bg-red-50 border border-red-200 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-red-950">Order Not Found</h2>
              <p className="text-sm text-red-800 leading-relaxed max-w-md mx-auto">
                {errorMessage}
              </p>
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-3.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-700 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" /> Try again
                </button>
              </div>
            </div>
          )}

          {/* Order Tracking Result View */}
          {orderData && !loading && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Order Status Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] shadow-sm space-y-8">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
                  <div>
                    <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Order Number</div>
                    <div className="text-3xl font-extrabold text-[#111827] mt-0.5">{orderData.orderId}</div>
                    <div className="text-xs text-[#6B7280] mt-1 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      <span>Placed on {orderData.orderDate}</span>
                      <span>·</span>
                      <span className="font-semibold text-[#374151]">Est. Delivery: {orderData.estimatedDelivery}</span>
                    </div>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-extrabold tracking-wide uppercase self-start sm:self-auto ${getStatusBadgeClass(orderData.status)}`}>
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {orderData.statusLabel}
                  </div>
                </div>

                {/* Horizontal Step Tracker */}
                <div className="py-2">
                  <div className="text-xs font-bold text-[#374151] uppercase tracking-wider mb-6">
                    Shipping Tracker
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-2 relative">
                    {/* Connecting line (Desktop) */}
                    <div className="hidden sm:block absolute top-4 left-6 right-6 h-1 bg-[#E5E7EB] -translate-y-1/2 z-0" />

                    {orderData.steps.map((step, idx) => (
                      <div key={idx} className="relative z-10 flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm transition-colors ${
                            step.completed
                              ? "bg-emerald-600 text-white"
                              : step.current
                              ? "bg-[#2563EB] text-white ring-4 ring-blue-100"
                              : "bg-[#E5E7EB] text-[#6B7280]"
                          }`}
                        >
                          {step.completed ? "✓" : idx + 1}
                        </div>

                        <div className="space-y-0.5">
                          <div className={`text-xs font-bold ${step.completed || step.current ? "text-[#111827]" : "text-[#6B7280]"}`}>
                            {step.title}
                          </div>
                          <div className="text-[11px] text-[#6B7280]">
                            {step.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary & Shipping Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-black/[0.06]">
                  {/* Order Summary */}
                  <div className="p-6 rounded-3xl bg-white border border-black/[0.06] space-y-4">
                    <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                      Order Summary
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-100">
                        <Radio className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#111827] text-sm">{orderData.productName}</h3>
                        <div className="text-xs text-[#6B7280] mt-0.5">
                          Qty: {orderData.quantity} · Order Total: <strong>₹{orderData.totalAmount.toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#4B5563] pt-2 border-t border-black/[0.04]">
                      <strong className="text-[#1F2937] font-semibold block mb-0.5">Delivery Address:</strong>
                      {orderData.shippingAddress}
                    </div>
                  </div>

                  {/* Shipping Partner Details */}
                  <div className="p-6 rounded-3xl bg-white border border-black/[0.06] space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                        Shipping Partner Details
                      </div>
                      <p className="text-xs text-[#374151] leading-relaxed">
                        Your order is being delivered by <strong>{orderData.carrier}</strong>.
                      </p>
                      <div className="p-3 rounded-xl bg-[#F9FAFB] border border-black/[0.06] text-xs font-mono text-[#1F2937]">
                        AWB: <strong>{orderData.awbNumber}</strong>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={orderData.courierUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:underline"
                      >
                        Track on courier site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Reset Action */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleReset}
                    className="text-xs font-bold text-[#4B5563] hover:text-[#111827] transition-colors cursor-pointer"
                  >
                    ← Check another order
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Need help with your order? Section */}
          <div className="max-w-xl mx-auto mt-16 text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mx-auto">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-[#111827]">Need help with your order?</h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Our support team is available Monday to Saturday, 9:00 AM to 7:00 PM IST.
              </p>
            </div>
            <div>
              <Link
                href="/personal/support/contact"
                className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1D4ED8] font-bold text-xs uppercase tracking-wider hover:underline"
              >
                Contact support <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PersonalTrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <TrackOrderContent />
    </Suspense>
  );
}
