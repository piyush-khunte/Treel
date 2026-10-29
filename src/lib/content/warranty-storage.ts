import fs from "fs";
import path from "path";
import { WarrantyRecord, WarrantyStatus } from "@/types/content";
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

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "warranties-store.json");

export const SEED_WARRANTIES: WarrantyRecord[] = [
  {
    _id: "wr_seed_001",
    registrationId: "WR-2026-98241",
    type: "registration",
    orderId: "677dffae1d7ae23c288e0924",
    customerEmail: "akash@patilmail.com",
    customerName: "Akash Patil",
    customerPhone: "+91 98201 12345",
    productName: "Personal TPMS (4-Tyre Kit)",
    productCategory: "Personal TPMS",
    coverageDuration: "12 Months (1 Year)",
    coverageStatus: "Active",
    purchaseDate: "2026-01-08",
    registeredAt: "2026-01-08T10:15:00.000Z",
    status: "Approved",
    adminNotes: "Auto-verified against online order #677dffae1d7ae23c288e0924.",
    createdAt: "2026-01-08T10:15:00.000Z",
    updatedAt: "2026-01-08T10:15:00.000Z",
  },
  {
    _id: "wr_seed_002",
    registrationId: "WR-2026-44120",
    type: "registration",
    orderId: "TR-98241",
    customerEmail: "vikram.singh@gmail.com",
    customerName: "Vikram Singh",
    customerPhone: "+91 94140 88219",
    productName: "Personal TPMS (4-Tyre Kit)",
    productCategory: "Personal TPMS",
    coverageDuration: "12 Months (1 Year)",
    coverageStatus: "Active",
    purchaseDate: "2026-02-14",
    registeredAt: "2026-02-15T14:30:00.000Z",
    status: "Active",
    adminNotes: "Dealer invoice registration (Authorized Pune Hub). Approved.",
    createdAt: "2026-02-15T14:30:00.000Z",
    updatedAt: "2026-02-15T14:30:00.000Z",
  },
  {
    _id: "clm_seed_001",
    registrationId: "CLM-2026-77312",
    type: "claim",
    orderId: "TR-87214",
    customerEmail: "rahul.deshmukh@outlook.com",
    customerName: "Rahul Deshmukh",
    customerPhone: "+91 98902 44321",
    productName: "Personal TPMS (4-Tyre Kit)",
    productCategory: "Personal TPMS",
    coverageDuration: "12 Months (1 Year)",
    coverageStatus: "Active",
    claimIssueType: "Sensor not working",
    claimDescription: "Rear-left internal sensor stopped transmitting pressure readings after 4 months. Changed valve cap but display shows sensor offline.",
    claimResolution: "Replacement",
    registeredAt: "2026-03-01T09:45:00.000Z",
    status: "Under Review",
    adminNotes: "Customer sent photo of sensor ID. Replacement unit dispatched via Shiprocket.",
    createdAt: "2026-03-01T09:45:00.000Z",
    updatedAt: "2026-03-02T11:20:00.000Z",
  },
];

function readLocalStore(): WarrantyRecord[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("readLocalStore error in warranty-storage:", err);
  }

  // Initialize with seed items if missing or empty
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(SEED_WARRANTIES, null, 2), "utf-8");
  } catch (initErr) {
    console.error("Failed to initialize warranties-store.json:", initErr);
  }
  return SEED_WARRANTIES;
}

function writeLocalStore(items: WarrantyRecord[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalStore error in warranty-storage:", err);
  }
}

function normalizeWarranty(item: any): WarrantyRecord {
  const type = item.type === "claim" ? "claim" : "registration";
  const now = new Date().toISOString();
  const regId =
    item.registrationId ||
    (type === "claim"
      ? `CLM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
      : `WR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`);

  return {
    _id: item._id || item.id || `wr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    registrationId: regId,
    type,
    orderId: (item.orderId || item.order_id || "").trim(),
    customerEmail: (item.customerEmail || item.email || item.work_email || "").trim().toLowerCase(),
    customerName: item.customerName || item.fullName || item.name || undefined,
    customerPhone: item.customerPhone || item.phone || item.mobile || undefined,
    productName: item.productName || item.product || "Personal TPMS (4-Tyre Kit)",
    productCategory: item.productCategory || "Personal TPMS",
    coverageDuration: item.coverageDuration || "12 Months (1 Year)",
    coverageStatus: item.coverageStatus === "Expired" ? "Expired" : "Active",
    purchaseDate: item.purchaseDate || undefined,
    registeredAt: item.registeredAt || item.createdAt || now,
    claimIssueType: item.claimIssueType || item.issueType || undefined,
    claimDescription: item.claimDescription || item.description || item.message || undefined,
    claimResolution: item.claimResolution || item.resolution || undefined,
    status: (item.status as WarrantyStatus) || (type === "claim" ? "Pending Review" : "Submitted"),
    adminNotes: item.adminNotes || undefined,
    reviewedBy: item.reviewedBy || undefined,
    reviewedAt: item.reviewedAt || undefined,
    createdAt: item.createdAt || now,
    updatedAt: item.updatedAt || now,
  };
}

/**
 * Retrieves all warranty records from local storage and Supabase backup.
 */
export async function getAllWarranties(): Promise<WarrantyRecord[]> {
  const localItems = readLocalStore();

  try {
    const supabase = getAdminClient();
    const res = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_warranty");

    if (!res.error && res.data && res.data.length > 0) {
      const synced: WarrantyRecord[] = [];
      for (const row of res.data) {
        try {
          if (row.item) {
            synced.push(normalizeWarranty(JSON.parse(row.item)));
          }
        } catch {}
      }
      if (synced.length > 0) {
        const map = new Map<string, WarrantyRecord>();
        localItems.forEach((it) => map.set(it._id, it));
        synced.forEach((it) => map.set(it._id, it));
        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
        );
        writeLocalStore(merged);
        return merged;
      }
    }
  } catch (err) {
    console.error("getAllWarranties database error:", err);
  }

  return localItems.sort(
    (a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
  );
}

/**
 * Retrieves a single warranty record by ID or registrationId.
 */
export async function getWarrantyById(id: string): Promise<WarrantyRecord | null> {
  const cleanId = (id || "").trim();
  const all = await getAllWarranties();
  return (
    all.find(
      (w) =>
        w._id === cleanId ||
        w.registrationId.toLowerCase() === cleanId.toLowerCase()
    ) || null
  );
}

/**
 * Verifies if an order exists in Supabase checkouts collection.
 */
export async function verifyOrderForWarranty(
  orderId: string,
  email: string
): Promise<{
  verified: boolean;
  orderFound: boolean;
  productTitle: string;
  customerName?: string;
  orderDate?: string;
  message?: string;
}> {
  const cleanOrderId = (orderId || "").trim();
  const cleanEmail = (email || "").trim().toLowerCase();

  if (!cleanOrderId || !cleanEmail) {
    return {
      verified: false,
      orderFound: false,
      productTitle: "Personal TPMS (4-Tyre Kit)",
      message: "Order ID and Email address are required.",
    };
  }

  try {
    const supabase = getAdminClient();
    const res = await supabase
      .from("TreelEcommerce.checkouts")
      .select("*")
      .or(`_id.eq.${cleanOrderId},contact.eq.${cleanEmail}`)
      .limit(5);

    if (!res.error && res.data && res.data.length > 0) {
      // Find matching checkout
      const exactMatch = res.data.find(
        (c) =>
          c._id === cleanOrderId ||
          (c.contact && c.contact.toLowerCase() === cleanEmail)
      );

      if (exactMatch) {
        const title =
          exactMatch["cartData[0].title"] ||
          exactMatch["cartData[1].title"] ||
          "Personal TPMS (4-Tyre Kit)";
        const customerName = `${exactMatch.firstname || ""} ${exactMatch.lastname || ""}`.trim() || undefined;
        return {
          verified: true,
          orderFound: true,
          productTitle: title,
          customerName,
          orderDate: exactMatch.date,
          message: "Order verified from Treel purchase records.",
        };
      }
    }
  } catch (err) {
    console.warn("verifyOrderForWarranty lookup warning:", err);
  }

  // If not found in online ecommerce, accept as valid dealer/retail order
  return {
    verified: true,
    orderFound: false,
    productTitle: "Personal TPMS (4-Tyre Kit)",
    message: "Order ID recognized for registration.",
  };
}

/**
 * Saves a new or updated warranty record into local store and Supabase.
 */
export async function saveWarranty(
  data: Partial<WarrantyRecord>
): Promise<{ success: boolean; data?: WarrantyRecord; error?: string }> {
  const orderId = (data.orderId || "").trim();
  const customerEmail = (data.customerEmail || "").trim().toLowerCase();

  if (!orderId) {
    return { success: false, error: "Order ID is required." };
  }
  if (!customerEmail || !customerEmail.includes("@")) {
    return { success: false, error: "A valid email address is required." };
  }

  const all = await getAllWarranties();
  const now = new Date().toISOString();
  const id = data._id || `wr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const existing = all.find((w) => w._id === id || (w.registrationId && w.registrationId === data.registrationId));

  const normalized = normalizeWarranty({
    ...existing,
    ...data,
    _id: id,
    orderId,
    customerEmail,
    updatedAt: now,
    createdAt: existing?.createdAt || now,
    registeredAt: existing?.registeredAt || now,
  });

  // 1. Local Store Update
  const localList = readLocalStore();
  const idx = localList.findIndex((w) => w._id === id);
  if (idx >= 0) {
    localList[idx] = normalized;
  } else {
    localList.unshift(normalized);
  }
  writeLocalStore(localList);

  // 2. Supabase Sync (TreelEcommerce.t_test)
  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert({
      _id: normalized._id,
      testKey: "treel_warranty",
      item: JSON.stringify(normalized),
      qty: normalized.status,
    });
  } catch (err) {
    console.warn("saveWarranty Supabase sync warning:", err);
  }

  return { success: true, data: normalized };
}

/**
 * Registers a warranty from customer submission.
 */
export async function registerWarrantySubmission(payload: {
  orderId: string;
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  productName?: string;
  purchaseDate?: string;
}): Promise<{
  success: boolean;
  data?: WarrantyRecord;
  error?: string;
  isDuplicate?: boolean;
}> {
  const orderId = (payload.orderId || "").trim();
  const email = (payload.customerEmail || "").trim().toLowerCase();

  if (!orderId) return { success: false, error: "Order ID is required." };
  if (!email || !email.includes("@")) return { success: false, error: "A valid email address is required." };

  // Check duplicate registration for the exact same orderId and email
  const all = await getAllWarranties();
  const existing = all.find(
    (w) =>
      w.type === "registration" &&
      w.orderId.toLowerCase() === orderId.toLowerCase() &&
      w.customerEmail.toLowerCase() === email.toLowerCase()
  );

  if (existing) {
    return {
      success: true,
      data: existing,
      isDuplicate: true,
    };
  }

  const year = new Date().getFullYear();
  const randCode = Math.floor(10000 + Math.random() * 90000);
  const registrationId = `WR-${year}-${randCode}`;

  return await saveWarranty({
    type: "registration",
    registrationId,
    orderId,
    customerEmail: email,
    customerName: payload.customerName || email.split("@")[0],
    customerPhone: payload.customerPhone,
    productName: payload.productName || "Personal TPMS (4-Tyre Kit)",
    productCategory: "Personal TPMS",
    coverageDuration: "12 Months (1 Year)",
    coverageStatus: "Active",
    purchaseDate: payload.purchaseDate || new Date().toISOString().split("T")[0],
    status: "Approved",
    adminNotes: "Customer registered warranty via personal support portal.",
  });
}

/**
 * Submits a warranty claim from customer.
 */
export async function submitWarrantyClaimSubmission(payload: {
  orderId: string;
  customerEmail: string;
  claimIssueType: string;
  claimDescription: string;
  claimResolution?: string;
  customerName?: string;
  customerPhone?: string;
}): Promise<{
  success: boolean;
  data?: WarrantyRecord;
  error?: string;
}> {
  const orderId = (payload.orderId || "").trim();
  const email = (payload.customerEmail || "").trim().toLowerCase();
  const issue = (payload.claimIssueType || "").trim();
  const desc = (payload.claimDescription || "").trim();

  if (!orderId) return { success: false, error: "Order ID is required." };
  if (!email || !email.includes("@")) return { success: false, error: "A valid email address is required." };
  if (!desc) return { success: false, error: "Issue description is required." };

  const year = new Date().getFullYear();
  const randCode = Math.floor(10000 + Math.random() * 90000);
  const registrationId = `CLM-${year}-${randCode}`;

  return await saveWarranty({
    type: "claim",
    registrationId,
    orderId,
    customerEmail: email,
    customerName: payload.customerName || email.split("@")[0],
    customerPhone: payload.customerPhone,
    productName: "Personal TPMS (4-Tyre Kit)",
    productCategory: "Personal TPMS",
    coverageDuration: "12 Months (1 Year)",
    coverageStatus: "Active",
    claimIssueType: issue || "Sensor not working",
    claimDescription: desc,
    claimResolution: payload.claimResolution || "Replacement",
    status: "Pending Review",
    adminNotes: "New claim submitted through personal support portal.",
  });
}

/**
 * Updates a warranty record status.
 */
export async function updateWarrantyStatus(
  id: string,
  status: WarrantyStatus,
  adminNotes?: string,
  reviewer?: string
): Promise<{ success: boolean; data?: WarrantyRecord; error?: string }> {
  const item = await getWarrantyById(id);
  if (!item) {
    return { success: false, error: "Warranty record not found." };
  }

  const patch: Partial<WarrantyRecord> = {
    ...item,
    status,
    adminNotes: adminNotes !== undefined ? adminNotes : item.adminNotes,
    reviewedBy: reviewer || item.reviewedBy || "Admin",
    reviewedAt: new Date().toISOString(),
  };

  return await saveWarranty(patch);
}

/**
 * Deletes a warranty record.
 */
export async function deleteWarranty(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const cleanId = (id || "").trim();
  if (!cleanId) return { success: false, error: "Warranty ID required." };

  const all = readLocalStore();
  const target = all.find(
    (w) => w._id === cleanId || w.registrationId === cleanId
  );
  if (!target) {
    return { success: false, error: "Warranty record not found." };
  }

  const filtered = all.filter((w) => w._id !== target._id);
  writeLocalStore(filtered);

  // Supabase delete
  try {
    const supabase = getAdminClient();
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("testKey", "treel_warranty")
      .eq("_id", target._id);
  } catch (err) {
    console.warn("deleteWarranty Supabase warning:", err);
  }

  return { success: true };
}

