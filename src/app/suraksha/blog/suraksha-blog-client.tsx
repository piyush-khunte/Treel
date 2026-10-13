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
import { SurakshaArticle } from "@/types/content";
import { slugifyAuthor } from "@/lib/authors/author-utils";

interface Article {
  id: string;
  slug?: string;
  title: string;
  category: "Fuel efficiency" | "Safety" | "Business & GST" | "Route planning" | "Industry news" | "Maintenance" | string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  keyTakeaway?: string;
  isFeatured?: boolean;
  isSeed?: boolean;
}

const fallbackArticlesData: Article[] = [
  // Fuel Efficiency
  {
    id: "fuel-10-tips",
    title: "10 Simple Fuel-Saving Tips Every Driver Should Know",
    category: "Fuel efficiency",
    excerpt: "Maintaining proper tyre pressure and smooth throttle control can cut your diesel consumption by 8–12%.",
    author: "Suraksha Fleet Team",
    date: "October 2026",
    readTime: "5 min read",
    keyTakeaway: "Keeping cold tyre pressure within 2 PSI of recommendation saves ₹18,000 to ₹25,000 in annual diesel bills on long-haul routes.",
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
    keyTakeaway: "Unbalanced steering pull usually means unequal tyre inflation. Check front axle cold PSI before adjusting mechanical alignment.",
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
    keyTakeaway: "Under-inflation flexes tyre rubber continuously, converting valuable diesel combustion directly into wasted road friction heat.",
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
    keyTakeaway: "Never reduce tyre pressure during monsoon. Harder, properly inflated tread grooves cut through standing water to prevent aquaplaning.",
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
    keyTakeaway: "Take a 15-minute break every 3 hours on night journeys. Inspect tyre warmth by feeling the valve stems during rest breaks.",
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
    keyTakeaway: "If a front tyre bursts, do NOT slam the brakes. Grip the steering wheel firmly with both hands, maintain slight throttle, and gently coast onto the shoulder.",
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
    keyTakeaway: "Single-truck owner operators transporting goods under GTA RCM do not require separate GST registration if bill value is under thresholds.",
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
    keyTakeaway: "Standard motor policies exclude tyre rim and blowout damage unless you have an active commercial tyre add-on endorsement.",
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
    keyTakeaway: "Keep your FASTag linked to NPCI bank account with auto-recharge to prevent toll plaza double-cash charge penalties.",
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
    keyTakeaway: "Choose truck centres equipped with automated nitrogen stations and round-the-clock CCTV parking security.",
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
    keyTakeaway: "Plan rest stops between 2 AM and 5 AM when circadian rhythm is lowest to eliminate microsleep risks on expressways.",
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
    keyTakeaway: "Maintaining valid fitness certificates and emission testing protects owner-drivers from heavy state inter-border checkpoint penalties.",
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
    keyTakeaway: "Include a diesel-price escalation clause in quarterly transport contracts to insulate your truck's net monthly profit.",
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
    keyTakeaway: "Never bleed air from a hot tyre during midday runs. Pressure naturally rises with heat; bleeding air causes severe under-inflation when tyres cool down.",
    isSeed: true
  }
];

interface SurakshaBlogClientProps {
  initialArticles?: SurakshaArticle[];
}

export function SurakshaBlogClient({ initialArticles }: SurakshaBlogClientProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const articlesData: Article[] = useMemo(() => {
    if (initialArticles && initialArticles.length > 0) {
      return initialArticles.map((a) => ({
        id: a._id || a.slug || `sur_${Date.now()}`,
        slug: a.slug || a._id,
        title: a.title,
        category: a.category as any,
        excerpt: a.excerpt,
        author: a.author,
        date: a.date,
        readTime: a.readTime,
        keyTakeaway: a.keyTakeaway,
        isFeatured: a.isFeatured,
        isSeed: false,
      }));
    }
    return fallbackArticlesData.map((a) => ({
      ...a,
      slug: a.id,
    }));
  }, [initialArticles]);

  const featuredArticle = useMemo(() => {
    return (
      articlesData.find((a) => a.slug === "safety-front-blowout" || a.id === "safety-front-blowout") ||
      articlesData.find((a) => a.isFeatured) ||
      articlesData[0]
    );
  }, [articlesData]);

  const baseCategories = [
    "All",
    "Fuel efficiency",
    "Safety",
    "Business & GST",
    "Route planning",
    "Industry news",
    "Maintenance"
  ];

  const categories = useMemo(() => {
    const dynamicCats = Array.from(new Set(articlesData.map((a) => a.category).filter(Boolean)));
    return Array.from(new Set([...baseCategories, ...dynamicCats]));
  }, [articlesData]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") return articlesData;
    return articlesData.filter((a) => a.category === selectedCategory);
  }, [selectedCategory, articlesData]);

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
              THE DRIVERS&apos; <span className="italic text-[#DC2626]">BLOG.</span>
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
                  {featuredArticle.category}
                </span>
              </div>

              <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl uppercase tracking-normal text-[#451A03] leading-tight">
                <Link
                  href={`/suraksha/blog/${featuredArticle.slug || featuredArticle.id}`}
                  className="hover:text-[#DC2626] transition-colors"
                >
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#78350F] flex-wrap">
                <Link
                  href={`/authors/${slugifyAuthor(featuredArticle.author)}`}
                  className="flex items-center gap-1.5 hover:text-[#DC2626] hover:underline transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#DC2626]" />
                  {featuredArticle.author}
                </Link>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#DC2626]" />
                  {featuredArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#DC2626]" />
                  {featuredArticle.readTime}
                </span>
              </div>

              <div className="pt-4">
                <Link
                  href={`/suraksha/blog/${featuredArticle.slug || featuredArticle.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-sm transition-all shadow-sm bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                >
                  Read featured article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARTICLES GRID */}
      <section className="py-20 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-[#FFFBEB] border-2 border-[#451A03]/10 hover:border-[#DC2626] rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-sm group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-[#DC2626]">{article.category}</span>
                    <span className="text-[#78350F]/70 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#DC2626]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-anton text-2xl uppercase tracking-normal text-[#451A03] group-hover:text-[#DC2626] transition-colors leading-tight">
                    <Link
                      href={`/suraksha/blog/${article.slug || article.id}`}
                      className="hover:underline"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-[#78350F] text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#451A03]/10 mt-6 flex items-center justify-between">
                  <div className="text-[11px] text-[#78350F] font-semibold">
                    <div>
                      <Link
                        href={`/authors/${slugifyAuthor(article.author)}`}
                        className="hover:text-[#DC2626] hover:underline transition-colors"
                      >
                        {article.author}
                      </Link>
                    </div>
                    <div className="text-[10px] text-[#78350F]/75">{article.date}</div>
                  </div>

                  <Link
                    href={`/suraksha/blog/${article.slug || article.id}`}
                    className="font-rubik font-bold text-xs uppercase tracking-wider text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1"
                  >
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
    </div>
  );
}

