"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  AlertTriangle, 
  RefreshCw, 
  Lock, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Copy,
  Check,
  X,
  Globe,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminCookieConsents } from "@/lib/admin/admin-actions";
import { AdminConsentRecord } from "@/types/admin";
import { copyToClipboardSafe } from "@/lib/utils/clipboard";

export default function AdminConsentsPage() {
  const [records, setRecords] = useState<AdminConsentRecord[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    customized: 0,
    withdrawn: 0,
    analyticsCount: 0,
    marketingCount: 0,
    functionalCount: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Filters & Search
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<{
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  }>({
    analytics: false,
    marketing: false,
    functional: false,
  });
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  // Selected Record Modal
  const [selectedRecord, setSelectedRecord] = useState<AdminConsentRecord | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchConsents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminCookieConsents();
      if (res.success && res.data) {
        setRecords(res.data);
        if (res.stats) {
          setStats({
            total: res.stats.total,
            accepted: res.stats.accepted,
            rejected: res.stats.rejected,
            customized: res.stats.customized,
            withdrawn: res.stats.withdrawn,
            analyticsCount: res.stats.analyticsCount || 0,
            marketingCount: res.stats.marketingCount || 0,
            functionalCount: res.stats.functionalCount || 0,
          });
        }
      } else {
        setError(res.error || "Failed to load consent records.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred while fetching consent data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsents();
  }, []);

  const handleRefresh = () => {
    startTransition(() => {
      fetchConsents();
    });
  };

  const copyToClipboard = async (text: string, id: string) => {
    const res = await copyToClipboardSafe(text);
    if (res.success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Filtered & Sorted records
  const filteredRecords = useMemo(() => {
    return records
      .filter((item) => {
        // Search
        const q = search.trim().toLowerCase();
        if (q) {
          const matchId = item.consentId?.toLowerCase().includes(q);
          const matchPage = item.pagePath?.toLowerCase().includes(q);
          const matchSource = item.source?.toLowerCase().includes(q);
          if (!matchId && !matchPage && !matchSource) return false;
        }

        // Status Filter
        if (statusFilter !== "ALL") {
          if (item.status.toUpperCase() !== statusFilter.toUpperCase()) {
            return false;
          }
        }

        // Category Filter
        if (categoryFilter.analytics && !item.rawCategories?.analytics) return false;
        if (categoryFilter.marketing && !item.rawCategories?.marketing) return false;
        if (categoryFilter.functional && !item.rawCategories?.functional) return false;

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
      });
  }, [records, search, statusFilter, categoryFilter, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  const hasActiveFilters = search || statusFilter !== "ALL" || categoryFilter.analytics || categoryFilter.marketing || categoryFilter.functional;

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setCategoryFilter({ analytics: false, marketing: false, functional: false });
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
              PRIVACY &amp; COMPLIANCE
            </span>
            <span className="text-xs font-mono text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-400">Policy v2026-10-01</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Cookie Consent Records</h1>
          <p className="text-slate-400 text-sm mt-1">
            Immutable audit trail of anonymous visitor consent decisions and telemetry permissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={loading || isPending}
            className="border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-xs font-medium gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading || isPending ? "animate-spin text-emerald-400" : ""}`} />
            Refresh Records
          </Button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start justify-between gap-3 text-sm">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-200">Unable to load consent records</p>
              <p className="text-xs text-rose-300/80 mt-0.5">{error}</p>
            </div>
          </div>
          <Button
            onClick={fetchConsents}
            variant="outline"
            size="sm"
            className="text-xs h-7 px-3 border-rose-500/30 text-rose-200 hover:bg-rose-500/20 shrink-0"
          >
            Retry
          </Button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Recorded</div>
          <div className="text-2xl font-bold text-white mt-1.5">{stats.total}</div>
          <div className="text-[11px] text-slate-500 mt-1">Decisions logged</div>
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
          <div className="text-[11px] text-slate-500 mt-1">Granular authorization</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 col-span-2 md:col-span-1">
          <div className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Withdrawn
          </div>
          <div className="text-2xl font-bold text-rose-400 mt-1.5">{stats.withdrawn}</div>
          <div className="text-[11px] text-slate-500 mt-1">Revoked permissions</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Consent ID, page path, or source…"
              className="pl-9 bg-slate-950/60 border-slate-800 text-xs text-white placeholder:text-slate-500 h-9 rounded-lg focus-visible:ring-emerald-500"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {["ALL", "ACCEPTED", "REJECTED", "CUSTOMIZED", "WITHDRAWN"].map((st) => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer ${
                  statusFilter === st
                    ? "bg-slate-800 text-emerald-400 border border-slate-700 shadow-xs"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                {st === "ALL" ? "All Decisions" : st === "ACCEPTED" ? "Accepted All" : st === "REJECTED" ? "Essential Only" : st === "CUSTOMIZED" ? "Customized" : "Withdrawn"}
              </button>
            ))}
          </div>

          {/* Sort Order */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 self-end lg:self-center">
            <span>Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-slate-950/60 border border-slate-800 rounded px-2.5 py-1 text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Category Filter Badges */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-800/60 text-xs">
          <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-slate-400" /> Filter by Category:
          </span>

          <button
            type="button"
            onClick={() => {
              setCategoryFilter((prev) => ({ ...prev, analytics: !prev.analytics }));
              setCurrentPage(1);
            }}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
              categoryFilter.analytics
                ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                : "bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700"
            }`}
          >
            Analytics Permitted
          </button>

          <button
            type="button"
            onClick={() => {
              setCategoryFilter((prev) => ({ ...prev, marketing: !prev.marketing }));
              setCurrentPage(1);
            }}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
              categoryFilter.marketing
                ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                : "bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700"
            }`}
          >
            Marketing Permitted
          </button>

          <button
            type="button"
            onClick={() => {
              setCategoryFilter((prev) => ({ ...prev, functional: !prev.functional }));
              setCurrentPage(1);
            }}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
              categoryFilter.functional
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700"
            }`}
          >
            Functional Permitted
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-rose-400 hover:underline ml-auto cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Audit Records Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Digital Consent Audit Trail</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Demonstrates compliance with statutory privacy regulations without collecting personal identifiers.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
              {filteredRecords.length} of {records.length} Records
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/40 text-xs font-mono uppercase text-slate-400 tracking-wider">
                <th className="py-4 px-6">Anonymous Consent ID</th>
                <th className="py-4 px-6">Decision &amp; Status</th>
                <th className="py-4 px-6">Category Permissions</th>
                <th className="py-4 px-6">Source &amp; Path</th>
                <th className="py-4 px-6">Timestamp (IST)</th>
                <th className="py-4 px-6">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-400 font-mono text-xs">
                    <RefreshCw className="w-5 h-5 animate-spin text-emerald-400 mx-auto mb-2" />
                    Loading verified consent records…
                  </td>
                </tr>
              ) : paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-500 font-mono text-xs space-y-2">
                    <p className="text-slate-400 font-semibold text-sm">No consent records found</p>
                    <p className="text-xs text-slate-500">
                      {hasActiveFilters
                        ? "No records match the active search or category filters."
                        : "No visitor consent decisions have been recorded yet."}
                    </p>
                    {hasActiveFilters && (
                      <div className="pt-2">
                        <Button
                          onClick={resetFilters}
                          variant="outline"
                          size="sm"
                          className="text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((item) => (
                  <tr 
                    key={item.id || item.consentId} 
                    className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedRecord(item)}
                  >
                    {/* Consent ID */}
                    <td className="py-4 px-6 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-800/80 px-2 py-1 rounded border border-slate-700/60 text-[#D5573B] font-semibold">
                          {item.consentId}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(item.consentId, item.id || item.consentId);
                          }}
                          className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                          title="Copy ID"
                        >
                          {copiedId === (item.id || item.consentId) ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Status & Decision */}
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
                        {item.status === "Accepted" && <CheckCircle2 className="w-3 h-3" />}
                        {item.status === "Rejected" && <XCircle className="w-3 h-3" />}
                        {item.status === "Customized" && <Sliders className="w-3 h-3" />}
                        {item.status === "Withdrawn" && <AlertTriangle className="w-3 h-3" />}
                        {item.decision || item.status}
                      </span>
                    </td>

                    {/* Categories Badges */}
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          Essential
                        </span>

                        {item.rawCategories?.analytics ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                            Analytics
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 line-through bg-slate-950/40 border border-slate-800">
                            Analytics
                          </span>
                        )}

                        {item.rawCategories?.marketing ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                            Marketing
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 line-through bg-slate-950/40 border border-slate-800">
                            Marketing
                          </span>
                        )}

                        {item.rawCategories?.functional ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            Functional
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 line-through bg-slate-950/40 border border-slate-800">
                            Functional
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Source & Path */}
                    <td className="py-4 px-6 text-xs text-slate-400">
                      <div className="space-y-0.5">
                        <div className="text-slate-200 font-medium flex items-center gap-1">
                          <Globe className="w-3 h-3 text-slate-500" />
                          {item.source || "Cookie Banner"}
                        </div>
                        <div className="font-mono text-[11px] text-slate-500 truncate max-w-[150px]">
                          {item.pagePath || "/"}
                        </div>
                      </div>
                    </td>

                    {/* Timestamp */}
                    <td className="py-4 px-6 text-xs font-mono text-slate-400 whitespace-nowrap">
                      <div>{item.formattedDate}</div>
                      {item.withdrawnAt && (
                        <div className="text-rose-400 text-[11px] mt-0.5 flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5" /> Revoked
                        </div>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(item);
                        }}
                        className="text-slate-400 hover:text-emerald-400 text-xs font-mono underline underline-offset-2 cursor-pointer"
                      >
                        Inspect Audit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="h-8 px-2.5 border-slate-800 bg-slate-950/40 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded text-xs font-mono transition-colors cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="h-8 px-2.5 border-slate-800 bg-slate-950/40 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Audit Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-[#141B22] border border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#FAF7F2] relative"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-semibold mb-1">
                  CONSENT AUDIT RECORD
                </div>
                <h3 className="font-fraunces text-2xl font-medium text-white leading-tight">
                  {selectedRecord.consentId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Decision:</span>
                  <span className="text-emerald-400 font-bold">{selectedRecord.decision} ({selectedRecord.status})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Policy Version:</span>
                  <span className="text-slate-200">{selectedRecord.policyVersion}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Action Source:</span>
                  <span className="text-slate-200">{selectedRecord.source || "Cookie Banner"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Page Route:</span>
                  <span className="text-slate-200">{selectedRecord.pagePath || "/"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Timestamp (UTC):</span>
                  <span className="text-slate-300">{selectedRecord.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Timestamp (IST):</span>
                  <span className="text-slate-300">{selectedRecord.formattedDate}</span>
                </div>
                {selectedRecord.withdrawnAt && (
                  <div className="flex items-center justify-between text-rose-400">
                    <span>Withdrawn At:</span>
                    <span>{selectedRecord.withdrawnAt}</span>
                  </div>
                )}
              </div>

              {/* Category Breakdown */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-slate-400 uppercase text-[10px] tracking-wider font-semibold mb-1">
                  Category Status Map
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span>Strictly Necessary</span>
                    <span className="text-emerald-400 font-bold">GRANTED</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span>Functional</span>
                    <span className={selectedRecord.rawCategories.functional ? "text-emerald-400 font-bold" : "text-slate-500"}>
                      {selectedRecord.rawCategories.functional ? "GRANTED" : "DENIED"}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span>Analytics</span>
                    <span className={selectedRecord.rawCategories.analytics ? "text-emerald-400 font-bold" : "text-slate-500"}>
                      {selectedRecord.rawCategories.analytics ? "GRANTED" : "DENIED"}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span>Marketing</span>
                    <span className={selectedRecord.rawCategories.marketing ? "text-emerald-400 font-bold" : "text-slate-500"}>
                      {selectedRecord.rawCategories.marketing ? "GRANTED" : "DENIED"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-white/[0.08]">
              <Button
                onClick={() => setSelectedRecord(null)}
                variant="outline"
                size="sm"
                className="text-xs border-slate-700 bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
              >
                Close Audit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
