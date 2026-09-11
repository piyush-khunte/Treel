import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Manish Ingale  \u00b7  Founder Note  \u00b7  Treel",
  description: "Why Manish Ingale founded Treel: the moment India's commercial vehicles began producing more data than anyone was reading, and why the category moved from tyre monitoring to mobility intelligence.",
  alternates: {
    canonical: "https://treel.in/founder-note",
  },
  openGraph: {
    title: "Manish Ingale  \u00b7  Founder Note  \u00b7  Treel",
    description: "Why Manish Ingale founded Treel: the moment India's commercial vehicles began producing more data than anyone was reading, and why the category moved from tyre monitoring to mobility intelligence.",
    url: "https://treel.in/founder-note",
  },
};

export default function FounderNotePage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">What I saw before I started Treel.</h1>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Continue reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <Link href="/about" className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/30 transition-all group block">
                <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">About Treel</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/our-story" className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/30 transition-all group block">
                <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Our Story</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/vehicle-digital-twin" className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/30 transition-all group block">
                <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Vehicle Digital Twin</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Talk to us.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Whether you are a fleet operator, a partner, a journalist, or a candidate, we would like to hear from you.</p>
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