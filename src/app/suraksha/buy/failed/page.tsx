"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, RotateCcw, PhoneCall } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

function SurakshaFailedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") || "payment_declined";
  const message =
    searchParams.get("message") ||
    "Payment could not be completed. Your card/account has not been debited.";

  return (
    <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
      <div className="text-left">
        <Breadcrumb
          variant="suraksha"
          items={[
            { label: "Suraksha", href: "/suraksha" },
            { label: "Cart", href: "/suraksha/cart" },
            { label: "Payment Status" },
          ]}
        />
      </div>

      <div className="w-20 h-20 rounded-full bg-red-100 text-[#DC2626] border-2 border-[#DC2626]/30 flex items-center justify-center mx-auto shadow-md">
        <AlertCircle className="w-12 h-12" />
      </div>

      <div className="space-y-3">
        <h1 className="font-anton text-4xl sm:text-5xl text-[#451A03] uppercase">
          PAYMENT <span className="text-[#DC2626]">UNSUCCESSFUL</span>
        </h1>
        <p className="text-[#78350F] text-base font-medium max-w-md mx-auto">
          {message}
        </p>
      </div>

      <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 p-6 rounded-lg text-left space-y-3 text-sm">
        <div className="font-bold text-[#451A03]">What can you do now?</div>
        <ul className="list-disc pl-5 space-y-1.5 text-[#78350F]">
          <li>Try paying again using another UPI app (GPay / PhonePe / Paytm) or debit/credit card.</li>
          <li>Choose <strong>Cash on Delivery (COD)</strong> to pay upon parcel delivery.</li>
          <li>Contact our toll-free assistance for manual order placement.</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/suraksha/checkout"
          className="px-6 py-3.5 rounded-[4px] bg-[#DC2626] text-[#FEF3C7] font-bold text-sm hover:bg-[#B91C1C] transition-all flex items-center gap-2 shadow-sm uppercase font-rubik"
        >
          <RotateCcw className="w-4 h-4" /> Retry Checkout
        </Link>
        <Link
          href="/suraksha/whatsapp"
          className="px-6 py-3.5 rounded-[4px] bg-[#16A34A] text-white font-bold text-sm hover:bg-[#15803D] transition-all flex items-center gap-2 uppercase font-rubik"
        >
          <PhoneCall className="w-4 h-4" /> Help via WhatsApp
        </Link>
      </div>
    </div>
  );
}

export default function SurakshaBuyFailedPage() {
  return (
    <div className="py-20 bg-[#FEF3C7] text-[#451A03] font-rubik min-h-screen">
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto px-6 text-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-sm text-[#78350F]">Loading status...</p>
          </div>
        }
      >
        <SurakshaFailedContent />
      </Suspense>
    </div>
  );
}
