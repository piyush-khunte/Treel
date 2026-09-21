import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Simplicity" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              SIMPLICITY
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              PUNCTURE SHOP पे FIT.<br /><span className="italic text-[#DC2626]">CABIN में देखो।</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha का design driver-first है। कोई app नहीं। कोई subscription नहीं। कोई mechanic नहीं। Just — fit, drive, watch.
            </p>
          </div>
        </div>
      </section>

      {/* What's Not Needed */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                HASSLE-FREE PROMISE
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                SURAKSHA क्या नहीं चाहता
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
                  In-cab display standalone है। Phone की ज़रूरत नहीं। Older drivers, non-tech users के लिए perfect.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 2: Internet connection
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  Sensors और display RF-based communication use करते हैं। WiFi या mobile data की ज़रूरत नहीं।
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 3: Subscription या monthly fee
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  एक बार खरीदिए। Done. No recurring costs.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 4: Certified mechanic
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  किसी भी puncture shop वाला fit कर देता है। Truck Wheels centres, JK dealers, roadside puncture shops — सब जगह installation possible.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 5: Specific tyre brand
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  किसी भी tyre के साथ काम करता है। JK, MRF, Apollo, CEAT, Bridgestone, Michelin, Chinese brands — सब supported.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] line-through">
                  Item 6: Truck downtime for installation
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  15 minute में install हो जाता है। बहुत short window में fit हो जाएगा।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15 Minute, 3 Steps */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
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
                  Display cabin dashboard या windshield पे mount करो। Wiring truck battery से connect करो। Done.
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
                  हर tyre पे एक sensor. Wheel-nut style secure mount. Anti-theft locking. 4 tyres = ~7 minute.
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
                  Display automatically sensors detect करता है। हर tyre का pressure check करो। Baseline set हो गया। Fit है।
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
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
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
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
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
                  क्या सच में कोई app download नहीं करनी?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  हाँ, सच में नहीं। Display standalone है — सब कुछ cabin में दिखता है।
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  क्या WhatsApp के बिना भी काम करेगा?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  हाँ। Product operation के लिए WhatsApp नहीं चाहिए। WhatsApp सिर्फ support के लिए है (अगर आप चाहें तो)।
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Puncture shop वाला install कर देगा?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  हाँ। Video guide है, phone support है। एक page का installation manual भी kit में आता है — सब कुछ clear है।
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  अगर 3 साल बाद problem आई तो?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Warranty 3 साल की है — free replacement. उसके बाद new kit affordable price में available है।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FEF3C7]">
              SIMPLICITY मतलब यही है।
            </h2>
            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Kit खरीदिए, fit करवाइए, drive करिए। बस।
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