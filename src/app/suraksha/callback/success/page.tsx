import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      <section className="relative overflow-hidden pt-16 pb-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Request Callback", href: "/suraksha/callback" },
                { label: "Confirmation" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#10B981] bg-[#10B981]/10 text-[#047857] font-rubik text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              CALLBACK CONFIRMED
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              DHANYAWAAD!<br />
              <span className="italic text-[#DC2626]">*HUM CALL KARENGE.*</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl font-medium">
              Aap ka callback request received ho gaya hai. Confirmation neeche hai.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-bold">Request confirmation card:</p>
            <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
              <ul className="space-y-3">
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Reference number: <code className="font-mono bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#451A03]/20 text-[#451A03] font-bold">SRK-CB-[NUMBER]</code></span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Your name: [Name from form]</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Mobile: [Number]</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Preferred time: [Time slot]</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Preferred language: [Language]</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Topic: [Selected topic]</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Contact preference: [Phone/WhatsApp/Either]</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl lg:text-4xl text-[#451A03]">AAGE KYA HOGA?</h2>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Numbered steps:</p>
            <div className="space-y-4">
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">1. <strong>Confirmation SMS aayega</strong> — abhi thodi der mein aap ke number pe</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">2. <strong>Callback in preferred time slot</strong> — humari team preferred time pe call karegi</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">3. <strong>Language preference honor</strong> — aap ki preferred language mein hi baat hogi</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">4. <strong>Full assistance</strong> — jo topic select kiya, us par complete information milegi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-medium">Agar aap intezaar nahi karna chahte, WhatsApp par direct baat kar sakte hai. Immediate response milta hai.</p>
            <div className="pt-2">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#25D366] text-white hover:bg-[#1EBE5D]">
                WhatsApp Kariye Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <Link href="/suraksha/faqs" className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm">
                <h3 className="font-anton uppercase tracking-normal text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">FAQs (self-service)</h3>
                <div className="mt-4 font-bold text-xs text-[#DC2626] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/suraksha/centres" className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm">
                <h3 className="font-anton uppercase tracking-normal text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">Nearest Centre</h3>
                <div className="mt-4 font-bold text-xs text-[#DC2626] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/suraksha/product" className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm">
                <h3 className="font-anton uppercase tracking-normal text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">Product info</h3>
                <div className="mt-4 font-bold text-xs text-[#DC2626] flex items-center gap-1">
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