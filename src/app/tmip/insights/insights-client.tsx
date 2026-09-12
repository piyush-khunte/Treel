"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InsightArticle {
  id: string;
  slug: string;
  category: "Platform" | "Deployments" | "Product Updates" | "Fleet Analytics" | "Engineering";
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
}

const articles: InsightArticle[] = [
  {
    id: "1",
    slug: "vehicle-digital-twin-real-time-telemetry",
    category: "Platform",
    title: "How Sub-Second Vehicle Telemetry Redefines Chassis Maintenance",
    excerpt:
      "A technical dissection of why 5-minute telematics polling fails to prevent blowout catastrophes, and how 180ms edge event streaming transforms fleet safety.",
    author: "Rohan Varma",
    date: "October 2026",
    readTime: "6 min read",
  },
  {
    id: "2",
    slug: "nh-48-linehaul-deployment-lessons",
    category: "Deployments",
    title: "Deploying 1,000 Heavy Commercial Assets on the Western Logistics Corridor",
    excerpt:
      "Field engineering takeaways from equipping linehaul tractor-trailers across seven depot hubs under operational delivery schedules.",
    author: "Vikram Sengupta",
    date: "September 2026",
    readTime: "8 min read",
  },
  {
    id: "3",
    slug: "tmip-engine-2-4-release",
    category: "Product Updates",
    title: "TMIP Engine 2.4: Predictive Thermal Anomaly Detection & Custom TMS Webhooks",
    excerpt:
      "Announcing major algorithm enhancements to the thermal degradation engine, plus bi-directional event webhooks for SAP and custom TMS stacks.",
    author: "Product Engineering Group",
    date: "August 2026",
    readTime: "4 min read",
  },
  {
    id: "4",
    slug: "fuel-tyre-pressure-correlation-study",
    category: "Fleet Analytics",
    title: "The Math of Rolling Resistance: Correlating 10 PSI Under-Inflation to Diesel Burn",
    excerpt:
      "Empirical analysis tracking 18 million kilometres of commercial haulage. How continuous pressure calibration cuts fleet operating fuel expense by 5.2%.",
    author: "Pooja Deshmukh",
    date: "July 2026",
    readTime: "10 min read",
  },
  {
    id: "5",
    slug: "in-cabin-edge-gateway-architecture",
    category: "Engineering",
    title: "Architecting Offline Resilience in Edge Telematics Gateways",
    excerpt:
      "How TMIP's ARAI-certified in-vehicle edge gateway stores, validates, and re-synchronizes diagnostic CAN packets when crossing cellular dead-zones.",
    author: "Amitabh Sen",
    date: "June 2026",
    readTime: "7 min read",
  },
  {
    id: "6",
    slug: "cold-chain-unit-economics",
    category: "Fleet Analytics",
    title: "Benchmarking Cost-per-Kilometre Across Multi-Axle Reefer Haulers",
    excerpt:
      "Isolating auxiliary generator power requirements and tyre rolling friction to establish baseline true cost-per-kilometre in cold-chain logistics.",
    author: "Pooja Deshmukh",
    date: "May 2026",
    readTime: "5 min read",
  },
];

export function InsightsClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Platform", "Deployments", "Product Updates", "Fleet Analytics", "Engineering"];

  const filteredArticles = articles.filter(
    (a) => selectedCategory === "All" || a.category === selectedCategory
  );

  return (
    <div className="space-y-12">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-400/10">
        <span className="text-xs font-jetbrains text-[#94A3B8] uppercase mr-2 font-semibold">Filter Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-[2px] text-xs font-jetbrains transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#3B82F6] text-white font-medium shadow-sm"
                : "bg-white/[0.03] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.08] border border-slate-400/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-jetbrains uppercase tracking-wider text-[#3B82F6] font-semibold">
                  {article.category}
                </span>
                <span className="text-xs font-jetbrains text-[#64748B]">{article.readTime}</span>
              </div>

              <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-sm text-[#94A3B8] font-ibm-plex leading-relaxed line-clamp-3">{article.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-slate-400/10 flex items-center justify-between text-xs font-jetbrains text-[#94A3B8]">
              <span>{article.date}</span>
              <Link
                href="/tmip/whitepapers/roi-fleet-intelligence"
                className="text-[#3B82F6] font-semibold group-hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Read article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
