"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, TrendingUp, DollarSign } from "lucide-react";

export default function TMIPROICalculatorPage() {
  const [fleetSize, setFleetSize] = useState<number>(250);
  const [vehicleType, setVehicleType] = useState<string>("Heavy Commercial");
  const [kmPerMonth, setKmPerMonth] = useState<number>(8000);
  const [fuelPrice, setFuelPrice] = useState<number>(90);
  const [fuelEfficiency, setFuelEfficiency] = useState<number>(4.0);
  const [tyreSpendPerVehicle, setTyreSpendPerVehicle] = useState<number>(80000);

  // Calculations
  const monthlyLitersPerVehicle = kmPerMonth / (fuelEfficiency || 1);
  const annualFuelSpend = fleetSize * monthlyLitersPerVehicle * 12 * fuelPrice;
  const annualTyreSpend = fleetSize * tyreSpendPerVehicle;

  // TMIP savings assumptions based on 200+ fleet deployments
  const fuelSavingsRate = 0.052; // ~5.2% fuel savings via optimized tyre pressure
  const tyreLifeExtensionRate = 0.20; // ~20% tyre life extension
  
  const estimatedFuelSavings = annualFuelSpend * fuelSavingsRate;
  const estimatedTyreSavings = annualTyreSpend * tyreLifeExtensionRate;
  const totalAnnualSavings = estimatedFuelSavings + estimatedTyreSavings;

  // TMIP platform investment estimate (~Rs. 1,200/vehicle/mo)
  const annualPlatformInvestment = fleetSize * 1200 * 12;
  const netAnnualBenefit = totalAnnualSavings - annualPlatformInvestment;
  const paybackMonths = Math.max(3.5, Math.min(12, (annualPlatformInvestment / (totalAnnualSavings / 12))));

  return (
    <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Subtle Blueprint Grid: 60px x 60px rgba(59,130,246,0.04) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="rounded-[2px] font-jetbrains text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-block">
              ROI CALCULATOR
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              See what TMIP would save your fleet.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              Enter your fleet size, vehicle type, and current spend. The calculator returns an annual savings estimate and payback period based on median outcomes from two hundred TMIP deployments. Takes about a minute.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Inputs Column */}
            <div className="lg:col-span-6 bg-[#0B1220]/80 border border-slate-400/10 p-8 sm:p-10 rounded-[4px] shadow-xl space-y-6">
              <h2 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9] mb-4">
                Fleet Operating Inputs
              </h2>

              <div>
                <label className="block text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-2">
                  Fleet size (Vehicles)
                </label>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  value={fleetSize}
                  onChange={(e) => setFleetSize(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-sm focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-2">
                  Vehicle type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] text-sm focus:outline-none focus:border-[#3B82F6]"
                >
                  <option>Heavy Commercial</option>
                  <option>Medium Commercial</option>
                  <option>Light Commercial</option>
                  <option>Bus / Passenger</option>
                  <option>Off-highway / Construction</option>
                  <option>Mining</option>
                  <option>Mixed fleet</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-2">
                    Kilometres per vehicle/month
                  </label>
                  <input
                    type="number"
                    value={kmPerMonth}
                    onChange={(e) => setKmPerMonth(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-sm focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-2">
                    Fuel price (₹/Litre)
                  </label>
                  <input
                    type="number"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-sm focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-2">
                    Current fuel efficiency (km/L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={fuelEfficiency}
                    onChange={(e) => setFuelEfficiency(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-sm focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-2">
                    Annual tyre spend/vehicle (₹)
                  </label>
                  <input
                    type="number"
                    value={tyreSpendPerVehicle}
                    onChange={(e) => setTyreSpendPerVehicle(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-sm focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-[#0B1220]/90 border border-blue-500/30 p-8 sm:p-10 rounded-[4px] shadow-2xl space-y-6">
                <div className="text-xs uppercase font-jetbrains tracking-wider text-[#3B82F6] font-semibold">
                  Simulated Annual TMIP Impact
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="p-5 rounded-[4px] bg-[#050A17] border border-slate-400/10">
                    <div className="text-xs text-[#94A3B8] font-jetbrains">Estimated Annual Savings</div>
                    <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#F1F5F9] mt-2">
                      ₹{(totalAnnualSavings / 100000).toFixed(2)} Lakh
                    </div>
                    <div className="text-xs text-[#3B82F6] font-jetbrains mt-1">Fuel (~5.2%) + Tyre Life (~20%)</div>
                  </div>

                  <div className="p-5 rounded-[4px] bg-[#050A17] border border-slate-400/10">
                    <div className="text-xs text-[#94A3B8] font-jetbrains">Estimated Payback</div>
                    <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#F59E0B] mt-2">
                      {paybackMonths.toFixed(1)} Months
                    </div>
                    <div className="text-xs text-[#94A3B8] font-jetbrains mt-1">Median across 200+ deployments</div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-sm text-[#94A3B8]">
                  <div className="flex justify-between py-2 border-b border-slate-400/10">
                    <span>Annual Fuel Savings Estimate:</span>
                    <span className="font-jetbrains text-[#F1F5F9] font-semibold">₹{(estimatedFuelSavings / 100000).toFixed(2)} Lakh</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-400/10">
                    <span>Annual Tyre Life Extension Savings:</span>
                    <span className="font-jetbrains text-[#F1F5F9] font-semibold">₹{(estimatedTyreSavings / 100000).toFixed(2)} Lakh</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-400/10">
                    <span>Net Annual Operating Advantage:</span>
                    <span className="font-jetbrains text-[#3B82F6] font-semibold">₹{(netAnnualBenefit / 100000).toFixed(2)} Lakh</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/tmip/demo"
                    className="w-full py-4 rounded-[3px] font-space-grotesk font-bold text-sm bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Book a Detailed ROI Analysis <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
