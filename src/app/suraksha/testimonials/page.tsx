"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  MessageSquare, 
  Play, 
  Truck, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  CheckCircle2,
  Filter,
  Share2,
  Sparkles,
  Info
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface TestimonialVideo {
  id: string;
  driver: string;
  route: string;
  region: "North" | "West" | "South 1" | "South 2" | "Central" | "East";
  truck: "6-wheeler" | "10-wheeler" | "12-wheeler" | "14-wheeler" | "16-wheeler" | "18-wheeler";
  storyType: "Safety stories" | "Savings stories" | "Simplicity stories";
  quote: string;
  watchTime: string;
  isSample: boolean;
  accent: string;
}

const videoTestimonials: TestimonialVideo[] = [
  {
    id: "narender-k",
    driver: "Narender K.",
    route: "Pune – Mumbai Expressway",
    region: "North",
    truck: "14-wheeler",
    storyType: "Safety stories",
    quote: "Highway drive from Pune to Mumbai, mujhe slow leak warning aayi front-right tyre par. Warning aate hi maine dhaba pe truck roki aur check kiya — slow nail puncture tha. Agar Suraksha nahi hota, toh ghat section mein front tyre blowout ho sakta tha.",
    watchTime: "2:40 min",
    isSample: false,
    accent: "#DC2626"
  },
  {
    id: "rajiv-t",
    driver: "Rajiv T.",
    route: "Delhi – Jaipur Corridor",
    region: "North",
    truck: "10-wheeler",
    storyType: "Simplicity stories",
    quote: "Amazing gadget, easy to install even for someone like me. Mujhe laga tha tech complex hoga, par display auto-detect kar leta hai sensors. Daylight mein screen saaf dikhta hai bina distraction ke.",
    watchTime: "1:55 min",
    isSample: false,
    accent: "#EA580C"
  },
  {
    id: "dinanath-k",
    driver: "Dinanath K.",
    route: "Ahmedabad – Surat Route",
    region: "West",
    truck: "12-wheeler",
    storyType: "Savings stories",
    quote: "Customer support really cares. Family ki peace of mind ke liye best investment hai. Har mahine diesel mein ₹2,500-₹3,000 ki bachat ho rahi hai kyunki tyres hamesha right pressure par chalte hai.",
    watchTime: "3:15 min",
    isSample: false,
    accent: "#0891B2"
  },
  {
    id: "sample-balwinder",
    driver: "Balwinder S.",
    route: "Ambala – Panipat Line",
    region: "North",
    truck: "16-wheeler",
    storyType: "Safety stories",
    quote: "Night haul driving ke dauraan cabin audio buzzer ne thermal heat spike alert diya. Dual-tyre overheating se roadside breakdown bach gaya.",
    watchTime: "2:10 min",
    isSample: true,
    accent: "#DC2626"
  },
  {
    id: "sample-venkat",
    driver: "Venkat R.",
    route: "Bengaluru – Hosur Transit",
    region: "South 1",
    truck: "10-wheeler",
    storyType: "Savings stories",
    quote: "Tyre life lagbhag 25,000 km extend hui hai. Uneven wear completely stop ho gaya jabse regular real-time pressure monitor ho raha hai.",
    watchTime: "2:30 min",
    isSample: true,
    accent: "#0891B2"
  },
  {
    id: "sample-mahesh",
    driver: "Mahesh P.",
    route: "Indore – Bhopal Highway",
    region: "Central",
    truck: "6-wheeler",
    storyType: "Simplicity stories",
    quote: "Local puncture shop mechanic ne 15 minute mein sensors fit kar diye. Zero wire splicing, straight plug-and-play operation.",
    watchTime: "1:45 min",
    isSample: true,
    accent: "#EA580C"
  },
  {
    id: "sample-subhas",
    driver: "Subhas M.",
    route: "Kolkata – Durgapur Belt",
    region: "East",
    truck: "18-wheeler",
    storyType: "Safety stories",
    quote: "Monsoon heavy rainfall ke dauraan tyre pressure variations immediately detect ho gaye. Wet highways par continuous confidence rehta hai.",
    watchTime: "3:05 min",
    isSample: true,
    accent: "#DC2626"
  },
  {
    id: "sample-shankar",
    driver: "Shankar N.",
    route: "Coimbatore – Kochi Sector",
    region: "South 2",
    truck: "12-wheeler",
    storyType: "Savings stories",
    quote: "9 mahine mein kit cost completely recover ho gaya sirf diesel savings aur roadside downtime avoidance se.",
    watchTime: "2:50 min",
    isSample: true,
    accent: "#0891B2"
  }
];

const writtenReviews = [
  {
    name: "Harpreet Singh",
    region: "North (Punjab)",
    truck: "10-wheeler Owner-Driver",
    date: "October 2026",
    rating: 5,
    isSample: false,
    text: "Display ka auto-brightness night driving mein aankhon par bilkul strain nahi deta. Highway transport ke liye sabse useful commercial device hai."
  },
  {
    name: "Ganesh Patil",
    region: "West (Maharashtra)",
    truck: "14-wheeler Commercial Fleet",
    date: "September 2026",
    rating: 5,
    isSample: false,
    text: "WhatsApp helpline se turant Marathi mein clear response mila jab fitment ke dauraan ek sensor verify karna tha. Brilliant customer care."
  },
  {
    name: "Sample Transport Operator",
    region: "Central Region",
    truck: "12-wheeler Heavy Haul",
    date: "Demo Review Format",
    rating: 5,
    isSample: true,
    text: "Rugged sensor build quality Indian national and state highway bumps aur potholes ke liye robust hai. Sensor seal ekdum leakproof hai."
  },
  {
    name: "Sample Highway Driver",
    region: "South Corridor",
    truck: "6-wheeler Medium Transit",
    date: "Demo Review Format",
    rating: 5,
    isSample: true,
    text: "Cabin alert sound loud hai par disturbing nahi. Low pressure drop par alert turant mil jata hai."
  }
];

const regions = ["All", "North", "West", "South 1", "South 2", "Central", "East"] as const;
const truckTypes = ["All", "6-wheeler", "10-wheeler", "12-wheeler", "14-wheeler", "16-wheeler", "18-wheeler"] as const;
const storyTypes = ["All", "Safety stories", "Savings stories", "Simplicity stories"] as const;

export default function SurakshaTestimonialsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedTruck, setSelectedTruck] = useState<string>("All");
  const [selectedStoryType, setSelectedStoryType] = useState<string>("All");
  const [activeModalVideo, setActiveModalVideo] = useState<TestimonialVideo | null>(null);

  const filteredVideos = useMemo(() => {
    return videoTestimonials.filter((item) => {
      const matchRegion = selectedRegion === "All" || item.region === selectedRegion;
      const matchTruck = selectedTruck === "All" || item.truck === selectedTruck;
      const matchStory = selectedStoryType === "All" || item.storyType === selectedStoryType;
      return matchRegion && matchTruck && matchStory;
    });
  }, [selectedRegion, selectedTruck, selectedStoryType]);

  const resetFilters = () => {
    setSelectedRegion("All");
    setSelectedTruck("All");
    setSelectedStoryType("All");
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
                { label: "Testimonials" },
              ]}
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              TESTIMONIALS
            </div>

            <h1 className="font-anton uppercase tracking-normal text-5xl sm:text-6xl lg:text-7xl text-[#451A03] leading-[0.95]">
              DRIVERS KYA <span className="italic text-[#DC2626]">KEHTE HAI.</span>
            </h1>

            <p className="text-[#DC2626] font-rubik text-xl sm:text-2xl font-bold">
              What drivers actually say.
            </p>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha use karne wale drivers ki real stories. Har cluster se, har truck type se, har region se.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FILTER CONTROLS */}
      <section className="py-8 sm:py-10 border-b-2 border-[#451A03]/10 bg-[#FEF3C7] sticky top-20 z-30 shadow-sm backdrop-blur-md bg-[#FEF3C7]/95">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#78350F]">
              <Filter className="w-3.5 h-3.5 text-[#DC2626]" />
              Filter Testimonials ({filteredVideos.length} stories)
            </div>
            {(selectedRegion !== "All" || selectedTruck !== "All" || selectedStoryType !== "All") && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-[#DC2626] hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* Region Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#78350F]">
                Region:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {regions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-[4px] border transition-all cursor-pointer ${
                      selectedRegion === r
                        ? "bg-[#DC2626] text-white border-[#DC2626] shadow-xs"
                        : "bg-[#FFFBEB] text-[#451A03] border-[#451A03]/20 hover:border-[#DC2626]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Truck Type Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#78350F]">
                Truck Configuration:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {truckTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTruck(t)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-[4px] border transition-all cursor-pointer ${
                      selectedTruck === t
                        ? "bg-[#451A03] text-white border-[#451A03] shadow-xs"
                        : "bg-[#FFFBEB] text-[#451A03] border-[#451A03]/20 hover:border-[#451A03]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Story Type Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#78350F]">
                Story Theme:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {storyTypes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStoryType(s)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-[4px] border transition-all cursor-pointer ${
                      selectedStoryType === s
                        ? "bg-[#EA580C] text-white border-[#EA580C] shadow-xs"
                        : "bg-[#FFFBEB] text-[#451A03] border-[#451A03]/20 hover:border-[#EA580C]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VIDEO TESTIMONIAL GRID */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-[#451A03]">
              VIDEO TESTIMONIALS
            </h2>
            <p className="text-[#78350F] text-base sm:text-lg mt-2 font-medium">
              Ground reality from highway corridors across India. Listen directly to owner-drivers.
            </p>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="p-12 text-center bg-[#FEF3C7] border-2 border-dashed border-[#451A03]/20 rounded-xl space-y-4">
              <Truck className="w-10 h-10 text-[#78350F] mx-auto opacity-50" />
              <p className="text-[#451A03] font-bold text-lg">No testimonials found for selected filters.</p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#DC2626] text-white rounded-[4px] font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FEF3C7] border-2 border-[#451A03]/15 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#DC2626] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Video Thumbnail Placeholder with Play Overlay */}
                    <div className="relative aspect-video bg-[#1C120C] flex items-center justify-center overflow-hidden">
                      {/* Background Visual Texture */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#1A0B05] via-[#2D160C] to-[#451A03] opacity-90" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.25)_0,transparent_70%)]" />

                      {/* Play Button Overlay */}
                      <button
                        onClick={() => setActiveModalVideo(item)}
                        className="relative z-10 w-14 h-14 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#EF4444] transition-all cursor-pointer"
                        aria-label={`Play testimonial from ${item.driver}`}
                      >
                        <Play className="w-6 h-6 ml-0.5 fill-current" />
                      </button>

                      {/* Watch Time Badge */}
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-[4px] bg-black/80 text-white font-mono text-[11px] font-bold flex items-center gap-1 z-10">
                        <Clock className="w-3 h-3 text-[#DC2626]" />
                        {item.watchTime}
                      </div>

                      {/* Status / Tag Badge */}
                      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#DC2626] text-[#FEF3C7] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          {item.storyType}
                        </span>
                        {item.isSample && (
                          <span className="px-2 py-0.5 rounded-[4px] bg-amber-500/90 text-white text-[10px] font-bold tracking-wider">
                            Sample story
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#451A03]/10 pb-3">
                        <div>
                          <h3 className="font-anton text-2xl uppercase tracking-normal text-[#451A03]">
                            {item.driver}
                          </h3>
                          <div className="text-xs font-semibold text-[#78350F] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#DC2626]" /> {item.route}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="inline-block px-2 py-1 rounded bg-[#FFFBEB] border border-[#451A03]/15 text-[11px] font-bold text-[#451A03]">
                            {item.truck}
                          </span>
                          <div className="text-[10px] text-[#78350F] font-bold mt-1 uppercase tracking-wider">
                            {item.region}
                          </div>
                        </div>
                      </div>

                      <p className="text-[#451A03] text-sm leading-relaxed italic line-clamp-4">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="px-6 py-4 bg-[#FFFBEB] border-t border-[#451A03]/10 flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalVideo(item)}
                      className="font-rubik font-bold text-xs uppercase tracking-wider text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1 cursor-pointer"
                    >
                      Watch full story <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-[#78350F] font-medium">
                      {item.isSample ? "Demo story card" : "Verified Driver"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. WRITTEN REVIEWS SUPPLEMENT */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="max-w-3xl">
            <h2 className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-[#451A03]">
              REVIEWS FROM DRIVERS WHO PREFER TO WRITE
            </h2>
            <p className="text-[#78350F] text-base sm:text-lg mt-2 font-medium">
              Operational feedback and written reviews from truck operators across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {writtenReviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-xl p-6 sm:p-8 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="font-anton text-xl uppercase text-[#451A03]">
                      {rev.name}
                    </div>
                    <div className="text-xs text-[#78350F] font-medium">
                      {rev.truck} · {rev.region}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-[#78350F] font-bold">
                      {rev.date}
                    </span>
                    {rev.isSample && (
                      <div className="mt-1 inline-block px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded text-[10px] font-bold uppercase">
                        Sample review layout
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-[#451A03] text-sm leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-[#FFFBEB] border border-[#451A03]/15 text-xs text-[#78350F] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#EA580C] shrink-0" />
            <span>
              <strong>Note:</strong> Additional client-verified driver stories will replace sample layout entries as regional fleet interviews conclude.
            </span>
          </div>
        </div>
      </section>

      {/* 5. SUBMIT YOUR STORY SECTION */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="bg-[#FEF3C7] border-3 border-[#DC2626] rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto space-y-6 shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <Share2 className="w-3.5 h-3.5" />
              COMMUNITY VOICES
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-[#451A03]">
              APNI STORY SHARE KIJIYE
            </h2>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-medium">
              Aap Suraksha use kar rahe hai aur experience share karna chahte hai? WhatsApp par video ya written testimonial bhejiye. Selected stories site pe feature ki jayegi.
            </p>

            <div className="pt-2">
              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[4px] font-rubik font-bold text-sm uppercase tracking-wider bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-md active:scale-[0.98]"
              >
                Share via WhatsApp <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BAND */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton text-5xl sm:text-6xl font-normal tracking-tight text-[#FEF3C7] uppercase">
              AAP BHI EK STORY BAN JAAO.
            </h2>

            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
              Suraksha kit lagao, highway blowouts se bacho aur har mahine fuel aur tyre cost save karo.
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

      {/* VIDEO MODAL (Interactive Preview) */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#1C120C] border-2 border-[#DC2626] rounded-xl max-w-2xl w-full p-6 text-white space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider">
                  Driver Testimonial · {activeModalVideo.truck}
                </span>
                <h3 className="font-anton text-2xl uppercase tracking-normal text-white">
                  {activeModalVideo.driver} &mdash; {activeModalVideo.route}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="px-2.5 py-1 text-xs bg-white/10 hover:bg-white/20 rounded font-mono font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="aspect-video bg-black/60 rounded-lg flex flex-col items-center justify-center p-8 text-center space-y-4 border border-white/10">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/20 border-2 border-[#DC2626] flex items-center justify-center text-[#DC2626]">
                <Play className="w-8 h-8 ml-1 fill-current" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg text-white">Video Player Showcase</p>
                <p className="text-xs text-stone-300 max-w-md">
                  {activeModalVideo.isSample
                    ? "Sample driver story card ready for client video footage asset insertion."
                    : `Verified story recorded in ${activeModalVideo.region} cluster. Duration: ${activeModalVideo.watchTime}.`}
                </p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm italic text-stone-200">
                &ldquo;{activeModalVideo.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href="/suraksha/centres"
                onClick={() => setActiveModalVideo(null)}
                className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1"
              >
                Install Suraksha at Nearest Centre →
              </Link>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded cursor-pointer"
              >
                Back to stories
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}