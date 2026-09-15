import type { Metadata } from "next";
import Link from "next/link";
import { 
  Truck, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Mail,
  AlertCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Policy · Personal TPMS · Treel",
  description: "Personal TPMS shipping details. Delivery times across India, shipping charges, tracking, and delivery partner information.",
  alternates: {
    canonical: "https://treel.in/personal/shipping",
  },
  openGraph: {
    title: "Shipping Policy · Personal TPMS · Treel",
    description: "Personal TPMS shipping details. Delivery times across India, shipping charges, tracking, and delivery partner information.",
    url: "https://treel.in/personal/shipping",
  },
};

export default function PersonalShippingPage() {
  const deliveryEstimates = [
    {
      region: "Metro Cities",
      cities: "Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune",
      time: "3–5 business days",
      badge: "Express Priority"
    },
    {
      region: "Tier 1 & Tier 2 Cities",
      cities: "Ahmedabad, Jaipur, Chandigarh, Lucknow, Kochi, Indore, Coimbatore & others",
      time: "4–7 business days",
      badge: "Fast Delivery"
    },
    {
      region: "Tier 3 Cities & Rural",
      cities: "All serviceable regional postal areas across mainland India",
      time: "6–10 business days",
      badge: "Standard Delivery"
    },
    {
      region: "Special & Remote Pincodes",
      cities: "Northeast states, Jammu & Kashmir, Ladakh, Andaman & Nicobar, Lakshadweep",
      time: "7–14 business days",
      badge: "Extended Transit"
    },
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              LEGAL · PERSONAL TPMS
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              Shipping Policy
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#6B7280]">
              <span>Effective Date: 1 October 2026</span>
              <span>•</span>
              <span>Applies to: Personal TPMS orders from treel.in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Policy Content */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-12">
            {/* Overview & Pricing */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-4">
              <div className="flex items-center gap-3 text-[#2563EB]">
                <Truck className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#111827]">Free Express Shipping Across India</h2>
              </div>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                We currently ship Personal TPMS kits across all serviceable postal pincodes in <strong>India</strong>. Shipping is completely free of charge with zero hidden handling fees at checkout. International shipping is planned for expansion in 2027.
              </p>
              <p className="text-xs text-[#6B7280]">
                Note: Cash on Delivery (COD) is not available at launch; all orders are prepaid securely via Razorpay.
              </p>
            </div>

            {/* Courier Network */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">Fulfillment & Courier Partners</h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                All Personal TPMS orders are fulfilled directly from our central automotive logistics hubs via <strong>Shiprocket</strong> and dispatched through top-tier courier networks including Blue Dart, Delhivery, DTDC, and Shadowfax depending on optimal route velocity for your specific pincode.
              </p>
            </div>

            {/* Delivery Estimates Table */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">Estimated Delivery Timelines</h2>
              <p className="text-base text-[#4B5563] leading-relaxed">
                Orders are processed within <strong>48 hours</strong> of payment confirmation. Orders placed over weekends or national public holidays are queued for priority dispatch on the next working day.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {deliveryEstimates.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-[#111827]">{item.region}</h3>
                      <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                        {item.badge}
                      </span>
                    </div>
                    <div className="text-xl font-extrabold text-[#2563EB]">{item.time}</div>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{item.cities}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time tracking */}
            <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-[#111827]">Order Tracking</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Once your order is handed over to the courier partner, you will receive an automatic dispatch notification via email and SMS with your unique AWB tracking number. You can track status live anytime at our dedicated tracking portal:
              </p>
              <div>
                <Link
                  href="/personal/track-order"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] text-white font-manrope font-bold text-xs hover:bg-[#1D4ED8] transition-all"
                >
                  Track Your Order Online <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Delivery attempts & Undelivered parcels */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">Delivery Attempts & Address Changes</h2>
              <div className="space-y-3 text-sm text-[#4B5563] leading-relaxed">
                <p>
                  Couriers will attempt delivery up to 3 times before returning the parcel to our origin warehouse. The courier delivery associate will contact you on the mobile number provided during checkout.
                </p>
                <p>
                  If you need to adjust your shipping address after placing an order, please email <strong>hello@treel.in</strong> within <strong>12 hours</strong> of order confirmation. Once an order is dispatched and assigned to a manifest, in-transit rerouting is subject to courier feasibility.
                </p>
              </div>
            </div>

            {/* Transit Damage & Inquiries */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111827] text-white space-y-4 border border-white/10 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Transit Damage or Lost Shipments</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                If your parcel arrives damaged or fails to arrive within the estimated timeline, notify us at <strong>hello@treel.in</strong> or call toll-free <strong>1800 833 0233</strong> within 48 hours. We will immediately arrange a free expedited replacement kit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
