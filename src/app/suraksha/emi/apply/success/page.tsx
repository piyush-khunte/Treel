import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      <section className="relative overflow-hidden pt-16 pb-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "EMI Plans", href: "/suraksha/emi" },
                { label: "Apply", href: "/suraksha/emi/apply" },
                { label: "Confirmation" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#10B981] bg-[#10B981]/10 text-[#047857] font-rubik text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              APPLICATION SUBMITTED
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              धन्यवाद!<br />
              <span className="italic text-[#DC2626]">*APPLICATION SUBMIT हो गई।*</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl font-medium">
              आप की EMI application successfully submit हो गई। Reference number और next steps नीचे हैं।
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-bold">Application details card:</p>
            <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
              <ul className="space-y-3">
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Reference number: <code className="font-mono bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#451A03]/20 text-[#451A03] font-bold">SRK-EMI-[NUMBER]</code> (large, copyable)</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Application date: [Date]</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Kit selected: [Configuration]</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Kit price: ₹[amount]</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Tenure selected: [X] months</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Monthly EMI: ₹[amount]</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl lg:text-4xl text-[#451A03]">आगे क्या होगा?</h2>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Numbered steps:</p>
            <div className="space-y-4">
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">1. <strong>Confirmation SMS + WhatsApp आएगा</strong> — Registered mobile number पे अभी थोड़ी देर में।</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">2. <strong>Bajaj Finance verification (24-48 hours)</strong> — Bajaj Finance team documents verify करेगी और credit check करेगी।</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">3. <strong>Approval decision</strong> — Approval या rejection का SMS आएगा। Approval में loan agreement भी share होगा।</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">4. <strong>Kit collection</strong> — Approval के बाद Truck Wheels centre से kit collect करिए या home delivery के लिए WhatsApp करिए।</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">5. <strong>Installation</strong> — 15-minute installation किसी भी centre पर या puncture shop पर।</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-medium">Reference number <code className="font-mono bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#451A03]/20 font-bold">SRK-EMI-[NUMBER]</code> को save कर लीजिए — future queries के लिए ज़रूरी होगा।</p>
            <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg p-6 shadow-sm">
              <ul className="space-y-3">
                <li className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 font-bold">
                  <span className="text-[#DC2626] mt-1.5">•</span>
                  <span>Actions:</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Copy reference number</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Email reference number to myself` (opens mailto with prefilled body)</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>WhatsApp reference number to myself` (opens WhatsApp)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-medium">Application के बारे में कोई भी doubt हो तो WhatsApp पर बात कीजिए। आप की application की status भी WhatsApp पर check कर सकते हैं।</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Alternative: `Call 1800 833 0233</span>
              </li>
            </ul>
            <div className="pt-4">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#25D366] text-white hover:bg-[#1EBE5D]">
                WhatsApp करिए <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <Link href="/suraksha/how-it-works" className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm">
                <h3 className="font-anton uppercase tracking-normal text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">How installation works</h3>
                <div className="mt-4 font-bold text-xs text-[#DC2626] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/suraksha/centres" className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm">
                <h3 className="font-anton uppercase tracking-normal text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">Find your nearest centre</h3>
                <div className="mt-4 font-bold text-xs text-[#DC2626] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/suraksha/faqs" className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm">
                <h3 className="font-anton uppercase tracking-normal text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">FAQs</h3>
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