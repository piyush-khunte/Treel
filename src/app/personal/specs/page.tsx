import type { Metadata } from "next";
import Link from "next/link";
import { 
  FileText, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Cpu, 
  Smartphone, 
  Car, 
  Award,
  Radio,
  Gauge,
  ShoppingCart
} from "lucide-react";

export const metadata: Metadata = {
  title: "Specifications · Personal TPMS",
  description: "Full technical specifications for Personal TPMS: sensor specs, app requirements, physical specs, warranty, compatibility, certifications. Download spec sheet PDF.",
  alternates: {
    canonical: "https://treel.in/personal/specs",
  },
  openGraph: {
    title: "Specifications · Personal TPMS",
    description: "Full technical specifications for Personal TPMS: sensor specs, app requirements, physical specs, warranty, compatibility, certifications. Download spec sheet PDF.",
    url: "https://treel.in/personal/specs",
  },
};

export default function PersonalSpecsPage() {
  const sensorSpecs = [
    { spec: "Pressure accuracy", value: "±0.5 PSI (±3.4 kPa)" },
    { spec: "Pressure range", value: "0–100 PSI (0–690 kPa)" },
    { spec: "Temperature accuracy", value: "±1°C" },
    { spec: "Temperature range", value: "-30°C to +80°C" },
    { spec: "Update frequency", value: "Every 3 seconds when in motion" },
    { spec: "Wireless protocol", value: "Bluetooth Low Energy 5.0" },
    { spec: "Transmission range", value: "Up to 10 meters" },
    { spec: "Battery", value: "CR1632 (replaceable)" },
    { spec: "Battery life", value: "2 years continuous use" },
    { spec: "Weight per sensor", value: "8 grams" },
    { spec: "Diameter", value: "21 mm" },
    { spec: "Height", value: "8 mm" },
    { spec: "Housing material", value: "Aluminum alloy with polymer O-ring seal" },
    { spec: "Waterproof rating", value: "IP67" },
    { spec: "Certifications", value: "ARAI, BIS Registration" },
    { spec: "Compatible valve stems", value: "Standard Schrader valves (passenger vehicles)" },
  ];

  const appSpecs = [
    { spec: "iOS version", value: "iOS 15 or later" },
    { spec: "Android version", value: "Android 10 or later" },
    { spec: "Storage required", value: "~45 MB" },
    { spec: "Bluetooth", value: "5.0 or later" },
    { spec: "Required permissions", value: "Bluetooth" },
    { spec: "Optional permissions", value: "Notifications, Location (for geofenced alerts)" },
    { spec: "Multi-vehicle support", value: "Up to 5 vehicles per account" },
    { spec: "Trip history retention", value: "Last 30 days" },
    { spec: "Data export", value: "CSV" },
    { spec: "Widgets", value: "iOS 14+, Android 12+" },
    { spec: "Wearable support", value: "Apple Watch, Wear OS" },
  ];

  const warrantySpecs = [
    { spec: "Sensor warranty", value: "1 year full replacement" },
    { spec: "App warranty", value: "Ongoing updates through app store" },
    { spec: "Battery warranty", value: "Not covered (consumable CR1632)" },
    { spec: "Physical damage", value: "Not covered" },
    { spec: "Water damage below IP67 rating", value: "Not covered" },
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              SPECIFICATIONS
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              The full spec sheet.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Everything technical about Personal TPMS. Sensors, app, physical, warranty, compatibility, certifications. Download as PDF at the bottom.
            </p>
          </div>
        </div>
      </section>

      {/* Sensor Specifications Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/15">
                <Gauge className="w-5 h-5" />
              </div>
              <h2 className="font-manrope text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Sensors
              </h2>
            </div>

            <div className="overflow-hidden border border-black/[0.06] rounded-2xl shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#F3F4F6] border-b border-black/[0.06] text-[#111827] text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-4 px-6 w-1/2">Spec</th>
                    <th className="py-4 px-6 w-1/2">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {sensorSpecs.map((row, idx) => (
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

      {/* App Specifications Section */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/15">
                <Smartphone className="w-5 h-5" />
              </div>
              <h2 className="font-manrope text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                App
              </h2>
            </div>

            <div className="overflow-hidden border border-black/[0.06] rounded-2xl shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#F3F4F6] border-b border-black/[0.06] text-[#111827] text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-4 px-6 w-1/2">Spec</th>
                    <th className="py-4 px-6 w-1/2">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {appSpecs.map((row, idx) => (
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

      {/* Warranty Specifications Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/15">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="font-manrope text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Warranty
              </h2>
            </div>

            <div className="overflow-hidden border border-black/[0.06] rounded-2xl shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#F3F4F6] border-b border-black/[0.06] text-[#111827] text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-4 px-6 w-1/2">Spec</th>
                    <th className="py-4 px-6 w-1/2">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {warrantySpecs.map((row, idx) => (
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

      {/* Compatibility Section */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/15">
                <Car className="w-5 h-5" />
              </div>
              <h2 className="font-manrope text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                What Personal TPMS works with
              </h2>
            </div>

            <p className="text-[#4B5563] text-base leading-relaxed font-manrope font-medium">
              Personal TPMS is compatible with any personal vehicle using standard Schrader valve stems. This includes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-black/[0.06] flex items-center gap-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                <span className="font-bold text-[#111827] text-sm">All standard passenger cars (sedan, hatchback, coupe)</span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-black/[0.06] flex items-center gap-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                <span className="font-bold text-[#111827] text-sm">SUVs and crossovers</span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-black/[0.06] flex items-center gap-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                <span className="font-bold text-[#111827] text-sm">MPVs and vans</span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-black/[0.06] flex items-center gap-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                <span className="font-bold text-[#111827] text-sm">Compact commercial vehicles when used for personal transport</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Not compatible with high-pressure commercial vehicle tyres, tractors, agricultural equipment, or vehicles using non-Schrader valve stems (some European sports cars use Presta valves).
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Compliance Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#2563EB]/15">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="font-manrope text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Certifications & compliance
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                <div className="font-extrabold text-[#2563EB] text-lg">ARAI</div>
                <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
                  Automotive Research Association of India certification
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                <div className="font-extrabold text-[#2563EB] text-lg">BIS</div>
                <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
                  Bureau of Indian Standards registration
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                <div className="font-extrabold text-[#2563EB] text-lg">CE</div>
                <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">
                  European conformity marking (for future EU sales)
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/downloads/Treel-Personal-TPMS-SpecSheet.pdf"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-black/15 text-[#111827] font-manrope font-bold text-sm hover:bg-black/5 transition-all cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4 text-[#2563EB]" /> Download spec sheet PDF →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] border border-[#2563EB]/15 text-center max-w-4xl mx-auto space-y-6 shadow-sm">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111827]">
              Ready to protect your car tyres?
            </h2>
            <p className="text-[#4B5563] text-sm sm:text-base font-medium max-w-xl mx-auto">
              Order your 4-tyre smart sensor kit today for ₹8,999. Free pan-India express shipping.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                href="/personal/buy"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-manrope font-bold text-sm uppercase tracking-wider transition-all shadow-md bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
              >
                <ShoppingCart className="w-4 h-4" /> Buy now →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
