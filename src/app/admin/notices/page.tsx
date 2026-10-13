"use client";

import { useState, useEffect } from "react";
import { 
  Bell, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  X, 
  Save, 
  CheckCircle2, 
  Clock, 
  Globe, 
  FileText, 
  AlertCircle,
  ExternalLink,
  Link as LinkIcon
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  getAdminNotices, 
  createAdminNotice, 
  updateAdminNotice, 
  deleteAdminNotice,
  togglePublishAdminNotice
} from "@/lib/admin/admin-actions";
import { NoticeItem } from "@/types/admin";
import { 
  MAX_NOTICE_WORD_COUNT, 
  countWords, 
  validateNoticeWordCount, 
  validateAndNormalizeDriveUrl 
} from "@/lib/notices/notice-utils";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "Published" | "Draft">("ALL");
  const [editingItem, setEditingItem] = useState<NoticeItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  const loadData = async () => {
    setLoading(true);
    const res = await getAdminNotices();
    if (res.success && res.data) {
      setNotices(res.data);
    } else {
      showFeedback("error", res.error || "Failed to load notices");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (item: NoticeItem) => {
    setEditingItem({ 
      ...item,
      documentUrl: item.documentUrl || item.document_url || "" 
    });
    setIsNew(false);
  };

  const handleCreate = () => {
    const today = new Date().toISOString().split("T")[0];
    setEditingItem({
      _id: `not_${Date.now()}`,
      title: "",
      description: "",
      publishedDate: today,
      status: "Published",
      category: "Corporate & Statutory",
      documentUrl: ""
    });
    setIsNew(true);
  };

  const currentWordCount = editingItem ? countWords(editingItem.description) : 0;
  const isWordCountExceeded = currentWordCount > MAX_NOTICE_WORD_COUNT;

  const driveValidation = editingItem?.documentUrl 
    ? validateAndNormalizeDriveUrl(editingItem.documentUrl) 
    : { valid: true };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title.trim()) {
      showFeedback("error", "Notice title is required.");
      return;
    }

    if (isWordCountExceeded) {
      showFeedback("error", `Notice description exceeds maximum limit of ${MAX_NOTICE_WORD_COUNT} words.`);
      return;
    }

    if (editingItem.documentUrl && !driveValidation.valid) {
      showFeedback("error", driveValidation.error || "Invalid Google Drive document link.");
      return;
    }

    setSaving(true);

    const payload: Partial<NoticeItem> = {
      ...editingItem,
      documentUrl: editingItem.documentUrl ? driveValidation.normalizedUrl || editingItem.documentUrl : undefined,
      document_url: editingItem.documentUrl ? driveValidation.normalizedUrl || editingItem.documentUrl : undefined
    };

    if (isNew) {
      const res = await createAdminNotice(payload);
      if (res.success) {
        showFeedback("success", "Notice created successfully and synced.");
        setEditingItem(null);
        await loadData();
      } else {
        showFeedback("error", res.error || "Failed to create notice");
      }
    } else {
      const res = await updateAdminNotice(editingItem._id, payload);
      if (res.success) {
        showFeedback("success", "Notice updated successfully and synced.");
        setEditingItem(null);
        await loadData();
      } else {
        showFeedback("error", res.error || "Failed to update notice");
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    setLoading(true);
    const res = await deleteAdminNotice(id);
    if (res.success) {
      showFeedback("success", `Notice "${title}" deleted.`);
      await loadData();
    } else {
      showFeedback("error", res.error || "Failed to delete notice");
      setLoading(false);
    }
  };

  const handleToggleStatus = async (item: NoticeItem) => {
    const res = await togglePublishAdminNotice(item._id, item.status);
    if (res.success) {
      const nextStatus = item.status === "Published" ? "Draft" : "Published";
      showFeedback("success", `Notice marked as ${nextStatus}.`);
      await loadData();
    } else {
      showFeedback("error", res.error || "Failed to toggle status");
    }
  };

  const filtered = notices.filter(n => {
    const matchesSearch = 
      (n.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (n.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (n.category || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || n.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalCount = notices.length;
  const publishedCount = notices.filter(n => n.status === "Published").length;
  const draftCount = notices.filter(n => n.status === "Draft").length;

  return (
    <div className="space-y-8">
      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-sm transition-all ${
            feedback.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
              : "bg-rose-500/15 border-rose-500/40 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="p-1 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Notice Board Management</h1>
              <p className="text-sm text-slate-400">
                Corporate notices, statutory announcements &amp; regulatory disclosures
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            onClick={loadData}
            variant="outline"
            className="border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-slate-200"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin text-amber-400" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={handleCreate}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Notice
          </Button>
        </div>
      </div>

      {/* KPI / Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-slate-900/60 border-slate-800 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Notices</p>
              <p className="text-2xl font-bold text-white mt-1">{totalCount}</p>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl text-slate-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-emerald-400">Published (Public)</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{publishedCount}</p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Globe className="w-3 h-3 text-emerald-400" /> Live on /notices
          </div>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-amber-400">Drafts (Hidden)</p>
              <p className="text-2xl font-bold text-amber-400 mt-1">{draftCount}</p>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Clock className="w-3 h-3 text-amber-400" /> Hidden from public website
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <Input
            placeholder="Search notices by title, description or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 text-xs font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilterStatus("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              filterStatus === "ALL"
                ? "bg-slate-800 text-white font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            All ({notices.length})
          </button>
          <button
            onClick={() => setFilterStatus("Published")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              filterStatus === "Published"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold"
                : "text-slate-400 hover:text-emerald-400"
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setFilterStatus("Draft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              filterStatus === "Draft"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 font-semibold"
                : "text-slate-400 hover:text-amber-400"
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-slate-500 font-mono text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-amber-400" />
            Loading notice records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-300">No notices found</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {search ? "No records matched your search query." : "Click 'New Notice' to publish your first statutory announcement."}
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const docUrl = item.documentUrl || item.document_url;
            const words = countWords(item.description);

            return (
              <Card
                key={item._id}
                className="bg-slate-900/50 border-slate-800/80 hover:border-slate-700/80 transition-all p-5"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          item.status === "Published"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === "Published" ? "bg-emerald-400" : "bg-amber-400"}`} />
                        {item.status}
                      </span>

                      {item.category && (
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium">
                          {item.category}
                        </span>
                      )}

                      <span className="text-xs text-slate-500 font-mono">
                        Date: {item.publishedDate || "N/A"}
                      </span>

                      <span className="text-[11px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {words} / {MAX_NOTICE_WORD_COUNT} words
                      </span>

                      {docUrl && (
                        <a
                          href={docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded hover:bg-sky-500/20 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Google Drive PDF Attached</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(item)}
                      className={`text-xs ${
                        item.status === "Published"
                          ? "border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                          : "border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                      }`}
                    >
                      {item.status === "Published" ? "Unpublish (Draft)" : "Publish Now"}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="border-slate-700 bg-slate-800/40 text-slate-200 hover:bg-slate-700"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1 text-sky-400" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item._id, item.title)}
                      className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Edit / Create Modal Dialog */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {isNew ? "Create New Notice" : "Edit Notice"}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Published notices appear immediately on the public /notices board.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Notice Title <span className="text-rose-400">*</span>
                </label>
                <Input
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g., Statutory Notice: Audited Annual Financial Disclosures"
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                />
              </div>

              {/* Category & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <Input
                    value={editingItem.category || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    placeholder="e.g., Corporate & Statutory, Regulatory, AGM"
                    className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Published Date
                  </label>
                  <Input
                    type="date"
                    value={editingItem.publishedDate || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, publishedDate: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white focus-visible:ring-amber-500"
                  />
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Publication Status <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, status: "Published" })}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      editingItem.status === "Published"
                        ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Published</p>
                      <p className="text-[10px] text-slate-400">Visible on public /notices page</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, status: "Draft" })}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      editingItem.status === "Draft"
                        ? "bg-amber-500/15 border-amber-500/50 text-amber-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Draft</p>
                      <p className="text-[10px] text-slate-400">Hidden from public website</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Notice Description with live word counter */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Short Notice Text <span className="text-rose-400">*</span>
                  </label>
                  <span
                    className={`text-xs font-mono font-medium ${
                      isWordCountExceeded
                        ? "text-rose-400 font-bold"
                        : currentWordCount > MAX_NOTICE_WORD_COUNT * 0.8
                        ? "text-amber-400"
                        : "text-slate-400"
                    }`}
                  >
                    {currentWordCount} / {MAX_NOTICE_WORD_COUNT} words
                  </span>
                </div>
                <textarea
                  required
                  rows={5}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Enter the concise summary or official announcement statement (max 150 words)..."
                  className={`w-full rounded-xl bg-slate-950 border p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                    isWordCountExceeded
                      ? "border-rose-500/60 focus:ring-rose-500"
                      : "border-slate-800 focus:ring-amber-500"
                  }`}
                />
                {isWordCountExceeded && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Word count limit exceeded ({currentWordCount} words). Please trim before saving.
                  </p>
                )}
              </div>

              {/* Google Drive Document URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Notice Document URL (Optional Google Drive PDF / Circular Link)
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
                  <Input
                    value={editingItem.documentUrl || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, documentUrl: e.target.value })}
                    placeholder="https://drive.google.com/file/d/.../view"
                    className="pl-9 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 text-xs font-mono focus-visible:ring-amber-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                  Paste a Google Drive share link for the full official PDF or long notice document. 
                  <span className="text-amber-300"> Note:</span> Google Drive file sharing permissions must be configured in Google Drive to allow your target audience to view the document (e.g. &ldquo;Anyone with the link can view&rdquo;).
                </p>
                {editingItem.documentUrl && !driveValidation.valid && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {driveValidation.error}
                  </p>
                )}
                {editingItem.documentUrl && driveValidation.valid && (
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Valid Google Drive document link detected.
                  </p>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingItem(null)}
                  className="border-slate-700 bg-slate-800/40 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving || isWordCountExceeded || (Boolean(editingItem.documentUrl) && !driveValidation.valid)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : isNew ? "Create Notice" : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
