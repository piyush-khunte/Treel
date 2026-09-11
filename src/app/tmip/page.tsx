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
    <div className="bg-[#050A17] text-[#F1F5F9] font-ibm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-semibold">
              TREEL MOBILITY INTELLIGENCE PLATFORM
            </div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              From tyre monitoring to{" "}
              <span className="italic text-[#3B82F6]">mobility intelligence</span>.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl">
              The Vehicle Digital Twin platform for enterprise fleets that treat data as operating capital. API-first
              architecture. Native integration with Fleetx, Locus, LogiNext, and custom TMS stacks.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/tmip/demo"
                className="px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2 bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/whitepapers/roi-fleet-intelligence"
                className="px-6 py-3 rounded-lg font-semibold text-sm transition-all inline-flex items-center gap-2 border border-white/20 text-[#F1F5F9] hover:bg-white/10"
              >
                Read the whitepaper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics band (4 metrics) */}
      <section className="py-12 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1.5">
              <div className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                68,412
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Vehicles under management</div>
              <div className="text-xs font-mono text-[#10B981] font-medium">+247 this quarter</div>
            </div>

            <div className="space-y-1.5">
              <div className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                99.7%
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Platform uptime, trailing 90 days</div>
              <div className="text-xs font-mono text-[#10B981] font-medium">+0.3% WoW</div>
            </div>

            <div className="space-y-1.5">
              <div className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                5-7%
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Tyre-life extension</div>
              <div className="text-xs font-mono text-[#F59E0B] font-medium">Fleet median</div>
            </div>

            <div className="space-y-1.5">
              <div className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                9 mo
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Payback period</div>
              <div className="text-xs font-mono text-[#3B82F6] font-medium">Median across cohort</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Vehicle Digital Twin in real time */}
      <section className="py-20 lg:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-10">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-semibold">
              THE VEHICLE DIGITAL TWIN
            </div>
            <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              The Vehicle Digital Twin, in real time.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Every truck rendered as a live intelligence surface. Component health, tyre state, fuel signature, driver
              behaviour, predicted maintenance windows. One view, per vehicle, per fleet, per region.
            </p>
          </div>

          <TwinInteractive />
        </div>
      </section>

      {/* Section · Built for the fleet operations director */}
      <section className="py-20 lg:py-24 border-b border-white/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-semibold">
              CAPABILITIES
            </div>
            <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              Built for the fleet operations director.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-[#3B82F6]/50 transition-all group flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-space text-xl font-bold text-[#F1F5F9]">{cap.title}</h3>
                    <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">{cap.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA band (final section) */}
      <section className="py-20 lg:py-24 border-b border-white/10 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              See TMIP on your fleet.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              A 30-minute demo with a Treel solutions engineer, followed by a 14-day pilot on a subset of your fleet. If
              the payback math does not work for you, we do not sell into it.
            </p>
            <div className="pt-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
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