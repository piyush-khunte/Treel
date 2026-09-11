import type { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  FileCode, 
  AlertTriangle, 
  Key, 
  CheckCircle2, 
  ArrowRight,
  Database,
  RefreshCw,
  Eye,
  FileText
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security  ·  TMIP",
  description: "TMIP security posture: certifications, infrastructure security, data security, application security, incident response, responsible disclosure. For enterprise buyers.",
  alternates: {
    canonical: "https://treel.in/tmip/security",
  },
  openGraph: {
    title: "Security  ·  TMIP",
    description: "TMIP security posture: certifications, infrastructure security, data security, application security, incident response, responsible disclosure. For enterprise buyers.",
    url: "https://treel.in/tmip/security",
  },
};

export default function TmipSecurityPage() {
  const certifications = [
    {
      title: "SOC 2 Type II",
      status: "In progress",
      desc: "Comprehensive evaluation of security, availability, and processing integrity controls."
    },
    {
      title: "ISO 27001",
      status: "In progress",
      desc: "Information security management system certification aligned with global standards."
    },
    {
      title: "India DPDP Act 2023",
      status: "Compliant",
      desc: "Full architectural alignment with statutory data principal rights and consent requirements."
    },
    {
      title: "ARAI Certification",
      status: "Active",
      desc: "Automotive Research Association of India hardware certification for wheel-mounted sensors."
    }
  ];

  const infrastructurePoints = [
    "Cloud infrastructure with regional redundancy and automated failover",
    "99.7% platform uptime, trailing 90-day rolling average",
    "Backups exercised quarterly with restore validation",
    "Network segmentation with zero-trust principles for admin access",
    "DDoS protection at edge and application layers"
  ];

  const dataSecurityPoints = [
    {
      label: "Encryption in transit",
      detail: "TLS 1.3 for all client connections, webhooks, and telemetry ingestion APIs."
    },
    {
      label: "Encryption at rest",
      detail: "AES-256 encryption across all persisted databases, disk volumes, and telemetry cold storage."
    },
    {
      label: "Logical isolation",
      detail: "Every customer's data is isolated by design at the database and ingestion pipeline layers."
    },
    {
      label: "Retention controls",
      detail: "Custom data retention and automated purging rules configured per customer contract."
    },
    {
      label: "Right to delete",
      detail: "Data principal deletion requests are processed strictly within statutory DPDP Act 2023 timelines."
    },
    {
      label: "No data sale",
      detail: "TMIP does not sell customer data. Not aggregated, not anonymised, under any commercial circumstance."
    }
  ];

  const appSecurityPoints = [
    {
      label: "Authentication",
      detail: "Role-based access control (RBAC) with mandatory MFA for privileged and administrative actions."
    },
    {
      label: "Session management",
      detail: "Server-authoritative session state with configurable inactivity timeouts."
    },
    {
      label: "Audit logging",
      detail: "All operator actions, dashboard logins, and API calls logged immutably and queryable."
    },
    {
      label: "API security",
      detail: "Cryptographically signed webhooks, rate limiting, and zero-downtime key rotation."
    },
    {
      label: "Penetration testing",
      detail: "Quarterly independent black-box and white-box assessments by certified third-party security firms."
    },
    {
      label: "Vulnerability disclosure",
      detail: "Public responsible disclosure program with 48-hour response commitment."
    }
  ];

  const incidentResponseSteps = [
    "Immediate containment and technical impact assessment",
    "Customer notification within contractual SLA (typically 24-72 hours depending on severity)",
    "Comprehensive post-incident report within 30 days",
    "Root cause analysis and validated remediation actions",
    "Regulator notification where required by applicable law"
  ];

  return (
    <div className="space-y-0 bg-[#050A17] text-[#E5E7EB] font-ibm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">
              SECURITY
            </div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              How we protect the data your fleet runs on.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm max-w-3xl">
              TMIP is trusted by two hundred enterprise fleets with sixty-eight thousand vehicles under management. That trust is built on a security posture designed for enterprise buyers. Below is what we do, in detail.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Certifications
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed font-ibm">
                Our compliance framework undergoes continuous evaluation against international and statutory standards:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-space text-lg font-bold text-[#F1F5F9]">
                        {cert.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] font-semibold uppercase">
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-ibm">
                      {cert.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20 border-b border-white/10 bg-[#070D1D]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Infrastructure
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed font-ibm">
                High-availability telemetry ingestion built on resilient, redundant cloud architecture:
              </p>
            </div>

            <div className="space-y-3">
              {infrastructurePoints.map((point, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-[#0B1220] border border-white/10 flex items-start gap-3.5"
                >
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm sm:text-base text-[#FAF7F2] font-ibm">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Data
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed font-ibm">
                Rigorous multi-layer cryptographic controls protecting telemetry and operational insights:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dataSecurityPoints.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    <h3 className="font-space text-base font-bold text-[#F1F5F9]">
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-ibm">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Security */}
      <section className="py-20 border-b border-white/10 bg-[#070D1D]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Application
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed font-ibm">
                Continuous software security enforcement across client dashboards and programmatic APIs:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {appSecurityPoints.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    <h3 className="font-space text-base font-bold text-[#F1F5F9]">
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-ibm">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Incident response
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">
                Treel operates a 24/7 incident response process for security events. In the event of a confirmed security incident:
              </p>
            </div>

            <div className="space-y-3">
              {incidentResponseSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-[#0B1220] border border-white/10 flex items-start gap-4"
                >
                  <span className="w-6 h-6 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] font-mono text-xs font-semibold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base text-[#FAF7F2] font-ibm">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="py-20 border-b border-white/10 bg-[#070D1D]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="space-y-3">
              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Reporting a security concern
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">
                If you have identified a security vulnerability in TMIP or Treel infrastructure, we would like to hear from you.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-ibm">
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#3B82F6]">Contact</div>
                  <a href="mailto:security@treel.in" className="text-[#F1F5F9] underline hover:text-[#3B82F6]">
                    security@treel.in
                  </a>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#3B82F6]">PGP Key</div>
                  <Link href="/.well-known/security.txt" className="text-[#F1F5F9] underline hover:text-[#3B82F6]">
                    /.well-known/security.txt
                  </Link>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#3B82F6]">Response Commitment</div>
                  <div className="text-[#F1F5F9]">Within 48 hours of receipt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Security Documentation Package CTA */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0B1220] to-[#070D1D] border border-white/15 space-y-6">
            <div className="space-y-2">
              <h2 className="font-space text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                Full vendor assessment package
              </h2>
              <p className="text-base text-[#94A3B8] leading-relaxed font-ibm max-w-2xl">
                Enterprise buyers evaluating TMIP often need to complete vendor security assessments. We provide a full security documentation package including SOC 2 reports, penetration test summaries, network diagrams, data flow diagrams, and business continuity documentation to prospects under NDA.
              </p>
            </div>

            <div className="pt-2">
              <Link 
                href="/contact?subject=Enterprise&context=Security%20documentation%20request" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-[#050A17] hover:bg-[#60A5FA]"
              >
                <span>Request security documentation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
