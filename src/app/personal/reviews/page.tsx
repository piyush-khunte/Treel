"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  CheckCircle2,
  ShoppingCart,
  Star,
  ThumbsUp,
  PenLine,
  Sparkles,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

interface ReviewItem {
  id?: string;
  stars: number;
  title: string;
  body: string;
  name: string;
  date: string;
  vehicle: string;
  verified: boolean;
  isUserSubmitted?: boolean;
  mediaUrl?: string | null;
  mediaType?: "image" | "video";
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "init_1",
    stars: 5,
    title: "Life saving tool for Indian roads",
    body: "I've been using the Treel TPMS for six months now. Highway drive from Pune to Mumbai, I got a slow leak warning on the front-right tyre. Pulled into the next dhaba and there was a nail. If I'd kept driving I'd have had a blowout at 100 km/h. Worth every rupee.",
    name: "Narender K.",
    date: "Purchased March 2026",
    vehicle: "Mahindra XUV700",
    verified: true,
  },
  {
    id: "init_2",
    stars: 5,
    title: "Amazing gadget, prompt after-sales",
    body: "Great product, easy to install even for someone like me who doesn't know much about cars. The app is clean and shows exactly what I need. Customer support was prompt when I had a question about the sensor pairing.",
    name: "Rajiv T.",
    date: "Purchased February 2026",
    vehicle: "Honda City",
    verified: true,
  },
  {
    id: "init_3",
    stars: 5,
    title: "Customer support really cares",
    body: "Bought this after my daughter got a tyre burst on the highway last year. Peace of mind for the whole family. The customer service team helped me set up multi-vehicle tracking since I have two cars. Very satisfying experience.",
    name: "Dinanath K.",
    date: "Purchased January 2026",
    vehicle: "Hyundai Creta & Maruti Swift",
    verified: true,
  },
  {
    id: "init_4",
    stars: 5,
    title: "Saved our family trip from a dangerous tyre blowout",
    body: "Driving on Samruddhi Expressway at 120 km/h during hot afternoon. The tyre temperature alert sounded in the cab. Stopped and found the rear left tyre was at 78°C due to underinflation. Saved us from a catastrophic tyre failure.",
    name: "Suresh Menon",
    date: "Purchased April 2026",
    vehicle: "Tata Safari",
    verified: true,
  },
  {
    id: "init_5",
    stars: 4,
    title: "Very accurate readings compared to calibrated gauges",
    body: "Cross-checked the Treel BLE sensor readings with my German analogue tyre pressure gauge. Deviation is less than 0.5 PSI. The battery life indicator in the iOS app is very reassuring.",
    name: "Vikram Sengupta",
    date: "Purchased March 2026",
    vehicle: "Skoda Kushaq",
    verified: true,
  },
  {
    id: "init_6",
    stars: 5,
    title: "Seamless Apple Watch alerts while driving",
    body: "Having tyre pressure notifications delivered directly as haptic taps on my wrist without glancing at my phone is a game changer for expressway driving. Highly recommended.",
    name: "Ananya Deshmukh",
    date: "Purchased February 2026",
    vehicle: "Kia Seltos",
    verified: true,
  },
  {
    id: "init_7",
    stars: 5,
    title: "Zero false alarms and quick pairing",
    body: "Pairing the 4 valve sensors took barely 5 minutes in my garage. Zero Bluetooth dropouts even in heavy city signal interference. Excellent build quality.",
    name: "Rohit Bansal",
    date: "Purchased January 2026",
    vehicle: "Toyota Fortuner",
    verified: true,
  },
  {
    id: "init_8",
    stars: 4,
    title: "Worth the investment for highway commuters",
    body: "I commute 80 km every day on Delhi-NCR expressways. The continuous pressure graphing in the app helps me track slow seepage over weeks. Very satisfied with customer service.",
    name: "Gaurav Chopra",
    date: "Purchased December 2025",
    vehicle: "Volkswagen Virtus",
    verified: true,
  },
  {
    id: "init_9",
    stars: 5,
    title: "Essential safety accessory for every car owner",
    body: "Simple to fit with the anti-theft hex lock nuts provided in the box. Now I never have to trust unreliable petrol bunk air gauges ever again.",
    name: "Kavita R.",
    date: "Purchased November 2025",
    vehicle: "Maruti Brezza",
    verified: true,
  },
];

const LOCAL_STORAGE_KEY = "treel_personal_user_reviews_v1";

function ReviewsContent() {
  const searchParams = useSearchParams();
  const isJustSubmitted = searchParams.get("submitted") === "true";

  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [serverReviews, setServerReviews] = useState<ReviewItem[]>([]);
  const [myReviewIds, setMyReviewIds] = useState<string[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleteNotification, setDeleteNotification] = useState<string | null>(null);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({
    init_1: 42,
    init_2: 29,
    init_3: 38,
    init_4: 19,
    init_5: 25,
    init_6: 31,
    init_7: 14,
    init_8: 22,
    init_9: 35,
  });
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  const fetchServerReviews = async () => {
    try {
      const res = await fetch(`/api/personal/reviews?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.reviews && Array.isArray(data.reviews)) {
          setServerReviews(data.reviews);
        }
      }
    } catch (err) {
      console.warn("Failed fetching server reviews:", err);
    }
  };

  // Fetch reviews from server on mount & sync device submission IDs
  useEffect(() => {
    fetchServerReviews();

    try {
      const storedIds = localStorage.getItem("treel_my_submitted_ids");
      if (storedIds) {
        setMyReviewIds(JSON.parse(storedIds));
      }

      // Sync legacy reviews if any were trapped in localStorage
      const legacy = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (legacy) {
        const parsed: ReviewItem[] = JSON.parse(legacy);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach((lr) => {
            fetch("/api/personal/reviews", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: lr.name,
                vehicle: lr.vehicle,
                rating: lr.stars,
                title: lr.title,
                review: lr.body,
                mediaUrl: lr.mediaUrl,
                mediaType: lr.mediaType,
              }),
            })
              .then((r) => r.json())
              .then((d) => {
                if (d?.review?.id) {
                  setMyReviewIds((prev) => {
                    const up = [...prev, d.review.id];
                    localStorage.setItem("treel_my_submitted_ids", JSON.stringify(up));
                    return up;
                  });
                  fetchServerReviews();
                }
              })
              .catch(() => null);
          });
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleDeleteReview = async (id: string) => {
    // 1. Remove from state immediately
    setServerReviews((prev) => prev.filter((r) => r.id !== id));
    setMyReviewIds((prev) => {
      const updated = prev.filter((i) => i !== id);
      try {
        localStorage.setItem("treel_my_submitted_ids", JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });

    // 2. Call backend DELETE endpoint to remove from server file reviews-store.json
    try {
      await fetch(`/api/personal/reviews?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch {
      // Ignore network errors
    }

    setConfirmDeleteId(null);
    setDeleteNotification("Your review has been successfully deleted.");
    setTimeout(() => {
      setDeleteNotification(null);
    }, 4000);
  };

  const handleVote = (id: string) => {
    if (!voted[id]) {
      setHelpfulVotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      setVoted((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleFilterChange = (chip: string) => {
    setActiveFilter(chip);
    setCurrentPage(1);
  };

  const combinedReviews: ReviewItem[] = [
    ...serverReviews.map((r) => ({
      ...r,
      isUserSubmitted: Boolean(r.id && myReviewIds.includes(r.id)),
    })),
    ...INITIAL_REVIEWS,
  ];

  const filteredReviews = combinedReviews.filter((rev) => {
    if (activeFilter === "5 stars") return rev.stars === 5;
    if (activeFilter === "4 stars") return rev.stars === 4;
    if (activeFilter === "3 stars") return rev.stars === 3;
    if (activeFilter === "Verified purchase") return rev.verified;
    return true;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filterChips = [
    "All",
    "5 stars",
    "4 stars",
    "3 stars",
    "Verified purchase",
    "Most helpful",
    "Most recent",
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Newly Submitted Success Banner */}
      {isJustSubmitted && (
        <div className="bg-green-600 text-white px-6 py-3.5 text-center text-sm font-semibold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Thank you! Your review has been submitted and posted to the top of the reviews list below.</span>
        </div>
      )}

      {/* Review Deleted Banner */}
      {deleteNotification && (
        <div className="bg-red-600 text-white px-6 py-3.5 text-center text-sm font-semibold flex items-center justify-center gap-2 animate-in fade-in">
          <Trash2 className="w-4 h-4 shrink-0" />
          <span>{deleteNotification}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-6">
              <Breadcrumb
                variant="personal"
                items={[
                  { label: "Personal TPMS", href: "/personal" },
                  { label: "Reviews" },
                ]}
              />
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
                REVIEWS &amp; RATINGS
              </div>
              <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
                What customers say.
              </h1>
              <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium">
                Verified reviews from Personal TPMS drivers across India. Real highway and city experiences with tyre pressure and temperature safety.
              </p>
            </div>

            {/* Direct Link to Amazon-Style Review Page */}
            <div className="shrink-0">
              <Link
                href="/personal/reviews/write"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-manrope font-bold text-sm transition-all shadow-[0_4px_16px_rgba(37,99,235,0.28)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.36)] hover:-translate-y-0.5 cursor-pointer"
              >
                <PenLine className="w-4 h-4" />
                Write a Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Summary Section */}
      <section className="py-16 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Score Box */}
            <div className="lg:col-span-4 p-8 sm:p-10 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] text-center space-y-4">
              <div className="text-5xl sm:text-6xl font-extrabold text-[#111827] tracking-tight">4.8</div>
              <div className="flex items-center justify-center text-[#F59E0B] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="text-sm font-bold text-[#111827]">
                Based on 2,400+ Verified Buyers
              </div>
              <p className="text-xs text-[#6B7280]">
                98% would recommend Personal TPMS to friends &amp; family
              </p>

              {/* Direct Link to Amazon-Style Review Page */}
              <Link
                href="/personal/reviews/write"
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white hover:bg-[#2563EB] text-[#2563EB] hover:text-white border border-[#2563EB]/40 hover:border-[#2563EB] text-xs font-bold transition-all shadow-xs cursor-pointer group"
              >
                <PenLine className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                Rate &amp; Review This Product
              </Link>
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
      <section className="py-16 bg-[#F9FAFB] border-b border-black/[0.06]" id="reviews-list">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-8">
          {/* Filters & Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {filterChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleFilterChange(chip)}
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

            <Link
              href="/personal/reviews/write"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#2563EB] border border-[#2563EB]/40 hover:bg-[#2563EB] hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <PenLine className="w-3.5 h-3.5" />
              Write a Review
            </Link>
          </div>

          {/* User Submitted Alert if any added */}
          {serverReviews.length > 0 && activeFilter === "All" && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                Showing latest customer reviews posted in real time.
              </span>
              <span className="text-blue-600 font-bold">
                {serverReviews.length} new customer review{serverReviews.length > 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* Reviews Grid */}
          <div className="space-y-6">
            {paginatedReviews.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-black/[0.06] space-y-3">
                <p className="text-base font-bold text-gray-700">No reviews found matching this filter.</p>
                <button
                  onClick={() => setActiveFilter("All")}
                  className="text-sm font-semibold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Clear filter and view all reviews
                </button>
              </div>
            ) : (
              paginatedReviews.map((rev, idx) => {
                const reviewId = rev.id || `idx_${(currentPage - 1) * itemsPerPage + idx}`;
                return (
                  <div
                    key={reviewId}
                    className={`p-8 sm:p-10 rounded-3xl bg-white border shadow-sm space-y-4 transition-all ${
                      rev.isUserSubmitted
                        ? "border-[#2563EB]/50 ring-2 ring-[#2563EB]/10"
                        : "border-black/[0.06] hover:border-[#2563EB]/30"
                    }`}
                  >
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
                        {rev.isUserSubmitted && (
                          <span className="text-[11px] font-bold text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/20 px-2.5 py-0.5 rounded-full">
                            Your Review
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#6B7280] font-medium">{rev.date}</span>
                        {rev.isUserSubmitted && (
                          confirmDeleteId === reviewId ? (
                            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg text-xs">
                              <span className="text-red-700 font-semibold text-[11px]">Delete?</span>
                              <button
                                onClick={() => handleDeleteReview(reviewId)}
                                className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-[11px] cursor-pointer"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-1.5 py-0.5 text-gray-600 hover:text-gray-900 font-medium text-[11px] cursor-pointer"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(reviewId)}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/80 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                              title="Delete this review"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#111827]">&ldquo;{rev.title}&rdquo;</h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed">{rev.body}</p>

                    {rev.mediaUrl && (
                      <div className="pt-2">
                        {rev.mediaType === "video" ? (
                          <video
                            src={rev.mediaUrl}
                            controls
                            className="max-h-60 rounded-xl border border-gray-200"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={rev.mediaUrl}
                            alt="Customer review photo"
                            className="max-h-48 rounded-xl border border-gray-200 object-cover"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-black/[0.06]">
                      <div className="text-xs font-bold text-[#111827]">
                        {rev.name} · <span className="font-normal text-[#6B7280]">{rev.vehicle}</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                        <span>Was this review helpful?</span>
                        <button
                          onClick={() => handleVote(reviewId)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-bold transition-colors cursor-pointer ${
                            voted[reviewId]
                              ? "bg-[#2563EB]/10 border-[#2563EB]/20 text-[#2563EB]"
                              : "border-black/[0.08] text-[#4B5563] hover:bg-[#F3F4F6]"
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{helpfulVotes[reviewId] || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 h-10 rounded-full bg-white border border-black/[0.08] text-[#4B5563] font-bold text-xs hover:bg-[#F3F4F6] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full font-bold text-xs transition-all cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-white border border-black/[0.08] text-[#4B5563] hover:bg-[#F3F4F6]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-5 h-10 rounded-full bg-white border border-black/[0.08] text-[#4B5563] font-bold text-xs hover:bg-[#F3F4F6] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next →
              </button>
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

export default function PersonalReviewsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ReviewsContent />
    </Suspense>
  );
}
