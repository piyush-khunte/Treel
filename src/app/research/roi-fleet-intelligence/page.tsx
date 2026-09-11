import type { Metadata } from "next";
import Link from "next/link";
import { 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Building2,
  ChevronRight
} from "lucide-react";
import { WhitepaperGatedForm } from "./whitepaper-form";

export const metadata: Metadata = {
  title: "The Fleet ROI and Fuel Savings Paper  ·  Treel Research",
  description: "Comprehensive financial and operational analysis of mobility intelligence and real-time tyre telemetry across commercial vehicle fleets in India. 24-page whitepaper.",
  alternates: {
    canonical: "https://treel.in/research/roi-fleet-intelligence",
  },
  openGraph: {
    title: "The Fleet ROI and Fuel Savings Paper  ·  Treel Research",
    description: "Comprehensive financial and operational analysis of mobility intelligence and real-time tyre telemetry across commercial vehicle fleets in India. 24-page whitepaper.",
    url: "https://treel.in/research/roi-fleet-intelligence",
  },
};

export default function ResearchRoiFleetIntelligencePage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      {/* Header & Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Link href="/research" className="hover:text-white transition-colors">
                Research
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#D5573B]">The Fleet ROI and Fuel Savings Paper</span>
            </nav>

            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">
              ROI &amp; PAYBACK
            </div>

            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">
              The Fleet ROI and Fuel Savings Paper
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-mono text-[#94A3B8] border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D5573B]" />
                <span>Published October 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D5573B]" />
                <span>24 pages</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#D5573B]" />
                <span>By Treel Research</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Gated Download Grid */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Abstract & Table of Contents */}
            <div className="lg:col-span-7 space-y-12">
              {/* Abstract */}
              <div className="space-y-4">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
                  What this paper covers
                </h2>
                <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                  A comprehensive financial and operational analysis of mobility intelligence and real-time tyre telemetry across commercial vehicle fleets in India. Based on longitudinal empirical data from 200+ enterprise deployments and 68,000 connected vehicles under active management.
                </p>
                <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                  This paper breaks down the exact mechanics of 5–6% fuel savings, 5–7% tyre life extension, and 30–40% reduction in unscheduled downtime, validating the 9-month median capital payback for enterprise fleet operators.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-6">
                <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-[#D5573B]" />
                  <span>In this paper</span>
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                    <span className="font-mono text-xs text-[#D5573B] font-bold mt-1">01</span>
                    <span>Executive Summary &amp; Indian Commercial Fleet Context</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                    <span className="font-mono text-xs text-[#D5573B] font-bold mt-1">02</span>
                    <span>The Physics of Rolling Resistance, Pressure Variances &amp; Fuel Burn</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                    <span className="font-mono text-xs text-[#D5573B] font-bold mt-1">03</span>
                    <span>Predictive vs. Reactive Tyre Maintenance: Cost Analysis per KM</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                    <span className="font-mono text-xs text-[#D5573B] font-bold mt-1">04</span>
                    <span>Field Telemetry Findings from 68,000 Monitored Wheels</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                    <span className="font-mono text-xs text-[#D5573B] font-bold mt-1">05</span>
                    <span>Capital Payback Modelling &amp; CFO Validation Framework</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                    <span className="font-mono text-xs text-[#D5573B] font-bold mt-1">06</span>
                    <span>Enterprise TMS Integration &amp; Implementation Architecture</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Gated Download Form */}
            <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl sticky top-28">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#D5573B] font-semibold">
                  FREE DOWNLOAD
                </div>
                <h3 className="font-fraunces text-2xl font-bold text-[#FAF7F2]">
                  Unlock the full paper
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Enter your details to receive the full 24-page PDF whitepaper by email. No spam. Unsubscribe anytime.
                </p>
              </div>

              <WhitepaperGatedForm />
            </div>
          </div>
        </div>
      </section>

      {/* Related Research Strip */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
              Related research
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                href="/research"
                className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/40 transition-all group block"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-[#D5573B] mb-2 font-semibold">
                  CASE STUDY
                </div>
                <h3 className="font-fraunces text-lg font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">
                  The 1,000-Truck Case Study
                </h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                  Longitudinal fleet data and operations transformation across a 1,000-truck logistics network.
                </p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link 
                href="/vehicle-digital-twin"
                className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/40 transition-all group block"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-[#D5573B] mb-2 font-semibold">
                  TECHNICAL PAPER
                </div>
                <h3 className="font-fraunces text-lg font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">
                  The Vehicle Digital Twin Technical Paper
                </h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                  Core architectural specifications for turning physical commercial vehicles into queryable software objects.
                </p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
