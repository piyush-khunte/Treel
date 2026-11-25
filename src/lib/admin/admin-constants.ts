export const ADMIN_SESSION_COOKIE = "treel_admin_session";
export const ADMIN_ROLE = "admin";

/**
 * Secret used to sign admin session cookies. It MUST be configured via ADMIN_AUTH_SECRET.
 *
 * There is deliberately no fallback: a hardcoded default would let anyone who reads the
 * source forge an admin session, and reusing another credential (e.g. the Supabase key)
 * couples unrelated secrets. When it is missing, signing throws and verification fails,
 * so admin login is simply unavailable until it is set.
 */
export function getAdminAuthSecret(): string {
  const secret = (process.env.ADMIN_AUTH_SECRET || "").trim().replace(/^['"]|['"]$/g, "");
  if (!secret) {
    throw new Error("ADMIN_AUTH_SECRET is not configured; admin authentication is disabled.");
  }
  if (secret.length < 32 && process.env.NODE_ENV === "production") {
    console.warn("[admin-auth] ADMIN_AUTH_SECRET is shorter than 32 characters; use a long random value.");
  }
  return secret;
}

export function isAdminAuthConfigured(): boolean {
  return Boolean((process.env.ADMIN_AUTH_SECRET || "").trim());
}
