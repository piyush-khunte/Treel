/**
 * In-memory brute-force protection for the admin login.
 * Locks a client IP or a username after repeated failed attempts.
 * State lives in the server process (single-instance deployment); it resets on restart.
 */

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000; // failures counted within 15 minutes
const LOCK_MS = 15 * 60 * 1000; // lockout duration

type Entry = { failures: number; firstFailureAt: number; lockedUntil: number };

const attempts = new Map<string, Entry>();

function keysFor(ip: string, username: string): string[] {
  const keys = [`ip:${ip || "unknown"}`];
  const user = (username || "").trim().toLowerCase();
  if (user) keys.push(`user:${user}`);
  return keys;
}

function prune(now: number): void {
  if (attempts.size < 1000) return;
  for (const [key, entry] of attempts) {
    if (entry.lockedUntil < now && now - entry.firstFailureAt > WINDOW_MS) attempts.delete(key);
  }
}

/** Returns seconds remaining if the IP or username is locked, otherwise 0. */
export function getLoginLockSeconds(ip: string, username: string): number {
  const now = Date.now();
  let remaining = 0;
  for (const key of keysFor(ip, username)) {
    const entry = attempts.get(key);
    if (entry && entry.lockedUntil > now) {
      remaining = Math.max(remaining, Math.ceil((entry.lockedUntil - now) / 1000));
    }
  }
  return remaining;
}

export function recordLoginFailure(ip: string, username: string): void {
  const now = Date.now();
  prune(now);
  for (const key of keysFor(ip, username)) {
    const entry = attempts.get(key);
    if (!entry || now - entry.firstFailureAt > WINDOW_MS) {
      attempts.set(key, { failures: 1, firstFailureAt: now, lockedUntil: 0 });
      continue;
    }
    entry.failures += 1;
    if (entry.failures >= MAX_FAILURES) entry.lockedUntil = now + LOCK_MS;
  }
}

export function clearLoginFailures(ip: string, username: string): void {
  for (const key of keysFor(ip, username)) attempts.delete(key);
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
