"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function TmipLandingFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`bg-[#050A17] text-[#E5E7EB] border-t border-[#3B82F6]/20 pt-16 pb-10 font-ibm-plex relative z-10 ${className}`}>
      <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/5">
          {/* Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Image
              src="/images/treel main logo.jpg"
              alt="Treel Mobility Intelligence"
              width={200}
              height={60}
              className="h-12 md:h-14 w-auto object-contain brightness-100"
            />
            <p className="font-ibm-plex text-[15px] text-[#94A3B8] leading-relaxed max-w-sm">
              The mobility intelligence company. Every vehicle a signal, every signal an insight.
            </p>
            <p className="text-xs text-[#64748B] font-jetbrains pt-2">
              ARAI &amp; ISO 9001:2015 Certified · Patents in India, US &amp; EU
            </p>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h5 className="font-space-grotesk text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold">
              SOLUTIONS
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/tmip" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  TMIP Enterprise
                </Link>
              </li>
              <li>
                <Link href="/suraksha" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Suraksha Fleet
                </Link>
              </li>
              <li>
                <Link href="/personal" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Personal TPMS
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Products Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-3">
            <h5 className="font-space-grotesk text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold">
              TECHNOLOGY
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/technology" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Platform Architecture
                </Link>
              </li>
              <li>
                <Link href="/vehicle-digital-twin" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Vehicle Digital Twin
                </Link>
              </li>
              <li>
                <Link href="/data-infrastructure" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Data Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/mobility-intelligence" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Mobility Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Intelligence */}
          <div className="space-y-3">
            <h5 className="font-space-grotesk text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold">
              INTELLIGENCE
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Insights &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Press &amp; Media
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Events &amp; Keynotes
                </Link>
              </li>
              <li>
                <Link href="/annual-reports" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link href="/notices" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Notice Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h5 className="font-space-grotesk text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold">
              COMPANY
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  About Treel
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/why-treel" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Why Treel
                </Link>
              </li>
              <li>
                <Link href="/global-presence" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Global Presence / Export
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] font-ibm-plex gap-4">
          <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
            <span>© 2026 Treel Mobility Solutions Private Limited. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <Link href="/privacy" className="hover:text-[#3B82F6] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#3B82F6] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-[#3B82F6] transition-colors">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="hover:text-[#3B82F6] transition-colors">
              Accessibility
            </Link>
            <Link href="/gdpr" className="hover:text-[#3B82F6] transition-colors">
              GDPR Compliance
            </Link>
            <Link href="/personal/returns" className="hover:text-[#3B82F6] transition-colors">
              Returns Policy
            </Link>
            <Link href="/personal/shipping" className="hover:text-[#3B82F6] transition-colors">
              Shipping Policy
            </Link>
            <Link href="/personal/refunds" className="hover:text-[#3B82F6] transition-colors">
              Refunds Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default TmipLandingFooter;
