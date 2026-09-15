"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Play, ArrowRight, ExternalLink } from "lucide-react";

export default function PersonalAppAndroidPage() {
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.treel.smarttyre";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = playStoreUrl;
    }, 1500);
    return () => clearTimeout(timer);
  }, [playStoreUrl]);

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-xl mx-auto p-8 sm:p-12 rounded-[32px] bg-white border border-black/[0.06] shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#2563EB] text-white flex items-center justify-center mx-auto shadow-md">
              <Play className="w-8 h-8 fill-current text-white" />
            </div>

            <div className="space-y-2">
              <span className="inline-block border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full">
                GOOGLE PLAY STORE DEEP LINK
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                Redirecting to Google Play…
              </h1>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Opening the official Treel Smart Tyre App on Google Play for Android and Wear OS.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
              >
                <span>Open in Google Play</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4 border-t border-black/[0.06] text-xs text-[#6B7280] space-y-1">
              <div>Requires Android 10.0 or later · Compatible with Wear OS</div>
              <div>Free download · Designed for Treel BLE 5.0 Sensors</div>
            </div>

            <div className="pt-2">
              <Link
                href="/personal/features/app"
                className="text-xs font-bold text-[#2563EB] hover:underline"
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
