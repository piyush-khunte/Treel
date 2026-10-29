import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bike,
  Car,
  CheckCircle2,
  Cpu,
  Factory,
  HardHat,
  Radio,
  Tractor,
  Truck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "OEM Solutions & Factory Integration · Treel",
  description:
    "Treel OEM automotive integration solutions across two-wheeler, four-wheeler, commercial vehicle, bus, mining, and agriculture sectors. Factory-grade TPMS, CAN-bus protocols, and digital twin telemetry.",
  alternates: {
    canonical: "https://treel.in/oem",
  },
  openGraph: {
    title: "OEM Solutions & Factory Integration · Treel",
    description:
      "Factory-grade tyre pressure monitoring, connected telemetry, and digital twin systems engineered for automotive manufacturers.",
    url: "https://treel.in/oem",
  },
};

export default function OemOverviewPage() {
  return (
    <div className="bg-[#0F1419] text-[#FAF7F2] font-inter min-h-screen selection:bg-[#D5573B] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pb-20 border-b border-white/10">
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(213, 87, 59, 0.14) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "OEM Solutions" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                ORIGINAL EQUIPMENT MANUFACTURER
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              OEM Solutions &amp; Factory{" "}
              <span className="italic font-normal text-[#D5573B]">
                Integration.
              </span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Factory-grade tyre pressure monitoring, connected CAN-bus telemetry, and Vehicle Digital Twin hardware engineered for automotive assembly line integration across two-wheelers, four-wheelers, commercial haulage, passenger transit, mining, and agriculture.
            </p>

            {/* Quick Navigation Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <Link
                href="/oem/commercial-vehicle"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D5573B] text-white text-xs font-semibold hover:bg-[#CB4831] transition-colors"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Commercial Vehicle OE</span>
              </Link>
              <a
                href="#two-wheeler"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#94A3B8] hover:text-[#FAF7F2] hover:border-[#D5573B]/50 transition-colors"
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Two-Wheeler</span>
              </a>
              <a
                href="#four-wheeler"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#94A3B8] hover:text-[#FAF7F2] hover:border-[#D5573B]/50 transition-colors"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Four-Wheeler</span>
              </a>
              <a
                href="#bus"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#94A3B8] hover:text-[#FAF7F2] hover:border-[#D5573B]/50 transition-colors"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Bus &amp; Transit</span>
              </a>
              <a
                href="#mining"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#94A3B8] hover:text-[#FAF7F2] hover:border-[#D5573B]/50 transition-colors"
              >
                <HardHat className="w-3.5 h-3.5" />
                <span>Mining &amp; OTR</span>
              </a>
              <a
                href="#agriculture"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#94A3B8] hover:text-[#FAF7F2] hover:border-[#D5573B]/50 transition-colors"
              >
                <Tractor className="w-3.5 h-3.5" />
                <span>Agriculture</span>
              </a>
              <a
                href="#architecture"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#94A3B8] hover:text-[#FAF7F2] hover:border-[#D5573B]/50 transition-colors"
              >
                <Factory className="w-3.5 h-3.5" />
                <span>Architecture</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SPOTLIGHT: COMMERCIAL VEHICLE OE */}
      <section className="py-14 border-b border-white/10 bg-gradient-to-r from-[#D5573B]/[0.08] via-transparent to-transparent">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#141B22] border border-[#D5573B]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-xl">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/20 text-xs font-mono uppercase tracking-wider text-[#D5573B] font-semibold">
                <Truck className="w-4 h-4" />
                <span>Flagship OE Platform</span>
              </div>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Commercial Vehicle Heavy OE Telematics
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Complete factory-fit hardware and firmware platform for commercial truck OEMs. Ingests 24&nbsp;Hz wheel thermodynamics, multi-axle load disparity, and bead-seat micro-leaks natively into OEM digital clusters and telematics units.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#FAF7F2]/80">
                <span className="flex items-center gap-1 text-[#00E5FF]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ARAI &amp; AIS-110 Compliant
                </span>
                <span className="flex items-center gap-1 text-[#00E5FF]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> J1939 CAN-Bus Native
                </span>
                <span className="flex items-center gap-1 text-[#00E5FF]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> IP67 Environmental Sealing
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                href="/oem/commercial-vehicle"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-md group"
              >
                <span>Explore Commercial Vehicle OE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-[4px] border border-white/20 text-[#FAF7F2] font-medium text-sm hover:border-[#D5573B] hover:text-[#D5573B] transition-all"
              >
                Inquire Specifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TWO-WHEELER SEGMENT SECTION */}
      <section id="two-wheeler" className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/20 text-xs font-mono uppercase text-[#D5573B] font-semibold">
                <Bike className="w-3.5 h-3.5" /> Two-Wheeler OEM
              </div>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Motorcycle &amp; Electric Scooter Integration
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Ultra-compact, low-inertia BLE valve sensors engineered for 2W rim architectures. Direct integration into digital TFT instrument clusters via BLE 5.0 or UART gateway, providing rider tyre temperature, pressure alerts, and predictive lean-angle telemetry.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#cbd5e1] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D5573B] shrink-0" />
                  <span>Ultra-lightweight sensor (under 12g) to preserve wheel balance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D5573B] shrink-0" />
                  <span>5-Year battery endurance under sub-second motion telemetry</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D5573B] shrink-0" />
                  <span>Dedicated EV range calibration mapping rolling resistance</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono uppercase text-[#00E5FF] font-semibold">Transmission</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">BLE 5.2 Direct Cluster Sync</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Broadcasts sub-second pressure packets directly into connected TFT instrument clusters without auxiliary dongles.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono uppercase text-[#00E5FF] font-semibold">Range &amp; Pressure</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">0 – 65 PSI Dynamic Scale</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Precision +/- 0.5 PSI accuracy with micro-leak detection for front steer and rear drive tyres.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono uppercase text-[#00E5FF] font-semibold">Environmental</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">IP67 Submersion Sealed</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Hermetically potted housing resisting monsoon water ingress, high-pressure jet washing, and road grit.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono uppercase text-[#00E5FF] font-semibold">Assembly Line</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">10-Second QR Pairing</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Turnkey plant tool for rapid VIN-to-sensor barcode association on automotive assembly lines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR-WHEELER SEGMENT SECTION */}
      <section id="four-wheeler" className="py-16 sm:py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono uppercase text-[#D5573B] font-semibold">Compliance</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">ISO 21750 &amp; AIS-110</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Certified for passenger vehicle OEM homologation, meeting mandatory tyre monitoring statutory standards.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono uppercase text-[#D5573B] font-semibold">In-Cabin UX</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">CAN Bus &amp; Infotainment</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Pre-built graphics and telemetry feeds for Android Automotive OS, Apple CarPlay, and OEM heads-up displays.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono uppercase text-[#D5573B] font-semibold">Hardware Option</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">Internal Valve-Mount</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Hidden interior rim installation with high thermal transfer rate directly sampling inner carcass air temperature.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono uppercase text-[#D5573B] font-semibold">EV Optimization</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">Torque Wear Analytics</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">Algorithms track electric vehicle instantaneous torque wear on tyres, alerting drivers before tread scrub occurs.</p>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/20 text-xs font-mono uppercase text-[#D5573B] font-semibold">
                <Car className="w-3.5 h-3.5" /> Four-Wheeler &amp; Passenger Car
              </div>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Passenger Vehicle Factory-Fit Telematics
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Seamless factory integration for passenger sedans, SUVs, and electric cars. Combines high-precision interior rim valve sensors with central gateway ECU protocols, allowing auto manufacturers to provide live tyre pressure and temperature on the instrument cluster without third-party gadgets.
              </p>
              <div className="pt-2">
                <Link href="/contact" className="text-xs font-mono text-[#D5573B] hover:text-white inline-flex items-center gap-1 font-semibold">
                  Request 4W OEM Engineering Whitepaper <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BUS & PASSENGER TRANSIT SEGMENT */}
      <section id="bus" className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/20 text-xs font-mono uppercase text-[#D5573B] font-semibold">
                <Radio className="w-3.5 h-3.5" /> Bus &amp; Mass Transit
              </div>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Public Transit &amp; Intercity Coach Telematics
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Passenger transit buses operate under intense duty cycles where a single tyre failure creates extreme schedule disruptions and passenger safety hazards. Treel&apos;s bus OEM platform monitors dual-wheel rear axles, preventing inner tyre dragging and silent bead blowouts.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#cbd5e1] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                  <span>Dual-wheel pressure differential alerts for rear twin axles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                  <span>Depot departure gate auto-scan readers verifying tyre compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                  <span>Direct driver console alert and cloud depot dispatch sync</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">Dual-Axle Balance</h3>
                <p className="text-xs text-[#94A3B8]">Detects when an inner tyre loses pressure while the outer tyre carries 100% of the load, preventing sudden highway blowouts.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">Depot Gate Scanner</h3>
                <p className="text-xs text-[#94A3B8]">RFID/BLE roadside portal scans bus tyres at depot exit in 3 seconds, prohibiting non-compliant buses from departing.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">Electric Bus Cooling</h3>
                <p className="text-xs text-[#94A3B8]">Thermal sensors correlate battery pack proximity heating with tyre cavity air temperatures to prevent heat degradation.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">Braking Heat Warning</h3>
                <p className="text-xs text-[#94A3B8]">Flags sticking brake callipers by detecting anomalous wheel hub thermal transfer long before friction causes fire.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINING & HEAVY OTR SEGMENT */}
      <section id="mining" className="py-16 sm:py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-[#D5573B]">Pressure Ceiling</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">Up to 200 PSI Pressure Range</h3>
                <p className="text-xs text-[#94A3B8]">High-tensile transducers designed for heavy dumpers, tippers, and open-cast haul trucks operating 24/7.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-[#D5573B]">Mechanical Durability</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">50G Impact &amp; Vibration Rating</h3>
                <p className="text-xs text-[#94A3B8]">Survives aggressive rock-face impacts, gravel blasting, and high-vibration quarry transit corridors.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-[#D5573B]">Thermal Modeling</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">TKPH / Ton-Kilometer Per Hour</h3>
                <p className="text-xs text-[#94A3B8]">Calculates carcass internal heat build-up against manufacturer TKPH limits to prevent explosive separations.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-[#D5573B]">Ingress Protection</div>
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">IP67 Environmental Enclosure</h3>
                <p className="text-xs text-[#94A3B8]">Complete resistance against high-temperature 100-bar steam cleaning, chemical slurries, and deep quarry mud.</p>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/20 text-xs font-mono uppercase text-[#D5573B] font-semibold">
                <HardHat className="w-3.5 h-3.5" /> Mining &amp; Heavy OTR
              </div>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Extreme Duty Off-Highway &amp; Quarry Equipment
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                OTR tyres on 100-ton mining dumpers represent significant operating capital expenditures. Treel&apos;s heavy OTR telemetry prevents thermal blowouts, provides real-time load distribution, and maximizes casing retreadability in harsh mining environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AGRICULTURE SEGMENT */}
      <section id="agriculture" className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/20 text-xs font-mono uppercase text-[#D5573B] font-semibold">
                <Tractor className="w-3.5 h-3.5" /> Agriculture &amp; Farm Machinery
              </div>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Tractor &amp; Harvester Low-Pressure Telemetry
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Modern precision agriculture requires precise tyre inflation to prevent soil compaction and maximize field traction. Over-inflation damages crop root systems and reduces yield; under-inflation on tarmac destroys tyre sidewalls. Treel provides real-time pressure guidance tailored for field vs road transitions.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#cbd5e1] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D5573B] shrink-0" />
                  <span>Ultra-low pressure sensing down to 8 PSI for high-flotation tyres</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D5573B] shrink-0" />
                  <span>Tractor cabin display sync via ISOBUS / CAN protocols</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D5573B] shrink-0" />
                  <span>Fertilizer, liquid manure, and mud chemical resistance</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">Soil Compaction Control</h3>
                <p className="text-xs text-[#94A3B8]">Alerts operators when tractor tyres are over-inflated during tillage, protecting agricultural topsoil porosity.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">Field-to-Road Inflation</h3>
                <p className="text-xs text-[#94A3B8]">Dynamic indicators guide farmers on correct tyre pressures when moving from soft muddy fields to high-speed paved roads.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">Tractor Ballast Balance</h3>
                <p className="text-xs text-[#94A3B8]">Detects uneven water-ballasting or implement weight imbalance across left and right rear tractor wheels.</p>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">ISOBUS Certified</h3>
                <p className="text-xs text-[#94A3B8]">Plug-and-play compatibility with OEM tractor virtual terminals (John Deere, Mahindra, New Holland, Tafe).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ARCHITECTURE & ASSEMBLY-LINE INTEGRATION */}
      <section id="architecture" className="py-16 sm:py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
              ASSEMBLY LINE INTEGRATION
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium text-[#FAF7F2]">
              How Treel Integrates on the OEM Production Line
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              We provide automotive manufacturers with end-to-end tooling, hardware flashing stations, and CAN-bus protocol stacks so sensors are fitted and verified in seconds without slowing down the line.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#141B22] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="font-fraunces text-xl text-[#FAF7F2]">1. Line Pairing Tooling</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Handheld optical barcode scanners pair sensor IDs to chassis VIN numbers in under 8 seconds at wheel-mount assembly stations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#141B22] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-fraunces text-xl text-[#FAF7F2]">2. CAN &amp; UDS Diagnostics</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                End-of-line verification via standard ISO 14229 UDS diagnostic routines. Automatic DTC fault reporting during roll-off testing.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#141B22] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-fraunces text-xl text-[#FAF7F2]">3. Secure Cloud OTA</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Firmware algorithm updates and calibration curves deployed over-the-air to vehicle telematics units without dealership callbacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PARTNER WITH OEM TEAM CTA */}
      <section className="py-20 border-b border-white/10 bg-gradient-to-b from-[#141B22] to-[#0F1419]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-12 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-[#D5573B] font-semibold tracking-wider">
                AUTOMOTIVE ENGINEERING CONSULTING
              </div>
              <h2 className="text-2xl sm:text-3xl font-fraunces font-medium text-[#FAF7F2]">
                Ready to Integrate Treel Telematics at the Factory?
              </h2>
              <p className="text-sm text-[#94A3B8] max-w-xl">
                Connect with our automotive solutions engineering team for technical datasheets, CAN-bus protocol DBC files, sample bench units, and plant tooling specifications.
              </p>
            </div>
            <Link href="/contact" className="shrink-0">
              <Button variant="treel" size="lg" className="px-8 py-4 font-semibold text-sm">
                Contact OEM Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
