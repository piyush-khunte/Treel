import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Activity,
  Gauge,
  ShieldCheck,
  Cpu,
  Radio,
  BarChart3,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Logistics Fleet Intelligence · TMIP",
  description:
    "TMIP for logistics fleets: long-haul and last-mile operators managing dispatch, delivery windows, tyre life, and cost per kilometre at scale.",
  alternates: {
    canonical: "https://treel.in/tmip/solutions/logistics",
  },
  openGraph: {
    title: "Logistics Fleet Intelligence · TMIP",
    description:
      "TMIP for logistics fleets: long-haul and last-mile operators managing dispatch, delivery windows, tyre life, and cost per kilometre at scale.",
    url: "https://treel.in/tmip/solutions/logistics",
  },
};

const challenges = [
  {
    title: "Cost per kilometre pressure",
    desc: "The primary efficiency metric measured by enterprise CFOs, heavily degraded by unchecked fuel burn and premature tyre scrapping.",
  },
  {
    title: "Accelerated tyre wear cycles",
    desc: "Long-haul linehaul commercial tyres experience high thermal fatigue and uneven wear patterns, demanding early replacements.",
  },
  {
    title: "Compounding fuel inefficiencies",
    desc: "Driver habits, route elevation variations, and rolling resistance from 10-15 PSI under-inflation silently drain operational margins.",
  },
  {
    title: "Delivery window vulnerabilities",
    desc: "Unscheduled en-route punctures and thermal blowouts directly jeopardize shipper SLA delivery commitments and customer retention.",
  },
  {
    title: "Multi-region visibility gaps",
    desc: "Centralized operations teams in Delhi or Mumbai struggle to detect and remediate remote breakdowns occurring thousands of kilometres away in real time.",
  },
];

const capabilities = [
  {
    title: "Cost Per Kilometre Attribution",
    desc: "Granular cost attribution broken down by individual vehicle asset, scheduled route corridor, driver shift, and operating region.",
    icon: BarChart3,
  },
  {
    title: "Tyre Wear Prediction Models",
    desc: "Physics-informed algorithms calibrated specifically for heavy linehaul load distributions and highway thermal curves.",
    icon: Gauge,
  },
  {
    title: "Driver Behaviour Scoring",
    desc: "Telemetry-backed driver scoring focused on fuel-wasting habits, harsh braking, sustained speeding, and excessive idling.",
    icon: Activity,
  },
  {
    title: "Turnkey TMS Integrations",
    desc: "Native bi-directional API connectors for Fleetx, Locus, LogiNext, SAP Logistics, and proprietary enterprise dispatch stacks.",
    icon: Cpu,
  },
  {
    title: "Multi-Region Ops Dashboards",
    desc: "Unified mission control interface enabling regional depot managers and central dispatchers to view live fleet health simultaneously.",
    icon: Radio,
  },
  {
    title: "Predictive Maintenance Protection",
    desc: "Early warning alerts for slow pressure drops and abnormal wheel-end heating, converting emergency roadside stops into depot servicing.",
    icon: ShieldCheck,
  },
];

export default function TmipSolutionsLogisticsPage() {
  return (
    <div className="bg-[#050A17] text-[#F1F5F9] font-ibm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] mb-4">
              <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
                TMIP
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href="/tmip/solutions" className="hover:text-[#F1F5F9] transition-colors">
                Solutions
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">Logistics</span>
            </nav>

            <div className="inline-flex items-center gap-2 border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-full text-xs font-mono text-[#3B82F6] uppercase tracking-widest font-semibold">
              SOLUTIONS · LOGISTICS
            </div>

            <h1 className="font-space text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              The fleet intelligence layer for logistics operators.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl">
              Long-haul and last-mile logistics operators run TMIP to manage cost per kilometre, extend tyre life across
              long-distance routes, and reduce the unscheduled downtime that kills delivery windows.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/platform"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all border border-white/15 text-[#F1F5F9] hover:bg-white/5"
              >
                Explore Platform Architecture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Impact Summary */}
      <section className="py-12 border-b border-white/10 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0B1220] border border-white/10">
              <div className="font-space text-3xl sm:text-4xl font-bold text-[#10B981]">5–6%</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1">Average Fuel Savings</div>
              <div className="text-xs text-[#94A3B8] mt-1">Achieved via optimized rolling resistance and driver coaching</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0B1220] border border-white/10">
              <div className="font-space text-3xl sm:text-4xl font-bold text-[#3B82F6]">5–7%</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1">Tyre Life Extension</div>
              <div className="text-xs text-[#94A3B8] mt-1">Measured across high-mileage national long-haul corridors</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0B1220] border border-white/10">
              <div className="font-space text-3xl sm:text-4xl font-bold text-[#F59E0B]">30–40%</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1">Downtime Reduction</div>
              <div className="text-xs text-[#94A3B8] mt-1">Early detection of slow leaks and thermal pressure spikes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              What logistics operators lose sleep over.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Operating a commercial logistics network across Indian highways exposes transport fleets to continuous cost
              volatility and execution risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#080E1E] border border-white/10 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-xs font-mono font-bold text-[#3B82F6]">
                  0{idx + 1}
                </div>
                <h3 className="font-space text-lg font-bold text-[#F1F5F9]">{item.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TMIP's Fit Section */}
      <section className="py-20 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1 rounded-full text-xs font-mono text-[#10B981] uppercase tracking-widest font-semibold">
                PLATFORM FIT
              </div>
              <h2 className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                What TMIP does for logistics fleets.
              </h2>
              <div className="space-y-4 text-[#94A3B8] text-base sm:text-lg leading-relaxed">
                <p>
                  TMIP is built around the metrics logistics fleets already track. Cost per kilometre is the default
                  lens. Tyre-life models are tuned for long-haul wear patterns. Driver behaviour scoring focuses on
                  fuel-consuming habits. Route data integrates directly with your existing Transport Management System
                  (TMS).
                </p>
                <p>
                  Logistics customers typically see 5–6% fuel savings, 5–7% tyre-life extension, and 30–40% reduction in
                  unscheduled downtime within 12 months of deployment.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-2xl bg-[#050A17] border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-space font-bold text-base text-[#F1F5F9]">Deployment Benchmark</div>
                  <div className="text-xs font-mono text-[#94A3B8]">12-Month Median Fleet Impact</div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-sm text-[#94A3B8]">Fleet Fuel Economy</span>
                  <span className="text-sm font-mono font-bold text-[#10B981]">+5.2% Avg Gain</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-sm text-[#94A3B8]">Casing Retread Life</span>
                  <span className="text-sm font-mono font-bold text-[#3B82F6]">+14,000 km</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-sm text-[#94A3B8]">Roadside Tyre Blowouts</span>
                  <span className="text-sm font-mono font-bold text-[#F59E0B]">-84% Incidents</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Capabilities Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Relevant Capabilities
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Engineered specifically for the operational rhythms, payload demands, and integration requirements of
              commercial transport enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-space text-lg font-bold text-[#F1F5F9]">{cap.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Logistics Case Studies Section */}
      <section className="py-20 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-mono text-[#3B82F6] uppercase tracking-wider font-semibold">
                PROVEN RESULTS
              </div>
              <h2 className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Logistics operators running TMIP.
              </h2>
            </div>
            <Link
              href="/tmip/customers/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:underline"
            >
              View all case studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <div className="p-8 rounded-2xl bg-[#050A17] border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-full text-xs font-mono text-[#3B82F6] uppercase font-semibold">
                    LONG-HAUL LINEHAUL
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">1,000 Trucks</span>
                </div>
                <h3 className="font-space text-xl font-bold text-[#F1F5F9]">
                  1,000 trucks. 12 months. What changed.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  The full operational story of a large logistics fleet running TMIP for one year. Deployment timeline,
                  operating changes, measured outcomes, and what the operator does differently now.
                </p>
                <div className="flex items-center gap-6 pt-2 font-mono text-sm">
                  <div>
                    <span className="text-[#10B981] font-bold">5.2%</span>
                    <span className="text-xs text-[#94A3B8] ml-1.5">Fuel savings</span>
                  </div>
                  <div>
                    <span className="text-[#3B82F6] font-bold">6.8%</span>
                    <span className="text-xs text-[#94A3B8] ml-1.5">Tyre life</span>
                  </div>
                </div>
              </div>
              <Link
                href="/tmip/customers/case-studies/1000-truck-case-study"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:underline"
              >
                Read full case study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Case Study 2 */}
            <div className="p-8 rounded-2xl bg-[#050A17] border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-full text-xs font-mono text-[#3B82F6] uppercase font-semibold">
                    COLD CHAIN
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">320 Reefers</span>
                </div>
                <h3 className="font-space text-xl font-bold text-[#F1F5F9]">
                  Protecting perishable pharmaceutical corridors with synchronized sensor telemetry.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  How a national refrigerated freight carrier correlates tyre rolling resistance with generator fuel
                  draw, stabilizing transit unit costs across western corridors.
                </p>
                <div className="flex items-center gap-6 pt-2 font-mono text-sm">
                  <div>
                    <span className="text-[#10B981] font-bold">₹1.4 Cr</span>
                    <span className="text-xs text-[#94A3B8] ml-1.5">Cost reduction</span>
                  </div>
                  <div>
                    <span className="text-[#3B82F6] font-bold">38%</span>
                    <span className="text-xs text-[#94A3B8] ml-1.5">Downtime drop</span>
                  </div>
                </div>
              </div>
              <Link
                href="/tmip/customers/case-studies/cold-chain-express-transit"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:underline"
              >
                Read full case study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band Section */}
      <section className="py-20 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#080E1E] to-[#0B1220] border border-white/10 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              See TMIP on a logistics fleet like yours.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Book a technical walkthrough to evaluate cost-per-kilometre attribution, TMS connectors, and live telemetry
              on your routes.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
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
