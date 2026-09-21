"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { EcosystemBar } from "./ecosystem-bar";

export function SurakshaHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Top Production Ecosystem Bar */}
      <EcosystemBar />

      {/* Main Suraksha Nav */}
      <div className="bg-[#FEF3C7]/95 backdrop-blur-md border-b-2 border-[#451A03]/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between relative">
          {/* Brand Area: Official Treel Logo + Separator + Suraksha Brand */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0 z-10">
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
                <div className="suraksha-nav-parent">A Treel Product</div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links - Centered */}
          <nav
            aria-label="Suraksha Navigation"
            className="hidden lg:flex items-center gap-8 suraksha-nav-links lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-10"
          >
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
          </nav>

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
                WhatsApp करिए
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default SurakshaHeader;
