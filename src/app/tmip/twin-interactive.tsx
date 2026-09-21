"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Activity,
  Cpu,
  Disc,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Clock,
  UserCheck,
  Wrench,
  DollarSign,
  BarChart3,
  Dna,
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
    image: "/images/vehicle-digital_twin.png",
    alt: "Vehicle Digital Twin",
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
    image: "/images/3D_Interactive_twin.png",
    alt: "3D Interactive Twin",
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
    image: "/images/engine-digital_twin.png",
    alt: "Engine Digital Twin",
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
    image: "/images/Tyre-digital_twin.png",
    alt: "Tyre Digital Twin",
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
    image: "/images/AI-prediction_RUL.png",
    alt: "AI Prediction & RUL",
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
  {
    id: "health-score-breakdown",
    name: "Health Score Breakdown",
    image: "/images/Health_score-breakdown.png",
    alt: "Health Score Breakdown",
    icon: Activity,
    count: "84 avg",
    statusTitle: "Health Scores",
    metrics: [
      { label: "Engine", value: "91 / 100", color: "green" },
      { label: "Electrical", value: "90 / 100", color: "blue" },
      { label: "Tyres", value: "85 / 100", color: "blue" },
      { label: "Fuel", value: "82 / 100", color: "yellow" },
    ],
    bottom: {
      label: "Operations · Safety:",
      value: "84 · 78",
      progress: "84%",
    },
  },
  {
    id: "event-timeline",
    name: "Event Timeline",
    image: "/images/event-timeline.png",
    alt: "Event Timeline",
    icon: Clock,
    count: "5 events",
    statusTitle: "Event Timeline",
    metrics: [
      { label: "10:18 AM Coolant", value: "Warning", color: "yellow" },
      { label: "10:05 AM Pressure", value: "Warning", color: "yellow" },
      { label: "09:50 AM Harsh Brake", value: "Info", color: "blue" },
      { label: "09:32 AM Fuel Effic.", value: "Info", color: "blue" },
    ],
    bottom: {
      label: "09:18 AM Tyre Pressure:",
      value: "Corrected",
      progress: "100%",
    },
  },
  {
    id: "driver-behavior",
    name: "Driver Behavior",
    image: "/images/driver-behavior.png",
    alt: "Driver Behavior",
    icon: UserCheck,
    count: "91 / 100",
    statusTitle: "Driver Score",
    metrics: [
      { label: "Driver Score", value: "91 / 100", color: "green" },
      { label: "Seatbelt", value: "100%", color: "green" },
      { label: "Harsh Brake / Accel", value: "0 / 2", color: "blue" },
      { label: "Idle Time", value: "4%", color: "green" },
    ],
    bottom: {
      label: "Driving Time · Overspeed:",
      value: "06h 24m · 1",
      progress: "91%",
    },
  },
  {
    id: "maintenance-rul",
    name: "Maintenance & RUL",
    image: "/images/maintenance-RUL.png",
    alt: "Maintenance & RUL",
    icon: Wrench,
    count: "17 days",
    statusTitle: "Maintenance & RUL",
    metrics: [
      { label: "Engine Oil (Good)", value: "17 Days", color: "green" },
      { label: "Air Filter (Good)", value: "40 Days", color: "green" },
      { label: "Fuel Filter (Good)", value: "28 Days", color: "green" },
      { label: "Brake Lining (Mod.)", value: "16,000 km", color: "yellow" },
    ],
    bottom: {
      label: "Battery Monitor (Good):",
      value: "83 Days",
      progress: "83%",
    },
  },
  {
    id: "cost-impact",
    name: "Cost Impact",
    image: "/images/cost-impacr.png",
    alt: "Cost Impact",
    icon: DollarSign,
    count: "₹1.65L",
    statusTitle: "Cost Impact (30D)",
    metrics: [
      { label: "Fuel Savings", value: "₹ 18,400", color: "green" },
      { label: "Tyre Savings", value: "₹ 46,000", color: "green" },
      { label: "Maintenance Savings", value: "₹ 21,000", color: "blue" },
      { label: "Downtime Savings", value: "₹ 80,000", color: "green" },
    ],
    bottom: {
      label: "Total Potential Savings:",
      value: "₹ 1,65,400 (+12.5%)",
      progress: "85%",
    },
  },
  {
    id: "fleet-benchmark",
    name: "Fleet Benchmark",
    image: "/images/fleet-benchmark.png",
    alt: "Fleet Benchmark",
    icon: BarChart3,
    count: "5 metrics",
    statusTitle: "Fleet Benchmark",
    metrics: [
      { label: "Fuel Efficiency", value: "4.8 vs 5.6 km/l", color: "blue" },
      { label: "Engine Utilization", value: "72% vs 68%", color: "green" },
      { label: "Vehicle Availability", value: "91% vs 93%", color: "green" },
      { label: "Maintenance Cost", value: "₹2.8 vs ₹2.3 /km", color: "yellow" },
    ],
    bottom: {
      label: "Tyre Life (Fleet vs Bench):",
      value: "38,000 / 42,000 km",
      progress: "90%",
    },
  },
  {
    id: "vehicle-dna",
    name: "Vehicle DNA",
    image: "/images/vehicle_DNA.png",
    alt: "Vehicle DNA Normal Behavior Pattern",
    icon: Dna,
    count: "Normal",
    statusTitle: "Vehicle DNA",
    metrics: [
      { label: "RPM Pattern", value: "600–1600 rpm", color: "green" },
      { label: "Fuel Usage", value: "3.5–5.5 km/l", color: "green" },
      { label: "Engine Load", value: "40–80 %", color: "blue" },
      { label: "Temp Pattern", value: "75–95 °C", color: "green" },
    ],
    bottom: {
      label: "Normal Brake Usage:",
      value: "0–15 events/100km",
      progress: "75%",
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
    <div className="rounded-[6px] border border-[rgba(59,130,246,0.15)] bg-[rgba(59,130,246,0.03)] p-6 lg:p-8 shadow-2xl overflow-hidden">
      {/* Central visualization (real TMIP image viewer with telemetry status) */}
      <div
        className="max-w-[720px] mx-auto flex flex-col items-center justify-center relative min-h-[340px] sm:min-h-[420px] bg-[#050A17]/80 rounded-[4px] border border-slate-400/10 p-4 sm:p-8"
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

        <div className="w-full max-w-[560px] relative flex flex-col items-center">
          {/* Real Image Display Frame */}
          <div className="relative w-full h-[260px] sm:h-[340px] flex items-center justify-center overflow-hidden rounded-[3px]">
            <Image
              src={currentView.image}
              alt={currentView.alt}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              priority
              className="object-contain drop-shadow-md transition-opacity duration-300"
            />

            {/* Subtle navigation arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous view"
              className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#050A17]/75 hover:bg-[#3B82F6]/30 border border-white/10 hover:border-[#3B82F6]/50 text-slate-400 hover:text-white flex items-center justify-center transition-all z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next view"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#050A17]/75 hover:bg-[#3B82F6]/30 border border-white/10 hover:border-[#3B82F6]/50 text-slate-400 hover:text-white flex items-center justify-center transition-all z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Subtle View Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
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

          {/* Existing Metadata Row */}
          <div className="w-full mt-3 flex items-center justify-between px-2 text-[11px] font-jetbrains text-[#94A3B8]">
            <span>VIN: <strong className="text-[#F1F5F9]">MH-12-TR-9418</strong></span>
            <span className="text-[#3B82F6]">{currentView.name.toUpperCase()}</span>
            <span className="text-[#10B981]">OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
