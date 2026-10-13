"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight, Search, ShoppingCart, BookOpen } from "lucide-react";
import { MongoBlog } from "@/types/admin";

interface PersonalBlogClientProps {
  initialArticles: MongoBlog[];
}

function formatBlogDate(dateStr?: string): string {
  if (!dateStr) return "Recent";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function PersonalBlogClient({ initialArticles }: PersonalBlogClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const baseCategories = ["All", "Tyre Care", "Road Safety", "Product Updates", "How-To Guides"];
  const dynamicCategories = Array.from(
    new Set(initialArticles.map((a) => a.category).filter(Boolean))
  ) as string[];
  const categories = Array.from(new Set([...baseCategories, ...dynamicCategories]));

  const filteredArticles = initialArticles.filter((art) => {
    const matchesCat = activeCategory === "All" || art.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      (art.title && art.title.toLowerCase().includes(q)) ||
      (art.description && art.description.toLowerCase().includes(q)) ||
      (art.author && art.author.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const featuredArticle = initialArticles[0];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="personal"
              items={[
                { label: "Personal TPMS", href: "/personal" },
                { label: "Blog" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              BLOG &amp; INSIGHTS
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              The Personal TPMS Blog
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Practical tyre care tips, road safety insights, product updates, and consumer vehicle maintenance advice.
            </p>

            {/* Search Input */}
            <div className="pt-4 max-w-xl">
              <div className="relative">
                <Search className="w-5 h-5 text-[#6B7280] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by topic…"
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-black/[0.12] text-sm text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2563EB] shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Stage */}
      {featuredArticle && activeCategory === "All" && !searchQuery.trim() && (
        <section className="py-16 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <Link
              href={`/personal/blog/${featuredArticle.slug}`}
              className="p-8 sm:p-12 rounded-[32px] bg-[#F9FAFB] border border-black/[0.06] hover:border-[#2563EB]/40 hover:shadow-lg transition-all space-y-6 block group"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-bold text-xs uppercase tracking-wider">
                FEATURED ARTICLE
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] group-hover:text-[#2563EB] transition-colors tracking-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
                {featuredArticle.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-black/[0.06]">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280] font-medium">
                  <span>By {featuredArticle.author || "Treel Automotive Team"}</span>
                  <span>•</span>
                  <span>{formatBlogDate(featuredArticle.date)}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime || "4 min read"}</span>
                </div>
                <span className="font-bold text-xs uppercase tracking-wider text-[#2563EB] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter Chips & Articles Grid */}
      <section className="py-16 bg-[#F9FAFB] border-b border-black/[0.06]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-10">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "bg-white text-[#4B5563] border border-black/[0.08] hover:border-[#2563EB]/40 hover:bg-[#F3F4F6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of articles */}
          {filteredArticles.length === 0 ? (
            <div className="p-16 text-center rounded-3xl bg-white border border-black/[0.06] max-w-md mx-auto space-y-4">
              <BookOpen className="w-10 h-10 text-[#6B7280]/40 mx-auto" />
              <div className="space-y-1">
                <p className="font-bold text-lg text-[#111827]">No articles found</p>
                <p className="text-xs text-[#6B7280]">No published blog posts match your current search or category filter.</p>
              </div>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="px-5 py-2 rounded-full bg-[#2563EB] text-white text-xs font-bold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art) => (
                <Link
                  key={art._id || art.slug}
                  href={`/personal/blog/${art.slug}`}
                  className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm hover:border-[#2563EB]/40 hover:shadow-md transition-all flex flex-col justify-between group block"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#2563EB] bg-[#2563EB]/5 px-3 py-1 rounded-full border border-[#2563EB]/15">
                        {art.category || "General"}
                      </span>
                      <span className="text-[#6B7280]">{art.readTime || "4 min read"}</span>
                    </div>
                    <h3 className="font-bold text-xl text-[#111827] group-hover:text-[#2563EB] transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed line-clamp-3">
                      {art.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-black/[0.04] mt-6 flex items-center justify-between text-xs text-[#6B7280]">
                    <span>{formatBlogDate(art.date)}</span>
                    <span className="font-bold text-[#2563EB] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-14 rounded-[32px] bg-[#111827] text-white shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Equip your personal vehicle today.
              </h2>
              <p className="text-[#94A3B8] text-sm sm:text-base font-normal">
                4-tyre smart wireless TPMS kit for ₹8,999 with 1-year replacement warranty.
              </p>
            </div>
            <Link
              href="/personal/buy"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white font-manrope font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-[0_4px_14px_rgba(37,99,235,0.3)] shrink-0 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" /> Buy Personal TPMS →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

