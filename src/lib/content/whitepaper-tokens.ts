import crypto from "crypto";

interface WhitepaperTokenPayload {
  whitepaperId: string;
  email: string;
  exp: number; // Unix timestamp in ms
}

function getSigningSecret(): string {
  return (
    process.env.SESSION_SECRET ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXTAUTH_SECRET ||
    "treel-whitepaper-secure-signing-salt-2026-tmip"
  );
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf-8");
}

/**
 * Creates a signed, time-limited access token for whitepaper download and in-browser viewing.
 * Defaults to 48 hours validity.
 */
export function createWhitepaperAccessToken(
  whitepaperId: string,
  email: string,
  validityMs = 48 * 60 * 60 * 1000
): string {
  const payload: WhitepaperTokenPayload = {
    whitepaperId,
    email: email.trim().toLowerCase(),
    exp: Date.now() + validityMs,
  };

  const payloadStr = base64UrlEncode(JSON.stringify(payload));
  const secret = getSigningSecret();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadStr)
    .digest("hex");

  return `${payloadStr}.${signature}`;
}

/**
 * Verifies the validity, tamper resistance, and expiration of an access token.
 * Returns the decoded payload if valid, or null if tampered/expired.
 */
export function verifyWhitepaperAccessToken(
  token: string
): WhitepaperTokenPayload | null {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [payloadStr, signature] = parts;
  const secret = getSigningSecret();

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payloadStr)
    .digest("hex");

  // Constant-time comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const jsonStr = base64UrlDecode(payloadStr);
    const payload = JSON.parse(jsonStr) as WhitepaperTokenPayload;

    if (!payload.whitepaperId || !payload.exp) {
      return null;
    }

    if (Date.now() > payload.exp) {
      // Expired token
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
