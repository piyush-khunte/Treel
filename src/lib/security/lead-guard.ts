/**
 * Spam protection for public lead forms.
 *
 * 1. Honeypot: forms render a visually hidden "website" field that humans never fill.
 *    Bots that fill every input are given a fake success response and nothing is stored.
 * 2. Per-IP rate limit: at most MAX_PER_WINDOW submissions per form route per IP in WINDOW_MS.
 *
 * State is in memory (single-instance deployment) and resets on restart.
 */
import { NextResponse } from "next/server";

export const HONEYPOT_FIELD = "website";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;

const hits = new Map<string, number[]>();

export function getRequestIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}

/** Returns seconds to wait if the IP exceeded the limit for this route, otherwise 0 (and records the hit). */
export function consumeLeadRateLimit(route: string, ip: string): number {
  const now = Date.now();
  if (hits.size > 2000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
    }
  }
  const key = `${route}:${ip}`;
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return Math.max(1, Math.ceil((recent[0] + WINDOW_MS - now) / 1000));
  }
  recent.push(now);
  hits.set(key, recent);
  return 0;
}

export function isHoneypotFilled(body: Record<string, unknown> | null | undefined): boolean {
  if (!body) return false;
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Runs both checks. Returns a response to send back immediately when the request
 * should not be processed, or null when it may continue.
 */
export function guardLeadSubmission(
  route: string,
  headers: Headers,
  body: Record<string, unknown> | null | undefined
): NextResponse | null {
  if (isHoneypotFilled(body)) {
    // Pretend success so automated submitters get no signal.
    return NextResponse.json({ success: true });
  }
  const wait = consumeLeadRateLimit(route, getRequestIp(headers));
  if (wait > 0) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many submissions from your network. Please try again in ${Math.ceil(wait / 60)} minute(s) or call 1800 833 0233.`,
      },
      { status: 429, headers: { "Retry-After": String(wait) } }
    );
  }
  return null;
}
