import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Activity, Clock, Layers, BarChart3, Box, Globe } from "lucide-react";
import { TwinInteractive } from "./twin-interactive";

export const metadata: Metadata = {
  title: "TMIP  ·  The Mobility Intelligence Platform  ·  Treel",
  description:
    "TMIP is Treel's Vehicle Digital Twin platform for enterprise fleets. Real-time telemetry, predictive maintenance, cost per kilometre. 68,000+ vehicles under management. 9-month median payback.",
  alternates: {
    canonical: "https://treel.in/tmip",
  },
  openGraph: {
    title: "TMIP  ·  The Mobility Intelligence Platform  ·  Treel",
    description:
      "TMIP is Treel's Vehicle Digital Twin platform for enterprise fleets. Real-time telemetry, predictive maintenance, cost per kilometre. 68,000+ vehicles under management. 9-month median payback.",
    url: "https://treel.in/tmip",
  },
};

const capabilities = [
  {
    icon: Activity,
    title: "Real-time telemetry",
    body: "Sub-second updates across the fleet. Pressure, temperature, load, fuel consumption, driver behaviour, all rendered in one live dashboard.",
  },
  {
    icon: Clock,
    title: "Predictive maintenance",
    body: "Machine-learning models flag component wear before failure. Reduce unscheduled downtime and stretch maintenance intervals with confidence.",
  },
  {
    icon: Layers,
    title: "API-first integrations",
    body: "Native connectors to Fleetx, Locus, LogiNext, and custom TMS stacks. Data flows both ways; TMIP fits your architecture, not the reverse.",
  },
  {
    icon: BarChart3,
    title: "Cost per kilometre",
    body: "The metric your CFO cares about. TMIP calculates true cost per kilometre across vehicle class, route, driver, and region, updated continuously.",
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
      <section className="relative z-10 pt-24 sm:pt-28 pb-28 sm:pb-32 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-[900px]">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] mb-7 font-medium">
              TREEL MOBILITY INTELLIGENCE PLATFORM
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-6xl lg:text-[72px] xl:text-[84px] font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.02] mb-8">
              From tyre monitoring to{" "}
              <span className="text-[#3B82F6]">mobility intelligence</span>.
            </h1>
            <p className="font-ibm-plex text-lg sm:text-[20px] leading-[1.55] text-[#94A3B8] max-w-[640px] mb-10">
              The Vehicle Digital Twin platform for enterprise fleets that treat data as operating capital. API-first
              architecture. Native integration with Fleetx, Locus, LogiNext, and custom TMS stacks.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/tmip/demo"
                className="px-7 py-3.5 rounded-[3px] font-space-grotesk font-semibold text-sm bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-lg shadow-[#3B82F6]/20 inline-flex items-center gap-2 transition-all duration-200"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/whitepapers/roi-fleet-intelligence"
                className="px-7 py-3.5 rounded-[3px] font-ibm-plex font-medium text-sm text-[#F1F5F9] border border-[rgba(59,130,246,0.3)] hover:border-[#3B82F6] hover:bg-[#3B82F6]/[0.08] inline-flex items-center transition-all duration-200"
              >
                Read the whitepaper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics band (4 metrics) */}
      <section className="relative z-10 py-14 sm:py-16 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/80">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-2">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#F59E0B] tracking-[-0.03em] leading-none mb-2">
                68,412
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-[#94A3B8] leading-[1.4]">
                Vehicles under management
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] text-[#10B981] font-medium mt-1">
                +247 this quarter
              </div>
            </div>

            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-2">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#F59E0B] tracking-[-0.03em] leading-none mb-2">
                99.7%
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-[#94A3B8] leading-[1.4]">
                Platform uptime, trailing 90 days
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] text-[#10B981] font-medium mt-1">
                +0.3% WoW
              </div>
            </div>

            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-2">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#F59E0B] tracking-[-0.03em] leading-none mb-2">
                5-7%
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-[#94A3B8] leading-[1.4]">
                Tyre-life extension
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] text-[#F59E0B] font-medium mt-1">
                Fleet median
              </div>
            </div>

            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-2">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#F59E0B] tracking-[-0.03em] leading-none mb-2">
                9 mo
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-[#94A3B8] leading-[1.4]">
                Payback period
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] text-[#3B82F6] font-medium mt-1">
                Median across cohort
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Vehicle Digital Twin in real time */}
      <section className="relative z-10 py-20 lg:py-28 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-[720px] space-y-4 mb-10 sm:mb-12">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
              THE VEHICLE DIGITAL TWIN
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[48px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#F1F5F9]">
              The Vehicle Digital Twin, in real time.
            </h2>
            <p className="font-ibm-plex text-base sm:text-[18px] leading-[1.55] text-[#94A3B8]">
              Every truck rendered as a live intelligence surface. Component health, tyre state, fuel signature, driver
              behaviour, predicted maintenance windows. One view, per vehicle, per fleet, per region.
            </p>
          </div>

          <TwinInteractive />
        </div>
      </section>

      {/* Section · Built for the fleet operations director */}
      <section className="relative z-10 py-20 lg:py-28 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-[720px] space-y-4">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
              CAPABILITIES
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[48px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#F1F5F9]">
              Built for the fleet operations director.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-[4px] bg-[#0B1220]/60 border border-slate-400/10 hover:border-[#3B82F6]/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-[#050A17] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-space-grotesk text-xl font-semibold text-[#F1F5F9] tracking-[-0.01em]">
                      {cap.title}
                    </h3>
                    <p className="font-ibm-plex text-sm text-[#94A3B8] leading-[1.6]">
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
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-t border-[rgba(59,130,246,0.15)] bg-gradient-to-br from-[#3B82F6]/[0.06] to-[#F59E0B]/[0.04]">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-[#F1F5F9]">
              See TMIP on your fleet.
            </h2>
            <p className="font-ibm-plex text-base sm:text-lg text-[#94A3B8] leading-[1.6]">
              A 30-minute demo with a Treel solutions engineer, followed by a 14-day pilot on a subset of your fleet. If
              the payback math does not work for you, we do not sell into it.
            </p>
            <div className="pt-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[3px] font-space-grotesk font-semibold text-sm sm:text-base bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-lg shadow-[#3B82F6]/20 transition-all duration-200"
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