import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  Activity, 
  History, 
  TrendingUp, 
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "What is a Vehicle Digital Twin?  ·  Treel",
  description: "A Vehicle Digital Twin is a live software model of a physical vehicle, updated in real time from onboard sensors. It turns each vehicle into a queryable object. Definition, architecture, and business value, explained by Treel.",
  alternates: {
    canonical: "https://treel.in/vehicle-digital-twin",
  },
  openGraph: {
    title: "What is a Vehicle Digital Twin?  ·  Treel",
    description: "A Vehicle Digital Twin is a live software model of a physical vehicle, updated in real time from onboard sensors. It turns each vehicle into a queryable object. Definition, architecture, and business value, explained by Treel.",
    url: "https://treel.in/vehicle-digital-twin",
  },
};

export default function VehicleDigitalTwinPage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B] mb-6 sm:mb-8">
              CATEGORY DEFINITION
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              What is a Vehicle Digital Twin?
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              A <strong className="text-white font-semibold">Vehicle Digital Twin is a live software model of a physical vehicle, continuously updated in real time from onboard sensors</strong>. Every subsystem — engine, tyres, fuel, driveline, brakes, electrical — is represented as queryable data. Fleet operators reason about the vehicle the way software engineers reason about their data warehouse: with structured queries, alerts, analytics, and predictive models.
            </p>
          </div>
        </div>
      </section>

      {/* Section · TL;DR (At A Glance Callout Box) */}
      <section className="py-12 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] border-l-2 border-l-[#D5573B] space-y-3">
            <div className="font-jetbrains font-mono text-xs uppercase tracking-widest text-[#D5573B] font-bold">
              AT A GLANCE
            </div>
            <p className="text-[#FAF7F2] text-base sm:text-lg leading-relaxed font-inter">
              A Vehicle Digital Twin is a live software model of a physical vehicle. It receives real-time data from onboard sensors, represents every subsystem as queryable data, and enables predictive analytics on component health, driver behaviour, and operating cost. TMIP is Treel&apos;s Vehicle Digital Twin platform, operating across 68,000 vehicles in India.
            </p>
          </div>
        </div>
      </section>

      {/* Section · What a Vehicle Digital Twin actually contains */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
                What a Vehicle Digital Twin actually contains.
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                A Vehicle Digital Twin holds three layers of information about the physical vehicle it represents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* State Layer */}
              <div className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                  The State Layer
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-inter">
                  Captures what is true about the vehicle right now: tyre pressures, temperatures, fuel level, load, engine parameters, brake wear, driver behaviour signals. This layer updates continuously as sensors report.
                </p>
              </div>

              {/* History Layer */}
              <div className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                  <History className="w-5 h-5" />
                </div>
                <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                  The History Layer
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-inter">
                  Captures how the state has changed over time. Every fluctuation is recorded, timestamped, and available for query. History enables trend analysis, seasonality detection, and anomaly identification.
                </p>
              </div>

              {/* Prediction Layer */}
              <div className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                  The Prediction Layer
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-inter">
                  Applies machine learning models to state and history to forecast future events: when a tyre will need replacement, when a component is likely to fail, when a driver is at risk of an incident. Predictions come with confidence intervals and are actionable, not theoretical.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · The three-step model */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              The three-step model.
            </h2>

            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/30 flex items-center justify-center font-jetbrains font-mono text-sm font-bold text-[#D5573B] shrink-0">
                  01
                </div>
                <div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">Step 1 · Sensors report</h3>
                  <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed font-inter">
                    Treel sensors placed on tyres and integrated with vehicle systems report telemetry sub-second. The data is edge-processed to reduce bandwidth and cost, then streamed to Treel&apos;s cloud infrastructure.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/30 flex items-center justify-center font-jetbrains font-mono text-sm font-bold text-[#D5573B] shrink-0">
                  02
                </div>
                <div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">Step 2 · The Twin updates</h3>
                  <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed font-inter">
                    Each vehicle has its own persistent Digital Twin. As telemetry arrives, the Twin&apos;s state layer updates, the history layer records, and the prediction layer re-runs its models.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/30 flex items-center justify-center font-jetbrains font-mono text-sm font-bold text-[#D5573B] shrink-0">
                  03
                </div>
                <div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">Step 3 · Operators query</h3>
                  <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed font-inter">
                    Fleet operators access the Digital Twin through the TMIP dashboard, API integrations, or scheduled reports. They ask questions (&ldquo;which vehicles are due for tyre replacement in the next 30 days?&rdquo;) and get answers with the vehicle&apos;s own data as the source.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Why it matters */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              What operators do differently.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              The Vehicle Digital Twin changes the operating model of a fleet business. Instead of reacting to failures, operators anticipate them. Instead of averaging costs across the fleet, they attribute cost to specific vehicles, routes, and drivers. Instead of standardising maintenance intervals, they tune them per vehicle. The savings compound: our customers see 5-7% tyre life extension, 5-6% fuel savings, and 30-40% reduction in unscheduled downtime over a 12-month deployment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] text-center">
                <div className="font-fraunces text-3xl sm:text-4xl font-medium text-[#D5573B]">5–7%</div>
                <div className="font-jetbrains font-mono text-xs uppercase tracking-wider text-[#94A3B8] mt-2">Tyre Life Extension</div>
              </div>
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] text-center">
                <div className="font-fraunces text-3xl sm:text-4xl font-medium text-[#D5573B]">5–6%</div>
                <div className="font-jetbrains font-mono text-xs uppercase tracking-wider text-[#94A3B8] mt-2">Direct Fuel Savings</div>
              </div>
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] text-center">
                <div className="font-fraunces text-3xl sm:text-4xl font-medium text-[#D5573B]">30–40%</div>
                <div className="font-jetbrains font-mono text-xs uppercase tracking-wider text-[#94A3B8] mt-2">Downtime Reduction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Where it lives */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              The Vehicle Digital Twin runs on TMIP.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              TMIP is Treel&apos;s enterprise Vehicle Digital Twin platform. Every enterprise customer&apos;s fleet is represented as a portfolio of Digital Twins. The dashboard, the API, the alerts, the predictive maintenance, the ROI calculator all draw from these Twins.
            </p>
            <div className="pt-2">
              <Link 
                href="/tmip/platform/vehicle-digital-twin" 
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-sm bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]"
              >
                See it in TMIP <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Read deeper */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl font-medium tracking-tight text-[#FAF7F2]">
              Related reading
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/research/roi-fleet-intelligence" className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Read the technical whitepaper</h3>
                <p className="text-xs text-[#94A3B8] mt-2">Deep dive into ROI analysis and telemetry architecture.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read paper <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link href="/mobility-intelligence" className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">What is mobility intelligence?</h3>
                <p className="text-xs text-[#94A3B8] mt-2">Moving from monitoring components to reasoning about vehicles.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link href="/tmip" className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Explore TMIP</h3>
                <p className="text-xs text-[#94A3B8] mt-2">Enterprise fleet platform features and integrations.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
