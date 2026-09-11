"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, RefreshCw, PhoneCall } from "lucide-react";

export default function OrderFailedPage() {
  return (
    <div className="py-24 bg-white text-slate-900 font-manrope min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-md">
          <AlertCircle className="w-12 h-12" />
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-red-600">
            PAYMENT COULD NOT BE COMPLETED
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Your transaction was not completed.
          </h1>
          <p className="text-slate-600 text-base">
            No money has been debited from your account. If an amount was deducted, your bank will automatically refund it within 2-3 business days.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/personal/buy/checkout"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Try Payment Again
          </Link>
          <Link
            href="/personal/support/contact"
            className="px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
          >
            Contact Support Team
          </Link>
        </div>
      </div>
    </div>
  );
}
