import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Partners  \u00b7  Treel",
  description: "Treel partners across OEMs, telematics platforms, finance, and distribution. Our partnership philosophy: build what only we can build, partner for everything else.",
  alternates: {
    canonical: "https://treel.in/partners",
  },
  openGraph: {
    title: "Partners  \u00b7  Treel",
    description: "Treel partners across OEMs, telematics platforms, finance, and distribution. Our partnership philosophy: build what only we can build, partner for everything else.",
    url: "https://treel.in/partners",
  },
};

export default function PartnersPage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">PARTNERS</div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">We built Treel with partners, not around them.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">Our partnership philosophy is simple: we build the mobility intelligence platform and Vehicle Digital Twin architecture that only we can build. For everything else, we partner with the best in the category. Below are the partners that make Treel work.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Interested in partnering with Treel?</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">If your company builds fleet software, provides financing, distributes commercial vehicle products, or operates in an adjacent category, we would like to talk. Partnership decisions are made by the founder directly; we do not partner casually.</p>
            <div className="pt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                Send us a note <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}