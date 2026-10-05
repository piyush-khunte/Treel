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
            <h5 >
              SOLUTIONS
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/tmip" >
                  TMIP Enterprise
                </Link>
              </li>
              <li>
                <Link href="/suraksha">
                  Suraksha Fleet
                </Link>
              </li>
              <li>
                <Link href="/personal">
                  Personal TPMS
                </Link>
              </li>
              <li>
                <Link href="/products">
                  Products Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-3">
            <h5 >
              TECHNOLOGY
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/technology" >
                  Platform Architecture
                </Link>
              </li>
              <li>
                <Link href="/vehicle-digital-twin" >
                  Vehicle Digital Twin
                </Link>
              </li>
              <li>
                <Link href="/data-infrastructure">
                  Data Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/mobility-intelligence">
                  Mobility Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Intelligence */}
          <div className="space-y-3">
            <h5>
              INTELLIGENCE
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/research">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="/insights">
                  Insights &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/press">
                  Press &amp; Media
                </Link>
              </li>
              <li>
                <Link href="/events" >
                  Events &amp; Keynotes
                </Link>
              </li>
              <li>
                <Link href="/annual-reports" >
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link href="/notices">
                  Notice Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h5 className="">
              COMPANY
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/about" >
                  About Treel
                </Link>
              </li>
              <li>
                <Link href="/leadership" >
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/why-treel" >
                  Why Treel
                </Link>
              </li>
              <li>
                <Link href="/global-presence" >
                  Global Presence / Export
                </Link>
              </li>
              <li>
                <Link href="/careers" >
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] font-ibm-plex gap-4">
          <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
             <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
            <span>© {new Date().getFullYear()} Treel Mobility Solutions Private Limited. All rights reserved.</span>
          </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <Link href="/privacy" >
              Privacy Policy
            </Link>
            <Link href="/terms">
              Terms of Service
            </Link>
            <Link href="/cookies" >
              Cookie Policy
            </Link>
            <Link href="/accessibility">
              Accessibility
            </Link>
            <Link href="/gdpr">
              GDPR Compliance
            </Link>
            <Link href="/personal/returns" >
              Returns Policy
            </Link>
            <Link href="/personal/shipping">
              Shipping Policy
            </Link>
            <Link href="/personal/refunds">
              Refunds Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default TmipLandingFooter;
