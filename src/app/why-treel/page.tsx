import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Treel  \u00b7  The Mobility Intelligence Choice",
  description: "Six reasons enterprise fleet operators, owner-drivers, and consumers choose Treel: data scale, category authority, JK Tyre backing, technical depth, customer proof, financial rigour.",
  alternates: {
    canonical: "https://treel.in/why-treel",
  },
  openGraph: {
    title: "Why Treel  \u00b7  The Mobility Intelligence Choice",
    description: "Six reasons enterprise fleet operators, owner-drivers, and consumers choose Treel: data scale, category authority, JK Tyre backing, technical depth, customer proof, financial rigour.",
    url: "https://treel.in/why-treel",
  },
};

export default function WhyTreelPage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B] mb-6 sm:mb-8">
              WHY TREEL
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Six reasons the mobility intelligence category runs on Treel.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              You have options in the fleet intelligence space. Here is why two hundred enterprise fleets, sixty-eight thousand vehicles, and an entire owner-driver community have chosen Treel to run on.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CUSTOMER STORIES */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Read the customer stories.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              We are not the only serious player in India's fleet intelligence space. If you are evaluating alternatives, the comparison typically involves Intangles, Tata Fleetman, Mahindra iMax, and Eye-Net. Book a demo and we will walk through the fit honestly. If the answer is that a competitor fits your specific use case better, we will tell you that.
            </p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              **Case study strip**
            </p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              The best case for Treel is what our customers have already done.
            </p>
            <div className="pt-6">
              <Link href="/tmip/customers/case-studies" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-sm bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                See case studies <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TALK TO US */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Talk to us.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              We would rather have a conversation about your fleet than send you more marketing pages.
            </p>
            <div className="pt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-sm bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                Get in touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}