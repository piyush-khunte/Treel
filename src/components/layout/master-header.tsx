"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Activity, 
  Truck, 
  Car, 
  ArrowRight,
  HardHat 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EcosystemBar } from "./ecosystem-bar";

export function MasterHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const pathname = usePathname();

  // If on TMIP, Suraksha, Personal TPMS, or Admin, their dedicated headers handle main nav,
  // but they include EcosystemBar at the top.
  if (
    pathname.startsWith("/tmip") ||
    pathname.startsWith("/suraksha") ||
    pathname.startsWith("/personal") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  const isTechActive = pathname.startsWith("/technology") || pathname.startsWith("/data-infrastructure") || pathname.startsWith("/mobility-intelligence");
  const isTwinActive = pathname.startsWith("/vehicle-digital-twin");
  const isInsightsActive = pathname.startsWith("/insights") || pathname.startsWith("/research");
  const isAboutActive = pathname.startsWith("/about") || pathname.startsWith("/leadership") || pathname.startsWith("/founder-note") || pathname.startsWith("/our-story") || pathname.startsWith("/why-treel");
  const isContactActive = pathname.startsWith("/contact");

  return (
    <header className="sticky top-0 z-50 w-full transition-all shadow-sm">
      {/* 1. TOP PRODUCTION ECOSYSTEM BAR */}
      <EcosystemBar />

      {/* 2. MAIN PRODUCTION NAVIGATION BAR */}
      <div className="bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DFD7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          {/* Brand Logo - Official Treel Logo from public/images/logo.png */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo.png"
              alt="Treel Mobility Intelligence"
              width={180}
              height={50}
              className="h-10 sm:h-[45px] w-auto object-contain transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-800 font-inter">
            {/* Solutions & Brands Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-[#D5573B] py-2 transition-colors cursor-pointer"
              >
                <span>Solutions & Brands</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 w-80 p-3 bg-white rounded-2xl shadow-xl border border-slate-200/80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <Link href="/tmip" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#0A0F1A] flex items-center justify-center text-[#00E5FF] shrink-0 mt-0.5">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      TMIP Platform <Badge variant="tmip" className="text-[10px] px-1.5 py-0">Enterprise</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Vehicle Digital Twin & predictive fleet analytics.</p>
                  </div>
                </Link>
                <Link href="/suraksha" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors mt-1">
                  <div className="w-9 h-9 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center text-[#B45309] shrink-0 mt-0.5">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      Suraksha <Badge variant="suraksha" className="text-[10px] px-1.5 py-0">Commercial</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Blowout prevention & 9-month ROI for trucks.</p>
                  </div>
                </Link>
                <Link href="/personal" className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors mt-1">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      Personal TPMS <Badge variant="personal" className="text-[10px] px-1.5 py-0">Consumer</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Smart tyre sensor kits for cars and 2-wheelers.</p>
                  </div>
                </Link>
                <div className="pt-2 mt-1 border-t border-slate-100">
                  <Link 
                    href="#" 
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#D5573B]/10 flex items-center justify-center text-[#D5573B] shrink-0 mt-0.5">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Commercial Vehicle TPMS
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        TMIP platform sits as a subset of this.
                      </p>
                    </div>
                  </Link>
                  <Link 
                    href="#" 
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors mt-1"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                      <HardHat className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        OTR TPMS
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Off-The-Road TPMS for mining dumpers and heavy utility vehicles.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/technology" 
              className={`transition-colors py-2 ${isTechActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"}`}
            >
              Technology
            </Link>
            <Link 
              href="/vehicle-digital-twin" 
              className={`transition-colors py-2 ${isTwinActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"}`}
            >
              Digital Twin
            </Link>
            <Link 
              href="#" 
              className="transition-colors py-2 hover:text-[#D5573B]"
            >
              OEM
            </Link>
            <Link 
              href="/insights" 
              className={`transition-colors py-2 ${isInsightsActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"}`}
            >
              Insights
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors py-2 ${isAboutActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"}`}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors py-2 ${isContactActive ? "text-[#D5573B] font-semibold" : "hover:text-[#D5573B]"}`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3 font-inter">
            <Link href="/personal/buy">
              <Button variant="outline" size="sm" className="border-slate-300 bg-white/80 text-slate-800 hover:bg-slate-100 font-medium">
                Buy Personal TPMS
              </Button>
            </Link>
            <Link href="/tmip/demo">
              <Button variant="emerald" size="sm" className="font-medium shadow-sm flex items-center gap-1.5">
                Book Enterprise Demo <ArrowRight className="w-3.5 h-3.5" />
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Our Solutions</div>
            <Link 
              href="/tmip" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 font-medium text-slate-900"
            >
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-[#00E5FF]" />
                <span>TMIP Enterprise Fleet</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/suraksha" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 font-medium text-slate-900"
            >
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-amber-600" />
                <span>Suraksha Truck Kit</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link 
              href="/personal" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 font-medium text-slate-900"
            >
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-blue-600" />
                <span>Personal TPMS</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3 text-sm font-medium text-slate-800 font-inter">
            <Link href="/technology" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#D5573B]">Technology & IoT</Link>
            <Link href="/vehicle-digital-twin" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#D5573B]">Vehicle Digital Twin</Link>
            <Link href="#" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#D5573B]">OEM</Link>
            <Link href="/insights" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#D5573B]">Insights & Research</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#D5573B]">About & Leadership</Link>
            <Link href="/careers" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#D5573B]">Careers</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#D5573B]">Contact & Support</Link>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
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
