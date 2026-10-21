import fs from "fs";
import path from "path";
import { PressItemRecord } from "@/types/content";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const url = (
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://placeholder-treel.supabase.co"
  ).replace(/^['"]|['"]$/g, "");
  const key = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "placeholder-key"
  ).replace(/^['"]|['"]$/g, "");
  return createClient(url, key, { auth: { persistSession: false } });
}

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "press-store.json");

export const SEED_PRESS_RELEASES: PressItemRecord[] = [
  {
    _id: "press_68000_commercial_vehicles_milestone",
    slug: "68000-commercial-vehicles-milestone",
    year: "2026",
    date: "September 15, 2026",
    category: "Milestone",
    headline: "Treel Surpasses 68,000 Connected Commercial Vehicles, Cementing Position as India's Largest Fleet Telematics Dataset",
    excerpt: "Treel Mobility Solutions announced today that its Vehicle Digital Twin platform has surpassed sixty-eight thousand active commercial vehicles under management. Ingesting over 150 million daily telemetry points across heavy freight corridors, the milestone represents an unprecedented dataset for commercial transport optimization in emerging markets.",
    city: "PUNE",
    leadParagraph: "Treel Mobility Solutions Private Limited announced today that its proprietary Vehicle Digital Twin platform has surpassed sixty-eight thousand active commercial vehicles under management across the Indian subcontinent. Ingesting over 150 million daily telemetry points across heavy freight routes, the milestone cements Treel as the operator of India's largest connected commercial vehicle dataset.",
    quote: {
      text: "Reaching sixty-eight thousand commercial vehicles is not merely a milestone in hardware deployment—it is a transformation in how the logistics industry understands vehicle physics. At this scale, our models predict catastrophic carcass failures 48 hours before pressure loss manifests on highway tarmac.",
      speaker: "Manish Ingale",
      role: "Founder & CEO, Treel Mobility Solutions",
    },
    bodyParagraphs: [
      "Founded in 2018, Treel has focused systematically on solving the single highest operating cost variable in commercial road transport: tyre lifecycle and unscheduled roadside breakdowns. Roadside tyre failures historically account for over 35% of unplanned highway stoppages in heavy multi-axle freight.",
      "By engineering sensors that sample wheel-end thermodynamics, rotational dynamics, and pressure decay at 24 Hz, Treel constructs a continuous five-layer Vehicle Digital Twin for every connected vehicle. The platform translates raw telemetry into predictive maintenance schedules, enabling fleet operators to intervene during depot turnaround rather than losing valuable transit hours to emergency roadside repairs.",
      "Today, Treel serves more than 200 enterprise fleet operators, including major logistics conglomerates, intercity passenger transit corporations, and heavy industrial mining fleets. Across this fleet baseline, operators report an average 3.2% fuel efficiency improvement and a median payback period of under nine months.",
    ],
    relatedSlugs: [
      "project-suraksha-nationwide-launch",
      "jk-tyre-telematics-partnership-expansion",
      "arai-commercial-certification"
    ],
    isFeatured: true,
    publicationStatus: "Published",
    createdAt: "2026-09-15T00:00:00.000Z",
    updatedAt: "2026-09-15T00:00:00.000Z"
  },
  {
    _id: "press_project_suraksha_nationwide_launch",
    slug: "project-suraksha-nationwide-launch",
    year: "2026",
    date: "July 22, 2026",
    category: "Product Launch",
    headline: "Treel Unveils Project Suraksha: ₹17,500 DIY Tyre Safety Kit for India's 8 Million Owner-Drivers",
    excerpt: "Engineered specifically for single-truck operators, Project Suraksha pairs IP69K military-rated sensors with solar cab displays and voice alerts in six regional Indian languages to prevent catastrophic highway blowouts.",
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
    publicationStatus: "Published",
    createdAt: "2026-07-22T00:00:00.000Z",
    updatedAt: "2026-07-22T00:00:00.000Z"
  },
  {
    _id: "press_jk_tyre_telematics_partnership_expansion",
    slug: "jk-tyre-telematics-partnership-expansion",
    year: "2026",
    date: "May 10, 2026",
    category: "Partnership",
    headline: "Treel and JK Tyre Expand Factory-Fit Intelligent Tyre Program Across Three Commercial OEM Platforms",
    excerpt: "Extending factory-installed sensor integration from medium-duty tippers into heavy prime-mover tractors and long-distance intercity buses across India's largest commercial vehicle manufacturers.",
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
    publicationStatus: "Published",
    createdAt: "2026-05-10T00:00:00.000Z",
    updatedAt: "2026-05-10T00:00:00.000Z"
  },
  {
    _id: "press_arai_commercial_certification",
    slug: "arai-commercial-certification",
    year: "2025",
    date: "December 18, 2025",
    category: "Company News",
    headline: "Treel Secures ARAI Commercial Automotive Standard Certification for Next-Gen Sensor Hardware",
    excerpt: "Rigorous laboratory validation confirms complete compliance with automotive electromagnetic compatibility (EMC), thermal shock profiles up to 125°C, and heavy axle mechanical vibration thresholds.",
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
    publicationStatus: "Published",
    createdAt: "2025-12-18T00:00:00.000Z",
    updatedAt: "2025-12-18T00:00:00.000Z"
  },
  {
    _id: "press_pune_rd_centre_expansion",
    slug: "pune-rd-centre-expansion",
    year: "2025",
    date: "October 04, 2025",
    category: "Company News",
    headline: "Treel Inaugurates Advanced Mobility Hardware and RF Testing Lab in Pune",
    excerpt: "The newly expanded Pune facility features dynamic tyre-drum test rigs, environmental submersion tanks, and an RF chamber calibrated for long-range BLE commercial vehicle communications.",
    city: "PUNE",
    leadParagraph: "Treel Mobility Solutions has inaugurated its expanded advanced hardware and wireless telematics research facility in Pune, Maharashtra. The facility expands Treel's testing throughput for heavy-duty commercial axle transducers and in-cab IoT hubs.",
    quote: {
      text: "Simulating 100,000 km of abusive highway wear in laboratory conditions before field deployment is how we ensure five-year sensor longevity in Indian commercial fleets.",
      speaker: "Engineering Leadership",
      role: "Treel Hardware Validation Group",
    },
    bodyParagraphs: [
      "The Pune R&D lab houses automated tyre-drum dynamometers capable of continuous 120 km/h testing under 15-tonne axle loads, dynamic thermal chambers cycling from -20°C to +130°C, and high-frequency RF anechoic chambers.",
      "The investment strengthens Treel's domestic intellectual property foundation, supporting ongoing patent filings across India, the United States, and the European Union.",
    ],
    relatedSlugs: [
      "arai-commercial-certification",
      "68000-commercial-vehicles-milestone"
    ],
    publicationStatus: "Published",
    createdAt: "2025-10-04T00:00:00.000Z",
    updatedAt: "2025-10-04T00:00:00.000Z"
  },
  {
    _id: "press_cfo_payback_benchmark_report",
    slug: "cfo-payback-benchmark-report",
    year: "2024",
    date: "November 14, 2024",
    category: "Milestone",
    headline: "Treel Publishes 2-Year Enterprise Fleet Operational Cost Benchmark Study",
    excerpt: "Analysis of 30,000 commercial vehicles demonstrates a median payback period of under 9 months driven by fuel consumption reductions of 3.2% and tyre carcass life extensions of 18%.",
    city: "MUMBAI",
    leadParagraph: "Treel Mobility Solutions today published its landmark Two-Year Commercial Fleet Financial Benchmark, drawing on longitudinal telemetry from 30,000 heavy commercial vehicles across logistics, cement haulage, and bulk transport.",
    quote: {
      text: "Fleet CFOs often struggle to separate telemetry marketing claims from balance-sheet realities. This study delivers empirical, audited evidence that real-time tyre physics sensing pays for itself in under three quarters.",
      speaker: "Manish Ingale",
      role: "Founder & CEO, Treel Mobility Solutions",
    },
    bodyParagraphs: [
      "The benchmark study demonstrates that commercial fleets maintaining continuous tyre pressure compliance experience a median fuel efficiency improvement of 0.5% to 0.6% and extend radial tyre carcass life by an average of 18%.",
      "Across monitored vehicles, emergency roadside tyre failures dropped by 88%, saving operators an estimated ₹42,000 per vehicle per annum in unscheduled transit downtime and emergency highway tyre changes.",
    ],
    relatedSlugs: [
      "68000-commercial-vehicles-milestone",
      "jk-tyre-telematics-partnership-expansion"
    ],
    publicationStatus: "Published",
    createdAt: "2024-11-14T00:00:00.000Z",
    updatedAt: "2024-11-14T00:00:00.000Z"
  }
];

function readLocalStore(): PressItemRecord[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("readLocalStore error in press-storage:", err);
  }
  // Initialize with seed items if missing or empty
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(SEED_PRESS_RELEASES, null, 2), "utf-8");
  } catch (initErr) {
    console.error("Failed to initialize press-store.json:", initErr);
  }
  return SEED_PRESS_RELEASES;
}

function writeLocalStore(items: PressItemRecord[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalStore error in press-storage:", err);
  }
}

function normalizePress(item: any): PressItemRecord {
  const headline = (item.headline || item.title || "").trim();
  const dateStr = item.date || item.publishedDate || item.published_date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  let yearStr = item.year || "";
  if (!yearStr) {
    const match = dateStr.match(/\b(20\d\d)\b/);
    yearStr = match ? match[1] : new Date().getFullYear().toString();
  }

  return {
    _id: item._id || item.id || `press_${Date.now()}`,
    slug: item.slug || headline.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/--+/g, "-"),
    year: yearStr,
    date: dateStr,
    category: item.category || "Company News",
    headline,
    excerpt: (item.excerpt || item.description || "").trim(),
    city: item.city || "PUNE",
    leadParagraph: item.leadParagraph || item.excerpt || "",
    quote: item.quote ? {
      text: item.quote.text || "",
      speaker: item.quote.speaker || "",
      role: item.quote.role || "",
    } : undefined,
    bodyParagraphs: Array.isArray(item.bodyParagraphs) ? item.bodyParagraphs : (item.content ? [item.content] : []),
    relatedSlugs: Array.isArray(item.relatedSlugs) ? item.relatedSlugs : [],
    externalUrl: item.externalUrl || item.external_url || undefined,
    source: item.source || undefined,
    thumbnailUrl: item.thumbnailUrl || item.image || undefined,
    isFeatured: Boolean(item.isFeatured || item.featured),
    publicationStatus: item.publicationStatus === "Draft" || item.status === "Draft" ? "Draft" : "Published",
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
  };
}

/**
 * Retrieves all press items from local storage and Supabase backup.
 */
export async function getAllPressItems(includeDrafts = true): Promise<PressItemRecord[]> {
  const localItems = readLocalStore();

  try {
    const supabase = getAdminClient();
    const res = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_press");

    if (!res.error && res.data && res.data.length > 0) {
      const synced: PressItemRecord[] = [];
      for (const row of res.data) {
        try {
          if (row.item) {
            synced.push(normalizePress(JSON.parse(row.item)));
          }
        } catch {}
      }
      if (synced.length > 0) {
        const map = new Map<string, PressItemRecord>();
        localItems.forEach((it) => map.set(it._id, it));
        synced.forEach((it) => map.set(it._id, it));
        const merged = Array.from(map.values());
        writeLocalStore(merged);
        return includeDrafts ? merged : merged.filter((p) => p.publicationStatus === "Published");
      }
    }
  } catch (err) {
    console.error("getAllPressItems database error:", err);
  }

  return includeDrafts ? localItems : localItems.filter((p) => p.publicationStatus === "Published");
}

/**
 * Retrieves published press items for public viewing.
 */
export async function getPublishedPressItems(): Promise<PressItemRecord[]> {
  return await getAllPressItems(false);
}

/**
 * Retrieves a single press item by slug and optional year.
 */
export async function getPressItemBySlug(slug: string, year?: string): Promise<PressItemRecord | null> {
  const cleanSlug = (slug || "").trim().toLowerCase();
  const all = await getAllPressItems(true);
  const found = all.find((p) => {
    const matchesSlug = p.slug.toLowerCase() === cleanSlug;
    if (!matchesSlug) return false;
    if (year) {
      return p.year === year;
    }
    return true;
  });
  return found || null;
}

/**
 * Creates or updates a press release item.
 */
export async function savePressItem(data: Partial<PressItemRecord>): Promise<{
  success: boolean;
  data?: PressItemRecord;
  error?: string;
}> {
  const headline = (data.headline || "").trim();
  if (!headline) {
    return { success: false, error: "Headline is required." };
  }

  let slug = (data.slug || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/--+/g, "-");
  if (!slug) {
    slug = headline.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/--+/g, "-");
  }

  const all = await getAllPressItems(true);
  const now = new Date().toISOString();
  const id = data._id || `press_${slug}_${Date.now()}`;

  // Check slug uniqueness
  const conflict = all.find((p) => p.slug === slug && p._id !== id);
  if (conflict) {
    return { success: false, error: `A press release with slug "${slug}" already exists.` };
  }

  const existing = all.find((p) => p._id === id);
  const normalized = normalizePress({
    ...existing,
    ...data,
    _id: id,
    headline,
    slug,
    updatedAt: now,
    createdAt: existing?.createdAt || now,
  });

  // 1. Local Store Update
  const localList = readLocalStore();
  const idx = localList.findIndex((p) => p._id === id);
  if (idx >= 0) {
    localList[idx] = normalized;
  } else {
    localList.unshift(normalized);
  }
  writeLocalStore(localList);

  // 2. Supabase Sync
  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert({
      _id: normalized._id,
      testKey: "treel_press",
      item: JSON.stringify(normalized),
      qty: normalized.publicationStatus,
    });
  } catch (err) {
    console.warn("savePressItem Supabase sync warning:", err);
  }

  return { success: true, data: normalized };
}

/**
 * Deletes a press release item by ID.
 */
export async function deletePressItem(id: string): Promise<{ success: boolean; error?: string }> {
  const cleanId = (id || "").trim();
  if (!cleanId) return { success: false, error: "Press item ID required." };

  const all = readLocalStore();
  const target = all.find((p) => p._id === cleanId || p.slug === cleanId);
  if (!target) {
    return { success: false, error: "Press release not found." };
  }

  const filtered = all.filter((p) => p._id !== target._id);
  writeLocalStore(filtered);

  // Supabase delete
  try {
    const supabase = getAdminClient();
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("testKey", "treel_press")
      .eq("_id", target._id);
  } catch (err) {
    console.warn("deletePressItem Supabase warning:", err);
  }

  return { success: true };
}

/**
 * Toggles a press item publication status between Published and Draft.
 */
export async function togglePressPublish(id: string): Promise<{
  success: boolean;
  data?: PressItemRecord;
  error?: string;
}> {
  const all = await getAllPressItems(true);
  const target = all.find((p) => p._id === id || p.slug === id);
  if (!target) return { success: false, error: "Press release not found." };

  const newStatus = target.publicationStatus === "Published" ? "Draft" : "Published";
  return await savePressItem({ ...target, publicationStatus: newStatus });
}

