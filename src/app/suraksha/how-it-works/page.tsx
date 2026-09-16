import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Suraksha Kaise Install Karein  \u00b7  How Suraksha Works",
  description: "Suraksha safety kit install karne mein 15 minute lagte hai. Puncture shop ya Truck Wheels centre par install ho jata hai. Full step-by-step guide.",
  alternates: {
    canonical: "https://treel.in/suraksha/how-it-works",
  },
  openGraph: {
    title: "Suraksha Kaise Install Karein  \u00b7  How Suraksha Works",
    description: "Suraksha safety kit install karne mein 15 minute lagte hai. Puncture shop ya Truck Wheels centre par install ho jata hai. Full step-by-step guide.",
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
              KAISE KAAM KARTA HAI
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              PANDRAH MINUTE.<br /><span className="italic text-[#DC2626]">BAS ITNA HI.</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha ka install hona bahut simple hai. Koi mechanic nahi chahiye. Sirf ek puncture shop ya Truck Wheels centre chalein aur pandrah minute mein kaam ho jayega.
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
                <span>Video caption (Hinglish): 3-minute installation walkthrough — Hindi mein narrated</span>
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
                TEEN STEPS. TEEN MINUTE. FIT.
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
                  <div className="font-anton text-xl uppercase text-[#451A03]">KIT KHARIDIYE</div>
                  <p className="text-[#78350F] text-sm leading-relaxed">
                    Truck Wheels centre par jaakar kit uthaiye. Ya WhatsApp par order kariye — home delivery ho jayegi. EMI available on Bajaj Finance.
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
                  <div className="font-anton text-xl uppercase text-[#451A03]">FIT KARWAIYE</div>
                  <p className="text-[#78350F] text-sm leading-relaxed">
                    Kisi bhi puncture shop ya Truck Wheels centre par le jaiye. Fifteen minute mein: display cabin mein install, four sensors tyres pe fit, wiring done. Bas.
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
                  <div className="font-anton text-xl uppercase text-[#451A03]">DEKHTE RAHIYE</div>
                  <p className="text-[#78350F] text-sm leading-relaxed">
                    Display cabin mein aapko har tyre ka pressure aur temperature dikhata rahega. Koi problem ho toh display beep karega. That's it — koi app nahi, koi subscription nahi.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#451A03]/10 text-xs font-bold text-[#0891B2] uppercase">
                  Time: Har drive
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
                DISPLAY MEIN KYA DIKHTA HAI?
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
                  `ALL OK` (green) ya alert message (red)
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
                ALERTS JO AAYENGE
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
                  <div className="pt-2 border-t border-[#451A03]/10 font-bold text-[#DC2626]">Action: Ruk kar tyre check kariye</div>
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
                  <div className="pt-2 border-t border-[#451A03]/10 font-bold text-[#EA580C]">Action: Speed kam kariye. Next stop pe inspect kariye</div>
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
                  <div className="pt-2 border-t border-[#451A03]/10 font-bold text-[#DC2626]">Action: Turant ruk kar side mein le jaiye</div>
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
                DHYAAN RAKHNE KI BAATEIN
              </h2>
              <p className="text-[#78350F] text-lg mt-2 font-medium">
                Simple maintenance tips
              </p>
            </div>

            <div className="p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Har tyre rotation ke saath sensors ko wapas correct position mein assign kariye</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Sensor par mud accumulate ho jaye toh wet cloth se saaf kariye</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Display screen ko direct sunlight se protect kariye jab possible ho</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Battery kharaab hone se pehle 3 saal wale replacement window mein sensor replace karwaiye</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Koi problem ho toh WhatsApp par photo bhejiye — hum guide kar denge</span>
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
                  Kya koi bhi tyre brand ke saath kaam karta hai?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Haan. Suraksha kisi bhi tyre brand ke saath kaam karta hai. JK, MRF, Apollo, CEAT, Bridgestone, Michelin — sab supported.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Kya rotation ke baad sensors dobara install karne hoge?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Nahi. Sensors wahi rehte hai, sirf tyre ki position badalti hai. Display mein position update kar dijiye.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Kya WhatsApp par bhi support milta hai?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Haan. WhatsApp par 24 hours support available. Toll-free bhi hai for business hours.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Kitne trucks pe ek kit use kar sakte hai?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Ek kit ek truck ke liye hai. Multiple trucks ke liye multiple kits chahiye. Bulk discount available — WhatsApp kariye.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Kya sensor gum ho jaye toh replacement milta hai?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Warranty period mein manufacturing defect ke liye haan. Physical loss ya theft ke liye replacement kit alag purchase karni hoti hai.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/suraksha/faqs"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C]"
              >
                Full FAQs padhiye <ArrowRight className="w-4 h-4" />
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