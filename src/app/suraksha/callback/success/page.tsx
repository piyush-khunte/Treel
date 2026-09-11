import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Callback Request Received  \u00b7  Suraksha",
  description: "Your callback request has been received. Suraksha team will call you at your preferred time.",
  alternates: {
    canonical: "https://treel.in/suraksha/callback/success",
  },
  openGraph: {
    title: "Callback Request Received  \u00b7  Suraksha",
    description: "Your callback request has been received. Suraksha team will call you at your preferred time.",
    url: "https://treel.in/suraksha/callback/success",
  },
};

export default function SurakshaCallbackSuccessPage() {
  return (
    <div className="space-y-0 bg-[#111315] text-[#FAF7F2] font-rubik">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#E65100] bg-[#E65100]/10 border-[#E65100]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">CALLBACK CONFIRMED</div>
            <h1 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">DHANYAWAAD!<br />*HUM CALL KARENGE.*</h1>
            <p className="text-[#A3A3A3] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl">Aap ka callback request received ho gaya hai. Confirmation neeche hai.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Request confirmation card:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Reference number: `SRK-CB-[NUMBER]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Your name: [Name from form]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Mobile: [Number]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Preferred time: [Time slot]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Preferred language: [Language]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Topic: [Selected topic]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Contact preference: [Phone/WhatsApp/Either]</span>
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
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">1. **Confirmation SMS aayega** — abhi thodi der mein aap ke number pe</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">2. **Callback in preferred time slot** — humari team preferred time pe call karegi</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">3. **Language preference honor** — aap ki preferred language mein hi baat hogi</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">4. **Full assistance** — jo topic select kiya, us par complete information milegi</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Agar aap intezaar nahi karna chahte, WhatsApp par direct baat kar sakte hai. Immediate response milta hai.</p>
            <div className="pt-6">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                WhatsApp Kariye Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <Link href="/suraksha/faqs" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">FAQs (self-service)</h3>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/suraksha/centres" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">Nearest Centre</h3>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/suraksha/product" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">Product info</h3>
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