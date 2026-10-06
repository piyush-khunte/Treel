import React from "react";
import { getAdminCookieConsents } from "@/lib/admin/admin-actions";
import { ShieldCheck, CheckCircle2, XCircle, Sliders, AlertTriangle, RefreshCw, Lock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminConsentsPage() {
  const { data: consents = [], stats = { total: 0, accepted: 0, rejected: 0, customized: 0, withdrawn: 0 } } =
    await getAdminCookieConsents();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
              PRIVACY & COMPLIANCE
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Cookie Consent Records</h1>
          <p className="text-slate-400 text-sm mt-1">
            Immutable audit trail of anonymous visitor consent and telemetry preferences.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Recorded</div>
          <div className="text-2xl font-bold text-white mt-1.5">{stats.total}</div>
          <div className="text-[11px] text-slate-500 mt-1">Consent decisions</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Accepted All
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-1.5">{stats.accepted}</div>
          <div className="text-[11px] text-slate-500 mt-1">Full telemetry authorized</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5 text-slate-400" /> Essential Only
          </div>
          <div className="text-2xl font-bold text-slate-200 mt-1.5">{stats.rejected}</div>
          <div className="text-[11px] text-slate-500 mt-1">Non-essential blocked</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" /> Customized
          </div>
          <div className="text-2xl font-bold text-cyan-400 mt-1.5">{stats.customized}</div>
          <div className="text-[11px] text-slate-500 mt-1">Granular selection</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 col-span-2 md:col-span-1">
          <div className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Withdrawn
          </div>
          <div className="text-2xl font-bold text-rose-400 mt-1.5">{stats.withdrawn}</div>
          <div className="text-[11px] text-slate-500 mt-1">Consent revoked</div>
        </div>
      </div>

      {/* Audit Records Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Digital Consent Audit Trail</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Demonstrates compliance with DPDP &amp; GDPR privacy requirements without storing personal identifiers.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            Policy v2026-10-01
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/40 text-xs font-mono uppercase text-slate-400 tracking-wider">
                <th className="py-4 px-6">Anonymous Consent ID</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Authorized Categories</th>
                <th className="py-4 px-6">Policy Version</th>
                <th className="py-4 px-6">Timestamp (IST)</th>
                <th className="py-4 px-6">Withdrawn Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300">
              {consents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono text-xs">
                    No remote consent records found yet. New visitor decisions will appear here automatically.
                  </td>
                </tr>
              ) : (
                consents.map((item) => (
                  <tr key={item.id || item.consentId} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-200">
                      <span className="bg-slate-800/80 px-2 py-1 rounded border border-slate-700/60 text-[#D5573B] font-semibold">
                        {item.consentId}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Accepted"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : item.status === "Rejected"
                            ? "bg-slate-800 text-slate-300 border border-slate-700"
                            : item.status === "Customized"
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-300">
                      {item.categories}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">
                      {item.policyVersion}
                    </td>
                    <td className="py-4 px-6 text-xs font-mono text-slate-400 whitespace-nowrap">
                      {item.formattedDate}
                    </td>
                    <td className="py-4 px-6 text-xs font-mono text-slate-400 whitespace-nowrap">
                      {item.withdrawnAt ? (
                        <span className="text-rose-400">
                          {new Date(item.withdrawnAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "Asia/Kolkata",
                          })}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
