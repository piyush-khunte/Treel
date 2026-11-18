"use client";

import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WhatsAppCircularIcon } from "@/components/ui/whatsapp-circular-icon";
import {
ArrowRight,
ExternalLink,
Filter,
Video
} from "lucide-react";
import Link from "next/link";
import { useMemo,useState } from "react";

interface VideoItem {
  id: string;
  title: string;
  category: "Installation" | "Testimonials" | "Product overview" | "How-to guides";
  language: string;
  description: string;
  featured?: boolean;
}

const videoData: VideoItem[] = [
  // Installation
  {
    id: "install-15min",
    title: "15-Minute Installation Guide — In Hindi",
    category: "Installation",
    language: "Hindi",
    description: "Mount the cabin display, pair sensors, and calibrate pressure in 3 simple steps.",
    featured: true
  },
  {
    id: "install-puncture-shop",
    title: "Fitting Suraksha at a Puncture Shop",
    category: "Installation",
    language: "Hindi",
    description: "Step-by-step practical fitment and sensor locking demonstration for highway puncture shop mechanics."
  },
  {
    id: "install-first-setup",
    title: "First-Time Setup Guide — Cabin Display + 4 Sensors",
    category: "Installation",
    language: "Hindi",
    description: "Unboxing and initial system setup guide for owner-drivers and commercial vehicles."
  },

  // Testimonials
  {
    id: "test-narender",
    title: "Narender K.'s Highway Story",
    category: "Testimonials",
    language: "Hindi",
    description: "Real driver experience on how a slow leak warning on the expressway prevented a dangerous roadside blowout.",
    featured: true
  },
  {
    id: "test-regional-stories",
    title: "10 Regional Driver Stories",
    category: "Testimonials",
    language: "Hindi / Regional",
    description: "Collective feedback from commercial truck drivers across North, West, and South Indian freight corridors."
  },

  // Product overview
  {
    id: "prod-60sec",
    title: "Suraksha 60-Second Overview",
    category: "Product overview",
    language: "Hindi",
    description: "Suraksha kit hardware architecture, tyre temperature telemetry, and 3-year warranty in one minute.",
    featured: true
  },
  {
    id: "prod-kit-walkthrough",
    title: "Kit Contents Walkthrough",
    category: "Product overview",
    language: "Hindi",
    description: "Complete unboxing and walkthrough of the in-cab display, wireless sensors, anti-theft locking hardware, and wiring accessories."
  },
  {
    id: "prod-display-tour",
    title: "In-Cab Display Screen Tour",
    category: "Product overview",
    language: "Hindi",
    description: "Guide to reading high-pressure, slow leak, overheating temperature indicators and battery status symbols."
  },

  // How-to guides
  {
    id: "howto-battery",
    title: "When to Replace Sensor Batteries — Warning Signs",
    category: "How-to guides",
    language: "Hindi",
    description: "Understand low-voltage indicator flashing patterns and 5-year engineered battery lifespan details."
  },
  {
    id: "howto-alerts",
    title: "How to Read Warning Alerts",
    category: "How-to guides",
    language: "Hindi",
    description: "Understand the practical difference between flashing red alarms, high-tone audible buzzers, and yellow cautionary alerts."
  },
  {
    id: "howto-rotation",
    title: "What to Do After Tyre Rotation",
    category: "How-to guides",
    language: "Hindi",
    description: "How to reassign wheel sensor positions on the cabin display when rotating or swapping truck tyres."
  }
];

const categories = ["All", "Installation", "Testimonials", "Product overview", "How-to guides"] as const;

export default function SurakshaVideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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
              See Suraksha <span className="italic text-[#DC2626]">in action.</span>
            </h1>

            <SurakshaRotator
              page="5.21"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide"
            >
              आपकी भाषा में वीडियो।
            </SurakshaRotator>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Installation guides, product walkthroughs and real driver stories are being filmed in Hindi and regional languages. Browse what is coming below, and subscribe on YouTube to be notified when they go live.
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
              Upcoming Suraksha videos
            </h2>
            <p className="text-[#78350F] text-base sm:text-lg mt-2 font-medium">
              Upcoming step-by-step guidance designed specifically for drivers, mechanics, and fleet owners.
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

                    {/* Honest status: these videos are not published yet */}
                    <div className="relative z-10 flex flex-col items-center gap-2 text-center px-4">
                      <div className="w-14 h-14 rounded-full bg-[#DC2626]/20 border-2 border-[#DC2626]/60 text-[#FCA5A5] flex items-center justify-center">
                        <Video className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FEF3C7]">
                        Video coming soon
                      </span>
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
                      <span>In production</span>
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
                  <span className="font-rubik font-bold text-xs uppercase tracking-wider text-[#78350F]">
                    Coming soon
                  </span>
                  <a
                    href="https://youtube.com/@jktreel5290?si=IhQo4Ya53ou_Z5SD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-rubik font-bold text-xs uppercase tracking-wider text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1"
                  >
                    Visit our YouTube <ExternalLink className="w-3.5 h-3.5" />
                  </a>
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
                  YouTube channel
                </h3>
                <p className="text-[#78350F] text-base font-medium">
                  Subscribe to our YouTube channel for more product demos and guides.
                </p>
              </div>
            </div>

            <a
              href="https://youtube.com/@jktreel5290?si=IhQo4Ya53ou_Z5SD"
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
              Ready to protect your truck?
            </h2>

            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
              Visit your nearest Truck Wheels centre or order your kit directly on WhatsApp.
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