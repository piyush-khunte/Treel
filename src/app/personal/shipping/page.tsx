import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Policy  \u00b7  Personal TPMS  \u00b7  Treel",
  description: "Personal TPMS shipping details. Delivery times across India, shipping charges, tracking, and delivery partner information.",
  alternates: {
    canonical: "https://treel.in/personal/shipping",
  },
  openGraph: {
    title: "Shipping Policy  \u00b7  Personal TPMS  \u00b7  Treel",
    description: "Personal TPMS shipping details. Delivery times across India, shipping charges, tracking, and delivery partner information.",
    url: "https://treel.in/personal/shipping",
  },
};

export default function PersonalShippingPage() {
  return (
    <div className="space-y-0 bg-[#0D1B2A] text-[#FAF7F2] font-manrope">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Shipping Policy</h1>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#FF8A00] bg-[#FF8A00]/10 border-[#FF8A00]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">LEGAL  ·  PERSONAL TPMS</div>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>H1: Shipping Policy</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Effective date: `1 October 2026</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Applies to: **Personal TPMS orders from treel.in.**</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">We currently ship Personal TPMS across **India**. International shipping is not available at launch (planned for 2027).</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">All Personal TPMS orders are fulfilled via **Shiprocket** and shipped through Shiprocket's partner courier network (Delhivery, Bluedart, DTDC, and others depending on your pincode).</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Estimated delivery times from order confirmation:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Delivery estimates are provided at checkout based on your pincode. Actual delivery may vary due to weather, festivals, courier constraints, or other factors outside our control.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Metro cities** (Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune): **3-5 business days**</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Tier 1 and Tier 2 cities**: **4-7 business days**</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Tier 3 cities and rural areas**: **6-10 business days**</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>**Remote pincodes** (northeast, Jammu & Kashmir, Andaman & Nicobar, Lakshadweep): **7-14 business days**</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Orders are processed within **48 hours** of confirmation. Orders placed on weekends or public holidays are processed the next business day.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Once dispatched, you will receive a tracking link by email and (if provided) SMS.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**Free shipping across India** for Personal TPMS orders. No hidden shipping fees at checkout.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Cash on delivery (COD) is not available for Personal TPMS at launch.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Track your order at <Link href="/personal/track-order" className="underline hover:text-white transition-colors">/personal/track-order</Link> using your order ID and email. Real-time Shiprocket tracking is embedded in the tracking page.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Standard courier practice:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">If your order is returned undelivered:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>First delivery attempt: automatic</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Second attempt: after courier contact with the recipient</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>After 2-3 failed attempts: order is returned to Treel</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>We contact you to reschedule delivery (additional shipping charges may apply)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>If no response, we may cancel the order and refund per our returns policy</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">If you need to change your delivery address after placing an order, contact us within **12 hours** of order confirmation. After dispatch, address changes may not be possible.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">If your shipment arrives damaged or is lost in transit:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Contact us at **hello@treel.in** within **48 hours** of the delivery attempt</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>Include your order ID and (if delivered) photos of the damage</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>We will arrange free replacement or full refund at your preference</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Questions about shipping? Email **hello@treel.in** or call **1800 833 0233**.</p>
          </div>
        </div>
      </section>
    </div>
  );
}