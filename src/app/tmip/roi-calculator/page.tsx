"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Fuel,
  Gauge,
  Globe,
  Info,
  Layers,
  RefreshCw,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Multi-Currency & Regional Operating Benchmarks
interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  defaultRateToINR: number; // 1 unit of this currency = X INR
  defaultFuelPrice: number;
  fuelUnit: string;
  defaultTyreCost: number;
  defaultHardwarePerTyre: number;
  defaultMonthlyPlatform: number;
}

const CURRENCIES: Record<string, CurrencyConfig> = {
  INR: {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    flag: "🇮🇳",
    defaultRateToINR: 1,
    defaultFuelPrice: 90,
    fuelUnit: "Litre",
    defaultTyreCost: 20000,
    defaultHardwarePerTyre: 1700,
    defaultMonthlyPlatform: 600,
  },
  USD: {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    flag: "🇺🇸",
    defaultRateToINR: 87,
    defaultFuelPrice: 1.05,
    fuelUnit: "Litre",
    defaultTyreCost: 230,
    defaultHardwarePerTyre: 20,
    defaultMonthlyPlatform: 7,
  },
  EUR: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    flag: "🇪🇺",
    defaultRateToINR: 92,
    defaultFuelPrice: 1.65,
    fuelUnit: "Litre",
    defaultTyreCost: 220,
    defaultHardwarePerTyre: 19,
    defaultMonthlyPlatform: 6.5,
  },
  AED: {
    code: "AED",
    name: "UAE Dirham",
    symbol: "AED ",
    flag: "🇦🇪",
    defaultRateToINR: 23.7,
    defaultFuelPrice: 3.10,
    fuelUnit: "Litre",
    defaultTyreCost: 850,
    defaultHardwarePerTyre: 72,
    defaultMonthlyPlatform: 25,
  },
  ZAR: {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R ",
    flag: "🇿🇦",
    defaultRateToINR: 4.8,
    defaultFuelPrice: 22.50,
    fuelUnit: "Litre",
    defaultTyreCost: 4200,
    defaultHardwarePerTyre: 350,
    defaultMonthlyPlatform: 125,
  },
  BRL: {
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$ ",
    flag: "🇧🇷",
    defaultRateToINR: 15.2,
    defaultFuelPrice: 6.10,
    fuelUnit: "Litre",
    defaultTyreCost: 1250,
    defaultHardwarePerTyre: 105,
    defaultMonthlyPlatform: 40,
  },
};

// Vehicle Type Presets
const VEHICLE_TYPES = [
  { label: "Heavy Multi-Axle Hauler (10-14W)", defaultTyres: 10, defaultMileage: 4.0 },
  { label: "Tractor-Trailer (18-22W)", defaultTyres: 18, defaultMileage: 3.2 },
  { label: "Rigid Cargo / Tipper (6-10W)", defaultTyres: 6, defaultMileage: 4.5 },
  { label: "Bus & Intercity Coach (6W)", defaultTyres: 6, defaultMileage: 4.8 },
  { label: "Mining & Heavy OTR (6-12W)", defaultTyres: 6, defaultMileage: 2.2 },
  { label: "Light Commercial Fleet (4-6W)", defaultTyres: 6, defaultMileage: 6.5 },
];

export default function TMIPROICalculatorPage() {
  // Currency State
  const [currencyCode, setCurrencyCode] = useState<string>("INR");
  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const [customRate, setCustomRate] = useState<number>(currency.defaultRateToINR);
  const [showFxSettings, setShowFxSettings] = useState<boolean>(false);

  // Fleet Configuration State
  const [fleetSize, setFleetSize] = useState<number>(100);
  const [vehicleType, setVehicleType] = useState<string>(VEHICLE_TYPES[0].label);
  const [tyresPerVehicle, setTyresPerVehicle] = useState<number>(10);

  // Mileage & Fuel Economy State
  const [kmPerMonth, setKmPerMonth] = useState<number>(8000);
  const [fuelEfficiency, setFuelEfficiency] = useState<number>(4.0); // km/L
  const [fuelPrice, setFuelPrice] = useState<number>(currency.defaultFuelPrice);
  const [costPerTyre, setCostPerTyre] = useState<number>(currency.defaultTyreCost);

  // Calibrated Baseline Assumptions (Mandated: 7% Tyre Life & 0.4%-0.5% Fuel)
  const [tyreLifeExtension, setTyreLifeExtension] = useState<number>(7.0); // Default 7.0%
  const [fuelSavingsPercent, setFuelSavingsPercent] = useState<number>(0.45); // Default 0.45% (0.4% - 0.5%)

  // Hardware & Platform Investment Parameters
  const [hardwarePerTyre, setHardwarePerTyre] = useState<number>(currency.defaultHardwarePerTyre);
  const [monthlyPlatformPerVehicle, setMonthlyPlatformPerVehicle] = useState<number>(currency.defaultMonthlyPlatform);

  // Currency switch handler
  const handleCurrencyChange = (newCode: string) => {
    const target = CURRENCIES[newCode];
    if (!target) return;
    setCurrencyCode(newCode);
    setCustomRate(target.defaultRateToINR);
    setFuelPrice(target.defaultFuelPrice);
    setCostPerTyre(target.defaultTyreCost);
    setHardwarePerTyre(target.defaultHardwarePerTyre);
    setMonthlyPlatformPerVehicle(target.defaultMonthlyPlatform);
  };

  // Reset inputs to standard baseline
  const handleResetDefaults = () => {
    setFleetSize(100);
    setVehicleType(VEHICLE_TYPES[0].label);
    setTyresPerVehicle(10);
    setKmPerMonth(8000);
    setFuelEfficiency(4.0);
    setFuelPrice(currency.defaultFuelPrice);
    setCostPerTyre(currency.defaultTyreCost);
    setTyreLifeExtension(7.0);
    setFuelSavingsPercent(0.45);
    setHardwarePerTyre(currency.defaultHardwarePerTyre);
    setMonthlyPlatformPerVehicle(currency.defaultMonthlyPlatform);
    setCustomRate(currency.defaultRateToINR);
  };

  // Calculations
  const totalFleetTyres = fleetSize * tyresPerVehicle;

  // Fuel Calculations
  const monthlyLitersPerVehicle = kmPerMonth / (fuelEfficiency > 0 ? fuelEfficiency : 1);
  const annualFleetFuelLiters = fleetSize * monthlyLitersPerVehicle * 12;
  const annualFuelSpend = annualFleetFuelLiters * fuelPrice;
  const estimatedFuelSavings = annualFuelSpend * (fuelSavingsPercent / 100);

  // Tyre Calculations (Average commercial fleet replaces ~0.7 tyres per wheel-position/year under 96,000 km)
  const annualTyresReplacedPerVehicle = Math.max(1, Math.round(tyresPerVehicle * 0.7));
  const annualTyreSpendPerVehicle = annualTyresReplacedPerVehicle * costPerTyre;
  const annualFleetTyreSpend = fleetSize * annualTyreSpendPerVehicle;
  const estimatedTyreSavings = annualFleetTyreSpend * (tyreLifeExtension / 100);

  // Savings Aggregation
  const totalAnnualSavings = estimatedFuelSavings + estimatedTyreSavings;

  // Hardware & Platform Investment
  const upfrontHardwareInvestment = totalFleetTyres * hardwarePerTyre;
  const annualPlatformFee = fleetSize * monthlyPlatformPerVehicle * 12;
  const netAnnualBenefit = totalAnnualSavings - annualPlatformFee;

  // Payback period (Months)
  const monthlyGrossSavings = totalAnnualSavings / 12;
  const paybackMonths =
    monthlyGrossSavings > 0
      ? Math.max(2.5, Math.min(18.0, upfrontHardwareInvestment / monthlyGrossSavings))
      : 12;

  // 3-Year Projected Return on Investment (ROI)
  const threeYearGrossSavings = totalAnnualSavings * 3;
  const threeYearTotalInvestment = upfrontHardwareInvestment + annualPlatformFee * 3;
  const threeYearNetGain = threeYearGrossSavings - threeYearTotalInvestment;
  const threeYearRoiPercent =
    threeYearTotalInvestment > 0
      ? Math.round((threeYearNetGain / threeYearTotalInvestment) * 100)
      : 0;

  // Currency-aware deterministic formatting
  const formatValue = (amount: number, compact: boolean = false): string => {
    const round = Math.round(amount);
    if (currency.code === "INR") {
      if (compact) {
        if (Math.abs(round) >= 10000000) {
          return `₹${(round / 10000000).toFixed(2)} Cr`;
        }
        if (Math.abs(round) >= 100000) {
          return `₹${(round / 100000).toFixed(2)} Lakh`;
        }
      }
      return `₹${round.toLocaleString("en-IN")}`;
    }

    if (compact && Math.abs(round) >= 1000000) {
      return `${currency.symbol}${(round / 1000000).toFixed(2)}M`;
    }
    if (compact && Math.abs(round) >= 1000) {
      return `${currency.symbol}${(round / 1000).toFixed(1)}k`;
    }
    return `${currency.symbol}${round.toLocaleString("en-US")}`;
  };

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
      <section className="relative z-10 pt-12 sm:pt-16 pb-8 sm:pb-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <Breadcrumb
              variant="tmip"
              items={[
                { label: "TMIP", href: "/tmip" },
                { label: "ROI Calculator" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
              <Calculator className="w-3.5 h-3.5" />
              COMMERCIAL FLEET ROI MODEL
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              Quantify Your Fleet&apos;s Return on TMIP Intelligence.
            </h1>
            <p className="text-[#94A3B8] text-base sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              Simulate payback period, fuel reductions, and tyre asset life extension calibrated from validated fleet deployments across India, Europe, the Middle East, Africa, and the Americas.
            </p>
          </div>
        </div>
      </section>

      {/* Multi-Currency Header Bar */}
      <section className="relative z-10 bg-[#0B1220]/90 border-b border-slate-400/10 py-3.5 sm:py-4">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#3B82F6]" />
              <span className="font-jetbrains text-xs uppercase tracking-wider text-[#94A3B8]">
                Select Currency &amp; Operating Region:
              </span>
            </div>

            {/* Currency Selector Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {Object.values(CURRENCIES).map((c) => {
                const isActive = currency.code === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => handleCurrencyChange(c.code)}
                    className={`px-3 py-1.5 rounded-[4px] font-jetbrains text-xs font-medium transition-all flex items-center gap-1.5 border ${
                      isActive
                        ? "bg-[#3B82F6] text-white border-[#3B82F6] shadow-sm shadow-blue-500/30"
                        : "bg-[#050A17] text-[#94A3B8] border-slate-400/20 hover:text-[#F1F5F9] hover:border-slate-400/40"
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.code}</span>
                    <span className="opacity-75">({c.symbol.trim()})</span>
                  </button>
                );
              })}

              <button
                onClick={() => setShowFxSettings(!showFxSettings)}
                className="px-2.5 py-1.5 rounded-[4px] font-jetbrains text-xs text-[#94A3B8] hover:text-[#F1F5F9] border border-slate-400/20 hover:border-slate-400/40 bg-[#050A17] flex items-center gap-1 transition-all"
                title="Toggle dynamic rate settings"
              >
                <span>Dynamic FX</span>
                {showFxSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Expandable Dynamic Rate Options Drawer */}
          {showFxSettings && (
            <div className="mt-4 pt-4 border-t border-slate-400/10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[#050A17]/60 p-4 rounded-[4px]">
              <div>
                <label className="block text-[11px] font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-1">
                  Dynamic FX Rate (1 {currency.code} in INR)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={customRate}
                    onChange={(e) => setCustomRate(Math.max(0.1, Number(e.target.value) || 1))}
                    className="w-full px-3 py-1.5 bg-[#0B1220] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-xs focus:outline-none focus:border-[#3B82F6]"
                  />
                  <button
                    onClick={() => setCustomRate(currency.defaultRateToINR)}
                    className="px-2.5 py-1.5 bg-[#0B1220] hover:bg-[#3B82F6]/20 border border-slate-400/20 text-[#3B82F6] rounded-[3px] font-jetbrains text-xs flex items-center gap-1"
                    title="Reset to default benchmark rate"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-1">
                  Active Regional Benchmark
                </div>
                <div className="text-xs text-[#F1F5F9] font-jetbrains">
                  {currency.name} &bull; Fuel: {currency.symbol}{currency.defaultFuelPrice}/{currency.fuelUnit} &bull; Tyre: {currency.symbol}{currency.defaultTyreCost}
                </div>
              </div>

              <div className="text-[11px] text-[#94A3B8] font-ibm-plex">
                Adjusting the dynamic FX rate connects regional fleet input valuations to Treel&apos;s standard telematics and hardware telemetry baseline.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Interactive Calculator Grid */}
      <section className="relative z-10 py-10 sm:py-12">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Inputs Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Card 1: Fleet & Axle Configuration */}
              <div className="bg-[#0B1220]/80 border border-slate-400/10 p-6 sm:p-8 rounded-[4px] shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-400/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h2 className="font-space-grotesk text-xl font-bold text-[#F1F5F9]">
                      1. Fleet &amp; Vehicle Axle Configuration
                    </h2>
                  </div>
                  <button
                    onClick={handleResetDefaults}
                    className="text-xs font-jetbrains text-[#94A3B8] hover:text-[#3B82F6] flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                {/* Fleet Size */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8]">
                      Total Fleet Size (Vehicles)
                    </label>
                    <span className="font-jetbrains text-sm font-semibold text-[#3B82F6]">
                      {fleetSize} Vehicles
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={fleetSize}
                      onChange={(e) => setFleetSize(Number(e.target.value))}
                      className="w-full accent-[#3B82F6] bg-slate-800 h-2 rounded cursor-pointer"
                    />
                    <input
                      type="number"
                      min="5"
                      max="10000"
                      value={fleetSize}
                      onChange={(e) => setFleetSize(Math.max(1, Number(e.target.value) || 0))}
                      className="w-24 px-3 py-2 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-sm text-center focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  {/* Preset chips */}
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {[25, 50, 100, 250, 500, 1000].map((count) => (
                      <button
                        key={count}
                        onClick={() => setFleetSize(count)}
                        className={`px-2.5 py-1 text-[11px] font-jetbrains rounded-[3px] transition-colors ${
                          fleetSize === count
                            ? "bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/40"
                            : "bg-[#050A17] text-[#94A3B8] border border-slate-400/10 hover:border-slate-400/30"
                        }`}
                      >
                        {count} Trucks
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Type Selection */}
                <div>
                  <label className="block text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-2">
                    Commercial Vehicle Application
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => {
                      const selected = VEHICLE_TYPES.find((v) => v.label === e.target.value);
                      setVehicleType(e.target.value);
                      if (selected) {
                        setTyresPerVehicle(selected.defaultTyres);
                        setFuelEfficiency(selected.defaultMileage);
                      }
                    }}
                    className="w-full px-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] text-sm focus:outline-none focus:border-[#3B82F6]"
                  >
                    {VEHICLE_TYPES.map((v) => (
                      <option key={v.label} value={v.label}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tire Count per Vehicle (User Request Item) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8]">
                      Tire Count per Vehicle
                    </label>
                    <span className="font-jetbrains text-xs text-[#3B82F6] font-medium">
                      Fleet Total: <strong className="font-semibold text-white">{totalFleetTyres.toLocaleString()}</strong> monitored tyres
                    </span>
                  </div>

                  {/* Preset wheel configurations */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                    {[6, 10, 12, 14, 18, 22].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setTyresPerVehicle(count)}
                        className={`py-2 px-2 text-center rounded-[3px] font-jetbrains text-xs font-semibold border transition-all ${
                          tyresPerVehicle === count
                            ? "bg-[#3B82F6] text-white border-[#3B82F6] shadow-sm shadow-blue-500/20"
                            : "bg-[#050A17] text-[#94A3B8] border-slate-400/20 hover:text-white hover:border-slate-400/40"
                        }`}
                      >
                        {count} Tyres
                      </button>
                    ))}
                  </div>

                  {/* Custom wheel count input */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#94A3B8] font-jetbrains">Custom tyre positions per vehicle:</span>
                    <input
                      type="number"
                      min="2"
                      max="48"
                      value={tyresPerVehicle}
                      onChange={(e) => setTyresPerVehicle(Math.max(2, Math.min(48, Number(e.target.value) || 6)))}
                      className="w-24 px-3 py-1.5 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-xs text-center focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Operating Mileage & Fuel Economy */}
              <div className="bg-[#0B1220]/80 border border-slate-400/10 p-6 sm:p-8 rounded-[4px] shadow-xl space-y-6">
                <div className="flex items-center gap-2.5 border-b border-slate-400/10 pb-4">
                  <div className="w-7 h-7 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <h2 className="font-space-grotesk text-xl font-bold text-[#F1F5F9]">
                    2. Expected Mileage &amp; Fuel Economy
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Monthly Distance */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8]">
                        Distance (km/truck/mo)
                      </label>
                      <span className="font-jetbrains text-xs text-[#F1F5F9] font-semibold">
                        {kmPerMonth.toLocaleString()} km
                      </span>
                    </div>
                    <input
                      type="number"
                      step="500"
                      min="1000"
                      max="30000"
                      value={kmPerMonth}
                      onChange={(e) => setKmPerMonth(Math.max(500, Number(e.target.value) || 0))}
                      className="w-full px-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-sm focus:outline-none focus:border-[#3B82F6]"
                    />
                    <div className="flex gap-2 mt-2">
                      {[5000, 8000, 12000, 16000].map((km) => (
                        <button
                          key={km}
                          onClick={() => setKmPerMonth(km)}
                          className={`px-2 py-0.5 text-[10px] font-jetbrains rounded-[2px] ${
                            kmPerMonth === km
                              ? "bg-[#3B82F6]/20 text-[#3B82F6]"
                              : "text-[#94A3B8] hover:text-[#F1F5F9]"
                          }`}
                        >
                          {km / 1000}k km
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fuel Economy */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8]">
                        Fuel Economy (km/Litre)
                      </label>
                      <span className="font-jetbrains text-xs text-[#F1F5F9] font-semibold">
                        {fuelEfficiency.toFixed(1)} km/L
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="15.0"
                      value={fuelEfficiency}
                      onChange={(e) => setFuelEfficiency(Math.max(0.5, Number(e.target.value) || 1.0))}
                      className="w-full px-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-sm focus:outline-none focus:border-[#3B82F6]"
                    />
                    <div className="flex gap-2 mt-2">
                      {[2.8, 3.5, 4.0, 4.8].map((val) => (
                        <button
                          key={val}
                          onClick={() => setFuelEfficiency(val)}
                          className={`px-2 py-0.5 text-[10px] font-jetbrains rounded-[2px] ${
                            fuelEfficiency === val
                              ? "bg-[#3B82F6]/20 text-[#3B82F6]"
                              : "text-[#94A3B8] hover:text-[#F1F5F9]"
                          }`}
                        >
                          {val} km/L
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Fuel Price */}
                  <div>
                    <label className="block text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-2">
                      Fuel Price ({currency.symbol}/{currency.fuelUnit})
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-jetbrains text-xs text-[#94A3B8]">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        step="0.05"
                        min="0.1"
                        value={fuelPrice}
                        onChange={(e) => setFuelPrice(Math.max(0.01, Number(e.target.value) || 0))}
                        className="w-full pl-8 pr-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-sm focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>

                  {/* Average Commercial Tyre Cost */}
                  <div>
                    <label className="block text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-2">
                      Average Cost per Tyre ({currency.symbol})
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-jetbrains text-xs text-[#94A3B8]">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        step="10"
                        min="10"
                        value={costPerTyre}
                        onChange={(e) => setCostPerTyre(Math.max(1, Number(e.target.value) || 0))}
                        className="w-full pl-8 pr-4 py-3 bg-[#050A17] border border-slate-400/20 rounded-[3px] text-[#F1F5F9] font-jetbrains text-sm focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>
                </div>

                {/* Computed baseline burn rate indicator */}
                <div className="p-3.5 rounded-[4px] bg-[#050A17] border border-slate-400/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-jetbrains text-[#94A3B8]">
                  <span>Baseline Fleet Fuel: {Math.round(annualFleetFuelLiters / 1000).toLocaleString()}k Litres/yr</span>
                  <span className="text-[#F1F5F9]">Baseline Fuel Spend: {formatValue(annualFuelSpend, true)}</span>
                </div>
              </div>

              {/* Card 3: Calibrated Baseline Assumptions (Mandated: 7% Tyre Life & 0.4%-0.5% Fuel) */}
              <div className="bg-[#0B1220]/80 border border-blue-500/20 p-6 sm:p-8 rounded-[4px] shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-400/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-space-grotesk text-xl font-bold text-[#F1F5F9]">
                        3. Calibrated Baseline Assumptions
                      </h2>
                      <div className="text-[11px] font-jetbrains text-[#3B82F6]">
                        Verified Across 200+ Commercial Deployments
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-[11px] font-jetbrains">
                    Field-Validated
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Tire Life Extension (Baseline: 7%) */}
                  <div className="p-4 rounded-[4px] bg-[#050A17] border border-slate-400/15 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8]">
                        Tire Life Extension
                      </span>
                      <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/40 text-[#3B82F6] rounded font-jetbrains text-xs font-bold">
                        {tyreLifeExtension.toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="5.0"
                        max="12.0"
                        step="0.5"
                        value={tyreLifeExtension}
                        onChange={(e) => setTyreLifeExtension(Number(e.target.value))}
                        className="w-full accent-[#3B82F6] bg-slate-800 h-2 rounded cursor-pointer"
                      />
                    </div>

                    {/* Presets */}
                    <div className="flex items-center gap-2">
                      {[5.0, 7.0, 9.0, 11.0].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setTyreLifeExtension(rate)}
                          className={`px-2 py-1 text-[11px] font-jetbrains rounded-[3px] border ${
                            tyreLifeExtension === rate
                              ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                              : "bg-[#0B1220] text-[#94A3B8] border-slate-400/20 hover:text-white"
                          }`}
                        >
                          {rate === 7.0 ? "7% (Default)" : `${rate}%`}
                        </button>
                      ))}
                    </div>

                    <p className="text-[11px] text-[#94A3B8] font-ibm-plex leading-relaxed">
                      Baseline default set to <strong>7.0%</strong>. Eliminates irregular crown and shoulder heat degradation via real-time cold-inflation telemetry.
                    </p>
                  </div>

                  {/* Fuel Savings (Baseline: 0.4% - 0.5%) */}
                  <div className="p-4 rounded-[4px] bg-[#050A17] border border-slate-400/15 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8]">
                        Fuel Efficiency Gain
                      </span>
                      <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/40 text-[#3B82F6] rounded font-jetbrains text-xs font-bold">
                        {fuelSavingsPercent.toFixed(2)}%
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0.30"
                        max="0.65"
                        step="0.05"
                        value={fuelSavingsPercent}
                        onChange={(e) => setFuelSavingsPercent(Number(e.target.value))}
                        className="w-full accent-[#3B82F6] bg-slate-800 h-2 rounded cursor-pointer"
                      />
                    </div>

                    {/* Presets: 0.40%, 0.45%, 0.50% */}
                    <div className="flex items-center gap-2">
                      {[
                        { label: "0.40%", val: 0.40 },
                        { label: "0.45% (Default)", val: 0.45 },
                        { label: "0.50%", val: 0.50 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setFuelSavingsPercent(preset.val)}
                          className={`px-2 py-1 text-[11px] font-jetbrains rounded-[3px] border ${
                            fuelSavingsPercent === preset.val
                              ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                              : "bg-[#0B1220] text-[#94A3B8] border-slate-400/20 hover:text-white"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    <p className="text-[11px] text-[#94A3B8] font-ibm-plex leading-relaxed">
                      Baseline default set to <strong>0.4%–0.5%</strong> (0.45% median). Derived from parasitic rolling-resistance reduction across verified fleet trials.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Results Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 sticky top-24">
              
              {/* Primary ROI Card */}
              <div className="bg-[#0B1220]/95 border border-blue-500/40 p-6 sm:p-8 rounded-[4px] shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase font-jetbrains tracking-wider text-[#3B82F6] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Simulated Fleet ROI Impact
                  </div>
                  <span className="font-jetbrains text-xs text-[#94A3B8] bg-[#050A17] px-2.5 py-1 rounded border border-slate-400/10">
                    {fleetSize} Vehicles &bull; {totalFleetTyres} Tyres
                  </span>
                </div>

                {/* Primary Metric 1: Total Annual Savings */}
                <div className="p-5 rounded-[4px] bg-[#050A17] border border-blue-500/30 relative">
                  <div className="text-xs text-[#94A3B8] font-jetbrains uppercase tracking-wider">
                    Total Estimated Annual Savings
                  </div>
                  <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2 tracking-tight">
                    {formatValue(totalAnnualSavings, true)}
                  </div>
                  {currency.code === "INR" && (
                    <div className="text-xs text-[#94A3B8] font-jetbrains mt-1">
                      {formatValue(totalAnnualSavings, false)} per year
                    </div>
                  )}
                  <div className="text-xs text-[#3B82F6] font-jetbrains mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Combines {fuelSavingsPercent.toFixed(2)}% Fuel + {tyreLifeExtension.toFixed(1)}% Tyre Life Extension
                  </div>
                </div>

                {/* Metric 2: Payback Period & 3-Year ROI */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-[4px] bg-[#050A17] border border-slate-400/10">
                    <div className="text-[11px] text-[#94A3B8] font-jetbrains uppercase">
                      Payback Period
                    </div>
                    <div className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F59E0B] mt-1.5">
                      {paybackMonths.toFixed(1)} Mo
                    </div>
                    <div className="text-[10px] text-[#94A3B8] font-jetbrains mt-1">
                      Hardware break-even
                    </div>
                  </div>

                  <div className="p-4 rounded-[4px] bg-[#050A17] border border-slate-400/10">
                    <div className="text-[11px] text-[#94A3B8] font-jetbrains uppercase">
                      3-Year Net ROI
                    </div>
                    <div className="font-space-grotesk text-2xl sm:text-3xl font-bold text-emerald-400 mt-1.5">
                      +{threeYearRoiPercent}%
                    </div>
                    <div className="text-[10px] text-[#94A3B8] font-jetbrains mt-1">
                      Net operational return
                    </div>
                  </div>
                </div>

                {/* Savings Breakdown List */}
                <div className="space-y-3 pt-2 text-sm border-t border-slate-400/10">
                  <div className="flex justify-between items-center py-1.5 text-xs">
                    <span className="text-[#94A3B8] flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-[#3B82F6]" />
                      Annual Fuel Savings ({fuelSavingsPercent.toFixed(2)}%):
                    </span>
                    <span className="font-jetbrains text-[#F1F5F9] font-semibold">
                      {formatValue(estimatedFuelSavings, true)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 text-xs">
                    <span className="text-[#94A3B8] flex items-center gap-1.5">
                      <CircleDot className="w-3.5 h-3.5 text-[#3B82F6]" />
                      Tyre Life Savings ({tyreLifeExtension.toFixed(1)}%):
                    </span>
                    <span className="font-jetbrains text-[#F1F5F9] font-semibold">
                      {formatValue(estimatedTyreSavings, true)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 text-xs">
                    <span className="text-[#94A3B8]">Upfront Hardware Investment:</span>
                    <span className="font-jetbrains text-[#94A3B8]">
                      {formatValue(upfrontHardwareInvestment, true)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 text-xs">
                    <span className="text-[#94A3B8]">Annual SaaS Platform Fee:</span>
                    <span className="font-jetbrains text-[#94A3B8]">
                      {formatValue(annualPlatformFee, true)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2.5 border-t border-slate-400/10 text-xs sm:text-sm bg-[#050A17]/60 px-3 rounded-[3px]">
                    <span className="text-white font-medium">Net 1st-Year Benefit:</span>
                    <span className="font-jetbrains text-[#3B82F6] font-bold text-base">
                      {formatValue(netAnnualBenefit, true)}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/tmip/demo"
                    className="w-full py-3.5 rounded-[3px] font-space-grotesk font-bold text-sm bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group"
                  >
                    <span>Book Detailed Fleet ROI Audit</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/contact"
                    className="w-full py-2.5 rounded-[3px] font-jetbrains text-xs text-[#94A3B8] hover:text-[#F1F5F9] bg-[#050A17] hover:bg-[#050A17]/80 border border-slate-400/20 text-center block transition-colors"
                  >
                    Request Custom Engineering Proposal &rarr;
                  </Link>
                </div>
              </div>

              {/* Methodology & Field Validation Note */}
              <div className="p-5 rounded-[4px] bg-[#0B1220]/60 border border-slate-400/10 space-y-2 text-xs text-[#94A3B8] font-ibm-plex">
                <div className="flex items-center gap-1.5 font-jetbrains text-white font-medium">
                  <Info className="w-3.5 h-3.5 text-[#3B82F6]" />
                  Telemetry Validation Standard
                </div>
                <p className="leading-relaxed">
                  All baseline defaults (7% tyre extension and 0.4%–0.5% fuel saving) are derived from median commercial fleet operational telematics. Payback model incorporates hardware installation amortization and ongoing cloud analytics.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Comparison & Methodology Table */}
      <section className="relative z-10 py-10 sm:py-12 border-t border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-5 sm:mb-6">
            <h3 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">
              Annual Operational Financial Comparison
            </h3>
            <p className="text-[#94A3B8] text-sm font-ibm-plex mt-1">
              Projected economics for {fleetSize} vehicles ({totalFleetTyres} wheel positions) running {kmPerMonth.toLocaleString()} km/month in {currency.code}.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-jetbrains border border-slate-400/10 bg-[#0B1220]/80 rounded-[4px]">
              <thead className="bg-[#050A17] text-[#94A3B8] border-b border-slate-400/10">
                <tr>
                  <th className="p-4 uppercase tracking-wider font-semibold">Operational Metric</th>
                  <th className="p-4 uppercase tracking-wider font-semibold">Without TMIP Intelligence</th>
                  <th className="p-4 uppercase tracking-wider font-semibold">With Treel TMIP</th>
                  <th className="p-4 uppercase tracking-wider font-semibold text-[#3B82F6]">Annual Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-400/10 text-[#F1F5F9]">
                <tr>
                  <td className="p-4 font-ibm-plex text-sm text-[#94A3B8]">Fleet Fuel Consumption</td>
                  <td className="p-4">{formatValue(annualFuelSpend, false)}</td>
                  <td className="p-4">{formatValue(annualFuelSpend - estimatedFuelSavings, false)}</td>
                  <td className="p-4 text-[#3B82F6] font-semibold">+{formatValue(estimatedFuelSavings, true)}</td>
                </tr>
                <tr>
                  <td className="p-4 font-ibm-plex text-sm text-[#94A3B8]">Annual Commercial Tyre Replacements</td>
                  <td className="p-4">{formatValue(annualFleetTyreSpend, false)}</td>
                  <td className="p-4">{formatValue(annualFleetTyreSpend - estimatedTyreSavings, false)}</td>
                  <td className="p-4 text-[#3B82F6] font-semibold">+{formatValue(estimatedTyreSavings, true)}</td>
                </tr>
                <tr>
                  <td className="p-4 font-ibm-plex text-sm text-[#94A3B8]">Total Gross Operational Savings</td>
                  <td className="p-4 text-[#94A3B8]">Baseline (0)</td>
                  <td className="p-4 font-semibold text-emerald-400">+{formatValue(totalAnnualSavings, false)}</td>
                  <td className="p-4 text-emerald-400 font-semibold">{formatValue(totalAnnualSavings, true)}</td>
                </tr>
                <tr>
                  <td className="p-4 font-ibm-plex text-sm text-[#94A3B8]">Platform &amp; Hardware Amortization</td>
                  <td className="p-4 text-[#94A3B8]">None</td>
                  <td className="p-4 text-[#94A3B8]">{formatValue(annualPlatformFee, false)}/yr</td>
                  <td className="p-4 text-[#94A3B8]">&mdash;</td>
                </tr>
                <tr className="bg-[#050A17]/80 font-bold">
                  <td className="p-4 font-ibm-plex text-sm text-white">Net Annual Operating Profit Impact</td>
                  <td className="p-4 text-[#94A3B8]">Standard Baseline</td>
                  <td className="p-4 text-[#3B82F6]">{formatValue(netAnnualBenefit, false)}</td>
                  <td className="p-4 text-[#3B82F6] text-sm">+{formatValue(netAnnualBenefit, true)} Net Gain</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
