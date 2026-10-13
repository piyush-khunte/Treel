import fs from "fs";
import path from "path";
import { AdminConsentRecord } from "@/types/admin";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

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

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "consents-store.json");

function readLocalStore(): AdminConsentRecord[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error("readLocalConsentStore error:", err);
  }
  return [];
}

function writeLocalStore(items: AdminConsentRecord[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalConsentStore error:", err);
  }
}

export function normalizeConsentRecord(item: any): AdminConsentRecord {
  const consentId = item.consentId || item.consent_id || `cons_${Date.now()}`;
  const rawStatus = (item.status || "").toLowerCase();

  let status: AdminConsentRecord["status"] = "Customized";
  let decision: AdminConsentRecord["decision"] = "Custom Preferences";

  if (rawStatus === "accepted") {
    status = "Accepted";
    decision = "Accepted All";
  } else if (rawStatus === "rejected") {
    status = "Rejected";
    decision = "Rejected Non-Essential";
  } else if (rawStatus === "withdrawn") {
    status = "Withdrawn";
    decision = "Withdrawn";
  }

  let cats = item.rawCategories || item.categories || {};
  if (typeof cats === "string") {
    try {
      cats = JSON.parse(cats);
    } catch {
      cats = {};
    }
  }

  const rawCategories = {
    necessary: true,
    functional: Boolean(cats.functional),
    analytics: Boolean(cats.analytics),
    marketing: Boolean(cats.marketing),
  };

  const activeLabels: string[] = ["Necessary"];
  if (rawCategories.functional) activeLabels.push("Functional");
  if (rawCategories.analytics) activeLabels.push("Analytics");
  if (rawCategories.marketing) activeLabels.push("Marketing");

  const timestamp = item.timestamp || item.consent_timestamp || item.createdAt || item.created_at || new Date().toISOString();

  let formattedDate = "Recently";
  try {
    const d = new Date(timestamp);
    formattedDate = d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }) + " IST";
  } catch {
    formattedDate = timestamp;
  }

  return {
    id: item.id || item._id || consentId,
    consentId,
    status,
    decision,
    categories: activeLabels.join(", "),
    rawCategories,
    policyVersion: item.policyVersion || item.policy_version || "2026-10-01",
    timestamp,
    formattedDate,
    withdrawnAt: item.withdrawnAt || item.withdrawn_at || null,
    source: item.source || "Banner",
    pagePath: item.pagePath || item.page_path || "/",
    updatedAt: item.updatedAt || item.updated_at || new Date().toISOString(),
  };
}

/**
 * Retrieves all cookie consent audit records from persistent multi-tier store.
 */
export async function getAllConsentRecords(): Promise<AdminConsentRecord[]> {
  const localItems = readLocalStore().map(normalizeConsentRecord);
  const supabase = getAdminClient();

  try {
    // 1. Try public.cookie_consents table
    const res1 = await supabase
      .from("cookie_consents")
      .select("*")
      .order("consent_timestamp", { ascending: false });

    if (!res1.error && res1.data && res1.data.length > 0) {
      const items = res1.data.map(normalizeConsentRecord);
      writeLocalStore(items);
      return items;
    }

    // 2. Try TreelEcommerce.cookie_consents table
    const res2 = await supabase
      .from("TreelEcommerce.cookie_consents")
      .select("*")
      .order("consent_timestamp", { ascending: false });

    if (!res2.error && res2.data && res2.data.length > 0) {
      const items = res2.data.map(normalizeConsentRecord);
      writeLocalStore(items);
      return items;
    }

    // 3. Try TreelEcommerce.t_test cloud sync records
    const res3 = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_cookie_consent");

    if (!res3.error && res3.data && res3.data.length > 0) {
      const synced: AdminConsentRecord[] = [];
      for (const row of res3.data) {
        try {
          if (row.item) {
            synced.push(normalizeConsentRecord(JSON.parse(row.item)));
          }
        } catch {}
      }

      if (synced.length > 0) {
        // Merge with local items by consentId
        const map = new Map<string, AdminConsentRecord>();
        localItems.forEach((it) => map.set(it.consentId, it));
        synced.forEach((it) => map.set(it.consentId, it));

        const merged = Array.from(map.values()).sort((a, b) =>
          (b.timestamp || "").localeCompare(a.timestamp || "")
        );
        writeLocalStore(merged);
        return merged;
      }
    }
  } catch (err) {
    console.error("getAllConsentRecords database query error:", err);
  }

  return localItems.sort((a, b) =>
    (b.timestamp || "").localeCompare(a.timestamp || "")
  );
}

/**
 * Saves or updates a consent audit record across local storage and remote Supabase database.
 */
export async function saveConsentRecord(record: any): Promise<AdminConsentRecord> {
  const normalized = normalizeConsentRecord(record);

  // 1. Save to local persistent file store
  const localItems = readLocalStore();
  const existingIdx = localItems.findIndex((it) => it.consentId === normalized.consentId);
  if (existingIdx >= 0) {
    localItems[existingIdx] = normalized;
  } else {
    localItems.unshift(normalized);
  }
  writeLocalStore(localItems);

  // 2. Persist to remote Supabase database
  const supabase = getAdminClient();

  const dbPayload = {
    consent_id: normalized.consentId,
    status: normalized.status.toLowerCase(),
    categories: normalized.rawCategories,
    policy_version: normalized.policyVersion,
    consent_timestamp: normalized.timestamp,
    withdrawn_at: normalized.withdrawnAt,
    updated_at: normalized.updatedAt,
  };

  try {
    // Attempt native table
    await supabase.from("cookie_consents").upsert(dbPayload, { onConflict: "consent_id" });
  } catch {}

  try {
    // Attempt TreelEcommerce table
    await supabase.from("TreelEcommerce.cookie_consents").upsert(dbPayload, { onConflict: "consent_id" });
  } catch {}

  try {
    // Always sync to TreelEcommerce.t_test for zero-loss cloud persistence
    await supabase.from("TreelEcommerce.t_test").upsert({
      _id: normalized.consentId,
      testKey: "treel_cookie_consent",
      item: JSON.stringify(normalized),
      qty: normalized.status.toLowerCase(),
    });
  } catch (err) {
    console.error("saveConsentRecord t_test sync error:", err);
  }

  // 3. Revalidate admin page cache
  try {
    revalidatePath("/admin/consents");
  } catch {}

  return normalized;
}

/**
 * Computes analytics stats and KPI counts across consent records.
 */
export function getConsentStats(records: AdminConsentRecord[]) {
  const total = records.length;
  let accepted = 0;
  let rejected = 0;
  let customized = 0;
  let withdrawn = 0;
  let analyticsCount = 0;
  let marketingCount = 0;
  let functionalCount = 0;

  for (const r of records) {
    if (r.status === "Accepted") accepted++;
    else if (r.status === "Rejected") rejected++;
    else if (r.status === "Customized") customized++;
    else if (r.status === "Withdrawn") withdrawn++;

    if (r.rawCategories.analytics) analyticsCount++;
    if (r.rawCategories.marketing) marketingCount++;
    if (r.rawCategories.functional) functionalCount++;
  }

  return {
    total,
    accepted,
    rejected,
    customized,
    withdrawn,
    analyticsCount,
    marketingCount,
    functionalCount,
  };
}

