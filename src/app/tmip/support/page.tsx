import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Support  ·  TMIP",
  description: "TMIP customer support. Support tiers by contract, response SLAs, and how to reach us. For existing customers, use your dedicated support channel.",
  alternates: {
    canonical: "https://treel.in/tmip/support",
  },
  openGraph: {
    title: "Support  ·  TMIP",
    description: "TMIP customer support. Support tiers by contract, response SLAs, and how to reach us. For existing customers, use your dedicated support channel.",
    url: "https://treel.in/tmip/support",
  },
};

export default function TmipSupportPage() {
  return (
    <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Subtle Blueprint Grid: 60px x 60px rgba(59,130,246,0.04) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="rounded-[2px] font-jetbrains text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-block">
              SUPPORT
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              We answer.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              TMIP support is structured around your contract tier and severity level. Below is the support model, response SLAs, and how to reach us.
            </p>
          </div>
        </div>
      </section>

      {/* Support tiers by contract */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Support tiers by contract
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Tier card 1 · Starter:
            </p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Tier card 2 · Growth:
            </p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Tier card 3 · Enterprise:
            </p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Tier name: Starter</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Contract type: Standard TMIP contract</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Response SLA: Within 8 business hours for standard issues, 4 hours for critical</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Channels: Email, portal, phone (business hours)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Coverage: Business hours IST</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Tier name: Growth</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Contract type: Growth TMIP contract</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Response SLA: Within 4 business hours for standard, 2 hours for critical</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Channels: Email, portal, phone, dedicated Slack channel</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Coverage: Extended business hours IST</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Tier name: Enterprise</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Contract type: Enterprise TMIP contract with SLA rider</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Response SLA: Within 1 hour for critical incidents, contractual for standard</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Channels: All above + named customer success manager + 24/7 for critical</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Coverage: 24/7 for critical severity</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* For existing customers */}
      <section className="relative z-10 py-20 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              For existing customers
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Use your dedicated support channel. Contact details were provided during onboarding and are available in your customer portal.
            </p>
            <div className="pt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                <span>Access customer portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For everyone else */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              For everyone else
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              If you are not a current TMIP customer but need to reach our team, use the general contact form.
            </p>
            <div className="pt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                <span>Contact us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Common questions */}
      <section className="relative z-10 py-20 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Common questions
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              [DEV: Populate with 8-12 support-related FAQ items — implementation, integration, billing, contract, escalation.]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}