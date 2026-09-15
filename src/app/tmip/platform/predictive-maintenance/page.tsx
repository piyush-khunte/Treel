import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Gauge,
  AlertTriangle,
  BatteryCharging,
  Cpu,
  Zap,
  TrendingDown,
  Calendar,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Predictive Maintenance · TMIP",
  description:
    "TMIP's predictive maintenance models forecast component failure days or weeks in advance. Reduce unscheduled downtime by 30-40%. Extend maintenance intervals with confidence.",
  alternates: {
    canonical: "https://treel.in/tmip/platform/predictive-maintenance",
  },
  openGraph: {
    title: "Predictive Maintenance · TMIP",
    description:
      "TMIP's predictive maintenance models forecast component failure days or weeks in advance. Reduce unscheduled downtime by 30-40%. Extend maintenance intervals with confidence.",
    url: "https://treel.in/tmip/platform/predictive-maintenance",
  },
};

const predictions = [
  {
    title: "Tyre replacement windows",
    horizon: "15–45 days in advance",
    confidence: "±3–5 day confidence intervals",
    desc: "Predicts remaining tread life and casing fatigue based on route thermal profiles, axle load variance, and real-time pressure histories.",
    icon: Gauge,
  },
  {
    title: "Brake component wear",
    horizon: "20–60 days in advance",
    confidence: "Dynamic threshold estimation",
    desc: "Forecasts brake pad replacement windows using cumulative deceleration events, friction temperature accumulation, and duty cycles.",
    icon: AlertTriangle,
  },
  {
    title: "Battery degradation",
    horizon: "30–90 days in advance",
    confidence: "Cranking voltage trend analysis",
    desc: "Identifies early internal resistance increases and charging anomalies before starting failures occur on remote transit corridors.",
    icon: BatteryCharging,
  },
  {
    title: "Engine service events",
    horizon: "Tuned per vehicle duty cycle",
    confidence: "Dynamic fluid degradation model",
    desc: "Computes optimal oil, coolant, and filter service windows based on engine hours, load factors, and operating temperature profiles.",
    icon: Cpu,
  },
  {
    title: "Sensor & electrical faults",
    horizon: "Early drift detection",
    confidence: "Cross-sensor anomaly scoring",
    desc: "Longitudinal anomaly detection catches degrading sensors and intermittent wiring faults before erroneous readings propagate.",
    icon: Zap,
  },
];

const operatingImpacts = [
  {
    stat: "30–40%",
    title: "Reduction in unscheduled downtime",
    desc: "Eliminates catastrophic roadside blowouts and emergency mechanical failures by catching degradation early.",
    icon: TrendingDown,
  },
  {
    stat: "Safe Extension",
    title: "Extended maintenance intervals",
    desc: "Avoid premature parts replacement on components running below fleet average wear rates, capturing maximum component value.",
    icon: Calendar,
  },
  {
    stat: "Multi-Tasking",
    title: "Consolidated service visits",
    desc: "Clustering multiple predicted maintenance events into single scheduled depot workshop visits, maximizing vehicle availability.",
    icon: Layers,
  },
  {
    stat: "Net Savings",
    title: "Reduced total maintenance spend",
    desc: "Achieves lower total lifecycle cost per kilometre while elevating fleet health benchmarks and customer SLA compliance.",
    icon: ShieldCheck,
  },
];

export default function TmipPlatformPredictiveMaintenancePage() {
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
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-4xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-4">
              <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
                TMIP
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href="/tmip/platform" className="hover:text-[#F1F5F9] transition-colors">
                Platform
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">Predictive Maintenance</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-jetbrains text-xs tracking-wider uppercase font-semibold">
              PLATFORM · PREDICTIVE MAINTENANCE
            </div>

            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              Fix it before it breaks.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              TMIP's predictive maintenance layer runs machine learning models continuously against every Vehicle Digital Twin. Component wear is scored. Failure windows are forecast. Maintenance is scheduled during planned downtime, not at 3 AM.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/platform/vehicle-digital-twin"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all border border-slate-400/20 text-[#F1F5F9] hover:bg-white/5 hover:border-slate-400/40"
              >
                View Vehicle Digital Twin <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR Section for AEO */}
      <section className="relative z-10 py-16 px-6 sm:px-10 border-b border-slate-400/10 bg-[#0B1220]/60">
        <div className="max-w-[1320px] mx-auto">
          <div className="p-8 rounded-[4px] bg-[#080E1E] border border-blue-500/20 max-w-4xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold">
                AT A GLANCE
              </span>
            </div>
            <p className="text-[#F1F5F9] text-base sm:text-lg leading-relaxed font-ibm-plex">
              TMIP's predictive maintenance models flag component failures 5–30 days in advance based on longitudinal Vehicle Digital Twin data. Fleet operators reduce unscheduled downtime by 30–40% and extend maintenance intervals safely.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: How the models work */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
                ALGORITHMIC ARCHITECTURE
              </div>
              <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                How prediction actually happens.
              </h2>
            </div>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Every Vehicle Digital Twin carries years of state history. Component wear follows patterns — patterns that vary by vehicle class, load, route, climate, and driver. TMIP's machine learning models study those patterns across sixty-eight thousand vehicles and apply the learning back to each individual Twin.
            </p>

            <div className="p-6 sm:p-8 rounded-[4px] bg-[#080E1E] border border-blue-500/20 space-y-4">
              <div className="flex items-center gap-2 text-xs font-jetbrains font-semibold uppercase tracking-wider text-[#3B82F6]">
                <Sparkles className="w-4 h-4" />
                Thresholds vs Predictions
              </div>
              <p className="text-[#F1F5F9] text-base sm:text-lg leading-relaxed font-ibm-plex">
                Predictions are not thresholds. A tyre reaching 4mm tread depth is a threshold. A tyre with a specific wear signature, on a specific route, at a specific load, at a specific ambient temperature, expected to reach service threshold in 14 days ± 3 days at 85% confidence — that is a prediction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Example predictions */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              PREDICTIVE CAPABILITIES
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              What TMIP predicts.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-3 font-ibm-plex">
              The models forecast several categories of vehicle events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((pred) => {
              const Icon = pred.icon;
              return (
                <div
                  key={pred.title}
                  className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-[4px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-jetbrains font-semibold px-2.5 py-1 rounded-[2px] border border-blue-500/30 text-[#3B82F6] bg-blue-500/10">
                        {pred.horizon}
                      </span>
                    </div>

                    <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9]">
                      {pred.title}
                    </h3>

                    <p className="text-[#94A3B8] text-sm leading-relaxed font-ibm-plex">
                      {pred.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-400/10 flex items-center gap-2 text-xs font-jetbrains text-[#CBD5E1]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                    <span>{pred.confidence}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: What operators see change */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              MEASURABLE ROI
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              The operating impact.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-3 font-ibm-plex">
              Fleet operators running TMIP for 12 months see:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {operatingImpacts.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-8 rounded-[4px] bg-[#080E1E] border border-slate-400/10 hover:border-blue-500/30 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-[4px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-jetbrains text-xs font-semibold px-2.5 py-1 rounded-[2px] bg-blue-500/10 text-[#3B82F6] border border-blue-500/20">
                      {item.stat}
                    </span>
                  </div>

                  <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9]">
                    {item.title}
                  </h3>

                  <p className="text-[#94A3B8] text-sm leading-relaxed font-ibm-plex">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Model validation */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-4xl space-y-6">
            <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              TRANSPARENT VALIDATION
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              How we validate the models.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              TMIP tracks every prediction against actual outcomes. Model accuracy is measured per prediction category and published to customers in their operations reports. Underperforming models are retrained on customer-specific data. This is not a black box.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative z-10 py-20 px-6 sm:px-10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto">
          <div className="p-10 sm:p-16 rounded-[4px] bg-gradient-to-br from-[#0B1220] to-[#050A17] border border-blue-500/30 relative overflow-hidden text-center max-w-4xl mx-auto">
            <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Eliminate unscheduled breakdowns.
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
                Experience how machine learning models running against vehicle digital twins convert emergency stops into planned depot maintenance.
              </p>
              <div className="pt-4 flex justify-center">
                <Link
                  href="/tmip/demo"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                >
                  Book a demo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
