import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, MessageSquare, Phone, Users, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SupportFaqAccordion } from "./support-faq-accordion";

export const metadata: Metadata = {
  title: "Support · TMIP",
  description:
    "TMIP customer support. Support tiers by contract, response SLAs, and how to reach us. For existing customers, use your dedicated support channel.",
  alternates: {
    canonical: "https://treel.in/tmip/support",
  },
  openGraph: {
    title: "Support · TMIP",
    description:
      "TMIP customer support. Support tiers by contract, response SLAs, and how to reach us. For existing customers, use your dedicated support channel.",
    url: "https://treel.in/tmip/support",
  },
};

const SUPPORT_TIERS = [
  {
    id: "starter",
    tierName: "Starter",
    contractType: "Standard TMIP contract",
    highlight: false,
    sla: "Within 8 business hours for standard issues, 4 hours for critical",
    standardSla: "Within 8 business hours",
    criticalSla: "Within 4 hours",
    channels: "Email, portal, phone (business hours)",
    coverage: "Business hours IST",
    features: [
      "Standard ticket portal & email logging",
      "Direct phone desk during business hours",
      "Depot onboarding documentation & guides",
      "Standard telemetry health monitoring",
    ],
  },
  {
    id: "growth",
    tierName: "Growth",
    contractType: "Growth TMIP contract",
    highlight: false,
    sla: "Within 4 business hours for standard, 2 hours for critical",
    standardSla: "Within 4 business hours",
    criticalSla: "Within 2 hours",
    channels: "Email, portal, phone, dedicated Slack channel",
    coverage: "Extended business hours IST",
    features: [
      "Dedicated Slack / Teams operations channel",
      "Priority triage for operational depots",
      "Direct engineer escalation path",
      "Weekly automated fleet telemetry summaries",
    ],
  },
  {
    id: "enterprise",
    tierName: "Enterprise",
    contractType: "Enterprise TMIP contract with SLA rider",
    highlight: true,
    badge: "MISSION-CRITICAL FLEETS",
    sla: "Within 1 hour for critical incidents, contractual for standard",
    standardSla: "Contractual for standard",
    criticalSla: "Within 1 hour for critical incidents",
    channels: "All above + named customer success manager + 24/7 for critical",
    coverage: "24/7 for critical severity",
    features: [
      "Named Customer Success Manager (CSM)",
      "24/7 coverage for critical severity incidents",
      "Quarterly operational & tyre ROI audits",
      "Tailored SLA rider with penalty guarantees",
    ],
  },
];

export default function TmipSupportPage() {
  return (
    <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Blueprint Grid Background: 60px x 60px */}
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
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="tmip"
              items={[
                { label: "TMIP", href: "/tmip" },
                { label: "Support" },
              ]}
            />
            <div className="rounded-[2px] font-jetbrains text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-block">
              SUPPORT
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              We answer.
            </h1>
            <p className="text-[#94A3B8] text-base sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              TMIP support is structured around your contract tier and severity level. Below is the support model,
              response SLAs, and how to reach us.
            </p>
          </div>
        </div>
      </section>

      {/* Section · Support Tiers by Contract */}
      <section className="relative z-10 py-20 lg:py-24 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span className="text-xs font-jetbrains uppercase tracking-widest text-[#3B82F6] font-semibold">
                SERVICE COMMITMENT
              </span>
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Support tiers by contract
            </h2>
            <p className="text-base text-[#94A3B8] font-ibm-plex leading-relaxed">
              Every TMIP contract includes defined response SLAs, designated communication channels, and scheduled
              coverage hours engineered to match your operational intensity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {SUPPORT_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-[4px] p-8 flex flex-col justify-between transition-all duration-200 ${
                  tier.highlight
                    ? "bg-[#0B1528] border-2 border-[#3B82F6] shadow-[0_0_30px_rgba(59,130,246,0.15)] ring-1 ring-[#3B82F6]/50"
                    : "bg-[#0B1220]/80 border border-slate-400/10 hover:border-slate-400/25"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-8 px-3 py-0.5 rounded-[2px] bg-[#3B82F6] text-white text-[10px] font-jetbrains font-bold uppercase tracking-wider shadow-sm">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Tier Header */}
                  <div className="space-y-1 border-b border-slate-400/10 pb-6">
                    <h3 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">{tier.tierName}</h3>
                    <div className="text-xs font-jetbrains text-[#94A3B8]">{tier.contractType}</div>
                  </div>

                  {/* SLA Highlight Block */}
                  <div className="space-y-3 rounded-[3px] bg-white/[0.02] border border-slate-400/10 p-4">
                    <div className="flex items-center gap-2 text-xs font-jetbrains uppercase tracking-wider text-slate-400 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                      <span>Response SLA</span>
                    </div>

                    <div className="space-y-2 pt-1 text-xs font-ibm-plex">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 font-jetbrains">Standard:</span>
                        <span className="text-[#F1F5F9] font-medium text-right">{tier.standardSla}</span>
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 font-jetbrains">Critical:</span>
                        <span className="text-[#3B82F6] font-semibold text-right">{tier.criticalSla}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-400/10 leading-snug">
                      {tier.sla}
                    </p>
                  </div>

                  {/* Channels & Coverage */}
                  <div className="space-y-4 text-xs font-ibm-plex">
                    <div className="space-y-1">
                      <div className="text-slate-500 font-jetbrains uppercase text-[10px] tracking-wider">
                        Channels
                      </div>
                      <div className="text-[#CBD5E1] font-medium flex items-start gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
                        <span>{tier.channels}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-slate-500 font-jetbrains uppercase text-[10px] tracking-wider">
                        Coverage
                      </div>
                      <div className="text-[#CBD5E1] font-medium flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
                        <span>{tier.coverage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-400/10">
                    <div className="text-slate-500 font-jetbrains uppercase text-[10px] tracking-wider">
                      Included In Tier
                    </div>
                    <ul className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#94A3B8] leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/contact?subject=Enterprise sales (TMIP)"
                    className={`w-full py-2.5 px-4 rounded-[3px] text-xs font-jetbrains font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      tier.highlight
                        ? "bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                        : "bg-white/[0.04] text-slate-300 border border-slate-400/20 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    <span>Inquire About {tier.tierName}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Reach Support: Dual-Track Cards */}
      <section className="relative z-10 py-20 lg:py-24 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Existing Customers */}
            <div className="p-8 sm:p-10 rounded-[4px] bg-[#0B1220]/90 border border-slate-400/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-jetbrains uppercase tracking-wider text-[#3B82F6] font-semibold">
                    ACTIVE CONTRACT HOLDERS
                  </span>
                  <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                    For existing customers
                  </h2>
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  Use your dedicated support channel. Contact details were provided during onboarding and are available
                  in your customer portal.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[3px] font-semibold text-sm bg-slate-800/80 text-slate-400 border border-slate-700/60 cursor-not-allowed opacity-90 shadow-sm"
                    title="Customer portal authentication is provisioned per customer contract via corporate SSO"
                  >
                    <span>Access customer portal</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <span className="text-xs font-jetbrains text-slate-400">
                    Dedicated portal link provisioned per contract via corporate SSO
                  </span>
                </div>
              </div>
            </div>

            {/* For Prospects and General Inquiries */}
            <div className="p-8 sm:p-10 rounded-[4px] bg-[#0B1220]/90 border border-slate-400/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-[3px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-jetbrains uppercase tracking-wider text-emerald-400 font-semibold">
                    NEW FLEETS &amp; PROSPECTS
                  </span>
                  <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                    For everyone else
                  </h2>
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  If you are not a current TMIP customer but need to reach our team, use the general contact form.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact?subject=Enterprise sales (TMIP)"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                >
                  <span>Contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions / FAQ Accordion */}
      <section className="relative z-10 py-20 lg:py-24 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span className="text-xs font-jetbrains uppercase tracking-widest text-[#3B82F6] font-semibold">
                SUPPORT ARCHITECTURE FAQ
              </span>
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Common questions
            </h2>
            <p className="text-base text-[#94A3B8] font-ibm-plex leading-relaxed">
              Detailed answers on deployment onboarding, TMS/ERP integration, support ticket escalation paths, and
              contractual SLA commitments.
            </p>
          </div>

          <div className="max-w-4xl">
            <SupportFaqAccordion />
          </div>
        </div>
      </section>
    </div>
  );
}