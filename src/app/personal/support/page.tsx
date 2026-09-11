import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Support  \u00b7  Personal TPMS",
  description: "Personal TPMS customer support. Setup guides, troubleshooting, warranty, and contact options.",
  alternates: {
    canonical: "https://treel.in/personal/support",
  },
  openGraph: {
    title: "Support  \u00b7  Personal TPMS",
    description: "Personal TPMS customer support. Setup guides, troubleshooting, warranty, and contact options.",
    url: "https://treel.in/personal/support",
  },
};

export default function PersonalSupportPage() {
  return (
    <div className="space-y-0 bg-[#0D1B2A] text-[#FAF7F2] font-manrope">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#FF8A00] bg-[#FF8A00]/10 border-[#FF8A00]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">SUPPORT</div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">We're here to help.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-manrope max-w-3xl">Everything you need for Personal TPMS: setup guides, troubleshooting, warranty information, and how to reach our support team.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Card grid (4 topics):</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Card 1 · Setup:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">10-minute installation. Step-by-step with photos and video.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Card 2 · Troubleshooting:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Common problems and their solutions. Sensor pairing, app issues, alert configuration.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Card 3 · Warranty:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">1-year full replacement warranty. How to register and how to claim.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Card 4 · Contact support:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Can't find what you need? Reach our support team directly.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Icon: play</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Title: Setup guide</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Icon: question mark</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Title: Troubleshooting</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Icon: shield</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Title: Warranty & claims</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Icon: envelope</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Title: Contact us</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/personal/support/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#FF8A00] text-[#FAF7F2] hover:bg-[#FFA033]">
                Contact support <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Common questions</h2>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Accordion (5-6 top FAQ items pulled from `/personal/faqs`)</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/personal/faqs" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#FF8A00] text-[#FAF7F2] hover:bg-[#FFA033]">
                See all FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-manrope text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Toll-free support</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Prefer to talk to someone? Call our toll-free line during business hours.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Contact: Toll-free 1800 833 0233 · Monday to Friday, 9:00 AM to 6:00 PM IST</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}