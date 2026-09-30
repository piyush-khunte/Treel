"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Activity, Truck, Car } from "lucide-react";

export function EcosystemBar() {
  const pathname = usePathname();

  const isOtr = pathname?.startsWith("/products/otr-tpms");
  const isCorporate =
    pathname === "/" ||
    (!pathname?.startsWith("/tmip") &&
      !pathname?.startsWith("/timp") &&
      !pathname?.startsWith("/suraksha") &&
      !pathname?.startsWith("/personal") &&
      !pathname?.startsWith("/admin") &&
      !isOtr);
  const isTmip = pathname?.startsWith("/tmip") || pathname?.startsWith("/timp");
  const isSuraksha = pathname?.startsWith("/suraksha");
  const isPersonal = pathname?.startsWith("/personal");

  return (
    <div className="bg-[#0B0F14] text-[#FAF7F2] text-xs py-1.5 border-b border-white/10 select-none z-50">
      <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Left: Ecosystem Links */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5 xl:space-x-6 overflow-x-auto md:overflow-x-visible no-scrollbar py-0.5">
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

          <span className="text-slate-600">•</span>

          {/* OTR TPMS */}
          <Link
            href="/products/otr-tpms"
            className={`transition-colors whitespace-nowrap flex items-center gap-1.5 font-medium text-xs ${
              isOtr
                ? "text-[#3B82F6] font-semibold"
                : "text-slate-300 hover:text-[#3B82F6]"
            }`}
          >
            <Image
              src="/images/otr-excavator-icon.png"
              alt="OTR TPMS"
              width={16}
              height={16}
              className="w-4 h-4 object-contain inline-block -translate-y-px"
            />
            <span>OTR TPMS</span>
          </Link>
        </div>

        {/* Right: Parent Company & Support */}
        <div className="hidden md:flex items-center text-slate-300 text-xs shrink-0">
          <Link
            href="/contact"
            className="hover:text-[#D5573B] font-medium text-slate-300 transition-colors whitespace-nowrap"
          >
            Support & Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EcosystemBar;
