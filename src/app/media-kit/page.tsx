import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getPublishedMediaKitItems } from "@/lib/content/mediakit-storage";
import {
  ArrowRight,
  Download,
  FileText,
  Image as ImageIcon,
  Layers,
  Palette,
  Shield,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

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

export const revalidate = 60;

function getAssetIcon(iconName?: string) {
  switch (iconName) {
    case "Palette":
      return Palette;
    case "Sparkles":
      return Sparkles;
    case "Layers":
      return Layers;
    case "ImageIcon":
    case "Image":
      return ImageIcon;
    default:
      return FileText;
  }
}

export default async function MediaKitPage() {
  const items = await getPublishedMediaKitItems();

  const bundleItem =
    items.find((i) => i.category === "All-in-One Package") ||
    items.find((i) => (i.fileUrl && i.fileUrl.includes("complete-media-bundle")) || (i.title && i.title.toLowerCase().includes("complete")));

  const brandAssets = items.filter((i) => i.category === "Brand Assets");
  const photoPacks = items.filter((i) => i.category === "Photography");
  const factSheets = items.filter((i) => i.category === "Fact Sheet & Bios");

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
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Media Kit" },
              ]}
            />
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
      {bundleItem && (
        <section className="py-12 border-b border-white/10 bg-[#121820]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <div className="rounded-xl border border-[#D5573B]/30 bg-[#0F1419] p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D5573B]">
                  {bundleItem.category}
                </span>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                  {bundleItem.title}
                </h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {bundleItem.description}
                </p>
              </div>
              <Button asChild variant="treel" size="lg" className="whitespace-nowrap">
                <a
                  href={bundleItem.fileUrl}
                  download
                  className="inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download full media kit ({bundleItem.fileSize || "~50MB"})</span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* 3. BRAND ASSETS */}
      {brandAssets.length > 0 && (
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
                  const Icon = getAssetIcon(asset.iconName);
                  return (
                    <div 
                      key={asset._id || asset.title}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#D5573B]/40 transition-colors"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-mono text-[#94A3B8] px-2.5 py-1 rounded bg-white/5">
                            {asset.fileSize}
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
                        href={asset.fileUrl}
                        download
                        className="inline-flex items-center justify-between px-4 py-2.5 rounded-md text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#FAF7F2] hover:bg-[#D5573B] hover:border-[#D5573B] transition-all group"
                      >
                        <span className="flex items-center gap-2">
                          <Download className="w-4 h-4 text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors" />
                          Download Asset
                        </span>
                        <span className="text-[11px] font-mono text-[#94A3B8] group-hover:text-white/80">
                          {asset.fileSize}
                        </span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. PHOTOGRAPHY PACKS */}
      {photoPacks.length > 0 && (
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
                    key={pack._id || pack.title}
                    className="rounded-xl border border-white/10 bg-[#0F1419] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#D5573B]/40 transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest font-mono text-[#D5573B] font-semibold">
                          {pack.category}
                        </span>
                        <span className="text-xs font-mono text-[#94A3B8] px-2.5 py-1 rounded bg-white/5">
                          {pack.fileSize}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                          {pack.title}
                        </h3>
                        {pack.details && (
                          <div className="text-xs text-[#94A3B8] mt-1 font-mono">
                            {pack.details}
                          </div>
                        )}
                        <p className="text-sm text-[#94A3B8] mt-3 leading-relaxed">
                          {pack.description}
                        </p>
                      </div>
                    </div>

                    <a
                      href={pack.fileUrl}
                      download
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
      )}

      {/* 5. FACT SHEET & EXECUTIVE BIOS */}
      {factSheets.length > 0 && (
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
                {factSheets.map((item) => (
                  <div
                    key={item._id || item.title}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-8 space-y-6 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <a
                      href={item.fileUrl}
                      download
                      className="inline-flex items-center justify-between px-4 py-2.5 rounded-md text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#FAF7F2] hover:bg-[#D5573B] hover:border-[#D5573B] transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors" />
                        Download Asset
                      </span>
                      <span className="text-[11px] font-mono text-[#94A3B8] group-hover:text-white/80">
                        {item.fileSize}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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