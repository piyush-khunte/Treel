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
    <div className="space-y-0 bg-[#111315] text-[#FAF7F2] font-rubik">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#E65100] bg-[#E65100]/10 border-[#E65100]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">KYUN SURAKSHA?</div>
            <h1 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">TEEN PROMISES.<br />*THREE PILLARS.*</h1>
            <p className="text-[#A3A3A3] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl">Safety, savings, simplicity. Har pillar deep detail mein neeche hai. Padhiye, dekhiye, decide kijiye.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Pillar header:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Body (Hinglish narrative):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Highway pe front-tyre blowout ka matlab kya hota hai, yeh har truck driver jaanta hai. Truck ka control chala jata hai. Loaded truck 60 km/h par bhi manage karna mushkil hota hai. Aur worst-case scenario mein — perivar ko sirf phone call se pata chalta hai.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Suraksha ka job simple hai: blowout hone se pehle warn karna. Cabin display har tyre ka pressure aur temperature dikhata hai continuously. Jab kisi tyre mein slow leak hoti hai ya temperature spike karta hai — display red flash karta hai, beep karta hai. Aap ruk sakte hai, tyre check kar sakte hai, safe rah sakte hai.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Statistics that matter (English for clarity):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">The Suraksha promise: Aapko warning milegi 24-48 hours pehle. Bas.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">CTA: `Safety details full mein  →` → `/suraksha/safety`</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Number-eyebrow: `01  ·  SAFETY</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Colour bar: Suraksha Red</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title (Anton caps): FRONT-TYRE BLOWOUTS, PREVENTED.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Devanagari accent: **आपके परिवार की सुरक्षा**</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>40% of truck accidents in India involve tyre failures (source: Ministry of Road Transport & Highways data)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Front-tyre blowouts at 60+ km/h are among the deadliest single-vehicle accidents on Indian highways</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>80% of tyre failures show warning signs 24-48 hours before the actual failure — signs a driver cannot see without a sensor</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Pillar header:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Body (Hinglish narrative):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Business perspective se dekhein, toh Suraksha ka ROI simple hai. 10-wheeler truck configuration mein ₹17,500 lagte hai. Nine months mein poori kimat wapas.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Yeh paisa aata kahaan se hai?</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Fuel savings (5-6%):** Underinflated tyres 5-6% extra fuel consume karte hai. Suraksha ke saath tyres hamesha optimal pressure pe rehte hai. Ek 10-wheeler truck mein monthly fuel expense ₹80,000-₹1,20,000 hota hai — 5% savings matlab ₹4,000-₹6,000 per month.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Tyre life extension (5-7%):** Correct pressure pe tyres 5-7% zyada chalte hai. Ek set tyres ki cost ₹2,00,000-₹3,50,000 hoti hai. 5-7% extension matlab thousands ki savings har tyre cycle mein.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Roadside towing (per event ₹5,000-₹15,000):** Har blowout matlab towing charge, downtime, missed delivery. Ek roadside event save karna matlab kit ka half cost recover.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Nine-month payback calculation:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Total 9-month savings: Typically ₹40,000-₹70,000 vs kit cost of ₹17,500. **पैसा वसूल** (Baloo 2 accent).</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">CTA: `Savings details full mein  →` → `/suraksha/savings`</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Number-eyebrow: `02  ·  SAVINGS</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Colour bar: Marigold</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title (Anton caps): NINE MONTHS MEIN POORI KIMAT WAPAS.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Devanagari accent: **पैसा वसूल**</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Fuel savings: ₹4,000-₹6,000 per month × 9 = ₹36,000-₹54,000</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Tyre life extension: Proportional to km driven, typically ₹1,500-₹3,000 per month</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Downtime avoidance: Variable, but 1-2 events per year is realistic</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Pillar header:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Body (Hinglish narrative):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Sabse badi baat: Suraksha simple hai. Koi app nahi. Koi subscription nahi. Koi monthly fee nahi. Kisi mechanic ki zaroorat nahi.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Kit kharidiye — Truck Wheels centre ya WhatsApp par. Fit karwaiye — kisi bhi puncture shop pe, 15 minute mein. Dekhte rahiye — cabin display har drive pe pressure aur temperature dikhata hai.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Kya nahi karna:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Trust badge (English): **No monthly fees. No app needed.**</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Real drivers ka experience: Har mahine hundreds of trucks pe Suraksha install ho raha hai India ke different clusters mein. Sabhi installations puncture shops ya Truck Wheels centres pe. Zero training required. Zero complications.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">CTA: `Simplicity details full mein  →` → `/suraksha/simplicity`</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Number-eyebrow: `03  ·  SIMPLICITY</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Colour bar: Ganga Teal</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title (Anton caps): PUNCTURE SHOP PE FIT KARO, CABIN MEIN DEKHO.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Koi app download nahi karna** — cabin display standalone hai</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Koi WiFi connection nahi chahiye** — RF-based communication use hoti hai</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Koi mechanic nahi chahiye** — puncture shop wala bhi fit kar deta hai</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Koi tyre brand restriction nahi** — kisi bhi tyre ke saath kaam karta hai</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Koi monthly fee nahi** — one-time purchase, done</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">TEEN REASONS. EK KIT.<br />SIRF ₹17,500.</h2>
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