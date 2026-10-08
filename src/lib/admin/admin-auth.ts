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

  // 2. Server environment credential verification
  const envUsername = (
    process.env.ADMIN_USERNAME ||
    process.env.ADMIN_USER ||
    ""
  ).trim();

  const envPassword = (
    process.env.ADMIN_PASSWORD ||
    process.env.ADMIN_PASS ||
    ""
  ).trim();

  if (!envUsername || !envPassword) {
    return {
      success: false,
      error: "Admin credentials are not configured in server environment variables.",
    };
  }

  const isUserValid = cleanUser.toLowerCase() === envUsername.toLowerCase();
  
  // Constant-time comparison using cryptographic HMAC hashes
  const inputHash = await sha256Hex(cleanPass);
  const expectedHash = await sha256Hex(envPassword);
  const isPassValid = inputHash === expectedHash;

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
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
    if (!sessionCookie) return null;
    return await verifySessionToken(sessionCookie);
  } catch {
    return null;
  }
}
