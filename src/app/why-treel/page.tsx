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
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">WHY TREEL</div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Six reasons the mobility intelligence category runs on Treel.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">You have options in the fleet intelligence space. Here is why two hundred enterprise fleets, sixty-eight thousand vehicles, and an entire owner-driver community have chosen Treel to run on.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Read the customer stories.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">We are not the only serious player in India's fleet intelligence space. If you are evaluating alternatives, the comparison typically involves Intangles, Tata Fleetman, Mahindra iMax, and Eye-Net. Book a demo and we will walk through the fit honestly. If the answer is that a competitor fits your specific use case better, we will tell you that.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Case study strip**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">The best case for Treel is what our customers have already done.</p>
            <div className="pt-6">
              <Link href="/tmip/customers/case-studies" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                See case studies <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Talk to us.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">We would rather have a conversation about your fleet than send you more marketing pages.</p>
            <div className="pt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                Get in touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}