"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Lock, 
  Star, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Gauge, 
  Radio, 
  BatteryCharging, 
  MapPin, 
  Wrench, 
  Smartphone, 
  FileText,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { useCart } from "@/lib/commerce/cart-context";

export default function PersonalBuyPage() {
  const router = useRouter();
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<null | { success: boolean; message: string }>(null);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews" | "warranty">("desc");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const productData = {
    variant_id: "personal-car-4",
    sku: "TRL-CAR-04",
    name: "Personal TPMS",
    subtitle: "Real-time tyre monitoring for your car",
    price_inr: 8999,
    mrp_inr: 12999,
    sensor_count: 4,
    vehicle_type: "4w",
    image_url: "/images/products/treel-car-tpms.png",
  };

  const galleryImages = [
    { label: "Full Kit", desc: "4 Sensors + Valve Hardware + Activation Card" },
    { label: "Sensor Close-up", desc: "8g Ultra-Lightweight Aluminum Housing" },
    { label: "Valve Fitment", desc: "Standard Schrader Valve Compatibility" },
    { label: "Treel App Screen", desc: "Live Pressure & Temperature Telemetry" },
    { label: "ARAI Certified", desc: "Automotive Grade Certified Packaging" },
    { label: "In-Car Telemetry", desc: "Bluetooth 5.0 Instant Dashboard Sync" },
  ];

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setDeliveryStatus({
        success: true,
        message: `Delivery to Pincode ${pincode} within 48–72 hours. Free express shipping.`
      });
    } else {
      setDeliveryStatus({
        success: false,
        message: "Please enter a valid 6-digit Indian postal code."
      });
    }
  };

  const handleAddToCart = () => {
    addItem({
      variant_id: productData.variant_id,
      sku: productData.sku,
      name: productData.name,
      price_inr: productData.price_inr,
      mrp_inr: productData.mrp_inr,
      quantity: quantity,
      image_url: productData.image_url,
      sensor_count: productData.sensor_count,
      vehicle_type: productData.vehicle_type,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    addItem({
      variant_id: productData.variant_id,
      sku: productData.sku,
      name: productData.name,
      price_inr: productData.price_inr,
      mrp_inr: productData.mrp_inr,
      quantity: quantity,
      image_url: productData.image_url,
      sensor_count: productData.sensor_count,
      vehicle_type: productData.vehicle_type,
    });
    router.push("/personal/buy/checkout");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 480) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const discountPercent = Math.round(((productData.mrp_inr - productData.price_inr) / productData.mrp_inr) * 100);

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#10B981] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 transition-all animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <div className="text-sm font-semibold">Added to cart successfully!</div>
          <Link href="/personal/buy/cart" className="underline font-bold text-xs ml-2 hover:text-emerald-100">
            View Cart
          </Link>
        </div>
      )}

      {/* Sticky Buy Bar on Scroll */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-black/[0.06] py-3.5 px-4 sm:px-8 shadow-2xl transition-all duration-300 transform ${
          showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#F3F4F6] border border-black/[0.06] flex items-center justify-center shrink-0">
              <Radio className="w-6 h-6 text-[#2563EB]" />
            </div>
            <div>
              <div className="font-bold text-[#111827] text-sm sm:text-base">Personal TPMS</div>
              <div className="text-xs text-[#6B7280] hidden sm:block">4-Tyre Smart Sensor Kit</div>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-right">
              <div className="font-extrabold text-[#2563EB] text-lg sm:text-xl">₹{productData.price_inr.toLocaleString()}</div>
              <div className="text-xs text-[#9CA3AF] line-through">MRP ₹{productData.mrp_inr.toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                className="px-5 py-2.5 rounded-full bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="px-5 py-2.5 rounded-full bg-[#111827] text-white font-bold text-sm hover:bg-black transition-all shadow-md cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Buy Section */}
      <section className="pt-24 pb-16 border-b border-black/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-8">
            <Link href="/personal" className="hover:text-[#2563EB] transition-colors">Personal TPMS</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="text-[#111827]">Buy Online</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Product Gallery */}
            <div className="lg:col-span-6 space-y-6">
              {/* Main Image Stage */}
              <div className="relative aspect-4/3 rounded-3xl bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/30 border border-black/[0.06] p-8 flex flex-col justify-between overflow-hidden shadow-inner">
                <div className="flex justify-between items-start z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB] text-white font-extrabold text-xs tracking-wider uppercase shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" /> Launch Pricing
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#059669] border border-[#10B981]/20 font-bold text-xs">
                    ARAI Certified
                  </span>
                </div>

                <div className="my-auto flex flex-col items-center justify-center text-center py-10">
                  <div className="w-32 h-32 rounded-3xl bg-white shadow-xl border border-black/[0.06]/80 flex items-center justify-center mb-6 text-[#2563EB] relative group">
                    <Radio className="w-16 h-16 animate-pulse" />
                    <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#111827] text-white font-mono text-[10px] font-bold">
                      BLE 5.0
                    </div>
                  </div>
                  <h4 className="font-bold text-[#111827] text-lg sm:text-xl">{galleryImages[selectedImage].label}</h4>
                  <p className="text-[#6B7280] text-xs sm:text-sm mt-1 max-w-sm">{galleryImages[selectedImage].desc}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6B7280] pt-4 border-t border-black/[0.06]/60 z-10">
                  <span>Kit SKU: {productData.sku}</span>
                  <span>4 Wireless Sensors Included</span>
                </div>
              </div>

              {/* Thumbnail Carousel */}
              <div className="grid grid-cols-6 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl p-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      selectedImage === idx 
                        ? "border-2 border-blue-600 bg-blue-50/50 shadow-sm" 
                        : "border border-black/[0.06] bg-white hover:border-black/[0.12] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    <span className="font-bold text-[10px] sm:text-xs text-[#374151] leading-tight line-clamp-2">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Summary */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-block inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em] mb-3">
                  DIRECT FROM JK TYRE & TREEL
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
                  {productData.name}
                </h1>
                <p className="text-[#4B5563] text-base sm:text-lg mt-2 font-medium">
                  {productData.subtitle}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <span className="font-extrabold text-[#111827] text-sm">4.8 / 5.0</span>
                <span className="text-[#9CA3AF] text-sm">·</span>
                <Link href="/personal/reviews" className="text-[#2563EB] hover:text-[#1D4ED8] text-sm font-semibold hover:underline">
                  2,400+ Verified Reviews →
                </Link>
              </div>

              {/* Pricing Box */}
              <div className="p-5 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-[#2563EB] tracking-tight">
                    ₹{productData.price_inr.toLocaleString()}
                  </span>
                  <span className="text-[#9CA3AF] text-lg line-through font-medium">
                    ₹{productData.mrp_inr.toLocaleString()}
                  </span>
                  <span className="text-xs font-extrabold text-[#059669] bg-emerald-100 px-2.5 py-1 rounded-full">
                    SAVE {discountPercent}%
                  </span>
                </div>
                <p className="text-xs text-[#6B7280]">
                  Inclusive of all taxes. Free pan-India express courier dispatch within 48 hours.
                </p>
              </div>

              {/* Delivery Estimator Form */}
              <form onSubmit={handlePincodeCheck} className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider">
                  Check Delivery Time & Availability
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit postal pincode"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-black/[0.12] text-sm font-medium text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-full bg-[#111827] text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors shrink-0 cursor-pointer"
                  >
                    Check Delivery
                  </button>
                </div>
                {deliveryStatus && (
                  <div className={`text-xs font-medium p-3 rounded-lg mt-2 flex items-start gap-2 ${
                    deliveryStatus.success ? "bg-[#10B981]/10 text-emerald-800 border border-[#10B981]/20" : "bg-red-50 text-red-800 border border-red-200"
                  }`}>
                    {deliveryStatus.success ? <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" /> : null}
                    <span>{deliveryStatus.message}</span>
                  </div>
                )}
              </form>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-4 pt-4 border-t border-black/[0.06]">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#374151] uppercase tracking-wider">Quantity:</span>
                  <div className="flex items-center border border-black/[0.12] rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-[#4B5563] hover:bg-[#F3F4F6] font-bold transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold text-[#111827] min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-[#4B5563] hover:bg-[#F3F4F6] font-bold transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-[#6B7280] font-medium">({quantity * 4} smart sensors total)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-full bg-[#2563EB] text-white font-bold text-base hover:bg-[#1D4ED8] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-5 h-5" /> Add to Cart →
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 rounded-full bg-[#111827] text-white font-bold text-base hover:bg-black transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Buy Now →
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-black/[0.06]">
                <div className="p-3 rounded-xl bg-[#F9FAFB] border border-black/[0.06]/80 text-center space-y-1">
                  <Truck className="w-5 h-5 text-[#2563EB] mx-auto" />
                  <div className="text-[11px] font-bold text-[#111827]">Free Shipping</div>
                  <div className="text-[10px] text-[#6B7280]">Pan-India express</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F9FAFB] border border-black/[0.06]/80 text-center space-y-1">
                  <Clock className="w-5 h-5 text-[#2563EB] mx-auto" />
                  <div className="text-[11px] font-bold text-[#111827]">48-Hour Dispatch</div>
                  <div className="text-[10px] text-[#6B7280]">Direct from factory</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F9FAFB] border border-black/[0.06]/80 text-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-[#2563EB] mx-auto" />
                  <div className="text-[11px] font-bold text-[#111827]">1-Year Warranty</div>
                  <div className="text-[10px] text-[#6B7280]">Full replacement</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F9FAFB] border border-black/[0.06]/80 text-center space-y-1">
                  <Lock className="w-5 h-5 text-[#2563EB] mx-auto" />
                  <div className="text-[11px] font-bold text-[#111827]">Secure Checkout</div>
                  <div className="text-[10px] text-[#6B7280]">Razorpay protected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs Section */}
      <section className="py-16 bg-[#F9FAFB] border-b border-black/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          {/* Tab Headers */}
          <div className="flex items-center gap-2 border-b border-black/[0.06] pb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab("desc")}
              className={`px-6 py-3 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === "desc"
                  ? "border-blue-600 text-[#2563EB] bg-white rounded-t-lg"
                  : "border-transparent text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`px-6 py-3 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === "specs"
                  ? "border-blue-600 text-[#2563EB] bg-white rounded-t-lg"
                  : "border-transparent text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === "reviews"
                  ? "border-blue-600 text-[#2563EB] bg-white rounded-t-lg"
                  : "border-transparent text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              Reviews (2,400+)
            </button>
            <button
              onClick={() => setActiveTab("warranty")}
              className={`px-6 py-3 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === "warranty"
                  ? "border-blue-600 text-[#2563EB] bg-white rounded-t-lg"
                  : "border-transparent text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              Warranty & Guarantee
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-8 sm:p-10 bg-white rounded-b-2xl border border-t-0 border-black/[0.06] shadow-sm">
            {activeTab === "desc" && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">
                    Complete Real-Time Tyre Monitoring for Personal Vehicles
                  </h3>
                  <p className="text-[#4B5563] text-base leading-relaxed">
                    Personal TPMS is a complete tyre monitoring kit for any personal vehicle. Four wireless sensors mount on your tyre valve stems, connect via Bluetooth to your phone, and give you real-time pressure and temperature readings on every drive.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="p-5 rounded-xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                    <Gauge className="w-6 h-6 text-[#2563EB]" />
                    <h4 className="font-bold text-[#111827] text-base">Continuous Visibility</h4>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Telemetry refreshes every three seconds in motion with ±0.5 PSI medical precision.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                    <Radio className="w-6 h-6 text-[#2563EB]" />
                    <h4 className="font-bold text-[#111827] text-base">Direct BLE 5.0</h4>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Zero cables, zero display units cluttering your windshield. Connects directly to Treel App.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                    <BatteryCharging className="w-6 h-6 text-[#2563EB]" />
                    <h4 className="font-bold text-[#111827] text-base">2-Year Battery Life</h4>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      User-replaceable CR1632 coin cells with 6-week advance low-battery push notifications.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-2">Key Technical Specifications</h3>
                  <p className="text-[#4B5563] text-sm">Condensed specs for the 4-tyre personal sensor kit.</p>
                </div>

                <div className="overflow-hidden border border-black/[0.06] rounded-xl">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-black/[0.06]">
                      <tr className="bg-[#F9FAFB]/50">
                        <td className="py-3 px-4 font-bold text-[#374151] w-1/3">Pressure Accuracy</td>
                        <td className="py-3 px-4 text-[#111827] font-medium">±0.5 PSI (±3.4 kPa)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-[#374151]">Pressure Range</td>
                        <td className="py-3 px-4 text-[#111827] font-medium">0–100 PSI (0–690 kPa)</td>
                      </tr>
                      <tr className="bg-[#F9FAFB]/50">
                        <td className="py-3 px-4 font-bold text-[#374151]">Update Frequency</td>
                        <td className="py-3 px-4 text-[#111827] font-medium">Every 3 seconds when in motion</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-[#374151]">Waterproof Rating</td>
                        <td className="py-3 px-4 text-[#111827] font-medium">IP67 Submersible Dust & Water Shield</td>
                      </tr>
                      <tr className="bg-[#F9FAFB]/50">
                        <td className="py-3 px-4 font-bold text-[#374151]">Sensor Weight</td>
                        <td className="py-3 px-4 text-[#111827] font-medium">8 grams per sensor</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-[#374151]">Certifications</td>
                        <td className="py-3 px-4 text-[#111827] font-medium">ARAI, BIS Registration, CE Compliant</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-2">
                  <Link href="/personal/specs" className="inline-flex items-center gap-2 text-[#2563EB] font-bold text-sm hover:underline">
                    See full specifications sheet →
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
                  <div>
                    <h3 className="text-2xl font-bold text-[#111827]">Verified Customer Reviews</h3>
                    <p className="text-[#6B7280] text-sm mt-1">Based on 2,400+ verified owner ratings nationwide</p>
                  </div>
                  <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl">
                    <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="font-extrabold text-blue-900 text-lg">4.8 / 5.0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-[#111827] text-sm">Rahul S. — Honda City Owner, Pune</div>
                      <div className="flex text-[#F59E0B]"><Star className="w-3.5 h-3.5 fill-[#F59E0B]" /> 5.0</div>
                    </div>
                    <p className="text-[#4B5563] text-xs sm:text-sm leading-relaxed">
                      "Caught a slow valve pin puncture on the Pune-Mumbai expressway before I even felt tyre drag. Saved me a dangerous highway tyre blowout."
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-[#111827] text-sm">Priya M. — Hyundai Creta Owner, Bengaluru</div>
                      <div className="flex text-[#F59E0B]"><Star className="w-3.5 h-3.5 fill-[#F59E0B]" /> 5.0</div>
                    </div>
                    <p className="text-[#4B5563] text-xs sm:text-sm leading-relaxed">
                      "Setup was done in literally 8 minutes with the QR code. Clean iOS widgets on my home screen and zero messy dashboard screens."
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/personal/reviews" className="inline-flex items-center gap-2 text-[#2563EB] font-bold text-sm hover:underline">
                    See all 2,400+ customer reviews →
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "warranty" && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-2">1-Year Full Replacement Warranty</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">
                    1-year full replacement warranty on all four sensors and the app. Covers manufacturing defects. Does not cover physical damage, water damage below IP67, or battery replacement (consumable).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 space-y-1.5">
                    <div className="font-bold text-emerald-900 text-sm">What is Covered</div>
                    <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                      <li>Manufacturing defects in sensors</li>
                      <li>Bluetooth connectivity hardware failure</li>
                      <li>Internal pressure transducer accuracy</li>
                      <li>Full sensor replacement dispatched in 48h</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F3F4F6] border border-black/[0.06] space-y-1.5">
                    <div className="font-bold text-[#111827] text-sm">What is Not Covered</div>
                    <ul className="text-xs text-[#4B5563] space-y-1 list-disc list-inside">
                      <li>Crushing or severe road collision impact</li>
                      <li>Consumable CR1632 coin cell replacement</li>
                      <li>Physical sensor theft or loss</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/personal/support/warranty" className="inline-flex items-center gap-2 text-[#2563EB] font-bold text-sm hover:underline">
                    Read full warranty terms & register online →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What's in the box Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em] inline-block">
              KIT CONTENTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
              What ships to you.
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg">
              Everything required to monitor your personal car in one uncompromised package.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-sm">
                4×
              </div>
              <h4 className="font-bold text-[#111827] text-base">Wireless TPMS Sensors</h4>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                8g aluminum-shielded BLE 5.0 valve stem sensors with pre-installed CR1632 cells.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-sm">
                1×
              </div>
              <h4 className="font-bold text-[#111827] text-base">Quick-Start QR Activation Card</h4>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Instant pairing QR card for seamless 10-minute setup via Treel Mobile App.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-sm">
                4×
              </div>
              <h4 className="font-bold text-[#111827] text-base">Anti-Theft Lock Nuts & Caps</h4>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Precision brass locking hex nuts to secure sensors permanently onto valve stems.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-sm">
                1×
              </div>
              <h4 className="font-bold text-[#111827] text-base">Installation & Calibration Tool</h4>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Custom mini-spanner tool for effortless tightening and battery compartment access.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-sm">
                1×
              </div>
              <h4 className="font-bold text-[#111827] text-base">Treel Care App License</h4>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Lifetime mobile app license with iOS, Android, and Apple Watch companion features.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-sm">
                1×
              </div>
              <h4 className="font-bold text-[#111827] text-base">1-Year Warranty Certificate</h4>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Official JK Tyre & Treel warranty card with direct priority replacement support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Content Cards Section */}
      <section className="py-16 bg-[#F9FAFB] border-b border-black/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/personal/features" className="p-6 rounded-3xl bg-white border border-black/[0.06] hover:border-blue-500 hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-xs uppercase tracking-wider text-[#2563EB]">Feature Deep-Dive</span>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-[#111827] text-lg group-hover:text-[#2563EB] transition-colors">How it works →</h4>
              <p className="text-xs text-[#6B7280] mt-2">
                Explore real-time pressure monitoring, BLE transmission, and automated leak detection algorithms.
              </p>
            </Link>

            <Link href="/personal/support/setup" className="p-6 rounded-3xl bg-white border border-black/[0.06] hover:border-blue-500 hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-xs uppercase tracking-wider text-[#2563EB]">DIY Installation</span>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-[#111827] text-lg group-hover:text-[#2563EB] transition-colors">Setup guide →</h4>
              <p className="text-xs text-[#6B7280] mt-2">
                Step-by-step visual walkthrough to screw on sensors and pair your vehicle in under 10 minutes.
              </p>
            </Link>

            <Link href="/personal/reviews" className="p-6 rounded-3xl bg-white border border-black/[0.06] hover:border-blue-500 hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-xs uppercase tracking-wider text-[#2563EB]">Customer Proof</span>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-[#111827] text-lg group-hover:text-[#2563EB] transition-colors">See customer reviews →</h4>
              <p className="text-xs text-[#6B7280] mt-2">
                Read real-world highway driving experiences from car owners across India.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
