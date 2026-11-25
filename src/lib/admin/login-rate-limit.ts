/**
 * Brute-force protection for the admin login.
 *
 * - Per IP: 5 failures within 15 minutes locks that IP for the rest of the window.
 * - Per username: 20 failures within 15 minutes locks the username. The higher threshold
 *   means a single client (locked at 5) can't lock a real admin out on its own.
 *
 * Counters use the shared store in @/lib/security/rate-limit (Redis when configured), and
 * the IP comes from platform-set headers rather than the spoofable X-Forwarded-For value.
 */
import { getClientIp as getTrustedClientIp, incrementCount, peekCount, resetCount } from "@/lib/security/rate-limit";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_IP = 5;
const MAX_FAILURES_PER_USER = 20;

function ipKey(ip: string) {
  return `login:ip:${ip || "unknown"}`;
}
function userKey(username: string) {
  const user = (username || "").trim().toLowerCase();
  return user ? `login:user:${user}` : null;
}

/** Returns seconds remaining if the IP or username is locked, otherwise 0. */
export async function getLoginLockSeconds(ip: string, username: string): Promise<number> {
  let remaining = 0;
  const ipState = await peekCount(ipKey(ip));
  if (ipState.count >= MAX_FAILURES_PER_IP) remaining = Math.max(remaining, Math.ceil(ipState.ttlMs / 1000));
  const uKey = userKey(username);
  if (uKey) {
    const userState = await peekCount(uKey);
    if (userState.count >= MAX_FAILURES_PER_USER) remaining = Math.max(remaining, Math.ceil(userState.ttlMs / 1000));
  }
  return remaining;
}

export async function recordLoginFailure(ip: string, username: string): Promise<void> {
  await incrementCount(ipKey(ip), WINDOW_MS);
  const uKey = userKey(username);
  if (uKey) await incrementCount(uKey, WINDOW_MS);
}

export async function clearLoginFailures(ip: string, username: string): Promise<void> {
  await resetCount(ipKey(ip));
  const uKey = userKey(username);
  if (uKey) await resetCount(uKey);
}

export function getClientIp(headers: Headers): string {
  return getTrustedClientIp(headers);
}
