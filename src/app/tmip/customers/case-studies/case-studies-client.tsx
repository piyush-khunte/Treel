"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";

interface CaseStudy {
  id: string;
  slug: string;
  industry: "Logistics" | "Passenger Transport" | "Construction" | "Mining" | "OEM";
  fleetSize: "Under 100" | "100-500" | "500-2000" | "2000+";
  headline: string;
  excerpt: string;
  metricValue: string;
  metricLabel: string;
  isFeatured?: boolean;
}

const studies: CaseStudy[] = [
  {
    id: "1",
    slug: "1000-truck-case-study",
    industry: "Logistics",
    fleetSize: "500-2000",
    headline: "1,000 trucks. 12 months. What changed.",
    excerpt:
      "The full operational story of a large logistics fleet running TMIP for one year. Deployment timeline, operating changes, measured outcomes, and what the operator does differently now.",
    metricValue: "5.2% Fuel · 6.8% Tyre Life",
    metricLabel: "34% downtime drop across 1,000 linehaul units",
    isFeatured: true,
  },
  {
    id: "2",
    slug: "intercity-passenger-express",
    industry: "Passenger Transport",
    fleetSize: "500-2000",
    headline: "Eliminating high-speed tyre failures across 650 luxury intercity coaches.",
    excerpt:
      "How continuous sub-second pressure and heat telemetry eliminated thermal blowouts on high-speed western expressways.",
    metricValue: "0 Bursts",
    metricLabel: "Zero roadside tyre incidents in 18 months",
  },
  {
    id: "3",
    slug: "quarry-transit-tippers",
    industry: "Construction",
    fleetSize: "100-500",
    headline: "Extending tipper tyre life in severe dust-heavy quarry routes.",
    excerpt:
      "Protecting heavy multi-axle transit tippers against severe puncture cycles and carcass fatigue during massive highway paving contracts.",
    metricValue: "14% Lower Scrap",
    metricLabel: "Extended tyre casing retreadability",
  },
  {
    id: "4",
    slug: "open-cast-haulage-analytics",
    industry: "Mining",
    fleetSize: "100-500",
    headline: "Preventing high-tonnage dumper downtime in central India mining corridors.",
    excerpt:
      "Optimizing load-pressure distribution on rigid dump trucks operating in rugged, abrasive mining pits with unforgiving production schedules.",
    metricValue: "99.4% Uptime",
    metricLabel: "Sustained shift productivity on heavy haulers",
  },
  {
    id: "5",
    slug: "cold-chain-express-transit",
    industry: "Logistics",
    fleetSize: "100-500",
    headline: "Protecting perishable pharmaceutical corridors with synchronized sensor telemetry.",
    excerpt:
      "Refrigerated linehaul operator correlates tyre rolling resistance with generator fuel draw, stabilizing transit unit costs.",
    metricValue: "₹1.4 Cr",
    metricLabel: "Annualized fuel and tyre maintenance savings",
  },
  {
    id: "6",
    slug: "oem-pre-delivery-intelligence",
    industry: "OEM",
    fleetSize: "2000+",
    headline: "Tier-1 OEM factory integration delivering smart connected fleets from Day 1.",
    excerpt:
      "How leading commercial vehicle manufacturers embed TMIP edge telematics during pre-delivery inspection for corporate fleet buyers.",
    metricValue: "100% Pre-Configured",
    metricLabel: "Zero depot commissioning lag for fleet buyers",
  },
];

export function CaseStudiesClient() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedFleetSize, setSelectedFleetSize] = useState("All");

  const industries = ["All", "Logistics", "Passenger Transport", "Construction", "Mining", "OEM"];
  const fleetSizes = ["All", "Under 100", "100-500", "500-2000", "2000+"];

  const filteredStudies = studies.filter((study) => {
    const matchIndustry = selectedIndustry === "All" || study.industry === selectedIndustry;
    const matchFleetSize = selectedFleetSize === "All" || study.fleetSize === selectedFleetSize;
    return matchIndustry && matchFleetSize;
  });

  return (
    <div className="space-y-12">
      {/* Filter Controls */}
      <div className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-6">
        <div className="flex items-center gap-2 text-xs font-jetbrains text-[#3B82F6] uppercase tracking-wider font-semibold">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Case Studies</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Industry Filter */}
          <div className="space-y-2">
            <label className="text-xs font-jetbrains text-[#94A3B8] uppercase">Industry</label>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3 py-1.5 rounded-[3px] text-xs font-ibm-plex transition-all ${
                    selectedIndustry === ind
                      ? "bg-[#3B82F6] text-white font-medium shadow-sm"
                      : "bg-white/[0.03] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] border border-slate-400/10"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Fleet Size Filter */}
          <div className="space-y-2">
            <label className="text-xs font-jetbrains text-[#94A3B8] uppercase">Fleet Size</label>
            <div className="flex flex-wrap gap-2">
              {fleetSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedFleetSize(size)}
                  className={`px-3 py-1.5 rounded-[3px] text-xs font-ibm-plex transition-all ${
                    selectedFleetSize === size
                      ? "bg-[#3B82F6] text-white font-medium shadow-sm"
                      : "bg-white/[0.03] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] border border-slate-400/10"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Case Study Card at top */}
      {selectedIndustry === "All" && selectedFleetSize === "All" && (
        <div className="p-8 sm:p-10 rounded-[4px] bg-gradient-to-br from-[#0B1220] to-[#0D182E] border border-[#3B82F6]/30 shadow-2xl relative overflow-hidden group">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#3B82F6] text-white text-[11px] font-jetbrains font-bold px-3 py-1 rounded-[2px] uppercase tracking-wider">
              FEATURED CASE STUDY
            </span>
            <span className="bg-white/10 text-[#F1F5F9] text-xs font-jetbrains px-3 py-1 rounded-[2px]">
              Logistics
            </span>
            <span className="bg-white/10 text-[#94A3B8] text-xs font-jetbrains px-3 py-1 rounded-[2px]">
              1,000+ Vehicles
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                1,000 trucks. 12 months. What changed.
              </h2>
              <p className="text-base text-[#94A3B8] leading-relaxed max-w-2xl font-ibm-plex">
                The full operational story of a large logistics fleet running TMIP for one year. Deployment timeline,
                operating changes, measured outcomes, and what the fleet operator does differently now.
              </p>
              <div className="pt-2">
                <Link
                  href="/tmip/customers/case-studies/1000-truck-case-study"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                >
                  Read the study <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-[4px] bg-[#050A17]/80 border border-slate-400/10 space-y-4">
              <div>
                <div className="font-space-grotesk text-3xl font-bold text-[#10B981]">5.2% Fuel</div>
                <div className="text-xs text-[#94A3B8] font-ibm-plex">Fleetwide Fuel Consumption Reduction</div>
              </div>
              <div className="border-t border-slate-400/10 pt-3">
                <div className="font-space-grotesk text-3xl font-bold text-[#3B82F6]">6.8% Tyre Life</div>
                <div className="text-xs text-[#94A3B8] font-ibm-plex">Median Tread Life Extension</div>
              </div>
              <div className="border-t border-slate-400/10 pt-3">
                <div className="font-space-grotesk text-3xl font-bold text-[#F59E0B]">34% Downtime</div>
                <div className="text-xs text-[#94A3B8] font-ibm-plex">Drop in Unscheduled Roadside Breakdowns</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Case Study Grid */}
      <div className="space-y-6">
        <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9]">
          Case Studies ({filteredStudies.length})
        </h3>

        {filteredStudies.length === 0 ? (
          <div className="p-12 text-center rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-3">
            <p className="text-base text-[#94A3B8] font-ibm-plex">No case studies match the selected filters.</p>
            <button
              onClick={() => {
                setSelectedIndustry("All");
                setSelectedFleetSize("All");
              }}
              className="text-xs font-jetbrains text-[#3B82F6] underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                className="p-8 rounded-[4px] bg-[#0B1220] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-jetbrains uppercase tracking-wider text-[#3B82F6] font-semibold">
                      {study.industry}
                    </span>
                    <span className="text-[11px] font-jetbrains text-[#64748B]">·</span>
                    <span className="text-[11px] font-jetbrains text-[#94A3B8]">{study.fleetSize}</span>
                  </div>

                  <h4 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors leading-snug">
                    {study.headline}
                  </h4>

                  <div className="p-3 rounded-[3px] bg-white/[0.02] border border-slate-400/10 space-y-1">
                    <div className="font-space-grotesk text-lg font-bold text-[#10B981]">{study.metricValue}</div>
                    <div className="text-[11px] text-[#94A3B8] font-jetbrains">{study.metricLabel}</div>
                  </div>

                  <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-3 font-ibm-plex">{study.excerpt}</p>
                </div>

                <div className="pt-2 border-t border-slate-400/10">
                  <Link
                    href={`/tmip/customers/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-jetbrains font-semibold text-[#3B82F6] group-hover:text-white transition-colors"
                  >
                    Read the study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
