"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Smartphone, Package, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/commerce/cart-context";
import { EcosystemBar } from "./ecosystem-bar";

export function PersonalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Top Production Ecosystem Bar */}
      <EcosystemBar />

      {/* Shipping Sub-banner */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 text-slate-300 font-manrope">
            <span className="text-blue-400 font-semibold">Free Express Shipping Across India</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">1-Year Official Replacement Warranty</span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-manrope">
            <Link href="/personal/track-order" className="hover:text-blue-400 flex items-center gap-1 text-slate-300 font-medium">
              <Package className="w-3.5 h-3.5 text-blue-400" /> Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md font-manrope">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Brand Area: Official Treel Logo + Separator + Personal TPMS Brand */}
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

            <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

            {/* Personal TPMS Logo & Brand Mark */}
            <Link href="/personal" className="flex items-center gap-3 group">
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
                <div className="flex items-center gap-2">
                  <span className="font-manrope text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    Treel TPMS
                  </span>
                  <Badge variant="personal" className="text-[10px] py-0 px-1.5 font-bold">Consumer</Badge>
                </div>
                <span className="text-[9px] tracking-widest uppercase text-slate-500 font-bold -mt-1">
                  Smart Tyre Sensors
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-700 font-manrope">
            <Link href="/personal/buy" className={`hover:text-blue-600 transition-colors ${pathname === '/personal/buy' ? 'text-blue-600 font-bold' : ''}`}>
              Shop TPMS Kits
            </Link>
            <Link href="/personal/features" className={`hover:text-blue-600 transition-colors ${pathname === '/personal/features' ? 'text-blue-600 font-bold' : ''}`}>
              Features
            </Link>
            <Link href="/personal/specs" className={`hover:text-blue-600 transition-colors ${pathname === '/personal/specs' ? 'text-blue-600 font-bold' : ''}`}>
              Tech Specs
            </Link>
            <Link href="/personal/app" className={`hover:text-blue-600 transition-colors flex items-center gap-1 ${pathname === '/personal/app' ? 'text-blue-600 font-bold' : ''}`}>
              <Smartphone className="w-4 h-4 text-blue-600" /> Treel Care App
            </Link>
            <Link href="/personal/support/warranty" className="hover:text-blue-600 transition-colors">
              Warranty
            </Link>
          </nav>

          {/* Cart & Shop CTAs */}
          <div className="flex items-center space-x-3">
            <Link href="/personal/buy/cart" className="relative p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link href="/personal/buy" className="hidden sm:inline-block">
              <Button variant="personal" size="sm" className="font-bold">
                Buy Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-800"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-4 text-sm font-semibold shadow-2xl font-manrope">
            <Link href="/personal/buy" onClick={() => setMobileOpen(false)} className="block py-2 text-blue-600 font-bold">Shop Car & Bike Kits</Link>
            <Link href="/personal/features" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-800 hover:text-blue-600">Features & App</Link>
            <Link href="/personal/specs" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-800 hover:text-blue-600">Technical Specs</Link>
            <Link href="/personal/track-order" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-800 hover:text-blue-600">Track Order</Link>
            <Link href="/personal/app" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-800 hover:text-blue-600">Treel Care Mobile App</Link>
            <Link href="/personal/support/warranty" onClick={() => setMobileOpen(false)} className="block py-2 text-slate-800 hover:text-blue-600">Warranty Registration</Link>
            <div className="pt-2">
              <Link href="/personal/buy" onClick={() => setMobileOpen(false)}>
                <Button variant="personal" className="w-full justify-center font-bold">
                  Shop Smart TPMS Kits
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default PersonalHeader;
