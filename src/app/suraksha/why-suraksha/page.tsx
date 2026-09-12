import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Suraksha  \u00b7  Safety, Savings, Simplicity for Truck Owner-Drivers",
  description: "Three reasons truck owner-drivers install Suraksha. Safety for the driver. Savings for the business. Simplicity for the family. Full breakdown of each pillar.",
  alternates: {
    canonical: "https://treel.in/suraksha/why-suraksha",
  },
  openGraph: {
    title: "Why Suraksha  \u00b7  Safety, Savings, Simplicity for Truck Owner-Drivers",
    description: "Three reasons truck owner-drivers install Suraksha. Safety for the driver. Savings for the business. Simplicity for the family. Full breakdown of each pillar.",
    url: "https://treel.in/suraksha/why-suraksha",
  },
};

export default function SurakshaWhySurakshaPage() {
  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              KYUN SURAKSHA?
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              TEEN PROMISES.<br /><span className="italic text-[#DC2626]">THREE PILLARS.</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Safety, savings, simplicity. Har pillar deep detail mein neeche hai. Padhiye, dekhiye, decide kijiye.
            </p>
          </div>
        </div>
      </section>

      {/* Pillar 1: Safety */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-10 rounded-lg bg-[#FFFBEB] border-3 border-[#DC2626] shadow-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-rubik text-xs font-bold px-3 py-1 rounded-full border border-[#DC2626]/30 bg-[#DC2626]/10 text-[#DC2626]">
                01 · SAFETY
              </span>
              <span className="text-xs font-semibold text-[#78350F]">Colour bar: Suraksha Red</span>
            </div>

            <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal text-[#451A03]">
              FRONT-TYRE BLOWOUTS, PREVENTED.
            </h2>

            <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Pillar header: Body (Hinglish narrative):
            </div>

            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-medium">
              Highway pe front-tyre blowout ka matlab kya hota hai, yeh har truck driver jaanta hai. Truck ka control chala jata hai. Loaded truck 60 km/h par bhi manage karna mushkil hota hai. Aur worst-case scenario mein — perivar ko sirf phone call se pata chalta hai.
            </p>

            <p className="text-[#78350F] text-base leading-relaxed">
              Suraksha ka job simple hai: blowout hone se pehle warn karna. Cabin display har tyre ka pressure aur temperature dikhata hai continuously. Jab kisi tyre mein slow leak hoti hai ya temperature spike karta hai — display red flash karta hai, beep karta hai. Aap ruk sakte hai, tyre check kar sakte hai, safe rah sakte hai.
            </p>

            <div className="pt-2 border-t border-[#451A03]/10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-3">
                Statistics that matter (English for clarity):
              </div>
              <ul className="space-y-2.5 text-sm text-[#451A03]">
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>40% of truck accidents in India involve tyre failures (source: Ministry of Road Transport & Highways data)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>Front-tyre blowouts at 60+ km/h are among the deadliest single-vehicle accidents on Indian highways</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>80% of tyre failures show warning signs 24-48 hours before the actual failure — signs a driver cannot see without a sensor</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <p className="text-[#451A03] text-sm font-semibold">
                The Suraksha promise: Aapko warning milegi 24-48 hours pehle. Bas.
              </p>
            </div>

            <div className="pt-4 border-t-2 border-[#DC2626]/20 flex items-center justify-between flex-wrap gap-4">
              <div className="font-baloo text-2xl font-extrabold text-[#DC2626]">
                आपके परिवार की सुरक्षा
              </div>
              <Link
                href="/suraksha/safety"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-sm bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] transition-all shadow-md"
              >
                Safety details full mein → <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: Savings */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-10 rounded-lg bg-[#FEF3C7] border-3 border-[#EA580C] shadow-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-rubik text-xs font-bold px-3 py-1 rounded-full border border-[#EA580C]/30 bg-[#EA580C]/10 text-[#EA580C]">
                02 · SAVINGS
              </span>
              <span className="text-xs font-semibold text-[#78350F]">Colour bar: Marigold</span>
            </div>

            <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal text-[#451A03]">
              NINE MONTHS MEIN POORI KIMAT WAPAS.
            </h2>

            <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Pillar header: Body (Hinglish narrative):
            </div>

            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-medium">
              Business perspective se dekhein, toh Suraksha ka ROI simple hai. 10-wheeler truck configuration mein ₹17,500 lagte hai. Nine months mein poori kimat wapas.
            </p>

            <p className="text-[#78350F] text-base font-semibold">
              Yeh paisa aata kahaan se hai?
            </p>

            <div className="space-y-3 text-sm text-[#451A03]">
              <p>
                <strong>Fuel savings (5-6%):</strong> Underinflated tyres 5-6% extra fuel consume karte hai. Suraksha ke saath tyres hamesha optimal pressure pe rehte hai. Ek 10-wheeler truck mein monthly fuel expense ₹80,000-₹1,20,000 hota hai — 5% savings matlab ₹4,000-₹6,000 per month.
              </p>
              <p>
                <strong>Tyre life extension (5-7%):</strong> Correct pressure pe tyres 5-7% zyada chalte hai. Ek set tyres ki cost ₹2,00,000-₹3,50,000 hoti hai. 5-7% extension matlab thousands ki savings har tyre cycle mein.
              </p>
              <p>
                <strong>Roadside towing (per event ₹5,000-₹15,000):</strong> Har blowout matlab towing charge, downtime, missed delivery. Ek roadside event save karna matlab kit ka half cost recover.
              </p>
            </div>

            <div className="pt-2 border-t border-[#451A03]/10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-3">
                Nine-month payback calculation:
              </div>
              <ul className="space-y-2 text-sm text-[#451A03]">
                <li className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold">•</span>
                  <span>Fuel savings: ₹4,000-₹6,000 per month × 9 = ₹36,000-₹54,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold">•</span>
                  <span>Tyre life extension: Proportional to km driven, typically ₹1,500-₹3,000 per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold">•</span>
                  <span>Downtime avoidance: Variable, but 1-2 events per year is realistic</span>
                </li>
              </ul>
            </div>

            <p className="text-sm font-semibold text-[#451A03]">
              Total 9-month savings: Typically ₹40,000-₹70,000 vs kit cost of ₹17,500.
            </p>

            <div className="pt-4 border-t-2 border-[#EA580C]/20 flex items-center justify-between flex-wrap gap-4">
              <div className="font-baloo text-3xl font-extrabold text-[#DC2626]">
                पैसा वसूल
              </div>
              <Link
                href="/suraksha/savings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-sm bg-[#EA580C] text-[#FEF3C7] hover:bg-[#C2410C] transition-all shadow-md"
              >
                Savings details full mein → <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: Simplicity */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-10 rounded-lg bg-[#FFFBEB] border-3 border-[#0891B2] shadow-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-rubik text-xs font-bold px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/10 text-[#0891B2]">
                03 · SIMPLICITY
              </span>
              <span className="text-xs font-semibold text-[#78350F]">Colour bar: Ganga Teal</span>
            </div>

            <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal text-[#451A03]">
              PUNCTURE SHOP PE FIT KARO, CABIN MEIN DEKHO.
            </h2>

            <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Pillar header: Body (Hinglish narrative):
            </div>

            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-medium">
              Sabse badi baat: Suraksha simple hai. Koi app nahi. Koi subscription nahi. Koi monthly fee nahi. Kisi mechanic ki zaroorat nahi.
            </p>

            <p className="text-[#78350F] text-base leading-relaxed">
              Kit kharidiye — Truck Wheels centre ya WhatsApp par. Fit karwaiye — kisi bhi puncture shop pe, 15 minute mein. Dekhte rahiye — cabin display har drive pe pressure aur temperature dikhata hai.
            </p>

            <div className="pt-2 border-t border-[#451A03]/10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-3">
                Kya nahi karna:
              </div>
              <ul className="space-y-2 text-sm text-[#451A03]">
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>Koi app download nahi karna</strong> — cabin display standalone hai</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>Koi WiFi connection nahi chahiye</strong> — RF-based communication use hoti hai</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>Koi mechanic nahi chahiye</strong> — puncture shop wala bhi fit kar deta hai</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>Koi tyre brand restriction nahi</strong> — kisi bhi tyre ke saath kaam karta hai</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>Koi monthly fee nahi</strong> — one-time purchase, done</span>
                </li>
              </ul>
            </div>

            <div className="inline-block px-3 py-1 rounded-[4px] bg-[#0891B2]/10 border border-[#0891B2]/30 text-[#0891B2] font-rubik text-xs font-bold">
              No monthly fees. No app needed.
            </div>

            <p className="text-[#78350F] text-sm leading-relaxed">
              Real drivers ka experience: Har mahine hundreds of trucks pe Suraksha install ho raha hai India ke different clusters mein. Sabhi installations puncture shops ya Truck Wheels centres pe. Zero training required. Zero complications.
            </p>

            <div className="pt-4 border-t-2 border-[#0891B2]/20 flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0891B2]">
                SIMPLICITY GUARANTEED
              </div>
              <Link
                href="/suraksha/simplicity"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-sm bg-[#0891B2] text-[#FEF3C7] hover:bg-[#0E7490] transition-all shadow-md"
              >
                Simplicity details full mein → <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FEF3C7]">
              TEEN REASONS. EK KIT.<br />SIRF ₹17,500.
            </h2>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#FEF3C7] text-[#451A03] hover:bg-white active:scale-[0.98]"
              >
                Nearest Centre <ArrowRight className="w-4 h-4 text-[#DC2626]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}