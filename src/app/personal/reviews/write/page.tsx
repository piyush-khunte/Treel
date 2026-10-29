"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Camera,
  CheckCircle2,
  ChevronRight,
  Edit2,
  Loader2,
  Star,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const RATING_LABELS: Record<number, string> = {
  1: "Poor — Did not meet expectations",
  2: "Fair — Below expectations",
  3: "Average — Acceptable",
  4: "Good — Liked it",
  5: "Great — Loved it! Life-saving safety",
};

const USER_NAME_KEY = "treel_review_user_name_v1";

export default function WriteReviewPage() {
  const router = useRouter();

  // User Profile
  const [userName, setUserName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(USER_NAME_KEY);
      if (saved) {
        setUserName(saved);
        setTempName(saved);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Form State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewBody, setReviewBody] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNameSave = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      try {
        localStorage.setItem(USER_NAME_KEY, tempName.trim());
      } catch {
        // Ignore storage errors
      }
    }
    setIsEditingName(false);
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    setMediaType(isVideo ? "video" : "image");

    // Local instant preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setMediaPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server storage (public/uploads/reviews/ and Supabase if connected)
    setIsUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/personal/reviews/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setMediaUrl(data.url);
        }
      }
    } catch (uploadErr) {
      console.warn("Server upload warning, keeping local preview:", uploadErr);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!userName.trim()) {
      setFormError("Please enter your public name.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (rating === 0) {
      setFormError("Please select a star rating.");
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    if (!reviewTitle.trim()) {
      setFormError("Please enter a headline/title for your review.");
      return;
    }

    if (!reviewBody.trim()) {
      setFormError("Please write your review in the 'Write a review' box.");
      return;
    }

    setSubmitting(true);

    const newReview = {
      id: `usr_${Date.now()}`,
      stars: rating,
      title: reviewTitle.trim(),
      body: reviewBody.trim(),
      name: userName.trim(),
      date: "Just now",
      vehicle: vehicle.trim() || "Personal Vehicle",
      mediaUrl: mediaUrl || mediaPreview,
      mediaType,
      verified: true,
      isUserSubmitted: true,
    };

    try {
      // 1. Post to backend API (saves to server reviews-store.json for all devices)
      const res = await fetch("/api/personal/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newReview.name,
          vehicle: newReview.vehicle,
          rating: newReview.stars,
          title: newReview.title,
          review: newReview.body,
          mediaUrl: newReview.mediaUrl,
          mediaType: newReview.mediaType,
        }),
      });

      const data = await res.json().catch(() => null);
      const serverSavedId = data?.review?.id || newReview.id;

      // 2. Track this device's submitted review ID so only this user can delete it
      try {
        const myIds = JSON.parse(localStorage.getItem("treel_my_submitted_ids") || "[]");
        if (serverSavedId && !myIds.includes(serverSavedId)) {
          myIds.push(serverSavedId);
          localStorage.setItem("treel_my_submitted_ids", JSON.stringify(myIds));
        }
      } catch {
        // Ignore storage errors
      }

      setSubmitted(true);
      setTimeout(() => {
        router.push("/personal/reviews?submitted=true");
      }, 1200);
    } catch {
      setFormError("Failed to submit review. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#0F1111] font-sans antialiased">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <Breadcrumb
            variant="personal"
            items={[
              { label: "Personal TPMS", href: "/personal" },
              { label: "Reviews", href: "/personal/reviews" },
              { label: "Review Your Purchases" },
            ]}
          />
        </div>
      </div>

      {/* User Public Profile Bar (Amazon Style Cyan/Blue Bar) */}
      <div className="bg-[#E7F4F8] border-b border-[#D5EBF2] py-3.5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center shrink-0">
              <User className="w-6 h-6" />
            </div>

            {isEditingName || !userName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName || userName}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTempName(val);
                    setUserName(val);
                    try {
                      localStorage.setItem(USER_NAME_KEY, val);
                    } catch {
                      // Ignore storage errors
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNameSave();
                    }
                  }}
                  placeholder="Enter your public name (e.g. Rahul S.)"
                  className="px-3 py-1 text-sm border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#007185] w-56 sm:w-64"
                />
                {userName && isEditingName && (
                  <button
                    type="button"
                    onClick={handleNameSave}
                    className="px-3 py-1 text-xs font-bold bg-[#FFD814] hover:bg-[#F7CA00] rounded border border-[#FCD200] cursor-pointer"
                  >
                    Done
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <span className="font-semibold text-gray-900">{userName}</span>
                <button
                  type="button"
                  onClick={() => {
                    setTempName(userName);
                    setIsEditingName(true);
                  }}
                  className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit public name
                </button>
              </div>
            )}
          </div>

          <Link
            href="/personal/reviews"
            className="text-xs sm:text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
          >
            Back to all reviews
          </Link>
        </div>
      </div>

      {/* Main Form Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {submitted ? (
          <div className="p-10 rounded-2xl border border-green-200 bg-green-50 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Review Submitted!
            </h2>
            <p className="text-sm text-gray-700 max-w-md mx-auto">
              Thank you, <span className="font-semibold">{userName}</span>! Your review and rating have been posted. Redirecting back to reviews...
            </p>
            <div className="pt-2">
              <Link
                href="/personal/reviews?submitted=true"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-sm font-semibold text-gray-900"
              >
                View on Reviews Page <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            {formError && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-300 text-red-800 text-sm font-medium">
                {formError}
              </div>
            )}

            {/* Product Header Row */}
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded border border-gray-200 p-1 flex items-center justify-center bg-gray-50">
                <Image
                  src="/images/treel-logo-final.webp"
                  alt="Treel TPMS Kit"
                  width={80}
                  height={80}
                  unoptimized
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-bold text-[#0F1111]">
                  How was the item?
                </h1>
                <p className="text-sm text-gray-700 leading-snug">
                  Treel Personal TPMS — Smart Tyre Pressure &amp; Temperature Monitoring System (Car Kit - 4 BLE Sensors, Real-time Bluetooth App Alerts)
                </p>
              </div>
            </div>

            {/* Big Star Rating Selector */}
            <div className="pt-1">
              <div className="flex items-center gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isFilled = (hoverRating || rating) >= starValue;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(starValue)}
                      className="cursor-pointer focus:outline-none p-0.5 hover:scale-105 transition-transform"
                      aria-label={`${starValue} star`}
                    >
                      <Star
                        className={`w-9 h-9 sm:w-11 sm:h-11 transition-colors ${
                          isFilled
                            ? "fill-[#FFA41C] text-[#FFA41C] stroke-[#DE7921]"
                            : "fill-transparent text-transparent stroke-[#DE7921] stroke-[1.4]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 text-sm text-[#007185] font-semibold min-h-[20px]">
                {RATING_LABELS[hoverRating || rating] || "Click stars to set rating"}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Write a Review Block */}
            <div className="space-y-2">
              <label
                htmlFor="reviewBody"
                className="block text-base font-bold text-[#0F1111]"
              >
                Write a review
              </label>
              <textarea
                id="reviewBody"
                required
                rows={5}
                value={reviewBody}
                onChange={(e) => setReviewBody(e.target.value)}
                placeholder="What should other customers know?"
                className="w-full p-3.5 rounded-lg border border-gray-400 text-sm text-[#0F1111] placeholder:text-gray-500 focus:outline-none focus:border-[#007185] focus:ring-1 focus:ring-[#007185] transition-all"
              />
            </div>

            <hr className="border-gray-200" />

            {/* Share a Video or Photo Block */}
            <div className="space-y-2">
              <label className="block text-base font-bold text-[#0F1111]">
                Share a video or photo
              </label>

              {isUploadingMedia ? (
                <div className="border border-dashed border-gray-300 rounded-lg p-7 text-center bg-[#F7FAFA] flex items-center justify-center gap-3">
                  <Loader2 className="w-5 h-5 text-[#007185] animate-spin" />
                  <span className="text-sm text-gray-700 font-medium">Uploading media to server...</span>
                </div>
              ) : mediaPreview ? (
                <div className="relative inline-block border border-gray-300 rounded-lg p-2 bg-gray-50">
                  {mediaType === "video" ? (
                    <video
                      src={mediaPreview}
                      controls
                      className="h-44 w-auto rounded object-contain max-w-full bg-black"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mediaPreview}
                      alt="Upload preview"
                      className="h-32 w-auto object-contain rounded"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPreview(null);
                      setMediaUrl(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 cursor-pointer"
                    aria-label="Remove uploaded media"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="block border border-dashed border-gray-300 rounded-lg p-7 text-center bg-[#F7FAFA] hover:bg-[#EDF6F7] cursor-pointer transition-colors">
                  <input
                    type="file"
                    accept="image/*,video/mp4,video/webm"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <div className="relative">
                      <Camera className="w-8 h-8 text-gray-500" />
                      <span className="absolute -top-1 -right-1 text-xs font-bold text-gray-700">
                        +
                      </span>
                    </div>
                    <span className="text-xs text-gray-600">
                      Your video could be the first. Imagine that...
                    </span>
                  </div>
                </label>
              )}
            </div>

            <hr className="border-gray-200" />

            {/* Public Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="userNameInput"
                className="block text-base font-bold text-[#0F1111]"
              >
                Your public name <span className="text-red-500">*</span>
              </label>
              <input
                id="userNameInput"
                type="text"
                required
                value={userName}
                onChange={(e) => {
                  const val = e.target.value;
                  setUserName(val);
                  setTempName(val);
                  try {
                    localStorage.setItem(USER_NAME_KEY, val);
                  } catch {
                    // Ignore storage errors
                  }
                }}
                placeholder="Enter your name or initials (e.g. Anand Mahindra, Rahul S.)"
                className="w-full p-3 rounded-lg border border-gray-400 text-sm text-[#0F1111] placeholder:text-gray-500 focus:outline-none focus:border-[#007185] focus:ring-1 focus:ring-[#007185] transition-all"
              />
              <p className="text-xs text-gray-500">
                This name will be displayed publicly with your rating and review.
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Title Your Review (Required) */}
            <div className="space-y-2">
              <label
                htmlFor="reviewTitle"
                className="block text-base font-bold text-[#0F1111]"
              >
                Title your review (required)
              </label>
              <input
                id="reviewTitle"
                type="text"
                required
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="What's most important to know?"
                className="w-full p-3 rounded-lg border border-gray-400 text-sm text-[#0F1111] placeholder:text-gray-500 focus:outline-none focus:border-[#007185] focus:ring-1 focus:ring-[#007185] transition-all"
              />
            </div>

            <hr className="border-gray-200" />

            {/* Vehicle Model Field */}
            <div className="space-y-2">
              <label
                htmlFor="vehicle"
                className="block text-base font-bold text-[#0F1111]"
              >
                Your vehicle <span className="text-gray-500 font-normal text-sm">(optional)</span>
              </label>
              <input
                id="vehicle"
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="e.g. Mahindra XUV700, Hyundai Creta, Tata Safari, Honda City"
                className="w-full p-3 rounded-lg border border-gray-400 text-sm text-[#0F1111] placeholder:text-gray-500 focus:outline-none focus:border-[#007185] focus:ring-1 focus:ring-[#007185] transition-all"
              />
            </div>

            {/* Submit Action (Amazon Style Yellow Button on Right) */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-10 py-2.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-[#0F1111] text-sm font-semibold border border-[#FCD200] shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

