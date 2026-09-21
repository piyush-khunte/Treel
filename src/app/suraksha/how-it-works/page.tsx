import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Suraksha कैसे Install करें  ·  How Suraksha Works",
  description: "Suraksha safety kit install करने में 15 minute लगते हैं। Puncture shop या Truck Wheels centre पर install हो जाता है। Full step-by-step guide.",
  alternates: {
    canonical: "https://treel.in/suraksha/how-it-works",
  },
  openGraph: {
    title: "Suraksha कैसे Install करें  ·  How Suraksha Works",
    description: "Suraksha safety kit install करने में 15 minute लगते हैं। Puncture shop या Truck Wheels centre पर install हो जाता है। Full step-by-step guide.",
    url: "https://treel.in/suraksha/how-it-works",
  },
};

export default function SurakshaHowItWorksPage() {
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
                { label: "How It Works" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              कैसे काम करता है
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              पंद्रह MINUTE.<br /><span className="italic text-[#DC2626]">बस इतना ही।</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha का install होना बहुत simple है। कोई mechanic नहीं चाहिए। सिर्फ एक puncture shop या Truck Wheels centre चलें और पंद्रह minute में काम हो जाएगा।
            </p>
          </div>
        </div>
      </section>

      {/* Video Placeholder Section */}
      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-4">
            <ul className="space-y-3">
              <li className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Video player: [DEV: Embed installation video when produced. Placeholder with play button.]</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Video caption: 3-minute installation walkthrough — Hindi में narrated</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Three Steps Section */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                INSTALLATION PROCESS
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                तीन STEPS. तीन MINUTE. FIT.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#78350F] font-bold text-sm">
              <p className="p-3 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/10">Step 1 · Buy:</p>
              <p className="p-3 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/10">Step 2 · Install:</p>
              <p className="p-3 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/10">Step 3 · Monitor:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Step 1 */}
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="font-anton text-3xl text-[#DC2626]">01</div>
                  <div className="font-anton text-xl uppercase text-[#451A03]">KIT खरीदिए</div>
                  <p className="text-[#78350F] text-sm leading-relaxed">
                    Truck Wheels centre पर जाकर kit उठाइए। या WhatsApp पर order करिए — home delivery हो जाएगी। EMI available on Bajaj Finance।
                  </p>
                </div>
                <div className="pt-3 border-t border-[#451A03]/10 text-xs font-bold text-[#DC2626] uppercase">
                  Time: 5-10 minute
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="font-anton text-3xl text-[#EA580C]">02</div>
                  <div className="font-anton text-xl uppercase text-[#451A03]">FIT करवाइए</div>
                  <p className="text-[#78350F] text-sm leading-relaxed">
                    किसी भी puncture shop या Truck Wheels centre पर ले जाइए। Fifteen minute में: display cabin में install, four sensors tyres पे fit, wiring done. बस।
                  </p>
                </div>
                <div className="pt-3 border-t border-[#451A03]/10 text-xs font-bold text-[#EA580C] uppercase">
                  Time: 15 minute
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="font-anton text-3xl text-[#0891B2]">03</div>
                  <div className="font-anton text-xl uppercase text-[#451A03]">देखते रहिए</div>
                  <p className="text-[#78350F] text-sm leading-relaxed">
                    Display cabin में आपको हर tyre का pressure और temperature दिखाता रहेगा। कोई problem हो तो display beep करेगा। That's it — कोई app नहीं, कोई subscription नहीं।
                  </p>
                </div>
                <div className="pt-3 border-t border-[#451A03]/10 text-xs font-bold text-[#0891B2] uppercase">
                  Time: हर drive
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Display Section */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                IN-CAB EXPERIENCE
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                DISPLAY में क्या दिखता है?
              </h2>
              <p className="text-[#78350F] text-lg mt-2 font-medium">
                What the in-cab display shows you.
              </p>
            </div>

            <div className="p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-6">
              <div className="text-sm font-semibold text-[#78350F] border-b border-[#451A03]/10 pb-3">
                Display screenshot description + labels:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="p-4 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/10 text-sm text-[#451A03]">
                  <span className="font-bold text-[#DC2626] block mb-1">Top row:</span>
                  `ALL OK` (green) या alert message (red)
                </li>
                <li className="p-4 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/10 text-sm text-[#451A03]">
                  <span className="font-bold text-[#EA580C] block mb-1">Center:</span>
                  Truck outline with 4 tyre positions
                </li>
                <li className="p-4 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/10 text-sm text-[#451A03]">
                  <span className="font-bold text-[#0891B2] block mb-1">Each tyre position shows:</span>
                  pressure (PSI), temperature (°C), status colour (green/yellow/red)
                </li>
                <li className="p-4 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/10 text-sm text-[#451A03]">
                  <span className="font-bold text-[#78350F] block mb-1">Bottom:</span>
                  Alert history (last 3 events)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts Jo Aayenge */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                ALERT SYSTEM
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                ALERTS जो आएंगे
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Alert 1 */}
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#DC2626] space-y-4 shadow-sm">
                <div className="inline-block px-2.5 py-1 rounded-[4px] bg-[#DC2626]/10 text-[#DC2626] font-anton text-sm uppercase">
                  PRESSURE LOW
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-[#451A03]"><strong>Trigger:</strong> Tyre pressure drops below safe threshold</div>
                  <div className="text-[#78350F]"><strong>Display shows:</strong> Red flashing on affected tyre + beep sound</div>
                  <div className="pt-2 border-t border-[#451A03]/10 font-bold text-[#DC2626]">Action: रुक कर tyre check करिए</div>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#EA580C] space-y-4 shadow-sm">
                <div className="inline-block px-2.5 py-1 rounded-[4px] bg-[#EA580C]/10 text-[#EA580C] font-anton text-sm uppercase">
                  TEMPERATURE HIGH
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-[#451A03]"><strong>Trigger:</strong> Tyre temperature exceeds safe range (usually 85°C+)</div>
                  <div className="text-[#78350F]"><strong>Display shows:</strong> Orange flashing + tone</div>
                  <div className="pt-2 border-t border-[#451A03]/10 font-bold text-[#EA580C]">Action: Speed कम करिए। Next stop पे inspect करिए</div>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#DC2626] space-y-4 shadow-sm">
                <div className="inline-block px-2.5 py-1 rounded-[4px] bg-[#DC2626]/10 text-[#DC2626] font-anton text-sm uppercase">
                  RAPID DEFLATION
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-[#451A03]"><strong>Trigger:</strong> Pressure drops rapidly (puncture indicator)</div>
                  <div className="text-[#78350F]"><strong>Display shows:</strong> Red flashing + continuous alarm</div>
                  <div className="pt-2 border-t border-[#451A03]/10 font-bold text-[#DC2626]">Action: तुरंत रुक कर side में ले जाइए</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Tips */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                CARE & MAINTENANCE
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                ध्यान रखने की बातें
              </h2>
              <p className="text-[#78350F] text-lg mt-2 font-medium">
                Simple maintenance tips
              </p>
            </div>

            <div className="p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>हर tyre rotation के साथ sensors को वापस correct position में assign करिए</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Sensor पर mud accumulate हो जाए तो wet cloth से साफ़ करिए</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Display screen को direct sunlight से protect करिए जब possible हो</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Battery ख़राब होने से पहले 3 साल वाले replacement window में sensor replace करवाइए</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>कोई problem हो तो WhatsApp पर photo भेजिए — हम guide कर देंगे</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
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
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  क्या कोई भी tyre brand के साथ काम करता है?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  हाँ। Suraksha किसी भी tyre brand के साथ काम करता है। JK, MRF, Apollo, CEAT, Bridgestone, Michelin — सब supported।
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  क्या rotation के बाद sensors दोबारा install करने होंगे?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  नहीं। Sensors वही रहते हैं, सिर्फ tyre की position बदलती है। Display में position update कर दीजिए।
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  क्या WhatsApp पर भी support मिलता है?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  हाँ। WhatsApp पर 24 hours support available. Toll-free भी है for business hours।
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  कितने trucks पे एक kit use कर सकते हैं?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  एक kit एक truck के लिए है। Multiple trucks के लिए multiple kits चाहिए। Bulk discount available — WhatsApp करिए।
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  क्या sensor गुम हो जाए तो replacement मिलता है?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Warranty period में manufacturing defect के लिए हाँ। Physical loss या theft के लिए replacement kit अलग purchase करनी होती है।
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/suraksha/faqs"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C]"
              >
                Full FAQs पढ़िए <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to install CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl font-normal tracking-tight text-[#FEF3C7]">
              READY TO INSTALL?
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