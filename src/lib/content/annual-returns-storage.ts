import fs from "fs";
import path from "path";
import { MongoAnnualReturn } from "@/types/admin";
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

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "annual-returns-store.json");

export function readLocalAnnualReturns(): MongoAnnualReturn[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("readLocalAnnualReturns error:", err);
  }
  return [];
}

export function writeLocalAnnualReturns(items: MongoAnnualReturn[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalAnnualReturns error:", err);
  }
}

/**
 * Compare function to order annual returns descending by financial year / date.
 */
export function sortAnnualReturns(items: MongoAnnualReturn[]): MongoAnnualReturn[] {
  return [...items].sort((a, b) => {
    const matchA = a.title?.match(/FY[- ]?(\d{4})/i);
    const matchB = b.title?.match(/FY[- ]?(\d{4})/i);
    if (matchA && matchB) {
      const numA = parseInt(matchA[1], 10);
      const numB = parseInt(matchB[1], 10);
      if (numA !== numB) return numB - numA;
    }
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
  });
}

/**
 * Public accessor for statutory annual returns.
 * Tries Supabase first, automatically synchronizes local store,
 * and falls back to local JSON store on offline/failure.
 */
export async function getPublicAnnualReturns(): Promise<MongoAnnualReturn[]> {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("TreelEcommerce.annualreturns")
      .select("*")
      .order("date", { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const sorted = sortAnnualReturns(data as MongoAnnualReturn[]);
      writeLocalAnnualReturns(sorted);
      return sorted;
    }
  } catch (err) {
    console.warn("getPublicAnnualReturns failed to fetch from Supabase, using local fallback store:", err);
  }

  const localItems = readLocalAnnualReturns();
  return sortAnnualReturns(localItems);
}

