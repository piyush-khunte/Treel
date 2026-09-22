"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EcosystemBar } from "./ecosystem-bar";

export function MasterHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileTechOpen, setMobileTechOpen] = useState(false);
  const [mobileOemOpen, setMobileOemOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const pathname = usePathname();

  // If on TMIP, Suraksha, Personal TPMS, or Admin, their dedicated headers handle main nav
  if (
    pathname.startsWith("/tmip") ||
    pathname.startsWith("/suraksha") ||
    pathname.startsWith("/personal") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  const isAboutActive = 
    pathname === "/about" ||
    pathname.startsWith("/leadership") ||
    pathname.startsWith("/founder-note") ||
    pathname.startsWith("/our-story") ||
    pathname.startsWith("/why-treel");

  const isTechActive = 
    pathname === "/technology" ||
    pathname.startsWith("/vehicle-digital-twin") ||
    pathname.startsWith("/mobility-intelligence") ||
    pathname.startsWith("/data-infrastructure");

  const isProductsActive = pathname === "/products";

  const isOemActive = pathname.startsWith("/oem");

  const isResourcesActive = 
    pathname.startsWith("/press") ||
    pathname.startsWith("/insights") ||
    pathname.startsWith("/research") ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/annual-reports") ||
    pathname.startsWith("/media-kit");

  const isGlobalActive = pathname.startsWith("/global-presence");
  const isCareersActive = pathname.startsWith("/careers");
  const isContactActive = pathname.startsWith("/contact");

  return (
    <header className="sticky top-0 z-50 w-full transition-all shadow-sm">
      {/* 1. TOP PRODUCTION ECOSYSTEM BAR */}
      <EcosystemBar />

      {/* 2. MAIN PRODUCTION NAVIGATION BAR */}
      <div className="bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DFD7]">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group shrink-0 mr-2 xl:mr-5">
            <Image
              src="/images/logo.png"
              alt="Treel Mobility Solutions"
              width={160}
              height={44}
              className="h-7 sm:h-8 xl:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation Links — Strictly Treel Sitemap Tree V 1.3 */}
          <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-3.5 2xl:space-x-5 text-[11px] xl:text-[12.5px] 2xl:text-sm font-medium text-slate-800 font-inter">
            {/* ABOUT TREEL */}
            <div className="relative group">
              <Link
                href="/about"
                className={`flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${
                  isAboutActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"
                }`}
              >
                <span>About Treel</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform shrink-0" />
              </Link>
              <div className="absolute top-full left-0 w-64 p-2 bg-white rounded-xl shadow-xl border border-slate-200/80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/about" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  About Overview
                </Link>
                <Link href="/leadership" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Leadership
                </Link>
                <Link href="/founder-note" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Founder&apos;s Note
                </Link>
                <Link href="/our-story" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Our Story
                </Link>
                <Link href="/why-treel" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Why Treel
                </Link>
              </div>
            </div>

            {/* TECHNOLOGY */}
            <div className="relative group">
              <Link
                href="/technology"
                className={`flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${
                  isTechActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"
                }`}
              >
                <span>Technology</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform shrink-0" />
              </Link>
              <div className="absolute top-full left-0 w-64 p-2 bg-white rounded-xl shadow-xl border border-slate-200/80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/technology" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Technology Overview
                </Link>
                <Link href="/vehicle-digital-twin" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Vehicle Digital Twin
                </Link>
                <Link href="/mobility-intelligence" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Mobility Intelligence
                </Link>
                <Link href="/data-infrastructure" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Data Infrastructure
                </Link>
              </div>
            </div>

            {/* PRODUCTS & SOLUTIONS */}
            <Link 
              href="/products" 
              className={`transition-colors py-2 whitespace-nowrap ${isProductsActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"}`}
            >
              Products &amp; Solutions
            </Link>

            {/* OEM */}
            <div className="relative group">
              <Link
                href="/oem"
                className={`flex items-center gap-1 py-2 transition-colors whitespace-nowrap ${
                  isOemActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"
                }`}
              >
                <span>OEM</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform shrink-0" />
              </Link>
              <div className="absolute top-full left-0 w-64 p-2 bg-white rounded-xl shadow-xl border border-slate-200/80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/oem" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  OEM Overview
                </Link>
                <Link href="/oem/introduction" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Introduction
                </Link>
                <Link href="/oem/two-wheeler" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Two-Wheeler
                </Link>
                <Link href="/oem/four-wheeler" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Four-Wheeler
                </Link>
                <Link href="/oem/commercial-vehicle" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Commercial Vehicle
                </Link>
                <Link href="/oem/bus" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Bus
                </Link>
                <Link href="/oem/mining" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Mining
                </Link>
                <Link href="/oem/agriculture" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Agriculture
                </Link>
              </div>
            </div>

            {/* RESOURCES */}
            <div className="relative group">
              <button 
                className={`flex items-center gap-1 py-2 transition-colors cursor-pointer whitespace-nowrap ${
                  isResourcesActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"
                }`}
              >
                <span>Resources</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform shrink-0" />
              </button>
              <div className="absolute top-full right-0 xl:left-0 w-64 p-2 bg-white rounded-xl shadow-xl border border-slate-200/80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/press" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Press &amp; Media
                </Link>
                <Link href="/insights" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Insights &amp; Articles
                </Link>
                <Link href="/research" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Research Papers
                </Link>
                <Link href="/events" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Events &amp; Keynotes
                </Link>
                <Link href="/annual-reports" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Annual Reports
                </Link>
                <Link href="/media-kit" className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-[#D5573B] transition-colors">
                  Media Kit
                </Link>
              </div>
            </div>

            {/* GLOBAL PRESENCE */}
            <Link 
              href="/global-presence" 
              className={`transition-colors py-2 whitespace-nowrap ${isGlobalActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"}`}
            >
              Global Presence
            </Link>

            {/* CAREERS */}
            <Link 
              href="/careers" 
              className={`transition-colors py-2 whitespace-nowrap ${isCareersActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"}`}
            >
              Careers
            </Link>

            {/* CONTACT */}
            <Link 
              href="/contact" 
              className={`transition-colors py-2 whitespace-nowrap ${isContactActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"}`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-1.5 xl:space-x-2.5 font-inter shrink-0 ml-1.5 xl:ml-3">
            <Link href="/personal/buy">
              <Button variant="outline" size="sm" className="border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-100 font-medium px-2 xl:px-3 py-1.5 xl:py-2 text-[11px] xl:text-xs 2xl:text-sm whitespace-nowrap">
                Buy Personal TPMS
              </Button>
            </Link>
            <Link href="/tmip/demo">
              <Button variant="emerald" size="sm" className="font-medium shadow-sm flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-[11px] xl:text-xs 2xl:text-sm whitespace-nowrap">
                <span>Book Enterprise Demo</span> <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu — Strictly Treel Sitemap Tree V 1.3 */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-4 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1 font-inter text-sm font-medium text-slate-800">
            {/* About Treel Mobile Accordion */}
            <div>
              <button 
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="w-full flex items-center justify-between py-2 text-slate-900 font-semibold"
              >
                <span>About Treel</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAboutOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-600 border-l-2 border-slate-100 ml-1">
                  <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">About Overview</Link>
                  <Link href="/leadership" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Leadership</Link>
                  <Link href="/founder-note" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Founder&apos;s Note</Link>
                  <Link href="/our-story" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Our Story</Link>
                  <Link href="/why-treel" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Why Treel</Link>
                </div>
              )}
            </div>

            {/* Technology Mobile Accordion */}
            <div>
              <button 
                onClick={() => setMobileTechOpen(!mobileTechOpen)}
                className="w-full flex items-center justify-between py-2 text-slate-900 font-semibold"
              >
                <span>Technology</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileTechOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileTechOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-600 border-l-2 border-slate-100 ml-1">
                  <Link href="/technology" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Technology Overview</Link>
                  <Link href="/vehicle-digital-twin" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Vehicle Digital Twin</Link>
                  <Link href="/mobility-intelligence" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Mobility Intelligence</Link>
                  <Link href="/data-infrastructure" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Data Infrastructure</Link>
                </div>
              )}
            </div>

            {/* Products & Solutions */}
            <Link 
              href="/products" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-900 font-semibold hover:text-[#D5573B]"
            >
              Products &amp; Solutions
            </Link>

            {/* OEM Mobile Accordion */}
            <div>
              <button 
                onClick={() => setMobileOemOpen(!mobileOemOpen)}
                className="w-full flex items-center justify-between py-2 text-slate-900 font-semibold"
              >
                <span>OEM</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileOemOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileOemOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-600 border-l-2 border-slate-100 ml-1">
                  <Link href="/oem" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">OEM Overview</Link>
                  <Link href="/oem/introduction" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Introduction</Link>
                  <Link href="/oem/two-wheeler" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Two-Wheeler</Link>
                  <Link href="/oem/four-wheeler" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Four-Wheeler</Link>
                  <Link href="/oem/commercial-vehicle" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Commercial Vehicle</Link>
                  <Link href="/oem/bus" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Bus</Link>
                  <Link href="/oem/mining" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Mining</Link>
                  <Link href="/oem/agriculture" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Agriculture</Link>
                </div>
              )}
            </div>

            {/* Resources Mobile Accordion */}
            <div>
              <button 
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="w-full flex items-center justify-between py-2 text-slate-900 font-semibold"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="pl-3 pb-2 space-y-1 text-xs text-slate-600 border-l-2 border-slate-100 ml-1">
                  <Link href="/press" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Press &amp; Media</Link>
                  <Link href="/insights" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Insights &amp; Articles</Link>
                  <Link href="/research" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Research Papers</Link>
                  <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Events &amp; Keynotes</Link>
                  <Link href="/annual-reports" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Annual Reports</Link>
                  <Link href="/media-kit" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#D5573B]">Media Kit</Link>
                </div>
              )}
            </div>

            {/* Global Presence */}
            <Link 
              href="/global-presence" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-900 font-semibold hover:text-[#D5573B]"
            >
              Global Presence
            </Link>

            {/* Careers */}
            <Link 
              href="/careers" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-900 font-semibold hover:text-[#D5573B]"
            >
              Careers
            </Link>

            {/* Contact */}
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-900 font-semibold hover:text-[#D5573B]"
            >
              Contact
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link href="/tmip/demo" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="emerald" className="w-full justify-center">
                Book Enterprise Demo
              </Button>
            </Link>
            <Link href="/personal/buy" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Shop Personal TPMS
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default MasterHeader;
