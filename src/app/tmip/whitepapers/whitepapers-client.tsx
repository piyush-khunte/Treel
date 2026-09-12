"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter, FileText, Search } from "lucide-react";

interface WhitepaperItem {
  id: string;
  topic: "ROI & Payback" | "Vehicle Digital Twin" | "Predictive Maintenance" | "Fleet Operations" | "Case Study";
  industry: "All" | "Logistics" | "Passenger Transport" | "Construction" | "Mining" | "OEM";
  title: string;
  excerpt: string;
  length: string;
  publishDate: string;
  href: string;
  isFeatured?: boolean;
}

const whitepapers: WhitepaperItem[] = [
  {
    id: "1",
    topic: "ROI & Payback",
    industry: "Logistics",
    title: "The Fleet ROI Paper — How TMIP customers reach payback in nine months",
    excerpt:
      "The economics of mobility intelligence deployment across two hundred TMIP customers. Payback drivers, ROI attribution, and what fuel-and-tyre economics look like when you can see them at vehicle level.",
    length: "28 pages",
    publishDate: "October 2026",
    href: "/tmip/whitepapers/roi-fleet-intelligence",
    isFeatured: true,
  },
  {
    id: "2",
    topic: "Case Study",
    industry: "Logistics",
    title: "1,000 trucks. 12 months. What changed.",
    excerpt:
      "The full operational story of a large logistics fleet running TMIP for one year. Deployment timeline, operating changes, measured outcomes, and what the fleet operator does differently now.",
    length: "32 pages",
    publishDate: "November 2026",
    href: "/tmip/customers/case-studies/1000-truck-case-study",
    isFeatured: true,
  },
  {
    id: "3",
    topic: "Vehicle Digital Twin",
    industry: "OEM",
    title: "The Vehicle Digital Twin — Architecture and Applications",
    excerpt:
      "The technical paper behind TMIP's Vehicle Digital Twin architecture. Data model, state and history layers, prediction pipeline, and how the Twin enables operating decisions at fleet scale.",
    length: "24 pages",
    publishDate: "Q4 2026",
    href: "/insights/vehicle-digital-twins-architecture",
    isFeatured: true,
  },
  {
    id: "4",
    topic: "Fleet Operations",
    industry: "Logistics",
    title: "Physics of Tyre Pressure & Fuel Savings Across Commercial Corridors",
    excerpt:
      "Thermodynamic models and empirical fuel burn measurements correlating rolling friction deltas with 10–15 PSI under-inflation across heavy commercial tractor-trailers.",
    length: "18 pages",
    publishDate: "September 2026",
    href: "/insights/physics-of-tyre-pressure-fuel-savings",
  },
  {
    id: "5",
    topic: "Predictive Maintenance",
    industry: "Mining",
    title: "Scaling IoT Edge Ingestion & Offline Telemetry in Harsh Terrain",
    excerpt:
      "Architectural blueprint for on-vehicle MQTT edge buffers, zero-loss time-series aggregation, and sub-second anomaly models deployed in remote mining leases.",
    length: "22 pages",
    publishDate: "August 2026",
    href: "/insights/scaling-iot-across-indian-highways",
  },
  {
    id: "6",
    topic: "Predictive Maintenance",
    industry: "Construction",
    title: "High-Frequency Time-Series Data Infrastructure for Heavy Haul Fleets",
    excerpt:
      "Technical deep-dive on sub-second sensor stream ingestion, multi-tenant Kafka partitioning, and low-latency digital twin state estimation.",
    length: "26 pages",
    publishDate: "October 2026",
    href: "/data-infrastructure",
  },
];

export function WhitepapersClient() {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const topics = [
    "All",
    "ROI & Payback",
    "Vehicle Digital Twin",
    "Predictive Maintenance",
    "Fleet Operations",
  ];

  const industries = ["All", "Logistics", "Passenger Transport", "Construction", "Mining", "OEM"];

  const filtered = whitepapers.filter((paper) => {
    const matchTopic = selectedTopic === "All" || paper.topic === selectedTopic;
    const matchIndustry =
      selectedIndustry === "All" || paper.industry === selectedIndustry || paper.industry === "All";
    const matchSearch =
      searchQuery.trim() === "" ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchTopic && matchIndustry && matchSearch;
  });

  return (
    <div className="space-y-12">
      {/* Search & Filter Panel */}
      <div className="p-6 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-jetbrains text-[#3B82F6] uppercase tracking-wider font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Research Library</span>
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search research topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-[3px] bg-[#050A17] border border-slate-400/20 text-xs font-ibm-plex text-[#F1F5F9] placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-slate-400/10">
          {/* Topic Filter */}
          <div className="space-y-2">
            <label className="text-xs font-jetbrains text-[#94A3B8] uppercase font-semibold">Topic Category</label>
            <div className="flex flex-wrap gap-2">
              {topics.map((top) => (
                <button
                  key={top}
                  onClick={() => setSelectedTopic(top)}
                  className={`px-3 py-1 rounded-[2px] text-xs font-jetbrains transition-all cursor-pointer ${
                    selectedTopic === top
                      ? "bg-[#3B82F6] text-white font-medium shadow-sm"
                      : "bg-white/[0.03] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] border border-slate-400/10"
                  }`}
                >
                  {top}
                </button>
              ))}
            </div>
          </div>

          {/* Industry Filter */}
          <div className="space-y-2">
            <label className="text-xs font-jetbrains text-[#94A3B8] uppercase font-semibold">Industry Lens</label>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3 py-1 rounded-[2px] text-xs font-jetbrains transition-all cursor-pointer ${
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
        </div>
      </div>

      {/* Whitepaper Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((paper) => (
          <div
            key={paper.id}
            className={`p-8 rounded-[4px] bg-[#0B1220]/80 border flex flex-col justify-between space-y-6 transition-all hover:border-blue-500/30 ${
              paper.isFeatured ? "border-slate-400/20 shadow-lg" : "border-slate-400/10"
            }`}
          >
            <div className="space-y-4">
              {/* Graphical Card Cover Bar */}
              <div className="h-36 rounded-[3px] bg-[#050A17] border border-slate-400/10 p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 rounded-[2px] text-[10px] font-jetbrains text-blue-400 uppercase font-semibold">
                    {paper.topic}
                  </span>
                  <span className="text-[10px] font-jetbrains text-[#94A3B8]">{paper.length}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8]">
                  <FileText className="w-4 h-4 text-[#3B82F6]" />
                  <span>TREEL RESEARCH REPORT</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8]">
                  <span>{paper.publishDate}</span>
                  <span>·</span>
                  <span className="text-[#3B82F6]">{paper.industry}</span>
                </div>
                <h3 className="font-space-grotesk text-lg font-bold text-[#F1F5F9] leading-snug hover:text-[#3B82F6] transition-colors">
                  <Link href={paper.href}>{paper.title}</Link>
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] font-ibm-plex leading-relaxed line-clamp-3">{paper.excerpt}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-400/10 flex items-center justify-between">
              <span className="text-xs font-jetbrains text-[#94A3B8]">{paper.length} PDF</span>
              <Link
                href={paper.href}
                className="inline-flex items-center gap-1.5 text-xs font-jetbrains font-semibold text-[#3B82F6] hover:underline"
              >
                <span>{paper.topic === "ROI & Payback" ? "Download →" : "Read Research →"}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 space-y-4">
          <p className="text-sm font-jetbrains text-[#94A3B8]">No research papers match your selected filters.</p>
          <button
            onClick={() => {
              setSelectedTopic("All");
              setSelectedIndustry("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-[3px] bg-[#3B82F6] text-white text-xs font-jetbrains font-semibold hover:bg-[#2563EB] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
