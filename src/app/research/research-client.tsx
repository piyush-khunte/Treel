"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Calendar, Layers, Search, Filter } from "lucide-react";

interface Whitepaper {
  id: string;
  title: string;
  topic: string;
  industry: string;
  year: string;
  abstract: string;
  length: string;
  date: string;
  href: string;
  tagColor: string;
}

const WHITEPAPERS: Whitepaper[] = [
  {
    id: "roi-fleet-intelligence",
    title: "The Fleet ROI and Fuel Savings Paper",
    topic: "ROI & Payback",
    industry: "Logistics",
    year: "2026",
    abstract: "How real-time tyre telemetry delivers verifiable 2.5–4.5% fuel savings and sub-9-month payback across commercial fleets.",
    length: "24 pages",
    date: "October 2026",
    href: "/research/roi-fleet-intelligence",
    tagColor: "bg-[#D5573B]/10 text-[#D5573B] border-[#D5573B]/20",
  },
  {
    id: "data-architecture",
    title: "Data Architecture & Telemetry Ingestion",
    topic: "Mobility Intelligence",
    industry: "OEM",
    year: "2026",
    abstract: "Engineering a multi-tenant telemetry pipeline ingesting 150M+ daily sensor datapoints with sub-second latency.",
    length: "28 pages",
    date: "Q3 2026",
    href: "/research/data-architecture",
    tagColor: "bg-[#00B37E]/10 text-[#00B37E] border-[#00B37E]/20",
  },
  {
    id: "case-study-1000-truck",
    title: "The 1,000-Truck Case Study",
    topic: "Fleet Operations",
    industry: "Logistics",
    year: "2026",
    abstract: "Operational deployment results: tyre lifecycle extension, breakdown reduction, and full payback achieved in Week 11.",
    length: "18 pages",
    date: "November 2026 (Week 11)",
    href: "/tmip/customers/case-studies",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: "vehicle-digital-twin",
    title: "The Vehicle Digital Twin Technical Paper",
    topic: "Vehicle Digital Twin",
    industry: "Passenger Transport",
    year: "2026",
    abstract: "Mathematical and physical foundations of Treel's 5-layer digital twin converting raw telemetry into predictive health state.",
    length: "32 pages",
    date: "Q4 2026",
    href: "/vehicle-digital-twin",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: "predictive-maintenance-heavy",
    title: "Predictive Maintenance in Heavy Haulage",
    topic: "Predictive Maintenance",
    industry: "Mining",
    year: "2025",
    abstract: "Early-stage thermodynamic anomaly detection preventing catastrophic blowouts in mining and construction haul trucks.",
    length: "22 pages",
    date: "November 2025",
    href: "/research/roi-fleet-intelligence",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    id: "infrastructure-construction-fleets",
    title: "Fleet Operations in Infrastructure Construction",
    topic: "Fleet Operations",
    industry: "Construction",
    year: "2025",
    abstract: "Telemetry deployment benchmarks across off-highway tippers and transit mixers operating in severe ambient conditions.",
    length: "20 pages",
    date: "August 2025",
    href: "/research/data-architecture",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
];

const TOPICS = [
  "All",
  "Mobility Intelligence",
  "Vehicle Digital Twin",
  "ROI & Payback",
  "Fleet Operations",
  "Predictive Maintenance",
];

const INDUSTRIES = [
  "All",
  "Logistics",
  "Passenger Transport",
  "Construction",
  "Mining",
  "OEM",
];

const YEARS = ["All", "2026", "2025", "2024"];

export function ResearchLibrary() {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWhitepapers = useMemo(() => {
    return WHITEPAPERS.filter((item) => {
      const matchTopic = selectedTopic === "All" || item.topic === selectedTopic;
      const matchIndustry = selectedIndustry === "All" || item.industry === selectedIndustry;
      const matchYear = selectedYear === "All" || item.year === selectedYear;
      const matchSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.abstract.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTopic && matchIndustry && matchYear && matchSearch;
    });
  }, [selectedTopic, selectedIndustry, selectedYear, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Filter Bar Controls */}
      <div className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5573B] uppercase tracking-widest font-semibold">
            <Filter className="w-3.5 h-3.5" />
            Filter Research Library
          </div>
          
          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search topics or papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white/5 border border-white/10 rounded-md text-[#FAF7F2] placeholder-[#94A3B8] focus:outline-none focus:border-[#D5573B]"
            />
          </div>
        </div>

        {/* Topic Pills */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block">
            Topic Filter
          </label>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((topic) => {
              const active = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    active
                      ? "bg-[#D5573B] text-[#FAF7F2] shadow-sm"
                      : "bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-[#FAF7F2] border border-white/5"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Dropdowns: Industry & Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block">
              Industry Filter
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#141B22] border border-white/10 rounded-md text-[#FAF7F2] focus:outline-none focus:border-[#D5573B] cursor-pointer"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind} className="bg-[#141B22] text-white">
                  {ind === "All" ? "All Industries" : ind}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block">
              Year Filter
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#141B22] border border-white/10 rounded-md text-[#FAF7F2] focus:outline-none focus:border-[#D5573B] cursor-pointer"
            >
              {YEARS.map((yr) => (
                <option key={yr} value={yr} className="bg-[#141B22] text-white">
                  {yr === "All" ? "All Years" : yr}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Whitepaper Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
          <span>Showing {filteredWhitepapers.length} whitepapers</span>
          {(selectedTopic !== "All" || selectedIndustry !== "All" || selectedYear !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedTopic("All");
                setSelectedIndustry("All");
                setSelectedYear("All");
                setSearchQuery("");
              }}
              className="text-[#D5573B] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredWhitepapers.length === 0 ? (
          <div className="p-12 text-center rounded-lg bg-white/[0.02] border border-white/[0.08] space-y-3">
            <BookOpen className="w-8 h-8 text-[#94A3B8] mx-auto opacity-50" />
            <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">No papers match your filter criteria</h3>
            <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
              Try adjusting your topic, industry, or year selections, or suggest a new research area below.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWhitepapers.map((paper) => (
              <div
                key={paper.id}
                className="group relative flex flex-col justify-between p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Cover Thumbnail Visual */}
                  <div className="relative h-44 rounded-md bg-gradient-to-br from-[#1C283F] via-[#152033] to-[#0D1522] border border-white/10 p-5 flex flex-col justify-between overflow-hidden group-hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#D5573B]" />
                      </div>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-[4px] border ${paper.tagColor}`}>
                        {paper.topic}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
                        Treel Research · {paper.length}
                      </div>
                      <div className="font-fraunces text-sm font-medium text-[#FAF7F2] line-clamp-2 leading-tight">
                        {paper.title}
                      </div>
                    </div>

                    {/* Decorative subtle grid background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
                  </div>

                  {/* Content Details */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-3 text-xs text-[#94A3B8] font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#D5573B]" />
                        {paper.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3 text-[#D5573B]" />
                        {paper.industry}
                      </span>
                    </div>

                    <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors leading-snug">
                      {paper.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                      {paper.abstract}
                    </p>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-6 mt-4 border-t border-white/5">
                  <Link
                    href={paper.href}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#D5573B] hover:text-[#FAF7F2] transition-colors"
                  >
                    Download
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
