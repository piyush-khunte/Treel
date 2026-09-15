"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Lock, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  SlidersHorizontal
} from "lucide-react";
import { useCart } from "@/lib/commerce/cart-context";
import { PERSONAL_PRODUCTS, PersonalProduct } from "@/lib/data/personal-products";

export default function PersonalBuyPage() {
  const router = useRouter();
  const { addItem } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories = ["All", "Car Kit", "Bike Kit", "Upgrade Kit"];

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return PERSONAL_PRODUCTS;
    return PERSONAL_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = (product: PersonalProduct, e: React.MouseEvent) => {
    e.stopPropagation();

    const vehicleType = product.category === "Bike Kit" ? "2w" : "4w";
    const sensorCount = product.title.includes("5 Sensor") 
      ? 5 
      : product.title.includes("4 Sensor") 
      ? 4 
      : product.category === "Bike Kit" 
      ? 2 
      : 4;

    addItem({
      variant_id: product.slug,
      sku: product.productsku || product.slug,
      name: product.title,
      price_inr: product.price,
      mrp_inr: product.saleprice || product.price,
      quantity: 1,
      image_url: product.image,
      sensor_count: sensorCount,
      vehicle_type: vehicleType,
    });

    setAddedToast(product.title);
    setTimeout(() => setAddedToast(null), 3500);
  };

  const handleBuyNow = (product: PersonalProduct, e: React.MouseEvent) => {
    e.stopPropagation();

    const vehicleType = product.category === "Bike Kit" ? "2w" : "4w";
    const sensorCount = product.title.includes("5 Sensor") 
      ? 5 
      : product.title.includes("4 Sensor") 
      ? 4 
      : product.category === "Bike Kit" 
      ? 2 
      : 4;

    addItem({
      variant_id: product.slug,
      sku: product.productsku || product.slug,
      name: product.title,
      price_inr: product.price,
      mrp_inr: product.saleprice || product.price,
      quantity: 1,
      image_url: product.image,
      sensor_count: sensorCount,
      vehicle_type: vehicleType,
    });

    router.push("/personal/buy/checkout");
  };

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#10B981] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 transition-all animate-in fade-in slide-in-from-top-4 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <div className="text-xs sm:text-sm font-semibold truncate">
            Added <span className="font-bold">{addedToast}</span> to cart!
          </div>
          <Link 
            href="/personal/buy/cart" 
            className="underline font-bold text-xs ml-auto shrink-0 hover:text-emerald-100"
          >
            View Cart →
          </Link>
        </div>
      )}

      {/* Hero / Header Section */}
      <section className="pt-24 pb-12 border-b border-black/[0.06] bg-gradient-to-b from-white via-slate-50/40 to-[#F3F4F6]/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-6">
            <Link href="/personal" className="hover:text-[#2563EB] transition-colors">Personal TPMS</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="text-[#111827]">Product Store</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] text-xs font-bold uppercase tracking-[0.15em]">
                <Sparkles className="w-3.5 h-3.5" /> DIRECT FROM JK TYRE & TREEL
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
                Smart TPMS Products & Kits
              </h1>
              <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-medium">
                Engineered tyre pressure and temperature monitoring kits for cars, SUVs, bikes, and connected vehicle tracking. Choose your system below.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/personal/buy/cart"
                className="px-6 py-3 rounded-full bg-[#111827] text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-all shadow-sm flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 text-[#2563EB]" /> View Cart
              </Link>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pt-8 pb-2 scrollbar-none">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center gap-1.5 mr-2 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" /> Filter:
            </span>
            {categories.map((cat) => {
              const count = cat === "All" 
                ? PERSONAL_PRODUCTS.length 
                : PERSONAL_PRODUCTS.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "bg-[#F3F4F6] text-[#4B5563] hover:text-[#111827] hover:bg-[#E5E7EB]"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-black/[0.06] text-[#6B7280]"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] mb-10">
            <div className="text-sm font-bold text-[#111827]">
              Showing <span className="text-[#2563EB]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "Product" : "Products"}
            </div>
            <div className="text-xs text-[#6B7280]">
              All items include factory calibration & warranty
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const hasDiscount = product.saleprice && product.saleprice > product.price;
              const discountPercent = hasDiscount && product.saleprice 
                ? Math.round(((product.saleprice - product.price) / product.saleprice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  className="p-6 rounded-3xl bg-white border border-black/[0.06] hover:border-[#2563EB]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Container */}
                    <Link 
                      href={`/personal/product?slug=${product.slug}`} 
                      className="block aspect-square rounded-2xl bg-[#F3F4F6] p-6 mb-4 relative overflow-hidden flex items-center justify-center group-hover:bg-slate-100 transition-colors"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Category Eyebrow */}
                    <div className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wider mb-1.5">
                      {product.category}
                    </div>

                    {/* Title */}
                    <Link 
                      href={`/personal/product?slug=${product.slug}`}
                      className="block font-bold text-lg text-[#111827] group-hover:text-[#2563EB] transition-colors line-clamp-2 min-h-[3.5rem] mb-2 leading-snug"
                    >
                      {product.title}
                    </Link>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#6B7280] line-clamp-2 min-h-[2.5rem] leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Action Section */}
                  <div className="pt-4 border-t border-black/[0.06] space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-[#111827] tracking-tight">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-[#6B7280] line-through font-medium">
                            ₹{product.saleprice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {hasDiscount && discountPercent > 0 && (
                        <span className="text-[10px] font-extrabold text-[#059669] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 pt-1">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-full py-3 rounded-full bg-[#2563EB] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1D4ED8] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                      <button
                        onClick={(e) => handleBuyNow(product, e)}
                        className="w-full py-2.5 rounded-full bg-[#111827] text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                      >
                        Buy Now →
                      </button>
                    </div>

                    <div className="text-center pt-1">
                      <Link 
                        href={`/personal/product?slug=${product.slug}`}
                        className="text-[11px] font-bold text-[#6B7280] hover:text-[#2563EB] transition-colors"
                      >
                        View Full Specs & Gallery →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-14 bg-[#F9FAFB] border-t border-b border-black/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-black/[0.06] text-center space-y-1.5">
              <Truck className="w-6 h-6 text-[#2563EB] mx-auto" />
              <div className="text-xs font-bold text-[#111827]">Free Express Shipping</div>
              <div className="text-[11px] text-[#6B7280]">Pan-India courier delivery</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/[0.06] text-center space-y-1.5">
              <Clock className="w-6 h-6 text-[#2563EB] mx-auto" />
              <div className="text-xs font-bold text-[#111827]">48-Hour Dispatch</div>
              <div className="text-[11px] text-[#6B7280]">Direct from factory stock</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/[0.06] text-center space-y-1.5">
              <ShieldCheck className="w-6 h-6 text-[#2563EB] mx-auto" />
              <div className="text-xs font-bold text-[#111827]">JK Tyre Backed Warranty</div>
              <div className="text-[11px] text-[#6B7280]">Full replacement coverage</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/[0.06] text-center space-y-1.5">
              <Lock className="w-6 h-6 text-[#2563EB] mx-auto" />
              <div className="text-xs font-bold text-[#111827]">Secure Checkout</div>
              <div className="text-[11px] text-[#6B7280]">256-bit encrypted gateway</div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Informational Links */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">HELP & GUIDANCE</div>
            <h3 className="text-2xl font-bold text-[#111827]">Frequently Explored TPMS Resources</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/personal/features" 
              className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-[#2563EB]">Feature Deep-Dive</span>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-[#111827] text-base group-hover:text-[#2563EB] transition-colors">How Treel TPMS Works →</h4>
              <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                Discover BLE transmission, continuous tire pressure monitoring, and smart leak detection algorithms.
              </p>
            </Link>

            <Link 
              href="/personal/support/setup" 
              className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-[#2563EB]">DIY Guide</span>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-[#111827] text-base group-hover:text-[#2563EB] transition-colors">Installation Walkthrough →</h4>
              <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                Step-by-step visual tutorial to install valve sensors and pair with the mobile app in minutes.
              </p>
            </Link>

            <Link 
              href="/personal/reviews" 
              className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-[#2563EB]">Customer Stories</span>
                <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-[#111827] text-base group-hover:text-[#2563EB] transition-colors">Verified Customer Reviews →</h4>
              <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                Read authentic highway and daily commuting experiences from drivers and riders across India.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
