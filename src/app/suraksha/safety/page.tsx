import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Truck Safety  \u00b7  Front-Tyre Blowouts Prevented  \u00b7  Suraksha",
  description: "Prevent front-tyre blowouts before they happen. Suraksha real-time pressure and temperature monitoring alerts you 24-48 hours before a tyre fails. For your family's safety.",
  alternates: {
    canonical: "https://treel.in/suraksha/safety",
  },
  openGraph: {
    title: "Truck Safety  \u00b7  Front-Tyre Blowouts Prevented  \u00b7  Suraksha",
    description: "Prevent front-tyre blowouts before they happen. Suraksha real-time pressure and temperature monitoring alerts you 24-48 hours before a tyre fails. For your family's safety.",
    url: "https://treel.in/suraksha/safety",
  },
};

export default function SurakshaSafetyPage() {
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
                { label: "Safety" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              SAFETY
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              BLOWOUT SE PEHLE<br /><span className="italic text-[#DC2626]">WARNING MILTI HAI.</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Highway pe front-tyre blowout — yeh accident nahi hota, yeh tragedy hoti hai. Suraksha ka job usse rokna hai. Warning aati hai, aap ruk sakte hai, safe reh sakte hai.
            </p>
          </div>
        </div>
      </section>

      {/* Detection Categories */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                DETECTION SYSTEM
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                SURAKSHA KYA DETECT KARTA HAI?
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Three categories with examples:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category 1 */}
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-4">
                <div className="font-anton text-xl uppercase text-[#451A03]">
                  Category 1 · Slow leaks:
                </div>
                <div className="space-y-2 text-sm text-[#78350F]">
                  <div><strong className="text-[#451A03]">What:</strong> Pressure gradually drops over hours (nail puncture, valve leak, sidewall crack)</div>
                  <div><strong className="text-[#451A03]">Warning window:</strong> Usually 12-48 hours before critical failure</div>
                  <div><strong className="text-[#451A03]">Display shows:</strong> Yellow pressure indicator, gradual decrease alert</div>
                </div>
              </div>

              {/* Category 2 */}
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#EA580C] transition-all shadow-sm space-y-4">
                <div className="font-anton text-xl uppercase text-[#451A03]">
                  Category 2 · Temperature spikes:
                </div>
                <div className="space-y-2 text-sm text-[#78350F]">
                  <div><strong className="text-[#451A03]">What:</strong> Tyre temperature rises abnormally (overloading, prolonged high-speed driving, internal damage, brake dragging)</div>
                  <div><strong className="text-[#451A03]">Warning window:</strong> Immediate — as temperature rises, display shows warning</div>
                  <div><strong className="text-[#451A03]">Display shows:</strong> Orange or red temperature indicator, high-temp beep</div>
                </div>
              </div>

              {/* Category 3 */}
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-4">
                <div className="font-anton text-xl uppercase text-[#451A03]">
                  Category 3 · Rapid deflation:
                </div>
                <div className="space-y-2 text-sm text-[#78350F]">
                  <div><strong className="text-[#451A03]">What:</strong> Sudden pressure drop (large puncture, valve failure, sidewall cut)</div>
                  <div><strong className="text-[#451A03]">Warning window:</strong> Seconds to minutes before complete tyre failure</div>
                  <div><strong className="text-[#451A03]">Display shows:</strong> Red flashing alert, continuous alarm — pull over immediately</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Stories */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                TESTIMONIALS
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                REAL DRIVER STORIES
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  Story 1: Driver: Narender K. · North India route
                </div>
                <p className="text-base text-[#451A03] italic font-medium leading-relaxed">
                  "Highway drive from Pune to Mumbai, mujhe slow leak warning aayi front-right tyre par. Pull kar ke ruka, aur wahaan nail lag gaya tha. Agar mai chalta rehta toh 100 km/h par blowout ho jata. Suraksha ne family ke saath ghar wapas laane mein help kiya."
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                  Story 2: Driver:
                </div>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                  Story 3: Driver:
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                STATISTICS
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                NUMBERS JO IMPORTANT HAI
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Data cards (English for clarity in citation):
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626]/20 shadow-sm space-y-2">
                <div className="font-anton text-4xl text-[#DC2626]">40%</div>
                <p className="text-sm text-[#451A03] font-medium leading-relaxed">
                  of truck accidents in India involve tyre failures (Source: Ministry of Road Transport & Highways)
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626]/20 shadow-sm space-y-2">
                <div className="font-anton text-4xl text-[#DC2626]">80%</div>
                <p className="text-sm text-[#451A03] font-medium leading-relaxed">
                  of tyre failures show warning signs 24-48 hours in advance
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626]/20 shadow-sm space-y-2">
                <div className="font-anton text-4xl text-[#EA580C]">60 km/h</div>
                <p className="text-sm text-[#451A03] font-medium leading-relaxed">
                  is the typical loaded truck highway speed where a blowout becomes life-threatening
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626]/20 shadow-sm space-y-2">
                <div className="font-anton text-4xl text-[#0891B2]">60%</div>
                <p className="text-sm text-[#451A03] font-medium leading-relaxed">
                  of tyre-related fatalities are preventable with monitoring (industry estimates)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Promise */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-12 rounded-lg bg-[#FEF3C7] border-3 border-[#DC2626] max-w-4xl space-y-6 shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase">
              FAMILY FIRST
            </div>

            <h2 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl font-normal text-[#451A03]">
              AAPKE PARIVAR KE LIYE
            </h2>

            <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Body (Hinglish, emotional register):
            </div>

            <p className="text-[#451A03] text-lg sm:text-xl leading-relaxed font-medium">
              Har driver ke ghar mein koi wait kar raha hota hai. Wife, bachche, budhe maa-baap. Har trip ka matlab hota hai unke liye ghar wapas aana. Suraksha ka core purpose yahi hai — aapko ghar wapas laana.
            </p>

            <p className="text-[#78350F] text-base leading-relaxed">
              Product features baad mein aati hai. Pehle yeh baat — Suraksha aapke parivar ke liye hai.
            </p>

            <div className="pt-4 border-t-2 border-[#DC2626]/20">
              <div className="text-xs font-semibold text-[#78350F] mb-1">Devanagari accent:</div>
              <div className="font-baloo text-3xl font-extrabold text-[#DC2626]">
                हर ट्रिप घर वापस आना।
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
              APNE PARIVAR KE LIYE INSTALL KARO.
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