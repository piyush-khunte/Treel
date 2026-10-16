import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getPublishedPressItems } from "@/lib/content/press-storage";
import { Download, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PressClient } from "./press-client";

export const metadata: Metadata = {
  title: "Press & Media · Treel",
  description: "Official press releases, product announcements, and corporate news from Treel Mobility Solutions. India's leader in connected commercial vehicle telematics.",
  alternates: {
    canonical: "https://treel.in/press",
  },
  openGraph: {
    title: "Press & Media · Treel",
    description: "Official press releases, product announcements, and corporate news from Treel Mobility Solutions.",
    url: "https://treel.in/press",
  },
};

export const revalidate = 60;

export default async function PressPage() {
  const releases = await getPublishedPressItems();

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Press" },
              ]}
            />
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                PRESS
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              News from Treel.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Press releases, product announcements, and coverage from across the commercial mobility sector. For media inquiries, reach us at{" "}
              <a href="mailto:hello@treel.in" className="text-[#FAF7F2] underline hover:text-[#D5573B] transition-colors">
                hello@treel.in
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* 2 & 3. CLIENT INTERACTIVE FILTERS & RELEASES */}
      <PressClient initialReleases={releases} />

      {/* 4. MEDIA INQUIRIES & MEDIA KIT SECTION */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                  MEDIA &amp; COMMUNICATIONS
                </span>
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
                Media inquiries.
              </h2>
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-inter">
                For interview requests, high-resolution product photography, executive commentary on commercial mobility trends, or fact-checking, please contact our communications team. We respond to media queries within one business day.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact media team</span>
                </Link>
                <Link
                  href="/media-kit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] border border-white/20 text-[#FAF7F2] font-medium text-sm hover:border-[#D5573B] hover:text-[#D5573B] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download media kit</span>
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-lg bg-[#141B22] border border-white/10 space-y-4">
              <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                Treel Press Contact
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-[#94A3B8] font-mono">
                <div>Treel Mobility Solutions Communications</div>
                <div>Baner Tech Park, Pune 411045, Maharashtra, India</div>
                <div className="pt-2">
                  Email:{" "}
                  <a href="mailto:hello@treel.in" className="text-[#D5573B] underline">
                    hello@treel.in
                  </a>
                </div>
                <div>
                  Toll-Free:{" "}
                  <span className="text-[#FAF7F2]">1800 833 0233</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-[#64748B]">
                Operating hours: Monday – Friday, 08:00 AM – 8:00 PM IST
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}