import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Support  \u00b7  Suraksha Customer Support  \u00b7  Toll-Free + WhatsApp",
  description: "Suraksha customer support: toll-free 1800 833 0233, WhatsApp 91120 00174, warranty claims, technical support, and installation help.",
  alternates: {
    canonical: "https://treel.in/suraksha/support",
  },
  openGraph: {
    title: "Support  \u00b7  Suraksha Customer Support  \u00b7  Toll-Free + WhatsApp",
    description: "Suraksha customer support: toll-free 1800 833 0233, WhatsApp 91120 00174, warranty claims, technical support, and installation help.",
    url: "https://treel.in/suraksha/support",
  },
};

export default function SurakshaSupportPage() {
  return (
    <div className="space-y-0 bg-[#111315] text-[#FAF7F2] font-rubik">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#E65100] bg-[#E65100]/10 border-[#E65100]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">SUPPORT</div>
            <h1 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">HELP CHAHIYE?<br />*HUM HAI YAHAN.*</h1>
            <p className="text-[#A3A3A3] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl">Suraksha ka support driver-first hai. Toll-free, WhatsApp, aur FAQs. Jo aap ke liye convenient ho, wahi use kariye.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Three big contact cards:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Card 1 · Toll-Free (largest):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Card 2 · WhatsApp:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Card 3 · Callback request:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Hum aap ko call kar sakte hai. Preferred time aur language mention kariye.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Icon: Phone</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title: TOLL-FREE</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Number: `1800 833 0233` (very large, tap-to-call)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Hours: Monday to Friday · 9:00 AM - 6:00 PM IST</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Action button: `Call Now</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Note: Toll-free India-wide. Regional language support available.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Icon: WhatsApp</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title: WHATSAPP</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Number: `+91 91120 00174</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Hours: 24/7 automated + business hours human</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Action button: `Chat on WhatsApp` → `/suraksha/whatsapp</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Note: Fastest response. Photos aur videos bhi bhej sakte hai.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Icon: Callback</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title: CALLBACK</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Action button: `Request Callback` → `/suraksha/callback</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Category card grid (6 categories):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Category 1 · Installation help:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">15-minute installation guide, video, aur puncture shop guidance</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Category 2 · Product questions:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">How Suraksha works, specifications, compatibility</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Category 3 · Warranty & claims:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">3-year sensor warranty. Claim submission process.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Category 4 · EMI & payment:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Bajaj Finance EMI, payment options, billing questions</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Category 5 · Centres near you:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Truck Wheels centres, dealers, aur puncture shops</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Category 6 · FAQs:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">30+ common questions aur answers</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Icon: wrench</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title: Installation</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Icon: question mark</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title: Product Info</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Icon: shield</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title: Warranty</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Icon: money</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title: EMI & Payment</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Icon: location</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title: Find Centre</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Icon: question</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title: Common Questions</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/suraksha/faqs" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                All FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Common questions</h2>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Accordion (5-6 top questions from `/suraksha/faqs`)</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/suraksha/faqs" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                All FAQs padhiye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">WARRANTY CLAIM</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Sensor ya display mein problem? WhatsApp par yeh 3 cheezein bhejiye aur hum turant help karenge:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Photo of the defective sensor/display (with serial number visible)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Truck registration number</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Description of the problem (Hindi/English/regional — jo comfortable ho)</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                WhatsApp par claim submit kariye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">PROBLEM SOLVED IN MINUTES.</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">WhatsApp par baat kijiye — fastest response.</p>
            <div className="pt-6">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                WhatsApp Kariye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}