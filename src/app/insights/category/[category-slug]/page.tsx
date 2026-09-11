import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "[Category]  \u00b7  Treel Insights",
  description: "Insights and analysis on [category] from Treel Mobility Solutions.",
  alternates: {
    canonical: "https://treel.in/insights/category/[category-slug]",
  },
  openGraph: {
    title: "[Category]  \u00b7  Treel Insights",
    description: "Insights and analysis on [category] from Treel Mobility Solutions.",
    url: "https://treel.in/insights/category/[category-slug]",
  },
};

export default function InsightsCategoryCategorySlugPage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">INSIGHTS  ›  [CATEGORY]</div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">[Category name]</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">[Category-specific 1-sentence description]</p>
          </div>
        </div>
      </section>

    </div>
  );
}