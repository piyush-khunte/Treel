"use client";

import { PressItemRecord } from "@/types/content";
import { ArrowRight, Newspaper, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const STANDARD_CATEGORIES = ["All", "Product Launch", "Partnership", "Milestone", "Company News"];

export function PressClient({ initialReleases }: { initialReleases: PressItemRecord[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically compute available categories
  const categories = useMemo(() => {
    const set = new Set<string>(STANDARD_CATEGORIES);
    initialReleases.forEach((r) => {
      if (r.category) set.add(r.category);
    });
    return Array.from(set);
  }, [initialReleases]);

  // Dynamically compute available years
  const years = useMemo(() => {
    const set = new Set<string>(["All"]);
    initialReleases.forEach((r) => {
      if (r.year) set.add(r.year);
    });
    const sortedYears = Array.from(set).filter((y) => y !== "All").sort().reverse();
    return ["All", ...sortedYears];
  }, [initialReleases]);

  const filteredReleases = useMemo(() => {
    return initialReleases.filter((r) => {
      const matchCategory = selectedCategory === "All" || r.category === selectedCategory;
      const matchYear = selectedYear === "All" || r.year === selectedYear;
      const matchSearch =
        !searchQuery.trim() ||
        r.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchYear && matchSearch;
    });
  }, [initialReleases, selectedCategory, selectedYear, searchQuery]);

  const featuredRelease = useMemo(() => {
    return filteredReleases.find((r) => r.isFeatured) || filteredReleases[0];
  }, [filteredReleases]);

  const regularReleases = useMemo(() => {
    if (!featuredRelease) return filteredReleases;
    return filteredReleases.filter((r) => r.slug !== featuredRelease.slug);
  }, [filteredReleases, featuredRelease]);

  return (
    <>
      {/* FILTER CONTROLS */}
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
                {categories.map((cat) => (
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
                {years.map((yr) => (
                  <option key={yr} value={yr} className="bg-[#141B22] text-[#FAF7F2]">
                    {yr === "All" ? "All Years" : yr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED & REGULAR RELEASES */}
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
                      href={featuredRelease.externalUrl || `/press/${featuredRelease.year || '2026'}/${featuredRelease.slug}`}
                      target={featuredRelease.externalUrl ? "_blank" : undefined}
                      rel={featuredRelease.externalUrl ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-sm group"
                    >
                      <span>{featuredRelease.externalUrl ? "Read coverage" : "Read the release"}</span>
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
                        key={release._id || release.slug}
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
                            href={release.externalUrl || `/press/${release.year || '2026'}/${release.slug}`}
                            target={release.externalUrl ? "_blank" : undefined}
                            rel={release.externalUrl ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors"
                          >
                            <span>{release.externalUrl ? "Read coverage" : "Read statement"}</span>
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
    </>
  );
}

