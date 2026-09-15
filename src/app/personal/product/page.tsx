"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Lock, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  Layers,
  Wrench,
  Package,
  FileText
} from "lucide-react";
import { useCart } from "@/lib/commerce/cart-context";
import { PERSONAL_PRODUCTS, PersonalProduct, getPersonalProductBySlug } from "@/lib/data/personal-products";

function ProductDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slugParam = searchParams.get("slug");
  const { addItem } = useCart();

  const product: PersonalProduct = useMemo(() => {
    if (slugParam) {
      const found = getPersonalProductBySlug(slugParam);
      if (found) return found;
    }
    return PERSONAL_PRODUCTS[0];
  }, [slugParam]);

  // Gather all valid gallery images
  const images = useMemo(() => {
    const list: string[] = [];
    if (product.image) list.push(product.image);
    if (product.image2) list.push(product.image2);
    if (product.image3) list.push(product.image3);
    if (product.image4) list.push(product.image4);
    if (product.image5) list.push(product.image5);
    if (product.galleryImage1) list.push(product.galleryImage1);
    if (product.galleryImage2) list.push(product.galleryImage2);
    return list;
  }, [product]);

  const [selectedImgIndex, setSelectedImgIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "box" | "install">("overview");

  // Reset selected image when product changes
  React.useEffect(() => {
    setSelectedImgIndex(0);
    setQuantity(1);
  }, [product.slug]);

  const hasDiscount = product.saleprice && product.saleprice > product.price;
  const discountPercent = hasDiscount && product.saleprice 
    ? Math.round(((product.saleprice - product.price) / product.saleprice) * 100)
    : 0;

  const vehicleType = product.category === "Bike Kit" ? "2w" : "4w";
  const sensorCount = product.title.includes("5 Sensor") 
    ? 5 
    : product.title.includes("4 Sensor") 
    ? 4 
    : product.category === "Bike Kit" 
    ? 2 
    : 4;

  const handleAddToCart = () => {
    addItem({
      variant_id: product.slug,
      sku: product.productsku || product.slug,
      name: product.title,
      price_inr: product.price,
      mrp_inr: product.saleprice || product.price,
      quantity: quantity,
      image_url: product.image,
      sensor_count: sensorCount,
      vehicle_type: vehicleType,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    addItem({
      variant_id: product.slug,
      sku: product.productsku || product.slug,
      name: product.title,
      price_inr: product.price,
      mrp_inr: product.saleprice || product.price,
      quantity: quantity,
      image_url: product.image,
      sensor_count: sensorCount,
      vehicle_type: vehicleType,
    });
    router.push("/personal/buy/checkout");
  };

  // Steps list if available
  const steps = useMemo(() => {
    const list: { step: string; desc: string }[] = [];
    if (product.stepdescription1) {
      list.push({ step: product.stepone || "Step 1", desc: product.stepdescription1 });
    }
    if (product.stepdescription2) {
      list.push({ step: product.steptwo || "Step 2", desc: product.stepdescription2 });
    }
    if (product.stepdescription3 && product.stepdescription3 !== "undefined" && product.stepdescription3 !== "3") {
      list.push({ step: product.stepthree || "Step 3", desc: product.stepdescription3 });
    }
    if (product.stepdescription4 && product.stepdescription4 !== "undefined") {
      list.push({ step: product.stepfour || "Step 4", desc: product.stepdescription4 });
    }
    return list;
  }, [product]);

  // Related products from same category or others
  const relatedProducts = useMemo(() => {
    return PERSONAL_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);
  }, [product.slug]);

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#10B981] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 transition-all animate-in fade-in slide-in-from-top-4 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <div className="text-xs sm:text-sm font-semibold truncate">
            Added <span className="font-bold">{product.title}</span> ({quantity}) to cart!
          </div>
          <Link href="/personal/buy/cart" className="underline font-bold text-xs ml-auto shrink-0 hover:text-emerald-100">
            View Cart →
          </Link>
        </div>
      )}

      {/* Product Details Section */}
      <section className="pt-24 pb-16 border-b border-black/[0.06]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-8 overflow-x-auto">
            <Link href="/personal" className="hover:text-[#2563EB] transition-colors shrink-0">Personal TPMS</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <Link href="/personal/buy" className="hover:text-[#2563EB] transition-colors shrink-0">Product Store</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <span className="text-[#111827] truncate shrink-0">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-square rounded-3xl bg-[#F3F4F6] border border-black/[0.06] p-8 flex items-center justify-center relative overflow-hidden shadow-inner">
                <Image
                  src={images[selectedImgIndex] || product.image}
                  alt={product.title}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#F3F4F6] border-2 transition-all shrink-0 cursor-pointer ${
                        selectedImgIndex === idx 
                          ? "border-[#2563EB] shadow-sm scale-95" 
                          : "border-black/[0.06] hover:border-black/[0.15]"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`${product.title} view ${idx + 1}`}
                        fill
                        unoptimized
                        className="object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Information Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] text-xs font-bold uppercase tracking-[0.15em] mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> {product.category}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111827] leading-tight">
                  {product.title}
                </h1>
                <p className="text-[#4B5563] text-base sm:text-lg mt-2 font-medium">
                  {product.description}
                </p>
                {product.productsku && (
                  <div className="text-xs text-[#9CA3AF] mt-1 font-mono">
                    SKU: {product.productsku}
                  </div>
                )}
              </div>

              {/* Pricing Box */}
              <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] tracking-tight">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <span className="text-[#9CA3AF] text-lg line-through font-medium">
                      ₹{product.saleprice?.toLocaleString()}
                    </span>
                  )}
                  {hasDiscount && discountPercent > 0 && (
                    <span className="text-xs font-extrabold text-[#059669] bg-emerald-100 px-2.5 py-1 rounded-full">
                      SAVE {discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B7280]">
                  Inclusive of all taxes. Free express courier delivery pan-India.
                </p>
              </div>

              {/* Quantity & CTA */}
              <div className="space-y-4 pt-2">
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-full bg-[#2563EB] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#1D4ED8] transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 rounded-full bg-[#111827] text-white font-bold text-sm uppercase tracking-wider hover:bg-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    Buy Now →
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-black/[0.06]">
                <div className="p-3 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] text-center space-y-1">
                  <Truck className="w-5 h-5 text-[#2563EB] mx-auto" />
                  <div className="text-[11px] font-bold text-[#111827]">Free Shipping</div>
                  <div className="text-[10px] text-[#6B7280]">Pan-India express</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] text-center space-y-1">
                  <Clock className="w-5 h-5 text-[#2563EB] mx-auto" />
                  <div className="text-[11px] font-bold text-[#111827]">48-Hour Dispatch</div>
                  <div className="text-[10px] text-[#6B7280]">Direct from factory</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] text-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-[#2563EB] mx-auto" />
                  <div className="text-[11px] font-bold text-[#111827]">JK Tyre Warranty</div>
                  <div className="text-[10px] text-[#6B7280]">Full replacement</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] text-center space-y-1">
                  <Lock className="w-5 h-5 text-[#2563EB] mx-auto" />
                  <div className="text-[11px] font-bold text-[#111827]">Secure Gateway</div>
                  <div className="text-[10px] text-[#6B7280]">256-bit SSL encrypted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section: Overview, In The Box, Installation */}
      <section className="py-16 bg-[#F9FAFB] border-b border-black/[0.06]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="flex items-center gap-2 border-b border-black/[0.06] pb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === "overview"
                  ? "border-blue-600 text-[#2563EB] bg-white rounded-t-xl"
                  : "border-transparent text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              Highlights & Details
            </button>
            {product.boxpoint && (
              <button
                onClick={() => setActiveTab("box")}
                className={`px-6 py-3 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
                  activeTab === "box"
                    ? "border-blue-600 text-[#2563EB] bg-white rounded-t-xl"
                    : "border-transparent text-[#4B5563] hover:text-[#111827]"
                }`}
              >
                In The Box
              </button>
            )}
            {steps.length > 0 && (
              <button
                onClick={() => setActiveTab("install")}
                className={`px-6 py-3 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
                  activeTab === "install"
                    ? "border-blue-600 text-[#2563EB] bg-white rounded-t-xl"
                    : "border-transparent text-[#4B5563] hover:text-[#111827]"
                }`}
              >
                Installation Guide ({steps.length} Steps)
              </button>
            )}
          </div>

          <div className="p-8 sm:p-12 bg-white rounded-b-3xl border border-t-0 border-black/[0.06] shadow-sm">
            {activeTab === "overview" && (
              <div className="max-w-4xl space-y-6">
                {product.editorValue ? (
                  <div 
                    className="text-[#4B5563] text-sm sm:text-base leading-relaxed space-y-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-[#111827] [&>h2]:mt-6 [&>h2]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>p]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.editorValue }}
                  />
                ) : (
                  <div className="space-y-4 text-[#4B5563] text-base leading-relaxed">
                    <h3 className="text-xl font-bold text-[#111827]">Product Overview</h3>
                    <p>{product.description}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "box" && product.boxpoint && (
              <div className="max-w-4xl space-y-6">
                <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#2563EB]" /> Package Contents
                </h3>
                <div 
                  className="p-6 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] text-[#4B5563] text-sm sm:text-base leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2"
                  dangerouslySetInnerHTML={{ __html: product.boxpoint }}
                />
              </div>
            )}

            {activeTab === "install" && steps.length > 0 && (
              <div className="max-w-4xl space-y-6">
                <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-[#2563EB]" /> Step-by-Step Installation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {steps.map((s, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-[#F9FAFB] border border-black/[0.06] space-y-2">
                      <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </div>
                      <h4 className="font-bold text-[#111827] text-base">{s.step}</h4>
                      <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Other Kits in the Catalog */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-black/[0.06]">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">MORE OPTIONS</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">Explore Other TPMS Kits</h3>
            </div>
            <Link
              href="/personal/buy"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] uppercase tracking-wider hover:underline"
            >
              Browse All 14 Kits →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/personal/product?slug=${rel.slug}`}
                className="p-5 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] hover:border-[#2563EB]/40 hover:bg-white hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square rounded-2xl bg-white p-4 mb-4 relative overflow-hidden flex items-center justify-center">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      unoptimized
                      className="object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider mb-1">
                    {rel.category}
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-[#111827] group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                </div>
                <div className="pt-3 border-t border-black/[0.06] mt-4 flex items-baseline justify-between">
                  <span className="font-extrabold text-base text-[#111827]">
                    ₹{rel.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-[#2563EB]">
                    View Kit →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PersonalProductPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center text-sm font-bold text-[#6B7280]">
        Loading product details...
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}
