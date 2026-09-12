"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Sparkles, CheckCircle2 } from "lucide-react";

const CONFIGURATIONS = [
  { label: "6-wheeler", price: 10500 },
  { label: "10-wheeler (most popular)", price: 17500 },
  { label: "12-wheeler", price: 21000 },
  { label: "14-wheeler", price: 24500 },
  { label: "16-wheeler", price: 28000 },
  { label: "18-wheeler", price: 31500 },
];

const TENURES = [
  { months: 3, label: "3 months", isZeroCost: false },
  { months: 6, label: "6 months", isZeroCost: false },
  { months: 9, label: "9 months (zero-cost EMI)", isZeroCost: true },
  { months: 12, label: "12 months", isZeroCost: false },
  { months: 18, label: "18 months", isZeroCost: false },
  { months: 24, label: "24 months", isZeroCost: false },
];

export function SurakshaEmiCalculator() {
  const [selectedConfigIndex, setSelectedConfigIndex] = useState(1); // 10-wheeler default
  const [selectedTenureMonths, setSelectedTenureMonths] = useState(9); // 9-month default (zero cost)
  const [downPaymentPercent, setDownPaymentPercent] = useState(0);

  const selectedConfig = CONFIGURATIONS[selectedConfigIndex];
  const selectedTenure = TENURES.find((t) => t.months === selectedTenureMonths) || TENURES[2];

  const kitPrice = selectedConfig.price;
  const downPaymentAmount = Math.round((kitPrice * downPaymentPercent) / 100);
  const principal = kitPrice - downPaymentAmount;

  let monthlyEmi = 0;
  let totalInterest = 0;
  let totalAmountPayable = 0;

  if (selectedTenure.isZeroCost) {
    monthlyEmi = Math.round(principal / selectedTenure.months);
    totalInterest = 0;
    totalAmountPayable = kitPrice;
  } else {
    // 12% per annum = 1% per month
    const monthlyRate = 0.01;
    const n = selectedTenure.months;
    const factor = Math.pow(1 + monthlyRate, n);
    monthlyEmi = Math.round((principal * monthlyRate * factor) / (factor - 1));
    totalInterest = Math.round(monthlyEmi * n - principal);
    totalAmountPayable = downPaymentAmount + monthlyEmi * n;
  }

  return (
    <div className="p-8 sm:p-12 rounded-lg bg-[#FEF3C7] border-3 border-[#DC2626] shadow-xl max-w-4xl space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-[4px] bg-[#DC2626]/10 border border-[#DC2626]/30 flex items-center justify-center text-[#DC2626]">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase">
            CALCULATE YOUR EMI
          </h3>
          <p className="text-xs font-semibold text-[#78350F]">
            Bajaj Finance instantaneous calculation engine
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Configuration Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Kit configuration
            </label>
            <select
              value={selectedConfigIndex}
              onChange={(e) => setSelectedConfigIndex(Number(e.target.value))}
              className="w-full px-4 py-3.5 rounded-[4px] bg-[#FFFBEB] border-2 border-[#451A03]/20 text-[#451A03] font-rubik font-semibold text-sm focus:border-[#DC2626] focus:outline-none transition-colors"
            >
              {CONFIGURATIONS.map((config, idx) => (
                <option key={config.label} value={idx}>
                  {config.label} — ₹{config.price.toLocaleString("en-IN")}
                </option>
              ))}
            </select>
          </div>

          {/* Tenure Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Tenure
            </label>
            <select
              value={selectedTenureMonths}
              onChange={(e) => setSelectedTenureMonths(Number(e.target.value))}
              className="w-full px-4 py-3.5 rounded-[4px] bg-[#FFFBEB] border-2 border-[#451A03]/20 text-[#451A03] font-rubik font-semibold text-sm focus:border-[#DC2626] focus:outline-none transition-colors"
            >
              {TENURES.map((tenure) => (
                <option key={tenure.months} value={tenure.months}>
                  {tenure.label}
                </option>
              ))}
            </select>
          </div>

          {/* Down Payment Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#78350F]">
              <span>Down payment ({downPaymentPercent}%)</span>
              <span className="text-[#DC2626] font-mono">
                ₹{downPaymentAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-[#451A03]/20 rounded-lg appearance-none cursor-pointer accent-[#DC2626]"
            />
            <div className="flex justify-between text-[11px] text-[#78350F]">
              <span>0% (Zero Down Payment)</span>
              <span>50%</span>
            </div>
          </div>
        </div>

        {/* Calculated Result Card */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626] flex flex-col justify-between space-y-6 shadow-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-rubik text-xs font-bold uppercase tracking-wider text-[#78350F]">
                Monthly EMI
              </span>
              {selectedTenure.isZeroCost && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#047857] border border-[#10B981]/30 font-rubik text-[11px] font-bold">
                  Zero-Cost EMI
                </span>
              )}
            </div>

            <div className="font-anton text-4xl sm:text-5xl font-normal text-[#DC2626]">
              ₹{monthlyEmi.toLocaleString("en-IN")}
              <span className="font-rubik text-base text-[#78350F] font-semibold ml-1">
                /month
              </span>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#451A03]/10 text-xs text-[#78350F]">
              <div className="flex justify-between">
                <span>Total interest:</span>
                <span className="font-mono font-bold text-[#451A03]">
                  ₹{totalInterest.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total amount payable:</span>
                <span className="font-mono font-bold text-[#451A03]">
                  ₹{totalAmountPayable.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Processing fee:</span>
                <span className="font-semibold text-[#451A03]">
                  As per Bajaj Finance terms
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/suraksha/emi/apply?config=${encodeURIComponent(selectedConfig.label)}&tenure=${selectedTenureMonths}`}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] active:scale-[0.98]"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
