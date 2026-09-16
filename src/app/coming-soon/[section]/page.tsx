import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Globe, Smartphone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComingSoonForm } from "./coming-soon-form";

interface SectionConfig {
  title: string;
  subtitle: string;
  teaser: string;
  timeline: string;
  badge: string;
}

const KNOWN_SECTIONS: Record<string, SectionConfig> = {
  "tmip-europe": {
    title: "TMIP Europe",
    subtitle: "Enterprise Fleet Telematics for European Corridors",
    teaser: "TMIP for European fleet operators — featuring UNECE R141 compliance, pan-European multi-IMSI cellular roaming, and localized telemetry cloud endpoints.",
    timeline: "Targeted Launch: Q3 2026",
    badge: "Enterprise Pipeline",
  },
  "personal-tpms-international": {
    title: "Personal TPMS International",
    subtitle: "Global Consumer Hardware Distribution",
    teaser: "Personal TPMS direct shipping outside India — certified across regional automotive RF bands (433.92 MHz and BLE) with multi-currency localized fulfillment.",
    timeline: "Targeted Launch: 2027",
    badge: "Consumer Hardware",
  },
  "suraksha-app": {
    title: "Suraksha Driver App",
    subtitle: "Direct Smartphone Telemetry Companion",
    teaser: "A companion smartphone application for Project Suraksha, enabling long-haul commercial drivers to view real-time axle temperatures and pressure thresholds on iOS and Android.",
    timeline: "Targeted Launch: Q4 2026",
    badge: "Driver Telematics",
  },
};

export function generateStaticParams() {
  return [
    { section: "tmip-europe" },
    { section: "personal-tpms-international" },
    { section: "suraksha-app" },
  ];
}

function formatSectionTitle(raw: string): string {
  return raw
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const config = KNOWN_SECTIONS[section];
  const title = config ? config.title : formatSectionTitle(section);

  return {
    title: `${title} · Coming Soon · Treel`,
    description: config
      ? config.teaser
      : `${title} is currently under development on the Treel roadmap. Subscribe for release updates.`,
    alternates: {
      canonical: `https://treel.in/coming-soon/${section}`,
    },
    openGraph: {
      title: `${title} · Coming Soon · Treel`,
      description: config
        ? config.teaser
        : `${title} is currently under development on the Treel roadmap. Subscribe for release updates.`,
      url: `https://treel.in/coming-soon/${section}`,
    },
  };
}

export default async function ComingSoonSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const config = KNOWN_SECTIONS[section] || {
    title: formatSectionTitle(section),
    subtitle: "Initiative in Development",
    teaser: "This capability is currently undergoing validation within Treel's mobility intelligence roadmap. Register your interest for priority early-access announcements.",
    timeline: "In Active Pipeline",
    badge: "Product Roadmap",
  };

  const otherRoadmapItems = Object.entries(KNOWN_SECTIONS).filter(([key]) => key !== section);

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] font-inter selection:bg-[#D5573B]/20 selection:text-[#FAF7F2]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
                {config.badge}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#94A3B8]">
              <Clock className="w-3.5 h-3.5 text-[#D5573B]" /> {config.timeline}
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              {config.title}{" "}
              <span className="italic font-normal text-[#D5573B]">Coming Soon</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed">
              {config.teaser}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Subscription Section */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D5573B]">
                <Sparkles className="w-3.5 h-3.5" /> Early Access Alerts
              </div>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Be Notified When It Launches
              </h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Enter your email to receive direct notification and early access documentation as soon as {config.title} goes live.
              </p>
            </div>

            <ComingSoonForm sectionTitle={config.title} />
          </div>
        </div>
      </section>

      {/* Other Roadmap Initiatives */}
      {otherRoadmapItems.length > 0 && (
        <section className="py-20 border-b border-white/[0.08]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <div className="max-w-3xl mb-12">
              <h3 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] mb-3">
                Other Initiatives in Development
              </h3>
              <p className="text-sm text-[#94A3B8]">
                Explore additional upcoming capabilities from Treel&apos;s product and engineering teams:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherRoadmapItems.map(([key, item]) => (
                <Link
                  key={key}
                  href={`/coming-soon/${key}`}
                  className="group p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#D5573B]/40 transition-all duration-300 space-y-3 block"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                    <span className="text-[#D5573B] font-semibold">{item.badge}</span>
                    <span>{item.timeline}</span>
                  </div>
                  <h4 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors flex items-center justify-between">
                    {item.title}
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#D5573B] group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {item.teaser}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Return Home / Products CTA */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-fraunces text-xl text-[#FAF7F2]">Looking for existing production solutions?</h4>
            <p className="text-xs sm:text-sm text-[#94A3B8]">Explore TMIP for commercial fleets or Personal TPMS for passenger vehicles.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="treel">
              <Link href="/">
                Back to Homepage <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="treelOutline">
              <Link href="/products">
                Explore Current Products
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}