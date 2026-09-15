import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function SurakshaHighwayHelpBar() {
  return (
    <section className="py-10 sm:py-12 border-b-2 border-[#451A03]/10 bg-[#451A03] text-[#FEF3C7] relative z-10 font-rubik">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-base sm:text-lg font-semibold text-center md:text-left">
            <span className="text-[#FEF3C7]">
              सुरक्षा हेल्पलाइन: <strong>1800 258 4567</strong> (Toll-Free)
            </span>
            <span className="hidden sm:inline text-[#EA580C]">•</span>
            <span className="text-[#FEF3C7]/90 font-medium">
              400+ Highway Suraksha Centres Across India
            </span>
          </div>
          <div className="flex items-center">
            <Link
              href="/suraksha/whatsapp"
              className="hover:text-white inline-flex items-center gap-2 text-[#FEF3C7] font-bold bg-[#EA580C] hover:bg-[#D97706] px-6 py-3 rounded-[4px] text-sm sm:text-base transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#FEF3C7]" /> WhatsApp Pe Baat Karein
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SurakshaHighwayHelpBar;
