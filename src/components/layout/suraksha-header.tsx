"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X } from "lucide-react";
import { EcosystemBar } from "./ecosystem-bar";

export function SurakshaHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Top Production Ecosystem Bar */}
      <EcosystemBar />

      {/* Driver Hotline Sub-bar */}
      <div className="bg-[#451A03] text-[#FEF3C7] text-xs py-1.5 px-4 sm:px-8 border-b border-[#78350F]/40">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 font-rubik text-xs font-semibold">
            <span className="text-[#FEF3C7]">सुरक्षा हेल्पलाइन: <strong>1800 258 4567</strong> (Toll-Free)</span>
            <span className="hidden sm:inline text-[#EA580C]">•</span>
            <span className="hidden sm:inline text-[#FEF3C7]/90">400+ Highway Suraksha Centres Across India</span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-rubik">
            <Link
              href="/suraksha/whatsapp"
              className="hover:text-white flex items-center gap-1.5 text-[#FEF3C7] font-bold bg-[#EA580C]/30 hover:bg-[#EA580C]/50 px-2.5 py-0.5 rounded transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#FEF3C7]" /> WhatsApp Pe Baat Karein
            </Link>
          </div>
        </div>
      </div>

      {/* Main Suraksha Nav */}
      <div className="bg-[#FEF3C7]/95 backdrop-blur-md border-b-2 border-[#451A03]/10">
        <nav className="suraksha-nav">
          {/* Brand Area: Official Treel Logo + Separator + Suraksha Brand */}
          <div className="flex items-center gap-4 sm:gap-6">
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
                <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-[26px] w-auto">
                  <rect x="5" y="4" width="90" height="9" rx="1.5" fill="#DC2626" />
                  <rect x="5" y="16" width="90" height="9" rx="1.5" fill="#EA580C" />
                  <rect x="5" y="28" width="90" height="9" rx="1.5" fill="#DC2626" />
                </svg>
              </div>
              <div>
                <div className="suraksha-nav-brand-name">Suraksha</div>
                <div className="suraksha-nav-parent">A Treel · JK Tyre Product</div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex suraksha-nav-links">
            <Link
              href="/suraksha/product"
              className={`transition-colors hover:text-[#DC2626] ${
                pathname === "/suraksha/product" ? "text-[#DC2626] font-bold" : ""
              }`}
            >
              Product
            </Link>
            <Link
              href="/suraksha/pricing"
              className={`transition-colors hover:text-[#DC2626] ${
                pathname === "/suraksha/pricing" ? "text-[#DC2626] font-bold" : ""
              }`}
            >
              ROI
            </Link>
            <Link
              href="/suraksha/centres"
              className={`transition-colors hover:text-[#DC2626] ${
                pathname === "/suraksha/centres" ? "text-[#DC2626] font-bold" : ""
              }`}
            >
              Centres
            </Link>
            <Link
              href="/suraksha/emi"
              className={`transition-colors hover:text-[#DC2626] ${
                pathname === "/suraksha/emi" ? "text-[#DC2626] font-bold" : ""
              }`}
            >
              EMI
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded border border-[#451A03]/20 text-[#451A03] hover:bg-[#FFFBEB] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#451A03]/10 bg-[#FFFBEB] px-6 py-6 space-y-4 font-rubik shadow-xl">
            <Link
              href="/suraksha/product"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-[#451A03] font-bold hover:text-[#DC2626]"
            >
              Product & Truck Kit Specs
            </Link>
            <Link
              href="/suraksha/pricing"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-[#451A03] font-bold hover:text-[#DC2626]"
            >
              ROI & 9-Month Payback
            </Link>
            <Link
              href="/suraksha/centres"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-[#451A03] font-bold hover:text-[#DC2626]"
            >
              400+ Highway Centres Locator
            </Link>
            <Link
              href="/suraksha/emi"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-[#451A03] font-bold hover:text-[#DC2626]"
            >
              Zero-Downpayment Easy EMI (@ ₹1,199/mo)
            </Link>
            <div className="pt-3 border-t border-[#451A03]/10 flex flex-col gap-3">
              <Link
                href="/suraksha/centres"
                onClick={() => setMobileOpen(false)}
                className="suraksha-cta-primary justify-center text-center py-3"
              >
                Nearest Centre →
              </Link>
              <Link
                href="/suraksha/whatsapp"
                onClick={() => setMobileOpen(false)}
                className="suraksha-cta-secondary justify-center text-center py-3"
              >
                WhatsApp Kariye
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default SurakshaHeader;
