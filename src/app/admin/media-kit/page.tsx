"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  deleteAllMediaKitItemsAction,
  deleteMediaKitItemAction,
  getAdminMediaKitListAction,
  saveMediaKitItemAction,
  toggleMediaKitPublishAction,
} from "@/lib/admin/admin-actions";
import { MediaKitCategory, MediaKitItemRecord } from "@/types/content";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Edit3,
  Eye,
  EyeOff,
  FileArchive,
  FileText,
  Globe,
  Image as ImageIcon,
  Layers,
  Palette,
  Plus,
  RefreshCw,
  Save,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const CATEGORIES: MediaKitCategory[] = [
  "All-in-One Package",
  "Brand Assets",
  "Photography",
  "Fact Sheet & Bios",
];

const ICON_OPTIONS = [
  { value: "FileText", label: "File Document", icon: FileText },
  { value: "Palette", label: "Color Palette / Brand", icon: Palette },
  { value: "Sparkles", label: "Signature / Logo", icon: Sparkles },
  { value: "Layers", label: "Layers / Typography", icon: Layers },
  { value: "Image", label: "Photography / Imagery", icon: ImageIcon },
];

function getCategoryBadgeClass(category: MediaKitCategory): string {
  switch (category) {
    case "All-in-One Package":
      return "bg-rose-500/20 text-rose-400 border-rose-500/30";
    case "Brand Assets":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "Photography":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Fact Sheet & Bios":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    default:
      return "bg-slate-800 text-slate-300 border-slate-700";
  }
}

export default function AdminMediaKitPage() {
  const [items, setItems] = useState<MediaKitItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaKitItemRecord | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteAllConfirmOpen, setDeleteAllConfirmOpen] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);

  // Feedback State
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showFeedback = useCallback((type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 6000);
  }, []);

  const loadItems = useCallback(async () => {
    setLoading(true);
    const res = await getAdminMediaKitListAction();
    if (res.success && res.data) {
      setItems(res.data);
    } else {
      showFeedback("error", res.error || "Failed to load media kit assets.");
    }
    setLoading(false);
  }, [showFeedback]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleCreate = () => {
    const nextOrder = items.length > 0 ? Math.max(...items.map((i) => i.order || 0)) + 1 : 1;
    const newRecord: MediaKitItemRecord = {
      _id: `mk_${Date.now()}`,
      title: "",
      category: "Brand Assets",
      format: "PDF Document",
      description: "",
      fileSize: "1.0 MB",
      fileUrl: "",
      order: nextOrder,
      iconName: "FileText",
      publicationStatus: "Published",
    };

    setEditingItem(newRecord);
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEdit = (item: MediaKitItemRecord) => {
    setEditingItem({ ...item });
    setIsNew(false);
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-media-asset", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      const uploadedData = json.data || (json.url ? {
        fileUrl: json.url,
        fileName: json.filename,
        fileSizeFormatted: json.sizeFormatted,
        format: json.format,
      } : null);

      if (json.success && uploadedData) {
        showFeedback("success", `File uploaded successfully: ${uploadedData.fileName || "Asset"}`);

        // Update editing item with uploaded file info
        const ext = (uploadedData.fileName || "").split(".").pop()?.toUpperCase() || "FILE";
        const formatGuess =
          ext === "ZIP"
            ? "ZIP Archive"
            : ext === "PDF"
            ? "PDF Document"
            : ext === "SVG" || ext === "PNG"
            ? "SVG, PNG (High-Res)"
            : `${ext} Asset`;

        setEditingItem({
          ...editingItem,
          fileUrl: uploadedData.fileUrl,
          fileSize: uploadedData.fileSizeFormatted || editingItem.fileSize,
          format: editingItem.format || formatGuess,
          file: uploadedData.fileName,
          title: editingItem.title || (uploadedData.fileName || "").replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        });
      } else {
        showFeedback("error", json.error || "Upload failed.");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      showFeedback("error", err.message || "Failed to upload file.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title.trim()) {
      showFeedback("error", "Asset title is required.");
      return;
    }

    if (!editingItem.fileUrl.trim()) {
      showFeedback("error", "File URL or uploaded asset is required.");
      return;
    }

    setSaving(true);
    const res = await saveMediaKitItemAction(editingItem);
    if (res.success && res.data) {
      showFeedback("success", `Asset "${res.data.title}" saved successfully.`);
      setModalOpen(false);
      setEditingItem(null);
      await loadItems();
    } else {
      showFeedback("error", res.error || "Failed to save asset.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const res = await deleteMediaKitItemAction(id);
    if (res.success) {
      showFeedback("success", "Media kit asset deleted.");
      setDeleteConfirmId(null);
      await loadItems();
    } else {
      showFeedback("error", res.error || "Failed to delete asset.");
    }
    setDeleting(false);
  };

  const handleDeleteAll = async () => {
    setDeletingAll(true);
    const res = await deleteAllMediaKitItemsAction();
    if (res.success) {
      showFeedback("success", "All media kit assets deleted.");
      setDeleteAllConfirmOpen(false);
      await loadItems();
    } else {
      showFeedback("error", res.error || "Failed to delete all assets.");
    }
    setDeletingAll(false);
  };

  const handleTogglePublish = async (id: string) => {
    const res = await toggleMediaKitPublishAction(id);
    if (res.success && res.data) {
      showFeedback("success", `Status updated to ${res.data.publicationStatus}.`);
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, publicationStatus: res.data!.publicationStatus } : item
        )
      );
    } else {
      showFeedback("error", res.error || "Failed to toggle status.");
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filterCategory !== "ALL" && item.category !== filterCategory) return false;
      if (filterStatus !== "ALL" && item.publicationStatus !== filterStatus) return false;
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = (item.description || "").toLowerCase().includes(query);
        const matchesFormat = (item.format || "").toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesFormat) return false;
      }
      return true;
    });
  }, [items, filterCategory, filterStatus, search]);

  const stats = useMemo(() => {
    const total = items.length;
    const published = items.filter((i) => i.publicationStatus === "Published").length;
    const drafts = total - published;
    const packages = items.filter((i) => i.category === "All-in-One Package").length;
    return { total, published, drafts, packages };
  }, [items]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {feedback && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 border transition-all ${
            feedback.type === "success"
              ? "bg-emerald-950/90 text-emerald-300 border-emerald-700/50"
              : "bg-red-950/90 text-red-300 border-red-700/50"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          )}
          <span className="text-sm font-medium">{feedback.message}</span>
          <button
            onClick={() => setFeedback(null)}
            className="ml-2 hover:opacity-70 p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <FileArchive className="w-3.5 h-3.5" />
            <span>BRAND & MEDIA ASSETS</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Media Kit Assets</h1>
          <p className="text-sm text-slate-400 font-mono mt-0.5">
            Manage logos, brand guidelines, photography packs, executive bios, and downloadable media archives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadItems}
            disabled={loading}
            className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-mono gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button asChild variant="outline" size="sm" className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-mono gap-1.5">
            <Link href="/media-kit" target="_blank">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              Public Media Kit
            </Link>
          </Button>

          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteAllConfirmOpen(true)}
              disabled={loading || deletingAll}
              className="border-red-900/40 text-red-400 hover:bg-red-950/50 hover:text-red-300 text-xs font-mono gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete All
            </Button>
          )}

          <Button
            onClick={handleCreate}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-1.5 shadow-lg shadow-emerald-900/30"
          >
            <Plus className="w-4 h-4" />
            Add Media Asset
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Total Assets</div>
          <div className="text-2xl font-bold text-white font-mono">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Live on /media-kit</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{stats.published}</div>
        </Card>
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Drafts</div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{stats.drafts}</div>
        </Card>
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Bundles / Packages</div>
          <div className="text-2xl font-bold text-purple-400 font-mono">{stats.packages}</div>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4 bg-slate-900/90 border-slate-800 rounded-xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search title, format, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-950 border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 h-9"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full h-9 px-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="ALL">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full h-9 px-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="ALL">All Statuses</option>
              <option value="Published">Published Live</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Main Table */}
      <Card className="bg-slate-900 border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 text-slate-400 font-mono border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Asset Title / Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Format &amp; Size</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-mono">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-purple-400" />
                    Loading media kit assets...
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                    No media assets found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-400 font-bold">
                      #{item.order ?? 99}
                    </td>

                    <td className="py-4 px-4 max-w-sm">
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-100 hover:text-purple-400 transition-colors line-clamp-1">
                          {item.title}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="font-mono text-[10px] text-slate-500 truncate max-w-xs">
                          {item.fileUrl}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <Badge className={`${getCategoryBadgeClass(item.category)} text-[11px] font-mono`}>
                        {item.category}
                      </Badge>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px]">
                      <div className="text-slate-200 font-semibold">{item.format}</div>
                      <div className="text-[10px] text-slate-500">{item.fileSize}</div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(item._id)}
                        className="inline-flex items-center gap-1.5 cursor-pointer group"
                        title="Click to toggle status"
                      >
                        {item.publicationStatus === "Published" ? (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono group-hover:bg-emerald-500/30">
                            <Eye className="w-3 h-3 mr-1" /> Published
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono group-hover:bg-amber-500/30">
                            <EyeOff className="w-3 h-3 mr-1" /> Draft
                          </Badge>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-purple-400 hover:bg-slate-800"
                          title="Download file"
                        >
                          <a href={item.fileUrl} download target="_blank" rel="noopener noreferrer">
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirmId(item._id)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-400 hover:bg-slate-800"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <Card className="max-w-md w-full p-6 bg-slate-900 border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Delete Media Asset?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete this media kit entry? It will be removed from local storage and Supabase. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirmId(null)}
                disabled={deleting}
                className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Delete ALL Confirmation Modal */}
      {deleteAllConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <Card className="max-w-md w-full p-6 bg-slate-900 border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Delete All Media Assets?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-white">all {items.length} media kit assets</strong>? They will be removed from local storage and cloud database. They will not reappear.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteAllConfirmOpen(false)}
                disabled={deletingAll}
                className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleDeleteAll}
                disabled={deletingAll}
                className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
              >
                {deletingAll ? "Deleting All..." : "Yes, Delete Everything"}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <Card className="max-w-2xl w-full my-8 bg-slate-900 border-slate-800 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {isNew ? "Add Media Asset" : "Edit Media Asset"}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {isNew ? "Create a downloadable brand or photography resource" : `Editing ID: ${editingItem._id}`}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Asset Title <span className="text-purple-400">*</span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Official Treel Logo Pack or Brand Guidelines V3.1"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-xs text-white"
                />
              </div>

              {/* Category & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Category <span className="text-purple-400">*</span>
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as MediaKitCategory })}
                    className="w-full h-9 px-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Display Order (Sorting)
                  </label>
                  <Input
                    type="number"
                    value={editingItem.order ?? 1}
                    onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 0 })}
                    className="bg-slate-950 border-slate-800 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Format & File Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Format Label
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. SVG, PNG (High-Res) or ZIP Archive"
                    value={editingItem.format}
                    onChange={(e) => setEditingItem({ ...editingItem, format: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    File Size Label
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. 4.2 MB or 50 MB"
                    value={editingItem.fileSize}
                    onChange={(e) => setEditingItem({ ...editingItem, fileSize: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Dark, light, and monochrome vector logos with clearance guides..."
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full p-2.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* File Upload / File URL */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-purple-400">
                    DOWNLOADABLE FILE / ASSET URL <span className="text-purple-400">*</span>
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".zip,.pdf,.png,.jpg,.jpeg,.svg,.ai,.webp,.doc,.docx"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="border-purple-700/50 bg-purple-950/30 text-purple-300 hover:bg-purple-900/40 text-xs font-mono gap-1.5 h-7"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {uploading ? "Uploading..." : "Upload New File"}
                  </Button>
                </div>

                <Input
                  type="text"
                  required
                  placeholder="/downloads/media-kit/treel-logo-pack.zip or /uploads/media-kit/..."
                  value={editingItem.fileUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-xs text-white font-mono"
                />

                {editingItem.fileUrl && (
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Target: {editingItem.fileUrl}</span>
                    <a
                      href={editingItem.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> Test Download
                    </a>
                  </div>
                )}
              </div>

              {/* Icon & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Card Icon
                  </label>
                  <select
                    value={editingItem.iconName || "FileText"}
                    onChange={(e) => setEditingItem({ ...editingItem, iconName: e.target.value })}
                    className="w-full h-9 px-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  >
                    {ICON_OPTIONS.map((ico) => (
                      <option key={ico.value} value={ico.value}>
                        {ico.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Details Note (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. 12 high-resolution JPG/PNG images"
                    value={editingItem.details || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, details: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Publication Status
                </label>
                <select
                  value={editingItem.publicationStatus}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      publicationStatus: e.target.value as "Published" | "Draft",
                    })
                  }
                  className="w-full h-9 px-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                >
                  <option value="Published">Published (Public)</option>
                  <option value="Draft">Draft (Internal)</option>
                </select>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                  className="border-slate-800 text-slate-400 hover:bg-slate-800 text-xs"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-1.5 shadow-lg shadow-emerald-900/30"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : isNew ? "Add Asset" : "Save Changes"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

