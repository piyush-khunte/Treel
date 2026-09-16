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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Sidebar system selector */}
        <div className="lg:col-span-3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-400/10 pb-6 lg:pb-0 lg:pr-6">
          <div>
            <div className="text-[10px] font-jetbrains tracking-[0.1em] text-[#64748B] uppercase font-semibold mb-3 flex items-center justify-between">
              <span>System View</span>
              <span className="inline-flex items-center gap-1 text-[#10B981] text-[10px] font-jetbrains">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                LIVE
              </span>
            </div>
            <div className="space-y-1 max-h-[420px] lg:max-h-[460px] overflow-y-auto pr-1">
              {views.map((v, idx) => {
                const Icon = v.icon;
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={v.id}
                    onClick={() => handleViewClick(idx)}
                    className={`w-full text-left px-3 py-2 rounded-[3px] text-xs font-ibm-plex flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-[#3B82F6] font-semibold shadow-sm"
                        : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.03] border border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                          isActive ? "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" : "bg-white/20"
                        }`}
                      />
                      <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-[#3B82F6]" : "text-[#64748B]"}`} />
                      <span className="truncate">{v.name}</span>
                    </span>
                    <span className="font-jetbrains text-[10px] text-[#64748B] flex-shrink-0 ml-2">{v.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-400/10 text-[11px] text-[#64748B] font-jetbrains">
            Telemetry latency: <span className="text-[#10B981]">180ms</span> · 5G Edge
          </div>
        </div>

        {/* Central visualization (real TMIP image viewer with telemetry status) */}
        <div
          className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[300px] lg:min-h-[360px] bg-[#050A17]/80 rounded-[4px] border border-slate-400/10 p-4 sm:p-8"
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

          <div className="w-full max-w-[480px] relative flex flex-col items-center">
            {/* Real Image Display Frame */}
            <div className="relative w-full h-[220px] sm:h-[250px] flex items-center justify-center overflow-hidden rounded-[3px]">
              <Image
                src={currentView.image}
                alt={currentView.alt}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                priority
                className="object-contain drop-shadow-md transition-opacity duration-300"
              />

              {/* Subtle navigation arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous view"
                className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#050A17]/75 hover:bg-[#3B82F6]/30 border border-white/10 hover:border-[#3B82F6]/50 text-slate-400 hover:text-white flex items-center justify-center transition-all z-10"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next view"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#050A17]/75 hover:bg-[#3B82F6]/30 border border-white/10 hover:border-[#3B82F6]/50 text-slate-400 hover:text-white flex items-center justify-center transition-all z-10"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Subtle View Indicator Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-2.5">
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

        {/* Right legend (Status label + dynamic authoritative metrics matching current real image) */}
        <div className="lg:col-span-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-400/10 pt-6 lg:pt-0 lg:pl-6">
          <div>
            <div className="text-[10px] font-jetbrains tracking-[0.1em] text-[#64748B] uppercase font-semibold mb-4">
              {currentView.statusTitle}
            </div>

            <div className="space-y-3">
              {currentView.metrics.map((m, i) => {
                const dotColor =
                  m.color === "green"
                    ? "bg-[#10B981] shadow-[0_0_8px_#10B981]"
                    : m.color === "yellow"
                    ? "bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]"
                    : m.color === "red"
                    ? "bg-[#EF4444] shadow-[0_0_8px_#EF4444]"
                    : "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]";
                const valColor =
                  m.color === "yellow"
                    ? "text-[#F59E0B]"
                    : m.color === "red"
                    ? "text-[#EF4444]"
                    : m.color === "blue"
                    ? "text-[#3B82F6]"
                    : "text-[#F1F5F9]";

                return (
                  <div
                    key={i}
                    className="p-3 rounded-[3px] bg-white/[0.02] border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                      <span className="text-xs text-[#F1F5F9] font-ibm-plex font-medium">
                        {m.label}
                      </span>
                    </div>
                    <span className={`font-jetbrains text-sm font-semibold ${valColor}`}>
                      {m.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-400/10 space-y-2">
            <div className="text-[11px] font-ibm-plex text-[#94A3B8] flex justify-between">
              <span>{currentView.bottom.label}</span>
              <strong className="text-[#F1F5F9] font-jetbrains">{currentView.bottom.value}</strong>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#3B82F6] h-full rounded-full transition-all duration-500"
                style={{ width: currentView.bottom.progress }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
