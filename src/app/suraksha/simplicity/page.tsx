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
    <div className="space-y-0 bg-[#111315] text-[#FAF7F2] font-rubik">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#E65100] bg-[#E65100]/10 border-[#E65100]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">SIMPLICITY</div>
            <h1 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">PUNCTURE SHOP PE FIT.<br />*CABIN MEIN DEKHO.*</h1>
            <p className="text-[#A3A3A3] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl">Suraksha ka design driver-first hai. Koi app nahi. Koi subscription nahi. Koi mechanic nahi. Just — fit, drive, watch.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">SURAKSHA KYA NAHI CHAHATA</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Simple grid of what's NOT needed (with strikethrough visual):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Item 1: **Smartphone app** — In-cab display standalone hai. Phone ki zaroorat nahi. Older drivers, non-tech users ke liye perfect.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Item 2: **Internet connection** — Sensors aur display RF-based communication use karte hai. WiFi ya mobile data ki zaroorat nahi.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Item 3: **Subscription ya monthly fee** — Ek baar kharidiye. Done. No recurring costs.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Item 4: **Certified mechanic** — Kisi bhi puncture shop wala fit kar deta hai. Truck Wheels centres, JK dealers, roadside puncture shops — sab jaghon installation possible.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Item 5: **Specific tyre brand** — Kisi bhi tyre ke saath kaam karta hai. JK, MRF, Apollo, CEAT, Bridgestone, Michelin, Chinese brands — sab supported.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Item 6: **Truck downtime for installation** — 15 minute mein install ho jata hai. Bahut short window mein fit ho jayega.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">15 MINUTE, 3 STEPS</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Step-by-step visual:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Step 1 (5 min): Display installation</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Display cabin dashboard ya windshield pe mount karo. Wiring truck battery se connect karo. Done.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Step 2 (7 min): Sensor installation</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Har tyre pe ek sensor. Wheel-nut style secure mount. Anti-theft locking. 4 tyres = ~7 minute.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Step 3 (3 min): Pairing + testing</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Display automatically sensors detect karta hai. Har tyre ka pressure check karo. Baseline set ho gaya. Fit hai.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Image: Display mounted in cabin</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Image: Sensor being mounted on wheel</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Image: Display showing all 4 tyres green</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">What Suraksha delivers on</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Badges grid:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>✓ No app required</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>✓ No monthly fees</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>✓ No subscription</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>✓ No mechanic needed</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>✓ Any tyre brand</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>✓ Any truck</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>✓ Any puncture shop</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>✓ 15-minute install</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>✓ 3-year warranty</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>✓ Toll-free + WhatsApp support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Common questions</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Accordion:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Kya sach mein koi app download nahi karni?** · Haan, sach mein nahi. Display standalone hai — sab kuch cabin mein dikhta hai.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Kya WhatsApp ke bina bhi kaam karega?** · Haan. Product operation ke liye WhatsApp nahi chahiye. WhatsApp sirf support ke liye hai (agar aap chahein toh).</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Puncture shop wala install kar dega?** · Haan. Video guide hai, phone support hai. Ek page ka installation manual bhi kit mein aata hai — sab kuch clear hai.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Agar 3 saal baad problem aayi toh?** · Warranty 3 saal ki hai — free replacement. Uske baad new kit affordable price mein available hai.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">SIMPLICITY MATLAB YAHI HAI.</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Kit kharidiye, fit karwaiye, drive kariye. Bas.</p>
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