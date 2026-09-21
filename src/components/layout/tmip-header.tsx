"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { EcosystemBar } from "./ecosystem-bar";

export function TmipHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full transition-all shadow-md">
      {/* 1. TOP PRODUCTION ECOSYSTEM BAR */}
      <EcosystemBar />

      {/* 2. TMIP NAVBAR */}
      <div className="bg-[#050A17]/95 backdrop-blur-md border-b border-blue-900/30">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          {/* Brand Area: Official Treel Logo + Separator + TMIP Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="Treel"
                width={160}
                height={44}
                className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                priority
              />
            </Link>

            <div className="h-[27px] w-[1px] bg-blue-900/60 hidden sm:block" />

            {/* TMIP Brand Logo (3-bar mark + TMIP) */}
            <Link href="/tmip" className="flex items-center gap-2.5 group">
              <div className="flex items-center -translate-y-1">
                <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-[22px] sm:h-[27px] w-auto">
                  <g fill="#3B82F6">
                    <rect x="5" y="4" width="90" height="9" rx="1.5" opacity="0.55" />
                    <rect x="5" y="16" width="90" height="9" rx="1.5" opacity="0.8" />
                    <rect x="5" y="28" width="90" height="9" rx="1.5" />
                  </g>
                </svg>
              </div>
              <span className="font-space-grotesk text-[22px] sm:text-[23px] font-semibold tracking-[-0.02em] text-[#F1F5F9] group-hover:text-white transition-colors">
                TMIP
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 font-ibm-plex text-[13px] font-medium uppercase tracking-[0.05em] text-[#94A3B8]">
            <Link href="/tmip/platform" className="hover:text-[#3B82F6] transition-colors">
              Platform
            </Link>
            <Link href="/tmip/solutions" className="hover:text-[#3B82F6] transition-colors">
              Solutions
            </Link>
            <Link href="/tmip/customers" className="hover:text-[#3B82F6] transition-colors">
              Customers
            </Link>
            <Link href="/tmip/insights" className="hover:text-[#3B82F6] transition-colors">
              Insights
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link 
              href="/tmip/demo"
              className="px-5 py-2.5 rounded-[3px] font-space-grotesk text-[13px] font-semibold uppercase tracking-wider bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-md flex items-center gap-1.5 transition-all"
            >
              Book a demo <span className="text-sm leading-none">→</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-900/40 bg-[#050A17] px-6 py-6 space-y-5 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-3 font-ibm-plex text-[13px] font-medium uppercase tracking-[0.05em] text-[#94A3B8]">
            <Link 
              href="/tmip/platform" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#3B82F6] transition-colors"
            >
              Platform
            </Link>
            <Link 
              href="/tmip/solutions" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#3B82F6] transition-colors"
            >
              Solutions
            </Link>
            <Link 
              href="/tmip/customers" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#3B82F6] transition-colors"
            >
              Customers
            </Link>
            <Link 
              href="/tmip/insights" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#3B82F6] transition-colors"
            >
              Insights
            </Link>
          </div>

          <div className="pt-3 border-t border-white/10">
            <Link 
              href="/tmip/demo" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-[3px] font-space-grotesk text-[13px] font-semibold uppercase tracking-wider bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-md flex items-center justify-center gap-1.5 transition-all"
            >
              Book a demo <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export const TMIPHeader = TmipHeader;
