"use client";

import {
  CountryPresence,
  GLOBAL_COUNTRIES,
  REGIONS_LIST
} from "@/lib/data/global-presence-data";
import {
  WORLD_COUNTRIES_PATHS,
  WORLD_VIEWBOX
} from "@/lib/data/world-map-paths";
import {
  Compass,
  Globe2,
  Layers,
  Radio,
  RotateCcw,
  Shield,
  Truck,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import React, { useId, useMemo, useState } from "react";

export default function InteractiveWorldMap() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All Regions");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [showAllLabels, setShowAllLabels] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mapUniqueId = useId().replace(/:/g, "");

  // Filtered countries
  const filteredCountries = useMemo(() => {
    return GLOBAL_COUNTRIES.filter((country) => {
      const matchRegion =
        selectedRegion === "All Regions" || country.region === selectedRegion;
      const matchCategory =
        selectedCategory === "All Products" ||
        country.category === selectedCategory ||
        country.primaryProduct.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchRegion && matchCategory;
    });
  }, [selectedRegion, selectedCategory]);

  // Lookup for quick access
  const countryByCode = useMemo(() => {
    const map = new Map<string, CountryPresence>();
    GLOBAL_COUNTRIES.forEach((c) => map.set(c.code, c));
    return map;
  }, []);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => {
      const next = Math.min(2.5, Math.max(1, +(prev + delta).toFixed(2)));
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedRegion("All Regions");
    setSelectedCategory("All Products");
  };

  const handleCountrySelect = (countryId: string) => {
    // Highlight pin on click without displaying any card below the map
    setSelectedCountryId((prev) => (prev === countryId ? null : countryId));
    setHoveredCountryId((prev) => (prev === countryId ? null : countryId));
    const target = GLOBAL_COUNTRIES.find((c) => c.id === countryId);
    if (target && zoomLevel > 1) {
      const cx = 500;
      const cy = 250;
      const targetDx = (cx - target.coordinates.x) * 0.4;
      const targetDy = (cy - target.coordinates.y) * 0.4;
      setPanOffset({ x: targetDx, y: targetDy });
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. KEY METRICS STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#121820]/90 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            <Globe2 className="w-3.5 h-3.5 text-[#00E5FF]" />
            Global Reach
          </div>
          <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
            12+ <span className="text-sm font-sans text-[#94A3B8]">Countries</span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">Across 4 major continents</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#121820]/90 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            <Truck className="w-3.5 h-3.5 text-[#D5573B]" />
            Fleet Applications
          </div>
          <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
            6 <span className="text-sm font-sans text-[#94A3B8]">Product Lines</span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">TBR, OTR, OEM &amp; Defense</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#121820]/90 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            <Radio className="w-3.5 h-3.5 text-[#10B981]" />
            Connected Assets
          </div>
          <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
            68,000+ <span className="text-sm font-sans text-[#94A3B8]">Vehicles</span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">Live telematics streams</p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#121820]/90 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1">
            <Shield className="w-3.5 h-3.5 text-[#F59E0B]" />
            International Standards
          </div>
          <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
            ECE R141 <span className="text-sm font-sans text-[#94A3B8]">&amp; IP67</span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">Global automotive compliance</p>
        </div>
      </div>

      {/* 2. FILTER CONTROLS BAR */}
      <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#121820]/80 backdrop-blur-md space-y-4">
        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-medium text-[#94A3B8] uppercase tracking-wider mr-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#D5573B]" /> Region:
          </span>
          {REGIONS_LIST.map((reg) => {
            const count =
              reg === "All Regions"
                ? GLOBAL_COUNTRIES.filter((c) => c.category !== "Global HQ").length
                : GLOBAL_COUNTRIES.filter((c) => c.region === reg).length;
            const isActive = selectedRegion === reg;
            return (
              <button
                key={reg}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#D5573B] text-white shadow-lg shadow-[#D5573B]/20 font-semibold"
                    : "bg-white/5 text-[#FAF7F2]/80 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {reg}{" "}
                <span
                  className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-black/30 text-white" : "bg-white/10 text-[#94A3B8]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Filter Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-medium text-[#94A3B8] uppercase tracking-wider mr-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#00E5FF]" /> Solution:
            </span>
            {[
              { label: "All Products", cat: "All Products" },
              { label: "TMIP", cat: "TMIP" },
              { label: "Truck TPMS", cat: "Truck TPMS" },
              { label: "OTR TPMS", cat: "OTR TPMS" },
              { label: "2-Wheeler OEM", cat: "OEM Fitment" },
              { label: "Armed Vehicles", cat: "Defense / Armed Vehicles" },
            ].map(({ label, cat }) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    isActive
                      ? "bg-[#00E5FF] text-[#0F1419] font-bold shadow-md shadow-[#00E5FF]/20"
                      : "bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Toggle Labels & Reset */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAllLabels(!showAllLabels)}
              className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                showAllLabels
                  ? "border-[#D5573B]/50 bg-[#D5573B]/10 text-[#FAF7F2]"
                  : "border-white/10 bg-white/5 text-[#94A3B8] hover:text-white"
              }`}
            >
              {showAllLabels ? "Pins: Labels On" : "Pins: Minimal"}
            </button>
            <button
              type="button"
              onClick={resetView}
              className="p-1.5 text-xs text-[#94A3B8] hover:text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE SVG WORLD MAP CONTAINER */}
      <div className="relative rounded-3xl border border-white/10 bg-[#0B0F14] overflow-hidden shadow-2xl">
        {/* Map Header Overlay Bar */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#0F1419]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#FAF7F2] font-medium">Interactive Deployment Map</span>
          <span className="text-[#94A3B8] font-mono text-[11px]">· Click any pin to inspect</span>
        </div>

        {/* Map Zoom Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-[#0F1419]/80 backdrop-blur-md p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => handleZoom(0.25)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#FAF7F2] hover:bg-white/10 transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleZoom(-0.25)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#FAF7F2] hover:bg-white/10 transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={resetView}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
            title="Reset View"
            aria-label="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Map Canvas */}
        <div className="w-full overflow-hidden bg-gradient-to-b from-[#0B0F14] via-[#0F1419] to-[#0A0D12]">
          <svg
            viewBox={WORLD_VIEWBOX}
            className="w-full h-auto select-none transition-transform duration-300 ease-out"
            style={{
              maxHeight: "680px",
              transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transformOrigin: "center center",
            }}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id={`${mapUniqueId}-ocean-grad`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B0F14" />
                <stop offset="50%" stopColor="#0F1419" />
                <stop offset="100%" stopColor="#090C10" />
              </linearGradient>

              {/* Pin Glow Filters */}
              <filter id={`${mapUniqueId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ocean Background */}
            <rect width="1000" height="500" fill={`url(#${mapUniqueId}-ocean-grad)`} />

            {/* Graticule Grid Lines (Equator, Tropics, Prime Meridian) */}
            <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.7" strokeDasharray="3 4">
              {/* Equator (approx y=250) */}
              <line x1="0" y1="248" x2="1000" y2="248" stroke="rgba(213, 87, 59, 0.2)" strokeWidth="1" />
              {/* Tropic of Cancer (lat 23.5N ~ y=190) */}
              <line x1="0" y1="190" x2="1000" y2="190" />
              {/* Tropic of Capricorn (lat 23.5S ~ y=308) */}
              <line x1="0" y1="308" x2="1000" y2="308" />
              {/* Arctic Circle (lat 66N ~ y=70) */}
              <line x1="0" y1="70" x2="1000" y2="70" />
              {/* Longitude Meridiens */}
              <line x1="250" y1="0" x2="250" y2="500" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
              <line x1="750" y1="0" x2="750" y2="500" />
            </g>

            {/* Equator Label */}
            <text
              x="12"
              y="245"
              fill="rgba(255, 255, 255, 0.2)"
              fontSize="9"
              fontFamily="monospace"
            >
              EQUATOR 0°
            </text>

            {/* Base Countries Polygons */}
            <g id="world-countries">
              {WORLD_COUNTRIES_PATHS.map((country) => {
                const presenceData = countryByCode.get(country.code);
                const isPresence = Boolean(presenceData);
                const isSelected = isPresence && presenceData?.id === selectedCountryId;
                const isHovered = isPresence && presenceData?.id === hoveredCountryId;
                const isFiltered =
                  isPresence &&
                  filteredCountries.some((c) => c.id === presenceData?.id);

                let fill = "#18202A";
                let stroke = "rgba(255, 255, 255, 0.08)";
                let strokeWidth = 0.6;

                if (isPresence && presenceData) {
                  if (isSelected) {
                    fill = presenceData.color;
                    stroke = "#FAF7F2";
                    strokeWidth = 1.4;
                  } else if (isHovered) {
                    fill = `${presenceData.color}66`;
                    stroke = presenceData.color;
                    strokeWidth = 1.2;
                  } else if (isFiltered) {
                    fill = "#243242";
                    stroke = `${presenceData.color}80`;
                    strokeWidth = 0.9;
                  } else {
                    fill = "#1E2938";
                    stroke = "rgba(255, 255, 255, 0.15)";
                  }
                }

                return (
                  <path
                    key={country.id}
                    d={country.d}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    opacity={isPresence && !isFiltered ? 0.35 : 1}
                    className={`transition-colors duration-200 ${
                      isPresence ? "cursor-pointer hover:opacity-90" : "pointer-events-none"
                    }`}
                    onClick={() => {
                      if (presenceData) handleCountrySelect(presenceData.id);
                    }}
                    onMouseEnter={() => {
                      if (presenceData) setHoveredCountryId(presenceData.id);
                    }}
                    onMouseLeave={() => {
                      if (presenceData) setHoveredCountryId(null);
                    }}
                  />
                );
              })}
            </g>

            {/* Connecting Flight/Route Vectors from India HQ */}
            <g strokeDasharray="3 5" opacity="0.35">
              {filteredCountries
                .filter((c) => c.id !== "india")
                .map((target) => (
                  <path
                    key={`route-${target.id}`}
                    d={`M 731.8 211.2 Q ${(731.8 + target.coordinates.x) / 2} ${
                      Math.min(211.2, target.coordinates.y) - 30
                    } ${target.coordinates.x} ${target.coordinates.y}`}
                    fill="none"
                    stroke={target.color}
                    strokeWidth="0.8"
                  />
                ))}
            </g>

            {/* COUNTRY RADAR PINS & PRODUCT BADGES */}
            <g id="country-pins">
              {filteredCountries.map((c) => {
                const isSelected = c.id === selectedCountryId;
                const isHovered = c.id === hoveredCountryId;
                const { x, y } = c.coordinates;
                const { anchor, dx, dy } = c.labelConfig;

                return (
                  <g
                    key={`pin-${c.id}`}
                    className="cursor-pointer"
                    onClick={() => handleCountrySelect(c.id)}
                    onMouseEnter={() => setHoveredCountryId(c.id)}
                    onMouseLeave={() => setHoveredCountryId(null)}
                  >
                    {/* Animated Radar Pulse Rings */}
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="none"
                      stroke={c.color}
                      strokeWidth="1.5"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="r"
                        values="4;18"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.85;0"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    <circle
                      cx={x}
                      cy={y}
                      r="2"
                      fill="none"
                      stroke={c.color}
                      strokeWidth="1.2"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="r"
                        values="2;12"
                        dur="2.4s"
                        begin="0.8s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.75;0"
                        dur="2.4s"
                        begin="0.8s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Pin Outer Glow */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 6.5 : isHovered ? 5.5 : 4.5}
                      fill={c.color}
                      opacity={isSelected ? 0.45 : 0.25}
                    />

                    {/* Solid Core Dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 4.5 : isHovered ? 3.8 : 3}
                      fill={isSelected ? "#FAF7F2" : c.color}
                      stroke="#0F1419"
                      strokeWidth={isSelected ? 1.8 : 1.2}
                    />

                    {/* PIN PRODUCT BADGE LABEL */}
                    {(showAllLabels || isSelected || isHovered) && (
                      <g
                        transform={`translate(${x + dx}, ${y + dy})`}
                        className="transition-all duration-200"
                        style={{ pointerEvents: "none" }}
                      >
                        {/* Anchor handling: left/right/center */}
                        {(() => {
                          const titleText = `${c.flag} ${c.name}`;
                          const subText = c.badgeText;
                          // Estimate width based on characters
                          const maxChar = Math.max(titleText.length, subText.length);
                          const boxW = Math.max(105, maxChar * 5.4 + 18);
                          const boxH = 26;

                          let boxX = 0;
                          if (anchor === "right") boxX = -boxW;
                          else if (anchor === "center") boxX = -boxW / 2;

                          const boxY = -boxH / 2;

                          return (
                            <g>
                              {/* Connector line to pin */}
                              <line
                                x1={0}
                                y1={0}
                                x2={anchor === "right" ? 0 : anchor === "center" ? 0 : 0}
                                y2={0}
                                stroke={c.color}
                                strokeWidth="0.8"
                                opacity="0.6"
                              />

                              {/* Badge Box */}
                              <rect
                                x={boxX}
                                y={boxY}
                                width={boxW}
                                height={boxH}
                                rx="5"
                                fill="rgba(15, 20, 25, 0.94)"
                                stroke={isSelected ? c.color : "rgba(255, 255, 255, 0.18)"}
                                strokeWidth={isSelected ? 1.3 : 0.8}
                                filter={`url(#${mapUniqueId}-glow)`}
                              />

                              {/* Left Accent Bar */}
                              <rect
                                x={boxX}
                                y={boxY}
                                width="3"
                                height={boxH}
                                rx="1.5"
                                fill={c.color}
                              />

                              {/* Country Name + Flag */}
                              <text
                                x={boxX + 8}
                                y={boxY + 10.5}
                                fill="#FAF7F2"
                                fontSize="8"
                                fontWeight="600"
                                fontFamily="system-ui, sans-serif"
                              >
                                {titleText}
                              </text>

                              {/* Product Type Label on the Pin */}
                              <text
                                x={boxX + 8}
                                y={boxY + 20.5}
                                fill={c.color}
                                fontSize="7.5"
                                fontWeight="700"
                                fontFamily="monospace"
                              >
                                {subText}
                              </text>
                            </g>
                          );
                        })()}
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Map Legend Footer */}
        <div className="p-4 bg-[#121820]/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[#94A3B8] font-mono uppercase text-[11px] tracking-wider">
              Deployment Legend:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]" />
              <span className="text-[#FAF7F2]">TMIP Cloud Platform</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D5573B]" />
              <span className="text-[#FAF7F2]">Truck TPMS &amp; Smart TBR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="text-[#FAF7F2]">Truck TPMS &rarr; TMIP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="text-[#FAF7F2]">OTR Mining TPMS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#818CF8]" />
              <span className="text-[#FAF7F2]">2-Wheeler OEM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
              <span className="text-[#FAF7F2]">Armed Vehicles &amp; Defense</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#94A3B8]">
            Showing {filteredCountries.length} active country deployments
          </div>
        </div>
      </div>
    </div>
  );
}
