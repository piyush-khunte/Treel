import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR  \u00b7  Treel",
  description: "Treel's GDPR readiness for future European Union deployments. Data subject rights, data protection officer contact, and lawful bases for processing.",
  alternates: {
    canonical: "https://treel.in/gdpr",
  },
  openGraph: {
    title: "GDPR  \u00b7  Treel",
    description: "Treel's GDPR readiness for future European Union deployments. Data subject rights, data protection officer contact, and lawful bases for processing.",
    url: "https://treel.in/gdpr",
  },
};

export default function GdprPage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">GDPR page</h1>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">LEGAL</div>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>H1: GDPR</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Effective date: `1 October 2026</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Note: `Placeholder page. Full activation on European Union deployment (Month 8+ per current roadmap).</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">The EU General Data Protection Regulation (GDPR) governs the processing of personal data of individuals in the European Union. Treel currently operates primarily in India and does not knowingly collect personal data of EU residents through targeted commercial activities.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">For future European Union deployments (planned for Month 8+ of our current roadmap), we maintain GDPR-ready architecture, contracts, and processes. This page will be expanded to full detail at that time.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">If you are an EU resident and believe we may hold your personal data, you have the following rights under GDPR:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Right of access** — request confirmation and a copy of your personal data</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Right to rectification** — request correction of inaccurate data</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Right to erasure** ("right to be forgotten") — request deletion of your data</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Right to restriction of processing** — request temporary halt to processing</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Right to data portability** — request your data in a machine-readable format</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Right to object** — object to processing based on legitimate interests or direct marketing</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Rights related to automated decision-making** — request human review of automated decisions with legal effect</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">When Treel processes personal data of EU residents, we rely on one of these lawful bases:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Consent** — you have given explicit consent for a specific purpose</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Contract** — processing is necessary to perform a contract with you</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Legal obligation** — processing is required by law</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Legitimate interests** — processing is necessary for our legitimate business interests, balanced against your rights</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">When we transfer EU personal data outside the European Economic Area, we use appropriate safeguards including Standard Contractual Clauses (SCCs) or reliance on adequacy decisions where available.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">For GDPR-related requests or concerns:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Data Protection Officer**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel Mobility Solutions Private Limited</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Email: **dpo@treel.in**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Postal: S.No. 6/1B, 6/4, 7/4, Plot No. 02, Laxmi Vishnupuram Amenities Business, NDA Road, Village Shivane, Tal. Haveli, Pune, Maharashtra 411023</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">If you believe our processing of your personal data violates GDPR, you have the right to lodge a complaint with your local Data Protection Authority.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Dev note:** This is a placeholder page for launch. Activate full GDPR compliance content when EU deployment commences. Prior to EU activation, this page primarily serves to demonstrate readiness to enterprise buyers evaluating Treel for European operations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}