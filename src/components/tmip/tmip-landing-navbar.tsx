"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface TmipLandingNavbarProps {
  onDemoClick: (location: string, e?: React.MouseEvent) => void;
}

export function TmipLandingNavbar({ onDemoClick }: TmipLandingNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileDemoClick = (e: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    onDemoClick("navbar_mobile", e);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050A17]/95 backdrop-blur-md border-b border-blue-900/40">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        {/* Left: Original TMIP Logo + Separator + TMIP Mark & Label */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/treel main logo.jpg"
              alt="Treel Mobility Intelligence"
              width={160}
              height={50}
              className="h-7 sm:h-9 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          <div className="h-5 sm:h-7 w-[1px] bg-white/20" aria-hidden="true" />

          <Link href="/lp-tmip" className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex flex-col gap-[3px] w-[18px] sm:w-[22px]" aria-hidden="true">
              <span className="block h-[2.5px] sm:h-[3px] w-full bg-[#3B82F6] rounded-[1px] opacity-60 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="block h-[2.5px] sm:h-[3px] w-full bg-[#3B82F6] rounded-[1px] opacity-85 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="block h-[2.5px] sm:h-[3px] w-full bg-[#3B82F6] rounded-[1px] opacity-100 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            </div>
            <span className="font-space-grotesk font-bold text-base sm:text-xl text-white tracking-wide">
              TMIP
            </span>
          </Link>
        </div>

        {/* Center: Desktop Anchor Navigation Menu (Hidden on mobile/tablet) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300" aria-label="Page sections">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#platform" className="hover:text-white transition-colors">Platform</a>
          <a href="#compare" className="hover:text-white transition-colors">Before &amp; after</a>
          <a href="#pilot" className="hover:text-white transition-colors">Pilot</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* Right Desktop: Phone link + Book a demo button */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:18008330233"
            className="flex items-center gap-2 text-white font-semibold text-sm hover:text-[#3B82F6] transition-colors"
          >
            <svg
              className="w-4 h-4 text-[#3B82F6] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z" />
            </svg>
            <span className="whitespace-nowrap font-medium tracking-tight">1800 833 0233</span>
          </a>

          <a
            href="#demo"
            onClick={(e) => onDemoClick("navbar", e)}
            className="btn btn-primary whitespace-nowrap"
            style={{
              padding: "10px 20px",
              minHeight: "42px",
              fontSize: "0.95rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Book a demo
          </a>
        </div>

        {/* Right Mobile / Tablet: Phone Button + Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          <a
            href="tel:18008330233"
            className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-blue-500/10 border border-blue-500/25 text-[#3B82F6] hover:bg-blue-500/20 active:bg-blue-500/30 transition-colors"
            aria-label="Call 1800 833 0233"
          >
            <svg
              className="w-5 h-5 text-[#3B82F6]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="tmip-mobile-menu"
            className="flex flex-col items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-slate-900/90 border border-slate-700/60 text-white hover:bg-slate-800 active:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="flex flex-col gap-1.5 w-5">
                <span className="block h-0.5 w-full bg-white rounded-full transition-transform" />
                <span className="block h-0.5 w-full bg-white rounded-full transition-transform" />
                <span className="block h-0.5 w-full bg-white rounded-full transition-transform" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="tmip-mobile-menu"
          className="lg:hidden w-full bg-[#050A17]/98 backdrop-blur-xl border-b border-blue-900/50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <nav className="max-w-[1240px] mx-auto px-4 sm:px-6 py-5 flex flex-col gap-2 font-medium text-slate-200" aria-label="Mobile sections">
            <a
              href="#features"
              onClick={handleNavLinkClick}
              className="py-2.5 px-3 rounded-md hover:bg-slate-900/80 hover:text-white transition-colors border-b border-slate-800/50 flex items-center justify-between text-sm"
            >
              <span>Features</span>
              <span className="text-xs text-slate-500 font-mono">01</span>
            </a>
            <a
              href="#platform"
              onClick={handleNavLinkClick}
              className="py-2.5 px-3 rounded-md hover:bg-slate-900/80 hover:text-white transition-colors border-b border-slate-800/50 flex items-center justify-between text-sm"
            >
              <span>Platform</span>
              <span className="text-xs text-slate-500 font-mono">02</span>
            </a>
            <a
              href="#compare"
              onClick={handleNavLinkClick}
              className="py-2.5 px-3 rounded-md hover:bg-slate-900/80 hover:text-white transition-colors border-b border-slate-800/50 flex items-center justify-between text-sm"
            >
              <span>Before &amp; after</span>
              <span className="text-xs text-slate-500 font-mono">03</span>
            </a>
            <a
              href="#pilot"
              onClick={handleNavLinkClick}
              className="py-2.5 px-3 rounded-md hover:bg-slate-900/80 hover:text-white transition-colors border-b border-slate-800/50 flex items-center justify-between text-sm"
            >
              <span>14-day live pilot</span>
              <span className="text-xs text-slate-500 font-mono">04</span>
            </a>
            <a
              href="#faq"
              onClick={handleNavLinkClick}
              className="py-2.5 px-3 rounded-md hover:bg-slate-900/80 hover:text-white transition-colors border-b border-slate-800/50 flex items-center justify-between text-sm"
            >
              <span>FAQ</span>
              <span className="text-xs text-slate-500 font-mono">05</span>
            </a>

            {/* Direct Phone Call Row */}
            <a
              href="tel:18008330233"
              className="mt-2 py-2.5 px-3.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-white"
            >
              <span className="text-xs font-medium text-slate-300">Toll-free fleet advisory:</span>
              <span className="font-bold text-[#3B82F6] flex items-center gap-1.5 font-mono text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z" />
                </svg>
                1800 833 0233
              </span>
            </a>

            {/* Mobile Book a Demo Button */}
            <button
              type="button"
              onClick={handleMobileDemoClick}
              className="mt-2 w-full py-3 px-6 rounded bg-[#3B82F6] hover:bg-[#2563EB] active:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider text-center shadow-[0_4px_16px_rgba(59,130,246,0.35)] transition-all cursor-pointer"
            >
              Book a 30-minute demo
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default TmipLandingNavbar;

