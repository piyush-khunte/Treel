import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Support  \u00b7  TMIP",
  description: "TMIP customer support. Support tiers by contract, response SLAs, and how to reach us. For existing customers, use your dedicated support channel.",
  alternates: {
    canonical: "https://treel.in/tmip/support",
  },
  openGraph: {
    title: "Support  \u00b7  TMIP",
    description: "TMIP customer support. Support tiers by contract, response SLAs, and how to reach us. For existing customers, use your dedicated support channel.",
    url: "https://treel.in/tmip/support",
  },
};

export default function TmipSupportPage() {
  return (
    <div className="space-y-0 bg-[#0B132B] text-[#F8FAFC] font-ibm">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">SUPPORT</div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15]">We answer.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm max-w-3xl">TMIP support is structured around your contract tier and severity level. Below is the support model, response SLAs, and how to reach us.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">Support tiers by contract</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">Tier card 1 · Starter:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">Tier card 2 · Growth:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">Tier card 3 · Enterprise:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Tier name: Starter</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Contract type: Standard TMIP contract</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Response SLA: Within 8 business hours for standard issues, 4 hours for critical</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Channels: Email, portal, phone (business hours)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Coverage: Business hours IST</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Tier name: Growth</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Contract type: Growth TMIP contract</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Response SLA: Within 4 business hours for standard, 2 hours for critical</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Channels: Email, portal, phone, dedicated Slack channel</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Coverage: Extended business hours IST</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Tier name: Enterprise</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Contract type: Enterprise TMIP contract with SLA rider</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Response SLA: Within 1 hour for critical incidents, contractual for standard</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Channels: All above + named customer success manager + 24/7 for critical</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Coverage: 24/7 for critical severity</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">For existing customers</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">Use your dedicated support channel. Contact details were provided during onboarding and are available in your customer portal.</p>
            <div className="pt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#00E5FF] text-[#0B132B] hover:bg-[#33EBFF]">
                Access customer portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">For everyone else</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">If you are not a current TMIP customer but need to reach our team, use the general contact form.</p>
            <div className="pt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#00E5FF] text-[#0B132B] hover:bg-[#33EBFF]">
                Contact us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">Common questions</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">[DEV: Populate with 8-12 support-related FAQ items — implementation, integration, billing, contract, escalation.]</p>
          </div>
        </div>
      </section>
    </div>
  );
}