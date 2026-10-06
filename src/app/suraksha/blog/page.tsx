"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Calendar, 
  User, 
  Filter, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WhatsAppCircularIcon } from "@/components/ui/whatsapp-circular-icon";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

interface Article {
  id: string;
  title: string;
  category: "Fuel efficiency" | "Safety" | "Business & GST" | "Route planning" | "Industry news" | "Maintenance";
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  isSeed: boolean;
}

const articlesData: Article[] = [
  // Fuel Efficiency
  {
    id: "fuel-10-tips",
    title: "10 Simple Fuel-Saving Tips Every Driver Should Know",
    category: "Fuel efficiency",
    excerpt: "Maintaining proper tyre pressure and smooth throttle control can cut your diesel consumption by 8–12%.",
    author: "Suraksha Fleet Team",
    date: "October 2026",
    readTime: "5 min read",
    isSeed: true
  },
  {
    id: "fuel-warning-signs",
    title: "Is Your Truck Consuming Too Much Fuel? 5 Warning Signs",
    category: "Fuel efficiency",
    excerpt: "If your truck pulls to one side or tyre shoulders show rapid wear, under-inflation is wasting fuel.",
    author: "Technical Desk",
    date: "October 2026",
    readTime: "4 min read",
    isSeed: true
  },
  {
    id: "fuel-right-pressure",
    title: "How Proper Tyre Pressure Saves Fuel",
    category: "Fuel efficiency",
    excerpt: "Rolling resistance is directly tied to tyre pressure. Every 10 PSI drop increases diesel consumption by 1.5%.",
    author: "Engineering Team",
    date: "September 2026",
    readTime: "6 min read",
    isSeed: true
  },

  // Safety
  {
    id: "safety-monsoon",
    title: "Monsoon Truck Safety — Essential Tips for Highway Drivers",
    category: "Safety",
    excerpt: "Wet road surfaces increase braking distance by up to 40%. Checking tread depth and tyre pressure is critical.",
    author: "Safety Operations",
    date: "September 2026",
    readTime: "6 min read",
    isSeed: true
  },
  {
    id: "safety-highway-rules",
    title: "Highway Driving — 7 Essential Safety Rules That Save Lives",
    category: "Safety",
    excerpt: "Proven fatigue-management guidelines, night driving precautions, and roadside emergency protocols for long-haul routes.",
    author: "Driver Welfare Cell",
    date: "September 2026",
    readTime: "5 min read",
    isSeed: true
  },
  {
    id: "safety-front-blowout",
    title: "How to Prevent Front Tyre Blowouts — A Highway Survival Guide",
    category: "Safety",
    excerpt: "Step-by-step steering control and emergency deceleration techniques if a front tyre loses pressure at highway speed.",
    author: "Accident Prevention Unit",
    date: "August 2026",
    readTime: "6 min read",
    isSeed: true
  },

  // Business & GST
  {
    id: "business-gst-basics",
    title: "GST Basics for Owner-Drivers — 2026 Guide",
    category: "Business & GST",
    excerpt: "Reverse Charge Mechanism (RCM), e-way bill compliance, and GTA rules simplified for single-truck operators.",
    author: "Transport Legal Advisor",
    date: "October 2026",
    readTime: "7 min read",
    isSeed: true
  },
  {
    id: "business-truck-insurance",
    title: "Commercial Truck Insurance — What Is Covered and What Isn't",
    category: "Business & GST",
    excerpt: "Third-party vs comprehensive insurance, tyre damage riders, and how to file accident claims without delays.",
    author: "Insurance Guidance Desk",
    date: "September 2026",
    readTime: "5 min read",
    isSeed: true
  },
  {
    id: "business-fastag-toll",
    title: "FASTag and Toll Management — A Complete Guide",
    category: "Business & GST",
    excerpt: "Resolving blacklisted tag disputes, toll charge reconciliation, and monthly pass benefits on commercial freight routes.",
    author: "Highway Logistics Desk",
    date: "August 2026",
    readTime: "4 min read",
    isSeed: true
  },

  // Route Planning
  {
    id: "route-truck-stops",
    title: "Best Truck Stops Across India — Corridor Guide",
    category: "Route planning",
    excerpt: "Verified secure parking, hygienic dhabas, and clean rest facilities along NH44, NH48, and the Golden Quadrilateral.",
    author: "Corridor Survey Team",
    date: "October 2026",
    readTime: "8 min read",
    isSeed: true
  },
  {
    id: "route-trip-planning",
    title: "Long-Haul Trip Planning — Driver Fatigue Management",
    category: "Route planning",
    excerpt: "A structured 3-step micro-rest schedule for 12-hour shifts to prevent highway hypnosis and sleep deprivation.",
    author: "Driver Health Cell",
    date: "September 2026",
    readTime: "5 min read",
    isSeed: true
  },

  // Industry News & Maintenance
  {
    id: "industry-scrappage",
    title: "New Vehicle Scrappage Policy — What It Means for Owner-Drivers",
    category: "Industry news",
    excerpt: "15-year fitness test rules, renewal fees, and how green tax regulations affect commercial fleet economics.",
    author: "Policy Research Group",
    date: "October 2026",
    readTime: "6 min read",
    isSeed: true
  },
  {
    id: "industry-diesel-trends",
    title: "Diesel Price Trends and Protecting Freight Margins",
    category: "Industry news",
    excerpt: "How to calculate per-kilometre operational costs and protect freight margins during diesel price swings.",
    author: "Freight Economics Team",
    date: "September 2026",
    readTime: "4 min read",
    isSeed: true
  },
  {
    id: "maint-seasonal-calibration",
    title: "Tyre Pressure in Summer Heat — Highway Maintenance Guide",
    category: "Maintenance",
    excerpt: "How hot tarmac temperatures above 60°C affect tyre pressure, and the golden rules of cold vs hot inflation.",
    author: "Tyre Technical Team",
    date: "August 2026",
    readTime: "5 min read",
    isSeed: true
  }
];

const categories = [
  "All",
  "Fuel efficiency",
  "Safety",
  "Business & GST",
  "Route planning",
  "Industry news",
  "Maintenance"
] as const;

export default function SurakshaBlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") return articlesData;
    return articlesData.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage, itemsPerPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Blog" },
              ]}
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              BLOG
            </div>

            <h1 className="font-anton uppercase tracking-normal text-5xl sm:text-6xl lg:text-7xl text-[#451A03] leading-[0.95]">
              THE DRIVERS' <span className="italic text-[#DC2626]">BLOG.</span>
            </h1>

            <SurakshaRotator
              page="5.22"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide"
            >
              सड़क, ट्रक और कमाई की काम की बातें।
            </SurakshaRotator>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Practical tips on fuel efficiency, monsoon safety, route planning, GST for owner-drivers and industry updates, written in simple language for the trucking community.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <section className="py-8 border-b-2 border-[#451A03]/10 bg-[#FEF3C7] sticky top-20 z-30 shadow-sm backdrop-blur-md bg-[#FEF3C7]/95">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#78350F]">
            <Filter className="w-3.5 h-3.5 text-[#DC2626]" />
            Category Filter ({filteredArticles.length} topics)
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-[#DC2626] text-white border-[#DC2626] shadow-sm"
                    : "bg-[#FFFBEB] text-[#451A03] border-[#451A03]/20 hover:border-[#DC2626]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED ARTICLE SECTION */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="bg-[#FEF3C7] border-3 border-[#DC2626] rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 bg-[#DC2626] text-white font-rubik text-xs font-bold uppercase tracking-widest rounded-[4px]">
                  FEATURED
                </span>
                <span className="px-2.5 py-0.5 bg-[#451A03] text-[#FEF3C7] text-xs font-bold uppercase rounded-[4px]">
                  Safety
                </span>
              </div>

              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl uppercase tracking-normal text-[#451A03] leading-tight">
                How to Prevent Front Tyre Blowouts — A Highway Survival Guide
              </h2>

              <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
                Front tyre blowouts are among the greatest risks at highway speeds. Suraksha gives real-time pressure and temperature alerts to catch slow leaks long before a dangerous failure.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#78350F] flex-wrap">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#DC2626]" /> By Suraksha Technical Team
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#DC2626]" /> October 2026
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#DC2626]" /> 5 min read
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setActiveArticle(articlesData[5])}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-md cursor-pointer"
                >
                  Read article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARTICLE GRID */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="max-w-3xl">
            <h2 className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-[#451A03]">
              LATEST COMMUNITY ARTICLES
            </h2>
            <p className="text-[#78350F] text-base sm:text-lg mt-2 font-medium">
              Practical guides on fuel savings, safety regulations, GST updates, and route planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#DC2626] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-[4px] bg-[#451A03]/10 text-[#451A03] text-[11px] font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#78350F] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#DC2626]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-anton text-2xl uppercase tracking-normal text-[#451A03] group-hover:text-[#DC2626] transition-colors leading-tight">
                    {article.title}
                  </h3>

                  <p className="text-[#78350F] text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#451A03]/10 mt-6 flex items-center justify-between">
                  <div className="text-[11px] text-[#78350F] font-semibold">
                    <div>{article.author}</div>
                    <div className="text-[10px] text-[#78350F]/75">{article.date}</div>
                  </div>

                  <button
                    onClick={() => setActiveArticle(article)}
                    className="font-rubik font-bold text-xs uppercase tracking-wider text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1 cursor-pointer"
                  >
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="px-4 py-2 rounded-[4px] border border-[#451A03]/20 bg-[#FFFBEB] text-xs font-bold uppercase text-[#451A03] hover:border-[#DC2626] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-[4px] text-xs font-bold font-mono transition-all cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-[#DC2626] text-white"
                      : "bg-[#FFFBEB] text-[#451A03] border border-[#451A03]/20 hover:border-[#DC2626]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 rounded-[4px] border border-[#451A03]/20 bg-[#FFFBEB] text-xs font-bold uppercase text-[#451A03] hover:border-[#DC2626] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. SUBSCRIBE SECTION */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="bg-[#FEF3C7] border-3 border-[#EA580C] rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto space-y-6 shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-2 max-w-2xl">
                <h3 className="font-anton text-3xl sm:text-4xl uppercase tracking-normal text-[#451A03]">
                  WANT BLOG UPDATES?
                </h3>
                <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
                  Get new articles sent directly to WhatsApp. No spam, just practical trucking guidance.
                </p>
              </div>

              <WhatsAppCircularIcon
                href="/suraksha/whatsapp"
                size="md"
                title="Subscribe on WhatsApp"
                ariaLabel="Subscribe on WhatsApp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BAND */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton text-5xl sm:text-6xl font-normal tracking-tight text-[#FEF3C7] uppercase">
              SAFETY AND SAVINGS GO HAND IN HAND.
            </h2>

            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
              Save ₹25,000+ per truck every year on diesel and tyre wear with Suraksha TPMS.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#FEF3C7] text-[#451A03] hover:bg-white active:scale-[0.98]"
              >
                Nearest Centre <ArrowRight className="w-5 h-5 text-[#DC2626]" />
              </Link>
              <WhatsAppCircularIcon
                href="/suraksha/whatsapp"
                size="lg"
                title="Chat on WhatsApp"
                ariaLabel="Chat on WhatsApp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ARTICLE PREVIEW MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FFFBEB] border-2 border-[#DC2626] rounded-xl max-w-2xl w-full p-6 sm:p-8 text-[#451A03] space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#451A03]/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider">
                  {activeArticle.category} · {activeArticle.readTime}
                </span>
                <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-normal text-[#451A03]">
                  {activeArticle.title}
                </h3>
                <div className="text-xs text-[#78350F] font-semibold">
                  By {activeArticle.author} · {activeArticle.date}
                </div>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-2.5 py-1 text-xs bg-[#451A03]/10 hover:bg-[#451A03]/20 rounded font-mono font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#451A03] leading-relaxed">
              <p className="font-medium text-base text-[#78350F]">
                {activeArticle.excerpt}
              </p>

              <div className="p-4 bg-[#FEF3C7] rounded-lg border border-[#451A03]/15 space-y-2">
                <div className="font-bold text-xs uppercase text-[#DC2626]">
                  Key Takeaway for Indian Highway Drivers:
                </div>
                <p className="text-xs leading-relaxed text-[#78350F]">
                  Suraksha delivers continuous tyre pressure and temperature telemetry to your cab. Early leak warnings prevent blowouts on high-speed runs and protect fuel economy.
                </p>
              </div>

            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#451A03]/10">
              <Link
                href="/suraksha/centres"
                onClick={() => setActiveArticle(null)}
                className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1"
              >
                Fit Suraksha at Nearest Centre →
              </Link>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-[#DC2626] text-white text-xs font-bold rounded uppercase tracking-wider cursor-pointer"
              >
                Back to Blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}