import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Share2, 
  Mail, 
  Phone, 
  Building2, 
  Check, 
  Copy 
} from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";
import { PressShareBar } from "./press-share-bar";

interface PressReleaseDetail {
  year: string;
  slug: string;
  category: string;
  headline: string;
  date: string;
  city: string;
  leadParagraph: string;
  quote: {
    text: string;
    speaker: string;
    role: string;
  };
  bodyParagraphs: string[];
  relatedSlugs: string[];
}

const PRESS_DETAILS: Record<string, PressReleaseDetail> = {
  "68000-commercial-vehicles-milestone": {
    year: "2026",
    slug: "68000-commercial-vehicles-milestone",
    category: "Milestone",
    headline: "Treel Surpasses 68,000 Connected Commercial Vehicles, Cementing Position as India's Largest Fleet Telematics Dataset",
    date: "15 September 2026",
    city: "PUNE",
    leadParagraph: "Treel Mobility Solutions Private Limited announced today that its proprietary Vehicle Digital Twin platform has surpassed sixty-eight thousand active commercial vehicles under management across the Indian subcontinent. Ingesting over 150 million daily telemetry points across heavy freight routes, the milestone cements Treel as the operator of India's largest connected commercial vehicle dataset.",
    quote: {
      text: "Reaching sixty-eight thousand commercial vehicles is not merely a milestone in hardware deployment—it is a transformation in how the logistics industry understands vehicle physics. At this scale, our models predict catastrophic carcass failures 48 hours before pressure loss manifests on highway tarmac.",
      speaker: "Manish Ingale",
      role: "Founder & CEO, Treel Mobility Solutions",
    },
    bodyParagraphs: [
      "Founded in 2018 and backed by JK Tyre, Treel has focused systematically on solving the single highest operating cost variable in commercial road transport: tyre lifecycle and unscheduled roadside breakdowns. Roadside tyre failures historically account for over 35% of unplanned highway stoppages in heavy multi-axle freight.",
      "By engineering sensors that sample wheel-end thermodynamics, rotational dynamics, and pressure decay at 24 Hz, Treel constructs a continuous five-layer Vehicle Digital Twin for every connected vehicle. The platform translates raw telemetry into predictive maintenance schedules, enabling fleet operators to intervene during depot turnaround rather than losing valuable transit hours to emergency roadside repairs.",
      "Today, Treel serves more than 200 enterprise fleet operators, including major logistics conglomerates, intercity passenger transit corporations, and heavy industrial mining fleets. Across this fleet baseline, operators report an average 3.2% fuel efficiency improvement and a median payback period of under nine months.",
    ],
    relatedSlugs: [
      "project-suraksha-nationwide-launch",
      "jk-tyre-telematics-partnership-expansion",
      "arai-commercial-certification"
    ],
  },
  "project-suraksha-nationwide-launch": {
    year: "2026",
    slug: "project-suraksha-nationwide-launch",
    category: "Product Launch",
    headline: "Treel Unveils Project Suraksha: ₹17,500 DIY Tyre Safety Kit for India's 8 Million Owner-Drivers",
    date: "22 July 2026",
    city: "NEW DELHI",
    leadParagraph: "Treel Mobility Solutions today announced the commercial nationwide release of Project Suraksha, an affordable, commercial-grade tyre monitoring and safety kit engineered specifically for India's eight million owner-drivers and small fleet operators.",
    quote: {
      text: "India's transport economy rides on the back of owner-drivers who own one or two trucks. For them, a single highway tyre blowout represents an existential financial hit of fifty thousand rupees or more. Suraksha packages our enterprise-grade digital twin algorithms into a ₹17,500 kit that any driver can install in forty-five minutes.",
      speaker: "Manish Ingale",
      role: "Founder & CEO, Treel Mobility Solutions",
    },
    bodyParagraphs: [
      "Priced at ₹17,500 inclusive of taxes, the Suraksha kit features IP69K military-rated wheel sensors paired with a ruggedized, solar-powered in-cab dashboard display. Crucially, the system does not require smartphone connectivity or cellular coverage to function, delivering instant audio-visual warnings in six regional Indian languages—Hindi, Marathi, Gujarati, Punjabi, Tamil, and Telugu.",
      "Project Suraksha is available through a network of 450 certified fitment centres across major transport hubs in Maharashtra, Gujarat, Rajasthan, Tamil Nadu, and the National Capital Region, as well as online through the Treel store.",
    ],
    relatedSlugs: [
      "68000-commercial-vehicles-milestone",
      "jk-tyre-telematics-partnership-expansion",
      "arai-commercial-certification"
    ],
  },
  "jk-tyre-telematics-partnership-expansion": {
    year: "2026",
    slug: "jk-tyre-telematics-partnership-expansion",
    category: "Partnership",
    headline: "Treel and JK Tyre Expand Factory-Fit Intelligent Tyre Program Across Three Commercial OEM Platforms",
    date: "10 May 2026",
    city: "NEW DELHI",
    leadParagraph: "Treel Mobility Solutions and leading automotive tyre manufacturer JK Tyre & Industries today announced the expansion of their joint smart mobility initiative, integrating Treel's embedded valve telemetry into three major commercial vehicle OEM factory assembly lines.",
    quote: {
      text: "The integration of smart tyre sensors directly on the OEM manufacturing floor eliminates aftermarket friction and delivers connected intelligence from day zero. This partnership brings the future of software-defined commercial vehicles into volume production today.",
      speaker: "Executive Committee",
      role: "Treel & JK Tyre Strategic Alliance",
    },
    bodyParagraphs: [
      "Under the expanded partnership, new commercial trucks and buses manufactured by partner OEMs will roll off production lines pre-fitted with Treel's internal rim transducers and factory-paired digital twin profiles. Fleet buyers receive immediate access to the TMIP enterprise telematics suite upon vehicle delivery.",
      "The program covers medium and heavy commercial haulage vehicles, off-highway mining tippers, and luxury long-distance passenger coaches across India and neighboring export markets.",
    ],
    relatedSlugs: [
      "68000-commercial-vehicles-milestone",
      "project-suraksha-nationwide-launch",
      "arai-commercial-certification"
    ],
  },
  "arai-commercial-certification": {
    year: "2025",
    slug: "arai-commercial-certification",
    category: "Company News",
    headline: "Treel Secures ARAI Commercial Automotive Standard Certification for Next-Gen Sensor Hardware",
    date: "18 December 2025",
    city: "PUNE",
    leadParagraph: "Treel Mobility Solutions has officially received Automotive Research Association of India (ARAI) certification for its next-generation commercial vehicle telemetry sensors and gateway systems.",
    quote: {
      text: "ARAI certification validates seven years of relentless engineering designed to withstand the harshest physical operating conditions on Indian roads, from monsoon submergence to high-tonnage mining vibration.",
      speaker: "Dr. Vikram Seth",
      role: "Director of Systems Validation, Treel",
    },
    bodyParagraphs: [
      "The rigorous certification procedure evaluated Treel hardware against strict automotive parameters, including IP69K high-pressure steam cleaning resistance, continuous thermal cycles between -40°C and +125°C, and electromagnetic compatibility across high-frequency RF spectrums.",
      "The certification qualifies Treel hardware for standardized OEM assembly line fitment across commercial passenger and freight vehicle categories nationwide.",
    ],
    relatedSlugs: [
      "68000-commercial-vehicles-milestone",
      "project-suraksha-nationwide-launch",
      "jk-tyre-telematics-partnership-expansion"
    ],
  },
};

export function generateStaticParams() {
  return [
    { year: "2026", slug: "68000-commercial-vehicles-milestone" },
    { year: "2026", slug: "project-suraksha-nationwide-launch" },
    { year: "2026", slug: "jk-tyre-telematics-partnership-expansion" },
    { year: "2025", slug: "arai-commercial-certification" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ year: string; slug: string }> }): Promise<Metadata> {
  const { year, slug } = await params;
  const release = PRESS_DETAILS[slug] || PRESS_DETAILS["68000-commercial-vehicles-milestone"];

  return {
    title: `${release.headline} · Treel Press`,
    description: release.leadParagraph.slice(0, 150) + "...",
    alternates: {
      canonical: `https://treel.in/press/${year}/${slug}`,
    },
    openGraph: {
      title: `${release.headline} · Treel Press`,
      description: release.leadParagraph.slice(0, 150) + "...",
      url: `https://treel.in/press/${year}/${slug}`,
      type: "article",
    },
  };
}

export default async function PressReleasePage({ params }: { params: Promise<{ year: string; slug: string }> }) {
  const { year, slug } = await params;
  const release = PRESS_DETAILS[slug] || {
    year,
    slug,
    category: "Company News",
    headline: "Treel Mobility Continues Expansion Across Commercial Haulage Fleets",
    date: `${year}`,
    city: "PUNE",
    leadParagraph: "Treel Mobility Solutions operates India's largest connected commercial vehicle dataset, delivering actionable mobility intelligence and Vehicle Digital Twin technology to fleet operators nationwide.",
    quote: {
      text: "Every vehicle generates an invaluable stream of operational signals. Our mission is turning raw motion into deterministic operating capital.",
      speaker: "Treel Leadership Team",
      role: "Treel Mobility Solutions",
    },
    bodyParagraphs: [
      "Treel serves over two hundred enterprise fleet operators and thousands of independent transport professionals with comprehensive tyre telemetry, blowout prevention, and predictive vehicle health monitoring.",
    ],
    relatedSlugs: ["68000-commercial-vehicles-milestone", "project-suraksha-nationwide-launch"],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": release.headline,
    "datePublished": `${year}-01-01`,
    "description": release.leadParagraph,
    "publisher": {
      "@type": "Organization",
      "name": "Treel Mobility Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://treel.in/images/logo.png"
      }
    }
  };

  return (
    <article className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. ARTICLE HEADER */}
      <header className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Link href="/press" className="hover:text-[#FAF7F2] transition-colors">
                Press
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href="/press" className="hover:text-[#FAF7F2] transition-colors">
                {year}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#D5573B] truncate max-w-xs">{release.category}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase px-3 py-0.5 rounded-[4px] bg-[#D5573B]/10 text-[#D5573B] border border-[#D5573B]/20 font-semibold tracking-wider">
                {release.category}
              </span>
              <TreelSignature variant="compact" />
            </div>

            <h1 className="font-fraunces text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              {release.headline}
            </h1>

            {/* Dateline & Byline */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
              <div>
                <span>{release.city}, India</span>
                <span className="mx-2 text-white/20">·</span>
                <span>{release.date}</span>
                <span className="mx-2 text-white/20">·</span>
                <span className="text-[#FAF7F2]">Byline: Treel Communications</span>
              </div>

              <PressShareBar headline={release.headline} url={`https://treel.in/press/${year}/${slug}`} />
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTENT */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-8 text-base sm:text-lg text-[#CBD5E1] leading-relaxed font-inter">
            <p className="font-medium text-[#FAF7F2] text-lg sm:text-xl leading-relaxed">
              {release.leadParagraph}
            </p>

            {/* Supporting Executive Quote Block */}
            <div className="my-10 p-8 rounded-lg bg-white/[0.03] border-l-4 border-[#D5573B] space-y-4">
              <p className="font-fraunces text-xl sm:text-2xl text-[#FAF7F2] italic leading-snug">
                &ldquo;{release.quote.text}&rdquo;
              </p>
              <div className="text-xs font-mono text-[#94A3B8] pt-2">
                <span className="text-[#FAF7F2] font-semibold">{release.quote.speaker}</span>
                <span className="mx-2 text-white/20">·</span>
                <span>{release.quote.role}</span>
              </div>
            </div>

            {release.bodyParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {/* Standard Corporate Boilerplate */}
            <div className="mt-16 pt-10 border-t border-white/10 space-y-4">
              <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                About Treel Mobility Solutions
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Treel Mobility Solutions Private Limited is the mobility intelligence company operating India&apos;s largest connected commercial vehicle dataset. Founded in 2018 and backed by JK Tyre, Treel serves two hundred enterprise customers with sixty-eight thousand vehicles under active management. Its three product families — TMIP for enterprise fleets, Project Suraksha for owner-drivers, and Personal TPMS for consumers — operate on a shared Vehicle Digital Twin architecture. Headquartered in Pune. Learn more at{" "}
                <Link href="/" className="text-[#D5573B] underline hover:text-[#FAF7F2]">
                  treel.in
                </Link>.
              </p>
            </div>

            {/* Media Contact Block */}
            <div className="mt-8 p-6 rounded-lg bg-[#141B22] border border-white/10 space-y-3">
              <h4 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                Media Contact
              </h4>
              <div className="text-xs font-mono text-[#94A3B8] space-y-1">
                <div>Treel Communications Team</div>
                <div>
                  Email:{" "}
                  <a href="mailto:hello@treel.in" className="text-[#D5573B] underline">
                    hello@treel.in
                  </a>
                </div>
                <div>
                  Toll-Free: <span className="text-[#FAF7F2]">1800 833 0233</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED RELEASES STRIP */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Related news
              </h2>
              <Link href="/press" className="text-xs font-semibold text-[#D5573B] hover:underline flex items-center gap-1">
                <span>View all news</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {release.relatedSlugs.slice(0, 2).map((relSlug) => {
                const rel = PRESS_DETAILS[relSlug];
                if (!rel) return null;
                return (
                  <div 
                    key={rel.slug}
                    className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-[#94A3B8]">{rel.date}</div>
                      <h4 className="font-fraunces text-base font-medium text-[#FAF7F2] leading-snug">
                        {rel.headline}
                      </h4>
                    </div>
                    <div className="pt-4 mt-4 border-t border-white/5">
                      <Link
                        href={`/press/${rel.year}/${rel.slug}`}
                        className="text-xs font-semibold text-[#D5573B] hover:text-[#FAF7F2] inline-flex items-center gap-1"
                      >
                        <span>Read statement</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}