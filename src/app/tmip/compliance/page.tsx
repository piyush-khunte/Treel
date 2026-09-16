import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Compliance  ·  TMIP",
  description: "TMIP compliance posture: India DPDP Act 2023, GDPR readiness for future EU deployments, industry-specific compliance, data residency.",
  alternates: {
    canonical: "https://treel.in/tmip/compliance",
  },
  openGraph: {
    title: "Compliance  ·  TMIP",
    description: "TMIP compliance posture: India DPDP Act 2023, GDPR readiness for future EU deployments, industry-specific compliance, data residency.",
    url: "https://treel.in/tmip/compliance",
  },
};

export default function TmipCompliancePage() {
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
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="tmip"
              items={[
                { label: "TMIP", href: "/tmip" },
                { label: "Compliance" },
              ]}
            />
            <div className="rounded-[2px] font-jetbrains text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-block">
              COMPLIANCE
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              Compliance is a floor, not a ceiling.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              TMIP meets applicable regulatory and industry compliance standards for the markets we serve. Below is what we comply with and how.
            </p>
          </div>
        </div>
      </section>

      {/* India DPDP Act 2023 */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              India DPDP Act 2023
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Treel is compliant with the Digital Personal Data Protection Act 2023 as it applies to fleet operations data and any personal data associated with fleet operators, drivers, and end users.
            </p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Key DPDP obligations we meet:
            </p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Consent mechanisms for personal data processing</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Purpose limitation aligned with contracted operations</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Data principal rights (access, correction, erasure) within statutory timelines</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Data protection impact assessments for high-risk processing</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Data breach notification within statutory timelines</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Contact for our Data Protection Officer: dpo@treel.in</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* GDPR */}
      <section className="relative z-10 py-20 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              GDPR
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              For future European Union deployments (Month 8+ per current roadmap), Treel maintains GDPR-ready architecture and processes. Lawful bases for processing, cross-border transfer mechanisms, data protection agreements, and Data Subject Request handling are pre-built for GDPR activation.
            </p>
          </div>
        </div>
      </section>

      {/* Industry-specific */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Industry-specific
            </h2>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span><strong className="text-[#F1F5F9] font-semibold">Logistics</strong> · Compliance with applicable state transport authority reporting requirements</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span><strong className="text-[#F1F5F9] font-semibold">Passenger transport</strong> · Compliance with state passenger transport regulations where applicable</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span><strong className="text-[#F1F5F9] font-semibold">Mining</strong> · Compliance with DGMS (Directorate General of Mines Safety) reporting requirements where deployed</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span><strong className="text-[#F1F5F9] font-semibold">Construction</strong> · Compliance with site-specific environmental and safety reporting requirements</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data residency */}
      <section className="relative z-10 py-20 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Data residency
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              For Indian customers, all Vehicle Digital Twin data is stored in Indian data centres. For future international deployments, data residency is configured per regional regulatory requirements (MENA, EU).
            </p>
          </div>
        </div>
      </section>

      {/* Third-party audit */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Third-party audit
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              TMIP compliance posture is audited annually by . Audit summaries are available to enterprise customers and prospects under NDA.
            </p>
            <div className="pt-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                <span>Request compliance documentation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}