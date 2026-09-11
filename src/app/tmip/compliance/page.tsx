import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance  \u00b7  TMIP",
  description: "TMIP compliance posture: India DPDP Act 2023, GDPR readiness for future EU deployments, industry-specific compliance, data residency.",
  alternates: {
    canonical: "https://treel.in/tmip/compliance",
  },
  openGraph: {
    title: "Compliance  \u00b7  TMIP",
    description: "TMIP compliance posture: India DPDP Act 2023, GDPR readiness for future EU deployments, industry-specific compliance, data residency.",
    url: "https://treel.in/tmip/compliance",
  },
};

export default function TmipCompliancePage() {
  return (
    <div className="space-y-0 bg-[#0B132B] text-[#F8FAFC] font-ibm">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">COMPLIANCE</div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15]">Compliance is a floor, not a ceiling.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm max-w-3xl">TMIP meets applicable regulatory and industry compliance standards for the markets we serve. Below is what we comply with and how.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">India DPDP Act 2023</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">Treel is compliant with the Digital Personal Data Protection Act 2023 as it applies to fleet operations data and any personal data associated with fleet operators, drivers, and end users.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">Key DPDP obligations we meet:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Consent mechanisms for personal data processing</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Purpose limitation aligned with contracted operations</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Data principal rights (access, correction, erasure) within statutory timelines</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Data protection impact assessments for high-risk processing</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Data breach notification within statutory timelines</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Contact for our Data Protection Officer: dpo@treel.in</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">GDPR</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">For future European Union deployments (Month 8+ per current roadmap), Treel maintains GDPR-ready architecture and processes. Lawful bases for processing, cross-border transfer mechanisms, data protection agreements, and Data Subject Request handling are pre-built for GDPR activation.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">Industry-specific</h2>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>**Logistics** · Compliance with applicable state transport authority reporting requirements</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>**Passenger transport** · Compliance with state passenger transport regulations where applicable</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>**Mining** · Compliance with DGMS (Directorate General of Mines Safety) reporting requirements where deployed</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>**Construction** · Compliance with site-specific environmental and safety reporting requirements</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">Data residency</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">For Indian customers, all Vehicle Digital Twin data is stored in Indian data centres. For future international deployments, data residency is configured per regional regulatory requirements (MENA, EU).</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">Third-party audit</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">TMIP compliance posture is audited annually by . Audit summaries are available to enterprise customers and prospects under NDA.</p>
            <div className="pt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#00E5FF] text-[#0B132B] hover:bg-[#33EBFF]">
                Request compliance documentation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}