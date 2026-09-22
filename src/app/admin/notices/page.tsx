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
  AlertCircle 
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

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "Published" | "Draft">("ALL");
  const [editingItem, setEditingItem] = useState<NoticeItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await getAdminNotices();
    if (res.success && res.data) {
      setNotices(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (item: NoticeItem) => {
    setEditingItem({ ...item });
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
      category: "Corporate & Statutory"
    });
    setIsNew(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    if (!editingItem.title.trim()) {
      alert("Title is required");
      return;
    }
    setSaving(true);

    if (isNew) {
      const res = await createAdminNotice(editingItem);
      if (res.success) {
        setEditingItem(null);
        await loadData();
      } else {
        alert(res.error || "Failed to create notice");
      }
    } else {
      const res = await updateAdminNotice(editingItem._id, editingItem);
      if (res.success) {
        setEditingItem(null);
        await loadData();
      } else {
        alert(res.error || "Failed to update notice");
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setLoading(true);
    const res = await deleteAdminNotice(id);
    if (res.success) {
      await loadData();
    } else {
      alert(res.error || "Failed to delete notice");
      setLoading(false);
    }
  };

  const handleToggleStatus = async (item: NoticeItem) => {
    const res = await togglePublishAdminNotice(item._id, item.status);
    if (res.success) {
      await loadData();
    } else {
      alert(res.error || "Failed to toggle status");
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
                Corporate notices, statutory announcements & regulatory disclosures
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
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Globe className="w-3 h-3 text-emerald-400" /> Live on /notices
          </p>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-amber-400">Drafts (Hidden)</p>
              <p className="text-2xl font-bold text-amber-400 mt-1">{draftCount}</p>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-amber-400" /> Strictly hidden from public
          </p>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="bg-slate-900/40 border-slate-800 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notices by title, description or category..."
              className="pl-10 bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus("ALL")}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === "ALL"
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              All ({notices.length})
            </button>
            <button
              onClick={() => setFilterStatus("Published")}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === "Published"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setFilterStatus("Draft")}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === "Draft"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-amber-400 hover:bg-slate-800"
              }`}
            >
              Drafts ({draftCount})
            </button>
          </div>
        </div>
      </Card>

      {/* Notices List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-16 text-slate-400 font-mono text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
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
          filtered.map((item) => (
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
          ))
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
                    Fields will sync to Treel public notice board if status is set to Published.
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

              {/* Status Radio / Selector */}
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

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Notice Details / Content <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Enter the complete text of the notice, circular, or announcement..."
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
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
                  disabled={saving}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
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
