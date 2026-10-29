import fs from "fs";
import path from "path";
import { MediaKitItemRecord } from "@/types/content";
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

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "mediakit-store.json");

export const SEED_MEDIA_KIT_ITEMS: MediaKitItemRecord[] = [
  {
    _id: "mk_bundle_all_in_one",
    title: "Complete Media Bundle",
    category: "All-in-One Package",
    format: "ZIP Archive (~50 MB)",
    description: "Download all vector logos, high-res photography, executive bios, and company fact sheets in a single ZIP file (~50 MB).",
    fileSize: "50 MB",
    fileUrl: "/downloads/media-kit/treel-complete-media-bundle.zip",
    file: "treel-complete-media-bundle.zip",
    order: 1,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    _id: "mk_logo_pack",
    title: "Official Treel Logo Pack",
    category: "Brand Assets",
    format: "SVG, PNG (High-Res)",
    description: "Dark, light, and monochrome vector logos with clearance guides.",
    fileSize: "4.2 MB",
    fileUrl: "/downloads/media-kit/treel-logo-pack.zip",
    file: "treel-logo-pack.zip",
    iconName: "Palette",
    order: 2,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    _id: "mk_three_line_signature",
    title: "Treel Three-Line Signature",
    category: "Brand Assets",
    format: "SVG, AI",
    description: "Vector mark derived from the three red bars of the primary emblem.",
    fileSize: "1.1 MB",
    fileUrl: "/downloads/media-kit/treel-signature-mark.zip",
    file: "treel-signature-mark.zip",
    iconName: "Sparkles",
    order: 3,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    _id: "mk_brand_guidelines",
    title: "Brand Guidelines V3.1",
    category: "Brand Assets",
    format: "PDF Document",
    description: "Full specifications on color palette (Ink, Treel Red, Cream), typography, and tone.",
    fileSize: "8.5 MB",
    fileUrl: "/downloads/media-kit/treel-brand-guidelines.pdf",
    file: "treel-brand-guidelines.pdf",
    iconName: "FileText",
    order: 4,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    _id: "mk_typography_guide",
    title: "Typography & Specimen Guide",
    category: "Brand Assets",
    format: "PDF Document",
    description: "Fraunces display hierarchy and Inter UI typography standards.",
    fileSize: "2.3 MB",
    fileUrl: "/downloads/media-kit/treel-typography-guide.pdf",
    file: "treel-typography-guide.pdf",
    iconName: "Layers",
    order: 5,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    _id: "mk_photo_leadership",
    title: "Manish Ingale & Leadership Portraits",
    category: "Photography",
    format: "ZIP Archive (JPG/PNG)",
    details: "12 high-resolution JPG/PNG images",
    description: "Studio portraits of founder Manish Ingale and key executive leadership in high resolution.",
    fileSize: "24 MB",
    fileUrl: "/downloads/media-kit/treel-leadership-photography.zip",
    file: "treel-leadership-photography.zip",
    order: 6,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    _id: "mk_photo_hardware",
    title: "Wheel Sensors & In-Cab Hardware",
    category: "Photography",
    format: "ZIP Archive (JPG)",
    details: "18 high-resolution JPG images",
    description: "Studio product photography of commercial rim sensors, valve sensors, and Suraksha display.",
    fileSize: "32 MB",
    fileUrl: "/downloads/media-kit/treel-hardware-photography.zip",
    file: "treel-hardware-photography.zip",
    order: 7,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    _id: "mk_photo_ui",
    title: "TMIP Platform & Mobile App UI",
    category: "Photography",
    format: "ZIP Archive (PNG)",
    details: "15 uncompressed PNG mockups",
    description: "Retina screenshots of TMIP enterprise console, Vehicle Digital Twin views, and personal apps.",
    fileSize: "18 MB",
    fileUrl: "/downloads/media-kit/treel-ui-screenshots.zip",
    file: "treel-ui-screenshots.zip",
    order: 8,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    _id: "mk_photo_field",
    title: "Commercial Fleet Installations",
    category: "Photography",
    format: "ZIP Archive (JPG)",
    details: "10 high-resolution JPG images",
    description: "On-ground photography of commercial trucks, yard gate inspection lanes, and fitment hubs.",
    fileSize: "22 MB",
    fileUrl: "/downloads/media-kit/treel-fleet-photography.zip",
    file: "treel-fleet-photography.zip",
    order: 9,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    _id: "mk_fact_sheet",
    title: "Company Fact Sheet",
    category: "Fact Sheet & Bios",
    format: "PDF Document",
    description: "One-page summary of founding, funding, product families, 68,000+ vehicle dataset, key metrics, and Pune headquarters info.",
    fileSize: "1.4 MB",
    fileUrl: "/downloads/media-kit/treel-company-fact-sheet.pdf",
    file: "treel-company-fact-sheet.pdf",
    iconName: "FileText",
    order: 10,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  },
  {
    _id: "mk_executive_bios",
    title: "Executive Bios & Profiles",
    category: "Fact Sheet & Bios",
    format: "PDF Document",
    description: "Downloadable long-form narrative bios for founder Manish Ingale and the core leadership team.",
    fileSize: "2.1 MB",
    fileUrl: "/downloads/media-kit/treel-executive-bios.pdf",
    file: "treel-executive-bios.pdf",
    iconName: "FileText",
    order: 11,
    publicationStatus: "Published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z"
  }
];

function readLocalStore(): MediaKitItemRecord[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("readLocalStore error in mediakit-storage:", err);
  }
  // Initialize with seed items only if file does not exist
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(SEED_MEDIA_KIT_ITEMS, null, 2), "utf-8");
  } catch (initErr) {
    console.warn("Failed to initialize mediakit-store.json (expected in read-only environments):", initErr);
  }
  return SEED_MEDIA_KIT_ITEMS;
}

function writeLocalStore(items: MediaKitItemRecord[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.warn("writeLocalStore skipped (expected in read-only environments like Vercel):", err);
  }
}

function normalizeMediaKit(item: any): MediaKitItemRecord {
  const title = (item.title || item.name || "").trim();
  return {
    _id: item._id || item.id || `mk_${Date.now()}`,
    title,
    category: item.category || "Brand Assets",
    format: item.format || "ZIP Archive",
    description: (item.description || "").trim(),
    fileSize: item.fileSize || item.size || "1.0 MB",
    fileUrl: item.fileUrl || item.url || item.file || "#",
    details: item.details || undefined,
    file: item.file || undefined,
    order: typeof item.order === "number" ? item.order : 100,
    iconName: item.iconName || "FileText",
    publicationStatus: item.publicationStatus === "Draft" || item.status === "Draft" ? "Draft" : "Published",
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
  };
}

/**
 * Checks if the media kit store has been initialized in Supabase.
 */
async function isMediaKitInitialized(supabase: ReturnType<typeof getAdminClient>): Promise<boolean> {
  try {
    const { data } = await supabase
      .from("TreelEcommerce.t_test")
      .select("_id")
      .eq("testKey", "treel_mediakit_initialized")
      .limit(1);
    return Boolean(data && data.length > 0);
  } catch {
    return false;
  }
}

/**
 * Marks the media kit database as initialized so deleted items are never re-seeded.
 */
async function markMediaKitInitialized(supabase: ReturnType<typeof getAdminClient>): Promise<void> {
  try {
    const initialized = await isMediaKitInitialized(supabase);
    if (!initialized) {
      await supabase.from("TreelEcommerce.t_test").insert({
        _id: "treel_mediakit_initialized",
        testKey: "treel_mediakit_initialized",
        item: "true",
        qty: "initialized",
      });
    }
  } catch (err) {
    console.warn("markMediaKitInitialized warning:", err);
  }
}

/**
 * Fetches the set of tombstone (deleted) IDs from Supabase.
 * Collects from all matching rows to avoid PGRST116 multiple-row crash.
 */
async function getTombstoneIds(supabase: ReturnType<typeof getAdminClient>): Promise<Set<string>> {
  const tombstoneSet = new Set<string>();
  try {
    const tombRes = await supabase
      .from("TreelEcommerce.t_test")
      .select("item")
      .eq("testKey", "treel_mediakit_tombstones");

    if (tombRes.data && Array.isArray(tombRes.data)) {
      for (const row of tombRes.data) {
        if (row.item) {
          try {
            const parsed = JSON.parse(row.item);
            if (Array.isArray(parsed)) {
              for (const id of parsed) {
                if (typeof id === "string" && id.trim()) {
                  tombstoneSet.add(id.trim());
                }
              }
            } else if (typeof parsed === "string" && parsed.trim()) {
              tombstoneSet.add(parsed.trim());
            }
          } catch {
            if (typeof row.item === "string" && row.item.trim()) {
              tombstoneSet.add(row.item.trim());
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn("Failed to retrieve mediakit tombstones from Supabase:", err);
  }
  return tombstoneSet;
}

/**
 * Records an ID into the tombstone row in Supabase so it is permanently deleted across cloud instances.
 */
async function addTombstoneId(supabase: ReturnType<typeof getAdminClient>, id: string): Promise<void> {
  try {
    const cleanId = (id || "").trim();
    if (!cleanId) return;

    const existingSet = await getTombstoneIds(supabase);
    existingSet.add(cleanId);
    const arr = Array.from(existingSet);

    // Remove old tombstone rows to keep clean single row
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("testKey", "treel_mediakit_tombstones");

    // Insert clean consolidated tombstone row
    await supabase.from("TreelEcommerce.t_test").insert({
      _id: "treel_mediakit_tombstones",
      testKey: "treel_mediakit_tombstones",
      item: JSON.stringify(arr),
      qty: "tombstones",
    });

    await markMediaKitInitialized(supabase);
  } catch (err) {
    console.error("addTombstoneId error:", err);
  }
}

/**
 * Removes an ID from the tombstone row in Supabase when an asset is recreated/restored.
 */
async function removeTombstoneId(supabase: ReturnType<typeof getAdminClient>, id: string): Promise<void> {
  try {
    const cleanId = (id || "").trim();
    if (!cleanId) return;

    const existingSet = await getTombstoneIds(supabase);
    if (existingSet.has(cleanId)) {
      existingSet.delete(cleanId);
      const arr = Array.from(existingSet);

      await supabase
        .from("TreelEcommerce.t_test")
        .delete()
        .eq("testKey", "treel_mediakit_tombstones");

      await supabase.from("TreelEcommerce.t_test").insert({
        _id: "treel_mediakit_tombstones",
        testKey: "treel_mediakit_tombstones",
        item: JSON.stringify(arr),
        qty: "tombstones",
      });
    }
  } catch (err) {
    console.warn("removeTombstoneId error:", err);
  }
}

/**
 * Retrieves all media kit items from Supabase (cloud source of truth) with fallback to local store.
 */
export async function getAllMediaKitItems(includeDrafts = true): Promise<MediaKitItemRecord[]> {
  try {
    const supabase = getAdminClient();
    const [tombstoneSet, res, initialized] = await Promise.all([
      getTombstoneIds(supabase),
      supabase
        .from("TreelEcommerce.t_test")
        .select("*")
        .eq("testKey", "treel_mediakit"),
      isMediaKitInitialized(supabase),
    ]);

    if (!res.error && res.data) {
      const items: MediaKitItemRecord[] = [];
      const idsToDeleteFromCloud: string[] = [];

      for (const row of res.data) {
        try {
          if (row.item) {
            const parsed = normalizeMediaKit(JSON.parse(row.item));
            if (!tombstoneSet.has(parsed._id)) {
              items.push(parsed);
            } else {
              idsToDeleteFromCloud.push(parsed._id);
            }
          }
        } catch {}
      }

      // Cleanup any tombstoned items lingering in Supabase
      if (idsToDeleteFromCloud.length > 0) {
        Promise.resolve(
          supabase
            .from("TreelEcommerce.t_test")
            .delete()
            .eq("testKey", "treel_mediakit")
            .in("_id", idsToDeleteFromCloud)
        ).catch(() => {});
      }

      // If initialized OR has items OR has tombstones:
      // NEVER re-seed! An empty array is the expected state when user deleted all items.
      if (initialized || tombstoneSet.size > 0 || items.length > 0) {
        if (!initialized) {
          await markMediaKitInitialized(supabase);
        }
        const sorted = items.sort((a, b) => (a.order || 0) - (b.order || 0));
        writeLocalStore(sorted);
        return includeDrafts ? sorted : sorted.filter((p) => p.publicationStatus === "Published");
      }

      // Only on virgin first run (brand new DB with 0 rows, 0 tombstones, uninitialized)
      await markMediaKitInitialized(supabase);
      const initialItems: MediaKitItemRecord[] = [];
      for (const s of SEED_MEDIA_KIT_ITEMS) {
        if (!tombstoneSet.has(s._id)) {
          initialItems.push(s);
          await supabase.from("TreelEcommerce.t_test").insert({
            _id: s._id,
            testKey: "treel_mediakit",
            item: JSON.stringify(s),
            qty: s.publicationStatus || "Published",
          });
        }
      }
      writeLocalStore(initialItems);
      return includeDrafts
        ? initialItems
        : initialItems.filter((p) => p.publicationStatus === "Published");
    }
  } catch (err) {
    console.error("getAllMediaKitItems Supabase database error:", err);
  }

  // Fallback to local storage
  const localItems = readLocalStore();
  const sorted = [...localItems].sort((a, b) => (a.order || 0) - (b.order || 0));
  return includeDrafts ? sorted : sorted.filter((p) => p.publicationStatus === "Published");
}

/**
 * Retrieves published media kit items for public viewing.
 */
export async function getPublishedMediaKitItems(): Promise<MediaKitItemRecord[]> {
  return await getAllMediaKitItems(false);
}

/**
 * Creates or updates a media kit item across Supabase and local cache.
 */
export async function saveMediaKitItem(data: Partial<MediaKitItemRecord>): Promise<{
  success: boolean;
  data?: MediaKitItemRecord;
  error?: string;
}> {
  const title = (data.title || "").trim();
  if (!title) {
    return { success: false, error: "Asset title is required." };
  }

  const all = await getAllMediaKitItems(true);
  const now = new Date().toISOString();
  const id = data._id || `mk_${Date.now()}`;

  const existing = all.find((p) => p._id === id);
  const normalized = normalizeMediaKit({
    ...existing,
    ...data,
    _id: id,
    title,
    updatedAt: now,
    createdAt: existing?.createdAt || now,
  });

  // 1. Supabase Sync (Primary source of truth)
  try {
    const supabase = getAdminClient();

    // Ensure item is not blocked by tombstones and system is initialized
    await removeTombstoneId(supabase, normalized._id);
    await markMediaKitInitialized(supabase);

    // Delete any existing row with this _id first to prevent duplicate rows
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("testKey", "treel_mediakit")
      .eq("_id", normalized._id);

    const upRes = await supabase.from("TreelEcommerce.t_test").insert({
      _id: normalized._id,
      testKey: "treel_mediakit",
      item: JSON.stringify(normalized),
      qty: normalized.publicationStatus,
    });

    if (upRes.error) {
      console.error("saveMediaKitItem Supabase insert error:", upRes.error);
    }
  } catch (err) {
    console.warn("saveMediaKitItem Supabase sync warning:", err);
  }

  // 2. Local Store Update (for local development)
  try {
    const localList = readLocalStore();
    const idx = localList.findIndex((p) => p._id === id);
    if (idx >= 0) {
      localList[idx] = normalized;
    } else {
      localList.push(normalized);
    }
    localList.sort((a, b) => (a.order || 0) - (b.order || 0));
    writeLocalStore(localList);
  } catch {}

  return { success: true, data: normalized };
}

/**
 * Permanently deletes a media kit item by ID across Supabase and local cache.
 */
export async function deleteMediaKitItem(id: string): Promise<{ success: boolean; error?: string }> {
  const cleanId = (id || "").trim();
  if (!cleanId) return { success: false, error: "Media kit item ID required." };

  // 1. Supabase Deletion & Tombstone Recording
  try {
    const supabase = getAdminClient();

    // Ensure system is marked as initialized so it never re-seeds on zero items
    await markMediaKitInitialized(supabase);

    // Delete item row from Supabase
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("testKey", "treel_mediakit")
      .eq("_id", cleanId);

    // Record tombstone so neither seed items nor local fallbacks can resurrect it
    await addTombstoneId(supabase, cleanId);
  } catch (err) {
    console.error("deleteMediaKitItem Supabase error:", err);
  }

  // 2. Local File Store Deletion (for local development)
  try {
    const local = readLocalStore().filter((p) => p._id !== cleanId);
    writeLocalStore(local);
  } catch {}

  return { success: true };
}

/**
 * Permanently deletes ALL media kit items across Supabase and local cache.
 */
export async function deleteAllMediaKitItems(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getAdminClient();
    await markMediaKitInitialized(supabase);

    // Collect all current items and seed items to tombstone
    const all = await getAllMediaKitItems(true);
    const existingTombstones = await getTombstoneIds(supabase);

    for (const item of all) {
      existingTombstones.add(item._id);
    }
    for (const seed of SEED_MEDIA_KIT_ITEMS) {
      existingTombstones.add(seed._id);
    }

    // Delete all mediakit rows in Supabase
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("testKey", "treel_mediakit");

    // Replace tombstones with all IDs
    const arr = Array.from(existingTombstones);
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("testKey", "treel_mediakit_tombstones");

    await supabase.from("TreelEcommerce.t_test").insert({
      _id: "treel_mediakit_tombstones",
      testKey: "treel_mediakit_tombstones",
      item: JSON.stringify(arr),
      qty: "tombstones",
    });

    // Clear local file store
    writeLocalStore([]);

    return { success: true };
  } catch (err: any) {
    console.error("deleteAllMediaKitItems error:", err);
    return { success: false, error: err.message || "Failed to delete all media kit items." };
  }
}

/**
 * Toggles a media kit item publication status between Published and Draft.
 */
export async function toggleMediaKitPublish(id: string): Promise<{
  success: boolean;
  data?: MediaKitItemRecord;
  error?: string;
}> {
  const all = await getAllMediaKitItems(true);
  const target = all.find((p) => p._id === id);
  if (!target) return { success: false, error: "Media kit asset not found." };

  const newStatus = target.publicationStatus === "Published" ? "Draft" : "Published";
  return await saveMediaKitItem({ ...target, publicationStatus: newStatus });
}
