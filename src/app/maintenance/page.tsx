import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Scheduled Maintenance  \u00b7  Treel",
  description: "treel.in is undergoing scheduled maintenance. We'll be back shortly.",
  alternates: {
    canonical: "(no canonical)",
  },
  openGraph: {
    title: "Scheduled Maintenance  \u00b7  Treel",
    description: "treel.in is undergoing scheduled maintenance. We'll be back shortly.",
    url: "(no canonical)",
  },
};

export default function MaintenancePage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Maintenance</h1>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Want us to email you when we're back online? Enter your email below.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Field: Email</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Placeholder: you@email.com</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Button: `Notify me</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Success message: `Thanks. We'll email you when we're back.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">For urgent customer support, our team is still available by phone and WhatsApp during business hours.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Toll-free**: 1800 833 0233 (Monday to Friday, 9 AM to 6 PM IST)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**WhatsApp**: +91 91120 00174 (24/7)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Email**: hello@treel.in</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Serve HTTP 503 status code with `Retry-After` header set to estimated maintenance window</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>This page is served from a static edge cache separate from the main application</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Include an optional `X-Maintenance-Reason` header for internal logging</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Notify-me form posts to a lightweight endpoint (not the main app database)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}