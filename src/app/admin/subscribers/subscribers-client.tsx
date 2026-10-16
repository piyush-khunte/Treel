"use client";

import { useState, useMemo } from "react";
import { 
  InsightSubscriberRecord, 
  BroadcastNotificationRecord,
  TreelInsightArticle 
} from "@/types/content";
import { 
  getAdminSubscribersAction,
  unsubscribeAdminSubscriberAction,
  deleteAdminSubscriberAction,
  sendAdminTestBroadcastAction,
  triggerAdminBroadcastAction
} from "@/lib/admin/admin-actions";
import { 
  Mail, 
  Users, 
  Send, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  RefreshCw, 
  Trash2, 
  Copy, 
  X,
  Radio
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface AdminSubscribersClientProps {
  initialSubscribers: InsightSubscriberRecord[];
  initialBroadcasts: BroadcastNotificationRecord[];
  publishedInsights: TreelInsightArticle[];
}

export function AdminSubscribersClient({
  initialSubscribers,
  initialBroadcasts,
  publishedInsights,
}: AdminSubscribersClientProps) {
  const [subscribers, setSubscribers] = useState<InsightSubscriberRecord[]>(initialSubscribers);
  const [broadcasts, setBroadcasts] = useState<BroadcastNotificationRecord[]>(initialBroadcasts);
  const [activeTab, setActiveTab] = useState<"subscribers" | "broadcasts">("subscribers");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "unsubscribed">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Test Broadcast Modal State
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>(
    publishedInsights[0]?.slug || ""
  );
  const [testEmail, setTestEmail] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; details?: any } | null>(null);

  // Details Modal State for Delivery Logs
  const [selectedBroadcast, setSelectedBroadcast] = useState<BroadcastNotificationRecord | null>(null);

  // Copied token state
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const reloadData = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminSubscribersAction();
      if (res.success && res.data) {
        setSubscribers(res.data.subscribers);
        setBroadcasts(res.data.broadcasts);
      }
    } catch (err) {
      console.error("Failed to reload subscribers data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async (sub: InsightSubscriberRecord) => {
    if (!confirm(`Are you sure you want to unsubscribe ${sub.email}?`)) return;
    setIsLoading(true);
    try {
      const res = await unsubscribeAdminSubscriberAction({ token: sub.token, email: sub.email });
      if (res.success) {
        setActionMessage({ type: "success", text: `${sub.email} has been unsubscribed.` });
        await reloadData();
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to unsubscribe." });
      }
    } catch {
      setActionMessage({ type: "error", text: "Error executing unsubscribe action." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (sub: InsightSubscriberRecord) => {
    if (!confirm(`Permanently delete subscriber record for ${sub.email}? This cannot be undone.`)) return;
    setIsLoading(true);
    try {
      const res = await deleteAdminSubscriberAction(sub._id);
      if (res.success) {
        setActionMessage({ type: "success", text: `${sub.email} record deleted.` });
        await reloadData();
      } else {
        setActionMessage({ type: "error", text: res.error || "Failed to delete record." });
      }
    } catch {
      setActionMessage({ type: "error", text: "Error deleting subscriber." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTestBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArticleSlug || !testEmail.trim()) return;

    setIsSendingTest(true);
    setTestResult(null);
    try {
      const res = await sendAdminTestBroadcastAction(selectedArticleSlug, testEmail.trim());
      if (res.success) {
        setTestResult({
          success: true,
          message: res.message || `Test notification sent successfully to ${testEmail}.`,
          details: res.data,
        });
      } else {
        setTestResult({
          success: false,
          message: res.error || "Test dispatch failed.",
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "Unexpected exception during test dispatch.",
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleForceBroadcast = async (slug: string) => {
    if (!confirm(`Dispatch live broadcast for "${slug}" to all confirmed subscribers?`)) return;
    setIsLoading(true);
    try {
      const res = await triggerAdminBroadcastAction(slug, true);
      if (res.success) {
        setActionMessage({ type: "success", text: res.message || "Broadcast successfully dispatched." });
        await reloadData();
      } else {
        setActionMessage({ type: "error", text: res.error || "Broadcast failed." });
      }
    } catch {
      setActionMessage({ type: "error", text: "Error triggering broadcast." });
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((s) => {
      const matchesSearch =
        searchQuery === "" ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.source.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || s.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [subscribers, searchQuery, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = subscribers.length;
    const active = subscribers.filter((s) => s.status === "confirmed").length;
    const unsubscribed = subscribers.filter((s) => s.status === "unsubscribed").length;
    const totalBroadcasts = broadcasts.length;
    return { total, active, unsubscribed, totalBroadcasts };
  }, [subscribers, broadcasts]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Mail className="w-4 h-4" /> Global Audience &amp; Notifications
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Insights Subscribers &amp; Email Broadcasts
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Amazon SES integration for new content notifications and unified subscriber list management.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={reloadData}
            disabled={isLoading}
            className="border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            onClick={() => {
              setIsTestModalOpen(true);
              setTestResult(null);
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-lg shadow-rose-950/40 cursor-pointer text-xs"
          >
            <Send className="w-3.5 h-3.5 mr-2" />
            Send Test Broadcast
          </Button>
        </div>
      </div>

      {/* Notification Banner */}
      {actionMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-sm animate-in fade-in duration-200 ${
            actionMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-slate-900/60 border-slate-800 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
              Total Subscribers
            </span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-white">
            {stats.total}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Across insights, blog, and events
          </div>
        </Card>

        <Card className="p-5 bg-slate-900/60 border-slate-800 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium">
              Active / Confirmed
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
            {stats.active}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Eligible for automatic notifications
          </div>
        </Card>

        <Card className="p-5 bg-slate-900/60 border-slate-800 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-medium">
              Unsubscribed
            </span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-rose-400">
            {stats.unsubscribed}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Opted out via 1-click token
          </div>
        </Card>

        <Card className="p-5 bg-slate-900/60 border-slate-800 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-medium">
              Broadcast Events
            </span>
            <Radio className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-purple-400">
            {stats.totalBroadcasts}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Publication dispatch records
          </div>
        </Card>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === "subscribers"
              ? "bg-slate-800 text-white font-semibold"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <Users className="w-4 h-4 text-emerald-400" />
          <span>Subscribers ({stats.total})</span>
        </button>

        <button
          onClick={() => setActiveTab("broadcasts")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === "broadcasts"
              ? "bg-slate-800 text-white font-semibold"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <Radio className="w-4 h-4 text-purple-400" />
          <span>Broadcast History &amp; Logs ({stats.totalBroadcasts})</span>
        </button>
      </div>

      {/* TAB 1: SUBSCRIBERS LIST */}
      {activeTab === "subscribers" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Search subscribers by email or source..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-900/60 border-slate-800 text-white text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Status:</span>
              <div className="inline-flex rounded-lg bg-slate-900 border border-slate-800 p-0.5">
                {(["all", "confirmed", "unsubscribed"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors cursor-pointer ${
                      statusFilter === st
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Source</th>
                    <th className="py-3 px-4">Subscribed At</th>
                    <th className="py-3 px-4">1-Click Unsubscribe Token</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 font-mono text-xs">
                        No subscribers match your search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((sub) => {
                      const isConfirmed = sub.status === "confirmed";
                      return (
                        <tr key={sub._id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-slate-200">
                            <span className="font-semibold text-white">{sub.email}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <Badge
                              variant="outline"
                              className={`text-[11px] font-mono uppercase tracking-wider ${
                                isConfirmed
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                  : "bg-slate-800 text-slate-400 border-slate-700"
                              }`}
                            >
                              {sub.status}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
                            {sub.source}
                          </td>
                          <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
                            {new Date(sub.subscribedAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                              <span className="truncate max-w-[130px]">
                                {sub.token ? `${sub.token.substring(0, 14)}...` : "None"}
                              </span>
                              {sub.token && (
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(sub.token)}
                                  title="Copy Token"
                                  className="text-slate-500 hover:text-slate-300 p-0.5 rounded cursor-pointer"
                                >
                                  {copiedToken === sub.token ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {isConfirmed && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleUnsubscribe(sub)}
                                  className="h-7 text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-950/30 cursor-pointer"
                                >
                                  Unsubscribe
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(sub)}
                                className="h-7 w-7 p-0 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BROADCAST HISTORY & LOGS */}
      {activeTab === "broadcasts" && (
        <div className="space-y-4">
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4">Dispatched At</th>
                    <th className="py-3 px-4">Article Title &amp; Slug</th>
                    <th className="py-3 px-4">Recipients</th>
                    <th className="py-3 px-4">Delivered</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {broadcasts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 font-mono text-xs">
                        No email broadcasts have been recorded yet. Newly published Insights will automatically dispatch here.
                      </td>
                    </tr>
                  ) : (
                    broadcasts.map((b) => (
                      <tr key={b._id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                          {new Date(b.sentAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-white">{b.articleTitle}</div>
                          <div className="text-xs font-mono text-slate-400">/insights/{b.articleSlug}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-300">
                          {b.recipientCount}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-emerald-400">
                          {b.deliveredCount}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant="outline"
                            className={`text-[11px] font-mono uppercase tracking-wider ${
                              b.status === "sent"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : b.status === "test_mode"
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                                : b.status === "partial"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            }`}
                          >
                            {b.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {b.deliveryLogs && b.deliveryLogs.length > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedBroadcast(b)}
                                className="h-7 text-xs border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white cursor-pointer"
                              >
                                View Logs ({b.deliveryLogs.length})
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleForceBroadcast(b.articleSlug)}
                              className="h-7 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 cursor-pointer"
                            >
                              Re-send
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TEST BROADCAST MODAL */}
      {isTestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Send Test Publication Email</h3>
                  <p className="text-xs text-slate-400 font-mono">Test Amazon SES delivery safely</p>
                </div>
              </div>
              <button
                onClick={() => setIsTestModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendTestBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                  Select Published Insight Article
                </label>
                <select
                  value={selectedArticleSlug}
                  onChange={(e) => setSelectedArticleSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-rose-500"
                >
                  {publishedInsights.map((insight) => (
                    <option key={insight._id} value={insight.slug}>
                      {insight.title} ({insight.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                  Test Recipient Email Address
                </label>
                <Input
                  type="email"
                  required
                  placeholder="e.g. test@treel.in or your email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-white text-sm"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Will send with authentic Treel layout, canonical links, and From: <span className="font-mono text-slate-400">hello@treel.in</span>.
                </p>
              </div>

              {testResult && (
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    testResult.success
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                  }`}
                >
                  <div className="font-semibold flex items-center gap-1.5">
                    {testResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                    )}
                    <span>{testResult.message}</span>
                  </div>
                  {testResult.details && testResult.details.deliveryLogs?.[0]?.messageId && (
                    <div className="font-mono text-[11px] text-slate-400">
                      Message ID: {testResult.details.deliveryLogs[0].messageId}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsTestModalOpen(false)}
                  className="border-slate-800 text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSendingTest}
                  className="bg-rose-600 hover:bg-rose-700 text-white cursor-pointer font-medium"
                >
                  {isSendingTest ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" /> Sending Preview...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-2" /> Send Test Email
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELIVERY LOGS VIEWER MODAL */}
      {selectedBroadcast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-2xl w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Delivery Logs</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedBroadcast.articleTitle} &middot; {selectedBroadcast.sentAt.split("T")[0]}
                </p>
              </div>
              <button
                onClick={() => setSelectedBroadcast(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1 font-mono text-xs">
              {selectedBroadcast.deliveryLogs?.map((log, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3"
                >
                  <div className="truncate">
                    <span className="text-slate-200 font-medium">{log.email}</span>
                    {log.messageId && (
                      <div className="text-[10px] text-slate-500 truncate">
                        ID: {log.messageId}
                      </div>
                    )}
                    {log.error && (
                      <div className="text-[10px] text-rose-400">
                        Error: {log.error}
                      </div>
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[10px] uppercase ${
                      log.status === "delivered"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                    }`}
                  >
                    {log.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedBroadcast(null)}
                className="border-slate-800 text-slate-300"
              >
                Close Logs
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

