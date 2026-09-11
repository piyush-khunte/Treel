"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Apple, ArrowRight, ExternalLink, Smartphone, CheckCircle2, ShieldCheck, Radio } from "lucide-react";

export default function PersonalAppIosPage() {
  const appStoreUrl = "https://apps.apple.com/in/app/smart-tyre-car-bike/id1403399301";

  useEffect(() => {
    // Optional gentle redirect after 1.5 seconds if user arrived via direct deep link
    const timer = setTimeout(() => {
      window.location.href = appStoreUrl;
    }, 1500);
    return () => clearTimeout(timer);
  }, [appStoreUrl]);

  return (
    <div className="bg-white text-slate-900 font-manrope min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
              <Apple className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-block border text-blue-600 bg-blue-50 border-blue-200 text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full">
                APPLE APP STORE DEEP LINK
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Redirecting to the App Store…
              </h1>
              <p className="text-slate-600 text-sm leading-relaxed">
                Opening the official Treel Smart Tyre App on the Apple App Store for iPhone and Apple Watch.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Open in App Store</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div>Requires iOS 15.0 or later · Compatible with Apple Watch</div>
              <div>Free download · Designed for Treel BLE 5.0 Sensors</div>
            </div>

            <div className="pt-2">
              <Link
                href="/personal/features/app"
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                ← Back to Mobile App Features
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
