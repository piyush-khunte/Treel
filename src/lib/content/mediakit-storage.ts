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
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("readLocalStore error in mediakit-storage:", err);
  }
  // Initialize with seed items if missing or empty
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(SEED_MEDIA_KIT_ITEMS, null, 2), "utf-8");
  } catch (initErr) {
    console.error("Failed to initialize mediakit-store.json:", initErr);
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
    console.error("writeLocalStore error in mediakit-storage:", err);
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
 * Retrieves all media kit items from local storage and Supabase backup.
 */
export async function getAllMediaKitItems(includeDrafts = true): Promise<MediaKitItemRecord[]> {
  const localItems = readLocalStore();

  try {
    const supabase = getAdminClient();
    const res = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_mediakit");

    if (!res.error && res.data && res.data.length > 0) {
      const synced: MediaKitItemRecord[] = [];
      for (const row of res.data) {
        try {
          if (row.item) {
            synced.push(normalizeMediaKit(JSON.parse(row.item)));
          }
        } catch {}
      }
      if (synced.length > 0) {
        const map = new Map<string, MediaKitItemRecord>();
        localItems.forEach((it) => map.set(it._id, it));
        synced.forEach((it) => map.set(it._id, it));
        const merged = Array.from(map.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
        writeLocalStore(merged);
        return includeDrafts ? merged : merged.filter((p) => p.publicationStatus === "Published");
      }
    }
  } catch (err) {
    console.error("getAllMediaKitItems database error:", err);
  }

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
 * Creates or updates a media kit item.
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

  // 1. Local Store Update
  const localList = readLocalStore();
  const idx = localList.findIndex((p) => p._id === id);
  if (idx >= 0) {
    localList[idx] = normalized;
  } else {
    localList.push(normalized);
  }
  localList.sort((a, b) => (a.order || 0) - (b.order || 0));
  writeLocalStore(localList);

  // 2. Supabase Sync
  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert({
      _id: normalized._id,
      testKey: "treel_mediakit",
      item: JSON.stringify(normalized),
      qty: normalized.publicationStatus,
    });
  } catch (err) {
    console.warn("saveMediaKitItem Supabase sync warning:", err);
  }

  return { success: true, data: normalized };
}

/**
 * Deletes a media kit item by ID.
 */
export async function deleteMediaKitItem(id: string): Promise<{ success: boolean; error?: string }> {
  const cleanId = (id || "").trim();
  if (!cleanId) return { success: false, error: "Media kit item ID required." };

  const all = readLocalStore();
  const target = all.find((p) => p._id === cleanId);
  if (!target) {
    return { success: false, error: "Media kit asset not found." };
  }

  const filtered = all.filter((p) => p._id !== target._id);
  writeLocalStore(filtered);

  // Supabase delete
  try {
    const supabase = getAdminClient();
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("testKey", "treel_mediakit")
      .eq("_id", target._id);
  } catch (err) {
    console.warn("deleteMediaKitItem Supabase warning:", err);
  }

  return { success: true };
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

