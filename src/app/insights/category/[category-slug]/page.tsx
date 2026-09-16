import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: "Category" },
              ]}
            />
            <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
              INSIGHTS  ›  [CATEGORY]
            </p>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12] mb-6">
              [Category name]
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              [Category-specific 1-sentence description]
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}