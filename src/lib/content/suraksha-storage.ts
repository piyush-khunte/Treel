import fs from "fs";
import path from "path";
import { SurakshaArticle } from "@/types/content";
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

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "suraksha-store.json");

export const SEED_SURAKSHA_ARTICLES: SurakshaArticle[] = [
  // Fuel Efficiency
  {
    _id: "sur_1",
    slug: "fuel-10-tips",
    title: "10 Simple Fuel-Saving Tips Every Driver Should Know",
    category: "Fuel efficiency",
    excerpt: "Maintaining proper tyre pressure and smooth throttle control can cut your diesel consumption by 8–12%.",
    author: "Suraksha Fleet Team",
    date: "October 2026",
    readTime: "5 min read",
    status: "Published",
    keyTakeaway: "Keeping cold tyre pressure within 2 PSI of recommendation saves ₹18,000 to ₹25,000 in annual diesel bills on long-haul routes."
  },
  {
    _id: "sur_2",
    slug: "fuel-warning-signs",
    title: "Is Your Truck Consuming Too Much Fuel? 5 Warning Signs",
    category: "Fuel efficiency",
    excerpt: "If your truck pulls to one side or tyre shoulders show rapid wear, under-inflation is wasting fuel.",
    author: "Technical Desk",
    date: "October 2026",
    readTime: "4 min read",
    status: "Published",
    keyTakeaway: "Unbalanced steering pull usually means unequal tyre inflation. Check front axle cold PSI before adjusting mechanical alignment."
  },
  {
    _id: "sur_3",
    slug: "fuel-right-pressure",
    title: "How Proper Tyre Pressure Saves Fuel",
    category: "Fuel efficiency",
    excerpt: "Rolling resistance is directly tied to tyre pressure. Every 10 PSI drop increases diesel consumption by 1.5%.",
    author: "Engineering Team",
    date: "September 2026",
    readTime: "6 min read",
    status: "Published",
    keyTakeaway: "Under-inflation flexes tyre rubber continuously, converting valuable diesel combustion directly into wasted road friction heat."
  },

  // Safety
  {
    _id: "sur_4",
    slug: "safety-monsoon",
    title: "Monsoon Truck Safety — Essential Tips for Highway Drivers",
    category: "Safety",
    excerpt: "Wet road surfaces increase braking distance by up to 40%. Checking tread depth and tyre pressure is critical.",
    author: "Safety Operations",
    date: "September 2026",
    readTime: "6 min read",
    status: "Published",
    keyTakeaway: "Never reduce tyre pressure during monsoon. Harder, properly inflated tread grooves cut through standing water to prevent aquaplaning."
  },
  {
    _id: "sur_5",
    slug: "safety-highway-rules",
    title: "Highway Driving — 7 Essential Safety Rules That Save Lives",
    category: "Safety",
    excerpt: "Proven fatigue-management guidelines, night driving precautions, and roadside emergency protocols for long-haul routes.",
    author: "Driver Welfare Cell",
    date: "September 2026",
    readTime: "5 min read",
    status: "Published",
    keyTakeaway: "Take a 15-minute break every 3 hours on night journeys. Inspect tyre warmth by feeling the valve stems during rest breaks."
  },
  {
    _id: "sur_6",
    slug: "safety-front-blowout",
    title: "How to Prevent Front Tyre Blowouts — A Highway Survival Guide",
    category: "Safety",
    excerpt: "Step-by-step steering control and emergency deceleration techniques if a front tyre loses pressure at highway speed.",
    author: "Accident Prevention Unit",
    date: "August 2026",
    readTime: "6 min read",
    status: "Published",
    isFeatured: true,
    keyTakeaway: "If a front tyre bursts, do NOT slam the brakes. Grip the steering wheel firmly with both hands, maintain slight throttle, and gently coast onto the shoulder."
  },

  // Business & GST
  {
    _id: "sur_7",
    slug: "business-gst-basics",
    title: "GST Basics for Owner-Drivers — 2026 Guide",
    category: "Business & GST",
    excerpt: "Reverse Charge Mechanism (RCM), e-way bill compliance, and GTA rules simplified for single-truck operators.",
    author: "Transport Legal Advisor",
    date: "October 2026",
    readTime: "7 min read",
    status: "Published",
    keyTakeaway: "Single-truck owner operators transporting goods under GTA RCM do not require separate GST registration if bill value is under thresholds."
  },
  {
    _id: "sur_8",
    slug: "business-truck-insurance",
    title: "Commercial Truck Insurance — What Is Covered and What Isn't",
    category: "Business & GST",
    excerpt: "Third-party vs comprehensive insurance, tyre damage riders, and how to file accident claims without delays.",
    author: "Insurance Guidance Desk",
    date: "September 2026",
    readTime: "5 min read",
    status: "Published",
    keyTakeaway: "Standard motor policies exclude tyre rim and blowout damage unless you have an active commercial tyre add-on endorsement."
  },
  {
    _id: "sur_9",
    slug: "business-fastag-toll",
    title: "FASTag and Toll Management — A Complete Guide",
    category: "Business & GST",
    excerpt: "Resolving blacklisted tag disputes, toll charge reconciliation, and monthly pass benefits on commercial freight routes.",
    author: "Highway Logistics Desk",
    date: "August 2026",
    readTime: "4 min read",
    status: "Published",
    keyTakeaway: "Keep your FASTag linked to NPCI bank account with auto-recharge to prevent toll plaza double-cash charge penalties."
  },

  // Route Planning
  {
    _id: "sur_10",
    slug: "route-truck-stops",
    title: "Best Truck Stops Across India — Corridor Guide",
    category: "Route planning",
    excerpt: "Verified secure parking, hygienic dhabas, and clean rest facilities along NH44, NH48, and the Golden Quadrilateral.",
    author: "Corridor Survey Team",
    date: "October 2026",
    readTime: "8 min read",
    status: "Published",
    keyTakeaway: "Choose truck centres equipped with automated nitrogen stations and round-the-clock CCTV parking security."
  },
  {
    _id: "sur_11",
    slug: "route-trip-planning",
    title: "Long-Haul Trip Planning — Driver Fatigue Management",
    category: "Route planning",
    excerpt: "A structured 3-step micro-rest schedule for 12-hour shifts to prevent highway hypnosis and sleep deprivation.",
    author: "Driver Health Cell",
    date: "September 2026",
    readTime: "5 min read",
    status: "Published",
    keyTakeaway: "Plan rest stops between 2 AM and 5 AM when circadian rhythm is lowest to eliminate microsleep risks on expressways."
  },

  // Industry News & Maintenance
  {
    _id: "sur_12",
    slug: "industry-scrappage",
    title: "New Vehicle Scrappage Policy — What It Means for Owner-Drivers",
    category: "Industry news",
    excerpt: "15-year fitness test rules, renewal fees, and how green tax regulations affect commercial fleet economics.",
    author: "Policy Research Group",
    date: "October 2026",
    readTime: "6 min read",
    status: "Published",
    keyTakeaway: "Maintaining valid fitness certificates and emission testing protects owner-drivers from heavy state inter-border checkpoint penalties."
  },
  {
    _id: "sur_13",
    slug: "industry-diesel-trends",
    title: "Diesel Price Trends and Protecting Freight Margins",
    category: "Industry news",
    excerpt: "How to calculate per-kilometre operational costs and protect freight margins during diesel price swings.",
    author: "Freight Economics Team",
    date: "September 2026",
    readTime: "4 min read",
    status: "Published",
    keyTakeaway: "Include a diesel-price escalation clause in quarterly transport contracts to insulate your truck's net monthly profit."
  },
  {
    _id: "sur_14",
    slug: "maint-seasonal-calibration",
    title: "Tyre Pressure in Summer Heat — Highway Maintenance Guide",
    category: "Maintenance",
    excerpt: "How hot tarmac temperatures above 60°C affect tyre pressure, and the golden rules of cold vs hot inflation.",
    author: "Tyre Technical Team",
    date: "August 2026",
    readTime: "5 min read",
    status: "Published",
    keyTakeaway: "Never bleed air from a hot tyre during midday runs. Pressure naturally rises with heat; bleeding air causes severe under-inflation when tyres cool down."
  }
];

function readLocalStore(): SurakshaArticle[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error("readLocalStore suraksha error:", err);
  }
  writeLocalStore(SEED_SURAKSHA_ARTICLES);
  return [...SEED_SURAKSHA_ARTICLES];
}

function writeLocalStore(items: SurakshaArticle[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalStore suraksha error:", err);
  }
}

export async function getAllSurakshaArticles(includeDrafts = true): Promise<SurakshaArticle[]> {
  const localItems = readLocalStore();
  const supabase = getAdminClient();

  try {
    const { data, error } = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_suraksha_blog");

    if (!error && data && data.length > 0) {
      try {
        const parsed = JSON.parse(data[0].testValue);
        if (Array.isArray(parsed) && parsed.length > 0) {
          writeLocalStore(parsed);
          return includeDrafts ? parsed : parsed.filter((item) => item.status === "Published");
        }
      } catch (e) {
        console.error("Failed to parse TreelEcommerce.t_test treel_suraksha_blog payload:", e);
      }
    }
  } catch (err) {
    // Suppress and fallback gracefully
  }

  return includeDrafts ? localItems : localItems.filter((item) => item.status === "Published");
}

export async function getPublishedSurakshaArticles(): Promise<SurakshaArticle[]> {
  return getAllSurakshaArticles(false);
}

export async function getSurakshaArticleById(id: string): Promise<SurakshaArticle | null> {
  const all = await getAllSurakshaArticles(true);
  const found = all.find((item) => item._id === id || item.slug === id);
  return found || null;
}

export async function saveSurakshaArticle(article: Partial<SurakshaArticle>): Promise<SurakshaArticle> {
  const all = await getAllSurakshaArticles(true);
  const now = new Date().toISOString();

  const id = article._id && !article._id.startsWith("new_") ? article._id : `sur_${Date.now()}`;
  const slug = (article.slug || article.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || `suraksha-${Date.now()}`).trim();

  const fullArticle: SurakshaArticle = {
    _id: id,
    slug,
    title: article.title || "Untitled Article",
    category: article.category || "Safety",
    excerpt: article.excerpt || "",
    author: article.author || "Suraksha Fleet Team",
    date: article.date || "October 2026",
    readTime: article.readTime || "5 min read",
    keyTakeaway: article.keyTakeaway || "Suraksha delivers continuous tyre pressure and temperature alerts to protect driver safety.",
    status: article.status === "Draft" ? "Draft" : "Published",
    isFeatured: !!article.isFeatured,
    createdAt: article.createdAt || now,
    updatedAt: now,
  };

  const existingIdx = all.findIndex((a) => a._id === id || a.slug === slug);
  let updatedList: SurakshaArticle[];
  if (existingIdx >= 0) {
    updatedList = [...all];
    updatedList[existingIdx] = { ...all[existingIdx], ...fullArticle };
  } else {
    updatedList = [fullArticle, ...all];
  }

  writeLocalStore(updatedList);

  // Sync to Supabase t_test table
  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert([
      {
        testKey: "treel_suraksha_blog",
        testValue: JSON.stringify(updatedList),
      }
    ], { onConflict: "testKey" });
  } catch (err) {
    console.error("Supabase sync error for Suraksha article:", err);
  }

  return fullArticle;
}

export async function deleteSurakshaArticle(idOrSlug: string): Promise<boolean> {
  const all = await getAllSurakshaArticles(true);
  const filtered = all.filter((a) => a._id !== idOrSlug && a.slug !== idOrSlug);
  if (filtered.length === all.length) return false;

  writeLocalStore(filtered);

  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert([
      {
        testKey: "treel_suraksha_blog",
        testValue: JSON.stringify(filtered),
      }
    ], { onConflict: "testKey" });
  } catch (err) {
    console.error("Supabase sync error deleting Suraksha article:", err);
  }

  return true;
}

