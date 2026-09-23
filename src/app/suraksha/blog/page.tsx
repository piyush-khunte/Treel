"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Calendar, 
  User, 
  Rss, 
  Filter, 
  Share2, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Sparkles
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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
    title: "Fuel Efficiency Ke 10 Simple Tips Jo Har Driver Ko Pata Hone Chahiye",
    category: "Fuel efficiency",
    excerpt: "Sahi tyre pressure maintain karne aur linear throttle input se diesel consumption 8-12% tak reduce ho sakta hai.",
    author: "Suraksha Fleet Team",
    date: "October 2026",
    readTime: "5 min read",
    isSeed: true
  },
  {
    id: "fuel-warning-signs",
    title: "Kya Aap Ka Truck Zyada Fuel Kha Raha Hai? 5 Warning Signs",
    category: "Fuel efficiency",
    excerpt: "Agar truck pull kar raha hai ya tyre shoulders jaldi wear ho rahe hai, toh under-inflation fuel waste kar raha hai.",
    author: "Technical Desk",
    date: "October 2026",
    readTime: "4 min read",
    isSeed: true
  },
  {
    id: "fuel-right-pressure",
    title: "Right Tyre Pressure Se Fuel Kaise Bachaayein",
    category: "Fuel efficiency",
    excerpt: "Rolling resistance ka direct relation tyre pressure se hai. Har 10 PSI drop par 1.5% zyada fuel burn hota hai.",
    author: "Engineering Team",
    date: "September 2026",
    readTime: "6 min read",
    isSeed: true
  },

  // Safety
  {
    id: "safety-monsoon",
    title: "Monsoon Season Mein Truck Safety — Must-Know Tips",
    category: "Safety",
    excerpt: "Barish ke mausam mein aquaplaning aur wet braking distance 40% tak badh jata hai. Tread depth aur pressure check zaroori hai.",
    author: "Safety Operations",
    date: "September 2026",
    readTime: "6 min read",
    isSeed: true
  },
  {
    id: "safety-highway-rules",
    title: "Highway Driving — 7 Safety Rules Jo Life Bachate Hai",
    category: "Safety",
    excerpt: "Long haul trips par driver fatigue aur night blindness se bachne ke certified tips aur roadside safety protocol.",
    author: "Driver Welfare Cell",
    date: "September 2026",
    readTime: "5 min read",
    isSeed: true
  },
  {
    id: "safety-front-blowout",
    title: "Front Tyre Blowout Se Kaise Bachein — Highway Survival Guide",
    category: "Safety",
    excerpt: "Steer axle par blowout hone par steering control aur emergency deceleration technique ka full safety manual.",
    author: "Accident Prevention Unit",
    date: "August 2026",
    readTime: "6 min read",
    isSeed: true
  },

  // Business & GST
  {
    id: "business-gst-basics",
    title: "Owner-Drivers Ke Liye GST Basics — 2026 Update",
    category: "Business & GST",
    excerpt: "RCM (Reverse Charge Mechanism), e-way bill compliance aur GTA rules jo single truck owners ko samajhna zaroori hai.",
    author: "Transport Legal Advisor",
    date: "October 2026",
    readTime: "7 min read",
    isSeed: true
  },
  {
    id: "business-truck-insurance",
    title: "Truck Insurance — Kya Cover Hota Hai Aur Kya Nahi",
    category: "Business & GST",
    excerpt: "Third party vs comprehensive insurance, tyre damage riders, aur accidental claims file karne ka asaan process.",
    author: "Insurance Guidance Desk",
    date: "September 2026",
    readTime: "5 min read",
    isSeed: true
  },
  {
    id: "business-fastag-toll",
    title: "Fastag Aur Toll — Complete Guide",
    category: "Business & GST",
    excerpt: "Blacklisted tag issues, toll dispute resolutions aur monthly pass benefits for commercial vehicle routes.",
    author: "Highway Logistics Desk",
    date: "August 2026",
    readTime: "4 min read",
    isSeed: true
  },

  // Route Planning
  {
    id: "route-truck-stops",
    title: "India Ke Best Truck Stops — Cluster-wise Guide",
    category: "Route planning",
    excerpt: "NH44, NH48 aur Golden Quadrilateral par secure parking, hygienic dhabas aur clean rest facilities ki verified list.",
    author: "Corridor Survey Team",
    date: "October 2026",
    readTime: "8 min read",
    isSeed: true
  },
  {
    id: "route-trip-planning",
    title: "Long-Haul Trip Planning — Fatigue Management Tips",
    category: "Route planning",
    excerpt: "12-hour shifts mein 3-step micro-rest schedule jo highway hypnosis aur sleep deprivation se bachata hai.",
    author: "Driver Health Cell",
    date: "September 2026",
    readTime: "5 min read",
    isSeed: true
  },

  // Industry News & Maintenance
  {
    id: "industry-scrappage",
    title: "New Vehicle Scrappage Policy — Owner-Drivers Ke Liye Kya Matlab",
    category: "Industry news",
    excerpt: "15-year commercial vehicle fitness test rules, registration renewal fees aur green tax impact on fleet economics.",
    author: "Policy Research Group",
    date: "October 2026",
    readTime: "6 min read",
    isSeed: true
  },
  {
    id: "industry-diesel-trends",
    title: "Diesel Prices — 2026 Trends aur Impact",
    category: "Industry news",
    excerpt: "Fuel price fluctuations ke dauraan per-kilometer freight pricing calculate karne aur margins protect karne ka model.",
    author: "Freight Economics Team",
    date: "September 2026",
    readTime: "4 min read",
    isSeed: true
  },
  {
    id: "maint-seasonal-calibration",
    title: "Summer Heat Mein Tyre Pressure Kitna Rakhein? Maintenance Guide",
    category: "Maintenance",
    excerpt: "Garmiyon mein hot road bitumen temperature 60°C cross karne par cold inflation vs hot inflation balancing rule.",
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
              DRIVERS KA <span className="italic text-[#DC2626]">BLOG.</span>
            </h1>

            <p className="text-[#DC2626] font-rubik text-xl sm:text-2xl font-bold">
              A blog for drivers, by drivers.
            </p>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Truck driving community ke liye practical content — fuel efficiency, monsoon safety, route planning, GST for owner-drivers, aur industry updates. Sab kuch Hinglish mein, aap ke liye.
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
                <span className="text-xs font-semibold text-[#78350F] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#451A03]/15">
                  Editorial Sample Template
                </span>
              </div>

              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl uppercase tracking-normal text-[#451A03] leading-tight">
                Front Tyre Blowout Se Kaise Bachein — Highway Survival Guide
              </h2>

              <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
                Highway par high-speed driving karte waqt front tyre blowout sabse bada risk hota hai. Suraksha real-time pressure & temperature alert se slow leaks pehle hi detect kar leta hai.
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
                  Padhiye <ArrowRight className="w-4 h-4" />
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
                    Padhiye <ArrowRight className="w-3.5 h-3.5" />
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

          <div className="p-4 rounded-lg bg-[#FFFBEB] border border-[#451A03]/15 text-xs text-[#78350F] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#EA580C] shrink-0" />
            <span>
              <strong>Note:</strong> Blog cards contain seed topics specified in content.md. Full in-depth editorial text will be updated dynamically through the CMS.
            </span>
          </div>
        </div>
      </section>

      {/* 5. SUBSCRIBE SECTION */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="bg-[#FEF3C7] border-3 border-[#EA580C] rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto space-y-6 shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-2 max-w-2xl">
                <h3 className="font-anton text-3xl sm:text-4xl uppercase tracking-normal text-[#451A03]">
                  BLOG UPDATES CHAHIYE?
                </h3>
                <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
                  WhatsApp par new articles ka notification chahiye toh subscribe kariye. No spam, sirf useful content.
                </p>
              </div>

              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider bg-[#EA580C] text-white hover:bg-[#C2410C] transition-all shadow-md shrink-0 active:scale-[0.98]"
              >
                WhatsApp par subscribe <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="pt-4 border-t border-[#451A03]/10 flex items-center gap-2 text-xs font-mono text-[#78350F]">
              <Rss className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Available via RSS: <span className="underline font-bold">/suraksha/blog/rss.xml</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BAND */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton text-5xl sm:text-6xl font-normal tracking-tight text-[#FEF3C7] uppercase">
              SAFETY AUR SAVINGS SATH CHALTE HAI.
            </h2>

            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
              Suraksha TPMS se har truck par saal ka ₹25,000+ diesel aur tyre bachat shuru karein.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#FEF3C7] text-[#451A03] hover:bg-white active:scale-[0.98]"
              >
                Nearest Centre <ArrowRight className="w-5 h-5 text-[#DC2626]" />
              </Link>
              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all border-2 border-[#FEF3C7] text-[#FEF3C7] hover:bg-white/10 active:scale-[0.98]"
              >
                WhatsApp Kariye
              </Link>
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
                  Suraksha digital tyre pressure telemetry monitor continuous readings deliver karta hai. High-speed highway runs par early warning blowout prevention aur optimum fuel economy ensure karti hai.
                </p>
              </div>

              <p className="text-xs text-[#78350F]/80 italic">
                * Seed editorial topic from content.md. Full long-form publication body will be syndicated from Treel editorial desk.
              </p>
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