import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  ChevronRight, 
  Calendar, 
  Clock, 
  BookOpen,
  FileText
} from "lucide-react";
import { ArticleShareBar, ArticleNewsletterForm } from "./article-client";

interface InsightArticle {
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  deck: string;
  author: string;
  authorRole: string;
  authorBio: string;
  date: string;
  publishIsoDate: string;
  readTime: string;
  tldr: string;
  body: {
    sections: {
      heading: string;
      paragraphs: string[];
    }[];
    pullQuote?: {
      quote: string;
      attribution: string;
    };
  };
  relatedSlugs: string[];
}

const ARTICLES: Record<string, InsightArticle> = {
  "vehicle-digital-twins-architecture": {
    slug: "vehicle-digital-twins-architecture",
    category: "Mobility Intelligence",
    categorySlug: "mobility-intelligence",
    title: "From Telemetry to Reasoning: The Architecture of Vehicle Digital Twins",
    deck: "How sub-second sensor signals from 68,000 commercial vehicles transform into predictive maintenance models and operational capital for modern fleet enterprises.",
    author: "Manish Ingale",
    authorRole: "Founder, Treel Mobility Solutions",
    authorBio: "Manish Ingale founded Treel in 2018 with the conviction that India's commercial vehicles were producing more data than any company was reading. With deep engineering roots across the tyre and mobility industries, he leads Treel's architecture from Pune.",
    date: "September 2026",
    publishIsoDate: "2026-09-01",
    readTime: "6 min read",
    tldr: "A Vehicle Digital Twin is not a static 3D model or simple telemetry dashboard; it is a live, queryable software object that continuously models the physical state, historical stresses, and remaining component life of a commercial vehicle. By transforming raw sensor telemetry into structured domain models, fleet operators shift from reactive roadside repairs to deterministic, scheduled interventions.",
    body: {
      sections: [
        {
          heading: "The Limits of Raw Telemetry",
          paragraphs: [
            "For the past decade, commercial fleet telematics has operated under a single premise: ingest as many raw GPS coordinates and CAN bus metrics as possible and display them on a map. But for an enterprise running 500 multi-axle trailers across national freight corridors, a stream of isolated temperature and pressure numbers is not actionable intelligence—it is noise.",
            "When a tyre heats up on Highway 48 during peak summer haulage, the critical operational question is not simply 'what is the current temperature?' The question is: 'Given this tyre\'s pressure decay history, current axle load, ambient road heat, and remaining tread depth, what is the probability of structural carcass failure before the vehicle reaches its destination depot?'"
          ]
        },
        {
          heading: "The Three-Layer Architecture of the Vehicle Digital Twin",
          paragraphs: [
            "To answer questions of economic risk and physical endurance, Treel structures each connected commercial vehicle as a three-layer digital twin:",
            "1. Physical State Layer (Edge Ingestion): High-frequency telemetry sampled directly at the wheel-end by smart rim sensors and valve-stem transducers. Signals include calibrated internal air chamber temperature, tyre cavity pressure, rotational dynamics, and localized vibration signatures.",
            "2. Operational History Layer (State Accumulation): Telemetry without context is uncalibrated. This layer continuously computes cumulative thermal stress cycles, pressure-decay gradients, retread integrity indexes, and terrain severity ratings across thousands of operational kilometers.",
            "3. Predictive Intelligence Layer (Inference & Action): Machine learning models benchmark live vehicle telemetry against empirical failure baselines from over 68,000 active commercial vehicles. Slow micro-leaks are flagged 48 hours before pressure drops to critical thresholds, allowing fleet dispatchers to schedule maintenance during scheduled turnaround windows rather than suffering emergency roadside punctures."
          ]
        },
        {
          heading: "From Reactive Downtime to Financial Predictability",
          paragraphs: [
            "When vehicle digital twins operate across an entire fleet, the financial dynamics of maintenance undergo a fundamental shift. Unplanned roadside tyre failures—which historically account for the single largest cause of unplanned commercial vehicle downtime—are virtually eliminated.",
            "Fuel efficiency gains between 2.8% and 4.2% are realized purely by maintaining optimal rolling resistance, while tyre carcass life is extended by 15% to 20%. By turning the physical state of every wheel into a deterministic digital asset, mobility intelligence delivers hard, measurable capital return."
          ]
        }
      ],
      pullQuote: {
        quote: "The vehicle is the fundamental unit of economic intelligence in road logistics, not the individual component or the GPS coordinate.",
        attribution: "— Manish Ingale, Founder"
      }
    },
    relatedSlugs: [
      "physics-of-tyre-pressure-fuel-savings",
      "scaling-iot-across-indian-highways",
      "cfo-guide-to-fleet-payback"
    ]
  },
  "physics-of-tyre-pressure-fuel-savings": {
    slug: "physics-of-tyre-pressure-fuel-savings",
    category: "Fleet Operations",
    categorySlug: "fleet-operations",
    title: "The Direct Thermodynamics of Under-Inflation on Diesel Consumption",
    deck: "An empirical study tracking 100,000 km across multi-axle trailers reveals the non-linear relationship between tyre rolling resistance and fuel burn.",
    author: "Pradnya Choudhary",
    authorRole: "Hardware Lead, Treel Mobility Solutions",
    authorBio: "Pradnya Choudhary directs embedded hardware engineering, ARAI sensor certification, and low-power RF validation for commercial fleet durability.",
    date: "August 2026",
    publishIsoDate: "2026-08-15",
    readTime: "5 min read",
    tldr: "Under-inflation creates excessive tyre contact patch deflection, exponentially increasing hysteretic energy loss and rolling resistance. Correcting inflation in real-time yields immediate diesel savings between 2.8% and 4.2% across long-haul freight operations.",
    body: {
      sections: [
        {
          heading: "Thermodynamics of the Contact Patch",
          paragraphs: [
            "A commercial vehicle tyre is a viscoelastic composite structure under continuous cyclical deformation. When internal pressure drops by just 10 PSI below OEM specification, the footprint contact area deforms non-linearly.",
            "This mechanical hysteresis dissipates mechanical energy directly as thermal heat inside the rubber carcass, forcing the diesel powertrain to overcome heightened rolling resistance coefficients."
          ]
        },
        {
          heading: "Empirical Fleet Findings",
          paragraphs: [
            "Analyzing 100,000 km of telematics data across 16-wheel tippers and highway trailers showed that active pressure regulation consistently saved between 2.8% and 4.2% on bulk fuel expenditures.",
            "Furthermore, internal carcass temperatures remained within safe structural limits, preventing premature tread separation and extending casing life for multiple retread cycles."
          ]
        }
      ],
      pullQuote: {
        quote: "Tyre pressure is not a maintenance checklist item; it is an active thermodynamic variable directly controlling fleet fuel burn.",
        attribution: "— Pradnya Choudhary, Hardware Lead"
      }
    },
    relatedSlugs: [
      "vehicle-digital-twins-architecture",
      "cfo-guide-to-fleet-payback",
      "scaling-iot-across-indian-highways"
    ]
  },
  "scaling-iot-across-indian-highways": {
    slug: "scaling-iot-across-indian-highways",
    category: "Product Updates",
    categorySlug: "product-updates",
    title: "Edge Resilience: Engineering Telemetry for Unreliable Cellular Corridors",
    deck: "How Treel smart sensors store, deduplicate, and burst-sync vehicle data during prolonged cellular blackouts across rural freight highways.",
    author: "Nithin",
    authorRole: "Engineering Manager, Treel Mobility Solutions",
    authorBio: "Nithin leads cloud infrastructure, edge computing pipelines, and real-time telemetry ingestion architecture supporting 68,000+ active vehicles at Treel.",
    date: "August 2026",
    publishIsoDate: "2026-08-01",
    readTime: "8 min read",
    tldr: "Highway IoT in India cannot rely on constant 4G coverage. Treel edge gateway units buffer telemetry locally on non-volatile flash, executing anomaly detection at the edge and burst-uploading upon network reconnection.",
    body: {
      sections: [
        {
          heading: "The Cellular Reality of National Freight Routes",
          paragraphs: [
            "While metropolitan hubs enjoy reliable high-speed cellular networks, critical freight corridors frequently traverse extensive blind zones where connectivity is intermittent or non-existent for hours.",
            "A telematics system that assumes constant cloud connectivity will lose critical thermodynamic data during the exact high-stress mountain passes and remote desert stretches where failures are most likely to occur."
          ]
        },
        {
          heading: "Store-and-Forward Edge Architecture",
          paragraphs: [
            "Treel onboard hub modules implement local circular buffers and deterministic anomaly scoring on-device. If pressure decays rapidly while offline, emergency audible in-cabin alarms alert the driver immediately.",
            "Upon re-entering cellular coverage, compressed and encrypted time-series batches are synchronized with Treel cloud infrastructure without timestamp distortion or telemetry packet loss."
          ]
        }
      ],
      pullQuote: {
        quote: "An IoT architecture is only as good as its offline resilience. In commercial transport, local autonomy is paramount.",
        attribution: "— Nithin, Engineering Manager"
      }
    },
    relatedSlugs: [
      "vehicle-digital-twins-architecture",
      "physics-of-tyre-pressure-fuel-savings",
      "why-suraksha-matters-for-owner-drivers"
    ]
  },
  "why-suraksha-matters-for-owner-drivers": {
    slug: "why-suraksha-matters-for-owner-drivers",
    category: "Case Studies",
    categorySlug: "case-studies",
    title: "Protecting the 1-Truck Operator: The Economics of Roadside Puncture Avoidance",
    deck: "Single-truck owner-drivers operate on razor-thin margins. Here is how real-time pressure alerts prevent catastrophic tyre blowouts on the Golden Quadrilateral.",
    author: "Atharv",
    authorRole: "Product Management, Treel Mobility Solutions",
    authorBio: "Atharv oversees the product roadmap for TMIP Enterprise, Project Suraksha, and Personal TPMS apps across iOS and Android.",
    date: "July 2026",
    publishIsoDate: "2026-07-20",
    readTime: "4 min read",
    tldr: "For an independent truck owner, a single highway blowout can wipe out an entire month of freight earnings. Suraksha delivers simple, zero-learning-curve WhatsApp alerts and affordable EMI options to safeguard livelihoods.",
    body: {
      sections: [
        {
          heading: "The Fragile Economics of the Small Fleet",
          paragraphs: [
            "Over 75% of India's freight is hauled by operators owning fewer than five vehicles. For an owner-driver with one truck, a single high-speed tyre burst causes severe rim damage, perishable cargo spoilage, and devastating replacement costs.",
            "Suraksha was created to bring tier-1 enterprise predictive telemetry to individual truck owners through direct WhatsApp notifications in regional languages."
          ]
        },
        {
          heading: "Highway Network Backing",
          paragraphs: [
            "Through 400+ JK Tyre Highway Truck Centres across national highways, drivers receive free sensor inspections, warranty replacements, and emergency support within minutes of roadside alert triggers.",
            "Predictable monthly EMI structures ensure that safety technology is immediately accessible without upfront capital strain."
          ]
        }
      ],
      pullQuote: {
        quote: "Suraksha is built on a simple conviction: the single-truck driver deserves the same predictive safety tools as a 1,000-vehicle fleet.",
        attribution: "— Atharv, Product Management"
      }
    },
    relatedSlugs: [
      "vehicle-digital-twins-architecture",
      "cfo-guide-to-fleet-payback",
      "founding-conviction-2018-to-2026"
    ]
  },
  "cfo-guide-to-fleet-payback": {
    slug: "cfo-guide-to-fleet-payback",
    category: "Industry Analysis",
    categorySlug: "industry-analysis",
    title: "The CFO Guide to Fleet Telemetry: Measuring the 9-Month Payback",
    deck: "Breaking down the capital allocation math of smart sensors versus tyre replacements, downtime penalties, and fuel theft mitigation.",
    author: "Imran Khan",
    authorRole: "Chief Financial Officer, Treel Mobility Solutions",
    authorBio: "Imran Khan manages financial strategy, capital allocation, enterprise procurement frameworks, and commercial operations across national hubs.",
    date: "July 2026",
    publishIsoDate: "2026-07-10",
    readTime: "7 min read",
    tldr: "Hardware investments in commercial vehicle intelligence amortize rapidly. Direct fuel savings (3.2% avg) and tyre casing preservation (18% avg) generate full capital payback in under 9 months for heavy commercial vehicles.",
    body: {
      sections: [
        {
          heading: "Capital Allocation in Modern Road Freight",
          paragraphs: [
            "Tyres represent the second largest operating expenditure for commercial transport fleets after diesel fuel. Yet, most financial models treat tyre wear as an uncontrollable stochastic cost.",
            "By instrumenting wheels with digital twin telemetry, tyre lifecycle costs become deterministic and fully auditable from procurement to scrap."
          ]
        },
        {
          heading: "The 9-Month Payback Model",
          paragraphs: [
            "Across multi-axle tippers and line-haul prime movers, the combined financial impact of 3% fuel optimization and 18% tyre life extension delivers a return on hardware investment in 8.4 to 9.2 months.",
            "Beyond direct line items, eliminating roadside downtime penalties and preventing catastrophic wheel-end fires dramatically reduces enterprise insurance premiums and contract SLA disputes."
          ]
        }
      ],
      pullQuote: {
        quote: "When tyre data turns into predictive lifecycle models, fleet maintenance transforms from an unpredictable cost center to a high-ROI capital efficiency driver.",
        attribution: "— Imran Khan, CFO"
      }
    },
    relatedSlugs: [
      "vehicle-digital-twins-architecture",
      "physics-of-tyre-pressure-fuel-savings",
      "why-suraksha-matters-for-owner-drivers"
    ]
  },
  "founding-conviction-2018-to-2026": {
    slug: "founding-conviction-2018-to-2026",
    category: "Founder Notes",
    categorySlug: "founder-notes",
    title: "The Tyre Was the Entry Point: Reflections on Eight Years of Building Treel",
    deck: "Reflecting on the journey from our first valve-stem sensor prototypes in Pune to operating India's largest connected commercial vehicle platform.",
    author: "Manish Ingale",
    authorRole: "Founder, Treel Mobility Solutions",
    authorBio: "Manish Ingale founded Treel in 2018 with the conviction that India's commercial vehicles were producing more data than any company was reading. With deep engineering roots across the tyre and mobility industries, he leads Treel's architecture from Pune.",
    date: "June 2026",
    publishIsoDate: "2026-06-18",
    readTime: "5 min read",
    tldr: "Treel started with a fundamental realization: tyres touch the road, absorb every thermal and kinetic shock, and generate the truest indicator of vehicle physics. Eight years later, that sensor insight has grown into India's premier commercial vehicle intelligence platform.",
    body: {
      sections: [
        {
          heading: "The Highway Epiphany",
          paragraphs: [
            "In 2018, while examining commercial tyre failure rates across Maharashtra and Gujarat, one fact was inescapable: over 80% of catastrophic highway tyre failures showed warning signs hours before failure.",
            "The industry had plenty of GPS units tracking vehicle coordinates, but zero intelligence understanding vehicle physical health at the wheel level."
          ]
        },
        {
          heading: "Building for Indian Realities",
          paragraphs: [
            "We engineered sensors capable of withstanding monsoon water submersion, 60°C asphalt heat, and extreme vibration on unpaved mining haul roads.",
            "Today, with over 68,000 connected commercial vehicles and partnerships across major OEMs, Treel proves that category-defining deep tech can be conceived, engineered, and scaled from Pune for the world."
          ]
        }
      ],
      pullQuote: {
        quote: "We did not set out to build a telematics company. We set out to make commercial vehicles intelligent, self-aware, and safe.",
        attribution: "— Manish Ingale, Founder"
      }
    },
    relatedSlugs: [
      "vehicle-digital-twins-architecture",
      "why-suraksha-matters-for-owner-drivers",
      "cfo-guide-to-fleet-payback"
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return {
      title: "Article Not Found · Treel Insights",
      description: "The requested insight article could not be found.",
    };
  }

  return {
    title: `${article.title}  ·  Treel Insights`,
    description: article.deck,
    alternates: {
      canonical: `https://treel.in/insights/${article.slug}`,
    },
    openGraph: {
      title: `${article.title}  ·  Treel Insights`,
      description: article.deck,
      url: `https://treel.in/insights/${article.slug}`,
      type: "article",
      publishedTime: article.publishIsoDate,
      authors: [article.author],
    },
  };
}

export default async function InsightsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className="min-h-[70vh] bg-[#0F1419] text-[#FAF7F2] font-inter py-24 flex items-center">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#D5573B]">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="font-fraunces text-3xl sm:text-4xl font-medium">That article isn&apos;t available.</h1>
          <p className="text-[#94A3B8] text-base max-w-md mx-auto">
            The article you are looking for might have moved or is being updated. Here&apos;s what&apos;s fresh across our insights repository.
          </p>
          <div className="pt-4">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-md"
            >
              <span>Back to all insights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedArticles = article.relatedSlugs
    .map((s) => ARTICLES[s])
    .filter(Boolean) as InsightArticle[];

  return (
    <article className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Article Header & Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Link href="/insights" className="hover:text-[#FAF7F2] transition-colors">
                Insights
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href={`/insights/category/${article.categorySlug}`} className="text-[#D5573B] hover:underline">
                {article.category}
              </Link>
            </div>

            {/* Category Tag */}
            <div className="inline-block px-2.5 py-0.5 rounded-[4px] bg-[#D5573B]/10 border border-[#D5573B]/20 text-[#D5573B] font-mono text-xs uppercase tracking-widest font-semibold">
              {article.category}
            </div>

            {/* Headline (H1) */}
            <h1 className="font-fraunces text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              {article.title}
            </h1>

            {/* Deck / Subtitle */}
            <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed font-inter">
              {article.deck}
            </p>

            {/* Author & Article Details */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-xs sm:text-sm text-[#94A3B8] font-inter">
                <div>
                  <span className="text-[#FAF7F2] font-semibold">{article.author}</span>
                  <span className="mx-2 text-white/30">·</span>
                  <span className="font-mono text-xs text-[#94A3B8]">{article.authorRole}</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D5573B]" />
                    {article.date}
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D5573B]" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Share Controls */}
              <ArticleShareBar
                title={article.title}
                url={`https://treel.in/insights/${article.slug}`}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="py-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-12">
            {/* Article Visual Hero */} 
            <div className="w-full aspect-[16/9] rounded-lg bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/[0.08] relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-white/5 opacity-40" />
            </div>

            {/* TL;DR Callout Block */}
            <div className="p-6 sm:p-8 rounded-lg bg-[#D5573B]/[0.06] border border-[#D5573B]/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D5573B] font-bold">
                <FileText className="w-4 h-4 text-[#D5573B]" />
                <span>TL;DR</span>
              </div>
              <p className="text-sm sm:text-base text-[#FAF7F2] leading-relaxed font-inter">
                {article.tldr}
              </p>
            </div>

            {/* Article Prose Sections */}
            <div className="space-y-10 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-inter">
              {article.body.sections.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight pt-4">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {/* Inline Pull Quote after Section 1 */}
                  {idx === 0 && article.body.pullQuote && (
                    <div className="my-8 py-6 px-8 border-l-2 border-[#D5573B] bg-white/[0.02] rounded-r-lg space-y-3">
                      <blockquote className="font-fraunces text-xl sm:text-2xl italic font-normal text-[#D5573B] leading-snug">
                        &ldquo;{article.body.pullQuote.quote}&rdquo;
                      </blockquote>
                      <cite className="block text-xs font-mono text-[#94A3B8] not-italic uppercase tracking-wider">
                        {article.body.pullQuote.attribution}
                      </cite>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Author Bio Card */}
            <div className="p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/15 relative overflow-hidden flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                    {article.author}
                  </h3>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#D5573B] font-semibold mt-0.5">
                    {article.authorRole}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-inter">
                  {article.authorBio}
                </p>
              </div>
            </div>

            {/* Newsletter Signup Module */}
            <ArticleNewsletterForm />
          </div>
        </div>
      </div>

      {/* Related Articles Strip */}
      {relatedArticles.length > 0 && (
        <section className="py-20 border-b border-white/10 bg-white/[0.01]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                  Continue reading
                </h2>
                <Link
                  href="/insights"
                  className="text-xs font-mono uppercase tracking-wider text-[#D5573B] hover:text-[#CB4831] transition-colors flex items-center gap-1.5"
                >
                  <span>All insights</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map((rel, idx) => (
                  <Link
                    key={idx}
                    href={`/insights/${rel.slug}`}
                    className="group rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* 16:9 Thumbnail Area */}
                      <div className="w-full aspect-[16/9] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border-b border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 opacity-30 group-hover:opacity-50 transition-opacity" />
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#D5573B] font-semibold">
                          {rel.category}
                        </div>
                        <h3 className="font-fraunces text-base font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h3>
                        <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed font-inter">
                          {rel.deck}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                      <span>{rel.readTime}</span>
                      <span className="text-[#D5573B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
