import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Activity,
  Gauge,
  Zap,
  Clock,
  ShieldAlert,
  AlertTriangle,
  UserCheck,
  Fuel,
  Sliders,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Real-Time Telemetry · TMIP",
  description:
    "TMIP captures sub-second telemetry across every vehicle in your fleet. Pressure, temperature, load, fuel, driver behaviour. One live dashboard, six subsystems.",
  alternates: {
    canonical: "https://treel.in/tmip/platform/telemetry",
  },
  openGraph: {
    title: "Real-Time Telemetry · TMIP",
    description:
      "TMIP captures sub-second telemetry across every vehicle in your fleet. Pressure, temperature, load, fuel, driver behaviour. One live dashboard, six subsystems.",
    url: "https://treel.in/tmip/platform/telemetry",
  },
};

const subsystems = [
  {
    title: "Tyres",
    desc: "Pressure, temperature, tread state, and sidewall integrity measured directly from internal wheel-end sensors.",
    metrics: ["0–200 PSI range", "-40°C to +125°C", "Vibration spectra"],
    icon: Gauge,
  },
  {
    title: "Fuel",
    desc: "Real-time consumption rate, calibrated fuel tank levels, refill detection, and unexpected drain alerts.",
    metrics: ["L/100km attribution", "Fuel drop alerts", "Refuel validation"],
    icon: Fuel,
  },
  {
    title: "Engine",
    desc: "Live RPM, engine coolant temperature, oil pressure dynamics, and ignition duty cycles.",
    metrics: ["CAN-bus J1939", "Coolant threshold alerts", "Duty cycle logging"],
    icon: Activity,
  },
  {
    title: "Driveline",
    desc: "Gear engagement states, clutch slip behaviour, transmission temperature, and axle load distribution.",
    metrics: ["Torque demand", "Clutch fatigue", "Transmission health"],
    icon: Sliders,
  },
  {
    title: "Brakes",
    desc: "Friction pad wear indicators, brake application frequency, ABS activation telemetry, and brake drag detection.",
    metrics: ["Pad thickness score", "Thermal build-up", "ABS trigger rate"],
    icon: AlertTriangle,
  },
  {
    title: "Driver",
    desc: "Acceleration patterns, harsh braking events, cornering G-forces, sustained speeding, and idle time analysis.",
    metrics: ["Driver risk scoring", "Harsh braking index", "Idling fuel waste"],
    icon: UserCheck,
  },
];

const alerts = [
  {
    type: "Tyre pressure low",
    badge: "Immediate Action",
    badgeColor: "border-red-500/30 text-red-400 bg-red-500/10",
    vehicle: "MH-12-AB-3456",
    reading: "Front-left tyre at 28 PSI (threshold: 32 PSI)",
    recommended: "Pull for inspection within 2 hours",
    assigned: "Regional Ops · Bangalore",
    icon: ShieldAlert,
  },
  {
    type: "Predictive maintenance",
    badge: "Planned Maintenance",
    badgeColor: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    vehicle: "Fleet KA-53 vehicles",
    reading: "Brake pad wear projected to reach service threshold in 8–12 days",
    recommended: "Schedule brake service within scheduled maintenance window",
    assigned: "Fleet Manager",
    icon: Activity,
  },
  {
    type: "Driver behaviour",
    badge: "Coaching Review",
    badgeColor: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    vehicle: "Driver ID 4517",
    reading: "Harsh braking events increased 40% this week",
    recommended: "Schedule 1-on-1 driver coaching session",
    assigned: "Driver Ops",
    icon: UserCheck,
  },
];

export default function TmipPlatformTelemetryPage() {
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
              <Link href="/tmip/platform" className="hover:text-[#F1F5F9] transition-colors">
                Platform
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">Telemetry</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-jetbrains text-xs tracking-wider uppercase font-semibold">
              PLATFORM · TELEMETRY
            </div>

            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              Sub-second telemetry. Every vehicle. Every subsystem.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              Fleet telemetry that updates faster than your operations team can refresh a dashboard. What TMIP monitors, and why it matters.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/platform/integrations"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all border border-slate-400/20 text-[#F1F5F9] hover:bg-white/5 hover:border-slate-400/40"
              >
                Explore integrations <SlidersHorizontal className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: What TMIP monitors */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              SUBSYSTEM COVERAGE
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Every subsystem worth watching.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-3 font-ibm-plex">
              TMIP captures telemetry across six vehicle subsystems, sub-second, continuously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsystems.map((sub) => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.title}
                  className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-[4px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">
                      {sub.title}
                    </h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed font-ibm-plex">
                      {sub.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-400/10 space-y-2">
                    {sub.metrics.map((m) => (
                      <div key={m} className="flex items-center gap-2 text-xs font-jetbrains text-[#CBD5E1]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Why sub-second matters */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
                HIGH-FREQUENCY INGESTION
              </div>
              <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Why the polling frequency changes the operating model.
              </h2>
            </div>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Legacy fleet software polls every 5–15 minutes. That is fast enough to know where a truck is, but slow enough that you miss the moments that matter: the pressure drop before the puncture, the temperature spike before the brake fade, the driver behaviour pattern before the incident. TMIP samples sub-second, so you see the leading indicators, not just the outcomes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-[4px] bg-[#0B1220] border border-red-500/20 space-y-3">
                <div className="flex items-center gap-2 text-red-400 font-jetbrains text-xs font-semibold uppercase tracking-wider">
                  <Clock className="w-4 h-4" /> Legacy 5–15 Min Polling
                </div>
                <h4 className="font-space-grotesk text-lg font-bold text-[#F1F5F9]">
                  Lagging Indicator Traps
                </h4>
                <p className="text-[#94A3B8] text-sm leading-relaxed font-ibm-plex">
                  Only reports events after failure has already occurred. You find out about an en-route blowout after the driver pulls over on a highway shoulder.
                </p>
              </div>

              <div className="p-6 rounded-[4px] bg-[#0B1220] border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2 text-[#3B82F6] font-jetbrains text-xs font-semibold uppercase tracking-wider">
                  <Zap className="w-4 h-4" /> TMIP Sub-Second Streaming
                </div>
                <h4 className="font-space-grotesk text-lg font-bold text-[#F1F5F9]">
                  Leading Indicator Protection
                </h4>
                <p className="text-[#94A3B8] text-sm leading-relaxed font-ibm-plex">
                  Detects micro-pressure loss curves, rapid temperature escalations, and driveline anomalies instantly — triggering automated depot work orders before breakdowns happen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Dashboard preview */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              FLEET MISSION CONTROL
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              What operators see.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-3 font-ibm-plex">
              The TMIP live dashboard shows fleet-wide status, per-vehicle detail, and per-subsystem drill-down. Filter by region, route, driver, vehicle class. Alert thresholds are configurable. Export to CSV or push to your BI stack via API.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-400/10">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-jetbrains text-sm font-semibold text-[#F1F5F9]">
                  LIVE TELEMETRY STREAM · 68,000+ ASSETS ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8]">
                <span className="px-2.5 py-1 rounded-[2px] bg-[#0B1220] border border-slate-400/10">Filter: All Regions</span>
                <span className="px-2.5 py-1 rounded-[2px] bg-[#0B1220] border border-slate-400/10">Sampling: 1000ms</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-[4px] bg-[#0B1220] border border-slate-400/10">
                <div className="text-xs font-jetbrains text-[#94A3B8] mb-1">Average Fleet Pressure</div>
                <div className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">118.4 PSI</div>
                <div className="text-[11px] font-jetbrains text-[#10B981] mt-1">98.6% in nominal band</div>
              </div>
              <div className="p-4 rounded-[4px] bg-[#0B1220] border border-slate-400/10">
                <div className="text-xs font-jetbrains text-[#94A3B8] mb-1">Wheel-End Temperature</div>
                <div className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">54.2°C</div>
                <div className="text-[11px] font-jetbrains text-[#10B981] mt-1">Normal highway thermal curve</div>
              </div>
              <div className="p-4 rounded-[4px] bg-[#0B1220] border border-slate-400/10">
                <div className="text-xs font-jetbrains text-[#94A3B8] mb-1">Telemetry Uptime</div>
                <div className="font-space-grotesk text-2xl font-bold text-[#3B82F6]">99.8%</div>
                <div className="text-[11px] font-jetbrains text-[#CBD5E1] mt-1">Edge buffer active</div>
              </div>
              <div className="p-4 rounded-[4px] bg-[#0B1220] border border-slate-400/10">
                <div className="text-xs font-jetbrains text-[#94A3B8] mb-1">Active Alerts</div>
                <div className="font-space-grotesk text-2xl font-bold text-[#F59E0B]">3 Actionable</div>
                <div className="text-[11px] font-jetbrains text-[#F59E0B] mt-1">0 critical roadside stops</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Sample alerts */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              ACTIONABLE CONTEXT
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              What an alert looks like.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-3 font-ibm-plex">
              TMIP alerts are actionable, not noise. Every alert carries context: what triggered, what the reading is, what the threshold is, what the recommended action is, and who is responsible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alerts.map((al) => {
              const Icon = al.icon;
              return (
                <div
                  key={al.type}
                  className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-[4px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[11px] font-jetbrains font-semibold px-2.5 py-1 rounded-[2px] border ${al.badgeColor}`}>
                        {al.badge}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-jetbrains text-[#3B82F6]">{al.vehicle}</div>
                      <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] mt-1">
                        {al.type}
                      </h3>
                    </div>

                    <div className="p-3 rounded-[4px] bg-[#050A17] border border-slate-400/10 font-jetbrains text-xs text-[#CBD5E1]">
                      {al.reading}
                    </div>

                    <div className="space-y-2 text-xs font-ibm-plex">
                      <div>
                        <span className="text-[#94A3B8]">Recommended: </span>
                        <span className="text-[#F1F5F9] font-medium">{al.recommended}</span>
                      </div>
                      <div>
                        <span className="text-[#94A3B8]">Assigned: </span>
                        <span className="text-[#3B82F6] font-jetbrains">{al.assigned}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative z-10 py-20 px-6 sm:px-10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto">
          <div className="p-10 sm:p-16 rounded-[4px] bg-gradient-to-br from-[#0B1220] to-[#050A17] border border-blue-500/30 relative overflow-hidden text-center max-w-4xl mx-auto">
            <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                See telemetry on your fleet.
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
                Connect sub-second telemetry to detect mechanical anomalies before they turn into costly roadside failures.
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
