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
    <div className="bg-white text-slate-900 font-manrope min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              SPECIFICATIONS
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              The full spec sheet.
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              Everything technical about Personal TPMS. Sensors, app, physical, warranty, compatibility, certifications. Download as PDF at the bottom.
            </p>
          </div>
        </div>
      </section>

      {/* Sensor Specifications Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Gauge className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Sensors
              </h2>
            </div>

            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-700 text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-4 px-6 w-1/2">Spec</th>
                    <th className="py-4 px-6 w-1/2">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {sensorSpecs.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="py-3.5 px-6 font-bold text-slate-700">{row.spec}</td>
                      <td className="py-3.5 px-6 text-slate-900 font-medium">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* App Specifications Section */}
      <section className="py-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                App
              </h2>
            </div>

            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-700 text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-4 px-6 w-1/2">Spec</th>
                    <th className="py-4 px-6 w-1/2">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {appSpecs.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="py-3.5 px-6 font-bold text-slate-700">{row.spec}</td>
                      <td className="py-3.5 px-6 text-slate-900 font-medium">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Specifications Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Warranty
              </h2>
            </div>

            <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-700 text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-4 px-6 w-1/2">Spec</th>
                    <th className="py-4 px-6 w-1/2">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {warrantySpecs.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="py-3.5 px-6 font-bold text-slate-700">{row.spec}</td>
                      <td className="py-3.5 px-6 text-slate-900 font-medium">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="py-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                What Personal TPMS works with
              </h2>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              Personal TPMS is compatible with any personal vehicle using standard Schrader valve stems. This includes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800 text-sm">All standard passenger cars (sedan, hatchback, coupe)</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800 text-sm">SUVs and crossovers</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800 text-sm">MPVs and vans</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800 text-sm">Compact commercial vehicles when used for personal transport</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Not compatible with high-pressure commercial vehicle tyres, tractors, agricultural equipment, or vehicles using non-Schrader valve stems (some European sports cars use Presta valves).
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Compliance Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Certifications & compliance
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-extrabold text-blue-600 text-lg">ARAI</div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Automotive Research Association of India certification
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-extrabold text-blue-600 text-lg">BIS</div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Bureau of Indian Standards registration
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-extrabold text-blue-600 text-lg">CE</div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  European conformity marking (for future EU sales)
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/downloads/Treel-Personal-TPMS-SpecSheet.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-600" /> Download spec sheet PDF →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-blue-600 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Ready to protect your car tyres?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base">
                Order your 4-tyre smart sensor kit today for ₹8,999. Free pan-India express shipping.
              </p>
            </div>
            <Link
              href="/personal/buy"
              className="px-8 py-4 rounded-xl bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Buy now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
