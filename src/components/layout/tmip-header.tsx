"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { EcosystemBar } from "./ecosystem-bar";

export function TmipHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileCustomersOpen, setMobileCustomersOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileSecurityOpen, setMobileSecurityOpen] = useState(false);

  const pathname = usePathname();

  const isPlatformActive = pathname.startsWith("/tmip/platform");
  const isSolutionsActive = pathname.startsWith("/tmip/solutions");
  const isCustomersActive = pathname.startsWith("/tmip/customers");
  const isRoiActive = pathname === "/tmip/roi-calculator";
  const isResourcesActive = pathname.startsWith("/tmip/whitepapers") || pathname.startsWith("/tmip/insights");
  const isSecurityActive = pathname.startsWith("/tmip/security") || pathname.startsWith("/tmip/compliance");
  const isSupportActive = pathname.startsWith("/tmip/support");

  return (
    <header className="sticky top-0 z-50 w-full transition-all shadow-md">
      {/* 1. TOP PRODUCTION ECOSYSTEM BAR */}
      <EcosystemBar />

      {/* 2. TMIP NAVBAR */}
      <div className="bg-[#050A17]/95 backdrop-blur-md border-b border-blue-900/30">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 h-20 flex items-center justify-between">
          {/* Brand Area: Official Treel Logo + Separator + TMIP Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 mr-2 xl:mr-5">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.png"
                alt="Treel"
                width={160}
                height={44}
                className="h-7 sm:h-8 xl:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                priority
              />
            </Link>

            <div className="h-[20px] sm:h-[24px] w-[1px] bg-blue-900/60 hidden sm:block" />

            {/* TMIP Brand Logo (3-bar mark + TMIP) */}
            <Link href="/tmip" className="flex items-center gap-1.5 sm:gap-2 group">
              <div className="flex items-center -translate-y-0.5">
                <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-[18px] sm:h-[22px] w-auto">
                  <g fill="#3B82F6">
                    <rect x="5" y="4" width="90" height="9" rx="1.5" opacity="0.55" />
                    <rect x="5" y="16" width="90" height="9" rx="1.5" opacity="0.8" />
                    <rect x="5" y="28" width="90" height="9" rx="1.5" />
                  </g>
                </svg>
              </div>
              <span className="font-space-grotesk text-[18px] sm:text-[20px] xl:text-[22px] font-semibold tracking-[-0.02em] text-[#F1F5F9] group-hover:text-white transition-colors">
                TMIP
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links — Strictly Treel Sitemap Tree V 1.3 */}
          <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-3.5 2xl:space-x-5 font-ibm-plex text-[10.5px] xl:text-[12px] 2xl:text-[13px] font-medium uppercase tracking-[0.03em] text-[#94A3B8]">
            {/* PLATFORM */}
            <div className="relative group">
              <Link
                href="/tmip/platform"
                className={`flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${
                  isPlatformActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
                }`}
              >
                <span>Platform</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-64 p-2 bg-[#0B1220] rounded-xl shadow-2xl border border-blue-900/40 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/tmip/platform" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Platform Overview
                </Link>
                <Link href="/tmip/platform/vehicle-digital-twin" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Vehicle Digital Twin
                </Link>
                <Link href="/tmip/platform/telemetry" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Real-Time Telemetry
                </Link>
                <Link href="/tmip/platform/predictive-maintenance" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Predictive Maintenance
                </Link>
                <Link href="/tmip/platform/integrations" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Integrations
                </Link>
              </div>
            </div>

            {/* SOLUTIONS */}
            <div className="relative group">
              <Link
                href="/tmip/solutions"
                className={`flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${
                  isSolutionsActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-64 p-2 bg-[#0B1220] rounded-xl shadow-2xl border border-blue-900/40 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/tmip/solutions" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Solutions Overview
                </Link>
                <Link href="/tmip/solutions/logistics" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Logistics &amp; Express
                </Link>
                <Link href="/tmip/solutions/passenger-transport" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Passenger Transport
                </Link>
                <Link href="/tmip/solutions/construction" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Construction &amp; Heavy
                </Link>
                <Link href="/tmip/solutions/mining" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Mining &amp; Quarry
                </Link>
                <Link href="/tmip/solutions/oem-fleet" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  OEM Fleet Intelligence
                </Link>
              </div>
            </div>

            {/* CUSTOMERS */}
            <div className="relative group">
              <Link
                href="/tmip/customers"
                className={`flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${
                  isCustomersActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
                }`}
              >
                <span>Customers</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-60 p-2 bg-[#0B1220] rounded-xl shadow-2xl border border-blue-900/40 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/tmip/customers" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Customer Stories
                </Link>
                <Link href="/tmip/customers/case-studies" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Case Studies
                </Link>
              </div>
            </div>

            {/* ROI CALCULATOR */}
            <Link
              href="/tmip/roi-calculator"
              className={`py-2 transition-colors whitespace-nowrap ${
                isRoiActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
              }`}
            >
              ROI Calculator
            </Link>

            {/* RESOURCES */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 py-2 transition-colors cursor-pointer whitespace-nowrap ${
                  isResourcesActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
                }`}
              >
                <span>Resources</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 w-60 p-2 bg-[#0B1220] rounded-xl shadow-2xl border border-blue-900/40 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/tmip/whitepapers" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Technical Whitepapers
                </Link>
                <Link href="/tmip/insights" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Platform Insights
                </Link>
              </div>
            </div>

            {/* SECURITY & COMPLIANCE */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 py-2 transition-colors cursor-pointer whitespace-nowrap ${
                  isSecurityActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
                }`}
              >
                <span>Security &amp; Compliance</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full right-0 xl:left-0 w-60 p-2 bg-[#0B1220] rounded-xl shadow-2xl border border-blue-900/40 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/tmip/security" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Enterprise Security
                </Link>
                <Link href="/tmip/compliance" className="block px-3 py-2 rounded-lg text-xs normal-case text-slate-300 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-colors">
                  Regulatory Compliance
                </Link>
              </div>
            </div>

            {/* SUPPORT */}
            <Link
              href="/tmip/support"
              className={`py-2 transition-colors whitespace-nowrap ${
                isSupportActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
              }`}
            >
              Support
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center shrink-0 ml-1.5 xl:ml-3">
            <Link 
              href="/tmip/demo"
              className="px-2.5 xl:px-4 py-1.5 xl:py-2 rounded-[3px] font-space-grotesk text-[10.5px] xl:text-[12px] 2xl:text-[13px] font-semibold uppercase tracking-wider bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-md flex items-center gap-1.5 transition-all whitespace-nowrap"
            >
              <span>Book a demo</span> <span className="text-sm leading-none">→</span>
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

      {/* Mobile Drawer Menu — Strictly Treel Sitemap Tree V 1.3 */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-900/40 bg-[#050A17] px-6 py-6 space-y-4 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1 font-ibm-plex text-[13px] font-medium text-[#94A3B8]">
            {/* Platform Accordion */}
            <div>
              <button
                onClick={() => setMobilePlatformOpen(!mobilePlatformOpen)}
                className="w-full flex items-center justify-between py-2 text-white font-semibold uppercase tracking-wider text-xs"
              >
                <span>Platform</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobilePlatformOpen ? "rotate-180" : ""}`} />
              </button>
              {mobilePlatformOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-400 border-l border-blue-900/40 ml-1">
                  <Link href="/tmip/platform" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Platform Overview</Link>
                  <Link href="/tmip/platform/vehicle-digital-twin" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Vehicle Digital Twin</Link>
                  <Link href="/tmip/platform/telemetry" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Real-Time Telemetry</Link>
                  <Link href="/tmip/platform/predictive-maintenance" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Predictive Maintenance</Link>
                  <Link href="/tmip/platform/integrations" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Integrations</Link>
                </div>
              )}
            </div>

            {/* Solutions Accordion */}
            <div>
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="w-full flex items-center justify-between py-2 text-white font-semibold uppercase tracking-wider text-xs"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileSolutionsOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-400 border-l border-blue-900/40 ml-1">
                  <Link href="/tmip/solutions" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Solutions Overview</Link>
                  <Link href="/tmip/solutions/logistics" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Logistics &amp; Express</Link>
                  <Link href="/tmip/solutions/passenger-transport" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Passenger Transport</Link>
                  <Link href="/tmip/solutions/construction" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Construction &amp; Heavy</Link>
                  <Link href="/tmip/solutions/mining" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Mining &amp; Quarry</Link>
                  <Link href="/tmip/solutions/oem-fleet" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">OEM Fleet Intelligence</Link>
                </div>
              )}
            </div>

            {/* Customers Accordion */}
            <div>
              <button
                onClick={() => setMobileCustomersOpen(!mobileCustomersOpen)}
                className="w-full flex items-center justify-between py-2 text-white font-semibold uppercase tracking-wider text-xs"
              >
                <span>Customers</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileCustomersOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileCustomersOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-400 border-l border-blue-900/40 ml-1">
                  <Link href="/tmip/customers" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Customer Stories</Link>
                  <Link href="/tmip/customers/case-studies" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Case Studies</Link>
                </div>
              )}
            </div>

            {/* ROI Calculator */}
            <Link 
              href="/tmip/roi-calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white font-semibold uppercase tracking-wider text-xs hover:text-[#3B82F6]"
            >
              ROI Calculator
            </Link>

            {/* Resources Accordion */}
            <div>
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="w-full flex items-center justify-between py-2 text-white font-semibold uppercase tracking-wider text-xs"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-400 border-l border-blue-900/40 ml-1">
                  <Link href="/tmip/whitepapers" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Technical Whitepapers</Link>
                  <Link href="/tmip/insights" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Platform Insights</Link>
                </div>
              )}
            </div>

            {/* Security & Compliance Accordion */}
            <div>
              <button
                onClick={() => setMobileSecurityOpen(!mobileSecurityOpen)}
                className="w-full flex items-center justify-between py-2 text-white font-semibold uppercase tracking-wider text-xs"
              >
                <span>Security &amp; Compliance</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSecurityOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileSecurityOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-400 border-l border-blue-900/40 ml-1">
                  <Link href="/tmip/security" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Enterprise Security</Link>
                  <Link href="/tmip/compliance" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#3B82F6]">Regulatory Compliance</Link>
                </div>
              )}
            </div>

            {/* Support */}
            <Link 
              href="/tmip/support" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white font-semibold uppercase tracking-wider text-xs hover:text-[#3B82F6]"
            >
              Support
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10">
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
export default TmipHeader;
