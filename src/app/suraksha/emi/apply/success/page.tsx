import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

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
              THANK YOU!<br />
              <span className="italic text-[#0891B2]">APPLICATION SUBMITTED.</span>
            </h1>
            <SurakshaRotator
              page="5.7"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-2"
            >
              आपको जल्द ही पुष्टि का मैसेज मिलेगा।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl font-medium">
              Save your reference number for any follow-up. Your application details are below, along with what happens next, starting with document verification in 24–48 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-bold">Application Details:</p>
            <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
              <ul className="space-y-3">
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Reference number: <code className="font-mono bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#451A03]/20 text-[#451A03] font-bold">SRK-EMI-[NUMBER]</code></span>
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
                  <span>Down payment: Zero Down Payment Plan</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Tenure selected: [X] months</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Financing Partner: Bajaj Finance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl lg:text-4xl text-[#451A03]">WHAT HAPPENS NEXT</h2>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Verification &amp; Delivery Steps:</p>
            <div className="space-y-4">
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">1. <strong>Confirmation SMS &amp; WhatsApp update</strong> — Sent to your registered mobile number shortly.</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">2. <strong>Finance verification (24–48 hours)</strong> — Our partner finance team will verify your submitted documents and assess eligibility.</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">3. <strong>Approval decision</strong> — You will receive an SMS update regarding approval along with loan agreement details.</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">4. <strong>Kit collection</strong> — Upon approval, collect your kit from your nearest Truck Wheels centre or coordinate delivery via WhatsApp.</p>
              </div>
              <div className="p-5 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15">
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik">5. <strong>15-Minute installation</strong> — Visit any authorized partner centre or roadside puncture shop for quick fitment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-medium">Please save your reference number <code className="font-mono bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#451A03]/20 font-bold">SRK-EMI-[NUMBER]</code> for tracking and future queries.</p>
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
                  <span>Email reference number to myself</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Share reference number on WhatsApp</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-medium">Have questions regarding your application? Chat directly with our finance team on WhatsApp or check your real-time application status.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Toll-Free Helpline: 1800 833 0233</span>
              </li>
            </ul>
            <div className="pt-4">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#25D366] text-white hover:bg-[#1EBE5D]">
                Chat on WhatsApp <ArrowRight className="w-4 h-4" />
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