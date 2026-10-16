"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  deletePressItemAction,
  getAdminPressListAction,
  savePressItemAction,
  togglePressPublishAction,
} from "@/lib/admin/admin-actions";
import { PressItemRecord } from "@/types/content";
import {
  AlertCircle,
  CheckCircle2,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  Newspaper,
  Plus,
  RefreshCw,
  Save,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const COMMON_CATEGORIES = [
  "Product Launch",
  "Partnership",
  "Milestone",
  "Company News",
  "Industry Recognition",
  "Research Study",
];

export default function AdminPressPage() {
  const [items, setItems] = useState<PressItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterYear, setFilterYear] = useState<string>("ALL");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PressItemRecord | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "content" | "quote">("general");

  // Body paragraphs textarea helper state
  const [bodyText, setBodyText] = useState("");
  const [relatedSlugsText, setRelatedSlugsText] = useState("");

  // Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Feedback State
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showFeedback = useCallback((type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 6000);
  }, []);

  const loadItems = useCallback(async () => {
    setLoading(true);
    const res = await getAdminPressListAction();
    if (res.success && res.data) {
      setItems(res.data);
    } else {
      showFeedback("error", res.error || "Failed to load press items.");
    }
    setLoading(false);
  }, [showFeedback]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleCreate = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const newRecord: PressItemRecord = {
      _id: `press_${Date.now()}`,
      slug: "",
      year: today.getFullYear().toString(),
      date: formattedDate,
      category: "Company News",
      headline: "",
      excerpt: "",
      city: "PUNE",
      leadParagraph: "",
      quote: {
        text: "",
        speaker: "Manish Ingale",
        role: "Founder & CEO, Treel Mobility Solutions",
      },
      bodyParagraphs: [],
      relatedSlugs: [],
      publicationStatus: "Published",
      isFeatured: false,
    };

    setEditingItem(newRecord);
    setBodyText("");
    setRelatedSlugsText("");
    setIsNew(true);
    setActiveTab("general");
    setModalOpen(true);
  };

  const handleEdit = (item: PressItemRecord) => {
    setEditingItem({ ...item });
    setBodyText(Array.isArray(item.bodyParagraphs) ? item.bodyParagraphs.join("\n\n") : "");
    setRelatedSlugsText(Array.isArray(item.relatedSlugs) ? item.relatedSlugs.join(", ") : "");
    setIsNew(false);
    setActiveTab("general");
    setModalOpen(true);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.headline.trim()) {
      showFeedback("error", "Headline is required.");
      return;
    }

    let slug = editingItem.slug.trim();
    if (!slug) {
      slug = slugify(editingItem.headline);
    }

    setSaving(true);

    const paragraphs = bodyText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const related = relatedSlugsText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload: Partial<PressItemRecord> = {
      ...editingItem,
      slug,
      bodyParagraphs: paragraphs,
      relatedSlugs: related,
    };

    const res = await savePressItemAction(payload);
    if (res.success && res.data) {
      showFeedback("success", `Press release "${res.data.headline.slice(0, 40)}..." saved.`);
      setModalOpen(false);
      setEditingItem(null);
      await loadItems();
    } else {
      showFeedback("error", res.error || "Failed to save press release.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const res = await deletePressItemAction(id);
    if (res.success) {
      showFeedback("success", "Press release deleted successfully.");
      setDeleteConfirmId(null);
      await loadItems();
    } else {
      showFeedback("error", res.error || "Failed to delete press release.");
    }
    setDeleting(false);
  };

  const handleTogglePublish = async (id: string) => {
    const res = await togglePressPublishAction(id);
    if (res.success && res.data) {
      showFeedback("success", `Status updated to ${res.data.publicationStatus}.`);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, publicationStatus: res.data!.publicationStatus } : item))
      );
    } else {
      showFeedback("error", res.error || "Failed to toggle status.");
    }
  };

  // Compute years dynamically
  const availableYears = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) => {
      if (it.year) set.add(it.year);
    });
    return Array.from(set).sort().reverse();
  }, [items]);

  // Compute categories dynamically
  const availableCategories = useMemo(() => {
    const set = new Set<string>(COMMON_CATEGORIES);
    items.forEach((it) => {
      if (it.category) set.add(it.category);
    });
    return Array.from(set);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filterCategory !== "ALL" && item.category !== filterCategory) return false;
      if (filterStatus !== "ALL" && item.publicationStatus !== filterStatus) return false;
      if (filterYear !== "ALL" && item.year !== filterYear) return false;
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesHeadline = item.headline.toLowerCase().includes(query);
        const matchesExcerpt = (item.excerpt || "").toLowerCase().includes(query);
        const matchesCity = (item.city || "").toLowerCase().includes(query);
        const matchesSlug = item.slug.toLowerCase().includes(query);
        if (!matchesHeadline && !matchesExcerpt && !matchesCity && !matchesSlug) return false;
      }
      return true;
    });
  }, [items, filterCategory, filterStatus, filterYear, search]);

  const stats = useMemo(() => {
    const total = items.length;
    const published = items.filter((i) => i.publicationStatus === "Published").length;
    const drafts = total - published;
    const featured = items.filter((i) => i.isFeatured).length;
    return { total, published, drafts, featured };
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
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Newspaper className="w-3.5 h-3.5" />
            <span>PRESS & MEDIA ARCHIVE</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Press & Media Releases</h1>
          <p className="text-sm text-slate-400 font-mono mt-0.5">
            Create, publish, edit, and archive official statements and press coverage for Treel.
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
            <Link href="/press" target="_blank">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              Public Press Page
            </Link>
          </Button>

          <Button
            onClick={handleCreate}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-1.5 shadow-lg shadow-emerald-900/30"
          >
            <Plus className="w-4 h-4" />
            New Press Release
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Total Releases</div>
          <div className="text-2xl font-bold text-white font-mono">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Published Live</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{stats.published}</div>
        </Card>
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Drafts</div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{stats.drafts}</div>
        </Card>
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Featured</div>
          <div className="text-2xl font-bold text-blue-400 font-mono">{stats.featured}</div>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <Card className="p-4 bg-slate-900/90 border-slate-800 rounded-xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search headline, excerpt, city..."
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
              {availableCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full h-9 px-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="ALL">All Years</option>
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  Year {y}
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
                <th className="py-3 px-4">Headline / Release</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Year / Date</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-mono">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
                    Loading press releases...
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                    No press releases found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 max-w-md">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {item.isFeatured && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              <Star className="w-2.5 h-2.5 fill-blue-400 text-blue-400" />
                              FEATURED
                            </span>
                          )}
                          <span className="font-semibold text-slate-100 hover:text-emerald-400 transition-colors line-clamp-1">
                            {item.headline}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{item.excerpt}</p>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
                          <span>Slug: /{item.year || '2026'}/{item.slug}</span>
                          {item.externalUrl && (
                            <span className="text-cyan-400 flex items-center gap-0.5">
                              · External Link <ExternalLink className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <Badge className="bg-slate-800 text-slate-300 border-slate-700 text-[11px] font-mono">
                        {item.category}
                      </Badge>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap font-mono text-slate-300 text-[11px]">
                      <div>{item.date}</div>
                      <div className="text-[10px] text-slate-500">Year: {item.year}</div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap font-mono text-slate-300 text-[11px]">
                      {item.city || "PUNE"}
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
                          className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800"
                          title="View on site"
                        >
                          <Link href={item.externalUrl || `/press/${item.year || '2026'}/${item.slug}`} target="_blank">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
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
              <h3 className="text-lg font-bold text-white">Delete Press Release?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete this press release? It will be removed from both local storage and Supabase. This action cannot be undone.
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

      {/* Create / Edit Modal */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <Card className="max-w-3xl w-full my-8 bg-slate-900 border-slate-800 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {isNew ? "Create Press Release" : "Edit Press Release"}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {isNew ? "Add a new statement to the Treel press wire" : `Editing ID: ${editingItem._id}`}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="px-5 pt-3 border-b border-slate-800 flex gap-4 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === "general"
                    ? "border-emerald-500 text-emerald-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                1. Basic Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("quote")}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === "quote"
                    ? "border-emerald-500 text-emerald-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                2. Summary & Executive Quote
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === "content"
                    ? "border-emerald-500 text-emerald-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                3. Body Paragraphs & Metadata
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-4">
              {activeTab === "general" && (
                <div className="space-y-4">
                  {/* Headline */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Headline <span className="text-emerald-400">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. Treel Surpasses 68,000 Connected Commercial Vehicles..."
                      value={editingItem.headline}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingItem({
                          ...editingItem,
                          headline: val,
                          slug: editingItem.slug || slugify(val),
                        });
                      }}
                      className="bg-slate-950 border-slate-800 text-xs text-white"
                    />
                  </div>

                  {/* Slug & Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        URL Slug <span className="text-emerald-400">*</span>
                      </label>
                      <Input
                        type="text"
                        required
                        value={editingItem.slug}
                        onChange={(e) => setEditingItem({ ...editingItem, slug: slugify(e.target.value) })}
                        className="bg-slate-950 border-slate-800 text-xs font-mono text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Release Year <span className="text-emerald-400">*</span>
                      </label>
                      <Input
                        type="text"
                        required
                        value={editingItem.year || "2026"}
                        onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value.trim() })}
                        className="bg-slate-950 border-slate-800 text-xs font-mono text-white"
                      />
                    </div>
                  </div>

                  {/* Date & City & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Display Date <span className="text-emerald-400">*</span>
                      </label>
                      <Input
                        type="text"
                        required
                        placeholder="e.g. October 16, 2026"
                        value={editingItem.date}
                        onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        City / Location
                      </label>
                      <Input
                        type="text"
                        value={editingItem.city || "PUNE"}
                        onChange={(e) => setEditingItem({ ...editingItem, city: e.target.value.toUpperCase() })}
                        className="bg-slate-950 border-slate-800 text-xs text-white uppercase font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                        className="w-full h-9 px-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                      >
                        {COMMON_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Status & Featured */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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

                    <div className="flex items-center gap-3 pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-200">
                        <input
                          type="checkbox"
                          checked={Boolean(editingItem.isFeatured)}
                          onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                          className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                        />
                        <span>Feature at top of /press page</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "quote" && (
                <div className="space-y-4">
                  {/* Excerpt */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Short Excerpt / Teaser
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Brief 1-2 sentence overview for cards and meta description..."
                      value={editingItem.excerpt || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      className="w-full p-2.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Lead Paragraph */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Lead Paragraph (Opening Statement)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Opening paragraph displayed prominently under the headline..."
                      value={editingItem.leadParagraph || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, leadParagraph: e.target.value })}
                      className="w-full p-2.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Executive Quote Block */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <div className="text-xs font-mono font-semibold text-emerald-400">
                      EXECUTIVE QUOTE (OPTIONAL)
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Quote Text</label>
                      <textarea
                        rows={2}
                        placeholder="Quote statement from executive leadership..."
                        value={editingItem.quote?.text || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            quote: {
                              text: e.target.value,
                              speaker: editingItem.quote?.speaker || "Manish Ingale",
                              role: editingItem.quote?.role || "Founder & CEO, Treel Mobility Solutions",
                            },
                          })
                        }
                        className="w-full p-2.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">Speaker Name</label>
                        <Input
                          type="text"
                          value={editingItem.quote?.speaker || ""}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              quote: {
                                text: editingItem.quote?.text || "",
                                speaker: e.target.value,
                                role: editingItem.quote?.role || "",
                              },
                            })
                          }
                          className="bg-slate-950 border-slate-800 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">Designation / Role</label>
                        <Input
                          type="text"
                          value={editingItem.quote?.role || ""}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              quote: {
                                text: editingItem.quote?.text || "",
                                speaker: editingItem.quote?.speaker || "",
                                role: e.target.value,
                              },
                            })
                          }
                          className="bg-slate-950 border-slate-800 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "content" && (
                <div className="space-y-4">
                  {/* Body Paragraphs */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Body Paragraphs (Separate paragraphs with a blank line)
                    </label>
                    <textarea
                      rows={6}
                      placeholder="First paragraph...&#10;&#10;Second paragraph...&#10;&#10;Third paragraph..."
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                      className="w-full p-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 font-sans focus:outline-none focus:border-emerald-500 leading-relaxed"
                    />
                  </div>

                  {/* External URL & Byline Source */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        External Coverage URL (Optional)
                      </label>
                      <Input
                        type="url"
                        placeholder="https://economictimes.indiatimes.com/..."
                        value={editingItem.externalUrl || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, externalUrl: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Byline / Source
                      </label>
                      <Input
                        type="text"
                        placeholder="Treel Communications"
                        value={editingItem.source || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, source: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Related Slugs */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Related Releases (Comma-separated slugs)
                    </label>
                    <Input
                      type="text"
                      placeholder="68000-commercial-vehicles-milestone, project-suraksha-nationwide-launch"
                      value={relatedSlugsText}
                      onChange={(e) => setRelatedSlugsText(e.target.value)}
                      className="bg-slate-950 border-slate-800 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              )}

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

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-1.5 shadow-lg shadow-emerald-900/30"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : isNew ? "Create Release" : "Save Changes"}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

