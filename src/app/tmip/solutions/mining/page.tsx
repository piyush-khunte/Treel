import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Pickaxe,
  Radio,
  Activity,
  BarChart3,
  Gauge,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mining Fleet Intelligence · TMIP",
  description:
    "TMIP for mining fleets: off-highway operations where downtime costs are extreme and maintenance windows are unforgiving. Ruggedised sensors, predictive analytics.",
  alternates: {
    canonical: "https://treel.in/tmip/solutions/mining",
  },
  openGraph: {
    title: "Mining Fleet Intelligence · TMIP",
    description:
      "TMIP for mining fleets: off-highway operations where downtime costs are extreme and maintenance windows are unforgiving. Ruggedised sensors, predictive analytics.",
    url: "https://treel.in/tmip/solutions/mining",
  },
};

const challenges = [
  {
    title: "Intermittent or absent cellular connectivity",
    desc: "Deep open-cast extraction pits and remote mining leases operate outside cellular tower coverage, causing standard cloud tracking systems to fail completely.",
  },
  {
    title: "Extreme cost of unscheduled downtime",
    desc: "When an ultra-heavy dumper stalls on a single-lane haul ramp, production bottlenecks cascade across the entire pit, costing lakhs per hour in lost output.",
  },
  {
    title: "Aggressive tyre replacement cycles",
    desc: "Massive OTR and heavy commercial tyres wear rapidly under extreme axle payloads, steep haul road gradients, and sharp blasted rock fragments.",
  },
  {
    title: "Remote site maintenance capacity constraints",
    desc: "Mining workshops operate with limited technician availability and high spare parts lead times, making unexpected catastrophic failures catastrophic to production.",
  },
  {
    title: "High-risk, safety-critical environments",
    desc: "Thermal runaway in massive heavy tyres presents severe explosion hazards to personnel, equipment, and structural safety on active mine haul roads.",
  },
];

const capabilities = [
  {
    title: "Ruggedised Hardware Architecture",
    desc: "Heavy-duty sensors and IP68-rated enclosures engineered to withstand relentless rock impacts, extreme dust, slurry wash, and intense heat.",
    icon: ShieldCheck,
  },
  {
    title: "Offline-First Edge Processing",
    desc: "Autonomous edge controllers compute physics and machine learning anomaly models on-vehicle, triggering local cab alerts even in zero-connectivity pits.",
    icon: Radio,
  },
  {
    title: "Predictive Component Maintenance",
    desc: "Continuous thermal-pressure gradient tracking identifies internal ply separation, uneven wheel-end drag, and impending failures days before blowouts occur.",
    icon: Activity,
  },
  {
    title: "Site-Level Operations Dashboards",
    desc: "High-contrast control room dashboards providing mine dispatchers and shift superintendents with real-time operational visibility across the entire haul fleet.",
    icon: Gauge,
  },
  {
    title: "Component-Level Cost Attribution",
    desc: "Boardroom-ready financial telemetry attributing tyre and fuel costs per metric ton of ore hauled across specific mine sections and shifts.",
    icon: BarChart3,
  },
];

export default function TmipSolutionsMiningPage() {
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

      {/* Hero Section */}
      <section className="relative z-10 pt-24 sm:pt-28 pb-20 sm:pb-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-4">
              <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
                TMIP
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href="/tmip/solutions" className="hover:text-[#F1F5F9] transition-colors">
                Solutions
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">Mining</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-jetbrains text-xs tracking-wider uppercase font-semibold">
              SOLUTIONS · MINING
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Where downtime is measured in lakhs per hour.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl font-ibm-plex">
              TMIP for mining fleets. Off-highway operations where a single unscheduled downtime event costs more than
              most enterprise software subscriptions cost per year.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/platform"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all border border-slate-400/20 text-[#F1F5F9] hover:bg-white/5 hover:border-slate-400/40"
              >
                Inspect Telemetry Architecture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Band */}
      <section className="relative z-10 py-12 px-6 sm:px-10 border-b border-slate-400/10 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10">
              <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#10B981]">99.4%</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1 font-ibm-plex">Haul Fleet Availability</div>
              <div className="text-xs text-[#94A3B8] mt-1 font-ibm-plex">Sustaining round-the-clock shift productivity in central India pits</div>
            </div>
            <div className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10">
              <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#3B82F6]">22% Drop</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1 font-ibm-plex">Premature Tyre Scrap</div>
              <div className="text-xs text-[#94A3B8] mt-1 font-ibm-plex">Preventing destructive cut-and-chip failures on abrasive haul roads</div>
            </div>
            <div className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10">
              <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#F59E0B]">₹2.1 Cr</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1 font-ibm-plex">Annual Heavy Fleet Savings</div>
              <div className="text-xs text-[#94A3B8] mt-1 font-ibm-plex">Direct savings across high-value tyre assets and prevented downtime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space-grotesk text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Mining Operating Challenges
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Mining operations subject vehicles and instrumentation to the harshest mechanical and environmental
              stresses in modern industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((item, idx) => (
              <div key={idx} className="p-6 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-3">
                <div className="w-8 h-8 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-xs font-jetbrains font-bold text-[#3B82F6]">
                  0{idx + 1}
                </div>
                <h3 className="font-space-grotesk text-lg font-bold text-[#F1F5F9]">{item.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TMIP's Fit Section */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] font-jetbrains text-xs tracking-wider uppercase font-semibold">
                MISSION-CRITICAL CAPABILITY
              </div>
              <h2 className="font-space-grotesk text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                What TMIP does for mining fleets.
              </h2>
              <div className="space-y-4 text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
                <p>
                  Mining is the deployment class where every capability of TMIP matters simultaneously. Ruggedised
                  sensors survive the environment. Edge processing handles connectivity gaps. Predictive maintenance is
                  business-critical. Cost per kilometre is a boardroom metric.
                </p>
                <p>
                  By processing sub-second sensor signals directly at the vehicle edge, TMIP alerts operators to thermal
                  runaway risks instantly, protecting multi-crore haulers and preventing expensive production halts.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-[4px] bg-[#050A17] border border-slate-400/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                  <Pickaxe className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-space-grotesk font-bold text-base text-[#F1F5F9]">Mining Durability Metrics</div>
                  <div className="text-xs font-jetbrains text-[#94A3B8]">Open-Cast Heavy Fleet Baseline</div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 rounded-[3px] bg-white/[0.02] border border-slate-400/10">
                  <span className="text-sm text-[#94A3B8] font-ibm-plex">Haul Ramp Bottlenecks</span>
                  <span className="text-sm font-jetbrains font-bold text-[#10B981]">Zero Blowouts in 18 mo</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-[3px] bg-white/[0.02] border border-slate-400/10">
                  <span className="text-sm text-[#94A3B8] font-ibm-plex">Cost Per Ton Hauled</span>
                  <span className="text-sm font-jetbrains font-bold text-[#3B82F6]">-8.4% Operating Cost</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-[3px] bg-white/[0.02] border border-slate-400/10">
                  <span className="text-sm text-[#94A3B8] font-ibm-plex">Amortization Payback</span>
                  <span className="text-sm font-jetbrains font-bold text-[#F59E0B]">8.2 Months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Capabilities Section */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space-grotesk text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Relevant Capabilities
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Designed specifically for extreme payloads, abrasive gradients, and zero-connectivity mining pits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-3">
                  <div className="w-10 h-10 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-space-grotesk text-lg font-bold text-[#F1F5F9]">{cap.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mining Case Studies Section */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-jetbrains text-[#3B82F6] uppercase tracking-wider font-semibold">
                PROVEN RESULTS
              </div>
              <h2 className="font-space-grotesk text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Mining operators running TMIP.
              </h2>
            </div>
            <Link
              href="/tmip/customers/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:underline"
            >
              View all case studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="max-w-2xl">
            {/* Case Study Card */}
            <div className="p-8 rounded-[4px] bg-[#050A17] border border-slate-400/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#3B82F6] uppercase font-semibold">
                    OPEN-CAST MINING
                  </span>
                  <span className="text-xs font-jetbrains text-[#94A3B8]">Rigid Dump Trucks</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9]">
                  Preventing high-tonnage dumper downtime in central India mining corridors.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  Optimizing load-pressure distribution on rigid dump trucks operating in rugged, abrasive mining pits
                  with unforgiving production schedules.
                </p>
                <div className="flex items-center gap-6 pt-2 font-jetbrains text-sm">
                  <div>
                    <span className="text-[#10B981] font-bold">99.4%</span>
                    <span className="text-xs text-[#94A3B8] ml-1.5">Uptime SLA</span>
                  </div>
                  <div>
                    <span className="text-[#3B82F6] font-bold">₹2.1 Cr</span>
                    <span className="text-xs text-[#94A3B8] ml-1.5">Annual savings</span>
                  </div>
                </div>
              </div>
              <Link
                href="/tmip/customers/case-studies/open-cast-haulage-analytics"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:underline"
              >
                Read full case study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band Section */}
      <section className="relative z-10 py-20 px-6 sm:px-10 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto">
          <div className="p-10 sm:p-14 rounded-[4px] bg-gradient-to-br from-[#080E1E] to-[#0B1220] border border-blue-500/30 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Eliminate high-cost mining downtime.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-ibm-plex">
              Speak with our mining fleet engineers to evaluate edge telemetry hardware and live thermal stress models
              for your pit operations.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[3px] font-semibold text-base transition-all shadow-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
