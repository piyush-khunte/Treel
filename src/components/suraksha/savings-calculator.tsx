"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Calculator, IndianRupee, Sparkles, TrendingUp, RefreshCw } from "lucide-react";

interface TruckConfig {
  id: string;
  name: string;
  wheels: number;
  kitCost: number;
  defaultMonthlyKm: number;
  defaultFuelExpense: number;
  defaultTyreExpense: number;
}

const TRUCK_CONFIGS: TruckConfig[] = [
  {
    id: "6-wheeler",
    name: "6-Wheeler (2 Axles)",
    wheels: 6,
    kitCost: 14000,
    defaultMonthlyKm: 8000,
    defaultFuelExpense: 65000,
    defaultTyreExpense: 80000,
  },
  {
    id: "10-wheeler",
    name: "10-Wheeler (3 Axles)",
    wheels: 10,
    kitCost: 22000,
    defaultMonthlyKm: 12000,
    defaultFuelExpense: 95000,
    defaultTyreExpense: 140000,
  },
  {
    id: "12-wheeler",
    name: "12-Wheeler (4 Axles)",
    wheels: 12,
    kitCost: 26000,
    defaultMonthlyKm: 14000,
    defaultFuelExpense: 115000,
    defaultTyreExpense: 180000,
  },
  {
    id: "14-wheeler",
    name: "14-Wheeler (4–5 Axles)",
    wheels: 14,
    kitCost: 30000,
    defaultMonthlyKm: 16000,
    defaultFuelExpense: 135000,
    defaultTyreExpense: 220000,
  },
  {
    id: "16-wheeler",
    name: "16-Wheeler (5 Axles)",
    wheels: 16,
    kitCost: 34000,
    defaultMonthlyKm: 18000,
    defaultFuelExpense: 155000,
    defaultTyreExpense: 260000,
  },
  {
    id: "18-wheeler",
    name: "18-Wheeler (Multi-Axle Trailer)",
    wheels: 18,
    kitCost: 38000,
    defaultMonthlyKm: 20000,
    defaultFuelExpense: 180000,
    defaultTyreExpense: 320000,
  },
];

export function SavingsCalculator() {
  const [selectedConfigId, setSelectedConfigId] = useState<string>("10-wheeler");
  const [monthlyKm, setMonthlyKm] = useState<number>(12000);
  const [fuelExpense, setFuelExpense] = useState<number>(95000);
  const [tyreExpense, setTyreExpense] = useState<number>(140000);
  const [roadsideEvents, setRoadsideEvents] = useState<number>(1);
  const [calculated, setCalculated] = useState<boolean>(true);

  const selectedConfig = TRUCK_CONFIGS.find((c) => c.id === selectedConfigId) || TRUCK_CONFIGS[1];

  const handleConfigChange = (configId: string) => {
    setSelectedConfigId(configId);
    const cfg = TRUCK_CONFIGS.find((c) => c.id === configId);
    if (cfg) {
      setMonthlyKm(cfg.defaultMonthlyKm);
      setFuelExpense(cfg.defaultFuelExpense);
      setTyreExpense(cfg.defaultTyreExpense);
    }
  };

  // Calculations
  // 1. Fuel savings: 5.5% average savings from properly inflated tyres
  const monthlyFuelSavings = Math.round(fuelExpense * 0.055);

  // 2. Tyre savings: 6% extended life of annual tyre expense / 12
  const monthlyTyreSavings = Math.round((tyreExpense * 0.06) / 12);

  // 3. Roadside downtime avoidance: Avg ₹20,000 direct & indirect savings per roadside blowout avoided
  const annualDowntimeSavings = roadsideEvents * 20000;
  const monthlyDowntimeSavings = Math.round(annualDowntimeSavings / 12);

  // Total monthly savings
  const totalMonthlySavings = monthlyFuelSavings + monthlyTyreSavings + monthlyDowntimeSavings;
  const annualTotalSavings = totalMonthlySavings * 12;

  // Payback period (in months)
  const paybackMonths = Math.max(1, Math.round((selectedConfig.kitCost / totalMonthlySavings) * 10) / 10);

  // 3-Year Net Savings (36 months total savings minus kit investment)
  const threeYearNetSavings = Math.max(0, Math.round(totalMonthlySavings * 36 - selectedConfig.kitCost));

  const formatRupee = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const truckConfigSelectId = useId();
  const monthlyKmInputId = useId();
  const fuelExpenseInputId = useId();
  const tyreExpenseInputId = useId();
  const roadsideEventsSelectId = useId();

  return (
    <div className="space-y-10">
      {/* Form Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FEF3C7] border-2 border-[#451A03]/20 shadow-md space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#451A03]/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
            <Calculator className="w-4 h-4" />
            <span>Interactive ROI Estimator</span>
          </div>
          <button
            type="button"
            onClick={() => handleConfigChange(selectedConfigId)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#78350F] hover:text-[#DC2626] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to defaults</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Truck Configuration */}
          <div className="space-y-2">
            <label htmlFor={truckConfigSelectId} className="block text-xs font-bold uppercase tracking-wider text-[#451A03]">
              Truck Configuration
            </label>
            <select
              id={truckConfigSelectId}
              value={selectedConfigId}
              onChange={(e) => handleConfigChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/20 text-[#451A03] font-bold text-sm focus:outline-none focus:border-[#DC2626] transition-colors"
            >
              {TRUCK_CONFIGS.map((cfg) => (
                <option key={cfg.id} value={cfg.id}>
                  {cfg.name} · {formatRupee(cfg.kitCost)} kit
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#78350F]">
              {selectedConfig.wheels} wheel sensors + in-cab driver display unit.
            </p>
          </div>

          {/* Monthly Kilometres */}
          <div className="space-y-2">
            <label htmlFor={monthlyKmInputId} className="block text-xs font-bold uppercase tracking-wider text-[#451A03]">
              Monthly Running (km)
            </label>
            <input
              id={monthlyKmInputId}
              type="number"
              min={2000}
              max={50000}
              step={500}
              value={monthlyKm}
              onChange={(e) => setMonthlyKm(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-3 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/20 text-[#451A03] font-bold text-sm focus:outline-none focus:border-[#DC2626] transition-colors"
            />
            <p className="text-[11px] text-[#78350F]">
              Typical long-haul average: 10,000 – 18,000 km/month.
            </p>
          </div>

          {/* Monthly Fuel Expense */}
          <div className="space-y-2">
            <label htmlFor={fuelExpenseInputId} className="block text-xs font-bold uppercase tracking-wider text-[#451A03]">
              Current Fuel Expense per Month (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#78350F]">₹</span>
              <input
                id={fuelExpenseInputId}
                type="number"
                min={10000}
                max={500000}
                step={5000}
                value={fuelExpense}
                onChange={(e) => setFuelExpense(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-3 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/20 text-[#451A03] font-bold text-sm focus:outline-none focus:border-[#DC2626] transition-colors"
              />
            </div>
            <p className="text-[11px] text-[#78350F]">
              Suraksha delivers 5%–6% diesel savings via accurate pressure.
            </p>
          </div>

          {/* Annual Tyre Expense */}
          <div className="space-y-2">
            <label htmlFor={tyreExpenseInputId} className="block text-xs font-bold uppercase tracking-wider text-[#451A03]">
              Current Tyre Expense per Year (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#78350F]">₹</span>
              <input
                id={tyreExpenseInputId}
                type="number"
                min={20000}
                max={1000000}
                step={10000}
                value={tyreExpense}
                onChange={(e) => setTyreExpense(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-3 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/20 text-[#451A03] font-bold text-sm focus:outline-none focus:border-[#DC2626] transition-colors"
              />
            </div>
            <p className="text-[11px] text-[#78350F]">
              Even tyre wear yields 5%–7% longer casing and tread life.
            </p>
          </div>

          {/* Roadside Incidents */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor={roadsideEventsSelectId} className="block text-xs font-bold uppercase tracking-wider text-[#451A03]">
              Roadside Tyre Incidents / Blowouts per Year
            </label>
            <select
              id={roadsideEventsSelectId}
              value={roadsideEvents}
              onChange={(e) => setRoadsideEvents(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/20 text-[#451A03] font-bold text-sm focus:outline-none focus:border-[#DC2626] transition-colors"
            >
              <option value={0}>0 incidents (preventative peace of mind)</option>
              <option value={1}>1 incident avoided per year (₹20,000 saved)</option>
              <option value={2}>2 incidents avoided per year (₹40,000 saved)</option>
              <option value={3}>3 incidents avoided per year (₹60,000 saved)</option>
              <option value={4}>4+ incidents avoided per year (₹80,000+ saved)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-[#451A03]/10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setCalculated(true)}
            className="px-6 py-3.5 rounded-[4px] font-rubik font-bold text-sm shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Recalculate Payback</span>
          </button>
          <Link
            href="/suraksha/emi"
            className="px-6 py-3.5 rounded-[4px] font-rubik font-bold text-sm border-2 border-[#DC2626] text-[#DC2626] bg-[#FEF3C7] hover:bg-[#DC2626]/10 transition-all flex items-center gap-2"
          >
            <span>Explore 0% EMI Options</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Result Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl text-[#451A03]">
            Estimated Savings & Payback Summary
          </h3>
          <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626] bg-[#DC2626]/10 px-3 py-1 rounded-full">
            Live Calculation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Configuration */}
          <div className="p-6 rounded-xl bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#78350F]">
                Hardware Kit Selected
              </span>
              <h4 className="font-anton uppercase tracking-wide text-xl text-[#451A03] mt-1">
                {selectedConfig.name}
              </h4>
            </div>
            <p className="font-anton text-2xl text-[#DC2626]">
              {formatRupee(selectedConfig.kitCost)}
            </p>
            <div className="pt-2 border-t border-[#451A03]/10 text-xs text-[#78350F]">
              Includes {selectedConfig.wheels} wireless sensors + in-cab display + 3-year warranty.
            </div>
          </div>

          {/* Card 2: Fuel Savings */}
          <div className="p-6 rounded-xl bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#78350F]">
                Estimated Fuel Savings
              </span>
              <h4 className="font-anton uppercase tracking-wide text-xl text-[#451A03] mt-1">
                5.5% Monthly Fuel Cut
              </h4>
            </div>
            <p className="font-anton text-2xl text-[#DC2626]">
              {formatRupee(monthlyFuelSavings)} <span className="text-sm font-sans font-normal text-[#78350F]">/ month</span>
            </p>
            <div className="pt-2 border-t border-[#451A03]/10 text-xs text-[#78350F]">
              Annual fuel savings: <strong className="text-[#451A03]">{formatRupee(monthlyFuelSavings * 12)}</strong>
            </div>
          </div>

          {/* Card 3: Tyre Life Savings */}
          <div className="p-6 rounded-xl bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#78350F]">
                Tyre Life Extension
              </span>
              <h4 className="font-anton uppercase tracking-wide text-xl text-[#451A03] mt-1">
                6% Extended Mileage
              </h4>
            </div>
            <p className="font-anton text-2xl text-[#DC2626]">
              {formatRupee(monthlyTyreSavings)} <span className="text-sm font-sans font-normal text-[#78350F]">/ month</span>
            </p>
            <div className="pt-2 border-t border-[#451A03]/10 text-xs text-[#78350F]">
              Annual tyre savings: <strong className="text-[#451A03]">{formatRupee(monthlyTyreSavings * 12)}</strong>
            </div>
          </div>

          {/* Card 4: Downtime Avoidance */}
          <div className="p-6 rounded-xl bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#78350F]">
                Downtime Avoidance
              </span>
              <h4 className="font-anton uppercase tracking-wide text-xl text-[#451A03] mt-1">
                Roadside Blowout Protection
              </h4>
            </div>
            <p className="font-anton text-2xl text-[#0891B2]">
              {formatRupee(annualDowntimeSavings)} <span className="text-sm font-sans font-normal text-[#78350F]">/ year</span>
            </p>
            <div className="pt-2 border-t border-[#451A03]/10 text-xs text-[#78350F]">
              {roadsideEvents} emergency towing & roadside incident(s) avoided annually.
            </div>
          </div>

          {/* Card 5: Payback Period (Highlighted) */}
          <div className="p-6 rounded-xl bg-[#FFFBEB] border-3 border-[#DC2626] shadow-md space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626]">
                Estimated Payback Period
              </span>
              <h4 className="font-anton uppercase tracking-wide text-xl text-[#DC2626] mt-1">
                Full Investment Recovery
              </h4>
            </div>
            <p className="font-anton text-3xl text-[#DC2626]">
              {paybackMonths} Months
            </p>
            <div className="pt-2 border-t border-[#451A03]/10 text-xs text-[#78350F]">
              Total monthly value: <strong className="text-[#451A03]">{formatRupee(totalMonthlySavings)}/mo</strong>
            </div>
          </div>

          {/* Card 6: 3-Year Net Profit */}
          <div className="p-6 rounded-xl bg-[#FFFBEB] border-2 border-[#0891B2] shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0891B2]">
                3-Year Net Profit (Warranty Period)
              </span>
              <h4 className="font-anton uppercase tracking-wide text-xl text-[#451A03] mt-1">
                Pure Operating Profit
              </h4>
            </div>
            <p className="font-anton text-3xl text-[#0891B2]">
              {formatRupee(threeYearNetSavings)}
            </p>
            <div className="pt-2 border-t border-[#451A03]/10 text-xs text-[#78350F]">
              Net cumulative profit after deducting entire Suraksha hardware cost.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
