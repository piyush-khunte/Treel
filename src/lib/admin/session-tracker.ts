import fs from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "admin-sessions.json");

// A session is "active" if seen within this many milliseconds
const ACTIVE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
// Prune sessions that haven't been seen for this long
const PRUNE_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface SessionEntry {
  id: string;
  username: string;
  loginAt: string;
  lastSeenAt: string;
}

interface SessionStore {
  totalLogins: number;
  todayLogins: number;
  lastResetDate: string;
  sessions: SessionEntry[];
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function readStore(): SessionStore {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      return { totalLogins: 0, todayLogins: 0, lastResetDate: todayISO(), sessions: [] };
    }
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as SessionStore;
  } catch {
    return { totalLogins: 0, todayLogins: 0, lastResetDate: todayISO(), sessions: [] };
  }
}

function writeStore(store: SessionStore): void {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("session-tracker write error:", err);
  }
}

export interface SessionStats {
  activeSessions: SessionEntry[];
  activeCount: number;
  totalLogins: number;
  todayLogins: number;
  allSessions: SessionEntry[];
}

export function recordHeartbeat(sessionId: string, username: string): SessionStats {
  const store = readStore();
  const now = new Date();
  const nowIso = now.toISOString();
  const today = todayISO();

  // Reset today counter if date rolled over
  if (store.lastResetDate !== today) {
    store.todayLogins = 0;
    store.lastResetDate = today;
  }

  // Prune stale sessions
  store.sessions = store.sessions.filter(
    (s) => now.getTime() - new Date(s.lastSeenAt).getTime() < PRUNE_AGE_MS
  );

  const existing = store.sessions.find((s) => s.id === sessionId);
  if (!existing) {
    // New session — count it
    store.sessions.push({ id: sessionId, username, loginAt: nowIso, lastSeenAt: nowIso });
    store.totalLogins += 1;
    store.todayLogins += 1;
  } else {
    existing.lastSeenAt = nowIso;
  }

  writeStore(store);
  return buildStats(store, now);
}

export function getStats(): SessionStats {
  const store = readStore();
  const now = new Date();
  return buildStats(store, now);
}

function buildStats(store: SessionStore, now: Date): SessionStats {
  const activeSessions = store.sessions.filter(
    (s) => now.getTime() - new Date(s.lastSeenAt).getTime() < ACTIVE_WINDOW_MS
  );
  return {
    activeSessions,
    activeCount: activeSessions.length,
    totalLogins: store.totalLogins,
    todayLogins: store.todayLogins,
    allSessions: [...store.sessions].reverse(),
  };
}
