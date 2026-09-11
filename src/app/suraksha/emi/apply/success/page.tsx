import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Application Submitted  \u00b7  Suraksha EMI",
  description: "Your Suraksha EMI application has been submitted. Reference number generated. Bajaj Finance will respond in 24-48 hours.",
  alternates: {
    canonical: "https://treel.in/suraksha/emi/apply/success",
  },
  openGraph: {
    title: "Application Submitted  \u00b7  Suraksha EMI",
    description: "Your Suraksha EMI application has been submitted. Reference number generated. Bajaj Finance will respond in 24-48 hours.",
    url: "https://treel.in/suraksha/emi/apply/success",
  },
};

export default function SurakshaEmiApplySuccessPage() {
  return (
    <div className="space-y-0 bg-[#111315] text-[#FAF7F2] font-rubik">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#E65100] bg-[#E65100]/10 border-[#E65100]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">APPLICATION SUBMITTED</div>
            <h1 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">DHANYAWAAD!<br />*APPLICATION SUBMIT HO GAYI.*</h1>
            <p className="text-[#A3A3A3] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl">Aap ki EMI application successfully submit ho gayi. Reference number aur next steps neeche hai.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Application details card:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Reference number: `SRK-EMI-[NUMBER]` (large, copyable)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Application date: [Date]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Kit selected: [Configuration]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Kit price: ₹[amount]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Tenure selected: [X] months</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Monthly EMI: ₹[amount]</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">AAGE KYA HOGA?</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Numbered steps:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">1. **Confirmation SMS + WhatsApp aayega** — Registered mobile number pe abhi thodi der mein.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">2. **Bajaj Finance verification (24-48 hours)** — Bajaj Finance team documents verify karegi aur credit check karegi.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">3. **Approval decision** — Approval ya rejection ka SMS aayega. Approval mein loan agreement bhi share hoga.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">4. **Kit collection** — Approval ke baad Truck Wheels centre se kit collect kariye ya home delivery ke liye WhatsApp kariye.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">5. **Installation** — 15-minute installation kisi bhi centre par ya puncture shop par.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Reference number `SRK-EMI-[NUMBER]` ko save kar lijiye — future queries ke liye zaroori hoga.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Actions:</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Copy reference number</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Email reference number to myself` (opens mailto with prefilled body)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>WhatsApp reference number to myself` (opens WhatsApp)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Application ke baare mein koi bhi doubt ho toh WhatsApp par baat kijiye. Aap ki application ki status bhi WhatsApp par check kar sakte hai.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Alternative: `Call 1800 833 0233</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                WhatsApp Kariye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <Link href="/suraksha/how-it-works" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">How installation works</h3>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/suraksha/centres" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">Find your nearest centre</h3>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/suraksha/faqs" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">FAQs</h3>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}