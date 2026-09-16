import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Tv,
  Radio,
  Lock,
  Compass,
  Cable,
  BookOpen,
  Award,
  Sparkles,
  Truck,
  Wrench,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Suraksha Kit · Product Details · In-Cab Display + 4 Tyre Sensors",
  description:
    "Suraksha safety kit for trucks: 1 in-cab display + 4 tyre sensors. ARAI certified. 3-year sensor warranty. Fits any truck, any tyre brand.",
  alternates: {
    canonical: "https://treel.in/suraksha/product",
  },
  openGraph: {
    title: "Suraksha Kit · Product Details · In-Cab Display + 4 Tyre Sensors",
    description:
      "Suraksha safety kit for trucks: 1 in-cab display + 4 tyre sensors. ARAI certified. 3-year sensor warranty. Fits any truck, any tyre brand.",
    url: "https://treel.in/suraksha/product",
  },
};

const kitContents = [
  {
    title: "1 In-cab display",
    desc: "Cabin mein mount hota hai · Real-time pressure aur temperature dikhata hai · No smartphone needed",
    icon: Tv,
  },
  {
    title: "4 Tyre sensors",
    desc: "Har tyre par ek · ARAI certified · 3-year warranty",
    icon: Radio,
  },
  {
    title: "Sensor mounting kit",
    desc: "Wheel-nut style secure mount · Anti-theft locking",
    icon: Lock,
  },
  {
    title: "Display mounting bracket",
    desc: "Cabin dashboard ya windshield mount ke liye",
    icon: Compass,
  },
  {
    title: "Wiring harness",
    desc: "Direct 12V truck battery se connect",
    icon: Cable,
  },
  {
    title: "Quick-start guide",
    desc: "Hindi aur English mein",
    icon: BookOpen,
  },
  {
    title: "Warranty card",
    desc: "Serial numbers aur activation details",
    icon: Award,
  },
];

const technicalSpecs = [
  { spec: "Tyre sensor accuracy", value: "±1 PSI" },
  { spec: "Temperature accuracy", value: "±2°C" },
  { spec: "Sensor battery", value: "Sealed, non-replaceable (3-year design life)" },
  { spec: "Update frequency", value: "Every 3 seconds when moving" },
  { spec: "Display power source", value: "12V truck electrical (direct wired)" },
  { spec: "Display size", value: "3.5-inch colour LCD" },
  { spec: "Wireless protocol", value: "Sub-GHz RF (works better than Bluetooth for truck use)" },
  { spec: "Range", value: "Cabin to farthest tyre (up to 15 meters)" },
  { spec: "Operating temperature", value: "-20°C to +85°C" },
  { spec: "Sensor waterproof rating", value: "IP68" },
  { spec: "Display waterproof rating", value: "IP54 (splash-resistant)" },
  { spec: "Certifications", value: "ARAI, BIS Registration" },
  { spec: "Compatible with", value: "Any truck, any tyre brand" },
  { spec: "Warranty", value: "3 years on sensors, 1 year on display + upgrade kit" },
];

const differentiators = [
  {
    title: "No app required",
    desc: "In-cab display works standalone. No smartphone, no downloading, no updates.",
  },
  {
    title: "No monthly fee",
    desc: "One-time purchase. No subscription. No hidden costs.",
  },
  {
    title: "Any tyre brand",
    desc: "Works with JK, MRF, Apollo, CEAT, Bridgestone, Michelin, or any other brand. Suraksha doesn't care what tyre you use.",
  },
  {
    title: "Puncture shop friendly",
    desc: "Install at any roadside puncture shop. No dealer visit required.",
  },
  {
    title: "3-year warranty",
    desc: "Sensor warranty runs three years, twice the industry standard.",
  },
  {
    title: "Made in India",
    desc: "Made by Treel, backed by five decades of tyre engineering.",
  },
];

export default function SurakshaProductPage() {
  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              THE KIT
            </div>

            <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95] uppercase">
              BOX MEIN KYA HAI?
            </h1>

            <p className="text-[#DC2626] font-rubik text-xl sm:text-2xl font-bold">
              What's inside your Suraksha safety kit.
            </p>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Har kit mein ek in-cab display aur four tyre sensors hote hai. That's it. Kuch aur download nahi karna. Kuch aur subscribe nahi karna. Bas install kariye aur drive kijiye.
            </p>
          </div>
        </div>
      </section>

      {/* Kit Contents */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              KIT MEIN AATA HAI
            </h2>
            <p className="text-[#DC2626] font-rubik text-lg font-bold mt-2">
              What ships in the box
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kitContents.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all space-y-3 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-[4px] bg-[#FEF3C7] border border-[#DC2626]/30 flex items-center justify-center text-[#DC2626]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-rubik text-lg font-bold text-[#451A03]">
                    {item.title}
                  </h3>
                  <p className="text-[#78350F] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
              ENGINEERING DETAILS
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              Technical specifications
            </h2>
          </div>

          <div className="overflow-hidden rounded-lg border-2 border-[#451A03]/15 bg-[#FEF3C7] shadow-md max-w-4xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#451A03]/15 bg-[#451A03] text-[#FEF3C7]">
                  <th className="py-4 px-6 font-anton text-base uppercase tracking-wider">
                    Specification
                  </th>
                  <th className="py-4 px-6 font-anton text-base uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#451A03]/10 text-sm">
                {technicalSpecs.map((row, idx) => (
                  <tr
                    key={row.spec}
                    className={idx % 2 === 0 ? "bg-[#FEF3C7]" : "bg-[#FFFBEB]"}
                  >
                    <td className="py-3.5 px-6 font-semibold text-[#451A03]">
                      {row.spec}
                    </td>
                    <td className="py-3.5 px-6 text-[#78350F] font-mono font-medium">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What makes Suraksha different */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              SURAKSHA KYA ALAG KARTA HAI?
            </h2>
            <p className="text-[#DC2626] font-rubik text-lg font-bold mt-2">
              What Suraksha does that others don't.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((diff) => (
              <div
                key={diff.title}
                className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all space-y-3 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <h3 className="font-rubik text-lg font-bold text-[#451A03]">
                    {diff.title}
                  </h3>
                </div>
                <p className="text-[#78350F] text-sm leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-12 rounded-lg bg-[#FEF3C7] border-3 border-[#DC2626] max-w-4xl space-y-6 shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase">
              <Award className="w-4 h-4" /> GUARANTEED REPLACEMENT
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl font-normal text-[#451A03] uppercase">
              3-SAAL KI WARRANTY
            </h2>

            <p className="text-[#DC2626] font-rubik text-lg font-bold">
              3-year warranty on tyre sensors
            </p>

            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
              Har sensor par teen saal ki full replacement warranty. Agar sensor kharaab ho jaye toh naya bhej denge. Display aur upgrade kit par ek saal ki warranty.
            </p>

            <div className="pt-4 border-t-2 border-[#DC2626]/20 text-xs font-semibold text-[#78350F]">
              Note: Warranty covers manufacturing defects. Does not cover physical damage, tampering, or vehicle accidents.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton text-5xl sm:text-6xl font-normal tracking-tight text-[#FEF3C7] uppercase">
              READY TO INSTALL?
            </h2>

            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
              Nearest Truck Wheels centre find kariye ya WhatsApp par baat kariye.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#FEF3C7] text-[#451A03] hover:bg-white active:scale-[0.98]"
              >
                Nearest Centre <ArrowRight className="w-5 h-5 text-[#DC2626]" />
              </Link>
              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all border-2 border-[#FEF3C7] text-[#FEF3C7] hover:bg-white/10 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Kariye
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
