import fs from "fs";
import path from "path";
import { NoticeItem } from "@/types/admin";
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

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "notices-store.json");

function readLocalStore(): NoticeItem[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error("readLocalStore error:", err);
  }
  return [];
}

function writeLocalStore(items: NoticeItem[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalStore error:", err);
  }
}

/**
 * Normalizes a database or storage record to a consistent NoticeItem.
 */
function normalizeNotice(item: any): NoticeItem {
  return {
    _id: item._id || item.id || `not_${Date.now()}`,
    title: item.title || "",
    description: item.description || "",
    publishedDate: item.publishedDate || item.published_date || new Date().toISOString().split("T")[0],
    status: item.status === "Published" ? "Published" : "Draft",
    category: item.category || "General Notice",
    documentUrl: item.documentUrl || item.document_url || undefined,
    document_url: item.documentUrl || item.document_url || undefined,
    createdAt: item.createdAt || item.created_at || new Date().toISOString(),
    updatedAt: item.updatedAt || item.updated_at || new Date().toISOString(),
  };
}

/**
 * Retrieves all notices, reading from Supabase when available and falling back to persistent file store.
 */
export async function getAllNotices(): Promise<NoticeItem[]> {
  const localItems = readLocalStore().map(normalizeNotice);
  const supabase = getAdminClient();

  try {
    // 1. Try public.notices table
    const res1 = await supabase
      .from("notices")
      .select("*")
      .order("published_date", { ascending: false });

    if (!res1.error && res1.data && res1.data.length > 0) {
      const items = res1.data.map(normalizeNotice);
      writeLocalStore(items);
      return items;
    }

    // 2. Try TreelEcommerce.notices table
    const res2 = await supabase
      .from("TreelEcommerce.notices")
      .select("*")
      .order("publishedDate", { ascending: false });

    if (!res2.error && res2.data && res2.data.length > 0) {
      const items = res2.data.map(normalizeNotice);
      writeLocalStore(items);
      return items;
    }

    // 3. Try synced records in TreelEcommerce.t_test
    const res3 = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_notice");

    if (!res3.error && res3.data && res3.data.length > 0) {
      const synced: NoticeItem[] = [];
      for (const row of res3.data) {
        try {
          if (row.item) {
            synced.push(normalizeNotice(JSON.parse(row.item)));
          }
        } catch {}
      }
      if (synced.length > 0) {
        // Merge with local items by _id
        const map = new Map<string, NoticeItem>();
        localItems.forEach((it) => map.set(it._id, it));
        synced.forEach((it) => map.set(it._id, it));
        const merged = Array.from(map.values()).sort((a, b) =>
          (b.publishedDate || "").localeCompare(a.publishedDate || "")
        );
        writeLocalStore(merged);
        return merged;
      }
    }
  } catch (err) {
    console.error("getAllNotices database error:", err);
  }

  return localItems.sort((a, b) =>
    (b.publishedDate || "").localeCompare(a.publishedDate || "")
  );
}

/**
 * Persists a notice across file storage and remote Supabase database.
 */
export async function saveNotice(notice: NoticeItem): Promise<NoticeItem> {
  const normalized = normalizeNotice(notice);

  // 1. Save to local persistent file store
  const localItems = readLocalStore();
  const existingIdx = localItems.findIndex((it) => it._id === normalized._id);
  if (existingIdx >= 0) {
    localItems[existingIdx] = normalized;
  } else {
    localItems.unshift(normalized);
  }
  writeLocalStore(localItems);

  // 2. Persist to Supabase
  const supabase = getAdminClient();
  try {
    // Attempt native notices table
    await supabase.from("notices").upsert({
      _id: normalized._id,
      title: normalized.title,
      description: normalized.description,
      published_date: normalized.publishedDate,
      publishedDate: normalized.publishedDate,
      status: normalized.status,
      category: normalized.category,
      document_url: normalized.documentUrl,
      documentUrl: normalized.documentUrl,
      updated_at: normalized.updatedAt,
    });
  } catch {}

  try {
    // Attempt TreelEcommerce.notices table
    await supabase.from("TreelEcommerce.notices").upsert({
      _id: normalized._id,
      title: normalized.title,
      description: normalized.description,
      published_date: normalized.publishedDate,
      publishedDate: normalized.publishedDate,
      status: normalized.status,
      category: normalized.category,
      document_url: normalized.documentUrl,
      documentUrl: normalized.documentUrl,
      updatedAt: normalized.updatedAt,
    });
  } catch {}

  try {
    // Live remote sync in TreelEcommerce.t_test for zero-loss cloud persistence
    await supabase.from("TreelEcommerce.t_test").upsert({
      _id: normalized._id,
      testKey: "treel_notice",
      item: JSON.stringify(normalized),
      qty: normalized.status,
    });
  } catch (err) {
    console.error("saveNotice t_test sync error:", err);
  }

  return normalized;
}

/**
 * Deletes a notice by _id from both local store and Supabase.
 */
export async function removeNotice(id: string): Promise<boolean> {
  // 1. Local file store
  const localItems = readLocalStore().filter((it) => it._id !== id);
  writeLocalStore(localItems);

  // 2. Supabase deletion
  const supabase = getAdminClient();
  try {
    await supabase.from("notices").delete().eq("_id", id);
  } catch {}
  try {
    await supabase.from("TreelEcommerce.notices").delete().eq("_id", id);
  } catch {}
  try {
    await supabase.from("TreelEcommerce.t_test").delete().eq("_id", id);
  } catch {}

  return true;
}

