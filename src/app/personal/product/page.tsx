import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Personal TPMS  ·  Product Details  ·  Treel",
  description: "Personal TPMS by Treel. Real-time tyre monitoring for personal vehicles. Kit contents, specifications, warranty, and what makes it different from other TPMS options.",
  alternates: {
    canonical: "https://treel.in/personal/product",
  },
  openGraph: {
    title: "Personal TPMS  ·  Product Details  ·  Treel",
    description: "Personal TPMS by Treel. Real-time tyre monitoring for personal vehicles. Kit contents, specifications, warranty, and what makes it different from other TPMS options.",
    url: "https://treel.in/personal/product",
  },
};

export default function PersonalProductPage() {
  const specs = [
    { spec: "Pressure accuracy", value: "±0.5 PSI" },
    { spec: "Temperature accuracy", value: "±1°C" },
    { spec: "Battery type", value: "CR1632 (replaceable)" },
    { spec: "Battery life", value: "2 years continuous use" },
    { spec: "Update frequency", value: "Every 3 seconds when moving" },
    { spec: "Operating temperature", value: "-30°C to +80°C" },
    { spec: "Weight per sensor", value: "8 grams" },
    { spec: "Wireless protocol", value: "Bluetooth Low Energy 5.0" },
    { spec: "Waterproof rating", value: "IP67" },
    { spec: "App compatibility", value: "iOS 15+ and Android 10+" },
    { spec: "Sensor warranty", value: "1 year full replacement" },
    { spec: "Certification", value: "ARAI" },
  ];

  return (
    <div className="space-y-0 bg-white text-[#111827] font-manrope selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              THE PRODUCT
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              Everything in the box. Nothing you don&apos;t need.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Personal TPMS is a complete tyre monitoring kit for any personal vehicle. Below is exactly what you get, exactly what it does, and exactly what it costs.
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111827]">
              What you get
            </h2>
            <div className="p-8 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] shadow-xs">
              <ul className="space-y-4">
                <li className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>4 wireless tyre pressure sensors (screw-on, valve-stem mount)</span>
                </li>
                <li className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>4 CR1632 batteries (pre-installed)</span>
                </li>
                <li className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Anti-theft locking rings for each sensor</span>
                </li>
                <li className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Sensor installation tool</span>
                </li>
                <li className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Quick-start guide</span>
                </li>
                <li className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Warranty and support card</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111827]">
              Specifications
            </h2>
            <div className="overflow-hidden border border-black/[0.06] rounded-2xl shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#F3F4F6] border-b border-black/[0.06] text-[#111827] text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-4 px-6 w-1/2">Spec</th>
                    <th className="py-4 px-6 w-1/2">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {specs.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}>
                      <td className="py-3.5 px-6 font-bold text-[#111827]">{row.spec}</td>
                      <td className="py-3.5 px-6 text-[#4B5563] font-medium">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* What it fits */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111827]">
              What it fits
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope">
              Personal TPMS works with any personal vehicle using standard passenger tyre valve stems (Schrader valves). That covers:
            </p>
            <div className="p-8 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] shadow-xs">
              <ul className="space-y-4">
                <li className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Sedans, hatchbacks, and SUVs (all major brands)</span>
                </li>
                <li className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>MPVs and crossovers</span>
                </li>
                <li className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>Compact commercial vehicles for personal use</span>
                </li>
                <li className="text-[#6B7280] text-sm sm:text-base leading-relaxed font-manrope pt-2 border-t border-black/[0.06]">
                  <span>Note: Does not fit on high-pressure commercial vehicle tyres or on stems using non-standard valve threads.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Personal TPMS does that OEM TPMS does not */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111827]">
              What Personal TPMS does that OEM TPMS does not
            </h2>
            <div className="p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-4">
              <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope">
                Most modern cars ship with factory TPMS that flags you if a tyre drops significantly below the target pressure. It tells you what happened. It does not tell you what is happening.
              </p>
              <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope">
                Personal TPMS shows you continuously. Every drive, every tyre, every reading. Not just alerts. Continuous visibility. Which is what you actually want when you are on a highway and the tyre pressure is drifting down 0.5 PSI at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1-year warranty */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111827]">
              1-year warranty
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-manrope">
              Every Personal TPMS kit ships with a 1-year full replacement warranty on all four sensors and the app. If a sensor fails within twelve months of purchase, we send a replacement free of charge.
            </p>
            <div className="pt-2">
              <Link href="/personal/support/warranty" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-manrope font-bold text-sm transition-all shadow-sm bg-[#2563EB] text-white hover:bg-[#1D4ED8]">
                Read the full warranty <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to drive safe? */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] border border-[#2563EB]/15 text-center max-w-4xl mx-auto space-y-6 shadow-sm">
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              Ready to drive safe?
            </h2>
            <div className="inline-flex items-baseline justify-center gap-3 px-6 py-3 rounded-full bg-white border border-black/[0.08] shadow-xs">
              <span className="font-manrope text-3xl sm:text-4xl font-extrabold text-[#111827]">
                ₹8,999
              </span>
              <span className="text-[#6B7280] line-through text-base font-medium">
                ₹12,999
              </span>
            </div>
            <div className="pt-2 flex justify-center">
              <Link href="/personal/buy/cart" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-manrope font-bold text-sm uppercase tracking-wider transition-all shadow-md bg-[#2563EB] text-white hover:bg-[#1D4ED8]">
                Add to cart <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}