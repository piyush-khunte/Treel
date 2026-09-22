"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { EcosystemBar } from "./ecosystem-bar";

export function SurakshaHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWhyOpen, setMobileWhyOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobilePricingOpen, setMobilePricingOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false);
  const [mobileGetOpen, setMobileGetOpen] = useState(false);

  const pathname = usePathname();

  const isWhyActive = pathname.startsWith("/suraksha/why-suraksha") || pathname.startsWith("/suraksha/safety") || pathname.startsWith("/suraksha/savings") || pathname.startsWith("/suraksha/simplicity");
  const isProductActive = pathname === "/suraksha/product" || pathname.startsWith("/suraksha/how-it-works");
  const isPricingActive = pathname === "/suraksha/pricing" || pathname.startsWith("/suraksha/emi");
  const isCentresActive = pathname.startsWith("/suraksha/centres");
  const isTestimonialsActive = pathname.startsWith("/suraksha/testimonials");
  const isResourcesActive = pathname.startsWith("/suraksha/faqs") || pathname.startsWith("/suraksha/videos") || pathname.startsWith("/suraksha/blog");
  const isSupportActive = pathname === "/suraksha/support" || pathname.startsWith("/suraksha/contact");

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Top Production Ecosystem Bar */}
      <EcosystemBar />

      {/* Main Suraksha Nav */}
      <div className="bg-[#FEF3C7]/95 backdrop-blur-md border-b-2 border-[#451A03]/10">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          {/* Brand Area */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 z-10 mr-2 xl:mr-4">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="Treel"
                width={140}
                height={38}
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                priority
              />
            </Link>

            <div className="h-6 w-[1px] bg-[#451A03]/20 hidden sm:block" />

            {/* Brand Logo & Motion Mark */}
            <Link href="/suraksha" className="suraksha-nav-brand group">
              <div className="suraksha-nav-brand-mark group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-[24px] sm:h-[26px] w-auto">
                  <rect x="5" y="4" width="90" height="9" rx="1.5" fill="#DC2626" />
                  <rect x="5" y="16" width="90" height="9" rx="1.5" fill="#EA580C" />
                  <rect x="5" y="28" width="90" height="9" rx="1.5" fill="#DC2626" />
                </svg>
              </div>
              <div>
                <div className="suraksha-nav-brand-name">Suraksha</div>
                <div className="suraksha-nav-parent">A Treel Product</div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links — Strictly Treel Sitemap Tree V 1.3 */}
          <nav
            aria-label="Suraksha Navigation"
            className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 z-10 font-rubik text-[11px] xl:text-[11.5px] 2xl:text-xs font-bold text-[#451A03]"
          >
            {/* WHY SURAKSHA */}
            <div className="relative group">
              <Link
                href="/suraksha/why-suraksha"
                className={`flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${
                  isWhyActive ? "text-[#DC2626]" : "hover:text-[#DC2626]"
                }`}
              >
                <span>Why Suraksha</span>
                <ChevronDown className="w-3 h-3 text-[#451A03]/60 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-52 p-2 bg-[#FFFBEB] rounded-xl shadow-xl border border-[#451A03]/15 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/suraksha/why-suraksha" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Overview
                </Link>
                <Link href="/suraksha/safety" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Safety &amp; Protection
                </Link>
                <Link href="/suraksha/savings" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Savings &amp; Mileage
                </Link>
                <Link href="/suraksha/simplicity" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Zero Maintenance
                </Link>
              </div>
            </div>

            {/* PRODUCT */}
            <div className="relative group">
              <Link
                href="/suraksha/product"
                className={`flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${
                  isProductActive ? "text-[#DC2626]" : "hover:text-[#DC2626]"
                }`}
              >
                <span>Product</span>
                <ChevronDown className="w-3 h-3 text-[#451A03]/60 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-48 p-2 bg-[#FFFBEB] rounded-xl shadow-xl border border-[#451A03]/15 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/suraksha/product" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Product Overview
                </Link>
                <Link href="/suraksha/how-it-works" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  How It Works
                </Link>
              </div>
            </div>

            {/* PRICING */}
            <div className="relative group">
              <Link
                href="/suraksha/pricing"
                className={`flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${
                  isPricingActive ? "text-[#DC2626]" : "hover:text-[#DC2626]"
                }`}
              >
                <span>Pricing</span>
                <ChevronDown className="w-3 h-3 text-[#451A03]/60 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-48 p-2 bg-[#FFFBEB] rounded-xl shadow-xl border border-[#451A03]/15 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/suraksha/pricing" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Pricing &amp; ROI
                </Link>
                <Link href="/suraksha/emi" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Easy EMI Option
                </Link>
              </div>
            </div>

            {/* CENTRES */}
            <Link
              href="/suraksha/centres"
              className={`transition-colors py-2 whitespace-nowrap ${
                isCentresActive ? "text-[#DC2626]" : "hover:text-[#DC2626]"
              }`}
            >
              Centres
            </Link>

            {/* TESTIMONIALS */}
            <Link
              href="/suraksha/testimonials"
              className={`transition-colors py-2 whitespace-nowrap ${
                isTestimonialsActive ? "text-[#DC2626]" : "hover:text-[#DC2626]"
              }`}
            >
              Testimonials
            </Link>

            {/* RESOURCES */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 py-2 transition-colors cursor-pointer whitespace-nowrap ${
                  isResourcesActive ? "text-[#DC2626]" : "hover:text-[#DC2626]"
                }`}
              >
                <span>Resources</span>
                <ChevronDown className="w-3 h-3 text-[#451A03]/60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full right-0 xl:left-0 w-48 p-2 bg-[#FFFBEB] rounded-xl shadow-xl border border-[#451A03]/15 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/suraksha/faqs" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  FAQs
                </Link>
                <Link href="/suraksha/videos" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Videos &amp; Demos
                </Link>
                <Link href="/suraksha/blog" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Suraksha Blog
                </Link>
              </div>
            </div>

            {/* SUPPORT */}
            <div className="relative group">
              <Link
                href="/suraksha/support"
                className={`flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${
                  isSupportActive ? "text-[#DC2626]" : "hover:text-[#DC2626]"
                }`}
              >
                <span>Support</span>
                <ChevronDown className="w-3 h-3 text-[#451A03]/60 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full right-0 xl:left-0 w-48 p-2 bg-[#FFFBEB] rounded-xl shadow-xl border border-[#451A03]/15 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/suraksha/support" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Support Overview
                </Link>
                <Link href="/suraksha/contact" className="block px-3 py-2 rounded-lg text-xs text-[#451A03] hover:bg-[#FEF3C7] hover:text-[#DC2626] transition-colors">
                  Contact Support
                </Link>
              </div>
            </div>
          </nav>

          {/* GET SURAKSHA (CTAs) */}
          <div className="hidden md:flex items-center gap-1.5 xl:gap-2 shrink-0 ml-1.5 xl:ml-3">
            <Link
              href="/suraksha/callback"
              className="px-2.5 xl:px-3 py-1.5 xl:py-2 rounded font-rubik text-[11px] xl:text-xs font-bold bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-sm whitespace-nowrap"
            >
              Get Suraksha
            </Link>
            <Link
              href="/suraksha/whatsapp"
              className="px-2.5 xl:px-3 py-1.5 xl:py-2 rounded font-rubik text-[11px] xl:text-xs font-bold bg-[#16A34A] text-white hover:bg-[#15803D] transition-all shadow-sm whitespace-nowrap"
            >
              WhatsApp
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center z-10">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded border border-[#451A03]/20 text-[#451A03] hover:bg-[#FFFBEB] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#451A03]/10 bg-[#FFFBEB] px-6 py-6 space-y-4 font-rubik shadow-xl max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Why Suraksha Accordion */}
            <div>
              <button
                onClick={() => setMobileWhyOpen(!mobileWhyOpen)}
                className="w-full flex items-center justify-between py-2 text-[#451A03] font-bold"
              >
                <span>Why Suraksha</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileWhyOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileWhyOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-[#78350F] border-l-2 border-[#451A03]/10 ml-1">
                  <Link href="/suraksha/why-suraksha" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Overview</Link>
                  <Link href="/suraksha/safety" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Safety &amp; Protection</Link>
                  <Link href="/suraksha/savings" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Savings &amp; Mileage</Link>
                  <Link href="/suraksha/simplicity" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Zero Maintenance</Link>
                </div>
              )}
            </div>

            {/* Product Accordion */}
            <div>
              <button
                onClick={() => setMobileProductOpen(!mobileProductOpen)}
                className="w-full flex items-center justify-between py-2 text-[#451A03] font-bold"
              >
                <span>Product</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileProductOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-[#78350F] border-l-2 border-[#451A03]/10 ml-1">
                  <Link href="/suraksha/product" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Product Overview</Link>
                  <Link href="/suraksha/how-it-works" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">How It Works</Link>
                </div>
              )}
            </div>

            {/* Pricing Accordion */}
            <div>
              <button
                onClick={() => setMobilePricingOpen(!mobilePricingOpen)}
                className="w-full flex items-center justify-between py-2 text-[#451A03] font-bold"
              >
                <span>Pricing</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobilePricingOpen ? "rotate-180" : ""}`} />
              </button>
              {mobilePricingOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-[#78350F] border-l-2 border-[#451A03]/10 ml-1">
                  <Link href="/suraksha/pricing" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Pricing &amp; ROI</Link>
                  <Link href="/suraksha/emi" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Easy EMI Option</Link>
                </div>
              )}
            </div>

            {/* Centres */}
            <Link
              href="/suraksha/centres"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-[#451A03] font-bold hover:text-[#DC2626]"
            >
              Centres
            </Link>

            {/* Testimonials */}
            <Link
              href="/suraksha/testimonials"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-[#451A03] font-bold hover:text-[#DC2626]"
            >
              Testimonials
            </Link>

            {/* Resources Accordion */}
            <div>
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="w-full flex items-center justify-between py-2 text-[#451A03] font-bold"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-[#78350F] border-l-2 border-[#451A03]/10 ml-1">
                  <Link href="/suraksha/faqs" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">FAQs</Link>
                  <Link href="/suraksha/videos" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Videos &amp; Demos</Link>
                  <Link href="/suraksha/blog" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Suraksha Blog</Link>
                </div>
              )}
            </div>

            {/* Support Accordion */}
            <div>
              <button
                onClick={() => setMobileSupportOpen(!mobileSupportOpen)}
                className="w-full flex items-center justify-between py-2 text-[#451A03] font-bold"
              >
                <span>Support</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSupportOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileSupportOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-[#78350F] border-l-2 border-[#451A03]/10 ml-1">
                  <Link href="/suraksha/support" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Support Overview</Link>
                  <Link href="/suraksha/contact" onClick={() => setMobileOpen(false)} className="block py-1.5 hover:text-[#DC2626]">Contact Support</Link>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#451A03]/10 flex flex-col gap-2.5">
              <Link
                href="/suraksha/callback"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center rounded font-rubik text-xs font-bold bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all"
              >
                Get Suraksha (Callback)
              </Link>
              <Link
                href="/suraksha/whatsapp"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center rounded font-rubik text-xs font-bold bg-[#16A34A] text-white hover:bg-[#15803D] transition-all"
              >
                WhatsApp पर बात करें
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default SurakshaHeader;
