import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Simplicity  \u00b7  No App, No Subscription  \u00b7  Suraksha",
  description: "Suraksha is designed for simplicity. No app to download. No monthly subscription. No mechanic needed. 15-minute installation at any puncture shop.",
  alternates: {
    canonical: "https://treel.in/suraksha/simplicity",
  },
  openGraph: {
    title: "Simplicity  \u00b7  No App, No Subscription  \u00b7  Suraksha",
    description: "Suraksha is designed for simplicity. No app to download. No monthly subscription. No mechanic needed. 15-minute installation at any puncture shop.",
    url: "https://treel.in/suraksha/simplicity",
  },
};

export default function SurakshaSimplicityPage() {
  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              SIMPLICITY
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              PUNCTURE SHOP PE FIT.<br /><span className="italic text-[#DC2626]">CABIN MEIN DEKHO.</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha ka design driver-first hai. Koi app nahi. Koi subscription nahi. Koi mechanic nahi. Just — fit, drive, watch.
            </p>
          </div>
        </div>
      </section>

      {/* What's Not Needed */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                HASSLE-FREE PROMISE
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                SURAKSHA KYA NAHI CHAHATA
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Simple grid of what's NOT needed (with strikethrough visual):
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 1: Smartphone app
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  In-cab display standalone hai. Phone ki zaroorat nahi. Older drivers, non-tech users ke liye perfect.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 2: Internet connection
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  Sensors aur display RF-based communication use karte hai. WiFi ya mobile data ki zaroorat nahi.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 3: Subscription ya monthly fee
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  Ek baar kharidiye. Done. No recurring costs.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 4: Certified mechanic
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  Kisi bhi puncture shop wala fit kar deta hai. Truck Wheels centres, JK dealers, roadside puncture shops — sab jaghon installation possible.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 5: Specific tyre brand
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  Kisi bhi tyre ke saath kaam karta hai. JK, MRF, Apollo, CEAT, Bridgestone, Michelin, Chinese brands — sab supported.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 6: Truck downtime for installation
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  15 minute mein install ho jata hai. Bahut short window mein fit ho jayega.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15 Minute, 3 Steps */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                FAST INSTALLATION
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                15 MINUTE, 3 STEPS
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Step-by-step visual:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="font-anton text-2xl text-[#DC2626]">01</div>
                <div className="font-anton text-lg uppercase text-[#451A03]">
                  Step 1 (5 min): Display installation
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Display cabin dashboard ya windshield pe mount karo. Wiring truck battery se connect karo. Done.
                </p>
                <div className="pt-2 text-xs font-semibold text-[#DC2626]">
                  Image: Display mounted in cabin
                </div>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="font-anton text-2xl text-[#EA580C]">02</div>
                <div className="font-anton text-lg uppercase text-[#451A03]">
                  Step 2 (7 min): Sensor installation
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Har tyre pe ek sensor. Wheel-nut style secure mount. Anti-theft locking. 4 tyres = ~7 minute.
                </p>
                <div className="pt-2 text-xs font-semibold text-[#EA580C]">
                  Image: Sensor being mounted on wheel
                </div>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="font-anton text-2xl text-[#0891B2]">03</div>
                <div className="font-anton text-lg uppercase text-[#451A03]">
                  Step 3 (3 min): Pairing + testing
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Display automatically sensors detect karta hai. Har tyre ka pressure check karo. Baseline set ho gaya. Fit hai.
                </p>
                <div className="pt-2 text-xs font-semibold text-[#0891B2]">
                  Image: Display showing all 4 tyres green
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Suraksha Delivers On */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                THE DELIVERABLES
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                What Suraksha delivers on
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Badges grid:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "✓ No app required",
                "✓ No monthly fees",
                "✓ No subscription",
                "✓ No mechanic needed",
                "✓ Any tyre brand",
                "✓ Any truck",
                "✓ Any puncture shop",
                "✓ 15-minute install",
                "✓ 3-year warranty",
                "✓ Toll-free + WhatsApp support",
              ].map((badge) => (
                <div
                  key={badge}
                  className="p-4 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 font-rubik font-semibold text-sm text-[#451A03] shadow-sm flex items-center gap-2"
                >
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>{badge.replace("✓ ", "")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                QUESTIONS
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                Common questions
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Accordion:
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Kya sach mein koi app download nahi karni?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Haan, sach mein nahi. Display standalone hai — sab kuch cabin mein dikhta hai.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Kya WhatsApp ke bina bhi kaam karega?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Haan. Product operation ke liye WhatsApp nahi chahiye. WhatsApp sirf support ke liye hai (agar aap chahein toh).
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Puncture shop wala install kar dega?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Haan. Video guide hai, phone support hai. Ek page ka installation manual bhi kit mein aata hai — sab kuch clear hai.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Agar 3 saal baad problem aayi toh?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Warranty 3 saal ki hai — free replacement. Uske baad new kit affordable price mein available hai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FEF3C7]">
              SIMPLICITY MATLAB YAHI HAI.
            </h2>
            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Kit kharidiye, fit karwaiye, drive kariye. Bas.
            </p>
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