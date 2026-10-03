"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, ShieldCheck, FileText, ArrowLeft } from "lucide-react";

export function ScheduledClientView() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Conversion trigger for GTM. first_view is true only once per session, so refresh does not double count.
    const seenKey = "treel_ty_seen_tmip";
    let isFirst = true;
    try {
      isFirst = !sessionStorage.getItem(seenKey);
      sessionStorage.setItem(seenKey, "1");
    } catch {
      // sessionStorage restricted
    }

    if (typeof window !== "undefined") {
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "lead_thank_you_view",
        product_line: "tmip",
        brand_theme: "tmip",
        first_view: isFirst,
        utm_source: searchParams?.get("utm_source") || "",
        utm_medium: searchParams?.get("utm_medium") || "",
        utm_campaign: searchParams?.get("utm_campaign") || "",
        utm_term: searchParams?.get("utm_term") || "",
        utm_content: searchParams?.get("utm_content") || "",
        ad_group: searchParams?.get("ad_group") || "",
        gclid: searchParams?.get("gclid") || "",
        fbclid: searchParams?.get("fbclid") || "",
      });
    }
  }, [searchParams]);

  return (
    <div className="relative z-10 max-w-[880px] mx-auto px-6 py-16 sm:py-24 text-center">
      {/* 1. Animated / Clean Green Checkmark Icon */}
      <div className="mb-6 flex justify-center">
        <svg
          className="w-20 h-20 sm:w-24 sm:h-24"
          viewBox="0 0 96 96"
          aria-hidden="true"
        >
          <circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke="#10B981"
            strokeWidth="5"
            opacity="0.25"
          />
          <path
            d="M30 50 L43 63 L67 36"
            fill="none"
            stroke="#10B981"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 2. Clean TMIP Headline */}
      <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.08] mb-4">
        Thank you.
      </h1>

      {/* 3. Short Confirmation Message */}
      <p className="text-[#94A3B8] text-lg sm:text-xl font-ibm-plex max-w-xl mx-auto mb-8 leading-relaxed">
        Our team will reach out to schedule your 30-minute demo, followed by a 14-day pilot on a subset of your fleet.
      </p>

      {/* 4. Action / Contact Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
        <a
          href="tel:18008330233"
          className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-6 rounded-[3px] font-space-grotesk text-sm sm:text-base font-semibold bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-md transition-all"
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span>Call toll-free <span className="font-mono">1800 833 0233</span></span>
        </a>

        <a
          href="mailto:hello@treel.in"
          className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-6 rounded-[3px] font-space-grotesk text-sm sm:text-base font-semibold bg-transparent text-[#F1F5F9] border border-blue-900/40 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all"
        >
          <Mail className="w-4 h-4 shrink-0" />
          <span>hello@treel.in</span>
        </a>
      </div>

      {/* 5. Trust / Certification Strip */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-[#94A3B8] mb-12">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
          <span>ARAI &amp; ISO 9001:2015 certified</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#3B82F6]" />
          <span>Patents in India, US &amp; EU</span>
        </span>
      </div>

      {/* 6. Back to TMIP Campaign Link */}
      <div className="text-center">
        <Link
          href="/lp-tmip"
          className="inline-flex items-center gap-2 text-sm font-ibm-plex font-bold text-[#94A3B8] hover:text-[#3B82F6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to TMIP</span>
        </Link>
      </div>
    </div>
  );
}
