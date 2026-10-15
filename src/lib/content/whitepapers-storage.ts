import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { WhitepaperRecord } from "@/types/content";

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "whitepapers-store.json");

function getSupabaseClient() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/^['"]|['"]$/g, "");
  const key = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ""
  ).replace(/^['"]|['"]$/g, "");

  if (!url || !key || url.includes("placeholder-treel") || key.includes("placeholder-key")) {
    return null;
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

function formatBytes(bytes: number, decimals = 1): string {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// ---------------------------------------------------------------------------
// Local JSON store fallback
// ---------------------------------------------------------------------------
function readLocalStore(): WhitepaperRecord[] {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading whitepapers-store.json:", err);
    return [];
  }
}

function writeLocalStore(items: WhitepaperRecord[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing whitepapers-store.json:", err);
  }
}

// ---------------------------------------------------------------------------
// Supabase Sync helpers
// ---------------------------------------------------------------------------
async function syncToSupabase(whitepaper: WhitepaperRecord): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    const payload = {
      _id: whitepaper._id,
      testKey: "treel_whitepaper",
      item: JSON.stringify(whitepaper),
      qty: 1,
    };
    await supabase
      .from("TreelEcommerce.t_test")
      .upsert([payload], { onConflict: "_id" });
  } catch (err) {
    console.warn("Supabase TreelEcommerce.t_test sync warning for whitepaper:", err);
  }
}

async function deleteFromSupabase(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("_id", id)
      .eq("testKey", "treel_whitepaper");
  } catch (err) {
    console.warn("Supabase TreelEcommerce.t_test delete warning for whitepaper:", err);
  }
}

// ---------------------------------------------------------------------------
// Authoritative Fetching & Merging
// ---------------------------------------------------------------------------
export async function getAllWhitepapers(): Promise<WhitepaperRecord[]> {
  const localItems = readLocalStore();
  const supabase = getSupabaseClient();

  if (!supabase) {
    return localItems;
  }

  try {
    const { data, error } = await supabase
      .from("TreelEcommerce.t_test")
      .select("_id, item")
      .eq("testKey", "treel_whitepaper");

    if (!error && data && data.length > 0) {
      const remoteItems: WhitepaperRecord[] = [];
      for (const row of data) {
        try {
          if (row.item) {
            const parsed = typeof row.item === "string" ? JSON.parse(row.item) : row.item;
            if (parsed && parsed._id) {
              remoteItems.push(parsed);
            }
          }
        } catch {}
      }

      // Merge: remote items take precedence, local items filled in
      const mergedMap = new Map<string, WhitepaperRecord>();
      for (const item of localItems) {
        mergedMap.set(item._id, item);
      }
      for (const item of remoteItems) {
        mergedMap.set(item._id, item);
      }

      const merged = Array.from(mergedMap.values());
      // Keep local in sync
      writeLocalStore(merged);
      return merged;
    }
  } catch (err) {
    console.warn("Supabase query error in getAllWhitepapers, using local fallback:", err);
  }

  return localItems;
}

export async function getPublishedWhitepapers(
  route?: "tmip" | "research"
): Promise<WhitepaperRecord[]> {
  const all = await getAllWhitepapers();
  const published = all.filter((w) => w.publicationStatus === "Published");
  if (route === "tmip") {
    return published.filter((w) => w.displayOnTmip !== false);
  }
  if (route === "research") {
    return published.filter((w) => w.displayOnResearch !== false);
  }
  return published;
}

export async function getWhitepaperBySlug(slug: string, allowDraft = false): Promise<WhitepaperRecord | null> {
  const all = await getAllWhitepapers();
  const clean = slug.trim().toLowerCase();
  const found = all.find(
    (w) =>
      w.slug.toLowerCase() === clean ||
      w._id.toLowerCase() === clean ||
      (clean === "case-study-1000-truck" && w.slug === "1000-truck-case-study") ||
      (clean === "vehicle-digital-twin" && w.slug === "vehicle-digital-twins-architecture") ||
      (clean === "data-architecture" && w.slug === "time-series-infrastructure-heavy-haul")
  );
  if (!found) return null;
  if (!allowDraft && found.publicationStatus !== "Published") return null;
  return found;
}

export async function getWhitepaperById(id: string): Promise<WhitepaperRecord | null> {
  const all = await getAllWhitepapers();
  return all.find((w) => w._id === id) || null;
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------
export async function saveWhitepaper(
  data: Partial<WhitepaperRecord>
): Promise<{ success: boolean; data?: WhitepaperRecord; error?: string }> {
  try {
    const currentList = await getAllWhitepapers();
    const now = new Date().toISOString();

    const title = (data.title || "").trim();
    if (!title) {
      return { success: false, error: "Whitepaper title is required." };
    }

    const id = data._id && !data._id.startsWith("new_") ? data._id : `wp_${Date.now()}`;
    const slug = (
      data.slug ||
      title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    ).trim();

    const existingIdx = currentList.findIndex((w) => w._id === id || w.slug === slug);
    const existing = existingIdx >= 0 ? currentList[existingIdx] : null;

    const fileSize = typeof data.fileSize === "number" ? data.fileSize : existing?.fileSize || 0;

    const displayOnTmip = data.displayOnTmip !== undefined ? data.displayOnTmip : (existing?.displayOnTmip !== undefined ? existing.displayOnTmip : true);
    const displayOnResearch = data.displayOnResearch !== undefined ? data.displayOnResearch : (existing?.displayOnResearch !== undefined ? existing.displayOnResearch : true);

    const category = data.category || existing?.category || (displayOnTmip && displayOnResearch ? "both" : displayOnResearch ? "treel_main" : "tmip");

    const record: WhitepaperRecord = {
      _id: id,
      slug,
      title,
      excerpt: (data.excerpt || existing?.excerpt || "").trim(),
      description: (data.description !== undefined ? data.description : existing?.description || "").trim(),
      topic: data.topic || existing?.topic || "ROI & Payback",
      industry: data.industry || existing?.industry || "All",
      author: data.author || existing?.author || "Treel Mobility Fleet Analytics Group",
      length: data.length || existing?.length || "24 pages",
      publishDate: data.publishDate || existing?.publishDate || "October 2026",
      fileUrl: data.fileUrl || existing?.fileUrl || "",
      fileFormat: (data.fileFormat || existing?.fileFormat || "PDF") as any,
      fileSize,
      fileSizeFormatted: data.fileSizeFormatted || formatBytes(fileSize),
      originalFilename: data.originalFilename || existing?.originalFilename || `${slug}.pdf`,
      coverImage: data.coverImage || existing?.coverImage || "",
      isFeatured: data.isFeatured !== undefined ? data.isFeatured : existing?.isFeatured || false,
      publicationStatus: data.publicationStatus || existing?.publicationStatus || "Published",
      gated: data.gated !== undefined ? data.gated : (existing?.gated !== undefined ? existing.gated : true),
      directUrl: data.directUrl || existing?.directUrl,
      seoTitle: data.seoTitle || existing?.seoTitle,
      seoDescription: data.seoDescription || existing?.seoDescription,
      downloadCount: existing?.downloadCount || 0,
      displayOnTmip,
      displayOnResearch,
      category,
      chapters: data.chapters !== undefined ? data.chapters : (existing?.chapters || []),
      year: data.year || existing?.year || "2026",
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    if (existingIdx >= 0) {
      currentList[existingIdx] = record;
    } else {
      currentList.unshift(record);
    }

    // 1. Write local disk store
    writeLocalStore(currentList);

    // 2. Synchronize to Supabase
    await syncToSupabase(record);

    return { success: true, data: record };
  } catch (err: any) {
    console.error("saveWhitepaper error:", err);
    return { success: false, error: err.message || "Failed to save whitepaper." };
  }
}

export async function deleteWhitepaper(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const currentList = await getAllWhitepapers();
    const existing = currentList.find((w) => w._id === id);
    if (!existing) {
      return { success: false, error: "Whitepaper not found." };
    }

    const filtered = currentList.filter((w) => w._id !== id);
    writeLocalStore(filtered);

    // Remove from Supabase
    await deleteFromSupabase(id);

    return { success: true };
  } catch (err: any) {
    console.error("deleteWhitepaper error:", err);
    return { success: false, error: err.message || "Failed to delete whitepaper." };
  }
}

export async function toggleWhitepaperPublish(
  id: string
): Promise<{ success: boolean; data?: WhitepaperRecord; error?: string }> {
  try {
    const currentList = await getAllWhitepapers();
    const idx = currentList.findIndex((w) => w._id === id);
    if (idx < 0) {
      return { success: false, error: "Whitepaper not found." };
    }

    const current = currentList[idx];
    const newStatus = current.publicationStatus === "Published" ? "Draft" : "Published";
    const updated: WhitepaperRecord = {
      ...current,
      publicationStatus: newStatus,
      updatedAt: new Date().toISOString(),
    };

    currentList[idx] = updated;
    writeLocalStore(currentList);
    await syncToSupabase(updated);

    return { success: true, data: updated };
  } catch (err: any) {
    console.error("toggleWhitepaperPublish error:", err);
    return { success: false, error: err.message || "Failed to toggle status." };
  }
}

export async function recordWhitepaperDownload(id: string): Promise<void> {
  try {
    const currentList = await getAllWhitepapers();
    const idx = currentList.findIndex((w) => w._id === id);
    if (idx >= 0) {
      currentList[idx].downloadCount = (currentList[idx].downloadCount || 0) + 1;
      writeLocalStore(currentList);
      syncToSupabase(currentList[idx]).catch(() => {});
    }
  } catch {}
}
