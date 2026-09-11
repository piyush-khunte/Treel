import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Unsubscribe  \u00b7  Treel",
  description: "Manage your email preferences or unsubscribe from Treel communications.",
  alternates: {
    canonical: "(no canonical)",
  },
  openGraph: {
    title: "Unsubscribe  \u00b7  Treel",
    description: "Manage your email preferences or unsubscribe from Treel communications.",
    url: "(no canonical)",
  },
};

export default function UnsubscribePage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B] mb-4">
              PREFERENCES
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">Unsubscribe</h1>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">Transactional emails cannot be unsubscribed:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>☐ **Product updates** — New features, capability launches, product news</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>☐ **Insights & thought leadership** — Our monthly editorial covering mobility intelligence</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>☐ **Whitepapers & research** — When we publish new research papers</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>☐ **Events & webinars** — Upcoming events where you can meet Treel</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>☐ **Marketing offers** — Promotional emails and special offers (Personal TPMS only)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Order confirmations</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Shipping and delivery notifications</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Warranty registrations and claims</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Password/security notifications (if applicable)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Legal notices</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">You&apos;ve been unsubscribed.</h2>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">Confirmation modal (for unsubscribe-all):</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">You&apos;ll stop receiving all marketing and communications from Treel. You&apos;ll still receive transactional emails related to any purchases or accounts.</p>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">Success message (after save):</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Your email preferences have been saved. Changes take effect within 24 hours.</p>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">Success message (after unsubscribe-all):</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">You will no longer receive marketing emails from Treel. If this was a mistake, you can re-subscribe at any time from our footer.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Secondary link: `Unsubscribe from everything` (opens a confirmation modal)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Buttons: `Yes, unsubscribe from everything` | `Cancel</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="#" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                Save preferences <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">If you&apos;re not seeing what you expected, contact us at hello@treel.in.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">## 08  ·  SEO / AEO / GEO Infrastructure  ·  12 endpoints  ·  Phase 4 part 3</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Access via unique token in email link — no login required</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Token is single-use for the specific email; regenerated on each email send</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Preference changes propagate to marketing automation platform within 24 hours (industry standard)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Log preference changes for compliance audit trail</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}