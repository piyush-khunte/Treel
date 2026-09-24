"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/commerce/cart-context";
import { EcosystemBar } from "./ecosystem-bar";

export function PersonalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false);
  const [mobileAppOpen, setMobileAppOpen] = useState(false);

  const pathname = usePathname();
  const { totalItems } = useCart();

  const isProductActive = pathname === "/personal/buy" || pathname.startsWith("/personal/product");
  const isFeaturesActive = pathname.startsWith("/personal/features");
  const isSpecsActive = pathname === "/personal/specs";
  const isReviewsActive = pathname === "/personal/reviews";
  const isFaqsActive = pathname === "/personal/faqs";
  const isSupportActive = pathname.startsWith("/personal/support") || pathname === "/personal/track-order";
  const isBlogActive = pathname.startsWith("/personal/blog");
  const isAppActive = pathname.startsWith("/personal/app");

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Top Production Ecosystem Bar */}
      <EcosystemBar />

      {/* Main Nav */}
      <div className="border-b border-black/[0.06] bg-white/95 backdrop-blur-md font-manrope">
        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          {/* Brand Area */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0 mr-3 xl:mr-5">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="Treel"
                width={180}
                height={50}
                className="h-9 sm:h-10 lg:h-11 xl:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                priority
              />
            </Link>

            <div className="h-7 sm:h-8 w-[1px] bg-black/[0.08] hidden sm:block" />

            {/* Personal TPMS Logo & Brand Mark */}
            <Link href="/personal" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="flex items-center group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
                  <g fill="#2563EB">
                    <rect x="12" y="8" width="76" height="5" rx="1" />
                    <rect x="12" y="18" width="76" height="5" rx="1" />
                    <rect x="12" y="28" width="76" height="5" rx="1" />
                  </g>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-manrope text-[17px] sm:text-[19px] font-extrabold tracking-tight text-[#111827] group-hover:text-[#2563EB] transition-colors whitespace-nowrap leading-none">
                  TPMS
                </span>
                <span className="text-[8px] sm:text-[8.5px] tracking-widest uppercase text-[#6B7280] font-bold mt-0.5 whitespace-nowrap">
                  Smart Tyre Sensors
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Links — Strictly Treel Sitemap Tree V 1.3 */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4 2xl:gap-5 text-[12.5px] xl:text-[13px] 2xl:text-sm font-semibold text-[#4B5563] font-manrope">
            {/* PRODUCT */}
            <Link 
              href="/personal/buy" 
              className={`hover:text-[#2563EB] transition-colors whitespace-nowrap py-2 ${
                isProductActive ? "text-[#2563EB] font-bold" : ""
              }`}
            >
              Product
            </Link>

            {/* FEATURES */}
            <div className="relative group">
              <Link
                href="/personal/features"
                className={`flex items-center gap-1 py-2 hover:text-[#2563EB] transition-colors whitespace-nowrap ${
                  isFeaturesActive ? "text-[#2563EB] font-bold" : ""
                }`}
              >
                <span>Features</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-56 p-2 bg-white rounded-xl shadow-xl border border-slate-200/80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/personal/features" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Features Overview
                </Link>
                <Link href="/personal/features/monitoring" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Continuous Monitoring
                </Link>
                <Link href="/personal/features/alerts" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Smart Audio Alerts
                </Link>
                <Link href="/personal/features/app" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Mobile App Sync
                </Link>
                <Link href="/personal/features/battery" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  5-Year Battery Life
                </Link>
              </div>
            </div>

            {/* SPECS */}
            <Link 
              href="/personal/specs" 
              className={`hover:text-[#2563EB] transition-colors whitespace-nowrap py-2 ${
                isSpecsActive ? "text-[#2563EB] font-bold" : ""
              }`}
            >
              Specs
            </Link>

            {/* REVIEWS */}
            <Link 
              href="/personal/reviews" 
              className={`hover:text-[#2563EB] transition-colors whitespace-nowrap py-2 ${
                isReviewsActive ? "text-[#2563EB] font-bold" : ""
              }`}
            >
              Reviews
            </Link>

            {/* FAQS */}
            <Link 
              href="/personal/faqs" 
              className={`hover:text-[#2563EB] transition-colors whitespace-nowrap py-2 ${
                isFaqsActive ? "text-[#2563EB] font-bold" : ""
              }`}
            >
              FAQs
            </Link>

            {/* SUPPORT */}
            <div className="relative group">
              <Link
                href="/personal/support"
                className={`flex items-center gap-1 py-2 hover:text-[#2563EB] transition-colors whitespace-nowrap ${
                  isSupportActive ? "text-[#2563EB] font-bold" : ""
                }`}
              >
                <span>Support</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-56 p-2 bg-white rounded-xl shadow-xl border border-slate-200/80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/personal/support" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Support Center
                </Link>
                <Link href="/personal/support/setup" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Setup &amp; Installation
                </Link>
                <Link href="/personal/support/troubleshooting" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Troubleshooting
                </Link>
                <Link href="/personal/support/warranty" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Warranty &amp; Claims
                </Link>
                <Link href="/personal/support/contact" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Contact Support
                </Link>
                <Link href="/personal/track-order" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Track Order
                </Link>
              </div>
            </div>

            {/* RESOURCES */}
            <Link 
              href="/personal/blog" 
              className={`hover:text-[#2563EB] transition-colors whitespace-nowrap py-2 ${
                isBlogActive ? "text-[#2563EB] font-bold" : ""
              }`}
            >
              Blog
            </Link>

            {/* APP */}
            <div className="relative group">
              <Link
                href="/personal/app"
                className={`flex items-center gap-1 py-2 hover:text-[#2563EB] transition-colors whitespace-nowrap ${
                  isAppActive ? "text-[#2563EB] font-bold" : ""
                }`}
              >
                <span>App</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-48 p-2 bg-white rounded-xl shadow-xl border border-slate-200/80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/personal/app" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Treel Care App
                </Link>
                <Link href="/personal/app/ios" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Download for iOS
                </Link>
                <Link href="/personal/app/android" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors">
                  Download for Android
                </Link>
              </div>
            </div>
          </nav>

          {/* Cart & Shop CTAs */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
            <Link href="/personal/buy/cart" className="relative p-2.5 rounded-full border border-black/[0.08] hover:bg-[#F3F4F6] text-[#111827] transition-colors shrink-0" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2563EB] text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link href="/personal/buy" className="hidden sm:inline-block shrink-0">
              <button className="rounded-full font-manrope font-bold text-xs uppercase tracking-wider px-4 xl:px-5 py-2.5 bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all shadow-sm inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                Buy Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-full border border-black/[0.08] text-[#111827]"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-black/[0.06] bg-white px-6 py-6 space-y-3 text-sm font-semibold shadow-2xl font-manrope max-h-[calc(100vh-120px)] overflow-y-auto">
            <Link href="/personal/buy" onClick={() => setMobileOpen(false)} className="block py-2 text-[#111827] hover:text-[#2563EB]">
              Product Store
            </Link>

            {/* Features Accordion */}
            <div>
              <button
                onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                className="w-full flex items-center justify-between py-2 text-[#111827]"
              >
                <span>Features</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileFeaturesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileFeaturesOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-600 border-l-2 border-slate-100 ml-1">
                  <Link href="/personal/features" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Features Overview</Link>
                  <Link href="/personal/features/monitoring" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Continuous Monitoring</Link>
                  <Link href="/personal/features/alerts" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Smart Audio Alerts</Link>
                  <Link href="/personal/features/app" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Mobile App Sync</Link>
                  <Link href="/personal/features/battery" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">5-Year Battery Life</Link>
                </div>
              )}
            </div>

            <Link href="/personal/specs" onClick={() => setMobileOpen(false)} className="block py-2 text-[#111827] hover:text-[#2563EB]">
              Specs
            </Link>

            <Link href="/personal/reviews" onClick={() => setMobileOpen(false)} className="block py-2 text-[#111827] hover:text-[#2563EB]">
              Reviews
            </Link>

            <Link href="/personal/faqs" onClick={() => setMobileOpen(false)} className="block py-2 text-[#111827] hover:text-[#2563EB]">
              FAQs
            </Link>

            {/* Support Accordion */}
            <div>
              <button
                onClick={() => setMobileSupportOpen(!mobileSupportOpen)}
                className="w-full flex items-center justify-between py-2 text-[#111827]"
              >
                <span>Support</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSupportOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileSupportOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-600 border-l-2 border-slate-100 ml-1">
                  <Link href="/personal/support" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Support Center</Link>
                  <Link href="/personal/support/setup" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Setup &amp; Installation</Link>
                  <Link href="/personal/support/troubleshooting" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Troubleshooting</Link>
                  <Link href="/personal/support/warranty" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Warranty &amp; Claims</Link>
                  <Link href="/personal/support/contact" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Contact Support</Link>
                  <Link href="/personal/track-order" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Track Order</Link>
                </div>
              )}
            </div>

            <Link href="/personal/blog" onClick={() => setMobileOpen(false)} className="block py-2 text-[#111827] hover:text-[#2563EB]">
              Blog
            </Link>

            {/* App Accordion */}
            <div>
              <button
                onClick={() => setMobileAppOpen(!mobileAppOpen)}
                className="w-full flex items-center justify-between py-2 text-[#111827]"
              >
                <span>App</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAppOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAppOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-600 border-l-2 border-slate-100 ml-1">
                  <Link href="/personal/app" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Treel Care App</Link>
                  <Link href="/personal/app/ios" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">iOS App</Link>
                  <Link href="/personal/app/android" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#2563EB]">Android App</Link>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link href="/personal/buy" onClick={() => setMobileOpen(false)}>
                <button className="w-full justify-center font-manrope font-bold text-xs uppercase tracking-wider py-3 rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all shadow-sm">
                  Shop Smart TPMS Kits
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default PersonalHeader;
