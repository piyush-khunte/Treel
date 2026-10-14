"use client";

import { AvailableCouponsModal } from "@/components/commerce/available-coupons-modal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useSurakshaCart } from "@/lib/commerce/cart-context";
import {
ArrowRight,
Check,
Minus,
PhoneCall,
Plus,
Radio,
ShieldCheck,
Sparkles,
Tag,
Trash2,
Truck,
Tv
} from "lucide-react";
import Link from "next/link";
import React,{ useState } from "react";

export default function SurakshaCartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalInr,
    totalItems,
    subtotalInr,
    discountInr,
    couponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useSurakshaCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false);
  const [couponStatus, setCouponStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCoupon.trim().toUpperCase();
    if (!clean) {
      setCouponStatus({ type: "error", text: "Please enter a coupon code." });
      return;
    }

    setIsValidatingCoupon(true);
    setCouponStatus(null);
    const res = await applyCoupon(clean);
    setIsValidatingCoupon(false);

    if (res.success) {
      setCouponStatus({
        type: "success",
        text: res.message || `Coupon "${clean}" applied successfully!`,
      });
      setInputCoupon("");
    } else {
      setCouponStatus({
        type: "error",
        text: res.message || `Coupon code "${clean}" is invalid or expired.`,
      });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponStatus(null);
    setInputCoupon("");
  };

  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Pricing", href: "/suraksha/pricing" },
                { label: "Suraksha Cart" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              SURAKSHA COMMERCIAL CART
            </div>
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#451A03] leading-[0.95] uppercase">
              YOUR SURAKSHA <span className="italic text-[#DC2626]">TRUCK KIT</span>
            </h1>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
              Commercial TPMS kit priced transparently at <strong>₹1,700 per tyre</strong>. Review your configuration before proceeding to checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          {items.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16 px-6 rounded-xl bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8" />
              </div>
              <h2 className="font-anton text-2xl sm:text-3xl text-[#451A03] uppercase">
                YOUR SURAKSHA CART IS EMPTY
              </h2>
              <p className="text-[#78350F] text-sm leading-relaxed font-medium">
                Pick the tyre count for your commercial vehicle (6-wheeler, 10-wheeler, 12-wheeler, 14-wheeler, or multi-axle trailer).
              </p>
              <div>
                <Link
                  href="/suraksha/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#DC2626] text-[#FEF3C7] font-bold text-sm hover:bg-[#B91C1C] transition-all shadow-md uppercase font-rubik"
                >
                  Configure Suraksha Kit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Items List */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 overflow-hidden shadow-sm divide-y-2 divide-[#451A03]/10">
                  {items.map((item) => (
                    <div
                      key={item.variant_id}
                      className="p-6 sm:p-8 flex flex-col gap-6"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626] bg-[#DC2626]/10 px-2 py-0.5 rounded">
                            COMMERCIAL TRUCK SAFETY KIT
                          </span>
                          <h3 className="font-anton text-2xl sm:text-3xl text-[#451A03] uppercase mt-1">
                            {item.name}
                          </h3>
                          <div className="text-xs text-[#78350F] font-mono mt-0.5">
                            SKU: {item.sku} · ₹1,700/sensor × {item.quantity} sensors
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <div className="font-anton text-3xl text-[#DC2626]">
                            ₹{(item.price_inr * item.quantity).toLocaleString("en-IN")}
                          </div>
                          <div className="text-[11px] font-semibold text-[#78350F]">
                            (All-Inclusive GST & Free Express Delivery)
                          </div>
                        </div>
                      </div>

                      {/* Kit Inclusions Pills */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold text-[#451A03]">
                        <div className="flex items-center gap-1.5 p-2 rounded bg-[#FEF3C7] border border-[#451A03]/10">
                          <Radio className="w-4 h-4 text-[#DC2626] shrink-0" />
                          <span>{item.quantity}x ARAI Sensors</span>
                        </div>
                        <div className="flex items-center gap-1.5 p-2 rounded bg-[#FEF3C7] border border-[#451A03]/10">
                          <Tv className="w-4 h-4 text-[#DC2626] shrink-0" />
                          <span>1x In-Cab Display</span>
                        </div>
                        <div className="flex items-center gap-1.5 p-2 rounded bg-[#FEF3C7] border border-[#451A03]/10">
                          <ShieldCheck className="w-4 h-4 text-[#047857] shrink-0" />
                          <span>3-Yr Warranty</span>
                        </div>
                      </div>

                      {/* Controls Row */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#451A03]/10">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold uppercase text-[#78350F]">
                            Tyres / Sensors:
                          </span>
                          <div className="flex items-center rounded-[4px] border-2 border-[#451A03]/20 bg-white overflow-hidden shadow-sm">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.variant_id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="w-9 h-9 flex items-center justify-center text-[#451A03] hover:bg-[#FEF3C7] transition-colors cursor-pointer"
                              aria-label="Decrease tyres"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-12 h-9 flex items-center justify-center font-anton text-lg text-[#451A03] border-x border-[#451A03]/20">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.variant_id,
                                  Math.min(36, item.quantity + 1)
                                )
                              }
                              className="w-9 h-9 flex items-center justify-center text-[#451A03] hover:bg-[#FEF3C7] transition-colors cursor-pointer"
                              aria-label="Increase tyres"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.variant_id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#DC2626] hover:text-[#B91C1C] hover:underline cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="/suraksha/pricing"
                    className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1"
                  >
                    ← Change Truck Configuration / Add Another Kit
                  </Link>
                </div>
              </div>

              {/* Order Summary & Proceed to Checkout */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-8 rounded-lg bg-[#FFFBEB] border-3 border-[#DC2626] shadow-xl space-y-6 sticky top-28">
                  <div>
                    <div className="font-rubik text-xs font-bold uppercase tracking-wider text-[#78350F]">
                      Commercial Order Summary
                    </div>
                    <h3 className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase mt-1">
                      SURAKSHA ORDER TOTAL
                    </h3>
                  </div>

                  <div className="space-y-3 py-4 border-y-2 border-[#451A03]/10 text-sm">
                    <div className="flex justify-between items-center text-[#78350F]">
                      <span>Total Tyre Sensors ({totalItems} @ ₹1,700)</span>
                      <span className="font-mono font-bold text-[#451A03]">
                        ₹{subtotalInr.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#78350F]">
                      <span>In-Cab Visual Display Unit</span>
                      <span className="font-bold text-[#047857] text-xs uppercase">
                        INCLUDED
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#78350F]">
                      <span>Anti-Theft Mounting Hardware</span>
                      <span className="font-bold text-[#047857] text-xs uppercase">
                        INCLUDED
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#78350F]">
                      <span>3-Year JK Tyre Warranty</span>
                      <span className="font-bold text-[#047857] text-xs uppercase">
                        INCLUDED
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#78350F]">
                      <span>Express Pan-India Delivery</span>
                      <span className="font-bold text-[#047857] text-xs uppercase">
                        FREE
                      </span>
                    </div>
                    {/* Suraksha Fleet Coupon Box */}
                    <div className="p-3.5 rounded-md bg-[#FEF3C7] border border-[#DC2626]/30 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#451A03]">
                          <Tag className="w-3.5 h-3.5 text-[#DC2626]" />
                          <span>Fleet Promo Code</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsCouponsModalOpen(true)}
                          className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>View Fleet Offers</span>
                        </button>
                      </div>

                      {couponCode ? (
                        <div className="flex items-center justify-between p-2.5 rounded bg-emerald-50 border border-emerald-300">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-emerald-900 font-mono tracking-wider">
                                {couponCode}
                              </div>
                              <div className="text-[10px] text-emerald-700 font-semibold">
                                You save ₹{discountInr.toLocaleString("en-IN")}
                                {appliedCoupon?.appliedProductName ? ` (${appliedCoupon.appliedProductName})` : ""}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="text-xs font-bold text-red-600 hover:underline px-1 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="e.g. SURAKSHA10, FLEET10"
                              value={inputCoupon}
                              onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                              className="flex-1 px-3 py-2 rounded border border-[#451A03]/20 bg-white text-xs font-mono font-bold text-[#451A03] uppercase placeholder:font-sans placeholder:normal-case placeholder:font-normal focus:outline-none focus:border-[#DC2626]"
                            />
                            <button
                              type="submit"
                              disabled={isValidatingCoupon || !inputCoupon.trim()}
                              className="px-4 py-2 rounded bg-[#DC2626] text-[#FEF3C7] text-xs font-bold uppercase hover:bg-[#B91C1C] disabled:opacity-50 transition-colors cursor-pointer"
                            >
                              {isValidatingCoupon ? "Checking..." : "Apply"}
                            </button>
                          </div>
                          {couponStatus && (
                            <div
                              className={`text-[11px] font-bold ${
                                couponStatus.type === "success" ? "text-emerald-700" : "text-red-600"
                              }`}
                            >
                              {couponStatus.text}
                            </div>
                          )}
                        </form>
                      )}
                    </div>

                    {discountInr > 0 && (
                      <div className="flex justify-between items-center text-[#047857] font-bold">
                        <span>Coupon Discount ({couponCode}):</span>
                        <span>-₹{discountInr.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-[#78350F]">
                      <span>Applicable GST (18%)</span>
                      <span className="text-xs text-[#78350F]">Included in Price</span>
                    </div>
                  </div>

                  {/* Total Payable */}
                  <div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-anton text-lg text-[#451A03] uppercase">
                        TOTAL PAYABLE:
                      </span>
                      <div className="text-right">
                        <div className="font-anton text-3xl sm:text-4xl text-[#DC2626]">
                          ₹{totalInr.toLocaleString("en-IN")}
                        </div>
                        <div className="text-[11px] font-semibold text-[#78350F]">
                          ({totalItems} Tyre Sensors · All Inclusive)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="space-y-3">
                    <Link
                      href="/suraksha/checkout"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] active:scale-[0.98] uppercase cursor-pointer block text-center"
                    >
                      <span>Proceed to Suraksha Checkout</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>

                    <div className="text-center text-xs text-[#78350F] font-medium">
                      Pay securely via UPI, Card, Net Banking, or Cash on Delivery (COD).
                    </div>
                  </div>

                  {/* Assistance note */}
                  <div className="pt-4 border-t border-[#451A03]/10 flex items-center justify-between text-xs font-semibold text-[#78350F]">
                    <span>Need help ordering?</span>
                    <Link
                      href="/suraksha/whatsapp"
                      className="text-[#16A34A] hover:underline flex items-center gap-1 font-bold"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Available Coupons Modal */}
      <AvailableCouponsModal
        isOpen={isCouponsModalOpen}
        onClose={() => setIsCouponsModalOpen(false)}
        brand="suraksha"
        subtotalInr={subtotalInr}
        items={items}
        currentCouponCode={couponCode}
        onApplyCoupon={async (code) => {
          const res = await applyCoupon(code);
          if (res.success) {
            setCouponStatus({
              type: "success",
              text: res.message || `Coupon "${code}" applied successfully!`,
            });
          } else {
            setCouponStatus({
              type: "error",
              text: res.message || `Coupon "${code}" could not be applied.`,
            });
          }
        }}
      />
    </div>
  );
}
