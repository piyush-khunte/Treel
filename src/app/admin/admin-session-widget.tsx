"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Activity,
  Users,
  LogIn,
  Clock,
  ChevronDown,
  X,
  Shield,
  Calendar,
  Timer,
} from "lucide-react";

interface SessionEntry {
  id: string;
  username: string;
  loginAt: string;
  lastSeenAt: string;
}

interface PulseData {
  sessionId: string;
  username: string;
  loginAt: string;
  sessionExp: string;
  activeSessions: SessionEntry[];
  activeCount: number;
  totalLogins: number;
  todayLogins: number;
  allSessions: SessionEntry[];
}

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 10) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function sessionAge(loginAt: string): string {
  const diff = Date.now() - new Date(loginAt).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "< 1 min";
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ${m % 60}m`;
  return `${Math.floor(h / 24)}d`;
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

const PULSE_INTERVAL = 60_000; // 60 seconds

export function AdminSessionWidget() {
  const [data, setData] = useState<PulseData | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [now, setNow] = useState(Date.now());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchPulse = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session-pulse", { cache: "no-store" });
      if (!res.ok) { setError(true); return; }
      const json = await res.json();
      setData(json);
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  // Initial fetch + interval
  useEffect(() => {
    fetchPulse();
    const id = setInterval(fetchPulse, PULSE_INTERVAL);
    return () => clearInterval(id);
  }, [fetchPulse]);

  // Live clock for relative times
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  void now; // consumed to trigger re-render for relative times

  const active = data?.activeCount ?? 0;

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger pill */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all select-none ${
          error
            ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
            : active > 0
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
            : "border-slate-700 bg-slate-800/60 text-slate-400 hover:bg-slate-800"
        }`}
        title="Admin session activity"
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          {active > 0 && !error && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              error ? "bg-rose-500" : active > 0 ? "bg-emerald-400" : "bg-slate-500"
            }`}
          />
        </span>

        <span className="font-semibold">
          {error ? "Offline" : data == null ? "…" : `Active ${active}`}
        </span>

        {data && (
          <>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{data.todayLogins} today</span>
          </>
        )}

        <ChevronDown
          className={`w-3 h-3 transition-transform text-slate-500 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/60 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-200">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Session Activity
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 divide-x divide-slate-800 border-b border-slate-800">
            <div className="px-3 py-3 text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <Users className="w-3 h-3" /> Active
              </div>
              <div className="text-xl font-bold text-emerald-400 leading-none">
                {data?.activeCount ?? "–"}
              </div>
            </div>

            <div className="px-3 py-3 text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <Calendar className="w-3 h-3" /> Today
              </div>
              <div className="text-xl font-bold text-blue-400 leading-none">
                {data?.todayLogins ?? "–"}
              </div>
            </div>

            <div className="px-3 py-3 text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                <LogIn className="w-3 h-3" /> Total
              </div>
              <div className="text-xl font-bold text-purple-400 leading-none">
                {data?.totalLogins ?? "–"}
              </div>
            </div>
          </div>

          {/* Current session info */}
          {data && (
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/40 space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" /> Your Session
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white font-mono">{data.username}</span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  admin
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Logged in {sessionAge(data.loginAt)} ago
                </span>
                <span className="text-slate-600">·</span>
                <span>{formatDate(data.loginAt)} {formatTime(data.loginAt)}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <Timer className="w-3 h-3" />
                Session expires {new Date(data.sessionExp).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} at {formatTime(data.sessionExp)}
              </div>
            </div>
          )}

          {/* Active sessions list */}
          <div className="px-4 py-3 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Currently Active
              </span>
              <span className="text-slate-600">(5-min window)</span>
            </div>

            {data == null ? (
              <div className="text-xs text-slate-500 font-mono py-1">Loading…</div>
            ) : data.activeSessions.length === 0 ? (
              <div className="text-xs text-slate-500 font-mono py-1">No active sessions</div>
            ) : (
              <div className="space-y-1.5">
                {data.activeSessions.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-slate-800/50 border border-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[9px] font-bold text-emerald-400 uppercase">
                        {s.username.slice(0, 1)}
                      </div>
                      <span className="text-xs font-mono text-slate-200">{s.username}</span>
                      {s.id === data.sessionId && (
                        <span className="text-[9px] font-mono text-blue-400 bg-blue-500/15 border border-blue-500/30 px-1 py-0.5 rounded">
                          you
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {timeAgo(s.lastSeenAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent sessions history */}
          {data && data.allSessions.length > 0 && (
            <div className="px-4 pb-3 space-y-2 border-t border-slate-800 pt-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Recent Sessions (24h)
              </div>
              <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                {data.allSessions.slice(0, 8).map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between text-[11px] font-mono text-slate-400"
                  >
                    <span className="text-slate-300">{s.username}</span>
                    <span className="text-slate-500 text-[10px]">
                      {formatDate(s.loginAt)} {formatTime(s.loginAt)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer refresh hint */}
          <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/40">
            <button
              onClick={fetchPulse}
              className="text-[10px] font-mono text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <Activity className="w-3 h-3" /> Refresh · auto-updates every 60s
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
