import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, BookOpen, Clock } from "lucide-react";
import { WhitepaperForm } from "./whitepaper-form";

export const metadata: Metadata = {
  title: "The Fleet ROI Paper — How TMIP customers reach payback in nine months · TMIP Whitepaper",
  description:
    "The economics of mobility intelligence deployment across two hundred TMIP customers. Payback drivers, ROI attribution, and vehicle-level economics.",
  alternates: {
    canonical: "https://treel.in/tmip/whitepapers/roi-fleet-intelligence",
  },
  openGraph: {
    title: "The Fleet ROI Paper — How TMIP customers reach payback in nine months · TMIP Whitepaper",
    description:
      "The economics of mobility intelligence deployment across two hundred TMIP customers. Payback drivers, ROI attribution, and vehicle-level economics.",
    url: "https://treel.in/tmip/whitepapers/roi-fleet-intelligence",
  },
};

export default function RoiFleetIntelligencePage() {
  return (
    <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Subtle Blueprint Grid: 60px x 60px rgba(59,130,246,0.04) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header & Breadcrumbs */}
      <section className="relative z-10 pt-12 sm:pt-16 pb-8 sm:pb-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-3 sm:mb-4">
            <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
              TMIP
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/tmip/whitepapers" className="hover:text-[#F1F5F9] transition-colors">
              Whitepapers
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[#3B82F6] truncate">The Fleet ROI Paper</span>
          </nav>

          <div className="max-w-4xl space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
                ROI &amp; PAYBACK
              </span>
              <span className="border border-slate-400/20 bg-white/[0.03] px-2.5 py-0.5 rounded-[2px] text-xs font-jetbrains text-[#94A3B8]">
                28 PAGES
              </span>
              <span className="text-xs font-jetbrains text-[#94A3B8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                October 2026
              </span>
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              The Fleet ROI Paper — How TMIP customers reach payback in nine months
            </h1>

            <p className="text-sm font-jetbrains text-[#94A3B8]">
              By Treel Research · Fleet Analytics &amp; Enterprise Economics Group
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Abstract/TOC on Left, Gated Form on Right */}
      <section className="relative z-10 py-10 sm:py-12 lg:py-14 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Abstract & Table of Contents */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Abstract */}
              <div className="space-y-3">
                <h2 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">What this paper covers</h2>
                <div className="space-y-3 text-base text-[#94A3B8] leading-relaxed font-ibm-plex">
                  <p>
                    Across two hundred commercial transport enterprises running 68,000+ heavy commercial vehicles, the
                    median payback period for the Treel Mobility Intelligence Platform (TMIP) is nine months. This
                    empirical research paper dissects the unit economics behind that timeline.
                  </p>
                  <p>
                    Rather than relying on theoretical fuel savings or generic telematics benchmarks, this study isolates
                    the precise operational interventions that move financial levers: tyre pressure maintenance
                    disciplines, early thermal signature detection, vehicle digital twin telemetry synchronization, and
                    automated preventive maintenance dispatch.
                  </p>
                  <p>
                    The paper breaks down ROI attribution across four distinct fleet profiles: long-haul linehaul
                    logistics, refrigerated cold-chain networks, intercity passenger coaches, and heavy infrastructure
                    tippers.
                  </p>
                </div>
              </div>

              {/* Table of Contents Preview */}
              <div className="p-5 sm:p-7 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2 text-xs font-jetbrains text-[#F59E0B] uppercase tracking-wider font-semibold">
                  <BookOpen className="w-4 h-4" />
                  <span>Table of Contents Preview</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9]">In this paper</h3>

                <ul className="space-y-2.5 text-sm text-[#CBD5E1] font-ibm-plex">
                  <li className="flex items-start gap-3">
                    <span className="font-jetbrains text-[#3B82F6] font-semibold">01</span>
                    <span>Executive Summary &amp; Cohort Methodology (200 Fleets, 68,412 Assets)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-jetbrains text-[#3B82F6] font-semibold">02</span>
                    <span>The Four Levers of Fleet Cost per Kilometre</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-jetbrains text-[#3B82F6] font-semibold">03</span>
                    <span>Tyre-Life Extension: Moving the Median by 5.2% to 6.8%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-jetbrains text-[#3B82F6] font-semibold">04</span>
                    <span>Fuel Consumption Variance &amp; Pressure Correlation Models</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-jetbrains text-[#3B82F6] font-semibold">05</span>
                    <span>Eliminating Unscheduled Breakdown Events on High-Velocity Corridors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-jetbrains text-[#3B82F6] font-semibold">06</span>
                    <span>Payback Timelines by Fleet Segment (Logistics vs. Passenger vs. Mining)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-jetbrains text-[#3B82F6] font-semibold">07</span>
                    <span>Implementation Blueprint: From Day 1 Telemetry to Month 9 Full Capital Payback</span>
                  </li>
                </ul>
              </div>

              {/* Key Cohort Findings */}
              <div className="space-y-3">
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9]">Key Research Findings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[4px] bg-[#050A17] border border-slate-400/10 space-y-1">
                    <div className="font-space-grotesk text-2xl font-bold text-[#F59E0B]">9.0 Months</div>
                    <div className="text-xs text-[#94A3B8] font-ibm-plex">Median Capital Payback Period</div>
                  </div>
                  <div className="p-4 rounded-[4px] bg-[#050A17] border border-slate-400/10 space-y-1">
                    <div className="font-space-grotesk text-2xl font-bold text-[#3B82F6]">0.5–0.6%</div>
                    <div className="text-xs text-[#94A3B8] font-ibm-plex">Average Fleet Fuel Cost Reduction</div>
                  </div>
                  <div className="p-4 rounded-[4px] bg-[#050A17] border border-slate-400/10 space-y-1">
                    <div className="font-space-grotesk text-2xl font-bold text-[#F59E0B]">6.8%</div>
                    <div className="text-xs text-[#94A3B8] font-ibm-plex">Tyre Tread Life Extension</div>
                  </div>
                  <div className="p-4 rounded-[4px] bg-[#050A17] border border-slate-400/10 space-y-1">
                    <div className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">34%</div>
                    <div className="text-xs text-[#94A3B8] font-ibm-plex">Reduction in Unscheduled Roadside Calls</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Functional Gated Form */}
            <div className="lg:col-span-5 sticky top-28">
              <WhitepaperForm />
            </div>
          </div>
        </div>
      </section>

      {/* Related Whitepapers Strip */}
      <section className="relative z-10 py-10 sm:py-12 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-space-grotesk text-xl sm:text-2xl font-bold text-[#F1F5F9]">Related Technical Research</h2>
            <Link
              href="/tmip/whitepapers"
              className="text-xs font-jetbrains text-[#3B82F6] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View all whitepapers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 sm:p-6 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-2.5">
                <span className="text-[11px] font-jetbrains uppercase tracking-wider text-[#3B82F6] font-semibold">
                  PLATFORM TELEMETRY
                </span>
                <h3 className="font-space-grotesk text-lg font-bold text-[#F1F5F9]">
                  Real-Time Edge Telemetry &amp; Anomaly Ingestion
                </h3>
                <p className="text-xs text-[#94A3B8] font-ibm-plex leading-relaxed">
                  How high-frequency sub-second sensor streams process real-time tyre pressure, vibration, and temperature profiles directly at the edge.
                </p>
              </div>
              <Link
                href="/tmip/platform/telemetry"
                className="text-xs font-jetbrains font-semibold text-[#3B82F6] hover:text-white flex items-center gap-1.5"
              >
                <span>Read telemetry overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 sm:p-6 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-2.5">
                <span className="text-[11px] font-jetbrains uppercase tracking-wider text-[#F59E0B] font-semibold">
                  ARCHITECTURE
                </span>
                <h3 className="font-space-grotesk text-lg font-bold text-[#F1F5F9]">
                  The Vehicle Digital Twin — Architecture &amp; Applications
                </h3>
                <p className="text-xs text-[#94A3B8] font-ibm-plex leading-relaxed">
                  The technical paper behind TMIP&apos;s Vehicle Digital Twin architecture: data model, state layers,
                  and prediction pipelines at scale.
                </p>
              </div>
              <Link
                href="/tmip/platform/vehicle-digital-twin"
                className="text-xs font-jetbrains font-semibold text-[#3B82F6] hover:text-white flex items-center gap-1.5"
              >
                <span>Explore architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 sm:p-6 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-2.5">
                <span className="text-[11px] font-jetbrains uppercase tracking-wider text-[#3B82F6] font-semibold">
                  PREDICTIVE MAINTENANCE
                </span>
                <h3 className="font-space-grotesk text-lg font-bold text-[#F1F5F9]">
                  Early Degradation Diagnostics &amp; Lifecycle Prediction
                </h3>
                <p className="text-xs text-[#94A3B8] font-ibm-plex leading-relaxed">
                  Predictive maintenance algorithms detecting carcass fatigue, thermal anomalies, and pressure drift 24 to 48 hours prior to catastrophic failure.
                </p>
              </div>
              <Link
                href="/tmip/platform/predictive-maintenance"
                className="text-xs font-jetbrains font-semibold text-[#3B82F6] hover:text-white flex items-center gap-1.5"
              >
                <span>Explore predictive intelligence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
