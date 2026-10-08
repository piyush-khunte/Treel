"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
      });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer disabled:opacity-50 text-left"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>{loading ? "Signing out..." : "Log Out of Console"}</span>
    </button>
  );
}
