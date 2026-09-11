"use client";

import React from "react";
import Image from "next/image";

export type TmipAssetId =
  | "TMIP-ASSET-01"
  | "TMIP-ASSET-02"
  | "TMIP-ASSET-03"
  | "TMIP-ASSET-04"
  | "TMIP-ASSET-05"
  | "TMIP-ASSET-06"
  | "TMIP-ASSET-07"
  | "TMIP-ASSET-08"
  | "TMIP-ASSET-09"
  | "TMIP-ASSET-10"
  | "TMIP-ASSET-11"
  | "TMIP-ASSET-12";

interface AssetMeta {
  id: TmipAssetId;
  name: string;
  tier: "HERO" | "PRODUCT";
  dims: string;
  source: string;
  imageSrc: string;
  description: string;
}

const ASSET_REGISTRY: Record<TmipAssetId, AssetMeta> = {
  "TMIP-ASSET-01": {
    id: "TMIP-ASSET-01",
    name: "Vehicle Digital Twin · Main Dashboard",
    tier: "HERO",
    dims: "800 × 373",
    source: "tmip-asset-1.jpg",
    imageSrc: "/images/tmip-asset-1.jpg",
    description: "Tractor-trailer with six live subsystem callouts, telemetry rail, and live bus metrics."
  },
  "TMIP-ASSET-02": {
    id: "TMIP-ASSET-02",
    name: "3D Interactive Twin · Component View",
    tier: "HERO",
    dims: "794 × 424",
    source: "tmip-asset-2.jpg",
    imageSrc: "/images/tmip-asset-2.jpg",
    description: "X-ray blueprint skeleton with Gold engine/driveline highlighting and Green wheel sensors."
  },
  "TMIP-ASSET-03": {
    id: "TMIP-ASSET-03",
    name: "Engine Digital Twin",
    tier: "PRODUCT",
    dims: "790 × 388",
    source: "tmip-asset-3.jpg",
    imageSrc: "/images/tmip-asset-3.jpg",
    description: "Isolated diesel engine powertrain health (91/100) and multi-axis stress telemetry."
  },
  "TMIP-ASSET-04": {
    id: "TMIP-ASSET-04",
    name: "Tyre Digital Twin",
    tier: "PRODUCT",
    dims: "540 × 426",
    source: "tmip-asset-4.jpg",
    imageSrc: "/images/tmip-asset-4.jpg",
    description: "Top-down chassis telemetry with 4-corner pressure, thermal, health, and RUL tracking."
  },
  "TMIP-ASSET-05": {
    id: "TMIP-ASSET-05",
    name: "AI Prediction & Remaining Useful Life",
    tier: "PRODUCT",
    dims: "562 × 428",
    source: "tmip-asset-5.jpg",
    imageSrc: "/images/tmip-asset-5.jpg",
    description: "Machine-learning breakdown probability (4%), service windows, and predictive RUL curves."
  },
  "TMIP-ASSET-06": {
    id: "TMIP-ASSET-06",
    name: "Health Score Breakdown",
    tier: "PRODUCT",
    dims: "366 × 428",
    source: "tmip-asset-6.jpg",
    imageSrc: "/images/tmip-asset-6.jpg",
    description: "Six-axis radar chart showing subsystem health parity across Engine, Tyres, Fuel, and Safety."
  },
  "TMIP-ASSET-07": {
    id: "TMIP-ASSET-07",
    name: "Event Timeline",
    tier: "PRODUCT",
    dims: "390 × 354",
    source: "tmip-asset-7.jpg",
    imageSrc: "/images/tmip-asset-7.jpg",
    description: "Real-time chronological incident feed with multi-severity classification and filters."
  },
  "TMIP-ASSET-08": {
    id: "TMIP-ASSET-08",
    name: "Driver Behavior Scorecard",
    tier: "PRODUCT",
    dims: "502 × 354",
    source: "tmip-asset-8.jpg",
    imageSrc: "/images/tmip-asset-8.jpg",
    description: "Driver safety index (91/100 Grade A) with telemetry for overspeed, harsh braking, and idle time."
  },
  "TMIP-ASSET-09": {
    id: "TMIP-ASSET-09",
    name: "Maintenance & Component RUL",
    tier: "PRODUCT",
    dims: "478 × 402",
    source: "tmip-asset-9.jpg",
    imageSrc: "/images/tmip-asset-9.jpg",
    description: "Workshop-grade component lifespan matrix with automated action recommendations."
  },
  "TMIP-ASSET-10": {
    id: "TMIP-ASSET-10",
    name: "Cost Impact & Financial ROI",
    tier: "PRODUCT",
    dims: "592 × 398",
    source: "tmip-asset-10.jpg",
    imageSrc: "/images/tmip-asset-10.jpg",
    description: "30-day savings breakdown across fuel, tyres, maintenance, and downtime (₹1,65,400 saved)."
  },
  "TMIP-ASSET-11": {
    id: "TMIP-ASSET-11",
    name: "Fleet Benchmark & Index",
    tier: "PRODUCT",
    dims: "476 × 410",
    source: "tmip-asset-11.jpg",
    imageSrc: "/images/tmip-asset-11.jpg",
    description: "This-Fleet vs Industry-Best comparative analysis across fuel, uptime, and operating costs."
  },
  "TMIP-ASSET-12": {
    id: "TMIP-ASSET-12",
    name: "Vehicle DNA · Normal Behavior Pattern",
    tier: "PRODUCT",
    dims: "800 × 390",
    source: "tmip-asset-12.jpg",
    imageSrc: "/images/tmip-asset-12.jpg",
    description: "Multi-parameter baseline sparklines capturing operating DNA and variance thresholds."
  }
};

export function TmipAssetPlaceholder({ 
  assetId, 
  className = "",
  showBadge = true 
}: { 
  assetId: TmipAssetId; 
  className?: string;
  showBadge?: boolean;
}) {
  const asset = ASSET_REGISTRY[assetId];
  if (!asset) return null;

  return (
    <div className={`group relative flex flex-col w-full rounded-xl border border-blue-900/40 bg-[#070D1B]/95 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-blue-500/60 ${className}`}>
      {/* Top Asset Spec Bar - Standardized height & alignment */}
      {showBadge && (
        <div className="flex items-center justify-between gap-2 px-3.5 h-10 bg-[#0C1527] border-b border-blue-950/80 font-mono text-[11px] text-slate-400 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20 shrink-0">
              {asset.id}
            </span>
            <span className="text-slate-300 font-medium truncate">
              {asset.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500 shrink-0">
            <span className="hidden sm:inline text-blue-400/80">SCHEMATIC SPEC</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-slate-400">
              {asset.dims} PX
            </span>
          </div>
        </div>
      )}

      {/* Standardized Asset Image Canvas - Uniform 16:10 Aspect Ratio & Footprint */}
      <div className="relative w-full aspect-[16/10] bg-[#050A14] flex items-center justify-center overflow-hidden p-2.5">
        <Image
          src={asset.imageSrc}
          alt={asset.name}
          fill
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          priority={assetId === "TMIP-ASSET-01" || assetId === "TMIP-ASSET-02"}
        />
      </div>

      {/* Standardized Footer Blueprint Tag */}
      <div className="flex items-center justify-between px-3.5 h-8 bg-[#050A14] border-t border-slate-900 font-mono text-[10px] text-slate-500 shrink-0">
        <span className="flex items-center gap-1.5 text-slate-400 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="truncate">CALIBRATED TMIP V3.1 ASSET SPECIFICATION</span>
        </span>
        <span className="text-slate-600 hidden sm:inline shrink-0 ml-2">REF: {asset.source}</span>
      </div>
    </div>
  );
}

