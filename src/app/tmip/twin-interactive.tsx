"use client";

import { useState } from "react";
import { Activity, Cpu, Disc, Fuel, Zap, GitCommit, ShieldAlert, Sliders } from "lucide-react";

interface SystemItem {
  id: string;
  name: string;
  icon: React.ElementType;
  count: string;
}

const systems: SystemItem[] = [
  { id: "all", name: "All Systems", icon: Sliders, count: "1,847 nodes" },
  { id: "engine", name: "Engine", icon: Cpu, count: "98.4% health" },
  { id: "tyres", name: "Tyres", icon: Disc, count: "18/18 active" },
  { id: "fuel", name: "Fuel System", icon: Fuel, count: "3.4 km/L avg" },
  { id: "electrical", name: "Electrical", icon: Zap, count: "24.2V stable" },
  { id: "driveline", name: "Driveline", icon: GitCommit, count: "Nominal" },
  { id: "brakes", name: "Brakes", icon: ShieldAlert, count: "82% pad life" },
  { id: "suspension", name: "Suspension", icon: Activity, count: "Calibrated" },
];

export function TwinInteractive() {
  const [selectedSystem, setSelectedSystem] = useState("all");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-6 lg:p-8 shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Sidebar system selector */}
        <div className="lg:col-span-3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#94A3B8] uppercase font-semibold mb-4 flex items-center justify-between">
              <span>System View</span>
              <span className="inline-flex items-center gap-1 text-[#10B981] text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                LIVE
              </span>
            </div>
            <div className="space-y-1.5">
              {systems.map((s) => {
                const Icon = s.icon;
                const isActive = selectedSystem === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSystem(s.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-ibm flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-[#F1F5F9] font-medium shadow-sm"
                        : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.03] border border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isActive ? "bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" : "bg-white/20"
                        }`}
                      />
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#3B82F6]" : "text-[#64748B]"}`} />
                      <span>{s.name}</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#64748B]">{s.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-[#64748B] font-mono">
            Telemetry latency: <span className="text-[#10B981]">180ms</span> · 5G Edge
          </div>
        </div>

        {/* Central visualization (truck rendered with sensor overlay dots) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[300px] lg:min-h-[360px] bg-[#050A17]/70 rounded-xl border border-white/5 p-4 sm:p-8">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="w-full max-w-[480px] relative">
            <svg viewBox="0 0 500 250" className="w-full h-auto drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="glow-twin" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Truck Wireframe Body */}
              <g stroke="#3B82F6" strokeWidth="1.4" fill="none" opacity="0.85">
                {/* Cab */}
                <rect x="30" y="75" width="220" height="110" rx="4" />
                {/* Trailer */}
                <rect x="270" y="55" width="170" height="130" rx="6" />
                {/* Horizontal internal structural lines */}
                <line x1="270" y1="90" x2="440" y2="90" strokeDasharray="3 3" opacity="0.6" />
                <line x1="270" y1="135" x2="440" y2="135" strokeDasharray="3 3" opacity="0.6" />
                <line x1="270" y1="170" x2="440" y2="170" strokeDasharray="3 3" opacity="0.6" />
                <line x1="30" y1="105" x2="250" y2="105" opacity="0.6" />
                <line x1="30" y1="140" x2="250" y2="140" strokeDasharray="2 2" opacity="0.4" />
                <line x1="30" y1="170" x2="250" y2="170" opacity="0.6" />
                {/* Cab divider */}
                <line x1="150" y1="75" x2="150" y2="185" opacity="0.5" />
                {/* Coupling link */}
                <line x1="250" y1="150" x2="270" y2="150" strokeWidth="2.5" stroke="#F59E0B" />
              </g>

              {/* Wheels / Tyres outer rings with sensor glows */}
              <g fill="#F59E0B" opacity="0.9" filter="url(#glow-twin)">
                <circle cx="70" cy="205" r="18" />
                <circle cx="175" cy="205" r="18" />
                <circle cx="330" cy="205" r="18" />
                <circle cx="395" cy="205" r="18" />
              </g>

              {/* Tyre Hubs */}
              <g fill="#050A17" stroke="#3B82F6" strokeWidth="1.2">
                <circle cx="70" cy="205" r="10" />
                <circle cx="175" cy="205" r="10" />
                <circle cx="330" cy="205" r="10" />
                <circle cx="395" cy="205" r="10" />
              </g>

              {/* Central TPMS Sensor Status Dots */}
              <g fill="#10B981">
                <circle cx="70" cy="205" r="5" />
                <circle cx="175" cy="205" r="5" />
                <circle cx="330" cy="205" r="5" />
                <circle cx="395" cy="205" r="5" />
              </g>

              {/* Internal Diagnostic Nodes */}
              <g fill="#3B82F6" opacity="0.85">
                <circle cx="90" cy="130" r="4" />
                <circle cx="200" cy="130" r="4" />
                <circle cx="350" cy="95" r="4" />
                <circle cx="410" cy="95" r="4" />
                <circle cx="350" cy="150" r="4" />
                <circle cx="410" cy="150" r="4" />
              </g>

              {/* Active Highlights according to selected system */}
              {(selectedSystem === "all" || selectedSystem === "engine") && (
                <g>
                  <rect
                    x="35"
                    y="115"
                    width="65"
                    height="50"
                    fill="#F59E0B"
                    opacity="0.25"
                    rx="3"
                  />
                  <text x="38" y="110" fill="#F59E0B" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    CAN: ECU-01
                  </text>
                </g>
              )}

              {(selectedSystem === "all" || selectedSystem === "tyres") && (
                <g>
                  <circle cx="70" cy="205" r="22" stroke="#10B981" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
                  <circle cx="175" cy="205" r="22" stroke="#10B981" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
                  <circle cx="330" cy="205" r="22" stroke="#10B981" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
                  <circle cx="395" cy="205" r="22" stroke="#10B981" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
                </g>
              )}

              {selectedSystem === "fuel" && (
                <g>
                  <rect x="180" y="145" width="55" height="35" fill="#3B82F6" opacity="0.3" rx="2" />
                  <text x="180" y="140" fill="#3B82F6" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    FUEL FLOW
                  </text>
                </g>
              )}
            </svg>

            <div className="mt-4 flex items-center justify-between px-2 text-[11px] font-mono text-[#94A3B8]">
              <span>VIN: <strong className="text-[#F1F5F9]">MH-12-TR-9418</strong></span>
              <span className="text-[#3B82F6]">18-WHEELER TRACTOR</span>
              <span className="text-[#10B981]">OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Right legend (Status label + counts: Excellent 247, Good 1,584, Warning 14, Critical 2) */}
        <div className="lg:col-span-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-6">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#94A3B8] uppercase font-semibold mb-4">
              Status
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                  <span className="text-xs text-[#F1F5F9] font-medium">Excellent</span>
                </div>
                <span className="font-mono text-sm font-semibold text-[#F1F5F9]">247</span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
                  <span className="text-xs text-[#F1F5F9] font-medium">Good</span>
                </div>
                <span className="font-mono text-sm font-semibold text-[#F1F5F9]">1,584</span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
                  <span className="text-xs text-[#F1F5F9] font-medium">Warning</span>
                </div>
                <span className="font-mono text-sm font-semibold text-[#F59E0B]">14</span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
                  <span className="text-xs text-[#F1F5F9] font-medium">Critical</span>
                </div>
                <span className="font-mono text-sm font-semibold text-[#EF4444]">2</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
            <div className="text-[11px] text-[#94A3B8] flex justify-between">
              <span>Active Twin Coverage:</span>
              <strong className="text-[#F1F5F9] font-mono">1,847 / 1,847</strong>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#3B82F6] h-full rounded-full" style={{ width: "99.1%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
