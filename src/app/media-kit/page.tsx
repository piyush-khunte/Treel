import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FileText, Image as ImageIcon, Sparkles, Shield, Palette, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Media Kit · Treel",
  description: "Download Treel brand assets, founder photos, product photography, and fact sheet. For press, partners, and industry analysts.",
  alternates: {
    canonical: "https://treel.in/media-kit",
  },
  openGraph: {
    title: "Media Kit · Treel",
    description: "Download Treel brand assets, founder photos, product photography, and fact sheet. For press, partners, and industry analysts.",
    url: "https://treel.in/media-kit",
  },
};

const brandAssets = [
  {
    title: "Official Treel Logo Pack",
    format: "SVG, PNG (High-Res)",
    description: "Dark, light, and monochrome vector logos with clearance guides.",
    size: "4.2 MB",
    file: "treel-logo-pack.zip",
    icon: Palette,
  },
  {
    title: "Treel Three-Line Signature",
    format: "SVG, AI",
    description: "Vector mark derived from the three red bars of the primary emblem.",
    size: "1.1 MB",
    file: "treel-signature-mark.zip",
    icon: Sparkles,
  },
  {
    title: "Brand Guidelines V3.1",
    format: "PDF Document",
    description: "Full specifications on color palette (Ink, Treel Red, Cream), typography, and tone.",
    size: "8.5 MB",
    file: "treel-brand-guidelines.pdf",
    icon: FileText,
  },
  {
    title: "Typography & Specimen Guide",
    format: "PDF Document",
    description: "Fraunces display hierarchy and Inter UI typography standards.",
    size: "2.3 MB",
    file: "treel-typography-guide.pdf",
    icon: Layers,
  },
];

const photoPacks = [
  {
    category: "Founder & Leadership",
    title: "Manish Ingale & Leadership Portraits",
    description: "Studio portraits of founder Manish Ingale and key executive leadership in high resolution.",
    details: "12 high-resolution JPG/PNG images",
    size: "24 MB",
    file: "treel-leadership-photography.zip",
  },
  {
    category: "Product & Hardware",
    title: "Wheel Sensors & In-Cab Hardware",
    description: "Studio product photography of commercial rim sensors, valve sensors, and Suraksha display.",
    details: "18 high-resolution JPG images",
    size: "32 MB",
    file: "treel-hardware-photography.zip",
  },
  {
    category: "Platform UI",
    title: "TMIP Platform & Mobile App UI",
    description: "Retina screenshots of TMIP enterprise console, Vehicle Digital Twin views, and personal apps.",
    details: "15 uncompressed PNG mockups",
    size: "18 MB",
    file: "treel-ui-screenshots.zip",
  },
  {
    category: "Field Operations",
    title: "Commercial Fleet Installations",
    description: "On-ground photography of commercial trucks, yard gate inspection lanes, and fitment hubs.",
    details: "10 high-resolution JPG images",
    size: "22 MB",
    file: "treel-fleet-photography.zip",
  },
];

export default function MediaKitPage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                MEDIA KIT
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Everything you need to <span className="italic font-normal text-[#D5573B]">cover Treel.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Brand assets, founder and team photography, product images, company fact sheet, and executive bios. Download individually or grab the full kit as a single ZIP archive.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FULL KIT DOWNLOAD BANNER */}
      <section className="py-12 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="rounded-xl border border-[#D5573B]/30 bg-[#0F1419] p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D5573B]">
                All-in-One Package
              </span>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Complete Media Bundle
              </h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Download all vector logos, high-res photography, executive bios, and company fact sheets in a single ZIP file (~50 MB).
              </p>
            </div>
            <Button asChild variant="treel" size="lg" className="whitespace-nowrap">
              <a href="#download-full-kit" className="inline-flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Download full media kit (~50MB)</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. BRAND ASSETS */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                LOGOS &amp; GUIDELINES
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
                Brand assets
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Official vector marks and design documentation. Use only unmodified assets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {brandAssets.map((asset) => {
                const Icon = asset.icon;
                return (
                  <div 
                    key={asset.title}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#D5573B]/40 transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono text-[#94A3B8] px-2.5 py-1 rounded bg-white/5">
                          {asset.size}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                          {asset.title}
                        </h3>
                        <div className="text-xs text-[#D5573B] font-mono mt-0.5">
                          {asset.format}
                        </div>
                        <p className="text-sm text-[#94A3B8] mt-3 leading-relaxed">
                          {asset.description}
                        </p>
                      </div>
                    </div>

                    <a
                      href={`#download-${asset.file}`}
                      className="inline-flex items-center justify-between px-4 py-2.5 rounded-md text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#FAF7F2] hover:bg-[#D5573B] hover:border-[#D5573B] transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors" />
                        Download Asset
                      </span>
                      <span className="text-[11px] font-mono text-[#94A3B8] group-hover:text-white/80">
                        {asset.size}
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHOTOGRAPHY PACKS */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                EDITORIAL IMAGERY
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
                Photography packs
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Approved high-resolution photography for publication in print, web, and broadcast media.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {photoPacks.map((pack) => (
                <div 
                  key={pack.title}
                  className="rounded-xl border border-white/10 bg-[#0F1419] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#D5573B]/40 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest font-mono text-[#D5573B] font-semibold">
                        {pack.category}
                      </span>
                      <span className="text-xs font-mono text-[#94A3B8] px-2.5 py-1 rounded bg-white/5">
                        {pack.size}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                        {pack.title}
                      </h3>
                      <div className="text-xs text-[#94A3B8] mt-1 font-mono">
                        {pack.details}
                      </div>
                      <p className="text-sm text-[#94A3B8] mt-3 leading-relaxed">
                        {pack.description}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`#download-${pack.file}`}
                    className="inline-flex items-center justify-between px-4 py-2.5 rounded-md text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#FAF7F2] hover:bg-[#D5573B] hover:border-[#D5573B] transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors" />
                      Download Image Pack
                    </span>
                    <span className="text-[11px] font-mono text-[#94A3B8] group-hover:text-white/80">
                      ZIP
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FACT SHEET & EXECUTIVE BIOS */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                STATUTORY &amp; CORPORATE BACKGROUND
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
                Fact sheet and executive bios
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                    Company Fact Sheet
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    One-page summary of founding, funding, product families, 68,000+ vehicle dataset, key metrics, and Pune headquarters info.
                  </p>
                </div>
                <a
                  href="#download-fact-sheet"
                  className="inline-flex items-center justify-between px-4 py-2.5 rounded-md text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#FAF7F2] hover:bg-[#D5573B] hover:border-[#D5573B] transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors" />
                    Download PDF Fact Sheet
                  </span>
                  <span className="text-[11px] font-mono text-[#94A3B8] group-hover:text-white/80">
                    1.4 MB
                  </span>
                </a>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                    Executive Bios &amp; Profiles
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Downloadable long-form narrative bios for founder Manish Ingale and the core leadership team.
                  </p>
                </div>
                <a
                  href="#download-executive-bios"
                  className="inline-flex items-center justify-between px-4 py-2.5 rounded-md text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#FAF7F2] hover:bg-[#D5573B] hover:border-[#D5573B] transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors" />
                    Download PDF Bios
                  </span>
                  <span className="text-[11px] font-mono text-[#94A3B8] group-hover:text-white/80">
                    2.1 MB
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TERMS & USAGE NOTE + CONTACT */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Need something specific?
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              If you need a specific high-resolution graphic asset, an interview with founder Manish Ingale, or product access for technical review, contact our communications desk.
            </p>
            <div className="p-6 rounded-lg bg-[#0F1419] border border-white/10 space-y-2">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#FAF7F2]">
                Terms &amp; Usage Note
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Treel brand assets may be used by journalists, media outlets, industry analysts, and confirmed partners for editorial coverage or reference. Please do not modify logos, change aspect ratios, or use assets in ways that imply official endorsement without written permission.
              </p>
            </div>
            <div className="pt-2">
              <Button asChild variant="treel" size="lg">
                <Link href="/contact?subject=Media" className="inline-flex items-center gap-2">
                  Contact media team <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}