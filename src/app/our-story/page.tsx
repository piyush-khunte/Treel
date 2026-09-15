import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";

export const metadata: Metadata = {
  title: "Our Story · Treel Mobility Solutions",
  description: "From a JK Tyre R&D idea in 2018 to India's largest connected commercial vehicle dataset in 2026. The Treel story, in milestones.",
  alternates: {
    canonical: "https://treel.in/our-story",
  },
  openGraph: {
    title: "Our Story · Treel Mobility Solutions",
    description: "From a JK Tyre R&D idea in 2018 to India's largest connected commercial vehicle dataset in 2026. The Treel story, in milestones.",
    url: "https://treel.in/our-story",
  },
};

export default function OurStoryPage() {
  const milestones = [
    {
      year: "2018",
      title: "Founding & The Core Conviction",
      milestone: "Treel Mobility Solutions Private Limited incorporated on 12 April 2018.",
      narrative: "Manish Ingale founds Treel in Pune with the conviction that India's commercial vehicles are producing more data than anyone is reading. First product: a ruggedized valve-stem tyre sensor. First bet: that the tyre is the entry point to the vehicle, not the destination.",
    },
    {
      year: "2019",
      title: "First Hundred Fleets",
      milestone: "Word-of-mouth adoption across Maharashtra and Gujarat freight routes.",
      narrative: "The industry called it 'tyre monitoring'. Fleet operators called it 'the sensor that told me my truck was going to blow out before it reached the depot'. Word-of-mouth spread rapidly across logistics hubs.",
    },
    {
      year: "2020",
      title: "ARAI Certification & International Benchmarks",
      milestone: "ARAI automotive certification secured; formal 5-year sensor warranty instituted.",
      narrative: "Treel becomes one of the few Indian hardware telematics platforms with official third-party ARAI certification standing behind its sensor claims. Sensor longevity is proven under harsh Indian monsoon and summer road temperatures.",
    },
    {
      year: "2022",
      title: "Enterprise Platform & TMaaS Launch",
      milestone: "Tyre Management as a Service (TMaaS) launches for large fleet operators.",
      narrative: "The product moves from isolated hardware sensors to a unified enterprise cloud platform. Fleet owners start managing multi-axle trailers and nationwide depot inventories from a single centralized dashboard.",
    },
    {
      year: "2024",
      title: "Sixty-Eight Thousand Vehicles",
      milestone: "Dataset compounds past 68,000 active commercial vehicles under management.",
      narrative: "The dataset becomes Treel's deepest moat. Ingesting over 150 million daily telemetry points across 200 enterprise customers, Treel operates India's premier commercial vehicle telematics repository.",
    },
    {
      year: "2025",
      title: "Category Definition: Mobility Intelligence",
      milestone: "Evolution from component telematics to the Vehicle Digital Twin framework.",
      narrative: "The category outgrows the tyre. Treel introduces the five-layer Vehicle Digital Twin architecture, crystallizing the shift from reactive component alerts to predictive mobility intelligence.",
    },
    {
      year: "2026",
      title: "The Rebrand & Three Product Families",
      milestone: "Launch of Project Suraksha, TMIP Enterprise refresh, and new brand architecture.",
      narrative: "One company. Three product families: TMIP for enterprise, Project Suraksha for owner-drivers, and Personal TPMS for consumers. One mission: turn raw physical motion into operating intelligence.",
    },
  ];

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
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                OUR STORY
              </span>
              <TreelSignature variant="compact" />
            </div>

            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Eight years. One category.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              From a JK Tyre R&amp;D idea in 2018 to India&apos;s largest connected commercial vehicle dataset in 2026. The milestones that got us here.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TIMELINE SECTION */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-12">
            {milestones.map((item, idx) => (
              <div 
                key={item.year}
                className="relative pl-8 sm:pl-10 border-l-2 border-[#D5573B]/30 space-y-3 pb-8 last:pb-0"
              >
                {/* Timeline node */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0F1419] border-2 border-[#D5573B] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D5573B]" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#D5573B]">
                    {item.year}
                  </span>
                  <span className="text-xs text-[#94A3B8] font-mono">·</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                    {item.title}
                  </span>
                </div>

                <h3 className="font-fraunces text-xl sm:text-2xl font-medium text-[#FAF7F2]">
                  {item.milestone}
                </h3>

                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-inter">
                  {item.narrative}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DAY ONE, STILL SECTION */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Day One, still.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              India&apos;s commercial vehicle fleet will grow to three hundred million vehicles in the next decade. Middle Eastern and European deployments follow the Indian launch, without compromising the core reliability engineered for Indian highways. The category is not close to settled. Treel is here for the long build.
            </p>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM CTA BAND */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              See what we are building today.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              Explore how our five-layer Vehicle Digital Twin engine transforms raw wheel dynamics into enterprise operating intelligence.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/vehicle-digital-twin"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]"
              >
                <span>Explore the platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/leadership"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] border border-white/20 text-[#FAF7F2] font-medium text-sm hover:border-[#D5573B] hover:text-[#D5573B] transition-all"
              >
                <span>Meet the team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}