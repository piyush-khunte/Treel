/**
 * Fixed-window rate limiting shared by public forms, lookups and the admin login.
 *
 * Storage:
 * - If Upstash Redis REST credentials are configured (UPSTASH_REDIS_REST_URL +
 *   UPSTASH_REDIS_REST_TOKEN, or the Vercel KV names KV_REST_API_URL + KV_REST_API_TOKEN),
 *   counters are shared across every serverless instance.
 * - Otherwise counters live in process memory (per instance, reset on cold start).
 *   That still stops naive abuse, but configure Redis for real protection.
 *
 * Any Redis error falls back to memory so a Redis outage never blocks customers.
 */

type Counter = { count: number; resetAt: number };

const memory = new Map<string, Counter>();

function redisConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function redisPipeline(commands: (string | number)[][]): Promise<unknown[] | null> {
  const cfg = redisConfig();
  if (!cfg) return null;
  try {
    const res = await fetch(`${cfg.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ result?: unknown; error?: string }>;
    if (!Array.isArray(data) || data.some((d) => d.error)) return null;
    return data.map((d) => d.result);
  } catch {
    return null;
  }
}

function pruneMemory(now: number) {
  if (memory.size < 5000) return;
  for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
}

/** Increments the counter for `key` and returns its value and remaining window. */
async function increment(key: string, windowMs: number): Promise<{ count: number; ttlMs: number }> {
  const redisKey = `rl:${key}`;
  const result = await redisPipeline([
    ["INCR", redisKey],
    ["PEXPIRE", redisKey, windowMs, "NX"],
    ["PTTL", redisKey],
  ]);
  if (result) {
    const count = Number(result[0]) || 0;
    const ttl = Number(result[2]);
    return { count, ttlMs: ttl > 0 ? ttl : windowMs };
  }

  const now = Date.now();
  pruneMemory(now);
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowMs });
    return { count: 1, ttlMs: windowMs };
  }
  entry.count += 1;
  return { count: entry.count, ttlMs: entry.resetAt - now };
}

/** Reads the counter for `key` without changing it. */
export async function peekCount(key: string): Promise<{ count: number; ttlMs: number }> {
  const redisKey = `rl:${key}`;
  const result = await redisPipeline([["GET", redisKey], ["PTTL", redisKey]]);
  if (result) {
    const ttl = Number(result[1]);
    return { count: Number(result[0]) || 0, ttlMs: ttl > 0 ? ttl : 0 };
  }
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) return { count: 0, ttlMs: 0 };
  return { count: entry.count, ttlMs: entry.resetAt - now };
}

/** Increments a counter without enforcing a limit (e.g. recording a failed login). */
export async function incrementCount(key: string, windowMs: number): Promise<number> {
  return (await increment(key, windowMs)).count;
}

export async function resetCount(key: string): Promise<void> {
  memory.delete(key);
  await redisPipeline([["DEL", `rl:${key}`]]);
}

/**
 * Records a hit for `key`. Returns 0 when allowed, otherwise the number of seconds
 * until the window resets.
 */
export async function consumeRateLimit(key: string, max: number, windowMs: number): Promise<number> {
  const { count, ttlMs } = await increment(key, windowMs);
  if (count <= max) return 0;
  return Math.max(1, Math.ceil(ttlMs / 1000));
}

/**
 * Client IP for rate limiting. Uses headers set by the hosting platform, which clients
 * cannot override, instead of the first X-Forwarded-For value (client-controlled).
 *  - x-vercel-forwarded-for / x-real-ip: set by Vercel's edge to the connecting client.
 *  - Otherwise the LAST X-Forwarded-For hop (appended by the nearest proxy).
 */
export function getClientIp(headers: Headers): string {
  const vercel = headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercel) return vercel;
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded.split(",").map((h) => h.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return "unknown";
}
