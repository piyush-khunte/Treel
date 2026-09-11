import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

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
    <div className="space-y-0 bg-[#111315] text-[#FAF7F2] font-rubik">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#E65100] bg-[#E65100]/10 border-[#E65100]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">SAFETY</div>
            <h1 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">BLOWOUT SE PEHLE<br />*WARNING MILTI HAI.*</h1>
            <p className="text-[#A3A3A3] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl">Highway pe front-tyre blowout — yeh accident nahi hota, yeh tragedy hoti hai. Suraksha ka job usse rokna hai. Warning aati hai, aap ruk sakte hai, safe reh sakte hai.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">SURAKSHA KYA DETECT KARTA HAI?</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Three categories with examples:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Category 1 · Slow leaks:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Category 2 · Temperature spikes:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Category 3 · Rapid deflation:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>What: Pressure gradually drops over hours (nail puncture, valve leak, sidewall crack)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Warning window: Usually 12-48 hours before critical failure</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Display shows: Yellow pressure indicator, gradual decrease alert</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>What: Tyre temperature rises abnormally (overloading, prolonged high-speed driving, internal damage, brake dragging)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Warning window: Immediate — as temperature rises, display shows warning</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Display shows: Orange or red temperature indicator, high-temp beep</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>What: Sudden pressure drop (large puncture, valve failure, sidewall cut)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Warning window: Seconds to minutes before complete tyre failure</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Display shows: Red flashing alert, continuous alarm — pull over immediately</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">REAL DRIVER STORIES</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Story 1:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Story 2:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Story 3:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Driver: Narender K. · North India route</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Quote: "Highway drive from Pune to Mumbai, mujhe slow leak warning aayi front-right tyre par. Pull kar ke ruka, aur wahaan nail lag gaya tha. Agar mai chalta rehta toh 100 km/h par blowout ho jata. Suraksha ne family ke saath ghar wapas laane mein help kiya."</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Driver:</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Driver:</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">NUMBERS JO IMPORTANT HAI</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Data cards (English for clarity in citation):</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**40%** of truck accidents in India involve tyre failures (Source: Ministry of Road Transport & Highways)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**80%** of tyre failures show warning signs 24-48 hours in advance</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**60 km/h** is the typical loaded truck highway speed where a blowout becomes life-threatening</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**60%** of tyre-related fatalities are preventable with monitoring (industry estimates)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">AAPKE PARIVAR KE LIYE</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Body (Hinglish, emotional register):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Har driver ke ghar mein koi wait kar raha hota hai. Wife, bachche, budhe maa-baap. Har trip ka matlab hota hai unke liye ghar wapas aana. Suraksha ka core purpose yahi hai — aapko ghar wapas laana.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Product features baad mein aati hai. Pehle yeh baat — Suraksha aapke parivar ke liye hai.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Devanagari accent: **हर ट्रिप घर वापस आना।**</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">APNE PARIVAR KE LIYE INSTALL KARO.</h2>
            <div className="pt-6">
              <Link href="/suraksha/centres" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                Nearest Centre <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}