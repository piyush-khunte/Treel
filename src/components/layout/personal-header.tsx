"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, Smartphone, Package, Menu, X, ArrowRight } from "lucide-react";
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

      {/* Main Nav */}
      <div className="border-b border-black/[0.06] bg-white/95 backdrop-blur-md font-manrope">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
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

            <div className="h-6 w-[1px] bg-black/[0.08] hidden sm:block" />

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
                  <span className="font-manrope text-xl sm:text-2xl font-extrabold tracking-tight text-[#111827] group-hover:text-[#2563EB] transition-colors">
                    Treel TPMS
                  </span>
                  <Badge variant="personal" className="text-[10px] py-0.5 px-2 font-bold uppercase tracking-wider rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 text-[#2563EB]">Consumer</Badge>
                </div>
                <span className="text-[10px] tracking-widest uppercase text-[#6B7280] font-bold -mt-0.5">
                  Smart Tyre Sensors
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-[#4B5563] font-manrope">
            <Link href="/personal/buy" className={`hover:text-[#2563EB] transition-colors ${pathname === '/personal/buy' ? 'text-[#2563EB] font-bold' : ''}`}>
              Shop TPMS Kits
            </Link>
            <Link href="/personal/features" className={`hover:text-[#2563EB] transition-colors ${pathname === '/personal/features' ? 'text-[#2563EB] font-bold' : ''}`}>
              Features
            </Link>
            <Link href="/personal/specs" className={`hover:text-[#2563EB] transition-colors ${pathname === '/personal/specs' ? 'text-[#2563EB] font-bold' : ''}`}>
              Tech Specs
            </Link>
            <Link href="/personal/app" className={`hover:text-[#2563EB] transition-colors flex items-center gap-1.5 ${pathname === '/personal/app' ? 'text-[#2563EB] font-bold' : ''}`}>
              <Smartphone className="w-4 h-4 text-[#2563EB]" /> Treel Care App
            </Link>
            <Link href="/personal/support/warranty" className="hover:text-[#2563EB] transition-colors">
              Warranty
            </Link>
          </nav>

          {/* Cart & Shop CTAs */}
          <div className="flex items-center space-x-3">
            <Link href="/personal/buy/cart" className="relative p-2.5 rounded-full border border-black/[0.08] hover:bg-[#F3F4F6] text-[#111827] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2563EB] text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/personal/track-order"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] hover:text-[#2563EB] transition-colors px-3 py-2 rounded-full hover:bg-[#F3F4F6]"
            >
              <Package className="w-3.5 h-3.5 text-[#2563EB]" /> Track Order
            </Link>

            <Link href="/personal/buy" className="hidden sm:inline-block">
              <button className="rounded-full font-manrope font-bold text-xs uppercase tracking-wider px-5 py-2.5 bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all shadow-sm inline-flex items-center gap-1.5 cursor-pointer">
                Buy Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-full border border-black/[0.08] text-[#111827]"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-black/[0.06] bg-white px-6 py-6 space-y-4 text-sm font-semibold shadow-2xl font-manrope">
            <Link href="/personal/buy" onClick={() => setMobileOpen(false)} className="block py-2 text-[#2563EB] font-bold">Shop Car & Bike Kits</Link>
            <Link href="/personal/features" onClick={() => setMobileOpen(false)} className="block py-2 text-[#111827] hover:text-[#2563EB]">Features & App</Link>
            <Link href="/personal/specs" onClick={() => setMobileOpen(false)} className="block py-2 text-[#111827] hover:text-[#2563EB]">Technical Specs</Link>
            <Link href="/personal/track-order" onClick={() => setMobileOpen(false)} className="block py-2 text-[#111827] hover:text-[#2563EB]">Track Order</Link>
            <Link href="/personal/app" onClick={() => setMobileOpen(false)} className="block py-2 text-[#111827] hover:text-[#2563EB]">Treel Care Mobile App</Link>
            <Link href="/personal/support/warranty" onClick={() => setMobileOpen(false)} className="block py-2 text-[#111827] hover:text-[#2563EB]">Warranty Registration</Link>
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
