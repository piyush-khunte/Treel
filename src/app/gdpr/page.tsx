import type { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Globe, 
  FileCheck2, 
  UserCheck, 
  RefreshCw, 
  Trash2, 
  PauseCircle, 
  DownloadCloud, 
  ShieldAlert, 
  SlidersHorizontal,
  Mail, 
  MapPin, 
  Building2,
  Info,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "GDPR · Treel",
  description:
    "Treel's GDPR readiness for future European Union deployments. Data subject rights, data protection officer contact, and lawful bases for processing.",
  alternates: {
    canonical: "https://treel.in/gdpr",
  },
  openGraph: {
    title: "GDPR · Treel",
    description:
      "Treel's GDPR readiness for future European Union deployments. Data subject rights, data protection officer contact, and lawful bases for processing.",
    url: "https://treel.in/gdpr",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GdprPage() {
  const sections = [
    { id: "applicability", title: "1. Applicability" },
    { id: "data-subject-rights", title: "2. GDPR Data Subject Rights" },
    { id: "legal-basis", title: "3. Legal Basis for Processing" },
    { id: "cross-border-transfer", title: "4. Cross-Border Data Transfer" },
    { id: "contact-dpo", title: "5. Contact our Data Protection Officer" },
    { id: "lodge-complaint", title: "6. Right to Lodge a Complaint" },
  ];

  const dataSubjectRights = [
    {
      title: "Right of access",
      description: "Request confirmation and a copy of your personal data.",
      icon: UserCheck,
    },
    {
      title: "Right to rectification",
      description: "Request correction of inaccurate data.",
      icon: RefreshCw,
    },
    {
      title: "Right to erasure",
      description: "\"Right to be forgotten\" — request deletion of your data.",
      icon: Trash2,
    },
    {
      title: "Right to restriction of processing",
      description: "Request temporary halt to processing.",
      icon: PauseCircle,
    },
    {
      title: "Right to data portability",
      description: "Request your data in a machine-readable format.",
      icon: DownloadCloud,
    },
    {
      title: "Right to object",
      description: "Object to processing based on legitimate interests or direct marketing.",
      icon: ShieldAlert,
    },
    {
      title: "Rights related to automated decision-making",
      description: "Request human review of automated decisions with legal effect.",
      icon: SlidersHorizontal,
    },
  ];

  const lawfulBases = [
    {
      basis: "Consent",
      description: "You have given explicit consent for a specific purpose.",
      badge: "User Choice",
    },
    {
      basis: "Contract",
      description: "Processing is necessary to perform a contract with you.",
      badge: "Operational",
    },
    {
      basis: "Legal obligation",
      description: "Processing is required by law.",
      badge: "Mandatory",
    },
    {
      basis: "Legitimate interests",
      description:
        "Processing is necessary for our legitimate business interests, balanced against your rights.",
      badge: "Balanced",
    },
  ];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter min-h-screen">
      {/* Header & Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-white/[0.08]">
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "GDPR" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
                LEGAL
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              GDPR
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] pt-2">
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                Effective date: 1 October 2026
              </span>
              <span className="px-3 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/30 text-[#D5573B] font-semibold">
                Jurisdiction: European Union Readiness
              </span>
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[#94A3B8]">
                treel.in/gdpr
              </span>
            </div>

            {/* Status Note Information Block */}
            <div className="mt-8 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-white/[0.04] to-white/[0.02] border border-white/[0.12] flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-[#D5573B]/10 text-[#D5573B] shrink-0 mt-0.5">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1.5 text-sm sm:text-base leading-relaxed">
                <div className="font-fraunces text-base font-medium text-[#FAF7F2]">
                  Current Status &amp; EU Deployment Roadmap
                </div>
                <p className="text-[#94A3B8]">
                  Placeholder page. Full activation on European Union deployment (Month 8+ per current roadmap).
                </p>
                <p className="text-xs text-[#94A3B8]/80 font-mono pt-1">
                  Prior to EU activation, this framework demonstrates architecture and process readiness for enterprise buyers evaluating Treel across European fleets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#D5573B] font-semibold flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                  Table of Contents
                </div>
                <nav aria-label="GDPR sections" className="space-y-1.5 text-sm font-inter">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block py-2 px-3 rounded-lg text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/[0.04] transition-colors border-b border-white/[0.04] last:border-0"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>

                <div className="pt-4 border-t border-white/[0.08] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                    DPO Inquiries
                  </div>
                  <a
                    href="mailto:dpo@treel.in"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#D5573B] hover:text-[#E06A50] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    dpo@treel.in
                  </a>
                </div>
              </div>
            </aside>

            {/* Document Body */}
            <main id="main-content" className="lg:col-span-8 space-y-16 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-inter">
              {/* Section 1: Applicability */}
              <section id="applicability" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  1. Applicability
                </h2>
                <div className="space-y-4">
                  <p>
                    The EU General Data Protection Regulation (GDPR) governs the processing of personal data of individuals in the European Union. Treel currently operates primarily in India and does not knowingly collect personal data of EU residents through targeted commercial activities.
                  </p>
                  <p>
                    For future European Union deployments (planned for Month 8+ of our current roadmap), we maintain GDPR-ready architecture, contracts, and processes. This page will be expanded to full detail at that time.
                  </p>
                </div>
              </section>

              {/* Section 2: Data Subject Rights */}
              <section id="data-subject-rights" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  2. GDPR Data Subject Rights
                </h2>
                <p>
                  If you are an EU resident and believe we may hold your personal data, you have the following rights under GDPR:
                </p>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  {dataSubjectRights.map((right, index) => {
                    const Icon = right.icon;
                    return (
                      <div
                        key={right.title}
                        className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] transition-colors flex items-start gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] shrink-0 mt-0.5">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-base font-semibold text-[#FAF7F2] flex items-center gap-2">
                            <span>{index + 1}. {right.title}</span>
                          </div>
                          <p className="text-sm text-[#94A3B8] leading-relaxed">
                            {right.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 3: Legal Basis */}
              <section id="legal-basis" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  3. Legal Basis for Processing
                </h2>
                <p>
                  When Treel processes personal data of EU residents, we rely on one of these lawful bases:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {lawfulBases.map((basis) => (
                    <div
                      key={basis.basis}
                      className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                          {basis.basis}
                        </h3>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#D5573B]">
                          {basis.badge}
                        </span>
                      </div>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {basis.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: Cross-Border Data Transfer */}
              <section id="cross-border-transfer" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  4. Cross-Border Data Transfer
                </h2>
                <p>
                  When we transfer EU personal data outside the European Economic Area, we use appropriate safeguards including Standard Contractual Clauses (SCCs) or reliance on adequacy decisions where available.
                </p>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="font-medium text-[#FAF7F2]">
                      Safeguards and Standard Contractual Clauses (SCCs)
                    </div>
                    <p className="text-[#94A3B8] leading-relaxed">
                      Our international infrastructure guarantees that any prospective data transfer outside the EEA is covered by standard contractual protections approved by the European Commission, ensuring persistent data subject rights and comprehensive technical isolation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5: Data Protection Officer */}
              <section id="contact-dpo" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  5. Contact our Data Protection Officer
                </h2>
                <p>
                  For GDPR-related requests or concerns:
                </p>

                <div className="p-6 sm:p-8 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] shrink-0">
                      <Building2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                        Data Protection Officer
                      </h3>
                      <p className="text-xs text-[#94A3B8] font-mono">
                        Treel Mobility Solutions Private Limited
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#FAF7F2] font-semibold flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#D5573B]" aria-hidden="true" />
                        Electronic Mail
                      </div>
                      <div>
                        <a
                          href="mailto:dpo@treel.in"
                          className="text-[#FAF7F2] hover:text-[#D5573B] font-semibold text-base transition-colors underline decoration-[#D5573B]/40 hover:decoration-[#D5573B]"
                        >
                          dpo@treel.in
                        </a>
                        <p className="text-xs text-[#94A3B8] pt-1">
                          Direct mailbox for EU data subject inquiries and rights requests.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#FAF7F2] font-semibold flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#D5573B]" aria-hidden="true" />
                        Postal Address
                      </div>
                      <address className="not-italic text-sm text-[#94A3B8] leading-relaxed">
                        S.No. 6/1B, 6/4, 7/4, Plot No. 02,<br />
                        Laxmi Vishnupuram Amenities Business,<br />
                        NDA Road, Village Shivane,<br />
                        Tal. Haveli, Pune, Maharashtra 411023
                      </address>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Right to Lodge a Complaint */}
              <section id="lodge-complaint" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  6. Right to Lodge a Complaint
                </h2>
                <p>
                  If you believe our processing of your personal data violates GDPR, you have the right to lodge a complaint with your local Data Protection Authority.
                </p>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}