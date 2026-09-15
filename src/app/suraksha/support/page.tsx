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
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      <section className="relative overflow-hidden pt-16 pb-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              SUPPORT
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              HELP CHAHIYE?<br />
              <span className="italic text-[#DC2626]">*HUM HAI YAHAN.*</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl font-medium">
              Suraksha ka support driver-first hai. Toll-free, WhatsApp, aur FAQs. Jo aap ke liye convenient ho, wahi use kariye.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-bold">Three big contact cards:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Card 1 · Toll-Free (largest):</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Card 2 · WhatsApp:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Card 3 · Callback request:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">Hum aap ko call kar sakte hai. Preferred time aur language mention kariye.</p>
            <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
              <ul className="space-y-3">
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: Phone</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Title: TOLL-FREE</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Number: <code className="font-mono bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#451A03]/20 text-[#451A03] font-bold text-xl">1800 833 0233</code> (very large, tap-to-call)</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Hours: Monday to Friday · 9:00 AM - 6:00 PM IST</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Action button: `Call Now</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Note: Toll-free India-wide. Regional language support available.</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: WhatsApp</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Title: WHATSAPP</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Number: <code className="font-mono bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#451A03]/20 text-[#451A03] font-bold text-xl">+91 91120 00174</code></span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Hours: 24/7 automated + business hours human</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Action button: `Chat on WhatsApp` → `/suraksha/whatsapp</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Note: Fastest response. Photos aur videos bhi bhej sakte hai.</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: Callback</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Title: CALLBACK</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Action button: `Request Callback` → `/suraksha/callback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-bold">Category card grid (6 categories):</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Category 1 · Installation help:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">15-minute installation guide, video, aur puncture shop guidance</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Category 2 · Product questions:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">How Suraksha works, specifications, compatibility</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Category 3 · Warranty & claims:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">3-year sensor warranty. Claim submission process.</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Category 4 · EMI & payment:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">Bajaj Finance EMI, payment options, billing questions</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Category 5 · Centres near you:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">Truck Wheels centres, dealers, aur puncture shops</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Category 6 · FAQs:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">30+ common questions aur answers</p>
            <div className="bg-[#FEF3C7] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
              <ul className="space-y-3">
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: wrench</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Title: Installation</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: question mark</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Title: Product Info</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: shield</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Title: Warranty</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: money</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Title: EMI & Payment</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: location</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Title: Find Centre</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: question</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Title: Common Questions</span>
                </li>
              </ul>
            </div>
            <div className="pt-2">
              <Link href="/suraksha/faqs" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#DC2626] text-white hover:bg-[#B91C1C]">
                All FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl lg:text-4xl text-[#451A03]">Common questions</h2>
            <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg p-6 shadow-sm">
              <ul className="space-y-3">
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Accordion (5-6 top questions from `/suraksha/faqs`)</span>
                </li>
              </ul>
            </div>
            <div className="pt-2">
              <Link href="/suraksha/faqs" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#DC2626] text-white hover:bg-[#B91C1C]">
                All FAQs padhiye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl lg:text-4xl text-[#451A03]">WARRANTY CLAIM</h2>
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-medium">Sensor ya display mein problem? WhatsApp par yeh 3 cheezein bhejiye aur hum turant help karenge:</p>
            <div className="bg-[#FEF3C7] border-2 border-[#451A03]/15 rounded-lg p-6 shadow-sm">
              <ul className="space-y-3">
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Photo of the defective sensor/display (with serial number visible)</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Truck registration number</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Description of the problem (Hindi/English/regional — jo comfortable ho)</span>
                </li>
              </ul>
            </div>
            <div className="pt-2">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#25D366] text-white hover:bg-[#1EBE5D]">
                WhatsApp par claim submit kariye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl lg:text-4xl text-[#451A03]">PROBLEM SOLVED IN MINUTES.</h2>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-medium">WhatsApp par baat kijiye — fastest response.</p>
            <div className="pt-2">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#25D366] text-white hover:bg-[#1EBE5D]">
                WhatsApp Kariye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}