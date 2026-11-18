import { cookies } from "next/headers";
import { getSupabaseAdminClient } from "@/lib/commerce/order-storage";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_ROLE,
  AUTH_SECRET,
} from "./admin-constants";
import {
  AdminSession,
  signSessionToken,
  verifySessionToken,
} from "./admin-token";

export {
  ADMIN_SESSION_COOKIE,
  ADMIN_ROLE,
  AUTH_SECRET,
  signSessionToken,
  verifySessionToken,
};
export type { AdminSession };

async function sha256Hex(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(text));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function cleanEnvValue(val?: string): string {
  if (!val || typeof val !== "string") return "";
  let s = val.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

/**
 * Validates admin credentials securely without hardcoded values.
 * Credentials are strictly resolved from server environment variables or Supabase Auth.
 */
export async function authenticateAdmin(
  username: string,
  password: string
): Promise<{ success: boolean; error?: string; session?: AdminSession }> {
  const cleanUser = (username || "").trim();
  const cleanPass = (password || "").trim();

  if (!cleanUser || !cleanPass) {
    return { success: false, error: "Username and password are required." };
  }

  // 1. Try Supabase Auth if configured with real endpoint
  const sbUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (sbUrl && !sbUrl.includes("placeholder-treel.supabase.co")) {
    try {
      const supabase = getSupabaseAdminClient();
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanUser.includes("@") && cleanUser.includes(".") ? cleanUser : `${cleanUser}@treel.in`,
        password: cleanPass,
      });

      if (!authError && authData?.user) {
        const now = Math.floor(Date.now() / 1000);
        return {
          success: true,
          session: {
            username: cleanUser,
            role: ADMIN_ROLE,
            iat: now,
            exp: now + 7 * 24 * 60 * 60, // 7 days
          },
        };
      }
    } catch {
      // Supabase auth fallback to server environment verification
    }
  }

  // 2. Server environment credentials. Only the two dedicated, server-only variables are
  // accepted. No aliases, no case-insensitive lookup and no NEXT_PUBLIC_ fallbacks, so
  // unrelated OS variables (USER, PWD, PASSWORD, KEY...) can never become admin credentials.
  const envUsername = cleanEnvValue(process.env.ADMIN_USERNAME);
  const envPassword = cleanEnvValue(process.env.ADMIN_PASSWORD);

  if (!envUsername || !envPassword) {
    console.error("[admin-auth] ADMIN_USERNAME / ADMIN_PASSWORD are not set; environment login is disabled.");
    return { success: false, error: "Invalid username or password." };
  }

  const allowedUsernames = envUsername
    .split(/[,;|]/)
    .map((u) => u.trim().toLowerCase())
    .filter(Boolean);

  const isUserValid = allowedUsernames.includes(cleanUser.toLowerCase());

  // Compare HMAC-SHA256 digests in constant time
  const inputHash = await sha256Hex(cleanPass);
  const expectedHash = await sha256Hex(envPassword);
  let diff = inputHash.length ^ expectedHash.length;
  for (let i = 0; i < Math.min(inputHash.length, expectedHash.length); i++) {
    diff |= inputHash.charCodeAt(i) ^ expectedHash.charCodeAt(i);
  }
  const isPassValid = diff === 0;

  if (isUserValid && isPassValid) {
    const now = Math.floor(Date.now() / 1000);
    return {
      success: true,
      session: {
        username: cleanUser,
        role: ADMIN_ROLE,
        iat: now,
        exp: now + 7 * 24 * 60 * 60, // 7 days
      },
    };
  }

  return { success: false, error: "Invalid username or password." };
}

/**
 * Retrieves the active admin session from cookies (Server Component / Action context).
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  if (process.env.ADMIN_BYPASS_AUTH === "true") {
    const now = Math.floor(Date.now() / 1000);
    return {
      username: "admin",
      role: ADMIN_ROLE,
      iat: now,
      exp: now + 3600,
    };
  }
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (!sessionCookie) return null;
    return await verifySessionToken(sessionCookie);
  } catch {
    return null;
  }
}
