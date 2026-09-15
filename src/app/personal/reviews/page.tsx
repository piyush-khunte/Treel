"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  Filter, 
  MessageSquarePlus, 
  ArrowRight,
  ShoppingCart
} from "lucide-react";

export default function PersonalReviewsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, number>>({ 0: 42, 1: 29, 2: 38 });
  const [voted, setVoted] = useState<Record<number, boolean>>({});

  const reviews = [
    {
      stars: 5,
      title: "Life saving tool for Indian roads",
      body: "I've been using the Treel TPMS for six months now. Highway drive from Pune to Mumbai, I got a slow leak warning on the front-right tyre. Pulled into the next dhaba and there was a nail. If I'd kept driving I'd have had a blowout at 100 km/h. Worth every rupee.",
      name: "Narender K.",
      date: "Purchased March 2026",
      vehicle: "Mahindra XUV700",
      verified: true
    },
    {
      stars: 5,
      title: "Amazing gadget, prompt after-sales",
      body: "Great product, easy to install even for someone like me who doesn't know much about cars. The app is clean and shows exactly what I need. Customer support was prompt when I had a question about the sensor pairing.",
      name: "Rajiv T.",
      date: "Purchased February 2026",
      vehicle: "Honda City",
      verified: true
    },
    {
      stars: 5,
      title: "Customer support really cares",
      body: "Bought this after my daughter got a tyre burst on the highway last year. Peace of mind for the whole family. The customer service team helped me set up multi-vehicle tracking since I have two cars. Very satisfying experience.",
      name: "Dinanath K.",
      date: "Purchased January 2026",
      vehicle: "Hyundai Creta & Maruti Swift",
      verified: true
    }
  ];

  const handleVote = (idx: number) => {
    if (!voted[idx]) {
      setHelpfulVotes(prev => ({ ...prev, [idx]: (prev[idx] || 0) + 1 }));
      setVoted(prev => ({ ...prev, [idx]: true }));
    }
  };

  const filterChips = ["All", "5 stars", "4 stars", "Verified purchase", "Most helpful", "Most recent"];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              REVIEWS
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              What customers say.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Verified reviews from Personal TPMS customers. Only people who bought the product can leave a review.
            </p>
          </div>
        </div>
      </section>

      {/* Rating Summary Section */}
      <section className="py-16 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Score Box */}
            <div className="lg:col-span-4 p-8 sm:p-10 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] text-center space-y-4">
              <div className="text-5xl sm:text-6xl font-extrabold text-[#111827] tracking-tight">4.8</div>
              <div className="flex items-center justify-center text-[#F59E0B] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="text-sm font-bold text-[#111827]">Based on 2,400+ Verified Buyers</div>
              <p className="text-xs text-[#6B7280]">98% would recommend Personal TPMS to friends & family</p>
            </div>

            {/* Right Distribution Breakdown */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-4 text-xs font-semibold text-[#4B5563]">
                <span className="w-16">5 Stars</span>
                <div className="flex-1 h-3 rounded-full bg-black/[0.04] overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full w-[85%]" />
                </div>
                <span className="w-12 text-right font-bold text-[#111827]">85%</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-[#4B5563]">
                <span className="w-16">4 Stars</span>
                <div className="flex-1 h-3 rounded-full bg-black/[0.04] overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full w-[11%]" />
                </div>
                <span className="w-12 text-right font-bold text-[#111827]">11%</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-[#4B5563]">
                <span className="w-16">3 Stars</span>
                <div className="flex-1 h-3 rounded-full bg-black/[0.04] overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full w-[3%]" />
                </div>
                <span className="w-12 text-right font-bold text-[#111827]">3%</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-[#4B5563]">
                <span className="w-16">2 Stars</span>
                <div className="flex-1 h-3 rounded-full bg-black/[0.04] overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full w-[1%]" />
                </div>
                <span className="w-12 text-right font-bold text-[#111827]">1%</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-[#4B5563]">
                <span className="w-16">1 Star</span>
                <div className="flex-1 h-3 rounded-full bg-black/[0.04] overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full w-[0.5%]" />
                </div>
                <span className="w-12 text-right font-bold text-[#111827]">&lt;1%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Chips & Review List Section */}
      <section className="py-16 bg-[#F9FAFB] border-b border-black/[0.06]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-8">
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {filterChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(chip)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeFilter === chip
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "bg-white text-[#4B5563] border border-black/[0.08] hover:border-[#2563EB]/40 hover:bg-[#F3F4F6]"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="space-y-6">
            {reviews.map((rev, idx) => (
              <div key={idx} className="p-8 sm:p-10 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4 hover:border-[#2563EB]/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex text-[#F59E0B]">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="text-[11px] font-bold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#6B7280] font-medium">{rev.date}</div>
                </div>

                <h3 className="text-xl font-bold text-[#111827]">"{rev.title}"</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{rev.body}</p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-black/[0.06]">
                  <div className="text-xs font-bold text-[#111827]">
                    {rev.name} · <span className="font-normal text-[#6B7280]">{rev.vehicle}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span>Was this review helpful?</span>
                    <button
                      onClick={() => handleVote(idx)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-bold transition-colors cursor-pointer ${
                        voted[idx] 
                          ? "bg-[#2563EB]/10 border-[#2563EB]/20 text-[#2563EB]" 
                          : "border-black/[0.08] text-[#4B5563] hover:bg-[#F3F4F6]"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{helpfulVotes[idx] || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 pt-6">
            <button className="w-10 h-10 rounded-full bg-[#2563EB] text-white font-bold text-xs shadow-xs">1</button>
            <button className="w-10 h-10 rounded-full bg-white border border-black/[0.08] text-[#4B5563] font-bold text-xs hover:bg-[#F3F4F6]">2</button>
            <button className="w-10 h-10 rounded-full bg-white border border-black/[0.08] text-[#4B5563] font-bold text-xs hover:bg-[#F3F4F6]">3</button>
            <button className="px-5 h-10 rounded-full bg-white border border-black/[0.08] text-[#4B5563] font-bold text-xs hover:bg-[#F3F4F6]">Next →</button>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-14 rounded-[32px] bg-[#111827] text-white shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Join thousands of protected drivers across India.
              </h2>
              <p className="text-[#94A3B8] text-sm sm:text-base font-normal">
                Get Personal TPMS for ₹8,999 with 1-year replacement warranty and free pan-India shipping.
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
