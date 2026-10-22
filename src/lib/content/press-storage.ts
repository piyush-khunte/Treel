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

