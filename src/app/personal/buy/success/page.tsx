"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package, Truck, ShieldCheck } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="py-24 bg-white text-slate-900 font-manrope min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-600">
            ORDER CONFIRMED
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Thank you for your order!
          </h1>
          <p className="text-slate-600 text-base">
            Your Treel Smart TPMS kit is being prepared for dispatch. We have sent your order confirmation and invoice to your email.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-left space-y-4 text-sm">
          <div className="flex justify-between pb-3 border-b border-slate-200">
            <span className="text-slate-600">Order Number:</span>
            <span className="font-mono font-bold text-slate-900">TRL-849201</span>
          </div>
          <div className="flex justify-between pb-3 border-b border-slate-200">
            <span className="text-slate-600">Estimated Delivery:</span>
            <span className="font-bold text-slate-900">2-4 Business Days (Express Air)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Warranty Registration:</span>
            <span className="font-bold text-green-600">Automatic 1-Year Official Warranty</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/personal/track-order"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <Package className="w-4 h-4" /> Track Your Order
          </Link>
          <Link
            href="/personal/app"
            className="px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
          >
            Download Treel Care App
          </Link>
        </div>
      </div>
    </div>
  );
}
