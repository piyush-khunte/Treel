"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "@/components/layout/social-links";

export function SurakshaLandingFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`bg-[#0F1419] text-[#FAF7F2] border-t border-white/10 pt-16 pb-12 font-inter relative z-10 ${className}`}>
      <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Image
              src="https://res.cloudinary.com/uwd11u7t/image/upload/v1791436559/treel_main_logo.jpg"
              alt="Treel Mobility Intelligence"
              width={200}
              height={60}
              className="h-12 md:h-14 w-auto object-contain brightness-100"
            />
            <p className="font-fraunces italic text-[15px] text-[#94A3B8] leading-relaxed max-w-sm">
              The mobility intelligence company. Every vehicle a signal, every signal an insight.
            </p>
            <p className="text-xs text-[#94A3B8] font-manrope pt-2">
              ARAI &amp; ISO 9001:2015 Certified · Patents in India, US &amp; EU
            </p>
            <p className="text-xs text-[#94A3B8] font-manrope">
              IATF 16949 Certified
            </p>
            <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
              <span>© {new Date().getFullYear()} Treel Mobility Solutions Private Limited. All rights reserved.</span>
            </div>
            <SocialLinks variant="suraksha" />
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-widest text-[#D5573B] font-bold font-mono">
              SOLUTIONS
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/tmip" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  TMIP Enterprise
                </Link>
              </li>
              <li>
                <Link href="/suraksha" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Suraksha Fleet
                </Link>
              </li>
              <li>
                <Link href="/personal" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Personal TPMS
                </Link>
              </li>
              <li>
                <Link href="/products" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Products Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-widest text-[#D5573B] font-bold font-mono">
              TECHNOLOGY
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/technology" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Platform Architecture
                </Link>
              </li>
              <li>
                <Link href="/vehicle-digital-twin" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Vehicle Digital Twin
                </Link>
              </li>
              <li>
                <Link href="/data-infrastructure" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Data Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/mobility-intelligence" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Mobility Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Intelligence */}
          <div className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-widest text-[#D5573B] font-bold font-mono">
              INTELLIGENCE
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="/insights" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Insights &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/press" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Press &amp; Media
                </Link>
              </li>
              <li>
                <Link href="/events" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Events &amp; Keynotes
                </Link>
              </li>
              <li>
                <Link href="/annual-reports" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link href="/notices" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Notice Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h2 className="text-[11px] uppercase tracking-widest text-[#D5573B] font-bold font-mono">
              COMPANY
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  About Treel
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/why-treel" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Why Treel
                </Link>
              </li>
              <li>
                <Link href="/global-presence" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Global Presence / Export
                </Link>
              </li>
              <li>
                <Link href="/careers" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact?subject=suraksha" className="inline-block py-1.5 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] font-inter gap-4">
          <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
            <p>
              Website developed by{" "}
              <a href="https://magicworksitsolutions.com" rel="nofollow" target="_blank">MagicWorks</a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <Link href="/privacy" className="inline-block py-1 hover:text-[#FAF7F2] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="inline-block py-1 hover:text-[#FAF7F2] transition-colors">
              Terms 
            </Link>
            <Link href="/cookies" className="inline-block py-1 hover:text-[#FAF7F2] transition-colors">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="inline-block py-1 hover:text-[#FAF7F2] transition-colors">
              Accessibility
            </Link>
            <Link href="/gdpr" className="inline-block py-1 hover:text-[#FAF7F2] transition-colors">
              GDPR Compliance
            </Link>
            <Link href="/personal/returns" className="inline-block py-1 hover:text-[#FAF7F2] transition-colors">
              Returns Policy
            </Link>
            <Link href="/personal/shipping" className="inline-block py-1 hover:text-[#FAF7F2] transition-colors">
              Shipping Policy
            </Link>
            <Link href="/personal/refunds" className="inline-block py-1 hover:text-[#FAF7F2] transition-colors">
              Refunds Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SurakshaLandingFooter;
