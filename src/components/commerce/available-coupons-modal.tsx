"use client";

import React, { useEffect, useState } from "react";
import {
  Tag,
  X,
  Copy,
  Check,
  Sparkles,
  Percent,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import type { AvailableCouponItem } from "@/lib/commerce/coupon-validator";

interface AvailableCouponsModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: "personal" | "suraksha";
  subtotalInr: number;
  currentCouponCode?: string;
  onApplyCoupon: (code: string) => Promise<boolean | void> | boolean | void;
}

export function AvailableCouponsModal({
  isOpen,
  onClose,
  brand,
  subtotalInr,
  currentCouponCode,
  onApplyCoupon,
}: AvailableCouponsModalProps) {
  const [coupons, setCoupons] = useState<AvailableCouponItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [applyingCode, setApplyingCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Fetch live available coupons
    setIsLoading(true);
    setError(null);

    fetch(`/api/coupons/available?brand=${brand}&subtotal=${subtotalInr}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.coupons)) {
          setCoupons(data.coupons);
        } else {
          setError(data.error || "Unable to fetch available coupons.");
        }
      })
      .catch((err) => {
        console.error("Failed to load available coupons:", err);
        setError("Network error loading offers. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, brand, subtotalInr, onClose]);

  if (!isOpen) return null;

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    } catch (err) {
      console.warn("Clipboard write failed:", err);
    }
  };

  const handleDirectApply = async (code: string) => {
    setApplyingCode(code);
    try {
      await onApplyCoupon(code);
      onClose();
    } finally {
      setApplyingCode(null);
    }
  };

  const isPersonal = brand === "personal";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coupons-modal-title"
    >
      <div
        className={`relative w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col ${
          isPersonal
            ? "bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-100 font-manrope"
            : "bg-[#FFFBEB] text-[#451A03] rounded-xl shadow-2xl border-2 border-[#451A03]/20 font-rubik"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`p-5 sm:p-6 border-b flex items-center justify-between ${
            isPersonal
              ? "border-slate-100 bg-slate-50/50"
              : "border-[#451A03]/10 bg-[#FEF3C7]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isPersonal
                  ? "bg-[#2563EB]/10 text-[#2563EB]"
                  : "bg-[#DC2626]/10 text-[#DC2626]"
              }`}
            >
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="coupons-modal-title"
                className={`text-lg sm:text-xl font-bold ${
                  isPersonal
                    ? "font-manrope text-slate-900"
                    : "font-anton uppercase tracking-tight text-[#451A03]"
                }`}
              >
                {isPersonal
                  ? "Available Personal TPMS Coupons"
                  : "Available Suraksha Fleet Offers"}
              </h3>
              <p
                className={`text-xs ${
                  isPersonal ? "text-slate-500" : "text-[#78350F]"
                }`}
              >
                {isPersonal
                  ? "Select or copy an eligible discount code to save on your order."
                  : "Commercial safety coupons and transporter volume discounts."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isPersonal
                ? "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                : "text-[#78350F] hover:text-[#DC2626] hover:bg-[#451A03]/10"
            }`}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Coupon List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-140px)]">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
              <Loader2
                className={`w-8 h-8 animate-spin ${
                  isPersonal ? "text-[#2563EB]" : "text-[#DC2626]"
                }`}
              />
              <p
                className={`text-sm ${
                  isPersonal ? "text-slate-500" : "text-[#78350F]"
                }`}
              >
                Finding the best deals for your cart...
              </p>
            </div>
          ) : error ? (
            <div
              className={`p-4 rounded-xl flex items-start gap-3 text-sm ${
                isPersonal
                  ? "bg-rose-50 text-rose-800 border border-rose-200"
                  : "bg-red-100 text-red-900 border border-red-300"
              }`}
            >
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          ) : coupons.length === 0 ? (
            <div className="py-10 text-center space-y-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                  isPersonal
                    ? "bg-slate-100 text-slate-400"
                    : "bg-[#FEF3C7] text-[#78350F]"
                }`}
              >
                <Tag className="w-6 h-6" />
              </div>
              <div
                className={`font-bold text-base ${
                  isPersonal ? "text-slate-800" : "text-[#451A03]"
                }`}
              >
                No coupons currently available
              </div>
              <p
                className={`text-xs max-w-xs mx-auto ${
                  isPersonal ? "text-slate-500" : "text-[#78350F]"
                }`}
              >
                Check back soon or apply a custom promo code directly in checkout.
              </p>
            </div>
          ) : (
            coupons.map((coupon) => {
              const isCurrentlyApplied =
                currentCouponCode?.toUpperCase() === coupon.code.toUpperCase();
              const isEligible = coupon.isEligible !== false;

              return (
                <div
                  key={coupon.code}
                  className={`relative p-4 rounded-2xl border transition-all ${
                    isCurrentlyApplied
                      ? isPersonal
                        ? "bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400/50"
                        : "bg-emerald-50 border-2 border-emerald-600"
                      : isPersonal
                      ? "bg-white border-slate-200 hover:border-[#2563EB]/40 shadow-xs"
                      : "bg-white border-2 border-[#451A03]/15 hover:border-[#DC2626]"
                  } ${!isEligible ? "opacity-75" : ""}`}
                >
                  {/* Top line: Discount Badge & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          isPersonal
                            ? "bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20"
                            : "bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 font-mono"
                        }`}
                      >
                        <Percent className="w-3 h-3" />
                        {coupon.discountLabel}
                      </span>

                      {coupon.productTitle && (
                        <span
                          className={`text-[11px] font-semibold truncate max-w-[160px] ${
                            isPersonal ? "text-slate-500" : "text-[#78350F]"
                          }`}
                          title={coupon.productTitle}
                        >
                          {coupon.productTitle}
                        </span>
                      )}
                    </div>

                    {isCurrentlyApplied && (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Applied
                      </span>
                    )}
                  </div>

                  {/* Coupon Title & Description */}
                  <div className="mt-2.5 space-y-1">
                    <div
                      className={`text-sm font-bold ${
                        isPersonal ? "text-slate-900" : "text-[#451A03]"
                      }`}
                    >
                      {coupon.title}
                    </div>
                    <p
                      className={`text-xs ${
                        isPersonal ? "text-slate-600" : "text-[#78350F]"
                      }`}
                    >
                      {coupon.description}
                    </p>
                  </div>

                  {/* Ineligibility notice if cart doesn't meet criteria */}
                  {coupon.ineligibilityReason && (
                    <div className="mt-2 text-[11px] font-semibold text-amber-700 flex items-center gap-1 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span>{coupon.ineligibilityReason}</span>
                    </div>
                  )}

                  {/* Bottom bar: Code snippet + Copy + Apply Action */}
                  <div className="mt-3.5 pt-3 border-t border-dashed border-slate-200 flex items-center justify-between gap-3">
                    {/* Code Chip */}
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                        isPersonal
                          ? "bg-slate-50 border-slate-300"
                          : "bg-[#FEF3C7] border-2 border-[#451A03]/20"
                      }`}
                    >
                      <span className="font-mono text-xs sm:text-sm font-extrabold tracking-wider text-slate-900">
                        {coupon.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(coupon.code)}
                        className={`p-1 rounded-md text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                          copiedCode === coupon.code
                            ? "text-emerald-600 font-bold"
                            : isPersonal
                            ? "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
                            : "text-[#78350F] hover:text-[#DC2626]"
                        }`}
                        title="Copy code to clipboard"
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px] hidden sm:inline">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Direct Apply Button */}
                    <div>
                      {isCurrentlyApplied ? (
                        <span
                          className={`text-xs font-bold px-3 py-2 rounded-xl inline-block ${
                            isPersonal
                              ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                              : "text-emerald-900 bg-emerald-100 border border-emerald-300"
                          }`}
                        >
                          Applied ✓
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={!isEligible || applyingCode === coupon.code}
                          onClick={() => handleDirectApply(coupon.code)}
                          className={`px-4 py-2 text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer ${
                            isPersonal
                              ? "rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                              : "rounded-[4px] bg-[#DC2626] hover:bg-[#B91C1C] text-[#FEF3C7] uppercase font-bold"
                          }`}
                        >
                          {applyingCode === coupon.code ? (
                            <span className="flex items-center gap-1">
                              <Loader2 className="w-3 h-3 animate-spin" /> Applying...
                            </span>
                          ) : (
                            "Apply Coupon"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div
          className={`p-4 border-t text-center text-xs flex items-center justify-between ${
            isPersonal
              ? "border-slate-100 bg-slate-50/50 text-slate-500"
              : "border-[#451A03]/10 bg-[#FEF3C7] text-[#78350F]"
          }`}
        >
          <div className="flex items-center gap-1.5 mx-auto">
            <ShieldCheck
              className={`w-4 h-4 ${
                isPersonal ? "text-[#2563EB]" : "text-[#047857]"
              }`}
            />
            <span>All coupon discounts are applied and verified securely on checkout.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
