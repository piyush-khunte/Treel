import fs from "fs";
import path from "path";
import { TreelInsightArticle } from "@/types/content";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-treel.supabase.co";
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "placeholder-key";
  return createClient(url, key, { auth: { persistSession: false } });
}

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "insights-store.json");

export const SEED_INSIGHTS: TreelInsightArticle[] = [
  {
    _id: "insight_1",
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
    status: "Published",
    tldr: "A Vehicle Digital Twin is not a static 3D model or simple telemetry dashboard; it is a live, queryable software object that continuously models the physical state, historical stresses, and remaining component life of a commercial vehicle. By transforming raw sensor telemetry into structured domain models, fleet operators shift from reactive roadside repairs to deterministic, scheduled interventions.",
    body: {
      sections: [
        {
          heading: "The Limits of Raw Telemetry",
          paragraphs: [
            "For the past decade, commercial fleet telematics has operated under a single premise: ingest as many raw GPS coordinates and CAN bus metrics as possible and display them on a map. But for an enterprise running 500 multi-axle trailers across national freight corridors, a stream of isolated temperature and pressure numbers is not actionable intelligence—it is noise.",
            "When a tyre heats up on Highway 48 during peak summer haulage, the critical operational question is not simply 'what is the current temperature?' The question is: 'Given this tyre's pressure decay history, current axle load, ambient road heat, and remaining tread depth, what is the probability of structural carcass failure before the vehicle reaches its destination depot?'"
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
            "Fuel efficiency gains between 0.5% and 0.6% are realized purely by maintaining optimal rolling resistance, while tyre carcass life is extended by 15% to 20%. By turning the physical state of every wheel into a deterministic digital asset, mobility intelligence delivers hard, measurable capital return."
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
  {
    _id: "insight_2",
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
    status: "Published",
    tldr: "Under-inflation creates excessive tyre contact patch deflection, exponentially increasing hysteretic energy loss and rolling resistance. Correcting inflation in real-time yields immediate diesel savings between 0.5% and 0.6% across long-haul freight operations.",
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
            "Analyzing 100,000 km of telematics data across 16-wheel tippers and highway trailers showed that active pressure regulation consistently saved 0.5–0.6% on bulk fuel expenditures.",
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
  {
    _id: "insight_3",
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
    status: "Published",
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
  {
    _id: "insight_4",
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
    status: "Published",
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
  {
    _id: "insight_5",
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
    status: "Published",
    tldr: "Hardware investments in commercial vehicle intelligence amortize rapidly. Direct fuel savings (0.5% avg) and tyre casing preservation (18% avg) generate full capital payback in under 9 months for heavy commercial vehicles.",
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
            "Across multi-axle tippers and line-haul prime movers, the combined financial impact of 0.5% fuel optimization and 18% tyre life extension delivers a return on hardware investment in 8.4 to 9.2 months.",
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
      "founding-conviction-2018-to-2026"
    ]
  },
  {
    _id: "insight_6",
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
    status: "Published",
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
];

function readLocalStore(): TreelInsightArticle[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error("readLocalStore insights error:", err);
  }
  // If no store exists, seed it
  writeLocalStore(SEED_INSIGHTS);
  return [...SEED_INSIGHTS];
}

function writeLocalStore(items: TreelInsightArticle[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalStore insights error:", err);
  }
}

export async function getAllInsights(includeDrafts = true): Promise<TreelInsightArticle[]> {
  const localItems = readLocalStore();
  const supabase = getAdminClient();

  try {
    const { data, error } = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_insight");

    if (!error && data && data.length > 0) {
      try {
        const parsed = JSON.parse(data[0].testValue);
        if (Array.isArray(parsed) && parsed.length > 0) {
          writeLocalStore(parsed);
          return includeDrafts ? parsed : parsed.filter((item) => item.status === "Published");
        }
      } catch (e) {
        console.error("Failed to parse TreelEcommerce.t_test treel_insight payload:", e);
      }
    }
  } catch (err) {
    // Suppress and fallback gracefully
  }

  return includeDrafts ? localItems : localItems.filter((item) => item.status === "Published");
}

export async function getPublishedInsights(): Promise<TreelInsightArticle[]> {
  return getAllInsights(false);
}

export async function getInsightBySlug(slug: string): Promise<TreelInsightArticle | null> {
  const all = await getAllInsights(true);
  const found = all.find((item) => item.slug.toLowerCase() === slug.toLowerCase());
  return found || null;
}

export async function saveInsight(insight: Partial<TreelInsightArticle>): Promise<TreelInsightArticle> {
  const all = await getAllInsights(true);
  const now = new Date().toISOString();
  
  const id = insight._id && !insight._id.startsWith("new_") ? insight._id : `insight_${Date.now()}`;
  const slug = (insight.slug || insight.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || `insight-${Date.now()}`).trim();

  const fullInsight: TreelInsightArticle = {
    _id: id,
    slug,
    category: insight.category || "Mobility Intelligence",
    categorySlug: insight.categorySlug || slug,
    title: insight.title || "Untitled Insight",
    deck: insight.deck || "",
    author: insight.author || "Treel Team",
    authorRole: insight.authorRole || "Treel Mobility Solutions",
    authorBio: insight.authorBio || "",
    date: insight.date || "October 2026",
    publishIsoDate: insight.publishIsoDate || now.split("T")[0],
    readTime: insight.readTime || "5 min read",
    status: insight.status === "Draft" ? "Draft" : "Published",
    tldr: insight.tldr || "",
    body: insight.body || {
      sections: [{ heading: "Overview", paragraphs: [insight.deck || ""] }],
    },
    relatedSlugs: insight.relatedSlugs || [],
    createdAt: insight.createdAt || now,
    updatedAt: now,
  };

  const existingIdx = all.findIndex((i) => i._id === id || i.slug.toLowerCase() === slug.toLowerCase());
  let updatedList: TreelInsightArticle[];
  if (existingIdx >= 0) {
    updatedList = [...all];
    updatedList[existingIdx] = { ...all[existingIdx], ...fullInsight };
  } else {
    updatedList = [fullInsight, ...all];
  }

  writeLocalStore(updatedList);

  // Sync to Supabase t_test table
  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert([
      {
        testKey: "treel_insight",
        testValue: JSON.stringify(updatedList),
      }
    ], { onConflict: "testKey" });
  } catch (err) {
    console.error("Supabase sync error for insight:", err);
  }

  return fullInsight;
}

export async function deleteInsight(idOrSlug: string): Promise<boolean> {
  const all = await getAllInsights(true);
  const filtered = all.filter((i) => i._id !== idOrSlug && i.slug.toLowerCase() !== idOrSlug.toLowerCase());
  if (filtered.length === all.length) return false;

  writeLocalStore(filtered);

  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert([
      {
        testKey: "treel_insight",
        testValue: JSON.stringify(filtered),
      }
    ], { onConflict: "testKey" });
  } catch (err) {
    console.error("Supabase sync error deleting insight:", err);
  }

  return true;
}

