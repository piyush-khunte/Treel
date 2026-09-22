"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Cpu,
  Disc,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Layers,
  TrendingUp,
} from "lucide-react";

interface MetricItem {
  label: string;
  value: string;
  color: "green" | "blue" | "yellow" | "red";
}

interface ViewItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  icon: React.ElementType;
  count: string;
  statusTitle: string;
  metrics: MetricItem[];
  bottom: {
    label: string;
    value: string;
    progress: string;
  };
}

const views: ViewItem[] = [
  {
    id: "vehicle-digital-twin",
    name: "Vehicle Digital Twin",
    image: "/images/Vehicle_Status_Engine.png",
    alt: "Vehicle Status Engine",
    icon: Sliders,
    count: "1,847 nodes",
    statusTitle: "Status",
    metrics: [
      { label: "Engine Health", value: "91%", color: "green" },
      { label: "Electrical", value: "90%", color: "blue" },
      { label: "Driveline", value: "88%", color: "blue" },
      { label: "Tyres & Brakes", value: "85% / 80%", color: "yellow" },
    ],
    bottom: {
      label: "Active Twin Coverage:",
      value: "1,847 / 1,847",
      progress: "99.1%",
    },
  },
  {
    id: "3d-interactive-twin",
    name: "3D Interactive Twin",
    image: "/images/dashboard_3.png",
    alt: "dashboard_3",
    icon: Layers,
    count: "Active",
    statusTitle: "Status",
    metrics: [
      { label: "Excellent", value: "247", color: "green" },
      { label: "Good", value: "1,584", color: "blue" },
      { label: "Warning", value: "14", color: "yellow" },
      { label: "Critical", value: "2", color: "red" },
    ],
    bottom: {
      label: "Active Twin Coverage:",
      value: "1,847 / 1,847",
      progress: "99.1%",
    },
  },
  {
    id: "engine-digital-twin",
    name: "Engine Digital Twin",
    image: "/images/Vehicle_Status_Engine_TPMS_TrendView_Temp_1.png",
    alt: "Vehicle Status Engine TPMS Trend View Temp 1",
    icon: Cpu,
    count: "91 / 100",
    statusTitle: "Engine Status",
    metrics: [
      { label: "Engine Health", value: "91 / 100", color: "green" },
      { label: "Stress Index", value: "61 / 100", color: "yellow" },
      { label: "Coolant Temp", value: "88 °C", color: "blue" },
      { label: "Oil Pressure", value: "420 kPa", color: "blue" },
    ],
    bottom: {
      label: "RPM · Torque · Fuel:",
      value: "1450 rpm · 68% · 38 L/h",
      progress: "68%",
    },
  },
  {
    id: "tyre-digital-twin",
    name: "Tyre Digital Twin",
    image: "/images/Vehicle_Status_Engine_TPMS_View.png",
    alt: "Vehicle Status Engine TPMS View",
    icon: Disc,
    count: "92% health",
    statusTitle: "Tyre Status",
    metrics: [
      { label: "FL Tyre (76°C)", value: "8.2 Bar · 92%", color: "green" },
      { label: "FR Tyre (74°C)", value: "8.1 Bar · 90%", color: "green" },
      { label: "RL1 Tyre (72°C)", value: "7.9 Bar · 88%", color: "green" },
      { label: "RR1 Tyre (73°C)", value: "8.0 Bar · 89%", color: "green" },
    ],
    bottom: {
      label: "FL RUL Remaining:",
      value: "38,000 km",
      progress: "92%",
    },
  },
  {
    id: "ai-prediction-rul",
    name: "AI Prediction & RUL",
    image: "/images/Vehicle_Status_Engine_TPMS_TrendView_Temp.png",
    alt: "Vehicle Status Engine TPMS Trend View Temp",
    icon: TrendingUp,
    count: "4% risk",
    statusTitle: "AI Prediction",
    metrics: [
      { label: "Breakdown Prob.", value: "4% (Low)", color: "green" },
      { label: "Next Service", value: "17 Days", color: "blue" },
      { label: "Tyre Rotation", value: "3,200 km", color: "yellow" },
      { label: "Battery Failure", value: "83 Days (8%)", color: "green" },
    ],
    bottom: {
      label: "RUL Trend (Engine):",
      value: "6,200 Hours",
      progress: "78%",
    },
  },
];

export function TwinInteractive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentView = views[activeIndex];

  // Auto-advance slideshow every 5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % views.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = useCallback(() => {
    setIsPaused(true);
    setActiveIndex((prev) => (prev - 1 + views.length) % views.length);
  }, []);

  const handleNext = useCallback(() => {
    setIsPaused(true);
    setActiveIndex((prev) => (prev + 1) % views.length);
  }, []);

  const handleViewClick = (idx: number) => {
    setIsPaused(true);
    setActiveIndex(idx);
  };

  return (
    <div className="rounded-[6px] border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.03)] p-4 sm:p-6 lg:p-8 shadow-2xl overflow-hidden">
      {/* Central visualization (real TMIP image viewer with telemetry status) */}
      <div
        className="w-full max-w-[1080px] mx-auto flex flex-col items-center justify-center relative bg-[#050A17]/80 rounded-[4px] border border-slate-400/10 p-3 sm:p-5 lg:p-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="w-full relative flex flex-col items-center">
          {/* Real Image Display Frame */}
          <div className="relative w-full aspect-[1920/911] flex items-center justify-center overflow-hidden rounded-[3px]">
            <Image
              src={currentView.image}
              alt={currentView.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1080px"
              priority
              className="object-contain drop-shadow-md transition-opacity duration-300"
            />

            {/* Subtle navigation arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous view"
              className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#050A17]/75 hover:bg-[#3B82F6]/30 border border-white/10 hover:border-[#3B82F6]/50 text-slate-400 hover:text-white flex items-center justify-center transition-all z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next view"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#050A17]/75 hover:bg-[#3B82F6]/30 border border-white/10 hover:border-[#3B82F6]/50 text-slate-400 hover:text-white flex items-center justify-center transition-all z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Subtle View Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4">
            {views.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => handleViewClick(idx)}
                className={`h-1 transition-all rounded-full ${
                  idx === activeIndex
                    ? "w-5 bg-[#3B82F6] shadow-[0_0_6px_#3B82F6]"
                    : "w-1.5 bg-slate-700/60 hover:bg-slate-500"
                }`}
                aria-label={v.name}
                title={v.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
