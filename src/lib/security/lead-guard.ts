/**
 * Spam protection for public forms.
 *
 * 1. Honeypot: forms render a visually hidden "website" field that humans never fill.
 *    Bots that fill every input are given a fake success response and nothing is stored.
 * 2. Per-IP rate limit: at most MAX_PER_WINDOW submissions per form route per IP in WINDOW_MS.
 *
 * Counters use the shared store in ./rate-limit (Redis when configured, memory otherwise),
 * and the client IP comes from platform-set headers, not the spoofable first X-Forwarded-For hop.
 */
import { NextResponse } from "next/server";
import { consumeRateLimit, getClientIp } from "./rate-limit";

export const HONEYPOT_FIELD = "website";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;

export function getRequestIp(headers: Headers): string {
  return getClientIp(headers);
}

/** Returns seconds to wait if the IP exceeded the limit for this route, otherwise 0 (and records the hit). */
export async function consumeLeadRateLimit(route: string, ip: string): Promise<number> {
  return consumeRateLimit(`lead:${route}:${ip}`, MAX_PER_WINDOW, WINDOW_MS);
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
export async function guardLeadSubmission(
  route: string,
  headers: Headers,
  body: Record<string, unknown> | null | undefined
): Promise<NextResponse | null> {
  if (isHoneypotFilled(body)) {
    // Pretend success so automated submitters get no signal.
    return NextResponse.json({ success: true });
  }
  const wait = await consumeLeadRateLimit(route, getRequestIp(headers));
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
