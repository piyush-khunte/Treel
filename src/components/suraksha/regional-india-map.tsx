"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Languages, 
  ArrowRight, 
  Info 
} from "lucide-react";
import { 
  INDIA_MAP_VIEWBOX, 
  INDIA_STATES_PATHS 
} from "./india-map-data";

export interface RegionalCluster {
  id: string;
  name: string;
  shortName: string;
  languages: string;
  location: string;
  reviewLanguage: string;
  sampleReview: string;
  englishTranslation: string;
  color: string;
  hoverColor: string;
  bgBadge: string;
  states: string[];
  center: { x: number; y: number };
}

export const REGIONAL_CLUSTERS: RegionalCluster[] = [
  {
    id: "north",
    name: "NORTH",
    shortName: "North",
    languages: "Hindi · English",
    location: "Delhi / North India",
    reviewLanguage: "Hindi / Hinglish",
    sampleReview: "Sample review: Suraksha se tyre ka pressure check karna bahut aasaan lagta hai. Safar par nikalne se pehle mujhe confidence milta hai.",
    englishTranslation: "Sample review: Checking tyre pressure with Suraksha feels easy. It gives me confidence before starting a trip.",
    color: "#DC2626",
    hoverColor: "#EF4444",
    bgBadge: "bg-[#DC2626]",
    states: ["jk", "la", "hp", "pb", "hr", "ch", "dl", "ut", "up", "rj"],
    center: { x: 195, y: 190 }
  },
  {
    id: "west",
    name: "WEST",
    shortName: "West",
    languages: "Marathi · Gujarati · Hindi",
    location: "Pune / Maharashtra",
    reviewLanguage: "Marathi",
    sampleReview: "नमुना अभिप्राय: सुरक्षामुळे टायरचा प्रेशर वेळेवर तपासता येतो. प्रवासाला निघताना मनात जास्त विश्वास वाटतो.",
    englishTranslation: "Sample review: Suraksha makes it easier to check tyre pressure on time and gives more confidence before a trip.",
    color: "#EA580C",
    hoverColor: "#F97316",
    bgBadge: "bg-[#EA580C]",
    states: ["gj", "mh", "ga", "dn", "dd"],
    center: { x: 145, y: 395 }
  },
  {
    id: "south1",
    name: "SOUTH 1",
    shortName: "South 1",
    languages: "Tamil · Kannada · English",
    location: "Chennai / Bengaluru",
    reviewLanguage: "Tamil",
    sampleReview: "மாதிரி கருத்து: பயணம் தொடங்கும் முன் டயர் பிரஷரை சரிபார்ப்பது மிகவும் எளிதாக உள்ளது. சுரக்ஷா நம்பிக்கையுடன் பயணம் செய்ய உதவுகிறது.",
    englishTranslation: "Sample review: Checking tyre pressure before a trip feels easy. Suraksha helps make the journey more confident.",
    color: "#0891B2",
    hoverColor: "#06B6D4",
    bgBadge: "bg-[#0891B2]",
    states: ["ka", "tn", "py", "an"],
    center: { x: 205, y: 575 }
  },
  {
    id: "south2",
    name: "SOUTH 2",
    shortName: "South 2",
    languages: "Telugu · Malayalam · English",
    location: "Hyderabad / Kochi",
    reviewLanguage: "Telugu",
    sampleReview: "నమూనా అభిప్రాయం: ప్రయాణం ప్రారంభించే ముందు టైర్ ప్రెషర్ను చెక్ చేయడం చాలా సులభంగా ఉంది. సురక్షా వల్ల మరింత నమ్మకంగా ప్రయాణించగలుగుతున్నాను.",
    englishTranslation: "Sample review: Checking tyre pressure before starting a trip feels easy. Suraksha gives more confidence while travelling.",
    color: "#0D9488",
    hoverColor: "#14B8A6",
    bgBadge: "bg-[#0D9488]",
    states: ["ap", "tg", "kl", "ld"],
    center: { x: 240, y: 475 }
  },
  {
    id: "central",
    name: "CENTRAL",
    shortName: "Central",
    languages: "Hindi · English",
    location: "Bhopal / Madhya Pradesh",
    reviewLanguage: "Hindi / Hinglish",
    sampleReview: "Sample review: Har trip se pehle tyre ka pressure dekhna ab routine ka simple part ban sakta hai. Suraksha se driver ko extra confidence milta hai.",
    englishTranslation: "Sample review: Checking tyre pressure before each trip can become a simple routine. Suraksha can give the driver extra confidence.",
    color: "#D97706",
    hoverColor: "#F59E0B",
    bgBadge: "bg-[#D97706]",
    states: ["mp", "ct"],
    center: { x: 255, y: 325 }
  },
  {
    id: "east",
    name: "EAST",
    shortName: "East",
    languages: "Hindi · Bengali · Oriya",
    location: "Kolkata / Bhubaneswar",
    reviewLanguage: "Bengali",
    sampleReview: "নমুনা মতামত: যাত্রা শুরু করার আগে টায়ারের প্রেশার পরীক্ষা করা সহজ হয়েছে। সুরক্ষা ব্যবহার করে আরও আত্মবিশ্বাসের সঙ্গে পথে বের হওয়া যায়।",
    englishTranslation: "Sample review: Checking tyre pressure before starting a journey feels easier. Suraksha helps give more confidence on the road.",
    color: "#9A3412",
    hoverColor: "#C2410C",
    bgBadge: "bg-[#9A3412]",
    states: ["br", "jh", "wb", "or", "sk", "as", "ar", "mn", "ml", "mz", "nl", "tr"],
    center: { x: 385, y: 315 }
  }
];

export default function RegionalIndiaMap() {
  const [selectedClusterId, setSelectedClusterId] = useState<string>("north");
  const [hoveredClusterId, setHoveredClusterId] = useState<string | null>(null);

  const selectedCluster = useMemo(() => {
    return (
      REGIONAL_CLUSTERS.find((c) => c.id === selectedClusterId) ||
      REGIONAL_CLUSTERS[0]
    );
  }, [selectedClusterId]);

  const stateToClusterMap = useMemo(() => {
    const map: Record<string, RegionalCluster> = {};
    REGIONAL_CLUSTERS.forEach((cluster) => {
      cluster.states.forEach((st) => {
        map[st] = cluster;
      });
    });
    return map;
  }, []);

  return (
    <div className="space-y-8">
      {/* Accessible Region Selector Tabs */}
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 select-none"
        role="tablist"
        aria-label="Select Suraksha regional cluster"
      >
        {REGIONAL_CLUSTERS.map((cluster) => {
          const isSelected = cluster.id === selectedCluster.id;
          const isHovered = cluster.id === hoveredClusterId;

          return (
            <button
              key={cluster.id}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${cluster.id}`}
              id={`tab-${cluster.id}`}
              onClick={() => setSelectedClusterId(cluster.id)}
              onMouseEnter={() => setHoveredClusterId(cluster.id)}
              onMouseLeave={() => setHoveredClusterId(null)}
              className={`px-3 py-3 rounded-lg font-rubik text-left transition-all cursor-pointer border-2 min-h-[52px] flex flex-col justify-center ${
                isSelected
                  ? "bg-[#DC2626] text-white border-[#DC2626] shadow-md scale-[1.02]"
                  : isHovered
                  ? "bg-[#FFFBEB] text-[#451A03] border-[#DC2626]/50 shadow-sm"
                  : "bg-[#FEF3C7] text-[#451A03] border-[#451A03]/15 hover:bg-[#FFFBEB]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-anton text-sm sm:text-base uppercase tracking-wide">
                  {cluster.name}
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isSelected ? "bg-white" : "border border-current"
                  }`}
                  style={{
                    backgroundColor: isSelected ? "#FFFFFF" : cluster.color
                  }}
                />
              </div>
              <span
                className={`text-[10.5px] truncate font-medium mt-0.5 ${
                  isSelected ? "text-white/85" : "text-[#78350F]"
                }`}
              >
                {cluster.languages}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Map & Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT / MAIN: India Map */}
        <div className="lg:col-span-7 bg-[#FFFBEB] border-2 border-[#451A03]/20 rounded-xl p-4 sm:p-6 shadow-md relative overflow-hidden flex flex-col">
          {/* Map Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#451A03]/10 pb-3 mb-4 text-xs font-bold uppercase tracking-wider text-[#78350F] gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] inline-block animate-pulse" />
              <span className="font-rubik">India Regional Cluster Map</span>
            </div>
            <div className="text-[11px] font-semibold text-[#78350F]">
              Click any cluster or zone to view regional voice
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[612/696] max-h-[640px] mx-auto select-none">
            <svg
              viewBox={INDIA_MAP_VIEWBOX}
              className="w-full h-full drop-shadow-sm transition-all"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Interactive map of India showing six Suraksha regional clusters"
            >
              {/* States Paths Layer */}
              <g className="india-states-layer">
                {INDIA_STATES_PATHS.map((st) => {
                  const cluster = stateToClusterMap[st.id] || selectedCluster;
                  const isSelected = selectedCluster.id === cluster?.id;
                  const isHovered = hoveredClusterId === cluster?.id;

                  // Dynamic fills adhering strictly to Suraksha palette
                  let fillColor = "#FFFBEB";
                  if (isSelected) {
                    fillColor = cluster.color;
                  } else if (isHovered) {
                    fillColor = cluster.hoverColor;
                  } else {
                    // Soft pastel baseline per cluster
                    switch (cluster.id) {
                      case "north":
                        fillColor = "#FEF08A";
                        break;
                      case "west":
                        fillColor = "#FED7AA";
                        break;
                      case "south1":
                        fillColor = "#CCFBF1";
                        break;
                      case "south2":
                        fillColor = "#BAE6FD";
                        break;
                      case "central":
                        fillColor = "#FEE2E2";
                        break;
                      case "east":
                        fillColor = "#E0E7FF";
                        break;
                      default:
                        fillColor = "#FFFBEB";
                    }
                  }

                  return (
                    <path
                      key={st.id}
                      d={st.path}
                      id={st.id}
                      fill={fillColor}
                      stroke={isSelected ? "#FFFFFF" : isHovered ? "#FFFFFF" : "rgba(69, 26, 3, 0.25)"}
                      strokeWidth={isSelected ? 1.4 : isHovered ? 1.2 : 0.7}
                      opacity={isSelected ? 1 : hoveredClusterId && !isHovered ? 0.45 : 0.9}
                      className="transition-colors duration-200 cursor-pointer"
                      onClick={() => setSelectedClusterId(cluster.id)}
                      onMouseEnter={() => setHoveredClusterId(cluster.id)}
                      onMouseLeave={() => setHoveredClusterId(null)}
                      tabIndex={-1}
                    >
                      <title>{`${st.name} — ${cluster.name} Cluster (${cluster.languages})`}</title>
                    </path>
                  );
                })}
              </g>

              {/* Regional Badges on the Map */}
              <g className="regional-cluster-badges">
                {REGIONAL_CLUSTERS.map((cluster) => {
                  const isSelected = selectedCluster.id === cluster.id;
                  const isHovered = hoveredClusterId === cluster.id;

                  return (
                    <g
                      key={cluster.id}
                      transform={`translate(${cluster.center.x}, ${cluster.center.y})`}
                      className="cursor-pointer transition-transform duration-200"
                      onClick={() => setSelectedClusterId(cluster.id)}
                      onMouseEnter={() => setHoveredClusterId(cluster.id)}
                      onMouseLeave={() => setHoveredClusterId(null)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${cluster.name} Cluster`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedClusterId(cluster.id);
                        }
                      }}
                    >
                      {/* Pulse ring on selected */}
                      {isSelected && (
                        <circle
                          r="28"
                          className="fill-none stroke-current opacity-30 animate-ping"
                          style={{ stroke: cluster.color }}
                        />
                      )}

                      {/* Drop Shadow Pill */}
                      <rect
                        x="-38"
                        y="-13"
                        width="76"
                        height="26"
                        rx="13"
                        className="fill-[#451A03]/25"
                      />

                      {/* Interactive Badge Pill */}
                      <rect
                        x="-38"
                        y="-15"
                        width="76"
                        height="26"
                        rx="13"
                        fill={isSelected ? cluster.color : isHovered ? cluster.hoverColor : "#FFFBEB"}
                        stroke={isSelected || isHovered ? "#FFFFFF" : cluster.color}
                        strokeWidth={isSelected ? 2.5 : isHovered ? 2.2 : 1.8}
                        className="transition-all shadow-md"
                      />

                      {/* Text Label */}
                      <text
                        y="2.5"
                        textAnchor="middle"
                        fill={isSelected || isHovered ? "#FFFFFF" : "#451A03"}
                        className="font-anton text-[10.5px] font-bold tracking-wider pointer-events-none select-none uppercase"
                      >
                        {cluster.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Map Footnote */}
          <div className="mt-4 pt-3 border-t border-[#451A03]/10 text-center text-xs text-[#78350F] font-medium font-rubik">
            Product & vernacular content clusters shown. Boundaries represent linguistic operating zones, not administrative limits.
          </div>
        </div>

        {/* RIGHT: Selected Region Review Panel */}
        <div 
          id={`panel-${selectedCluster.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${selectedCluster.id}`}
          className="lg:col-span-5 bg-[#FFFBEB] border-2 border-[#451A03]/20 rounded-xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6"
        >
          <div className="space-y-5">
            {/* Header / Active Zone Badge */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#451A03]/10 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#451A03]/20 bg-[#FEF3C7] text-[#451A03] font-rubik text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                {selectedCluster.location}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/10 text-[#0891B2] font-rubik text-xs font-bold uppercase tracking-wider">
                <Languages className="w-3.5 h-3.5" />
                {selectedCluster.reviewLanguage}
              </div>
            </div>

            {/* Region Title */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-1 font-rubik">
                REGIONAL CLUSTER VOICE
              </div>
              <h3 className="font-anton text-3xl sm:text-4xl text-[#451A03] uppercase leading-tight">
                {selectedCluster.name} CLUSTER
              </h3>
              <p className="text-[#78350F] text-sm sm:text-base font-rubik font-medium mt-1">
                Linguistic coverage: <span className="font-bold text-[#451A03]">{selectedCluster.languages}</span>
              </p>
            </div>

            {/* Review Card with Visible Tasteful Badge */}
            <div className="bg-[#FEF3C7] border-2 border-[#451A03]/15 rounded-lg p-5 sm:p-6 space-y-4 shadow-sm relative">
              <div className="flex items-center justify-between border-b border-[#451A03]/10 pb-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/30">
                  <Info className="w-3 h-3" />
                  SAMPLE REVIEW
                </span>
                <span className="text-[11px] font-semibold text-[#78350F]">
                  Demo vernacular format
                </span>
              </div>

              {/* Native Language Quote */}
              <div className="space-y-1.5">
                <div className="text-xs uppercase font-bold tracking-wider text-[#78350F]">
                  Vernacular ({selectedCluster.reviewLanguage}):
                </div>
                <blockquote className="font-rubik text-base sm:text-lg text-[#451A03] font-medium leading-relaxed italic border-l-3 border-[#DC2626] pl-3.5">
                  &ldquo;{selectedCluster.sampleReview}&rdquo;
                </blockquote>
              </div>

              {/* English Translation */}
              <div className="pt-3 border-t border-[#451A03]/10 space-y-1.5">
                <div className="text-xs uppercase font-bold tracking-wider text-[#78350F]">
                  English Translation:
                </div>
                <p className="font-rubik text-sm sm:text-base text-[#78350F] leading-relaxed bg-[#FFFBEB] p-3 rounded border border-[#451A03]/10">
                  &ldquo;{selectedCluster.englishTranslation}&rdquo;
                </p>
              </div>
            </div>

            {/* Explanatory Notice */}
            <div className="p-3.5 rounded-lg bg-[#FEF3C7]/60 border border-[#451A03]/10 text-xs text-[#78350F] leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#451A03]">Notice:</span> Yeh temporary demo content hai jo Suraksha ki cluster-tuned multi-lingual audio aur display experience ko demonstrate karta hai. Real driver testimonials client verification ke baad integrate honge.
              </div>
            </div>
          </div>

          {/* Quick CTA to Full Testimonials Route */}
          <div className="pt-2 border-t border-[#451A03]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-bold text-[#78350F]">
              Explore highway driver stories:
            </span>
            <Link
              href="/suraksha/testimonials"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] bg-[#DC2626] text-white font-rubik text-xs font-bold uppercase tracking-wider hover:bg-[#B91C1C] transition-all shadow-sm cursor-pointer"
            >
              All Testimonials <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
