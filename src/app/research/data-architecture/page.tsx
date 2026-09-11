import type { Metadata } from "next";
import Link from "next/link";
import { 
  FileText, 
  Calendar, 
  User, 
  BookOpen, 
  ChevronRight,
  ArrowRight,
  Cpu,
  Server,
  Zap,
  Layers,
  Database
} from "lucide-react";
import { DataArchWhitepaperGatedForm } from "./whitepaper-form";

export const metadata: Metadata = {
  title: "Data Architecture & Telemetry Ingestion at Enterprise Scale  ·  Treel Research",
  description: "Technical whitepaper on Treel's distributed IoT data architecture, sub-second telemetry ingestion, dual-state persistence, and Vehicle Digital Twin engine.",
  alternates: {
    canonical: "https://treel.in/research/data-architecture",
  },
  openGraph: {
    title: "Data Architecture & Telemetry Ingestion at Enterprise Scale  ·  Treel Research",
    description: "Technical whitepaper on Treel's distributed IoT data architecture, sub-second telemetry ingestion, dual-state persistence, and Vehicle Digital Twin engine.",
    url: "https://treel.in/research/data-architecture",
  },
};

export default function ResearchDataArchitecturePage() {
  const tableOfContents = [
    {
      num: "01",
      title: "High-Throughput Edge Ingestion: Cellular Disruption & Store-and-Forward Buffering"
    },
    {
      num: "02",
      title: "Event Stream Architecture: De-duplication, Clock Drift Correction & Serialization"
    },
    {
      num: "03",
      title: "Dual-State Persistence: Live Digital Twin Models vs. Immutable Historical Logs"
    },
    {
      num: "04",
      title: "Multi-Tenant Data Isolation & Role-Based Access Control (RBAC)"
    },
    {
      num: "05",
      title: "Regulatory Compliance: India DPDP Act 2023, Automated Redaction & Audit Trails"
    },
    {
      num: "06",
      title: "Disaster Recovery & Regional Failover: Achieving 99.7% Availability"
    }
  ];

  const relatedResearch = [
    {
      slug: "roi-fleet-intelligence",
      topic: "ROI & PAYBACK",
      title: "The Fleet ROI and Fuel Savings Paper",
      desc: "Financial and operational payback modelling across 200+ commercial vehicle fleets.",
      pages: "24 pages"
    },
    {
      slug: "customers/case-studies",
      topic: "ENTERPRISE DEPLOYMENTS",
      title: "The 1,000-Truck Case Study",
      desc: "Operational benchmarks and downtime reduction across national logistics prime movers.",
      pages: "16 pages"
    },
    {
      slug: "insights/vehicle-digital-twins-architecture",
      topic: "MOBILITY INTELLIGENCE",
      title: "From Telemetry to Reasoning: The Architecture of Vehicle Digital Twins",
      desc: "How sub-second sensor signals transform into predictive maintenance models.",
      pages: "6 min read"
    }
  ];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Header & Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Link href="/research" className="hover:text-white transition-colors">
                Research
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#D5573B]">Data Architecture &amp; Telemetry Ingestion</span>
            </nav>

            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-[4px] inline-block">
              DATA INFRASTRUCTURE
            </div>

            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Data Architecture &amp; Telemetry Ingestion at Enterprise Scale
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-mono text-[#94A3B8] border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D5573B]" />
                <span>Published Q3 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D5573B]" />
                <span>28 pages</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#D5573B]" />
                <span>By Treel Research</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Gated Download Grid */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Abstract, Diagram & Table of Contents */}
            <div className="lg:col-span-7 space-y-12">
              {/* Abstract */}
              <div className="space-y-4">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                  What this paper covers
                </h2>
                <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                  An architectural deep dive into the engineering foundations powering India&apos;s largest connected commercial vehicle dataset. Based on longitudinal empirical telemetry across 68,000+ active commercial vehicles, this paper details the distributed pipeline required to ingest, validate, and reason over sub-second sensor signals in real time.
                </p>
                <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                  We explore edge store-and-forward resilience across cellular dead zones on Indian freight highways, dual-state database persistence separating queryable hot digital twins from immutable append-only telemetry history, tenant cryptographic isolation, and regulatory compliance under the India DPDP Act 2023.
                </p>
              </div>

              {/* Architecture Visual Area */}
              <div className="rounded-lg bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/[0.08] p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                  ARCHITECTURE STACK OVERVIEW
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                    <div className="text-xs font-mono text-[#D5573B] font-bold">TIER 1</div>
                    <div className="font-fraunces text-sm font-medium text-[#FAF7F2]">Edge Buffer</div>
                    <div className="text-xs text-[#94A3B8]">Offline telemetry cache &amp; flash de-duplication</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                    <div className="text-xs font-mono text-[#D5573B] font-bold">TIER 2</div>
                    <div className="font-fraunces text-sm font-medium text-[#FAF7F2]">Stream Engine</div>
                    <div className="text-xs text-[#94A3B8]">Sub-second message broker with clock correction</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                    <div className="text-xs font-mono text-[#D5573B] font-bold">TIER 3</div>
                    <div className="font-fraunces text-sm font-medium text-[#FAF7F2]">Digital Twin</div>
                    <div className="text-xs text-[#94A3B8]">Dual-state persistence &amp; append-only history</div>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 space-y-6">
                <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-[#D5573B]" />
                  <span>In this paper</span>
                </h3>

                <ul className="space-y-4">
                  {tableOfContents.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                      <span className="font-mono text-xs text-[#D5573B] font-bold mt-1">{item.num}</span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Gated Download Form */}
            <div className="lg:col-span-5 sticky top-28">
              <DataArchWhitepaperGatedForm />
            </div>
          </div>
        </div>
      </section>

      {/* Related Whitepapers Strip */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
              Related research
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedResearch.map((rel, idx) => (
                <Link
                  key={idx}
                  href={`/${rel.slug}`}
                  className="group p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#D5573B] font-semibold">
                      {rel.topic}
                    </div>
                    <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed font-inter">
                      {rel.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] pt-2 border-t border-white/5">
                    <span>{rel.pages}</span>
                    <span className="text-[#D5573B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
