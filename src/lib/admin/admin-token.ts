import { AUTH_SECRET } from "./admin-constants";

export interface AdminSession {
  username: string;
  role: string;
  iat: number;
  exp: number;
}

function base64UrlEncode(str: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "utf-8").toString("base64url");
  }
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "base64url").toString("utf-8");
  }
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return decodeURIComponent(escape(atob(base64)));
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getCryptoKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    encoder.encode(AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Signs an admin session object into an Edge/Node-compatible signed token.
 */
export async function signSessionToken(session: AdminSession): Promise<string> {
  const payload = base64UrlEncode(JSON.stringify(session));
  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  const signature = arrayBufferToBase64Url(signatureBuffer);
  return `${payload}.${signature}`;
}

/**
 * Verifies a signed session token using Web Crypto API.
 */
export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }

  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const key = await getCryptoKey();
    
    // Decode base64url signature to Uint8Array
    let sigBase64 = signature.replace(/-/g, "+").replace(/_/g, "/");
    while (sigBase64.length % 4) {
      sigBase64 += "=";
    }
    const sigBinary = atob(sigBase64);
    const sigBytes = new Uint8Array(sigBinary.length);
    for (let i = 0; i < sigBinary.length; i++) {
      sigBytes[i] = sigBinary.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(payload)
    );

    if (!isValid) return null;

    const jsonStr = base64UrlDecode(payload);
    const decoded = JSON.parse(jsonStr) as AdminSession;
    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < now) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
