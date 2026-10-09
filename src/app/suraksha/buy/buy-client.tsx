"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Truck,
  Check,
  ShieldCheck,
  ArrowRight,
  Plus,
  Minus,
  MapPin,
  CreditCard,
  Tv,
  Radio,
  Lock,
  Sparkles,
  PhoneCall,
  AlertCircle,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useSurakshaCart } from "@/lib/commerce/cart-context";

const PRESET_CONFIGS = [
  { tyres: 4, name: "4-Wheeler", axle: "2 Axles · LCV / Mini Truck", popular: false },
  { tyres: 6, name: "6-Wheeler", axle: "2 Axles · Steer & Drive", popular: false },
  { tyres: 10, name: "10-Wheeler", axle: "3 Axles · Multi-Axle Haulage", popular: true },
  { tyres: 12, name: "12-Wheeler", axle: "4 Axles · Heavy Commercial", popular: false },
  { tyres: 14, name: "14-Wheeler", axle: "4-5 Axles · Multi-Axle Goods", popular: false },
  { tyres: 16, name: "16-Wheeler", axle: "5 Axles · Heavy Haulage", popular: false },
  { tyres: 18, name: "18-Wheeler", axle: "Prime Mover + Trailer", popular: false },
  { tyres: 22, name: "22-Wheeler", axle: "Multi-Axle Heavy Haulage", popular: false },
];

const UNIT_PRICE_INR = 1700;

export default function SurakshaBuyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem, updateQuantity, items } = useSurakshaCart();

  // Parse initial tyre count from searchParams if provided (e.g. ?tyres=10 or ?qty=10)
  const queryTyres = parseInt(searchParams.get("tyres") || searchParams.get("qty") || "", 10);
  const initialTyres = !isNaN(queryTyres) && queryTyres > 0 && queryTyres <= 36 ? queryTyres : 10;

  const [tyreCount, setTyreCount] = useState<number>(initialTyres);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isNaN(queryTyres) && queryTyres > 0 && queryTyres <= 36) {
      setTyreCount(queryTyres);
    }
  }, [queryTyres]);

  const totalPrice = tyreCount * UNIT_PRICE_INR;

  const handleProceedToCheckout = () => {
    setIsProcessing(true);

    // Build standard Suraksha kit item
    const surakshaItem = {
      variant_id: "suraksha-sensor-kit",
      sku: `SKU-SURAKSHA-${tyreCount}TYRE`,
      name: `Treel Suraksha Commercial Safety Kit (${tyreCount} Tyres)`,
      price_inr: UNIT_PRICE_INR,
      mrp_inr: 2000,
      quantity: tyreCount,
      sensor_count: tyreCount,
      vehicle_type: "truck",
      image_url:
        "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
    };

    // If an existing suraksha item is in cart, update its quantity; otherwise add it
    const existing = items.find((i) => i.variant_id === "suraksha-sensor-kit");
    if (existing) {
      updateQuantity("suraksha-sensor-kit", tyreCount);
    } else {
      addItem(surakshaItem);
    }

    router.push("/suraksha/cart");
  };

  const handleQuickSelect = (count: number) => {
    setTyreCount(count);
  };

  const incrementTyres = () => {
    setTyreCount((prev) => Math.min(prev + 1, 36));
  };

  const decrementTyres = () => {
    setTyreCount((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Pricing", href: "/suraksha/pricing" },
                { label: "Order Suraksha Kit" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              DIRECT FROM MANUFACTURER
            </div>

            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#451A03] leading-[0.95] uppercase">
              GET SURAKSHA FOR <span className="italic text-[#DC2626]">YOUR TRUCK</span>
            </h1>

            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-medium max-w-3xl">
              Transparent commercial vehicle pricing at <strong>₹1,700 per tyre</strong>. Includes standalone in-cab display, ARAI-certified sensors, 3-year replacement warranty, and free express delivery across India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Configurator & Order Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Tyre Selection & Inclusions */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Select Tyre Quantity */}
              <div className="p-6 sm:p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-6">
                <div>
                  <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-1">
                    STEP 1
                  </div>
                  <h2 className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase">
                    SELECT NUMBER OF TYRES / WHEELS
                  </h2>
                  <p className="text-[#78350F] text-xs sm:text-sm font-medium mt-1">
                    Pick your truck setup or adjust the exact tyre count using the counter.
                  </p>
                </div>

                {/* Quick Presets Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PRESET_CONFIGS.map((cfg) => {
                    const isSelected = tyreCount === cfg.tyres;
                    return (
                      <button
                        key={cfg.tyres}
                        type="button"
                        onClick={() => handleQuickSelect(cfg.tyres)}
                        className={`p-3.5 rounded-[4px] border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? "bg-[#DC2626] border-[#DC2626] text-[#FEF3C7] shadow-md ring-2 ring-[#DC2626]/30"
                            : "bg-[#FEF3C7] border-[#451A03]/15 text-[#451A03] hover:border-[#DC2626]"
                        }`}
                      >
                        {cfg.popular && (
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm inline-block mb-1.5 w-max ${
                            isSelected ? "bg-[#FEF3C7] text-[#DC2626]" : "bg-[#DC2626] text-[#FEF3C7]"
                          }`}>
                            Popular
                          </span>
                        )}
                        <div>
                          <div className="font-anton text-lg leading-tight uppercase">
                            {cfg.name}
                          </div>
                          <div className={`text-[11px] font-semibold mt-0.5 ${isSelected ? "text-[#FEF3C7]/90" : "text-[#78350F]"}`}>
                            {cfg.tyres} Tyres
                          </div>
                        </div>
                        <div className={`font-mono text-xs font-bold mt-2 pt-2 border-t ${
                          isSelected ? "border-[#FEF3C7]/20 text-[#FEF3C7]" : "border-[#451A03]/10 text-[#DC2626]"
                        }`}>
                          ₹{(cfg.tyres * UNIT_PRICE_INR).toLocaleString("en-IN")}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Exact Stepper Counter */}
                <div className="pt-4 border-t border-[#451A03]/10">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F] mb-3">
                    Or specify exact tyre count:
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-[4px] border-2 border-[#451A03]/20 bg-white overflow-hidden shadow-sm">
                      <button
                        type="button"
                        onClick={decrementTyres}
                        disabled={tyreCount <= 1}
                        className="w-12 h-12 flex items-center justify-center text-[#451A03] hover:bg-[#FEF3C7] transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                        aria-label="Decrease tyres"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={36}
                        value={tyreCount}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val) && val >= 1 && val <= 36) {
                            setTyreCount(val);
                          }
                        }}
                        className="w-16 h-12 text-center font-anton text-2xl text-[#451A03] border-x border-[#451A03]/20 focus:outline-none focus:bg-[#FEF3C7]"
                      />
                      <button
                        type="button"
                        onClick={incrementTyres}
                        disabled={tyreCount >= 36}
                        className="w-12 h-12 flex items-center justify-center text-[#451A03] hover:bg-[#FEF3C7] transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
                        aria-label="Increase tyres"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-xs text-[#78350F] font-semibold">
                      <span>{tyreCount} sensors @ ₹1,700 each</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Ships in Your Kit */}
              <div className="p-6 sm:p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-4">
                <h3 className="font-anton text-xl sm:text-2xl font-normal text-[#451A03] uppercase">
                  WHAT&apos;S INCLUDED IN YOUR {tyreCount}-TYRE KIT
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-sm text-[#451A03]">
                  <div className="flex items-start gap-3 p-3 rounded bg-[#FEF3C7] border border-[#451A03]/10">
                    <Radio className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">{tyreCount}x High-Precision Tyre Sensors</div>
                      <div className="text-xs text-[#78350F]">ARAI certified, sub-GHz wireless, 3-year warranty</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded bg-[#FEF3C7] border border-[#451A03]/10">
                    <Tv className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">1x In-Cab Dashboard Display</div>
                      <div className="text-xs text-[#78350F]">Real-time visual & audio blowout alert system</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded bg-[#FEF3C7] border border-[#451A03]/10">
                    <Lock className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Anti-Theft Mounting Hardware</div>
                      <div className="text-xs text-[#78350F]">Wheel-nut lock nuts & 12V wiring harness</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded bg-[#FEF3C7] border border-[#451A03]/10">
                    <ShieldCheck className="w-5 h-5 text-[#047857] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">JK Tyre Pre-Registered Warranty</div>
                      <div className="text-xs text-[#78350F]">Instant replacement across 400+ Truck Wheels centres</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs font-semibold text-[#047857] flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Zero Monthly Subscription
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> No App or Smartphone Required
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 15-Minute Fitment
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing Summary & Checkout Action */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-lg bg-[#FFFBEB] border-3 border-[#DC2626] shadow-xl space-y-6 sticky top-28">
                
                <div>
                  <div className="font-rubik text-xs font-bold uppercase tracking-wider text-[#78350F]">
                    Order Summary
                  </div>
                  <h3 className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase mt-1">
                    SURAKSHA {tyreCount}-TYRE KIT
                  </h3>
                </div>

                {/* Calculation Breakdown */}
                <div className="space-y-3 py-4 border-y-2 border-[#451A03]/10 text-sm">
                  <div className="flex justify-between items-center text-[#78350F]">
                    <span>Tyre Sensors ({tyreCount} × ₹1,700)</span>
                    <span className="font-mono font-bold text-[#451A03]">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#78350F]">
                    <span>In-Cab Display & Wiring Harness</span>
                    <span className="font-bold text-[#047857] uppercase text-xs">INCLUDED</span>
                  </div>
                  <div className="flex justify-between items-center text-[#78350F]">
                    <span>3-Year Sensor Replacement Warranty</span>
                    <span className="font-bold text-[#047857] uppercase text-xs">INCLUDED</span>
                  </div>
                  <div className="flex justify-between items-center text-[#78350F]">
                    <span>Express Delivery Across India</span>
                    <span className="font-bold text-[#047857] uppercase text-xs">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-[#78350F]">
                    <span>Applicable GST (18%)</span>
                    <span className="text-xs text-[#78350F]">Included in Price</span>
                  </div>
                </div>

                {/* Total Display */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-anton text-lg text-[#451A03] uppercase">TOTAL PAYABLE:</span>
                    <div className="text-right">
                      <div className="font-anton text-3xl sm:text-4xl text-[#DC2626]">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[11px] font-semibold text-[#78350F]">
                        (₹1,700 × {tyreCount} tyres · All Inclusive)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Checkout CTA */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    disabled={isProcessing}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                  >
                    <span>{isProcessing ? "Redirecting to Checkout..." : `Proceed to Checkout (₹${totalPrice.toLocaleString("en-IN")})`}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="text-center text-xs text-[#78350F] font-medium">
                    Secure guest checkout · Pay via UPI, Cards, Net Banking, or Cash on Delivery (COD)
                  </div>
                </div>

                {/* Alternative Offline / EMI Options */}
                <div className="pt-4 border-t border-[#451A03]/10 space-y-2.5 text-xs font-semibold">
                  <div className="flex items-center justify-between text-[#78350F]">
                    <span>Prefer to buy offline?</span>
                    <Link
                      href="/suraksha/centres"
                      className="text-[#DC2626] hover:underline flex items-center gap-1 font-bold"
                    >
                      <MapPin className="w-3.5 h-3.5" /> Find Fitment Centre
                    </Link>
                  </div>
                  <div className="flex items-center justify-between text-[#78350F]">
                    <span>Looking for 0% EMI?</span>
                    <Link
                      href="/suraksha/emi"
                      className="text-[#EA580C] hover:underline flex items-center gap-1 font-bold"
                    >
                      <CreditCard className="w-3.5 h-3.5" /> Bajaj Finance EMI
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Safety & Satisfaction Assurance */}
      <section className="py-12 border-t-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg bg-[#FFFBEB] border border-[#451A03]/15 flex items-start gap-3">
              <div className="w-9 h-9 rounded bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-[#451A03]">3-Year Direct Replacement</div>
                <div className="text-xs text-[#78350F] mt-0.5">Defective sensors replaced immediately at 400+ authorized Truck Wheels centres.</div>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[#FFFBEB] border border-[#451A03]/15 flex items-start gap-3">
              <div className="w-9 h-9 rounded bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-[#451A03]">Universal Commercial Fitment</div>
                <div className="text-xs text-[#78350F] mt-0.5">Compatible with Tata, Ashok Leyland, BharatBenz, Eicher, Mahindra & all tyre brands.</div>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[#FFFBEB] border border-[#451A03]/15 flex items-start gap-3">
              <div className="w-9 h-9 rounded bg-[#047857]/10 text-[#047857] flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-[#451A03]">Toll-Free Hindi & English Help</div>
                <div className="text-xs text-[#78350F] mt-0.5">Dedicated phone & WhatsApp support for installation and sensor pairing.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
