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
    <div className="bg-white text-slate-900 font-manrope min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              REVIEWS
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              What customers say.
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              Verified reviews from Personal TPMS customers. Only people who bought the product can leave a review.
            </p>
          </div>
        </div>
      </section>

      {/* Rating Summary Section */}
      <section className="py-16 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Score Box */}
            <div className="lg:col-span-4 p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
              <div className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">4.8</div>
              <div className="flex items-center justify-center text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <div className="text-sm font-bold text-slate-700">Based on 2,400+ Verified Buyers</div>
              <p className="text-xs text-slate-500">98% would recommend Personal TPMS to friends & family</p>
            </div>

            {/* Right Distribution Breakdown */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="w-16">5 Stars</span>
                <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[85%]" />
                </div>
                <span className="w-12 text-right font-bold text-slate-900">85%</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="w-16">4 Stars</span>
                <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[11%]" />
                </div>
                <span className="w-12 text-right font-bold text-slate-900">11%</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="w-16">3 Stars</span>
                <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[3%]" />
                </div>
                <span className="w-12 text-right font-bold text-slate-900">3%</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="w-16">2 Stars</span>
                <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[1%]" />
                </div>
                <span className="w-12 text-right font-bold text-slate-900">1%</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="w-16">1 Star</span>
                <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[0.5%]" />
                </div>
                <span className="w-12 text-right font-bold text-slate-900">&lt;1%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Chips & Review List Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-8">
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {filterChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(chip)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeFilter === chip
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="space-y-6">
            {reviews.map((rev, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex text-amber-400">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">{rev.date}</div>
                </div>

                <h3 className="text-xl font-bold text-slate-900">"{rev.title}"</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{rev.body}</p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800">
                    {rev.name} · <span className="font-normal text-slate-500">{rev.vehicle}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>Was this review helpful?</span>
                    <button
                      onClick={() => handleVote(idx)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                        voted[idx] 
                          ? "bg-blue-50 border-blue-200 text-blue-700" 
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
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
            <button className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs">1</button>
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100">2</button>
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100">3</button>
            <button className="px-4 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100">Next →</button>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Join thousands of protected drivers across India.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Get Personal TPMS for ₹8,999 with 1-year replacement warranty.
              </p>
            </div>
            <Link
              href="/personal/buy"
              className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" /> Buy Personal TPMS →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
