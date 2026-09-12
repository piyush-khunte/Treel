import type { Metadata } from "next";
import Link from "next/link";
import { 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  Mail,
  RotateCcw
} from "lucide-react";

export const metadata: Metadata = {
  title: "Refunds Policy · Personal TPMS · Treel",
  description: "Personal TPMS refund policy. Eligibility, process, timeline, and Razorpay refund cycle. For online orders from treel.in.",
  alternates: {
    canonical: "https://treel.in/personal/refunds",
  },
  openGraph: {
    title: "Refunds Policy · Personal TPMS · Treel",
    description: "Personal TPMS refund policy. Eligibility, process, timeline, and Razorpay refund cycle. For online orders from treel.in.",
    url: "https://treel.in/personal/refunds",
  },
};

export default function PersonalRefundsPage() {
  const timelinePhases = [
    {
      phase: "Phase 1 · Treel Initiation",
      time: "2–3 business days",
      desc: "Upon return parcel receipt and verification at our warehouse, Treel approves and triggers refund initiation."
    },
    {
      phase: "Phase 2 · Razorpay Gateway Processing",
      time: "3–7 business days",
      desc: "Razorpay securely processes reverse settlement back to your issuing bank or payment network."
    },
    {
      phase: "Phase 3 · Bank Account Credit",
      time: "3–5 business days",
      desc: "Your bank reflects the credited amount on your account statement or card balance."
    }
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              LEGAL · PERSONAL TPMS
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              Refunds Policy
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#6B7280]">
              <span>Effective Date: 1 October 2026</span>
              <span>•</span>
              <span>Applies to: Personal TPMS orders from treel.in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Policy Content */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-12">
            {/* Scenarios overview */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-4">
              <div className="flex items-center gap-3 text-[#2563EB]">
                <CreditCard className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#111827]">When Refunds Are Issued</h2>
              </div>
              <ul className="space-y-3 text-sm text-[#4B5563] pt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  <span><strong>Approved return within 7-day window</strong> — following warehouse receipt and condition check.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  <span><strong>Pre-dispatch cancellation</strong> — full immediate refund for orders canceled before shipping.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  <span><strong>Transit loss or irreparable transit damage</strong> — if replacement kit is not opted for.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  <span><strong>Failed courier delivery</strong> — returned to sender after maximum delivery attempts.</span>
                </li>
              </ul>
            </div>

            {/* Payment Source Method */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">Original Digital Payment Method Only</h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                All refunds are credited exclusively back to the original payment source utilized at checkout via Razorpay:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] space-y-1">
                  <strong className="text-sm font-bold text-[#111827] block">UPI Payments</strong>
                  <p className="text-xs text-[#6B7280]">Direct reversal to original UPI ID / linked bank account.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] space-y-1">
                  <strong className="text-sm font-bold text-[#111827] block">Credit & Debit Cards</strong>
                  <p className="text-xs text-[#6B7280]">Reversal to original Visa, MasterCard, RuPay, or Amex card.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] space-y-1">
                  <strong className="text-sm font-bold text-[#111827] block">Net Banking</strong>
                  <p className="text-xs text-[#6B7280]">Account credit directly to source bank branch.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] space-y-1">
                  <strong className="text-sm font-bold text-[#111827] block">Digital Wallets & EMI</strong>
                  <p className="text-xs text-[#6B7280]">Reversal to source digital wallet or card issuer EMI account.</p>
                </div>
              </div>
            </div>

            {/* Timeline Breakdown */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">Refund Timeline Breakdown</h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                Total typical turnaround from warehouse return verification to visible bank credit is <strong>8–15 business days</strong>:
              </p>

              <div className="space-y-4">
                {timelinePhases.map((phase, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-base text-[#111827]">{phase.phase}</h4>
                      <span className="text-xs font-bold text-[#2563EB] bg-[#2563EB]/10 px-3 py-1 rounded-full">
                        {phase.time}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Compliance Note */}
            <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-3">
              <h3 className="text-xl font-bold text-[#111827]">Consumer Protection Act 2019</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                This refund policy operates in strict alignment with your statutory rights under the <strong>Consumer Protection Act 2019</strong> and applicable e-commerce guidelines of India. Nothing in this policy limits or alters your legal consumer remedies.
              </p>
            </div>

            {/* Inquiries */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111827] text-white space-y-4 border border-white/10 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Need Status on a Specific Refund?</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Reach out to our finance team at <strong>hello@treel.in</strong> with your Order ID and Razorpay reference, or contact our customer support hotline at <strong>1800 833 0233</strong> (Monday to Friday, 9:00 AM to 6:00 PM IST).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
