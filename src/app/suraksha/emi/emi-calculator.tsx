"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Sparkles, CheckCircle2, ShieldCheck, Building2 } from "lucide-react";

const CONFIGURATIONS = [
  { label: "6-wheeler", desc: "2 Axles · 6 Tyre Sensors" },
  { label: "10-wheeler (Most Popular)", desc: "3 Axles · 10 Tyre Sensors" },
  { label: "12-wheeler", desc: "4 Axles · 12 Tyre Sensors" },
  { label: "14-wheeler", desc: "4-5 Axles · 14 Tyre Sensors" },
  { label: "16-wheeler", desc: "5 Axles · 16 Tyre Sensors" },
  { label: "18-wheeler", desc: "Prime Mover + Trailer · 18 Tyre Sensors" },
];

const TENURES = [
  { months: 3, label: "3 months", isZeroCost: false },
  { months: 6, label: "6 months", isZeroCost: false },
  { months: 9, label: "9 months (Zero-Cost EMI)", isZeroCost: true },
  { months: 12, label: "12 months", isZeroCost: false },
  { months: 18, label: "18 months", isZeroCost: false },
  { months: 24, label: "24 months", isZeroCost: false },
];

export function SurakshaEmiCalculator() {
  const [selectedConfigIndex, setSelectedConfigIndex] = useState(1); // 10-wheeler default
  const [selectedTenureMonths, setSelectedTenureMonths] = useState(9); // 9-month default (zero cost)
  const [downPaymentScheme, setDownPaymentScheme] = useState("zero");
  const [customAmount, setCustomAmount] = useState<string>("");

  const selectedConfig = CONFIGURATIONS[selectedConfigIndex];
  const selectedTenure = TENURES.find((t) => t.months === selectedTenureMonths) || TENURES[2];

  // Optional calculation if customer enters their own custom amount
  const parsedCustomAmount = parseFloat(customAmount.replace(/[^0-9.]/g, "")) || 0;
  let customMonthlyEmi = 0;
  if (parsedCustomAmount > 0) {
    if (selectedTenure.isZeroCost) {
      customMonthlyEmi = Math.round(parsedCustomAmount / selectedTenure.months);
    } else {
      const monthlyRate = 0.01;
      const n = selectedTenure.months;
      const factor = Math.pow(1 + monthlyRate, n);
      customMonthlyEmi = Math.round((parsedCustomAmount * monthlyRate * factor) / (factor - 1));
    }
  }

  return (
    <div className="p-8 sm:p-12 rounded-lg bg-[#FEF3C7] border-3 border-[#DC2626] shadow-xl max-w-4xl space-y-8 w-full">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-[4px] bg-[#DC2626]/10 border border-[#DC2626]/30 flex items-center justify-center text-[#DC2626]">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase">
            EXPLORE EMI PLANS
          </h3>
          <p className="text-xs font-semibold text-[#78350F]">
            Bajaj Finance financing plans &amp; tenure options
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Configuration Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Select truck configuration
            </label>
            <select
              value={selectedConfigIndex}
              onChange={(e) => setSelectedConfigIndex(Number(e.target.value))}
              className="w-full px-4 py-3.5 rounded-[4px] bg-[#FFFBEB] border-2 border-[#451A03]/20 text-[#451A03] font-rubik font-semibold text-sm focus:border-[#DC2626] focus:outline-none transition-colors"
            >
              {CONFIGURATIONS.map((config, idx) => (
                <option key={config.label} value={idx}>
                  {config.label} — {config.desc}
                </option>
              ))}
            </select>
          </div>

          {/* Tenure Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Select repayment tenure
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

          {/* Down Payment Scheme */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Down payment option
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDownPaymentScheme("zero")}
                className={`px-3.5 py-3 rounded-[4px] border-2 font-rubik text-xs font-bold transition-all text-left ${
                  downPaymentScheme === "zero"
                    ? "bg-[#DC2626] border-[#DC2626] text-[#FEF3C7] shadow-sm"
                    : "bg-[#FFFBEB] border-[#451A03]/20 text-[#451A03] hover:border-[#DC2626]"
                }`}
              >
                Zero Down Payment
                <span className="block text-[10px] font-normal opacity-90 mt-0.5">
                  0% initial payment
                </span>
              </button>
              <button
                type="button"
                onClick={() => setDownPaymentScheme("standard")}
                className={`px-3.5 py-3 rounded-[4px] border-2 font-rubik text-xs font-bold transition-all text-left ${
                  downPaymentScheme === "standard"
                    ? "bg-[#DC2626] border-[#DC2626] text-[#FEF3C7] shadow-sm"
                    : "bg-[#FFFBEB] border-[#451A03]/20 text-[#451A03] hover:border-[#DC2626]"
                }`}
              >
                Standard Option
                <span className="block text-[10px] font-normal opacity-90 mt-0.5">
                  10-20% initial payment
                </span>
              </button>
            </div>
          </div>

          {/* Customer-entered Custom Amount Calculator (Optional) */}
          <div className="pt-2 border-t border-[#451A03]/10 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Custom invoice estimate (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter dealer quote amount to calculate EMI"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-[4px] bg-[#FFFBEB] border-2 border-[#451A03]/20 text-[#451A03] font-rubik text-xs focus:border-[#DC2626] focus:outline-none transition-colors"
            />
            {parsedCustomAmount > 0 && (
              <p className="text-xs font-semibold text-[#047857]">
                Calculated instalment: ~₹{customMonthlyEmi.toLocaleString("en-IN")}/month ({selectedTenureMonths} months)
              </p>
            )}
          </div>
        </div>

        {/* Selected Plan Summary Card */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626] flex flex-col justify-between space-y-6 shadow-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-rubik text-xs font-bold uppercase tracking-wider text-[#78350F]">
                EMI Plan Details
              </span>
              {selectedTenure.isZeroCost ? (
                <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#047857] border border-[#10B981]/30 font-rubik text-[11px] font-bold">
                  Zero-Cost EMI Plan
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-[#EA580C]/15 text-[#EA580C] border border-[#EA580C]/30 font-rubik text-[11px] font-bold">
                  Flexible Financing
                </span>
              )}
            </div>

            <div>
              <div className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase">
                {selectedConfig.label}
              </div>
              <p className="text-xs font-semibold text-[#DC2626] mt-1">
                {selectedTenure.label} · {downPaymentScheme === "zero" ? "Zero Down Payment" : "Standard Down Payment"}
              </p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-[#451A03]/10 text-xs text-[#78350F]">
              <div className="flex items-center gap-2 text-[#451A03] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Partner: Bajaj Finance</span>
              </div>
              <div className="flex items-center gap-2 text-[#451A03] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Instant approval at 400+ Truck Wheels centres</span>
              </div>
              <div className="flex items-center gap-2 text-[#451A03] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Documentation: Aadhar + Truck RC only</span>
              </div>
              <div className="flex items-center gap-2 text-[#451A03] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>Official JK Tyre warranty pre-registered</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/suraksha/emi/apply?config=${encodeURIComponent(selectedConfig.label)}&tenure=${selectedTenureMonths}`}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] active:scale-[0.98]"
            >
              Apply for EMI Plan <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
