"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/admin";

  const [username, setUsername] = useState("TreelEcosystem@332");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(nextUrl);
        router.refresh();
      } else {
        setError(data.error || "Invalid username or password.");
        setLoading(false);
      }
    } catch {
      setError("Network error occurred while connecting to authentication server.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-xl shadow-lg shadow-emerald-500/5">
          TR
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Treel Back-Office</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">Operations & Management Console</p>
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-4">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Administrator Authentication</span>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-mono font-medium text-slate-300">
              Username / Identifier
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                placeholder="TreelEcosystem@332"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter administrator password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Verifying Credentials..." : "Sign In to Console"}
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit Encrypted
          </span>
          <span>Role: Administrator</span>
        </div>
      </div>

      {/* Back Link */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Site
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 text-slate-100 font-sans selection:bg-emerald-500/30">
      <Suspense fallback={
        <div className="text-center font-mono text-xs text-slate-500">
          Loading Console Authentication...
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
