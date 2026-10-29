import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Activity, Clock, BarChart3, Box, Globe } from "lucide-react";
import { TwinInteractive } from "./twin-interactive";

export const metadata: Metadata = {
  title: "TMIP Fleet Telematics & Vehicle Digital Twin | Treel",
  description:
    "TMIP is Treel's Vehicle Digital Twin platform for enterprise fleets. Real-time telemetry, predictive maintenance, cost per kilometre. 68,000+ vehicles under management. 9-month median payback.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://treel.in/tmip",
  },
  openGraph: {
    title: "TMIP Fleet Telematics & Vehicle Digital Twin | Treel",
    description:
      "TMIP is Treel's Vehicle Digital Twin platform for enterprise fleets. Real-time telemetry, predictive maintenance, cost per kilometre. 68,000+ vehicles under management. 9-month median payback.",
    url: "https://treel.in/tmip",
  },
};

const capabilities = [
  {
    icon: Activity,
    title: "Operational Profitability & CPK",
    body: "Turn commercial fleet assets into high-margin profit centres. TMIP drives down Cost Per Kilometre (CPK) through tyre lifecycle extension, fuel optimization, and verified 9-month capital payback.",
  },
  {
    icon: Clock,
    title: "Drastically Reduced Downtime",
    body: "Eliminate costly roadside strandings and emergency tyre failures. Predictive intelligence detects pressure degradation 24–48 hours ahead, preventing breakdown delays and SLA penalties.",
  },
  {
    icon: BarChart3,
    title: "Proven Fleet Cost-Effectiveness",
    body: "5% to 7% tyre life extension combined with sustained fuel savings of 0.5% to 1.2%. Zero surprise capital outlays, transparent unit economics, and audited enterprise returns.",
  },
  {
    icon: Box,
    title: "Vehicle Digital Twin",
    body: "The category-defining architecture. Every vehicle rendered as a queryable digital object. Reason about the fleet the way you reason about your data warehouse.",
  },
  {
    icon: Globe,
    title: "Multi-region deployment",
    body: "India first. Middle East from Month 4. Europe from Month 8. One platform, region-tuned intelligence, unified operator experience.",
  },
];

export default function TmipPage() {
  return (
    <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Subtle Blueprint Grid Background: 60px x 60px rgba(59,130,246,0.04) */}
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

      {/* Hero Section */}
      <section className="relative z-10 pt-12 sm:pt-16 pb-10 sm:pb-12 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div>
              <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] mb-3 sm:mb-4 font-medium">
                ENTERPRISE FLEET INTELLIGENCE
              </div>
              <h1 className="font-space-grotesk text-4xl sm:text-6xl lg:text-[72px] xl:text-[84px] font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.02] mb-4 sm:mb-5">
                The Vehicle Digital Twin for <span className="text-[#3B82F6] italic">enterprise fleets</span>.
              </h1>
              <p className="font-ibm-plex text-lg sm:text-[20px] leading-[1.55] text-[#94A3B8] max-w-[580px] mb-6 sm:mb-8">
                Maximized operational profitability, drastically reduced unscheduled downtime, and proven cost-effectiveness across sixty-eight thousand commercial vehicles. Built for fleet operators and CFOs who measure in rupees saved per kilometre, not vanity dashboards.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/tmip/demo"
                  className="px-7 py-3.5 rounded-[3px] font-space-grotesk font-semibold text-sm bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-lg shadow-[#3B82F6]/20 inline-flex items-center gap-2 transition-all duration-200"
                >
                  Book a 30-minute demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tmip/roi-calculator"
                  className="px-7 py-3.5 rounded-[3px] font-ibm-plex font-medium text-sm text-[#F1F5F9] border border-[rgba(59,130,246,0.3)] hover:border-[#3B82F6] hover:bg-[#3B82F6]/[0.08] inline-flex items-center transition-all duration-200"
                >
                  Calculate your ROI
                </Link>
              </div>
            </div>

            {/* Right Column: TMIP Signature Visual */}
            <div className="hidden lg:flex justify-center items-center p-6 xl:p-10 select-none" aria-hidden="true">
              <svg
                viewBox="0 0 380 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[420px] h-auto"
              >
                <defs>
                  <filter id="tmipHeroGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                </defs>
                {/* Subtle blueprint glow */}
                <g fill="#3B82F6" filter="url(#tmipHeroGlow)" opacity="0.25">
                  <rect x="30" y="32" width="320" height="36" rx="4" opacity="0.55" />
                  <rect x="30" y="92" width="320" height="36" rx="4" opacity="0.8" />
                  <rect x="30" y="152" width="320" height="36" rx="4" />
                </g>
                {/* Precision TMIP Motion Marks */}
                <g fill="#3B82F6">
                  <rect x="30" y="32" width="320" height="36" rx="4" opacity="0.55" />
                  <rect x="30" y="92" width="320" height="36" rx="4" opacity="0.8" />
                  <rect x="30" y="152" width="320" height="36" rx="4" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics band (4 metrics) */}
      <section className="relative z-10 py-8 sm:py-10 border-b border-slate-400/10 bg-[#080E1E]/80">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-1.5">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#F59E0B] tracking-[-0.03em] leading-none mb-1.5">
                68,412
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-[#94A3B8] leading-[1.4]">
                Vehicles under management
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] text-[#10B981] font-medium mt-0.5">
                +247 this quarter
              </div>
            </div>

            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-1.5">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#F59E0B] tracking-[-0.03em] leading-none mb-1.5">
                99.7%
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-[#94A3B8] leading-[1.4]">
                Platform uptime, trailing 90 days
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] text-[#10B981] font-medium mt-0.5">
                +0.3% WoW
              </div>
            </div>

            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-1.5">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#F59E0B] tracking-[-0.03em] leading-none mb-1.5">
                5-7%
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-[#94A3B8] leading-[1.4]">
                Tyre-life extension
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] text-[#F59E0B] font-medium mt-0.5">
                Fleet median
              </div>
            </div>

            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-1.5">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#F59E0B] tracking-[-0.03em] leading-none mb-1.5">
                9 mo
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-[#94A3B8] leading-[1.4]">
                Payback period
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] text-[#3B82F6] font-medium mt-0.5">
                Median across cohort
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Vehicle Digital Twin in real time */}
      <section className="relative z-10 py-10 sm:py-14 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-6 sm:space-y-8">
          <div className="max-w-[720px] space-y-3 mb-4 sm:mb-6">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
              THE VEHICLE DIGITAL TWIN
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#F1F5F9]">
              The Vehicle Digital Twin, in real time.
            </h2>
            <p className="font-ibm-plex text-base sm:text-[17px] leading-[1.55] text-[#94A3B8]">
              Every truck rendered as a live intelligence surface. Component health, tyre state, fuel signature, driver
              behaviour, predicted maintenance windows. One view, per vehicle, per fleet, per region.
            </p>
          </div>

          <TwinInteractive />
        </div>
      </section>

      {/* Section · Built for the fleet operations director */}
      <section className="relative z-10 py-10 sm:py-14 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-6 sm:space-y-8">
          <div className="max-w-[720px] space-y-3">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
              CAPABILITIES
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#F1F5F9]">
              Built for the fleet operations director.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-[4px] bg-[#0B1220]/60 border border-slate-400/10 hover:border-[#3B82F6]/30 hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-[#050A17] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-space-grotesk text-lg font-semibold text-[#F1F5F9] tracking-[-0.01em]">
                      {cap.title}
                    </h3>
                    <p className="font-ibm-plex text-sm text-[#94A3B8] leading-[1.55]">
                      {cap.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA band (final section) */}
      <section className="relative z-10 py-10 sm:py-14 border-t border-[rgba(59,130,246,0.15)] bg-gradient-to-br from-[#3B82F6]/[0.06] to-[#F59E0B]/[0.04]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-4 sm:space-y-5">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-[#F1F5F9]">
              See TMIP on your fleet.
            </h2>
            <p className="font-ibm-plex text-base sm:text-lg text-[#94A3B8] leading-[1.6]">
              A 30-minute demo with a Treel solutions engineer. If
              the payback math does not work for you, we do not sell into it.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[3px] font-space-grotesk font-semibold text-sm sm:text-base bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-lg shadow-[#3B82F6]/20 transition-all duration-200"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
