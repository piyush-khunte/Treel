"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  PhoneCall,
  MapPin,
  FileText,
  Radio,
  Tv,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

function SurakshaOrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "SUR-ORD-CONFIRMED";
  const paymentId = searchParams.get("payment_id");
  const method = searchParams.get("method") || "online";
  const amount = searchParams.get("amount");

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center space-y-8">
      <div className="text-left">
        <Breadcrumb
          variant="suraksha"
          items={[
            { label: "Suraksha", href: "/suraksha" },
            { label: "Order Confirmed" },
          ]}
        />
      </div>

      <div className="w-20 h-20 rounded-full bg-[#DC2626]/10 text-[#DC2626] border-2 border-[#DC2626]/30 flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
          <Truck className="w-3.5 h-3.5" />
          ORDER CONFIRMED &amp; PROCESSING
        </div>
        <h1 className="font-anton text-4xl sm:text-5xl text-[#451A03] uppercase">
          SURAKSHA ORDER <span className="text-[#DC2626]">SUCCESSFUL!</span>
        </h1>
        <p className="text-[#78350F] text-base sm:text-lg max-w-xl mx-auto font-medium">
          आपका सुरक्षा किट ऑर्डर दर्ज कर लिया गया है। Your commercial safety kit is being packaged for express transport dispatch.
        </p>
      </div>

      {/* Order Summary Box */}
      <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 p-6 sm:p-8 rounded-lg text-left space-y-4 text-sm shadow-sm">
        <div className="flex justify-between items-center pb-3 border-b border-[#451A03]/10">
          <span className="text-[#78350F] font-bold">Suraksha Order Ref:</span>
          <span className="font-mono font-bold text-[#DC2626] text-base">{orderId}</span>
        </div>

        {paymentId && (
          <div className="flex justify-between items-center pb-3 border-b border-[#451A03]/10">
            <span className="text-[#78350F] font-bold">Payment Transaction ID:</span>
            <span className="font-mono text-xs text-[#451A03] break-all">{paymentId}</span>
          </div>
        )}

        <div className="flex justify-between items-center pb-3 border-b border-[#451A03]/10">
          <span className="text-[#78350F] font-bold">Payment Mode:</span>
          <span className="font-bold text-[#451A03]">
            {method === "cod" ? "Cash on Delivery (COD)" : "Prepaid Online (Razorpay Verified)"}
          </span>
        </div>

        {amount && (
          <div className="flex justify-between items-center pb-3 border-b border-[#451A03]/10">
            <span className="text-[#78350F] font-bold">Total Amount:</span>
            <span className="font-anton text-2xl text-[#DC2626]">₹{Number(amount).toLocaleString("en-IN")}</span>
          </div>
        )}

        <div className="flex justify-between items-center pb-3 border-b border-[#451A03]/10">
          <span className="text-[#78350F] font-bold">Dispatch Timelines:</span>
          <span className="font-bold text-[#047857]">24–48 Hours Pan-India Express</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#78350F] font-bold">Warranty Status:</span>
          <span className="font-bold text-[#047857] flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> 3-Year Direct Replacement Pre-Registered
          </span>
        </div>
      </div>

      {/* Action Links */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/suraksha/centres"
          className="px-6 py-3.5 rounded-[4px] bg-[#DC2626] text-[#FEF3C7] font-bold text-sm hover:bg-[#B91C1C] transition-all flex items-center gap-2 shadow-sm uppercase font-rubik"
        >
          <MapPin className="w-4 h-4" /> Locate Fitment Centre
        </Link>
        <Link
          href="/suraksha/whatsapp"
          className="px-6 py-3.5 rounded-[4px] bg-[#16A34A] text-white font-bold text-sm hover:bg-[#15803D] transition-all flex items-center gap-2 uppercase font-rubik"
        >
          <PhoneCall className="w-4 h-4" /> WhatsApp Support
        </Link>
        <Link
          href="/suraksha"
          className="px-6 py-3.5 rounded-[4px] border-2 border-[#451A03]/20 text-[#451A03] font-bold text-sm hover:bg-[#FFFBEB] transition-all uppercase font-rubik"
        >
          Return to Suraksha Home
        </Link>
      </div>
    </div>
  );
}

export default function SurakshaOrderConfirmationPage() {
  return (
    <div className="py-20 bg-[#FEF3C7] text-[#451A03] font-rubik min-h-screen">
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto px-6 text-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-sm text-[#78350F] font-bold">Loading Suraksha Order Confirmation...</p>
          </div>
        }
      >
        <SurakshaOrderSuccessContent />
      </Suspense>
    </div>
  );
}
