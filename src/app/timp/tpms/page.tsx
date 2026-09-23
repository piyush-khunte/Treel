import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Box,
  CheckCircle2,
  Cpu,
  Disc,
  Gauge,
  Radio,
  ShieldAlert,
  Thermometer,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Commercial Vehicle TPMS · TMIP · Treel Mobility Solutions",
  description:
    "Heavy commercial vehicle tyre telematics, multi-axle pressure and temperature monitoring, and digital twin systems for commercial vehicle fleets and manufacturers.",
  alternates: {
    canonical: "https://treel.in/timp/tpms",
  },
  openGraph: {
    title: "Commercial Vehicle TPMS · TMIP · Treel Mobility Solutions",
    description:
      "Heavy commercial vehicle tyre telematics, multi-axle pressure and temperature monitoring, and digital twin systems for commercial vehicle fleets and manufacturers.",
    url: "https://treel.in/timp/tpms",
  },
};

const capabilities = [
  {
    icon: Gauge,
    title: "Multi-Axle Pressure Monitoring",
    description:
      "Continuous high-precision PSI and bar tracking across steer, drive, lift, and multi-axle trailer wheel positions. Identifies under-inflation immediately before it degrades casing integrity or burns excess fuel.",
  },
  {
    icon: Thermometer,
    title: "Tyre Temperature & Blowout Prevention",
    description:
      "Direct internal cavity temperature sensing detects early brake drag, wheel hub bearing friction, and thermal buildup well before catastrophic highway blowout or tyre fire occurs.",
  },
  {
    icon: ShieldAlert,
    title: "Dual-Wheel Differential Alerts",
    description:
      "In twin-wheel assemblies, pressure differences cause the larger tyre to carry excess load and scrub prematurely. Real-time differential alerts eliminate uneven tyre wear across dual tyres.",
  },
  {
    icon: Cpu,
    title: "CAN J1939 Edge Gateway Telemetry",
    description:
      "Integrates with the vehicle's CAN bus and communicates wirelessly with wheel sensors. Onboard edge storage guarantees zero telemetry loss during cellular dead zones on national highways.",
  },
  {
    icon: Wrench,
    title: "Predictive Maintenance & Tread Wear",
    description:
      "Machine-learning algorithms analyze pressure-temperature curves to project Remaining Useful Life (RUL) and schedule depot rotations before irreversible tread damage sets in.",
  },
  {
    icon: BarChart3,
    title: "True Cost Per Kilometre Tracking",
    description:
      "Measures actual tyre performance and wear rates across axle positions, tyre brands, and retread cycles to provide fleet managers with empirical cost-per-kilometre analytics.",
  },
];

const architectureSteps = [
  {
    step: "01",
    title: "Ruggedized Wheel Sensors",
    tag: "HARDWARE",
    icon: Disc,
    desc: "Internal rim-mount and valve-stem sensors engineered for heavy commercial duty cycles. Rated up to 185 PSI / 12.8 bar and 125°C with multi-year battery longevity and severe vibration resistance.",
  },
  {
    step: "02",
    title: "Edge Gateway & CAN Bus",
    tag: "TELEMATICS",
    icon: Cpu,
    desc: "In-cabin or chassis-mounted telematics unit connects wirelessly to wheel sensors and interfaces directly with vehicle CAN J1939 networks with offline telemetry caching.",
  },
  {
    step: "03",
    title: "TMIP Cloud & Digital Twin",
    tag: "PLATFORM",
    icon: Box,
    desc: "Ingests high-frequency telemetry, calculates thermal expansion compensation, and maps every tyre's operational state to its live Vehicle Digital Twin.",
  },
  {
    step: "04",
    title: "Alert Engine & TMS Sync",
    tag: "DISPATCH",
    icon: Radio,
    desc: "Dispatches instant alerts for rapid deflation, high temperature spikes, and pressure mismatch to fleet controllers, maintenance teams, and drivers, syncing with TMS and ERP systems.",
  },
];

export default function CommercialVehicleTpmsPage() {
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

      {/* 1. Hero Section */}
      <section className="relative z-10 pt-24 sm:pt-28 pb-20 sm:pb-24 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8]">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/tmip" className="hover:text-white transition-colors">
                TMIP
              </Link>
              <span>/</span>
              <span className="text-[#3B82F6]">Commercial Vehicle TPMS</span>
            </div>

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#3B82F6]/10 border border-[#3B82F6]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
              <span className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
                COMMERCIAL VEHICLE TPMS · FLEET &amp; OEM
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.08]">
              Commercial Vehicle TPMS.{" "}
              <span className="text-[#3B82F6] italic font-normal">Engineered for Heavy Fleets.</span>
            </h1>

            {/* Lede Copy */}
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              Heavy commercial vehicle tyre telematics, multi-axle pressure and temperature monitoring, and digital twin
              telemetry engineered for medium and heavy truck manufacturers and enterprise fleet operators.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-[3px] font-space-grotesk font-semibold text-sm bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-lg shadow-[#3B82F6]/20 inline-flex items-center gap-2 transition-all duration-200"
              >
                Inquire for Commercial Fleets <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip"
                className="px-7 py-3.5 rounded-[3px] font-ibm-plex font-medium text-sm text-[#F1F5F9] border border-[rgba(59,130,246,0.3)] hover:border-[#3B82F6] hover:bg-[#3B82F6]/[0.08] inline-flex items-center transition-all duration-200"
              >
                Explore TMIP Enterprise Platform
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Metrics Band */}
      <section className="relative z-10 py-12 sm:py-16 border-b border-slate-400/10 bg-[#080E1E]/80">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-1">
              <div className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-[#F59E0B] tracking-[-0.02em]">
                68,000+
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] uppercase tracking-wider text-[#94A3B8]">
                Vehicles Under Management
              </div>
            </div>
            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-1">
              <div className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-[#F59E0B] tracking-[-0.02em]">
                85%+
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] uppercase tracking-wider text-[#94A3B8]">
                Blowout Incident Reduction
              </div>
            </div>
            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-1">
              <div className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-[#F59E0B] tracking-[-0.02em]">
                5–7%
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] uppercase tracking-wider text-[#94A3B8]">
                Tyre-Life Extension
              </div>
            </div>
            <div className="border-l-2 border-[#3B82F6] pl-5 space-y-1">
              <div className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-[#F59E0B] tracking-[-0.02em]">
                9 Months
              </div>
              <div className="font-jetbrains text-[10px] sm:text-[11px] uppercase tracking-wider text-[#94A3B8]">
                Median Payback Period
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core TPMS Capabilities */}
      <section className="relative z-10 py-20 lg:py-28 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
              CAPABILITIES
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F1F5F9]">
              Purpose-built for commercial vehicle operations.
            </h2>
            <p className="font-ibm-plex text-[#94A3B8] text-base leading-relaxed">
              From steer tyres to multi-axle trailer tandems, Treel Commercial Vehicle TPMS delivers real-time visibility,
              thermal warning protection, and actionable maintenance insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-[4px] bg-[#0B1220]/60 border border-slate-400/10 hover:border-[#3B82F6]/30 hover:-translate-y-1 transition-all duration-300 space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-[#050A17] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-space-grotesk text-xl font-semibold text-[#F1F5F9]">
                    {cap.title}
                  </h3>
                  <p className="font-ibm-plex text-sm text-[#94A3B8] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Hardware-to-Platform Architecture */}
      <section className="relative z-10 py-20 lg:py-28 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
              ARCHITECTURE
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F1F5F9]">
              From wheel sensors to the TMIP mobility platform.
            </h2>
            <p className="font-ibm-plex text-[#94A3B8] text-base leading-relaxed">
              Commercial Vehicle TPMS combines ruggedized vehicle-grade hardware with the cloud intelligence of TMIP
              to power real-time fleet operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectureSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-6 rounded-[4px] bg-[#0B1220]/70 border border-slate-400/10 hover:border-[#3B82F6]/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-jetbrains text-xs font-semibold text-[#3B82F6] tracking-wider">
                        {step.step}
                      </span>
                      <div className="w-8 h-8 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <div className="font-jetbrains text-[10px] tracking-wider uppercase text-[#94A3B8] mb-1 font-medium">
                        {step.tag}
                      </div>
                      <h3 className="font-space-grotesk text-lg font-semibold text-[#F1F5F9]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-ibm-plex text-xs text-[#94A3B8] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Axle Configurations Supported */}
      <section className="relative z-10 py-20 lg:py-28 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
                MULTI-AXLE VERSATILITY
              </div>
              <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F1F5F9]">
                Supports up to 24 wheel positions per commercial rig.
              </h2>
              <p className="font-ibm-plex text-[#94A3B8] text-base leading-relaxed">
                Whether deploying on a 4x2 distribution truck or a multi-axle bulk cement tanker with articulated trailers,
                Treel Commercial Vehicle TPMS handles all commercial chassis layouts.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm text-[#94A3B8] font-jetbrains">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>4x2 &amp; 6x2 Haulage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>6x4 Heavy Tippers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>8x2 &amp; 8x4 Multi-Axle Trucks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Tandem &amp; Tri-Axle Trailers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Pneumatic Lift Axles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span>Intercity Bus Coaches</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[4px] bg-[#0B1220]/70 border border-slate-400/10 space-y-6">
              <h3 className="font-space-grotesk text-2xl font-semibold text-[#F1F5F9]">
                OEM Integration &amp; Fleet Pilots
              </h3>
              <p className="font-ibm-plex text-sm text-[#94A3B8] leading-relaxed">
                Treel partners directly with commercial vehicle OEMs for factory-fit pre-delivery integration, and with
                large enterprise fleets for managed depot retrofits across India.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-[3px] font-space-grotesk font-semibold text-sm bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-lg shadow-[#3B82F6]/20 inline-flex items-center justify-center gap-2 transition-all duration-200"
                >
                  Schedule Engineering Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Inquire Now Section */}
      <section className="relative z-10 py-20 max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="p-8 sm:p-12 rounded-[4px] bg-[#0A1122]/90 border border-[#3B82F6]/30 shadow-2xl shadow-[#3B82F6]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-space-grotesk font-semibold text-[#F1F5F9]">
              Ready to evaluate Commercial Vehicle TPMS?
            </h2>
            <p className="text-sm sm:text-base font-ibm-plex text-[#94A3B8]">
              Discuss factory-fit integration, multi-axle sensor configurations, and TMIP fleet platform connectivity
              with our commercial vehicle engineering division.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-[3px] font-space-grotesk font-semibold text-sm bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-lg shadow-[#3B82F6]/20 inline-flex items-center transition-all duration-200"
            >
              Inquire Now
            </Link>
            <Link
              href="/tmip/demo"
              className="px-7 py-3.5 rounded-[3px] font-ibm-plex font-medium text-sm text-[#F1F5F9] border border-[rgba(59,130,246,0.3)] hover:border-[#3B82F6] hover:bg-[#3B82F6]/[0.08] inline-flex items-center transition-all duration-200"
            >
              Book TMIP Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
