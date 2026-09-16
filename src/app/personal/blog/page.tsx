"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Rss, 
  Search,
  CheckCircle2,
  ShoppingCart
} from "lucide-react";

export default function PersonalBlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Tyre Care", "Road Safety", "Product Updates", "How-To Guides"];

  const articles = [
    {
      title: "Why your car's factory TPMS isn't enough",
      slug: "why-factory-tpms-isnt-enough",
      category: "Road Safety",
      readTime: "4 min read",
      date: "12 Sep 2026",
      author: "Treel Automotive Team",
      excerpt: "Most standard car TPMS systems only illuminate an alert icon after pressure drops 25% below placard. Discover why continuous real-time telemetry changes roadside safety.",
      featured: true
    },
    {
      title: "How to check tyre pressure the right way (with or without TPMS)",
      slug: "how-to-check-tyre-pressure-correctly",
      category: "How-To Guides",
      readTime: "5 min read",
      date: "08 Sep 2026",
      author: "Karan Verma",
      excerpt: "Cold vs hot pressure calibration, seasonal variations in Indian weather, and avoiding common gas station digital meter misreadings.",
      featured: false
    },
    {
      title: "Monsoon tyre care: what to watch for and when",
      slug: "monsoon-tyre-care-guide",
      category: "Tyre Care",
      readTime: "6 min read",
      date: "01 Sep 2026",
      author: "Aditi Rao",
      excerpt: "Waterlogging, aquaplaning risks, and why proper tread depth combined with accurate PSI prevents dangerous highway skids during Indian monsoons.",
      featured: false
    },
    {
      title: "The real cost of driving on underinflated tyres",
      slug: "cost-of-driving-underinflated-tyres",
      category: "Tyre Care",
      readTime: "3 min read",
      date: "24 Aug 2026",
      author: "Treel Engineering",
      excerpt: "How a 4 PSI pressure drop costs an Indian car owner up to ₹14,000 in premature tread wear and wasted fuel efficiency every single year.",
      featured: false
    },
    {
      title: "Highway tyre safety: temperature, pressure, and blowout science",
      slug: "highway-tyre-safety-thermal-science",
      category: "Road Safety",
      readTime: "5 min read",
      date: "18 Aug 2026",
      author: "Dr. Sandeep Nair",
      excerpt: "Understanding heat buildup inside radial tyres at triple-digit speeds on concrete expressways like Samruddhi Mahamarg and Delhi-Mumbai Expressway.",
      featured: false
    },
    {
      title: "Treel Care Mobile App v2.4: Apple Watch & Widget Upgrades",
      slug: "app-update-apple-watch-widgets",
      category: "Product Updates",
      readTime: "2 min read",
      date: "10 Aug 2026",
      author: "Treel Mobile Team",
      excerpt: "Discover the new haptic feedback complications on Apple Watch, dark mode refinements, and one-tap CSV drive telemetry export.",
      featured: false
    }
  ];

  const filteredArticles = articles.filter(art => {
    const matchesCat = activeCategory === "All" || art.category === activeCategory;
    const matchesQuery = !searchQuery.trim() || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const featuredArticle = articles.find(a => a.featured) || articles[0];

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
              BLOG & INSIGHTS
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              The Personal TPMS Blog
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Practical tyre care tips, road safety insights, product updates, and consumer vehicle maintenance advice.
            </p>

            {/* Search Input & RSS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-[#6B7280] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by topic…"
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-black/[0.12] text-sm text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2563EB] shadow-sm"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-black/[0.12] text-xs font-bold text-[#4B5563] shadow-sm shrink-0">
                <Rss className="w-4 h-4 text-[#F59E0B]" />
                <span>RSS feed ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Stage */}
      {activeCategory === "All" && !searchQuery.trim() && (
        <section className="py-16 border-b border-black/[0.06] bg-white">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <div className="p-8 sm:p-12 rounded-[32px] bg-[#F9FAFB] border border-black/[0.06] hover:border-[#2563EB]/30 transition-all space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-bold text-xs uppercase tracking-wider">
                FEATURED ARTICLE
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280] font-medium pt-2">
                <span>By {featuredArticle.author}</span>
                <span>•</span>
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm hover:border-[#2563EB]/30 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#2563EB] bg-[#2563EB]/5 px-3 py-1 rounded-full border border-[#2563EB]/15">
                      {art.category}
                    </span>
                    <span className="text-[#6B7280]">{art.readTime}</span>
                  </div>
                  <h3 className="font-bold text-xl text-[#111827] group-hover:text-[#2563EB] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/[0.04] mt-6 flex items-center justify-between text-xs text-[#6B7280]">
                  <span>{art.date}</span>
                  <span className="font-bold text-[#2563EB] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
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
