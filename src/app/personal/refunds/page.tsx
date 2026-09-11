import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Refunds Policy  \u00b7  Personal TPMS  \u00b7  Treel",
  description: "Personal TPMS refund policy. Eligibility, process, timeline, and Razorpay refund cycle. For online orders from treel.in.",
  alternates: {
    canonical: "https://treel.in/personal/refunds",
  },
  openGraph: {
    title: "Refunds Policy  \u00b7  Personal TPMS  \u00b7  Treel",
    description: "Personal TPMS refund policy. Eligibility, process, timeline, and Razorpay refund cycle. For online orders from treel.in.",
    url: "https://treel.in/personal/refunds",
  },
};

export default function PersonalRefundsPage() {
  return (
    <div className="space-y-0 bg-[#0D1B2A] text-[#FAF7F2] font-manrope">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Refunds Policy</h1>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#FF8A00] bg-[#FF8A00]/10 border-[#FF8A00]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">LEGAL  ·  PERSONAL TPMS</div>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>H1: Refunds Policy</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Effective date: `1 October 2026</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Applies to: **Personal TPMS orders from treel.in.**</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Refunds are issued in these situations:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Return within 7-day window** — per <Link href="/personal/returns" className="underline hover:text-white transition-colors">returns policy</Link></span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Damaged or defective delivery** — per returns policy Section 6</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Order cancellation before dispatch** — free cancellation, full refund</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Delivery failure** — after courier returns your order to Treel</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Warranty claim** — where replacement is not feasible and refund is agreed as alternative</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Refunds are processed to the **original payment method** used at checkout:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Cash refunds are not offered. Refunds are always to the original digital payment source via Razorpay.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>UPI payments — refunded to source UPI ID</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Credit/debit cards — refunded to source card</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Net banking — refunded to source bank account</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Wallets (Paytm, PhonePe, etc.) — refunded to source wallet</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>EMI purchases — refunded to source card; EMI adjustments processed by the card issuer</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Timeline breakdown:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**Total typical timeline: 8-15 business days** from return receipt to visible bank credit.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Refund initiation by Treel**: within **2-3 business days** of eligible return receipt or approved cancellation</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Razorpay processing**: **3-7 business days** for the refund to reach your bank</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Bank credit visibility**: varies by bank (typically 3-5 additional business days)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Partial refunds may apply in these cases:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Return of a kit missing minor accessories (deducted at accessory replacement cost)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Return of a used/opened kit outside the returns window as goodwill (percentage deduction at Treel's discretion)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Once a refund is initiated, you will receive:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">If you do not see the refund within the total timeline above, contact us with the Razorpay refund reference for investigation.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Email confirmation from Treel with refund reference number</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Email confirmation from Razorpay with payment reference</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Refunds are not issued for:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Kits installed and used beyond the 7-day return window (covered under warranty for defects instead)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Damage caused by misuse, physical damage, or unauthorized modification</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Change of mind after installation</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Third-party marketplace purchases (contact the marketplace)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">This refunds policy is offered in addition to your rights under the **Consumer Protection Act 2019** and other applicable Indian consumer law. Nothing in this policy limits your statutory rights.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Questions about a specific refund? Email **hello@treel.in** with your order ID and refund reference (if available), or call **1800 833 0233**.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">## 07  ·  System Pages  ·  6 pages  ·  Phase 4 part 2</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**Global note:** System pages carry Master brand nav + Master footer. Where possible, they adapt to brand context (a 404 accessed from a `/suraksha/*` URL shows Suraksha-flavoured recovery options; a 404 accessed from a `/tmip/*` URL shows TMIP-flavoured recovery options).</p>
          </div>
        </div>
      </section>
    </div>
  );
}