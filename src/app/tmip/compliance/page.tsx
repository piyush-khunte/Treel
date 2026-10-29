import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Lock, Globe2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certifications & Compliance · TMIP | Treel Mobility",
  description: "TMIP automotive and enterprise compliance posture: IATF 16949, ISO 27001, GDPR, India DPDP Act 2023, FCC & CE telematics certifications, and IP65/IP67 environmental ratings.",
  alternates: {
    canonical: "https://treel.in/tmip/compliance",
  },
  openGraph: {
    title: "Certifications & Compliance · TMIP | Treel Mobility",
    description: "TMIP automotive and enterprise compliance posture: IATF 16949, ISO 27001, GDPR, India DPDP Act 2023, FCC & CE telematics certifications, and IP65/IP67 environmental ratings.",
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
      <section className="relative z-10 pt-12 sm:pt-16 pb-8 sm:pb-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <Breadcrumb
              variant="tmip"
              items={[
                { label: "TMIP", href: "/tmip" },
                { label: "Compliance & Certifications" },
              ]}
            />
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
              STANDARDS &amp; GOVERNANCE
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Compliance is a floor, not a ceiling.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              From automotive manufacturing quality (IATF 16949) to military-grade environmental sealing (IP65 / IP67) and global enterprise data governance (ISO 27001, GDPR), Treel engineering adheres to the strictest tier-1 standards.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="relative z-10 py-8 sm:py-10 border-b border-slate-400/10 bg-[#0B1220]/50">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-xl border border-white/10 bg-[#0E1626]/80 space-y-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="font-space-grotesk text-lg font-bold text-white">IATF 16949</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Automotive Quality Management System aligned for OEM and tier-1 assembly lines.
              </p>
            </div>
            <div className="p-5 sm:p-6 rounded-xl border border-white/10 bg-[#0E1626]/80 space-y-2.5">
              <Lock className="w-6 h-6 text-blue-400" />
              <h3 className="font-space-grotesk text-lg font-bold text-white">ISO 27001</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Information Security Management System ensuring end-to-end cloud and telematics data integrity.
              </p>
            </div>
            <div className="p-5 sm:p-6 rounded-xl border border-white/10 bg-[#0E1626]/80 space-y-2.5">
              <Globe2 className="w-6 h-6 text-amber-400" />
              <h3 className="font-space-grotesk text-lg font-bold text-white">GDPR &amp; DPDP</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Comprehensive data privacy frameworks for EU deployments and India DPDP Act 2023.
              </p>
            </div>
            <div className="p-5 sm:p-6 rounded-xl border border-white/10 bg-[#0E1626]/80 space-y-2.5">
              <Cpu className="w-6 h-6 text-purple-400" />
              <h3 className="font-space-grotesk text-lg font-bold text-white">FCC &amp; CE</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Radio frequency and electromagnetic compatibility certifications for global exports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Automotive Quality: IATF 16949 */}
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 font-semibold">
              AUTOMOTIVE MANUFACTURING STANDARD
            </div>
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              IATF 16949 Automotive Quality Certification
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
              Treel hardware production facilities operate under IATF 16949 standards, the global technical specification and quality management standard for the automotive industry. This ensures zero-defect manufacturing, continuous improvement, and supply chain consistency required by leading commercial vehicle manufacturers.
            </p>
            <ul className="space-y-2.5 pt-1">
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">PPAP (Production Part Approval Process):</strong> Level 3 production qualification for OEM assembly line integration.</span>
              </li>
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Traceability:</strong> Laser-etched individual QR/serial tracking for 100% component-level provenance across sensor lifecycles.</span>
              </li>
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Automotive Grade Components:</strong> AEC-Q qualified semiconductors and silicon pressure cells rated for extreme thermal cycling (-40°C to +125°C).</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Hardware Enclosure & Environmental Sealing: IP65 / IP67 */}
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 font-semibold">
              INGRESS PROTECTION &amp; DURABILITY
            </div>
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              IP65 &amp; IP67 Environmental Sealing
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
              Commercial wheel-ends and off-the-road (OTR) axles face high-pressure jet washing, abrasive slurry, chemical road salts, and full water submersion. Treel external and internal valve-mount sensors meet stringent IP65 and IP67 ingress protection specifications:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-1">
              <div className="p-5 sm:p-6 rounded-lg bg-[#0E1626] border border-cyan-500/20 space-y-2">
                <h4 className="text-white font-bold text-lg font-space-grotesk">IP65 Specification</h4>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Dust-tight protection against total particulate ingress and resistant to low/medium pressure water jets from all angles during vehicle maintenance washdowns.
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-lg bg-[#0E1626] border border-cyan-500/20 space-y-2">
                <h4 className="text-white font-bold text-lg font-space-grotesk">IP67 Specification</h4>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Hermetically sealed against complete dust ingress and continuous operational immersion in water up to 1 metre depth for 30 minutes in water crossings and wet quarry pits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Global Telematics Certifications: FCC & CE */}
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-400 font-semibold">
              GLOBAL TELECOMMUNICATIONS &amp; EMC
            </div>
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              FCC &amp; CE Telematics Certifications
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
              To support global fleet export and international cross-border logistics, Treel telemetry hubs and wireless sensor transmissions are certified under North American FCC standards and European CE conformity directives.
            </p>
            <ul className="space-y-2.5 pt-1">
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span><strong className="text-white">FCC Part 15 Certified:</strong> Validated electromagnetic emissions and radio frequency immunity for commercial vehicle electronics in North America.</span>
              </li>
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span><strong className="text-white">CE RED (Radio Equipment Directive):</strong> Full conformity with European health, electromagnetic compatibility (EMC), and radio spectrum efficiency directives.</span>
              </li>
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span><strong className="text-white">ARAI &amp; AIS-004 / AIS-140:</strong> Indian automotive regulatory compliance for in-vehicle telemetry and sensor safety.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Enterprise Information Security: ISO/IEC 27001 */}
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 font-semibold">
              INFORMATION SECURITY MANAGEMENT
            </div>
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              ISO/IEC 27001 Information Security
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
              Treel cloud infrastructure and software development lifecycle are governed by ISO/IEC 27001 controls. We safeguard fleet telemetry, driver analytics, and ERP integration endpoints against unauthorized access, service disruptions, and data tampering.
            </p>
            <ul className="space-y-2.5 pt-1">
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span><strong className="text-white">End-to-End Encryption:</strong> TLS 1.3 in transit and AES-256 for resting telemetry and Vehicle Digital Twin archives.</span>
              </li>
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span><strong className="text-white">Role-Based Access Control (RBAC):</strong> Granular permissions with mandatory multi-factor authentication (MFA) across all administrative portals.</span>
              </li>
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span><strong className="text-white">Vulnerability Management:</strong> Continuous automated scanning and regular third-party penetration testing.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Data Privacy: India DPDP Act 2023 & GDPR */}
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              India DPDP Act 2023 &amp; European GDPR
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
              Treel is strictly aligned with the India Digital Personal Data Protection Act (DPDP) 2023 and maintains pre-configured readiness for European Union General Data Protection Regulation (GDPR) requirements for international fleet operators.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-2">
              <div className="p-5 sm:p-6 rounded-xl border border-white/10 bg-[#0E1626]/60 space-y-2.5">
                <h3 className="font-space-grotesk text-lg font-bold text-white">DPDP Act 2023 Compliance</h3>
                <ul className="space-y-1.5 text-sm text-[#94A3B8]">
                  <li>• Verifiable consent mechanisms for operator &amp; driver identification</li>
                  <li>• Strict purpose limitation tied to contractual fleet management</li>
                  <li>• Statutory Data Principal Rights (access, rectification, erasure)</li>
                  <li>• Dedicated Data Protection Officer: <span className="text-blue-400 font-mono">dpo@treel.in</span></li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 rounded-xl border border-white/10 bg-[#0E1626]/60 space-y-2.5">
                <h3 className="font-space-grotesk text-lg font-bold text-white">GDPR Global Architecture</h3>
                <ul className="space-y-1.5 text-sm text-[#94A3B8]">
                  <li>• Pre-built Standard Contractual Clauses (SCCs) for cross-border data</li>
                  <li>• Automated Data Subject Request (DSR) handling pipelines</li>
                  <li>• Pseudonymization of vehicle telemetry and driver behavior records</li>
                  <li>• Data Protection Impact Assessments (DPIA) on telematics models</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Industry-specific Regulations */}
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Industry-Specific Safety &amp; Transport Standards
            </h2>
            <ul className="space-y-3 pt-1">
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span><strong className="text-[#F1F5F9] font-semibold">Logistics &amp; Long-Haul:</strong> State Transport Authority compliant telematics reporting and electronic waybill telemetry integration.</span>
              </li>
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span><strong className="text-[#F1F5F9] font-semibold">Mining &amp; Heavy Haul:</strong> Compliance with DGMS (Directorate General of Mines Safety) mandatory safety requirements for off-highway dump trucks and hauliers.</span>
              </li>
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span><strong className="text-[#F1F5F9] font-semibold">Construction &amp; Quarries:</strong> Jobsite environmental, vibration, and heavy-equipment operator safety compliance reporting.</span>
              </li>
              <li className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span><strong className="text-[#F1F5F9] font-semibold">Ports &amp; Terminal Handling:</strong> Severe-duty equipment compliance for reach stackers and straddle carriers operating in high-salinity marine environments.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Data Residency & Sovereignty */}
      <section className="relative z-10 py-10 sm:py-12 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Data Residency &amp; Sovereignty
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
              For Indian enterprise fleets, 100% of Vehicle Digital Twin telemetry and audit data is hosted in MeitY-empaneled tier-4 data centres within India. For international customers, regional data residency clusters in the European Union, MENA, and North America ensure localized compliance with national data sovereignty mandates.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Independent Third-Party Audits */}
      <section className="relative z-10 py-10 sm:py-14 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Third-Party Audits &amp; Certifications
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
              TMIP compliance posture, hardware reliability, and cybersecurity controls are audited annually by independent accredited registrars. Full compliance certificates and SOC2/ISO audit executive summaries are available to enterprise customers under NDA.
            </p>
            <div className="pt-2">
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
