import crypto from "crypto";
import fs from "fs";
import path from "path";
import { 
  InsightSubscriberRecord, 
  BroadcastNotificationRecord
} from "@/types/content";
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

const SUBSCRIBERS_STORE_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "data",
  "subscribers-store.json"
);

const BROADCASTS_STORE_PATH = path.join(
  process.cwd(),
  "src",
  "lib",
  "data",
  "broadcasts-store.json"
);

function generateSecureToken(): string {
  try {
    return crypto.randomBytes(24).toString("hex");
  } catch {
    return `tok_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
  }
}

export const SEED_SUBSCRIBERS: InsightSubscriberRecord[] = [
  {
    _id: "sub_seed_001",
    email: "arun.nair@fleetlogistics.in",
    status: "confirmed",
    token: "e7b8c2f1a4d9e03561a8b9c2d3e4f5a6b7c8d9e012345678",
    source: "insights_portal",
    interest: "Mobility Intelligence Research",
    subscribedAt: "2026-08-10T14:20:00.000Z",
    confirmedAt: "2026-08-10T14:20:00.000Z",
    createdAt: "2026-08-10T14:20:00.000Z",
    updatedAt: "2026-08-10T14:20:00.000Z",
  },
  {
    _id: "sub_seed_002",
    email: "vikram.mehta@transportops.com",
    status: "confirmed",
    token: "a1c2d3e4f5b6a7b8c9d0e1f2a3b4c5d6e7f8a9b012345678",
    source: "article_newsletter",
    interest: "Fleet Telematics & Sensor Edge",
    subscribedAt: "2026-08-18T09:15:00.000Z",
    confirmedAt: "2026-08-18T09:15:00.000Z",
    createdAt: "2026-08-18T09:15:00.000Z",
    updatedAt: "2026-08-18T09:15:00.000Z",
  },
  {
    _id: "sub_seed_003",
    email: "priya.sharma@logixtech.in",
    status: "confirmed",
    token: "f9e8d7c6b5a41234567890abcdef1234567890abcdef1234",
    source: "insights_portal",
    interest: "Mobility Intelligence Research",
    subscribedAt: "2026-09-02T11:45:00.000Z",
    confirmedAt: "2026-09-02T11:45:00.000Z",
    createdAt: "2026-09-02T11:45:00.000Z",
    updatedAt: "2026-09-02T11:45:00.000Z",
  },
];

// ---------------------------------------------------------------------------
// SUBSCRIBER STORE OPERATIONS
// ---------------------------------------------------------------------------

function readLocalSubscribersStore(): InsightSubscriberRecord[] {
  try {
    if (fs.existsSync(SUBSCRIBERS_STORE_PATH)) {
      const raw = fs.readFileSync(SUBSCRIBERS_STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("readLocalSubscribersStore error:", err);
  }

  writeLocalSubscribersStore(SEED_SUBSCRIBERS);
  return [...SEED_SUBSCRIBERS];
}

function writeLocalSubscribersStore(items: InsightSubscriberRecord[]): void {
  try {
    const dir = path.dirname(SUBSCRIBERS_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SUBSCRIBERS_STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalSubscribersStore error:", err);
  }
}

export async function getAllSubscribers(): Promise<InsightSubscriberRecord[]> {
  const localItems = readLocalSubscribersStore();
  const supabase = getAdminClient();

  try {
    const { data, error } = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_subscribers");

    if (!error && data && data.length > 0) {
      try {
        const parsed = JSON.parse(data[0].testValue);
        if (Array.isArray(parsed) && parsed.length > 0) {
          writeLocalSubscribersStore(parsed);
          return parsed;
        }
      } catch (parseErr) {
        console.error("Supabase parse treel_subscribers error:", parseErr);
      }
    }
  } catch {
    // Graceful fallback to local cache
  }

  return localItems;
}

export async function getActiveSubscribers(): Promise<InsightSubscriberRecord[]> {
  const all = await getAllSubscribers();
  return all.filter((s) => s.status === "confirmed");
}

export async function getSubscriberByEmail(email: string): Promise<InsightSubscriberRecord | null> {
  const cleanEmail = email.trim().toLowerCase();
  const all = await getAllSubscribers();
  return all.find((s) => s.email.toLowerCase() === cleanEmail) || null;
}

export async function getSubscriberByToken(token: string): Promise<InsightSubscriberRecord | null> {
  if (!token || !token.trim()) return null;
  const cleanToken = token.trim();
  const all = await getAllSubscribers();
  return all.find((s) => s.token === cleanToken) || null;
}

export async function subscribeEmail(
  rawEmail: string,
  source: string = "insights_portal",
  interest: string = "Mobility Intelligence Research"
): Promise<{
  subscriber: InsightSubscriberRecord;
  isNew: boolean;
  reactivated: boolean;
}> {
  const cleanEmail = rawEmail.trim().toLowerCase();
  const all = await getAllSubscribers();
  const now = new Date().toISOString();

  const existingIdx = all.findIndex((s) => s.email.toLowerCase() === cleanEmail);

  if (existingIdx >= 0) {
    const existing = all[existingIdx];
    const wasUnsubscribed = existing.status === "unsubscribed";

    const updated: InsightSubscriberRecord = {
      ...existing,
      status: "confirmed",
      source: source || existing.source,
      interest: interest || existing.interest,
      token: existing.token || generateSecureToken(),
      confirmedAt: now,
      unsubscribedAt: null,
      updatedAt: now,
    };

    all[existingIdx] = updated;
    writeLocalSubscribersStore(all);
    await syncSubscribersToSupabase(all);

    return {
      subscriber: updated,
      isNew: false,
      reactivated: wasUnsubscribed,
    };
  }

  const newSubscriber: InsightSubscriberRecord = {
    _id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: cleanEmail,
    status: "confirmed",
    token: generateSecureToken(),
    source: source || "insights_portal",
    interest: interest || "Mobility Intelligence Research",
    subscribedAt: now,
    confirmedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  const updatedList = [newSubscriber, ...all];
  writeLocalSubscribersStore(updatedList);
  await syncSubscribersToSupabase(updatedList);

  return {
    subscriber: newSubscriber,
    isNew: true,
    reactivated: false,
  };
}

export async function unsubscribeByTokenOrEmail(query: {
  token?: string;
  email?: string;
}): Promise<{
  success: boolean;
  subscriber?: InsightSubscriberRecord;
  message: string;
}> {
  const all = await getAllSubscribers();
  const now = new Date().toISOString();

  let targetIndex = -1;

  if (query.token && query.token.trim()) {
    const cleanToken = query.token.trim();
    targetIndex = all.findIndex((s) => s.token === cleanToken);
  }

  if (targetIndex < 0 && query.email && query.email.trim()) {
    const cleanEmail = query.email.trim().toLowerCase();
    targetIndex = all.findIndex((s) => s.email.toLowerCase() === cleanEmail);
  }

  if (targetIndex < 0) {
    return {
      success: false,
      message: "Subscription record not found. You may already be unsubscribed.",
    };
  }

  const existing = all[targetIndex];
  const updated: InsightSubscriberRecord = {
    ...existing,
    status: "unsubscribed",
    unsubscribedAt: now,
    updatedAt: now,
  };

  all[targetIndex] = updated;
  writeLocalSubscribersStore(all);
  await syncSubscribersToSupabase(all);

  return {
    success: true,
    subscriber: updated,
    message: "You have been successfully unsubscribed from Treel Insights dispatches.",
  };
}

export async function deleteSubscriber(idOrEmail: string): Promise<boolean> {
  const clean = idOrEmail.trim().toLowerCase();
  const all = await getAllSubscribers();
  const filtered = all.filter(
    (s) => s._id !== idOrEmail && s.email.toLowerCase() !== clean
  );

  if (filtered.length === all.length) return false;

  writeLocalSubscribersStore(filtered);
  await syncSubscribersToSupabase(filtered);
  return true;
}

async function syncSubscribersToSupabase(items: InsightSubscriberRecord[]): Promise<void> {
  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert(
      [
        {
          testKey: "treel_subscribers",
          testValue: JSON.stringify(items),
        },
      ],
      { onConflict: "testKey" }
    );
  } catch (err) {
    console.error("syncSubscribersToSupabase error:", err);
  }
}

// ---------------------------------------------------------------------------
// BROADCAST HISTORY OPERATIONS
// ---------------------------------------------------------------------------

function readLocalBroadcastsStore(): BroadcastNotificationRecord[] {
  try {
    if (fs.existsSync(BROADCASTS_STORE_PATH)) {
      const raw = fs.readFileSync(BROADCASTS_STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("readLocalBroadcastsStore error:", err);
  }

  return [];
}

function writeLocalBroadcastsStore(items: BroadcastNotificationRecord[]): void {
  try {
    const dir = path.dirname(BROADCASTS_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(BROADCASTS_STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalBroadcastsStore error:", err);
  }
}

export async function getAllBroadcastLogs(): Promise<BroadcastNotificationRecord[]> {
  const localItems = readLocalBroadcastsStore();
  const supabase = getAdminClient();

  try {
    const { data, error } = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_insights_broadcasts");

    if (!error && data && data.length > 0) {
      try {
        const parsed = JSON.parse(data[0].testValue);
        if (Array.isArray(parsed)) {
          writeLocalBroadcastsStore(parsed);
          return parsed;
        }
      } catch (parseErr) {
        console.error("Supabase parse treel_insights_broadcasts error:", parseErr);
      }
    }
  } catch {
    // Suppress and fallback
  }

  return localItems;
}

export async function hasBroadcastBeenSent(articleSlug: string): Promise<boolean> {
  const cleanSlug = articleSlug.trim().toLowerCase();
  const logs = await getAllBroadcastLogs();
  return logs.some(
    (b) =>
      b.articleSlug.toLowerCase() === cleanSlug &&
      (b.status === "sent" || b.status === "partial" || b.status === "test_mode")
  );
}

export async function recordBroadcastLog(
  record: Omit<BroadcastNotificationRecord, "_id" | "createdAt"> & { _id?: string }
): Promise<BroadcastNotificationRecord> {
  const logs = await getAllBroadcastLogs();
  const now = new Date().toISOString();

  const fullRecord: BroadcastNotificationRecord = {
    _id: record._id || `bcast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    articleSlug: record.articleSlug,
    articleTitle: record.articleTitle,
    articleExcerpt: record.articleExcerpt || "",
    sentAt: record.sentAt || now,
    recipientCount: record.recipientCount,
    status: record.status,
    deliveredCount: record.deliveredCount,
    failedCount: record.failedCount,
    error: record.error,
    deliveryLogs: record.deliveryLogs || [],
    createdAt: now,
  };

  const updatedLogs = [fullRecord, ...logs];
  writeLocalBroadcastsStore(updatedLogs);

  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert(
      [
        {
          testKey: "treel_insights_broadcasts",
          testValue: JSON.stringify(updatedLogs),
        },
      ],
      { onConflict: "testKey" }
    );
  } catch (err) {
    console.error("syncBroadcastsToSupabase error:", err);
  }

  return fullRecord;
}

