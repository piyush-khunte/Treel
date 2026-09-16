"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  Rss, 
  Mail, 
  Loader2, 
  CheckCircle2, 
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
}

export function InsightsClientView() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    "All",
    "Mobility Intelligence",
    "Fleet Operations",
    "Product Updates",
    "Industry Analysis",
    "Case Studies",
    "Founder Notes"
  ];

  const featuredArticle: Article = {
    slug: "vehicle-digital-twins-architecture",
    category: "Mobility Intelligence",
    title: "From Telemetry to Reasoning: The Architecture of Vehicle Digital Twins",
    excerpt: "How sub-second sensor signals from 68,000 commercial vehicles transform into predictive maintenance models and operational capital for modern fleet enterprises.",
    author: "Manish Ingale",
    date: "September 2026",
    readTime: "6 min read"
  };

  const articles: Article[] = [
    {
      slug: "physics-of-tyre-pressure-fuel-savings",
      category: "Fleet Operations",
      title: "The Direct Thermodynamics of Under-Inflation on Diesel Consumption",
      excerpt: "An empirical study tracking 100,000 km across multi-axle trailers reveals the non-linear relationship between tyre rolling resistance and fuel burn.",
      author: "Pradnya Choudhary",
      date: "August 2026",
      readTime: "5 min read"
    },
    {
      slug: "scaling-iot-across-indian-highways",
      category: "Product Updates",
      title: "Edge Resilience: Engineering Telemetry for Unreliable Cellular Corridors",
      excerpt: "How Treel smart sensors store, deduplicate, and burst-sync vehicle data during prolonged cellular blackouts across rural freight highways.",
      author: "Nithin",
      date: "August 2026",
      readTime: "8 min read"
    },
    {
      slug: "why-suraksha-matters-for-owner-drivers",
      category: "Case Studies",
      title: "Protecting the 1-Truck Operator: The Economics of Roadside Puncture Avoidance",
      excerpt: "Single-truck owner-drivers operate on razor-thin margins. Here is how real-time pressure alerts prevent catastrophic tyre blowouts on the Golden Quadrilateral.",
      author: "Atharv",
      date: "July 2026",
      readTime: "4 min read"
    },
    {
      slug: "cfo-guide-to-fleet-payback",
      category: "Industry Analysis",
      title: "The CFO Guide to Fleet Telemetry: Measuring the 9-Month Payback",
      excerpt: "Breaking down the capital allocation math of smart sensors versus tyre replacements, downtime penalties, and fuel theft mitigation.",
      author: "Imran Khan",
      date: "July 2026",
      readTime: "7 min read"
    },
    {
      slug: "founding-conviction-2018-to-2026",
      category: "Founder Notes",
      title: "The Tyre Was the Entry Point: Reflections on Eight Years of Building Treel",
      excerpt: "Reflecting on the journey from our first valve-stem sensor prototypes in Pune to operating India's largest connected commercial vehicle platform.",
      author: "Manish Ingale",
      date: "June 2026",
      readTime: "5 min read"
    },
    {
      slug: "predictive-maintenance-vs-scheduled",
      category: "Fleet Operations",
      title: "Why Scheduled Maintenance Fails Heavy Commercial Vehicles in Monsoon",
      excerpt: "Dynamic load shifts, water ingress, and ambient heat require condition-based tyre management rather than static calendar intervals.",
      author: "Treel Research",
      date: "June 2026",
      readTime: "6 min read"
    }
  ];

  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter((a) => a.category === activeCategory);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubscribing) return;

    setIsSubscribing(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubscribing(false);
    setSubscribed(true);
  };

  return (
    <div className="space-y-0">
      {/* Featured Article Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Insights" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-[4px] bg-[#D5573B]/10 border border-[#D5573B]/20 text-[#D5573B] font-mono text-xs uppercase tracking-widest font-semibold">
                FEATURED
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">
                {featuredArticle.category}
              </span>
            </div>

            <Link href={`/insights/${featuredArticle.slug}`} className="group block space-y-4">
              <h1 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors leading-[1.12]">
                {featuredArticle.title}
              </h1>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter max-w-3xl">
                {featuredArticle.excerpt}
              </p>
            </Link>

            {/* Editorial Visual Container */}
            <div className="w-full aspect-[21/9] rounded-lg bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/[0.08] flex items-center justify-center relative overflow-hidden my-6">
              <div className="flex flex-col items-center gap-2 text-[#94A3B8]">
                <BookOpen className="w-10 h-10 text-[#D5573B]/70" />
                <span className="text-xs font-mono tracking-wider uppercase">Editorial Feature</span>
              </div>
            </div>

            {/* Byline & Read CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-4 text-xs sm:text-sm font-mono text-[#94A3B8]">
                <span>By {featuredArticle.author}</span>
                <span>•</span>
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <Link
                href={`/insights/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-xs hover:bg-[#CB4831] transition-all shadow-md"
              >
                <span>Read the article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="py-8 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#D5573B] text-[#FAF7F2] font-bold shadow-sm"
                    : "bg-white/[0.03] text-[#94A3B8] hover:text-white hover:bg-white/[0.06] border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between overflow-hidden shadow-sm"
              >
                {/* Thumbnail Placeholder */}
                <div className="w-full aspect-[16/9] bg-gradient-to-br from-white/[0.05] to-white/[0.01] border-b border-white/10 flex items-center justify-center text-[#94A3B8]">
                  <BookOpen className="w-7 h-7 text-[#D5573B]/50 group-hover:scale-110 transition-transform" />
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#D5573B] font-semibold">
                      {article.category}
                    </span>
                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed font-inter">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                    <span>By {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section · Newsletter Signup */}
      <section className="py-20 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mx-auto">
              <Mail className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="font-fraunces text-3xl sm:text-4xl font-medium text-[#FAF7F2]">
                Mobility intelligence in your inbox.
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
                A monthly note on what we&apos;re seeing across India&apos;s largest connected commercial vehicle dataset. No spam. Unsubscribe anytime.
              </p>
            </div>

            {subscribed ? (
              <div className="p-4 rounded-lg bg-white/[0.04] border border-[#D5573B]/30 max-w-md mx-auto flex items-center justify-center gap-2 text-sm text-[#FAF7F2] animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-[#D5573B]" />
                <span>Thank you for subscribing to Treel Insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm outline-none focus:border-[#D5573B] transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </form>
            )}

            {/* RSS Link Footer */}
            <div className="pt-8 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Rss className="w-4 h-4 text-[#D5573B]" />
              <span>Also available via RSS:</span>
              <Link href="/insights/rss.xml" className="text-[#FAF7F2] underline hover:text-[#D5573B] transition-colors">
                /insights/rss.xml
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
