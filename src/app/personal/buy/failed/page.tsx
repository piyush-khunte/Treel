"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

function FailedContent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error") || "Your transaction could not be processed.";

  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center space-y-8">
      <div className="text-left">
        <Breadcrumb
          variant="personal"
          items={[
            { label: "Personal TPMS", href: "/personal" },
            { label: "Product Store", href: "/personal/buy" },
            { label: "Payment Status" },
          ]}
        />
      </div>
      <div className="w-20 h-20 rounded-full bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center mx-auto shadow-md">
        <AlertCircle className="w-12 h-12" />
      </div>

      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#EF4444]">
          PAYMENT COULD NOT BE COMPLETED
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827]">
          Your transaction was not completed.
        </h1>
        <p className="text-[#4B5563] text-base">
          {errorMessage}
        </p>
        <p className="text-xs text-[#9CA3AF]">
          No money has been debited from your account. If an amount was deducted, your bank will automatically refund it within 2-3 business days.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/personal/buy/checkout"
          className="px-6 py-3 rounded-full bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition-all flex items-center gap-2 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" /> Try Payment Again
        </Link>
        <Link
          href="/personal/support/contact"
          className="px-6 py-3 rounded-full border border-black/[0.08] text-[#374151] font-bold text-sm hover:bg-[#F3F4F6] transition-all"
        >
          Contact Support Team
        </Link>
      </div>
    </div>
  );
}

export default function OrderFailedPage() {
  return (
    <div className="py-24 bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      <Suspense fallback={
        <div className="max-w-2xl mx-auto px-6 text-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-[#EF4444] border-t-transparent rounded-full mx-auto" />
          <p className="mt-4 text-sm text-slate-500">Loading payment status...</p>
        </div>
      }>
        <FailedContent />
      </Suspense>
    </div>
  );
}

