import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Clock,
  BarChart3,
  Box,
  Globe,
  Radio,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  Thermometer,
} from "lucide-react";
import { TwinInteractive } from "./twin-interactive";

export const metadata: Metadata = {
  title: "TMIP Fleet Telematics & Vehicle Digital Twin",
  description:
    "Treel's Vehicle Digital Twin platform for fleets. Sub-second telemetry, predictive maintenance, and 9 to 12 months payback across 70,000+ vehicles.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://treel.in/tmip",
  },
  openGraph: {
    title: "TMIP Fleet Telematics & Vehicle Digital Twin",
    description:
      "Treel's Vehicle Digital Twin platform for fleets. Sub-second telemetry, predictive maintenance, and 9 to 12 months payback across 70,000+ vehicles.",
    url: "https://treel.in/tmip",
  },
};

const capabilities = [
  {
    icon: Activity,
    title: "Real-Time Telemetry",
    body: "Sub-second updates across the fleet. Pressure, temperature, engine diagnostics, fuel consumption, and driver behaviour, all rendered in one live dashboard.",
  },
  {
    icon: Clock,
    title: "Drastically Reduced Downtime",
    body: "Eliminate costly roadside strandings and emergency tyre failures. Predictive intelligence detects pressure degradation 24–48 hours ahead, preventing breakdown delays and SLA penalties.",
  },
  {
    icon: BarChart3,
    title: "Proven Fleet Cost-Effectiveness",
    body: "5% to 7% tyre life extension combined with sustained fuel savings of 0.5% to 0.6%. Zero surprise capital outlays, transparent unit economics, and audited enterprise returns.",
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
              <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] mb-3 sm:mb-4 font-medium flex flex-wrap items-center gap-2">
                <span>ENTERPRISE FLEET INTELLIGENCE</span>
                <span className="text-slate-600">·</span>
                <Link href="/tmip/tpms" className="text-[#3B82F6] hover:underline font-semibold">
                  FLEET TPMS &amp; SENSORS →
                </Link>
              </div>
              <h1 className="font-space-grotesk text-4xl sm:text-6xl lg:text-[72px] xl:text-[84px] font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.02] mb-4 sm:mb-5">
                The Vehicle Digital Twin for <span className="text-[#3B82F6] italic">enterprise fleets</span>.
              </h1>
              <p className="font-ibm-plex text-lg sm:text-[20px] leading-[1.55] text-[#94A3B8] max-w-[580px] mb-6 sm:mb-8">
                Powered by precision <Link href="/tmip/tpms" className="text-[#3B82F6] hover:underline font-medium">fleet TPMS sensors</Link> and sub-second CAN telemetry, TMIP models each vehicle as a real-time digital twin. Delivering maximized operational profitability, drastically reduced unscheduled downtime, and proven cost-effectiveness with 70,000+ vehicles under active management.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/tmip/demo"
                  className="px-6 sm:px-7 py-3.5 rounded-[3px] font-space-grotesk font-semibold text-sm bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-lg shadow-[#3B82F6]/20 inline-flex items-center gap-2 transition-all duration-200"
                >
                  Book a 30-minute demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tmip/tpms"
                  className="px-5 sm:px-6 py-3.5 rounded-[3px] font-ibm-plex font-medium text-sm text-[#F1F5F9] border border-[#3B82F6]/40 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 inline-flex items-center gap-2 transition-all duration-200"
                >
                  <Activity className="w-4 h-4 text-[#3B82F6]" />
                  Explore Fleet TPMS
                </Link>
                <Link
                  href="/tmip/roi-calculator"
                  className="px-5 sm:px-6 py-3.5 rounded-[3px] font-ibm-plex font-medium text-sm text-[#94A3B8] hover:text-[#F1F5F9] inline-flex items-center transition-all duration-200"
                >
                  Calculate ROI →
                </Link>
              </div>
            </div>

            {/* Right Column: TMIP Vehicle Digital Twin Architecture Card */}
            <div className="hidden lg:flex justify-center items-center p-4 xl:p-8 select-none" aria-hidden="true">
              <div className="w-full max-w-[460px] rounded-lg bg-[#080E1E]/90 border border-[#3B82F6]/30 p-6 space-y-4 shadow-2xl shadow-[#3B82F6]/10 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Header bar */}
                <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="font-jetbrains text-xs tracking-wider text-[#94A3B8] uppercase font-semibold">
                      VEHICLE DIGITAL TWIN · LIVE STREAM
                    </span>
                  </div>
                  <span className="font-jetbrains text-[10px] text-[#3B82F6] font-mono bg-[#3B82F6]/10 border border-[#3B82F6]/25 px-2 py-0.5 rounded">
                    sub-second telemetry
                  </span>
                </div>

                {/* 3 Active Telemetry Layers (Replaces the 3 blank bars) */}
                <div className="space-y-3 pt-1">
                  {/* Layer 1: Sensing */}
                  <div className="p-3.5 rounded-[4px] bg-[#0B1528] border border-blue-500/20 hover:border-blue-500/40 transition-colors flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-jetbrains text-[10px] tracking-wider text-[#3B82F6] uppercase font-semibold">
                        LAYER 01 · PHYSICAL SENSING
                      </div>
                      <div className="font-space-grotesk text-sm font-semibold text-[#F1F5F9]">
                        Tyres · Fuel · Engine CAN J1939
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-jetbrains text-xs font-bold text-[#10B981]">118 PSI · 54°C</div>
                      <div className="font-jetbrains text-[10px] text-[#94A3B8]">0.8s interval</div>
                    </div>
                  </div>

                  {/* Layer 2: Twin State */}
                  <div className="p-3.5 rounded-[4px] bg-[#0B1528] border border-blue-500/30 hover:border-blue-500/50 transition-colors flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-jetbrains text-[10px] tracking-wider text-[#3B82F6] uppercase font-semibold">
                        LAYER 02 · DIGITAL TWIN REASONING
                      </div>
                      <div className="font-space-grotesk text-sm font-semibold text-[#F1F5F9]">
                        Thermal Dynamics &amp; Casing Wear
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-jetbrains text-xs font-bold text-[#3B82F6]">SYNCHRONIZED</div>
                      <div className="font-jetbrains text-[10px] text-[#94A3B8]">70,000+ nodes</div>
                    </div>
                  </div>

                  {/* Layer 3: Predictive Decision */}
                  <div className="p-3.5 rounded-[4px] bg-[#0B1528] border border-blue-500/40 hover:border-blue-500/60 transition-colors flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-jetbrains text-[10px] tracking-wider text-[#F59E0B] uppercase font-semibold">
                        LAYER 03 · DISPATCH &amp; PREDICTION
                      </div>
                      <div className="font-space-grotesk text-sm font-semibold text-[#F1F5F9]">
                        Predictive Maintenance Window
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-jetbrains text-xs font-bold text-[#F59E0B]">24–48h ALERT</div>
                      <div className="font-jetbrains text-[10px] text-[#94A3B8]">Zero blowouts</div>
                    </div>
                  </div>
                </div>

                {/* Footer status bar */}
                <div className="pt-2 flex items-center justify-between text-[11px] font-jetbrains text-[#94A3B8] border-t border-slate-700/50">
                  <span>Payback: <strong className="text-[#F1F5F9]">9–12 Months</strong></span>
                  <span className="text-[#10B981] font-medium">● Active Fleet Edge Gateway</span>
                </div>
              </div>
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
                70,000+
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-[#94A3B8] leading-[1.4]">
                Vehicles under active management
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
                9–12 mo
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

      {/* Customer Fleets / Logos Band */}
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10 bg-[#060B18]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
                TRUSTED BY 200+ ENTERPRISE FLEET OPERATORS
              </div>
              <h2 className="font-space-grotesk text-xl sm:text-2xl font-semibold text-[#F1F5F9] mt-1">
                Active deployments across commercial haulage corridors
              </h2>
            </div>
            <Link
              href="/tmip/customers"
              className="font-jetbrains text-xs uppercase tracking-wider text-[#3B82F6] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              View customer case studies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-2">
            {[
              { name: "National Linehaul", fleet: "1,200+ Trucks", type: "Heavy Commercial Logistics" },
              { name: "Express Cargo Networks", fleet: "850 Multi-Axle", type: "Pan-India Freight" },
              { name: "Cold-Chain Logistics", fleet: "420 Reefer Units", type: "Temp-Controlled Transit" },
              { name: "Intercity Express Lines", fleet: "650 Coaches", type: "Passenger Transport" },
              { name: "Infrastructure Ready-Mix", fleet: "500 Mixers", type: "Heavy Construction" },
              { name: "Open-Cast Mining Belts", fleet: "280 Dumpers", type: "Mining & Industrial" },
            ].map((client) => (
              <div
                key={client.name}
                className="p-4 rounded-lg bg-[#080E1E] border border-blue-900/30 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-2 group shadow-sm"
              >
                <div className="font-space-grotesk font-semibold text-sm text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors leading-tight">
                  {client.name}
                </div>
                <div className="pt-2 border-t border-slate-800/80 space-y-0.5">
                  <div className="font-jetbrains text-[11px] font-bold text-[#F59E0B]">
                    {client.fleet}
                  </div>
                  <div className="font-jetbrains text-[10px] text-[#94A3B8]">
                    {client.type}
                  </div>
                </div>
              </div>
            ))}
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

      {/* Enterprise Integrations Band */}
      <section className="relative z-10 py-12 sm:py-16 border-b border-slate-400/10 bg-[#060B18]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="font-jetbrains text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
              ENTERPRISE TELEMATICS &amp; ERP INTEGRATIONS
            </div>
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F1F5F9] tracking-[-0.02em]">
              Connects seamlessly into your existing fleet stack.
            </h2>
            <p className="font-ibm-plex text-sm sm:text-base text-[#94A3B8] leading-[1.6]">
              TMIP ingests real-time CAN bus telemetry and exports enriched tyre, fuel, and trip intelligence directly into enterprise ERPs, TMS platforms, and government-mandated tracking systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                protocol: "CAN Bus J1939",
                category: "Vehicle Telematics",
                desc: "Direct ECU and gateway integration for engine RPM, speed, brake events, and fuel rate telemetry.",
              },
              {
                protocol: "SAP & Oracle ERP",
                category: "Enterprise Systems",
                desc: "Automated work orders, scrap tyre accounting, inventory management, and CPKM audit trails.",
              },
              {
                protocol: "AIS-140 FMS",
                category: "Regulatory Compliance",
                desc: "Certified panic button, GPS, and SOS tracking feed for national highway compliance.",
              },
              {
                protocol: "Cloud & Data Lakes",
                category: "AWS / Azure / GCP",
                desc: "Direct Parquet, Kafka streams, or webhook ingest into your proprietary data warehouse.",
              },
              {
                protocol: "REST & Webhooks",
                category: "Developer APIs",
                desc: "Full OpenAPI v3 specification with sub-second alert webhooks for mission-critical dispatch.",
              },
            ].map((integ) => (
              <div
                key={integ.protocol}
                className="p-5 rounded-lg bg-[#080E1E] border border-blue-900/30 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1.5">
                  <div className="font-jetbrains text-[10px] uppercase tracking-wider text-[#3B82F6] font-semibold">
                    {integ.category}
                  </div>
                  <h3 className="font-space-grotesk font-semibold text-base text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                    {integ.protocol}
                  </h3>
                  <p className="font-ibm-plex text-xs text-[#94A3B8] leading-relaxed">
                    {integ.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 font-jetbrains text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> Ready to deploy
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet TPMS Spotlight */}
      <section className="relative z-10 py-12 sm:py-16 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-10 rounded-xl bg-gradient-to-r from-blue-950/40 via-[#080E1E] to-blue-950/20 border border-blue-600/30 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/20 font-jetbrains text-[11px] font-semibold text-[#3B82F6] uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#3B82F6]" /> Hardware + Software Ecosystem
              </div>
              <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F1F5F9] tracking-[-0.02em]">
                Commercial Fleet TPMS &amp; Bluetooth Sensors
              </h2>
              <p className="font-ibm-plex text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Ruggedized internal and valve-mount Bluetooth TPMS sensors engineered for Indian commercial haulage. Real-time temperature, pressure, and blowout-prevention telemetry streaming straight into the TMIP cloud.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 font-jetbrains text-xs text-[#F1F5F9]">
                  <Gauge className="w-4 h-4 text-[#3B82F6]" /> 0–180 PSI commercial range
                </div>
                <div className="flex items-center gap-2 font-jetbrains text-xs text-[#F1F5F9]">
                  <Thermometer className="w-4 h-4 text-[#F59E0B]" /> High-temp threshold alerts
                </div>
                <div className="flex items-center gap-2 font-jetbrains text-xs text-[#F1F5F9]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> IP67 ruggedized enclosure
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href="/tmip/tpms"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] font-space-grotesk font-semibold text-sm bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-lg shadow-[#3B82F6]/20 transition-all duration-200"
              >
                Explore Fleet TPMS <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] font-space-grotesk font-medium text-sm border border-slate-700 hover:border-slate-500 text-[#F1F5F9] transition-all duration-200"
              >
                Request Hardware Sample
              </Link>
            </div>
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
