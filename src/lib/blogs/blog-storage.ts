import { MongoBlog } from "@/types/admin";
import { createClient } from "@supabase/supabase-js";
import { getValidImageSrc } from "@/lib/utils/image-utils";

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

export const INITIAL_SEED_BLOGS: MongoBlog[] = [
  {
    _id: "blog_seed_1",
    title: "Why Your Car's Factory TPMS Isn't Enough for Indian Roads",
    subtitle: "Understanding direct vs indirect TPMS safety thresholds",
    slug: "why-factory-tpms-isnt-enough",
    category: "Road Safety",
    readTime: "4 min read",
    date: "2026-09-12T10:00:00.000Z",
    author: "Treel Automotive Team",
    status: "Published",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    description: "Most OEM indirect TPMS systems only illuminate an alert icon after pressure drops 25% below placard. Discover why continuous real-time telemetry changes roadside safety.",
    blogContent: `<p>Most modern passenger cars sold in India come equipped with what manufacturers call 'indirect TPMS'. Unlike dedicated wireless sensor systems, indirect TPMS does not actually measure tyre air pressure. Instead, it estimates rotational speed differences through the ABS wheel speed sensors.</p>
<p>By the time an indirect system illuminates a warning on your dashboard, your tyre has often lost between 20% and 30% of its recommended pressure. At highway speeds—such as 100 to 120 km/h on the Mumbai-Pune Expressway or Samruddhi Mahamarg—driving on a tyre with 22 PSI instead of 32 PSI leads to severe sidewall overheating and dangerous blowout risks.</p>
<p>Treel Personal TPMS utilizes direct BLE 5.0 valve sensors with sub-second accuracy. Every 3 seconds, actual numeric pressure (accurate to ±0.5 PSI) and temperature (accurate to ±1°C) are beamed directly to your smartphone and smartwatch, giving you true early warnings before heat builds up.</p>`,
    metatitle: "Why Your Car's Factory TPMS Isn't Enough · Treel Blog",
    metadescription: "Discover why indirect factory TPMS systems fail to protect against rapid pressure loss and how direct BLE telemetry prevents roadside blowouts."
  },
  {
    _id: "blog_seed_2",
    title: "How to Check Tyre Pressure the Right Way (With or Without TPMS)",
    subtitle: "Cold vs hot calibration, ambient weather variances, and pump gauge errors",
    slug: "how-to-check-tyre-pressure-correctly",
    category: "How-To Guides",
    readTime: "5 min read",
    date: "2026-09-08T10:00:00.000Z",
    author: "Karan Verma",
    status: "Published",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80",
    description: "Cold vs hot pressure calibration, seasonal variations in Indian weather, and avoiding common gas station digital meter misreadings.",
    blogContent: `<p>A common mistake made by Indian drivers is checking tyre pressure after driving several kilometres to a fuel station. Friction against the tarmac and internal air compression raise tyre temperature, which artificially inflates pressure by 3 to 6 PSI.</p>
<p>If you fill air into a warm tyre up to your vehicle's placard rating (e.g. 32 PSI), once the tyre cools down overnight, the true pressure will drop to 27 PSI, leaving your vehicle severely underinflated for the next morning's drive.</p>
<p>Always measure pressure when tyres are cold (having rested for at least 3 hours or driven less than 1.5 km at low speed). With Treel TPMS, you can simply open your mobile app before starting the engine and view cold PSI across all 4 tyres from the comfort of your living room.</p>`,
    metatitle: "How to Check Tyre Pressure Correctly · Treel Automotive",
    metadescription: "Expert guide on checking cold tyre inflation pressures and avoiding gas station gauge misreadings."
  },
  {
    _id: "blog_seed_3",
    title: "Monsoon Tyre Care: What to Watch for and When",
    subtitle: "Hydroplaning risks, wet grip dynamics, and compound maintenance",
    slug: "monsoon-tyre-care-guide",
    category: "Tyre Care",
    readTime: "6 min read",
    date: "2026-09-01T10:00:00.000Z",
    author: "Aditi Rao",
    status: "Published",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    description: "Waterlogging, aquaplaning risks, and why proper tread depth combined with accurate PSI prevents dangerous highway skids during Indian monsoons.",
    blogContent: `<p>Monsoons in India transform highways into unpredictable water channels. Aquaplaning occurs when water builds up between your tyre and the road surface faster than the tread grooves can evacuate it, causing the car to hydroplane uncontrollably.</p>
<p>While tread depth is critical, tyre pressure is equally decisive. An underinflated tyre has a collapsed center contact patch, reducing water evacuation channels and causing hydroplaning at speeds as low as 60 km/h.</p>
<p>Maintaining the exact manufacturer-recommended PSI ensures that the tyre tread grooves remain wide open and rigid, channeling liters of standing water away from the contact patch every second.</p>`,
    metatitle: "Monsoon Tyre Care & Aquaplaning Safety · Treel",
    metadescription: "Learn how optimal tyre inflation prevents aquaplaning and skidding during heavy Indian monsoon downpours."
  },
  {
    _id: "blog_seed_4",
    title: "The Real Cost of Driving on Underinflated Tyres in India",
    subtitle: "Annual fuel waste, premature shoulder scrubbing, and carcass replacement math",
    slug: "cost-of-driving-underinflated-tyres",
    category: "Tyre Care",
    readTime: "3 min read",
    date: "2026-08-24T10:00:00.000Z",
    author: "Treel Engineering",
    status: "Published",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    description: "How a 4 PSI pressure drop costs an Indian car owner up to ₹14,000 in premature tread wear and wasted fuel efficiency every single year.",
    blogContent: `<p>Every 3 PSI drop below recommended pressure increases rolling resistance by approximately 6%, which directly translates to a 0.5–0.6% penalty on fuel economy.</p>
<p>For a typical Indian commuter driving 15,000 km annually with fuel costs of ₹1,00,000, under-inflation quietly wastes hard-earned money in excess petrol or diesel.</p>
<p>Even more substantial is tyre lifespan reduction: shoulder wear accelerates drastically on underinflated tyres, reducing tyre life from 50,000 km to under 35,000 km. Replacing a set of four premium passenger tyres prematurely adds ₹20,000 to ₹40,000 in unexpected ownership expenses.</p>`,
    metatitle: "The Cost of Underinflated Tyres in India · Treel",
    metadescription: "Calculate the exact financial impact of under-inflation on fuel bills and tyre carcass longevity."
  },
  {
    _id: "blog_seed_5",
    title: "Highway Tyre Safety: Temperature, Pressure, and Blowout Science",
    subtitle: "Thermal hysteresis on cement expressways and blowout prevention",
    slug: "highway-tyre-safety-thermal-science",
    category: "Road Safety",
    readTime: "5 min read",
    date: "2026-08-18T10:00:00.000Z",
    author: "Dr. Sandeep Nair",
    status: "Published",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    description: "Understanding heat buildup inside radial tyres at triple-digit speeds on concrete expressways like Samruddhi Mahamarg and Delhi-Mumbai Expressway.",
    blogContent: `<p>Modern high-speed concrete expressways in India generate intense frictional heat during summer and peak daytime hours. When an underinflated tyre flexes repeatedly at 120 km/h, the rubber compound and steel belts experience continuous mechanical hysteresis.</p>
<p>Internal air temperatures can easily climb above 85°C. At this temperature, the bonding vulcanization between the rubber tread and internal steel belts weakens rapidly, dramatically escalating the probability of sudden tread de-lamination.</p>
<p>Treel TPMS provides continuous internal chamber temperature monitoring. If tyre temperature exceeds safe operating thresholds (typically >75°C), the driver receives immediate audio and visual warnings to reduce speed and take a rest stop before a blowout occurs.</p>`,
    metatitle: "Highway Tyre Safety & Thermal Science · Treel",
    metadescription: "Why high-speed concrete highways cause tyre bursts and how real-time temperature telemetry keeps you safe."
  },
  {
    _id: "blog_seed_6",
    title: "Treel Care Mobile App v2.4: Apple Watch & Widget Upgrades",
    subtitle: "Instant wrist complications, home screen widgets, and CSV exports",
    slug: "app-update-apple-watch-widgets",
    category: "Product Updates",
    readTime: "2 min read",
    date: "2026-08-10T10:00:00.000Z",
    author: "Treel Mobile Team",
    status: "Published",
    image: "https://images.unsplash.com/photo-1510519138195-068d82f53489?auto=format&fit=crop&w=1200&q=80",
    description: "Discover the new haptic feedback complications on Apple Watch, dark mode refinements, and one-tap CSV drive telemetry export.",
    blogContent: `<p>We are excited to announce Treel Care App v2.4, now live on both the Apple App Store and Google Play Store. This update brings full Apple Watch complication support, allowing drivers to check all 4 tyre pressures with a single glance at their wrist.</p>
<p>The new iOS Home Screen and Lock Screen widgets provide instantaneous tyre status before you even step into your car. If any tyre is below 28 PSI, the widget icon alerts you with the exact deficit indicated.</p>
<p>For motorsport enthusiasts and long-distance road trippers, v2.4 introduces high-frequency telemetry CSV export, logging speed, ambient heat, and tyre pressure variations across your journey.</p>`,
    metatitle: "Treel Care App v2.4 Update Notes · Apple Watch & Widgets",
    metadescription: "Explore Apple Watch complications and widget integrations in the latest Treel Care update."
  }
];

export function toSupabaseBlogPayload(blog: Partial<MongoBlog>) {
  const metadata = {
    status: blog.status === "Draft" ? "Draft" : "Published",
    author: blog.author || "Treel Automotive Team",
    category: blog.category || "General",
    readTime: blog.readTime || "5 min read",
    tags: blog.tags || [],
    sections: blog.sections || []
  };

  const id = blog._id && !blog._id.startsWith("new_") ? blog._id : `blog_${Date.now()}`;
  const titleStr = typeof blog.title === "string" ? blog.title : (Array.isArray(blog.title) ? (blog.title as any)[0] : "Untitled Post");

  const effectiveContent = blog.blogContent || (
    (blog.sections && blog.sections.length > 0)
      ? blog.sections.map(s => `<h2>${s.heading}</h2>${(s.content || "").split("\n\n").filter(Boolean).map(p => `<p>${p}</p>`).join("")}`).join("")
      : ""
  );

  return {
    _id: id,
    title: [titleStr],
    subtitle: blog.subtitle || null,
    slug: (blog.slug || titleStr.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")).trim(),
    description: blog.description || "",
    blogContent: effectiveContent,
    image: getValidImageSrc(blog.image) || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    metatitle: blog.metatitle || titleStr,
    metadescription: blog.metadescription || blog.description || titleStr,
    date: blog.date || new Date().toISOString(),
    __v: JSON.stringify(metadata)
  };
}

export function fromSupabaseBlogRow(row: any): MongoBlog {
  let metadata: any = {};
  if (row.__v && typeof row.__v === "string" && row.__v.trim().startsWith("{")) {
    try {
      metadata = JSON.parse(row.__v);
    } catch {}
  }

  const title = Array.isArray(row.title)
    ? row.title[0] || "Untitled Post"
    : (typeof row.title === "string" ? row.title : "Untitled Post");

  return {
    _id: row._id,
    title,
    subtitle: row.subtitle || "",
    slug: row.slug,
    description: row.description || "",
    blogContent: row.blogContent || "",
    sections: metadata.sections && Array.isArray(metadata.sections) && metadata.sections.length > 0 ? metadata.sections : undefined,
    image: getValidImageSrc(row.image) || "",
    metatitle: row.metatitle || "",
    metadescription: row.metadescription || "",
    date: row.date || "",
    author: metadata.author || "Treel Team",
    category: metadata.category || "General",
    status: metadata.status === "Draft" ? "Draft" : "Published",
    readTime: metadata.readTime || "5 min read",
    tags: metadata.tags || [],
    __v: row.__v
  };
}

/**
 * Fetches all blogs for admin management. Automatically seeds default blogs if empty.
 */
export async function getAllBlogsFromDb(): Promise<MongoBlog[]> {
  const supabase = getAdminClient();
  try {
    const { data, error } = await supabase
      .from("TreelEcommerce.blogs")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map(fromSupabaseBlogRow);
    }

    // If table is empty, auto-seed the default articles
    if (!error && (!data || data.length === 0)) {
      console.log("Seeding default blogs into TreelEcommerce.blogs...");
      for (const seed of INITIAL_SEED_BLOGS) {
        try {
          await supabase.from("TreelEcommerce.blogs").insert([toSupabaseBlogPayload(seed)]);
        } catch (sErr) {
          console.error("Seed insert error:", sErr);
        }
      }
      return [...INITIAL_SEED_BLOGS];
    }
  } catch (err) {
    console.error("getAllBlogsFromDb error:", err);
  }

  return [...INITIAL_SEED_BLOGS];
}

/**
 * Fetches published blogs only for public visitors.
 */
export async function getPublishedBlogsFromDb(): Promise<MongoBlog[]> {
  const all = await getAllBlogsFromDb();
  return all.filter((b) => b.status === "Published");
}

/**
 * Fetches a single blog by its URL slug.
 */
export async function getBlogBySlugFromDb(slug: string): Promise<MongoBlog | null> {
  const all = await getAllBlogsFromDb();
  const found = all.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
  return found || null;
}

