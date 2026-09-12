import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Gauge,
  Bell,
  Clock,
  BatteryCharging,
  CheckCircle2,
  Sliders,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Personal TPMS · Know Before You Go · Treel",
  description:
    "Real-time tyre pressure on your phone. Alerts before a puncture. ±0.5 PSI accuracy, 2-year battery, 10-minute setup. Fits any car or SUV. ₹8,999.",
  alternates: {
    canonical: "https://treel.in/personal",
  },
  openGraph: {
    title: "Personal TPMS · Know Before You Go · Treel",
    description:
      "Real-time tyre pressure on your phone. Alerts before a puncture. ±0.5 PSI accuracy, 2-year battery, 10-minute setup. Fits any car or SUV. ₹8,999.",
    url: "https://treel.in/personal",
  },
};

const features = [
  {
    title: "Real-time monitoring",
    desc: "Pressure and temperature updated every three seconds. Every tyre. Every drive. Your phone knows before you do.",
    icon: Gauge,
  },
  {
    title: "Instant alerts",
    desc: "Notification before a slow leak becomes a puncture. Before a hot tyre becomes a blowout. Before you notice the pull on the wheel.",
    icon: Bell,
  },
  {
    title: "10-minute setup",
    desc: "Four sensors screw on to the valve stems. Pair with the app. Done. Any car, any SUV, any tyre. No mechanic needed.",
    icon: Clock,
  },
  {
    title: "2-year battery life",
    desc: "Replaceable CR1632 cells. Two years of continuous monitoring per sensor. Low-battery warning six weeks before replacement is needed.",
    icon: BatteryCharging,
  },
  {
    title: "iOS and Android",
    desc: "iOS 15 and Android 10 and above. Face ID, fingerprint, and Apple Watch complications for at-a-glance status.",
    icon: Smartphone,
  },
  {
    title: "1-year warranty",
    desc: "Full replacement warranty on all four sensors and the app. If a sensor fails within twelve months, we send a new one. No questions.",
    icon: ShieldCheck,
  },
];

const specsAtGlance = [
  { value: "±0.5", label: "PSI accuracy", detail: "Lab-calibrated precision" },
  { value: "2 yr", label: "Battery life", detail: "Replaceable CR1632 cell" },
  { value: "10 min", label: "Setup time", detail: "No mechanic required" },
  { value: "ARAI", label: "Certified", detail: "Automotive safety standard" },
];

export default function PersonalPage() {
  return (
    <div className="bg-white text-[#111827] font-manrope selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                PERSONAL VEHICLE SAFETY
              </div>

              <h1 className="font-manrope text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] leading-[1.05]">
                Know before <span className="text-[#2563EB]">you go.</span>
              </h1>

              <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-2xl">
                Real-time tyre pressure and temperature, right on your phone. Alerts before a puncture. Peace of mind before every drive.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/personal/buy"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-manrope font-bold text-sm transition-all shadow-sm bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:scale-[0.98]"
                >
                  Buy for ₹8,999 <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/personal/features"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-manrope font-bold text-sm transition-all border border-black/15 text-[#111827] bg-transparent hover:bg-black/5 active:scale-[0.98]"
                >
                  Explore Features
                </Link>
              </div>

              {/* App Compatibility note */}
              <div className="flex items-center gap-4 pt-4 text-xs font-medium text-[#6B7280]">
                <span>Available for iOS and Android</span>
                <span>•</span>
                <span>Works on any car or SUV</span>
              </div>
            </div>

            {/* Right Hero Visual: Clean iOS App Interface */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-[40px] bg-gradient-to-b from-white to-[#F3F4F6] border border-black/[0.06] p-7 shadow-[0_30px_80px_rgba(17,24,39,0.12)] space-y-6">
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
                  <div>
                    <div className="text-xs font-semibold text-[#6B7280]">Vehicle</div>
                    <div className="font-manrope text-base font-extrabold text-[#111827]">Priya · Honda City</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    All tyres good
                  </div>
                </div>

                {/* 4-Tyre Visual */}
                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.06] text-center space-y-1 shadow-xs">
                    <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Front Left</div>
                    <div className="font-manrope text-2xl font-extrabold text-[#111827]">32 <span className="text-xs font-normal text-[#6B7280]">PSI</span></div>
                    <div className="text-[11px] font-medium text-[#10B981]">31°C · Optimal</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-black/[0.06] text-center space-y-1 shadow-xs">
                    <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Front Right</div>
                    <div className="font-manrope text-2xl font-extrabold text-[#111827]">32 <span className="text-xs font-normal text-[#6B7280]">PSI</span></div>
                    <div className="text-[11px] font-medium text-[#10B981]">31°C · Optimal</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-black/[0.06] text-center space-y-1 shadow-xs">
                    <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Rear Left</div>
                    <div className="font-manrope text-2xl font-extrabold text-[#111827]">33 <span className="text-xs font-normal text-[#6B7280]">PSI</span></div>
                    <div className="text-[11px] font-medium text-[#10B981]">32°C · Optimal</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-black/[0.06] text-center space-y-1 shadow-xs">
                    <div className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Rear Right</div>
                    <div className="font-manrope text-2xl font-extrabold text-[#111827]">33 <span className="text-xs font-normal text-[#6B7280]">PSI</span></div>
                    <div className="text-[11px] font-medium text-[#10B981]">32°C · Optimal</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/15 text-center">
                  <span className="text-xs font-semibold text-[#2563EB]">
                    BLE 5.0 Connected · Updated 1s ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Personal TPMS Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-14">
            <div className="inline-block font-manrope text-xs font-bold uppercase tracking-[0.15em] text-[#2563EB] mb-2">
              WHY PERSONAL TPMS
            </div>
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              Safety, without the noise.
            </h2>
            <p className="text-[#4B5563] text-lg mt-3 leading-relaxed font-medium">
              Six things a good tyre sensor should do. Personal TPMS does them all. Nothing more, nothing less.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl bg-white border border-black/[0.06] hover:border-[#2563EB]/30 hover:-translate-y-1 transition-all shadow-sm space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#2563EB]/15 flex items-center justify-center text-[#2563EB] shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-manrope text-xl font-bold text-[#111827]">
                    {item.title}
                  </h3>

                  <p className="text-[#4B5563] text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specs at a Glance */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-block font-manrope text-xs font-bold uppercase tracking-[0.15em] text-[#2563EB] mb-2">
              SPECS AT A GLANCE
            </div>
            <h2 className="font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              The details, briefly.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specsAtGlance.map((spec) => (
              <div
                key={spec.label}
                className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm space-y-2 text-center"
              >
                <div className="font-manrope text-3xl sm:text-4xl font-extrabold text-[#2563EB]">
                  {spec.value}
                </div>
                <div className="font-manrope text-base font-bold text-[#111827]">
                  {spec.label}
                </div>
                <div className="text-xs font-medium text-[#6B7280]">
                  {spec.detail}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/personal/specs"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB] hover:underline"
            >
              See complete technical specifications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] border border-[#2563EB]/15 text-center max-w-4xl mx-auto space-y-6 shadow-sm">
            <div className="inline-block font-manrope text-xs font-bold uppercase tracking-[0.15em] text-[#2563EB]">
              READY TO DRIVE SAFE
            </div>

            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              Peace of mind, one tap away.
            </h2>

            <p className="text-[#4B5563] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Real-time tyre monitoring for every personal vehicle. Fits any car or SUV. Ships within 48 hours.
            </p>

            {/* Price block */}
            <div className="inline-flex items-baseline justify-center gap-3 px-6 py-3 rounded-full bg-white border border-black/[0.08] shadow-xs">
              <span className="font-manrope text-3xl sm:text-4xl font-extrabold text-[#111827]">
                ₹8,999
              </span>
              <span className="text-[#6B7280] line-through text-base font-medium">
                ₹12,999
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold">
                Launch pricing
              </span>
            </div>

            <div className="pt-4 flex justify-center">
              <Link
                href="/personal/buy"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-manrope font-bold text-sm uppercase tracking-wider transition-all shadow-md bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:scale-[0.98]"
              >
                Add to cart <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
