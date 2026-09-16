import type { Metadata } from "next";
import Link from "next/link";
import { 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  Layers, 
  Download 
} from "lucide-react";
import { WhitepaperGatedForm } from "../roi-fleet-intelligence/whitepaper-form";

interface WhitepaperDetail {
  slug: string;
  topic: string;
  title: string;
  date: string;
  length: string;
  abstract: string;
  chapters: string[];
  relatedSlugs: string[];
}

const PAPERS: Record<string, WhitepaperDetail> = {
  "case-study-1000-truck": {
    slug: "case-study-1000-truck",
    topic: "Fleet Operations",
    title: "The 1,000-Truck Case Study: Operational Payback in Week 11",
    date: "November 2026",
    length: "18 pages",
    abstract: "A comprehensive operational deployment analysis of one thousand multi-axle commercial freight trucks equipped with Treel smart valve sensors. The study documents tyre carcass wear reduction, fuel consumption drops of 3.4%, and total system capital expenditure recouped in eleven weeks of continuous freight transport across national logistics corridors.",
    chapters: [
      "01. Baseline Fleet Economics & Unplanned Downtime Analysis",
      "02. Sensor Deployment & Depot Integration Timelines",
      "03. Micro-leak Detection & Puncture Preemption Metrics",
      "04. Fuel Consumption Variance by Axle Pressure Discrepancy",
      "05. Total Payback Calculation & Depot ROI Matrix",
    ],
    relatedSlugs: ["roi-fleet-intelligence", "data-architecture"],
  },
  "vehicle-digital-twin": {
    slug: "vehicle-digital-twin",
    topic: "Vehicle Digital Twin",
    title: "The Vehicle Digital Twin Technical Architecture Paper",
    date: "Q4 2026",
    length: "32 pages",
    abstract: "The mathematical and thermodynamic foundations of Treel's five-layer digital twin converting raw wheel-end sensor signals into predictive vehicle health state. Explores state accumulation, thermal decay curves, retread durability modeling, and real-time anomaly classification.",
    chapters: [
      "01. Physical State Ingestion & 24 Hz Edge Telemetry",
      "02. Dynamic Thermal Accumulation Modeling",
      "03. Carcass Stress Cycles & Retread Durability Predictability",
      "04. Multi-Axle Differential Load Estimation",
      "05. Cloud Inference & Maintenance Dispatch Automation",
    ],
    relatedSlugs: ["data-architecture", "case-study-1000-truck"],
  },
  "predictive-maintenance-heavy": {
    slug: "predictive-maintenance-heavy",
    topic: "Predictive Maintenance",
    title: "Predictive Maintenance in Heavy Haulage & Mining",
    date: "November 2025",
    length: "22 pages",
    abstract: "Field telemetry analysis of extreme-load tippers and dump trucks operating in open-cast mining and severe infrastructure environments. Examines early detection of thermal carcass delamination under 50-ton axle stresses.",
    chapters: [
      "01. Off-Highway Operating Environments & Extreme Thermal Stress",
      "02. Sensor Resilience Under Severe Mechanical Shock & Submersion",
      "03. Thermodynamic Pre-failure Signatures & Puncture Gradients",
      "04. Operational Safety Protocols for High-Risk Haulage Routes",
    ],
    relatedSlugs: ["case-study-1000-truck", "roi-fleet-intelligence"],
  },
  "infrastructure-construction-fleets": {
    slug: "infrastructure-construction-fleets",
    topic: "Fleet Operations",
    title: "Fleet Operations in Infrastructure Construction",
    date: "August 2025",
    length: "20 pages",
    abstract: "Performance benchmarks of transit mixers and construction tippers across severe ambient temperatures and unpaved haul roads. Details concrete transport uptime preservation and carcass salvage rates.",
    chapters: [
      "01. Construction Fleet Operating Challenges & Cycle Deadlines",
      "02. Continuous Pressure Tracking in Heavy Slump Delivery",
      "03. Carcass Preservation Across Unpaved Crushed Stone Roads",
      "04. Economic Value of Extended Retread Cycles & Salvaged Carcasses",
    ],
    relatedSlugs: ["predictive-maintenance-heavy", "case-study-1000-truck"],
  },
};

export function generateStaticParams() {
  return Object.keys(PAPERS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const paper = PAPERS[slug] || PAPERS["case-study-1000-truck"];

  return {
    title: `${paper.title} · Treel Research`,
    description: paper.abstract.slice(0, 150) + "...",
    alternates: {
      canonical: `https://treel.in/research/${paper.slug}`,
    },
    openGraph: {
      title: `${paper.title} · Treel Research`,
      description: paper.abstract.slice(0, 150) + "...",
      url: `https://treel.in/research/${paper.slug}`,
    },
  };
}

export default async function ResearchSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = PAPERS[slug] || {
    slug,
    topic: "Mobility Intelligence",
    title: "Commercial Vehicle Digital Twin Research",
    date: "2026",
    length: "24 pages",
    abstract: "Comprehensive examination of commercial vehicle telematics, thermodynamic wheel modeling, and predictive maintenance schedules across enterprise logistics fleets in India.",
    chapters: [
      "01. Introduction to Wheel-End Telemetry",
      "02. Telemetry Processing & Anomaly Detection",
      "03. Fleet Financial Returns & Operational Payback",
      "04. Deployment Case Studies & Methodology",
    ],
    relatedSlugs: ["case-study-1000-truck", "vehicle-digital-twin"],
  };

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HEADER & HERO */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Link href="/research" className="hover:text-[#FAF7F2] transition-colors">
                Research
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#D5573B] truncate max-w-xs">{paper.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase px-3 py-0.5 rounded-[4px] bg-[#D5573B]/10 text-[#D5573B] border border-[#D5573B]/20 font-semibold tracking-wider">
                {paper.topic}
              </span>
            </div>

            <h1 className="font-fraunces text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              {paper.title}
            </h1>

            {/* Publication Details */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10 text-xs font-mono text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D5573B]" />
                <span>Published {paper.date}</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D5573B]" />
                <span>{paper.length}</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#D5573B]" />
                <span className="text-[#FAF7F2]">By Treel Research Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TWO-COLUMN LAYOUT: LEFT = ABSTRACT & CHAPTERS; RIGHT = GATED FORM */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column (7 cols): Abstract & Chapters */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                  EXECUTIVE SUMMARY
                </span>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                  What this paper covers
                </h2>
                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                  {paper.abstract}
                </p>
              </div>

              <div className="space-y-6 pt-8 border-t border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                    TABLE OF CONTENTS
                  </span>
                  <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight mt-1">
                    In this paper
                  </h2>
                </div>

                <div className="space-y-3">
                  {paper.chapters.map((chapter, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.08] text-sm text-[#FAF7F2] font-mono flex items-center gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#D5573B] shrink-0" />
                      <span>{chapter}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Gated Download Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 p-8 rounded-lg bg-white/[0.03] border border-white/10 space-y-6 shadow-xl">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                    INSTANT ACCESS
                  </span>
                  <h3 className="font-fraunces text-2xl font-medium text-[#FAF7F2]">
                    Unlock the full paper
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Enter your details to receive the full whitepaper by email. No promotional spam. Unsubscribe anytime.
                  </p>
                </div>

                <WhitepaperGatedForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED RESEARCH */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
              Related research
            </h2>
            <Link href="/research" className="text-xs font-semibold text-[#D5573B] hover:underline flex items-center gap-1">
              <span>View research library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/research/roi-fleet-intelligence"
              className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#D5573B]/10 text-[#D5573B] border border-[#D5573B]/20 font-semibold">
                  ROI &amp; Payback
                </span>
                <h4 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors leading-snug">
                  The Fleet ROI and Fuel Savings Paper
                </h4>
                <p className="text-xs text-[#94A3B8] line-clamp-2">
                  Comprehensive financial and operational analysis of mobility intelligence across commercial vehicle fleets in India.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center gap-1 text-xs font-semibold text-[#D5573B]">
                <span>Download paper</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/research/data-architecture"
              className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#D5573B]/10 text-[#D5573B] border border-[#D5573B]/20 font-semibold">
                  Mobility Intelligence
                </span>
                <h4 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors leading-snug">
                  Data Architecture &amp; Telemetry Ingestion at Enterprise Scale
                </h4>
                <p className="text-xs text-[#94A3B8] line-clamp-2">
                  Technical whitepaper on Treel&apos;s distributed IoT data architecture and sub-second telemetry ingestion engine.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center gap-1 text-xs font-semibold text-[#D5573B]">
                <span>Download paper</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}