import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Activity,
  Clock,
  Sparkles,
  Database,
  BarChart3,
  Gauge,
  ShieldCheck,
  FileText,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vehicle Digital Twin · TMIP",
  description:
    "The Vehicle Digital Twin is the architectural core of TMIP. A live software model of every truck in your fleet, continuously updated, deeply queryable. See how it works.",
  alternates: {
    canonical: "https://treel.in/tmip/platform/vehicle-digital-twin",
  },
  openGraph: {
    title: "Vehicle Digital Twin · TMIP",
    description:
      "The Vehicle Digital Twin is the architectural core of TMIP. A live software model of every truck in your fleet, continuously updated, deeply queryable. See how it works.",
    url: "https://treel.in/tmip/platform/vehicle-digital-twin",
  },
};

const layers = [
  {
    title: "State layer",
    badge: "Real-Time Telemetry",
    desc: "Real-time snapshot of every subsystem. Tyre pressures, temperatures, loads. Fuel level, engine parameters, brake wear. Driver behaviour indicators. Location and route context. State updates sub-second as sensors report.",
    icon: Activity,
    accent: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    metrics: ["Sub-second frequency", "6 subsystems", "0–200 PSI range"],
  },
  {
    title: "History layer",
    badge: "Immutable Time-Series",
    desc: "Append-only record of every state change. Timestamped. Immutable. Available for query at any resolution: last hour, last month, last year, the full deployment lifetime. This layer enables anomaly detection, seasonality analysis, and longitudinal ROI attribution.",
    icon: Clock,
    accent: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    metrics: ["Full lifecycle retention", "Time-series index", "Zero data decay"],
  },
  {
    title: "Prediction layer",
    badge: "Machine Learning",
    desc: "Machine learning models continuously score the Twin. Time-to-failure for critical components. Optimal maintenance windows. Driver risk indices. Route efficiency scores. Predictions carry confidence intervals and are actionable, not theoretical.",
    icon: Sparkles,
    accent: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    metrics: ["15–45 day failure horizons", "85%+ confidence intervals", "Dynamic RUL scoring"],
  },
];

const useCases = [
  {
    title: "Ask real questions.",
    query: '"Which vehicles in the Bangalore-to-Chennai route have tyre wear >70% and are due for replacement in the next 30 days?"',
    desc: "TMIP returns a structured list with estimated replacement costs, inventory availability, and optimal depot scheduling windows.",
    icon: Database,
  },
  {
    title: "Attribute cost.",
    query: "True cost per kilometre per vehicle, per route, per driver.",
    desc: "Aggregated by region, class, or contract. Operational cost is attributable to specific maintenance and driving decisions, not averaged across the fleet.",
    icon: BarChart3,
  },
  {
    title: "Predict downtime.",
    query: "Component wear models flag failure windows 5–30 days in advance.",
    desc: "Fleet operators schedule maintenance during planned depot stops instead of reacting to emergency breakdowns at 3 AM.",
    icon: ShieldCheck,
  },
  {
    title: "Compare and optimise.",
    query: "Benchmark vehicles against fleet peers and operating baselines.",
    desc: "Identify outliers in fuel burn and tyre wear. Adjust operational parameters based on empirical data proving what works on specific corridors.",
    icon: Gauge,
  },
];

const roiMetrics = [
  {
    value: "5–7%",
    label: "Tyre-life extension",
    detail: "Fleet median achieved through proactive pressure and thermal management",
  },
  {
    value: "5–6%",
    label: "Fuel savings",
    detail: "Reduced rolling resistance and real-time correction of harsh driving patterns",
  },
  {
    value: "30–40%",
    label: "Downtime reduction",
    detail: "Unscheduled roadside tyre and mechanical breakdowns eliminated",
  },
  {
    value: "9-month",
    label: "Median payback",
    detail: "Full deployment capital payback across commercial vehicle classes",
  },
];

const relatedFeatures = [
  {
    title: "Real-time telemetry",
    desc: "Sub-second IoT telemetry across six vehicle subsystems. Pressure, temperature, load, fuel, and driveline.",
    href: "/tmip/platform/telemetry",
    tag: "Platform Core",
  },
  {
    title: "Predictive maintenance",
    desc: "Forecast component failures days and weeks in advance. Move from emergency repairs to planned depot care.",
    href: "/tmip/platform/predictive-maintenance",
    tag: "AI Models",
  },
  {
    title: "What is a Vehicle Digital Twin",
    desc: "Explore the technical fundamentals, mathematical state models, and architecture behind digital twin engineering.",
    href: "/vehicle-digital-twin",
    tag: "Category Guide",
  },
];

export default function TmipPlatformVehicleDigitalTwinPage() {
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
              <Link href="/tmip/platform" className="hover:text-[#F1F5F9] transition-colors">
                Platform
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">Vehicle Digital Twin</span>
            </nav>

            <div className="border text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">
              PLATFORM · VEHICLE DIGITAL TWIN
            </div>

            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              Every truck, as a queryable object.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm max-w-3xl">
              The Vehicle Digital Twin is TMIP's architectural core. It turns each vehicle in your fleet into a live software model — one that responds to state changes in real time and answers business questions in structured queries.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/whitepapers/vehicle-digital-twin"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all border border-white/20 text-[#F1F5F9] hover:bg-white/5 hover:border-white/40"
              >
                Read technical whitepaper <FileText className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR Section for AEO */}
      <section className="py-16 border-b border-white/10 bg-[#0B1220]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-8 rounded-2xl bg-[#080E1E] border border-blue-500/20 max-w-4xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold">
                AT A GLANCE
              </span>
            </div>
            <p className="text-[#F1F5F9] text-base sm:text-lg leading-relaxed font-ibm">
              TMIP's Vehicle Digital Twin is a live software representation of a physical truck. State updates continuously from onboard sensors. History is immutable. Predictive models run against the Twin to forecast maintenance, cost, and risk. Fleet operators query the Twin like a database.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: How TMIP builds a Twin */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              DIGITAL TWIN ANATOMY
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              What lives inside a Vehicle Digital Twin.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-3">
              Every TMIP-managed vehicle has three layers of data structured as a persistent Digital Twin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {layers.map((layer) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.title}
                  className="p-8 rounded-2xl bg-[#080E1E] border border-white/10 hover:border-blue-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${layer.accent}`}
                      >
                        {layer.badge}
                      </span>
                    </div>

                    <h3 className="font-space text-2xl font-bold text-[#F1F5F9]">
                      {layer.title}
                    </h3>

                    <p className="text-[#94A3B8] text-sm leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 space-y-2">
                    {layer.metrics.map((metric) => (
                      <div key={metric} className="flex items-center gap-2 text-xs font-mono text-[#CBD5E1]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: How operators use it */}
      <section className="py-20 border-b border-white/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              OPERATIONAL USE CASES
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              What Vehicle Digital Twins let you do.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-3">
              Transforming complex multi-sensor telemetry into structured queries and proactive maintenance decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  className="p-8 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-blue-500/30 transition-all space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-space text-xl font-bold text-[#F1F5F9]">
                      {uc.title}
                    </h3>
                  </div>

                  <div className="p-4 rounded-xl bg-[#050A17] border border-blue-500/20 font-mono text-xs text-[#3B82F6] leading-relaxed">
                    {uc.query}
                  </div>

                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: ROI examples */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              PROVEN RESULTS
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              What the numbers look like.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-3">
              Median outcomes across TMIP deployments after 12 months:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roiMetrics.map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-2xl bg-[#080E1E] border border-white/10 hover:border-blue-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-space text-3xl sm:text-4xl font-bold text-[#3B82F6] mb-2 font-mono">
                    {item.value}
                  </div>
                  <div className="font-space text-base font-bold text-[#F1F5F9] mb-2">
                    {item.label}
                  </div>
                  <p className="text-[#94A3B8] text-xs leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Related Features */}
      <section className="py-20 border-b border-white/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              ECOSYSTEM
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Related platform capabilities.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedFeatures.map((feat) => (
              <Link
                key={feat.title}
                href={feat.href}
                className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-blue-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#3B82F6] font-semibold uppercase tracking-wider">
                    {feat.tag}
                  </span>
                  <h3 className="font-space text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors mt-2 mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                    {feat.desc}
                  </p>
                </div>
                <div className="font-semibold text-xs text-[#3B82F6] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-[#0B1220] to-[#050A17] border border-blue-500/30 relative overflow-hidden text-center max-w-4xl mx-auto">
            <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                See a Vehicle Digital Twin on your fleet.
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed">
                Connect real-time wheel-end sensors, CAN-bus signals, and machine learning models to simulate and protect every vehicle asset.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  href="/tmip/demo"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                >
                  Book a demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tmip/whitepapers/vehicle-digital-twin"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition-all border border-white/20 text-[#F1F5F9] hover:bg-white/5 hover:border-white/40"
                >
                  Read the technical whitepaper
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
