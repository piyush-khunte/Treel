import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Personal TPMS  \u00b7  Product Details  \u00b7  Treel",
  description: "Personal TPMS by Treel. Real-time tyre monitoring for personal vehicles. Kit contents, specifications, warranty, and what makes it different from other TPMS options.",
  alternates: {
    canonical: "https://treel.in/personal/product",
  },
  openGraph: {
    title: "Personal TPMS  \u00b7  Product Details  \u00b7  Treel",
    description: "Personal TPMS by Treel. Real-time tyre monitoring for personal vehicles. Kit contents, specifications, warranty, and what makes it different from other TPMS options.",
    url: "https://treel.in/personal/product",
  },
};

export default function PersonalProductPage() {
  return (
    <div className="space-y-0 bg-[#0D1B2A] text-[#FAF7F2] font-manrope">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#FF8A00] bg-[#FF8A00]/10 border-[#FF8A00]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">THE PRODUCT</div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Everything in the box. Nothing you don't need.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-manrope max-w-3xl">Personal TPMS is a complete tyre monitoring kit for any personal vehicle. Below is exactly what you get, exactly what it does, and exactly what it costs.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">What you get</h2>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>4 wireless tyre pressure sensors (screw-on, valve-stem mount)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>4 CR1632 batteries (pre-installed)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Anti-theft locking rings for each sensor</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Sensor installation tool</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Quick-start guide</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Warranty and support card</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Specifications</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Spec | Value |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">|---|---|</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Pressure accuracy | ±0.5 PSI |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Temperature accuracy | ±1°C |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Battery type | CR1632 (replaceable) |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Battery life | 2 years continuous use |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Update frequency | Every 3 seconds when moving |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Operating temperature | -30°C to +80°C |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Weight per sensor | 8 grams |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Wireless protocol | Bluetooth Low Energy 5.0 |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Waterproof rating | IP67 |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| App compatibility | iOS 15+ and Android 10+ |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Sensor warranty | 1 year full replacement |</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">| Certification | ARAI |</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">What it fits</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Personal TPMS works with any personal vehicle using standard passenger tyre valve stems (Schrader valves). That covers:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Sedans, hatchbacks, and SUVs (all major brands)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>MPVs and crossovers</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Compact commercial vehicles for personal use</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Note: Does not fit on high-pressure commercial vehicle tyres or on stems using non-standard valve threads.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">What Personal TPMS does that OEM TPMS does not</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Most modern cars ship with factory TPMS that flags you if a tyre drops significantly below the target pressure. It tells you what happened. It does not tell you what is happening.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Personal TPMS shows you continuously. Every drive, every tyre, every reading. Not just alerts. Continuous visibility. Which is what you actually want when you are on a highway and the tyre pressure is drifting down 0.5 PSI at a time.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">1-year warranty</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Every Personal TPMS kit ships with a 1-year full replacement warranty on all four sensors and the app. If a sensor fails within twelve months of purchase, we send a replacement free of charge.</p>
            <div className="pt-6">
              <Link href="/personal/support/warranty" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#FF8A00] text-[#FAF7F2] hover:bg-[#FFA033]">
                Read the full warranty <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Ready to drive safe?</h2>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Price display: `₹8,999` (large) · ~~₹12,999~~ (struck-through)</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/personal/buy/cart" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#FF8A00] text-[#FAF7F2] hover:bg-[#FFA033]">
                Add to cart <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}