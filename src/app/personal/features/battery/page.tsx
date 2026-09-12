import type { Metadata } from "next";
import Link from "next/link";
import { 
  Battery, 
  BatteryCharging, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Wrench, 
  AlertTriangle, 
  Radio, 
  RefreshCw,
  ShoppingCart
} from "lucide-react";

export const metadata: Metadata = {
  title: "2-Year Battery Life · Personal TPMS",
  description: "Personal TPMS sensors run on replaceable CR1632 batteries with 2 years of continuous operation. Low-battery warning six weeks before replacement is needed.",
  alternates: {
    canonical: "https://treel.in/personal/features/battery",
  },
  openGraph: {
    title: "2-Year Battery Life · Personal TPMS",
    description: "Personal TPMS sensors run on replaceable CR1632 batteries with 2 years of continuous operation. Low-battery warning six weeks before replacement is needed.",
    url: "https://treel.in/personal/features/battery",
  },
};

export default function PersonalFeaturesBatteryPage() {
  const replacementSteps = [
    {
      num: "01",
      title: "Unscrew from valve",
      desc: "Remove the sensor and anti-theft hex nut from the tyre valve stem using the provided spanner."
    },
    {
      num: "02",
      title: "Open housing",
      desc: "Open the lightweight aluminum sensor housing with a small Phillips screw on the base."
    },
    {
      num: "03",
      title: "Swap coin cell",
      desc: "Remove the depleted CR1632 cell and slide in the new standard battery with the (+) positive side facing upward."
    },
    {
      num: "04",
      title: "Reseal & mount",
      desc: "Ensure the silicone O-ring is seated snugly. Close the shell and screw the sensor firmly back onto the valve."
    },
    {
      num: "05",
      title: "Automatic re-pairing",
      desc: "The sensor wakes and reconnects automatically with the Treel mobile app within 30 seconds."
    }
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              FEATURE · BATTERY
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              Two years. No surprises.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Personal TPMS sensors run on replaceable CR1632 batteries. Two years of continuous monitoring per sensor. Six-week advance warning before replacement is needed.
            </p>
          </div>
        </div>
      </section>

      {/* Why Two Years Matters Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
                DESIGN PHILOSOPHY
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
                The number you actually want to know.
              </h2>
              <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
                A tyre sensor that runs out of battery mid-drive is worse than no tyre sensor at all — because you have stopped monitoring, but you have also stopped paying attention. Personal TPMS is engineered for two-year battery life so you can pay attention every day for two years, with a clear warning window before replacement.
              </p>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-extrabold text-xl">
                  2 Yrs
                </div>
                <div>
                  <h3 className="font-bold text-[#111827] text-lg">Continuous Monitoring</h3>
                  <p className="text-xs text-[#6B7280]">Standard CR1632 user-replaceable coin cells</p>
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] space-y-3">
                <div className="flex items-start gap-3 text-xs text-[#4B5563] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Ultra-efficient custom Bluetooth 5.0 Low Energy micro-controller</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-[#4B5563] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Available on Amazon, Flipkart, or any local electronics store</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-[#4B5563] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>DIY 5-minute swap with zero specialized tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Preserve Battery & Low Battery Warning */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4 hover:border-[#2563EB]/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-[#111827]">How we get two years out of a CR1632.</h3>
              <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
                The sensors go into low-power mode when the car is stationary. They wake automatically when they detect motion. This "monitor while driving, sleep while parked" pattern is what makes two-year battery life possible on a standard CR1632.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4 hover:border-[#2563EB]/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-[#111827]">The six-week warning window.</h3>
              <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
                When a sensor battery reaches an estimated six weeks of remaining life, the app raises a one-time low-battery warning. You have six weeks to replace the battery (or replace the sensor kit if the battery seal has aged out). No mid-drive surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Battery Replacement Walkthrough */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              MAINTENANCE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              How to replace a battery.
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg">
              CR1632 batteries are available at any electronics retailer or on Amazon and Flipkart. Estimated time: 5 minutes per sensor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {replacementSteps.map((st, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3 hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                <div className="text-2xl font-extrabold text-[#2563EB]">{st.num}</div>
                <h3 className="font-bold text-[#111827] text-base">{st.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Sensor Replacement Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-8 sm:p-12 rounded-[32px] bg-white border border-black/[0.06] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
                LONG-TERM DURABILITY
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                When to replace the whole sensor.
              </h2>
              <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
                After 3–4 battery cycles (6–8 years), the sensor's internal seals age out. At that point, replace the whole sensor. Replacement sensor sets are available through Treel warranty or direct purchase.
              </p>
            </div>

            <Link
              href="/personal/support/warranty"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white font-manrope font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-[0_4px_14px_rgba(37,99,235,0.3)] shrink-0 cursor-pointer"
            >
              Warranty details →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
