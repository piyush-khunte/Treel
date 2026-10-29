import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  HardHat,
  Radio,
  Gauge,
  Calendar,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Construction Fleet Intelligence · TMIP",
  description:
    "TMIP for construction fleets: ready-mix concrete, tippers, construction equipment. Built for demanding terrain, dust, and unforgiving maintenance windows.",
  alternates: {
    canonical: "https://treel.in/tmip/solutions/construction",
  },
  openGraph: {
    title: "Construction Fleet Intelligence · TMIP",
    description:
      "TMIP for construction fleets: ready-mix concrete, tippers, construction equipment. Built for demanding terrain, dust, and unforgiving maintenance windows.",
    url: "https://treel.in/tmip/solutions/construction",
  },
};

const challenges = [
  {
    title: "Extreme operating environments",
    desc: "Abrasive dust, extreme ambient heat, heavy mechanical vibration, and continuous heavy-duty shift load cycles stress vehicle components beyond standard highway tolerances.",
  },
  {
    title: "Off-highway telematics blind spots",
    desc: "Remote greenfield project sites and deep quarries lack continuous cellular connectivity, causing cloud-dependent legacy GPS trackers to drop vital alerts.",
  },
  {
    title: "Accelerated unpaved tyre wear",
    desc: "Tyres operating over jagged aggregate and unpaved haul roads wear at 2–3x normal highway rates, causing frequent sidewall cuts and carcass damage.",
  },
  {
    title: "Compressed, unforgiving maintenance windows",
    desc: "Concrete pour schedules and asphalt paving trains run on tight hourly cycles where vehicle breakdowns risk spoiling entire batches of ready-mix material.",
  },
  {
    title: "Equipment utilization directly impacts margins",
    desc: "Idle tippers and delayed transit mixers directly inflate project contracting costs and reduce contractor bid profitability.",
  },
];

const capabilities = [
  {
    title: "Ruggedised Sensor Hardware",
    desc: "ARAI-certified wheel-end sensors engineered to withstand heavy dust immersion, high temperatures, and intense mechanical vibration.",
    icon: ShieldCheck,
  },
  {
    title: "Off-Highway Telemetry & Offline Resilience",
    desc: "On-vehicle edge storage captures and logs all telemetric parameters during connectivity dropouts, auto-syncing upon signal recovery.",
    icon: Radio,
  },
  {
    title: "Load-Adjusted Wear Models",
    desc: "Proprietary stress algorithms that account for unpaved surface resistance and maximum axle load ratings to predict true carcass fatigue.",
    icon: Layers,
  },
  {
    title: "Site-Level Utilization Dashboards",
    desc: "Custom operational consoles designed for project managers, batching plant controllers, and equipment maintenance engineers.",
    icon: Gauge,
  },
  {
    title: "Maintenance Window Optimization",
    desc: "Predictive scheduling that aligns preventive wheel-end servicing with planned batching plant downtime, preventing mid-pour failures.",
    icon: Calendar,
  },
];

export default function TmipSolutionsConstructionPage() {
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
      <section className="relative z-10 pt-12 sm:pt-16 pb-8 sm:pb-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-2">
              <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
                TMIP
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href="/tmip/solutions" className="hover:text-[#F1F5F9] transition-colors">
                Solutions
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">Construction</span>
            </nav>

            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
              SOLUTIONS · CONSTRUCTION
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Fleet intelligence for the dust, the load, and the terrain.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl font-ibm-plex">
              TMIP for construction fleets. Ready-mix concrete, tippers, and heavy construction equipment operating in
              the conditions that break most fleet software.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
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
                Explore Hardware & Edge Stack
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Band */}
      <section className="relative z-10 py-8 sm:py-10 border-b border-slate-400/10 bg-[#050A17]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10">
              <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#10B981]">14% Lower</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1 font-ibm-plex">Tyre Scrap Rate</div>
              <div className="text-xs text-[#94A3B8] mt-1 font-ibm-plex">Preserving casing retreadability under harsh aggregate haulage</div>
            </div>
            <div className="p-5 sm:p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10">
              <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#3B82F6]">31% Drop</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1 font-ibm-plex">Unscheduled Site Downtime</div>
              <div className="text-xs text-[#94A3B8] mt-1 font-ibm-plex">Preventing mid-pour mixer breakdowns and paving stoppages</div>
            </div>
            <div className="p-5 sm:p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10">
              <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#F59E0B]">IP67 / ARAI</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1 font-ibm-plex">Certified Ruggedised IoT</div>
              <div className="text-xs text-[#94A3B8] mt-1 font-ibm-plex">Tested against dust immersion, washdown sprays, and shock</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-6 sm:space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-space-grotesk text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Construction Operating Challenges
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Demanding terrain, extreme dust, heavy axle overloads, and unforgiving batch timelines degrade standard
              vehicle sensors rapidly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {challenges.map((item, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-2.5">
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
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
                RUGGEDISED FIT
              </div>
              <h2 className="font-space-grotesk text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                What TMIP does for construction fleets.
              </h2>
              <div className="space-y-3 text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
                <p>
                  TMIP&apos;s sensor hardware is ARAI certified and benchmarked against international standards,
                  engineered specifically for construction operating conditions. Edge processing continues even when
                  connectivity drops on remote job sites or deep excavations.
                </p>
                <p>
                  Alert thresholds are tuned for off-highway wear patterns, differentiating normal heavy-load temperature
                  rises from dangerous casing separations and slow puncture deflations.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-7 rounded-[4px] bg-[#050A17] border border-slate-400/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-space-grotesk font-bold text-base text-[#F1F5F9]">Site Durability Metrics</div>
                  <div className="text-xs font-jetbrains text-[#94A3B8]">Construction Field Benchmark</div>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between p-3 rounded-[3px] bg-white/[0.02] border border-slate-400/10">
                  <span className="text-sm text-[#94A3B8] font-ibm-plex">Sensor Ingress Rating</span>
                  <span className="text-sm font-jetbrains font-bold text-[#10B981]">IP67 Dust & Jet Wash</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-[3px] bg-white/[0.02] border border-slate-400/10">
                  <span className="text-sm text-[#94A3B8] font-ibm-plex">Offline Edge Buffer</span>
                  <span className="text-sm font-jetbrains font-bold text-[#3B82F6]">Up to 72 hrs on-chip</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-[3px] bg-white/[0.02] border border-slate-400/10">
                  <span className="text-sm text-[#94A3B8] font-ibm-plex">Typical Payback Window</span>
                  <span className="text-sm font-jetbrains font-bold text-[#F59E0B]">7.4 Months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Capabilities Section */}
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-6 sm:space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-space-grotesk text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Relevant Capabilities
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
              Engineered to survive heavy vibrations, stone impacts, and dust-choked construction environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="p-5 sm:p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-2.5">
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

      {/* CTA Band Section */}
      <section className="relative z-10 py-10 sm:py-14 bg-[#050A17]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-6 sm:p-10 rounded-[4px] bg-gradient-to-br from-[#080E1E] to-[#0B1220] border border-blue-500/30 text-center space-y-4 max-w-4xl mx-auto">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Engineered for demanding job sites.
            </h2>
            <p className="text-[#94A3B8] text-base max-w-2xl mx-auto leading-relaxed font-ibm-plex">
              Consult with our industrial deployment team to evaluate ARAI-certified sensor fitment and offline edge
              gateways for your construction machinery.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[3px] font-semibold text-base transition-all shadow-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
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
