"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Play, 
  Clock, 
  ArrowRight, 
  Tv, 
  Globe, 
  CheckCircle2, 
  Filter,
  ExternalLink,
  HelpCircle,
  Video
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface VideoItem {
  id: string;
  title: string;
  category: "Installation" | "Testimonials" | "Product overview" | "How-to guides";
  duration: string;
  language: string;
  views?: string;
  description: string;
  featured?: boolean;
}

const videoData: VideoItem[] = [
  // Installation
  {
    id: "install-15min",
    title: "15-minute Installation Guide — Hindi mein",
    category: "Installation",
    duration: "14:48",
    language: "Hindi",
    views: "12.4k views",
    description: "Cabin display mounting, sensor pairing, aur pressure calibration 3 simple steps mein complete karein.",
    featured: true
  },
  {
    id: "install-puncture-shop",
    title: "Puncture Shop Par Suraksha Kaise Fit Karein",
    category: "Installation",
    duration: "8:30",
    language: "Hindi",
    views: "8.1k views",
    description: "Highway puncture shop mechanics ke liye practical step-by-step fitment aur sensor nut tightening demonstration."
  },
  {
    id: "install-first-setup",
    title: "First-Time Setup Guide — Cabin Display + 4 Sensors",
    category: "Installation",
    duration: "6:15",
    language: "Hindi",
    views: "5.7k views",
    description: "Unboxing aur initial system connection setup guide for owner-drivers aur light commercial vehicles."
  },

  // Testimonials
  {
    id: "test-narender",
    title: "Narender Kirar ki Highway Story",
    category: "Testimonials",
    duration: "3:20",
    language: "Hindi",
    views: "18.9k views",
    description: "Pune-Mumbai expressway ghats par slow leak warning aane par roadside blowout se bachne ka real ground experience.",
    featured: true
  },
  {
    id: "test-regional-stories",
    title: "10 Regional Driver Stories",
    category: "Testimonials",
    duration: "12:40",
    language: "Hindi / Regional",
    views: "9.2k views",
    description: "North, West, aur South Indian transport corridors ke multiple truck drivers ka collective feedback."
  },

  // Product overview
  {
    id: "prod-60sec",
    title: "Suraksha 60-Second Introduction — Hindi",
    category: "Product overview",
    duration: "1:00",
    language: "Hindi",
    views: "24.5k views",
    description: "Suraksha kit hardware architecture, tyre temperature telemetry, aur 3-year sensor warranty in one minute.",
    featured: true
  },
  {
    id: "prod-kit-walkthrough",
    title: "Kit Contents Walkthrough",
    category: "Product overview",
    duration: "4:15",
    language: "Hindi",
    views: "6.8k views",
    description: "In-cab display, wireless wheel sensors, anti-theft hex lock nuts, aur wiring accessories ka full physical walkthrough."
  },
  {
    id: "prod-display-tour",
    title: "Display Screen Ka Tour",
    category: "Product overview",
    duration: "5:00",
    language: "Hindi",
    views: "7.3k views",
    description: "High-pressure, slow leak, overheating temperature indicators aur battery level symbol reading ka guide."
  },

  // How-to guides
  {
    id: "howto-battery",
    title: "Battery Kab Replace Karni Hai — Warning Signs",
    category: "How-to guides",
    duration: "3:45",
    language: "Hindi",
    views: "4.9k views",
    description: "Low-voltage indicator flashing pattern samajhiye aur 3-year engineered battery lifespan ke details jaaniye."
  },
  {
    id: "howto-alerts",
    title: "Alert Kaise Read Karein",
    category: "How-to guides",
    duration: "4:10",
    language: "Hindi",
    views: "11.2k views",
    description: "Flashing red light, high-tone audible buzzer alert aur yellow cautionary indicator ka practical difference."
  },
  {
    id: "howto-rotation",
    title: "Tyre Rotation Ke Baad Kya Karein",
    category: "How-to guides",
    duration: "5:30",
    language: "Hindi",
    views: "5.4k views",
    description: "Truck axle tyres rotate ya swap karte waqt display monitor par sensor positions re-assign karne ka tareeka."
  }
];

const categories = ["All", "Installation", "Testimonials", "Product overview", "How-to guides"] as const;

export default function SurakshaVideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === "All") return videoData;
    return videoData.filter((v) => v.category === selectedCategory);
  }, [selectedCategory]);

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
                { label: "Videos" },
              ]}
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <Video className="w-3.5 h-3.5" />
              VIDEOS
            </div>

            <h1 className="font-anton uppercase tracking-normal text-5xl sm:text-6xl lg:text-7xl text-[#451A03] leading-[0.95]">
              DEKHIYE. <span className="italic text-[#DC2626]">SAMJHIYE.</span>
            </h1>

            <p className="text-[#DC2626] font-rubik text-xl sm:text-2xl font-bold">
              Watch and understand.
            </p>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha ke baare mein sab kuch — installation, testimonials, product overview, how-to guides. Videos Hindi aur regional languages mein.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <section className="py-8 border-b-2 border-[#451A03]/10 bg-[#FEF3C7] sticky top-20 z-30 shadow-sm backdrop-blur-md bg-[#FEF3C7]/95">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#78350F]">
            <Filter className="w-3.5 h-3.5 text-[#DC2626]" />
            Filter Videos ({filteredVideos.length})
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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

      {/* 3. VIDEO GRID */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="max-w-3xl">
            <h2 className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-[#451A03]">
              ALL SURAKSHA VIDEOS
            </h2>
            <p className="text-[#78350F] text-base sm:text-lg mt-2 font-medium">
              Step-by-step guidance designed specifically for drivers, mechanics, and fleet owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((item) => (
              <div
                key={item.id}
                className="bg-[#FEF3C7] border-2 border-[#451A03]/15 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#DC2626] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video bg-[#1C120C] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#120804] via-[#2A1208] to-[#451A03] opacity-90" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.25)_0,transparent_75%)]" />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setActiveVideo(item)}
                      className="relative z-10 w-14 h-14 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#EF4444] transition-all cursor-pointer"
                      aria-label={`Watch ${item.title}`}
                    >
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </button>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-[4px] bg-black/85 text-white font-mono text-[11px] font-bold flex items-center gap-1 z-10">
                      <Clock className="w-3 h-3 text-[#EA580C]" />
                      {item.duration}
                    </div>

                    {/* Badges Top Left */}
                    <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#451A03] text-[#FEF3C7] text-[10px] font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#0891B2] text-white text-[10px] font-bold tracking-wider">
                        {item.language}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#78350F] font-semibold">
                      <span>{item.views || "HD Video"}</span>
                      <span className="font-mono text-[11px]">{item.language} Audio</span>
                    </div>

                    <h3 className="font-anton text-2xl uppercase tracking-normal text-[#451A03] group-hover:text-[#DC2626] transition-colors leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-[#78350F] text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 py-4 bg-[#FFFBEB] border-t border-[#451A03]/10 flex items-center justify-between">
                  <button
                    onClick={() => setActiveVideo(item)}
                    className="font-rubik font-bold text-xs uppercase tracking-wider text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1 cursor-pointer"
                  >
                    Watch video <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono text-[#78350F]">
                    {item.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. YOUTUBE CHANNEL SECTION */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-600/10 border-2 border-red-600 flex items-center justify-center text-red-600 shrink-0">
                <svg className="w-9 h-9 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-normal text-[#451A03]">
                  YOUTUBE CHANNEL
                </h3>
                <p className="text-[#78350F] text-base font-medium">
                  Aur bhi videos ke liye YouTube pe subscribe kariye.
                </p>
              </div>
            </div>

            <a
              href="https://www.youtube.com/@jktreel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-all shadow-md shrink-0 active:scale-[0.98]"
            >
              Subscribe on YouTube <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. CTA BAND */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton text-5xl sm:text-6xl font-normal tracking-tight text-[#FEF3C7] uppercase">
              DEKH LIYA? AB SURAKSHA LAGAO.
            </h2>

            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
              Nearest Truck Wheels centre visit kariye ya direct WhatsApp par kit order karein.
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

      {/* INTERACTIVE VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#1C120C] border-2 border-[#DC2626] rounded-xl max-w-2xl w-full p-6 text-white space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider">
                  {activeVideo.category} · {activeVideo.language}
                </span>
                <h3 className="font-anton text-2xl uppercase tracking-normal text-white">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-2.5 py-1 text-xs bg-white/10 hover:bg-white/20 rounded font-mono font-bold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="aspect-video bg-black/70 rounded-lg flex flex-col items-center justify-center p-8 text-center space-y-4 border border-white/10">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/20 border-2 border-[#DC2626] flex items-center justify-center text-[#DC2626]">
                <Play className="w-8 h-8 ml-1 fill-current" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg text-white">Video Showcase Player</p>
                <p className="text-xs text-stone-300 max-w-md">
                  {activeVideo.description}
                </p>
                <p className="text-[11px] text-amber-400 font-mono pt-1">
                  Duration: {activeVideo.duration} · Audio: {activeVideo.language}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href="/suraksha/centres"
                onClick={() => setActiveVideo(null)}
                className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1"
              >
                Find Installation Centre →
              </Link>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded cursor-pointer"
              >
                Back to videos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}