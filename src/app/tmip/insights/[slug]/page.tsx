import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "[Article Headline]  \u00b7  TMIP Insights",
  description: "[Article excerpt, 150 chars]",
  alternates: {
    canonical: "https://treel.in/tmip/insights/[slug]",
  },
  openGraph: {
    title: "[Article Headline]  \u00b7  TMIP Insights",
    description: "[Article excerpt, 150 chars]",
    url: "https://treel.in/tmip/insights/[slug]",
  },
};

export default function TmipInsightsSlugPage() {
  return (
    <div className="space-y-0 bg-[#0B132B] text-[#F8FAFC] font-ibm">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15]">Individual TMIP insight</h1>
          </div>
        </div>
      </section>

    </div>
  );
}