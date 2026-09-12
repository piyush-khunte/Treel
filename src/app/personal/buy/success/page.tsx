"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package, Truck, ShieldCheck } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="py-24 bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            ORDER CONFIRMED
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827]">
            Thank you for your order!
          </h1>
          <p className="text-[#4B5563] text-base">
            Your Treel Smart TPMS kit is being prepared for dispatch. We have sent your order confirmation and invoice to your email.
          </p>
        </div>

        <div className="bg-[#F9FAFB] border border-black/[0.06] p-6 rounded-3xl text-left space-y-4 text-sm">
          <div className="flex justify-between pb-3 border-b border-black/[0.06]">
            <span className="text-[#4B5563]">Order Number:</span>
            <span className="font-mono font-bold text-[#111827]">TRL-849201</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-black/[0.06]">
            <span className="text-[#4B5563]">Estimated Delivery:</span>
            <span className="font-bold text-[#111827]">2-4 Business Days (Express Air)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4B5563]">Warranty Registration:</span>
            <span className="font-bold text-[#10B981]">Automatic 1-Year Official Warranty</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/personal/track-order"
            className="px-6 py-3 rounded-full bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition-all flex items-center gap-2"
          >
            <Package className="w-4 h-4" /> Track Your Order
          </Link>
          <Link
            href="/personal/app"
            className="px-6 py-3 rounded-lg border border-black/[0.06] text-[#374151] font-bold text-sm hover:bg-[#F9FAFB] transition-all"
          >
            Download Treel Care App
          </Link>
        </div>
      </div>
    </div>
  );
}
