"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  Calendar, 
  Newspaper, 
  Mail, 
  Download, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PressRelease {
  slug: string;
  year: string;
  date: string;
  category: "Product Launch" | "Partnership" | "Milestone" | "Company News";
  headline: string;
  excerpt: string;
  isFeatured?: boolean;
}

const PRESS_RELEASES: PressRelease[] = [
  {
    slug: "68000-commercial-vehicles-milestone",
    year: "2026",
    date: "September 15, 2026",
    category: "Milestone",
    headline: "Treel Surpasses 68,000 Connected Commercial Vehicles, Cementing Position as India's Largest Fleet Telematics Dataset",
    excerpt: "Treel Mobility Solutions announced today that its Vehicle Digital Twin platform has surpassed sixty-eight thousand active commercial vehicles under management. Ingesting over 150 million daily telemetry points across heavy freight corridors, the milestone represents an unprecedented dataset for commercial transport optimization in emerging markets.",
    isFeatured: true,
  },
  {
    slug: "project-suraksha-nationwide-launch",
    year: "2026",
    date: "July 22, 2026",
    category: "Product Launch",
    headline: "Treel Unveils Project Suraksha: ₹17,500 DIY Tyre Safety Kit for India's 8 Million Owner-Drivers",
    excerpt: "Engineered specifically for single-truck operators, Project Suraksha pairs IP69K military-rated sensors with solar cab displays and voice alerts in six regional Indian languages to prevent catastrophic highway blowouts.",
  },
  {
    slug: "jk-tyre-telematics-partnership-expansion",
    year: "2026",
    date: "May 10, 2026",
    category: "Partnership",
    headline: "Treel and JK Tyre Expand Factory-Fit Intelligent Tyre Program Across Three Commercial OEM Platforms",
    excerpt: "Extending factory-installed sensor integration from medium-duty tippers into heavy prime-mover tractors and long-distance intercity buses across India's largest commercial vehicle manufacturers.",
  },
  {
    slug: "arai-commercial-certification",
    year: "2025",
    date: "December 18, 2025",
    category: "Company News",
    headline: "Treel Secures ARAI Commercial Automotive Standard Certification for Next-Gen Sensor Hardware",
    excerpt: "Rigorous laboratory validation confirms complete compliance with automotive electromagnetic compatibility (EMC), thermal shock profiles up to 125°C, and heavy axle mechanical vibration thresholds.",
  },
  {
    slug: "pune-rd-centre-expansion",
    year: "2025",
    date: "October 04, 2025",
    category: "Company News",
    headline: "Treel Inaugurates Advanced Mobility Hardware and RF Testing Lab in Pune",
    excerpt: "The newly expanded Pune facility features dynamic tire-drum test rigs, environmental submersion tanks, and an RF chamber calibrated for long-range BLE commercial vehicle communications.",
  },
  {
    slug: "cfo-payback-benchmark-report",
    year: "2024",
    date: "November 14, 2024",
    category: "Milestone",
    headline: "Treel Publishes 2-Year Enterprise Fleet Operational Cost Benchmark Study",
    excerpt: "Analysis of 30,000 commercial vehicles demonstrates a median payback period of under 9 months driven by fuel consumption reductions of 3.2% and tyre carcass life extensions of 18%.",
  },
];

const CATEGORIES = ["All", "Product Launch", "Partnership", "Milestone", "Company News"];
const YEARS = ["All", "2026", "2025", "2024"];

export default function PressPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReleases = useMemo(() => {
    return PRESS_RELEASES.filter((r) => {
      const matchCategory = selectedCategory === "All" || r.category === selectedCategory;
      const matchYear = selectedYear === "All" || r.year === selectedYear;
      const matchSearch =
        !searchQuery.trim() ||
        r.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchYear && matchSearch;
    });
  }, [selectedCategory, selectedYear, searchQuery]);

  const featuredRelease = useMemo(() => {
    return filteredReleases.find((r) => r.isFeatured) || filteredReleases[0];
  }, [filteredReleases]);

  const regularReleases = useMemo(() => {
    if (!featuredRelease) return filteredReleases;
    return filteredReleases.filter((r) => r.slug !== featuredRelease.slug);
  }, [filteredReleases, featuredRelease]);

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                PRESS
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              News from Treel.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Press releases, product announcements, and coverage from across the commercial mobility sector. For media inquiries, reach us at{" "}
              <a href="mailto:hello@treel.in" className="text-[#FAF7F2] underline hover:text-[#D5573B] transition-colors">
                hello@treel.in
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FILTER CONTROLS */}
      <section className="py-8 bg-[#141B22]/50 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search releases..."
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#141B22] border border-white/10 text-xs text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-md bg-[#141B22] border border-white/10 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#D5573B] transition-colors cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#141B22] text-[#FAF7F2]">
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-md bg-[#141B22] border border-white/10 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#D5573B] transition-colors cursor-pointer"
              >
                {YEARS.map((yr) => (
                  <option key={yr} value={yr} className="bg-[#141B22] text-[#FAF7F2]">
                    {yr === "All" ? "All Years" : yr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED & REGULAR RELEASES */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-14">
          {filteredReleases.length === 0 ? (
            <div className="p-12 text-center rounded-lg bg-white/[0.02] border border-white/[0.08] space-y-3">
              <Newspaper className="w-8 h-8 text-[#94A3B8] mx-auto opacity-50" />
              <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                No press releases match those filters.
              </h3>
              <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                Try clearing your category or year filter, or search for a different keyword.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedYear("All");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold text-[#D5573B] hover:underline pt-2"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Release Block */}
              {featuredRelease && (
                <div className="p-8 sm:p-12 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/40 transition-all space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] font-mono uppercase px-3 py-0.5 rounded-[4px] bg-[#D5573B]/10 text-[#D5573B] border border-[#D5573B]/20 font-semibold tracking-wider">
                      {featuredRelease.category}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">
                      {featuredRelease.date}
                    </span>
                    <span className="text-xs font-mono text-[#D5573B] bg-[#D5573B]/10 px-2 py-0.5 rounded">
                      Featured Release
                    </span>
                  </div>

                  <h2 className="font-fraunces text-2xl sm:text-4xl font-medium text-[#FAF7F2] tracking-tight leading-tight">
                    {featuredRelease.headline}
                  </h2>

                  <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-4xl">
                    {featuredRelease.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/press/${featuredRelease.year}/${featuredRelease.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-sm group"
                    >
                      <span>Read the release</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Regular Releases Grid */}
              {regularReleases.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                    <span className="uppercase tracking-wider font-semibold text-[#FAF7F2]">
                      Recent Statements &amp; Coverage
                    </span>
                    <span>Showing {regularReleases.length} releases</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularReleases.map((release) => (
                      <div
                        key={release.slug}
                        className="group p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-[#94A3B8]">{release.date}</span>
                            <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-white/5 text-[#D5573B] font-semibold">
                              {release.category}
                            </span>
                          </div>

                          <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors leading-snug">
                            {release.headline}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                            {release.excerpt}
                          </p>
                        </div>

                        <div className="pt-6 mt-4 border-t border-white/5">
                          <Link
                            href={`/press/${release.year}/${release.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors"
                          >
                            <span>Read statement</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 4. MEDIA INQUIRIES & MEDIA KIT SECTION */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                  MEDIA &amp; COMMUNICATIONS
                </span>
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
                Media inquiries.
              </h2>
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-inter">
                For interview requests, high-resolution product photography, executive commentary on commercial mobility trends, or fact-checking, please contact our communications team. We respond to media queries within one business day.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact media team</span>
                </Link>
                <Link
                  href="/media-kit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] border border-white/20 text-[#FAF7F2] font-medium text-sm hover:border-[#D5573B] hover:text-[#D5573B] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download media kit</span>
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-lg bg-[#141B22] border border-white/10 space-y-4">
              <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                Treel Press Contact
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-[#94A3B8] font-mono">
                <div>Treel Mobility Solutions Communications</div>
                <div>Baner Tech Park, Pune 411045, Maharashtra, India</div>
                <div className="pt-2">
                  Email:{" "}
                  <a href="mailto:hello@treel.in" className="text-[#D5573B] underline">
                    hello@treel.in
                  </a>
                </div>
                <div>
                  Toll-Free:{" "}
                  <span className="text-[#FAF7F2]">1800 833 0233</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-[#64748B]">
                Operating hours: Monday – Friday, 09:00 – 18:00 IST
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}