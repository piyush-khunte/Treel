"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Truck, Car } from "lucide-react";

export function EcosystemBar() {
  const pathname = usePathname();

  const isCorporate =
    pathname === "/" ||
    (!pathname.startsWith("/tmip") &&
      !pathname.startsWith("/suraksha") &&
      !pathname.startsWith("/personal") &&
      !pathname.startsWith("/admin"));
  const isTmip = pathname.startsWith("/tmip");
  const isSuraksha = pathname.startsWith("/suraksha");
  const isPersonal = pathname.startsWith("/personal");

  return (
    <div className="bg-[#0B0F14] text-[#FAF7F2] text-xs py-1.5 border-b border-white/10 select-none z-50">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Left: Ecosystem Links */}
        <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-slate-400 font-medium whitespace-nowrap hidden sm:inline">
            Treel Ecosystem:
          </span>

          {/* Treel Corporate */}
          <Link
            href="/"
            className={`transition-colors whitespace-nowrap font-medium text-xs ${
              isCorporate
                ? "text-[#D5573B] font-semibold"
                : "text-slate-300 hover:text-[#D5573B]"
            }`}
          >
            Treel Corporate
          </Link>

          <span className="text-slate-600">•</span>

          {/* TMIP Enterprise */}
          <Link
            href="/tmip"
            className={`transition-colors whitespace-nowrap flex items-center gap-1.5 font-medium text-xs ${
              isTmip
                ? "text-[#00E5FF] font-semibold"
                : "text-slate-300 hover:text-[#00E5FF]"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#00E5FF]" /> TMIP Enterprise
          </Link>

          <span className="text-slate-600">•</span>

          {/* Suraksha Fleet */}
          <Link
            href="/suraksha"
            className={`transition-colors whitespace-nowrap flex items-center gap-1.5 font-medium text-xs ${
              isSuraksha
                ? "text-[#F59E0B] font-semibold"
                : "text-slate-300 hover:text-[#F59E0B]"
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-[#F59E0B]" /> Suraksha Fleet
          </Link>

          <span className="text-slate-600">•</span>

          {/* Personal TPMS */}
          <Link
            href="/personal"
            className={`transition-colors whitespace-nowrap flex items-center gap-1.5 font-medium text-xs ${
              isPersonal
                ? "text-[#60A5FA] font-semibold"
                : "text-slate-300 hover:text-[#60A5FA]"
            }`}
          >
            <Car className="w-3.5 h-3.5 text-[#60A5FA]" /> Personal TPMS
          </Link>
        </div>

        {/* Right: Parent Company & Support */}
        <div className="hidden md:flex items-center text-slate-300 text-xs mr-4">
          <Link
            href="/contact"
            className="hover:text-[#D5573B] font-medium text-slate-300 transition-colors"
          >
            Support & Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EcosystemBar;
