"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  deleteWhitepaperAction,
  getAdminWhitepapersListAction,
  saveWhitepaperAction,
  toggleWhitepaperPublishAction,
} from "@/lib/admin/admin-actions";
import { WhitepaperFormat, WhitepaperRecord } from "@/types/content";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Plus,
  RefreshCw,
  Save,
  Search,
  Star,
  Trash2,
  Upload,
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

const COMMON_TOPICS = [
  "ROI & Payback",
  "Vehicle Digital Twin",
  "Predictive Maintenance",
  "Fleet Operations",
  "Case Study",
  "IoT & Telematics Hardware",
  "Fuel & Energy Analytics",
];

const COMMON_INDUSTRIES = [
  "All",
  "Logistics",
  "Passenger Transport",
  "Construction",
  "Mining",
  "OEM",
];

export default function AdminWhitepapersPage() {
  const [whitepapers, setWhitepapers] = useState<WhitepaperRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterChannel, setFilterChannel] = useState<string>("ALL");
  const [filterTopic, setFilterTopic] = useState<string>("ALL");
  const [filterIndustry, setFilterIndustry] = useState<string>("ALL");
  const [filterPub, setFilterPub] = useState<string>("ALL");
  const [filterFormat, setFilterFormat] = useState<string>("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WhitepaperRecord | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "document" | "media" | "seo">("general");

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showFeedback = useCallback((type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 6000);
  }, []);

  const loadWhitepapers = useCallback(async () => {
    setLoading(true);
    const res = await getAdminWhitepapersListAction();
    if (res.success && res.data) {
      setWhitepapers(res.data);
    } else {
      showFeedback("error", res.error || "Failed to load whitepapers.");
    }
    setLoading(false);
  }, [showFeedback]);

  useEffect(() => {
    loadWhitepapers();
  }, [loadWhitepapers]);

  const handleCreate = () => {
    const newRecord: WhitepaperRecord = {
      _id: `wp_${Date.now()}`,
      slug: "",
      title: "",
      excerpt: "",
      description: "",
      topic: "ROI & Payback",
      industry: "Logistics",
      author: "Treel Mobility Fleet Analytics Group",
      length: "24 pages",
      publishDate: "October 2026",
      fileUrl: "",
      fileFormat: "PDF",
      fileSize: 0,
      fileSizeFormatted: "0 Bytes",
      originalFilename: "",
      coverImage: "",
      isFeatured: false,
      publicationStatus: "Published",
      gated: true,
      directUrl: "",
      seoTitle: "",
      seoDescription: "",
      downloadCount: 0,
      displayOnTmip: true,
      displayOnResearch: true,
      category: "both",
      chapters: [
        "01. Baseline Fleet Economics & Unplanned Downtime Analysis",
        "02. Sensor Deployment & Telemetry Integration Timelines",
        "03. Anomaly Classification & Micro-Leak Preemption",
        "04. Fuel Consumption Attributed to Axle Pressure Discrepancy",
        "05. Payback Realization Matrix & Deployment Model",
      ],
      year: "2026",
    };
    setEditingItem(newRecord);
    setIsNew(true);
    setActiveTab("general");
    setModalOpen(true);
  };

  const handleEdit = (item: WhitepaperRecord) => {
    setEditingItem({
      ...item,
      category: item.category || (item.displayOnTmip && item.displayOnResearch ? "both" : item.displayOnResearch ? "treel_main" : "tmip"),
      chapters: item.chapters && item.chapters.length > 0 ? [...item.chapters] : [
        "01. Baseline Fleet Economics & Unplanned Downtime Analysis",
        "02. Sensor Deployment & Telemetry Integration Timelines",
        "03. Anomaly Classification & Micro-Leak Preemption",
        "04. Fuel Consumption Attributed to Axle Pressure Discrepancy",
        "05. Payback Realization Matrix & Deployment Model",
      ],
    });
    setIsNew(false);
    setActiveTab("general");
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: WhitepaperRecord) => {
    const res = await toggleWhitepaperPublishAction(item._id);
    if (res.success && res.data) {
      setWhitepapers((prev) => prev.map((w) => (w._id === item._id ? res.data! : w)));
      showFeedback(
        "success",
        `Whitepaper "${item.title}" is now ${res.data.publicationStatus.toLowerCase()}.`
      );
    } else {
      showFeedback("error", res.error || "Failed to toggle status.");
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const res = await deleteWhitepaperAction(id);
    if (res.success) {
      setWhitepapers((prev) => prev.filter((w) => w._id !== id));
      setDeleteConfirmId(null);
      showFeedback("success", "Whitepaper deleted successfully.");
    } else {
      showFeedback("error", res.error || "Failed to delete whitepaper.");
    }
    setDeleting(false);
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    setUploadingDoc(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-document", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.success && data.url) {
        setEditingItem({
          ...editingItem,
          fileUrl: data.url,
          fileFormat: data.format as WhitepaperFormat,
          fileSize: data.size,
          fileSizeFormatted: data.sizeFormatted,
          originalFilename: data.originalFilename,
        });
        showFeedback(
          "success",
          `Uploaded ${data.originalFilename} (${data.format}, ${data.sizeFormatted}) successfully.`
        );
      } else {
        showFeedback("error", data.error || "Document upload failed.");
      }
    } catch (err: any) {
      showFeedback("error", err.message || "Network error while uploading document.");
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    setUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-product-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.success && data.url) {
        setEditingItem({
          ...editingItem,
          coverImage: data.url,
        });
        showFeedback("success", "Cover image uploaded successfully.");
      } else {
        showFeedback("error", data.error || "Cover image upload failed.");
      }
    } catch (err: any) {
      showFeedback("error", err.message || "Network error while uploading cover image.");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const trimmedTitle = (editingItem.title || "").trim();
    if (!trimmedTitle) {
      showFeedback("error", "Whitepaper title is required.");
      return;
    }

    let finalSlug = (editingItem.slug || "").trim();
    if (!finalSlug) {
      finalSlug = slugify(trimmedTitle);
    }

    if (!editingItem.excerpt?.trim()) {
      showFeedback("error", "Short description / excerpt is required.");
      return;
    }

    if (!editingItem.fileUrl) {
      showFeedback("error", "Please upload the actual document file (PDF, DOC, or DOCX) before saving.");
      return;
    }

    setSaving(true);
    const payload: WhitepaperRecord = {
      ...editingItem,
      title: trimmedTitle,
      slug: finalSlug,
      excerpt: editingItem.excerpt.trim(),
      chapters: editingItem.chapters?.filter((ch) => ch.trim().length > 0) || [],
    };

    const res = await saveWhitepaperAction(payload);
    if (res.success && res.data) {
      if (isNew) {
        setWhitepapers((prev) => [res.data!, ...prev]);
        showFeedback("success", `Whitepaper "${res.data.title}" published to catalog.`);
      } else {
        setWhitepapers((prev) => prev.map((w) => (w._id === res.data!._id ? res.data! : w)));
        showFeedback("success", `Whitepaper "${res.data.title}" updated successfully.`);
      }
      setModalOpen(false);
      setEditingItem(null);
    } else {
      showFeedback("error", res.error || "Failed to save whitepaper.");
    }
    setSaving(false);
  };

  // Filter calculation
  const topics = useMemo(() => {
    const set = new Set<string>();
    whitepapers.forEach((w) => {
      if (w.topic) set.add(w.topic);
    });
    return Array.from(set);
  }, [whitepapers]);

  const filteredWhitepapers = useMemo(() => {
    return whitepapers.filter((w) => {
      const matchSearch =
        search.trim() === "" ||
        w.title.toLowerCase().includes(search.toLowerCase()) ||
        w.slug.toLowerCase().includes(search.toLowerCase()) ||
        (w.excerpt && w.excerpt.toLowerCase().includes(search.toLowerCase())) ||
        (w.author && w.author.toLowerCase().includes(search.toLowerCase()));

      const matchChannel =
        filterChannel === "ALL" ||
        (filterChannel === "treel_main" && (w.category === "treel_main" || (w.displayOnResearch && !w.displayOnTmip))) ||
        (filterChannel === "tmip" && (w.category === "tmip" || (w.displayOnTmip && !w.displayOnResearch))) ||
        (filterChannel === "both" && (w.category === "both" || (w.displayOnTmip && w.displayOnResearch)));

      const matchTopic = filterTopic === "ALL" || w.topic === filterTopic;
      const matchIndustry = filterIndustry === "ALL" || w.industry === filterIndustry;
      const matchPub = filterPub === "ALL" || w.publicationStatus === filterPub;
      const matchFormat = filterFormat === "ALL" || w.fileFormat === filterFormat;

      return matchSearch && matchChannel && matchTopic && matchIndustry && matchPub && matchFormat;
    });
  }, [whitepapers, search, filterChannel, filterTopic, filterIndustry, filterPub, filterFormat]);

  const stats = useMemo(() => {
    return {
      total: whitepapers.length,
      published: whitepapers.filter((w) => w.publicationStatus === "Published").length,
      treelMain: whitepapers.filter((w) => w.category === "treel_main" || w.displayOnResearch !== false).length,
      downloads: whitepapers.reduce((sum, w) => sum + (w.downloadCount || 0), 0),
    };
  }, [whitepapers]);

  const targetPublicUrl = editingItem
    ? (editingItem.category === "treel_main" || (editingItem.displayOnResearch && !editingItem.displayOnTmip))
      ? `/research/${editingItem.slug || "slug"}`
      : `/tmip/whitepapers/${editingItem.slug || "slug"}`
    : "/tmip/whitepapers";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Whitepapers &amp; Research Publishing</h1>
              <p className="text-xs text-slate-400 font-mono">
                Manage downloadable PDF/Word whitepapers, gated access documents, and research on{" "}
                <Link href="/tmip/whitepapers" target="_blank" className="text-blue-400 hover:underline">
                  /tmip/whitepapers
                </Link>
                {" "}and{" "}
                <Link href="/research" target="_blank" className="text-amber-400 hover:underline">
                  /research
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={loadWhitepapers}
            variant="outline"
            size="sm"
            disabled={loading}
            className="border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            onClick={handleCreate}
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Upload New Whitepaper
          </Button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-sm transition-all ${
            feedback.type === "success"
              ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
              : "bg-rose-950/40 border-rose-500/30 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-white ml-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-slate-400">Total Catalog Papers</div>
          <div className="text-xl font-bold text-white mt-1">{stats.total}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-emerald-400">Published Live</div>
          <div className="text-xl font-bold text-emerald-300 mt-1">{stats.published}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-amber-400">Treel Main Research</div>
          <div className="text-xl font-bold text-amber-300 mt-1">{stats.treelMain}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-blue-400">Total Leads / Access Requests</div>
          <div className="text-xl font-bold text-blue-300 mt-1">{stats.downloads}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, slug, topic, author..."
            className="pl-9 bg-slate-900/80 border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 rounded-xl"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Channel / Destination Filter */}
          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Channel: All</option>
            <option value="treel_main">Treel Main (/research)</option>
            <option value="tmip">TMIP (/tmip/whitepapers)</option>
            <option value="both">Shared (Both)</option>
          </select>

          {/* Topic Category Filter */}
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Topic: All</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Industry Filter */}
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Industry: All</option>
            {COMMON_INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          {/* Visibility Filter */}
          <select
            value={filterPub}
            onChange={(e) => setFilterPub(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Visibility: All</option>
            <option value="Published">Published Only</option>
            <option value="Draft">Drafts Only</option>
          </select>

          {/* Format Filter */}
          <select
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Format: All</option>
            <option value="PDF">PDF Only</option>
            <option value="DOCX">DOCX Only</option>
            <option value="DOC">DOC Only</option>
          </select>
        </div>
      </div>

      {/* Whitepapers Table / List */}
      <Card className="bg-slate-900/60 border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-7 h-7 text-blue-400 animate-spin mx-auto" />
            <div className="text-sm font-mono text-slate-400">Loading research library...</div>
          </div>
        ) : filteredWhitepapers.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="text-sm font-medium text-slate-300">No whitepapers found</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {search || filterChannel !== "ALL" || filterTopic !== "ALL" || filterIndustry !== "ALL" || filterPub !== "ALL"
                ? "Try clearing your filters or search keywords."
                : "Upload and publish your first technical whitepaper or research report."}
            </p>
            <Button
              onClick={handleCreate}
              size="sm"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium mt-2"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Upload Whitepaper
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Whitepaper Title &amp; Slug</th>
                  <th className="py-3.5 px-4">Channel &amp; Topic</th>
                  <th className="py-3.5 px-4">Document File</th>
                  <th className="py-3.5 px-4">Visibility</th>
                  <th className="py-3.5 px-4">Downloads</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredWhitepapers.map((item) => {
                  const isPublished = item.publicationStatus === "Published";
                  const isPdf = item.fileFormat?.toUpperCase() === "PDF";
                  const publicUrl = item.directUrl || (
                    item.category === "treel_main" || (item.displayOnResearch && !item.displayOnTmip)
                      ? `/research/${item.slug}`
                      : `/tmip/whitepapers/${item.slug}`
                  );

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Title & Slug */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {item.isFeatured && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                <Star className="w-2.5 h-2.5 fill-blue-300" /> Featured
                              </span>
                            )}
                            <span className="font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                              {item.title}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-500 truncate">
                            /{item.slug}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">
                            {item.excerpt}
                          </div>
                        </div>
                      </td>

                      {/* Channel & Topic */}
                      <td className="py-4 px-4 text-xs space-y-1.5 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {(item.category === "treel_main" || (item.displayOnResearch && !item.displayOnTmip)) && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                              Treel Main
                            </span>
                          )}
                          {(item.category === "tmip" || (item.displayOnTmip && !item.displayOnResearch)) && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 font-semibold">
                              TMIP
                            </span>
                          )}
                          {(item.category === "both" || (item.displayOnTmip && item.displayOnResearch)) && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
                              Shared (Both)
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {item.topic || "Research"}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Industry: {item.industry || "All"}
                        </div>
                      </td>

                      {/* Document Details */}
                      <td className="py-4 px-4 text-xs whitespace-nowrap space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              isPdf
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            }`}
                          >
                            {item.fileFormat}
                          </span>
                          <span className="font-mono text-slate-300">
                            {item.fileSizeFormatted || "Unknown size"}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {item.length || "Standard length"} · {item.publishDate || "2026"}
                        </div>
                      </td>

                      {/* Visibility Toggle */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                            isPublished
                              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/20"
                              : "bg-amber-500/10 text-amber-300 border-amber-500/40 hover:bg-amber-500/20"
                          }`}
                          title={`Click to ${isPublished ? "unpublish" : "publish"}`}
                        >
                          {isPublished ? (
                            <>
                              <Eye className="w-3 h-3 text-emerald-400" />
                              <span>Live</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-amber-400" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Downloads count */}
                      <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-slate-300">
                        {item.downloadCount || 0}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Public Page View */}
                          <a
                            href={publicUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="View Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </a>

                          {/* Admin Direct Document View */}
                          {item.fileUrl && (
                            <a
                              href={`/api/tmip/whitepapers/document?id=${item._id}&action=view`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                              title="Direct Document File View"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}

                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 rounded-lg text-blue-400 hover:text-white hover:bg-blue-600/30 transition-colors"
                            title="Edit Whitepaper"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(item._id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-600/30 transition-colors"
                            title="Delete Whitepaper"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Delete Whitepaper?</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Are you sure you want to delete this whitepaper from the catalog? This will remove
                public access. Any prior captured leads will remain safely preserved in the CRM.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirmId(null)}
                disabled={deleting}
                className="border-slate-800 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleting}
                className="bg-rose-600 hover:bg-rose-500 text-white font-medium"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {isNew ? "Upload & Publish New Whitepaper" : `Edit: ${editingItem.title || "Whitepaper"}`}
                  </h2>
                  <div className="text-[11px] font-mono text-slate-400">
                    Live URL: <span className="text-blue-300">{targetPublicUrl}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2 text-xs font-mono shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === "general"
                    ? "border-blue-500 text-blue-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                General Metadata
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("document")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === "document"
                    ? "border-blue-500 text-blue-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Document File ({editingItem.fileFormat || "PDF"})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("media")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === "media"
                    ? "border-blue-500 text-blue-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Cover &amp; Access Controls
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === "seo"
                    ? "border-blue-500 text-blue-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                SEO &amp; Links
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: General Metadata */}
              {activeTab === "general" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-medium text-slate-300">
                        Whitepaper Title <span className="text-rose-400">*</span>
                      </label>
                      <Input
                        value={editingItem.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingItem({
                            ...editingItem,
                            title: val,
                            slug: isNew && (!editingItem.slug || editingItem.slug === slugify(editingItem.title))
                              ? slugify(val)
                              : editingItem.slug,
                          });
                        }}
                        placeholder="e.g. The Fleet ROI Paper — How TMIP Customers Reach Payback"
                        className="bg-slate-950 border-slate-800 text-white focus:border-blue-500 text-sm"
                        required
                      />
                    </div>

                    {/* Slug */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        URL Slug <span className="text-rose-400">*</span>
                      </label>
                      <Input
                        value={editingItem.slug}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            slug: slugify(e.target.value),
                          })
                        }
                        placeholder="e.g. roi-fleet-intelligence"
                        className="bg-slate-950 border-slate-800 text-white font-mono text-xs focus:border-blue-500"
                        required
                      />
                      <p className="text-[11px] text-slate-500 font-mono">
                        Target URL: {targetPublicUrl}
                      </p>
                    </div>

                    {/* Channel / Placement */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Publishing Channel / Placement
                      </label>
                      <select
                        value={editingItem.category || "both"}
                        onChange={(e) => {
                          const cat = e.target.value;
                          let onTmip = true;
                          let onResearch = true;
                          if (cat === "treel_main") {
                            onTmip = false;
                            onResearch = true;
                          } else if (cat === "tmip") {
                            onTmip = true;
                            onResearch = false;
                          }
                          setEditingItem({
                            ...editingItem,
                            category: cat,
                            displayOnTmip: onTmip,
                            displayOnResearch: onResearch,
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="both">Shared — Both Channels (/research &amp; /tmip/whitepapers)</option>
                        <option value="treel_main">Treel Main Corporate Research (/research)</option>
                        <option value="tmip">TMIP Enterprise Whitepapers (/tmip/whitepapers)</option>
                      </select>
                    </div>

                    {/* Topic Category */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Topic Category</label>
                      <div className="relative">
                        <Input
                          list="topic-options"
                          value={editingItem.topic}
                          onChange={(e) => setEditingItem({ ...editingItem, topic: e.target.value })}
                          placeholder="Select or enter topic..."
                          className="bg-slate-950 border-slate-800 text-white text-sm focus:border-blue-500"
                        />
                        <datalist id="topic-options">
                          {COMMON_TOPICS.map((top) => (
                            <option key={top} value={top} />
                          ))}
                        </datalist>
                      </div>
                    </div>

                    {/* Industry Lens */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Industry Lens</label>
                      <select
                        value={editingItem.industry}
                        onChange={(e) => setEditingItem({ ...editingItem, industry: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      >
                        {COMMON_INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Author */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Author / Publishing Team</label>
                      <Input
                        value={editingItem.author || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                        placeholder="e.g. Treel Mobility Fleet Analytics Group"
                        className="bg-slate-950 border-slate-800 text-white text-sm focus:border-blue-500"
                      />
                    </div>

                    {/* Page Count / Length */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Length / Page Count</label>
                      <Input
                        value={editingItem.length || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, length: e.target.value })}
                        placeholder="e.g. 28 pages or 18 pages"
                        className="bg-slate-950 border-slate-800 text-white text-sm focus:border-blue-500"
                      />
                    </div>

                    {/* Publish Date */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-medium text-slate-300">Display Publication Date</label>
                      <Input
                        value={editingItem.publishDate || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, publishDate: e.target.value })}
                        placeholder="e.g. October 2026"
                        className="bg-slate-950 border-slate-800 text-white text-sm focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-medium text-slate-300">
                      Short Description / Excerpt <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.excerpt}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      placeholder="Concise 2-3 sentence overview displayed on whitepaper cards and in download previews..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Detailed Description */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-medium text-slate-300">
                      Full Paper Synopsis / Abstract (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.description || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      placeholder="Extended executive synopsis or table of contents..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Chapters / Table of Contents */}
                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs font-medium text-slate-300">
                          Table of Contents / Chapters
                        </label>
                        <p className="text-[11px] text-slate-500">
                          Displayed in the &ldquo;In this paper&rdquo; section on research detail pages.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const nextNum = String((editingItem.chapters?.length || 0) + 1).padStart(2, "0");
                          setEditingItem({
                            ...editingItem,
                            chapters: [...(editingItem.chapters || []), `${nextNum}. New Section Topic`],
                          });
                        }}
                        className="inline-flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Chapter</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(editingItem.chapters || []).map((ch, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-7 text-center font-mono text-xs text-slate-500 shrink-0">
                            #{idx + 1}
                          </span>
                          <Input
                            value={ch}
                            onChange={(e) => {
                              const nextChs = [...(editingItem.chapters || [])];
                              nextChs[idx] = e.target.value;
                              setEditingItem({ ...editingItem, chapters: nextChs });
                            }}
                            placeholder="e.g. 01. Telemetry Ingestion & Baseline"
                            className="bg-slate-950 border-slate-800 text-white text-xs h-8 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const nextChs = (editingItem.chapters || []).filter((_, i) => i !== idx);
                              setEditingItem({ ...editingItem, chapters: nextChs });
                            }}
                            className="p-1.5 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800 shrink-0"
                            title="Remove Chapter"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {(!editingItem.chapters || editingItem.chapters.length === 0) && (
                        <p className="text-xs text-slate-600 italic py-1">No chapters added yet. Click &ldquo;Add Chapter&rdquo; to add.</p>
                      )}
                    </div>
                  </div>

                  {/* Route Placement & Visibility */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 pt-3">
                    <label className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold block">
                      Route Placement &amp; Visibility Controls
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingItem.displayOnTmip !== false}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              displayOnTmip: e.target.checked,
                            })
                          }
                          className="rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-0"
                        />
                        <span>Display on TMIP Whitepapers (/tmip/whitepapers)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingItem.displayOnResearch !== false}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              displayOnResearch: e.target.checked,
                            })
                          }
                          className="rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-0"
                        />
                        <span>Display on Research Hub (/research)</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-400">Research Publication Year</label>
                        <Input
                          value={editingItem.year || "2026"}
                          onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                          placeholder="e.g. 2026 or 2025"
                          className="bg-slate-900 border-slate-800 text-white text-xs h-8 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-400">Direct Page Route Override (Optional)</label>
                        <Input
                          value={editingItem.directUrl || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, directUrl: e.target.value })}
                          placeholder="e.g. /research/predictive-maintenance-heavy"
                          className="bg-slate-900 border-slate-800 text-white text-xs h-8 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Document Upload & File */}
              {activeTab === "document" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                      Upload Document File (.pdf, .doc, .docx)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Supported formats: PDF, Microsoft Word (.doc, .docx). Upload limit: 50MB.
                    </p>
                  </div>

                  {/* Current Document Status Card */}
                  {editingItem.fileUrl ? (
                    <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold font-mono">
                            {editingItem.fileFormat || "PDF"}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {editingItem.originalFilename || "Uploaded Document"}
                            </div>
                            <div className="text-xs font-mono text-slate-400">
                              Format: {editingItem.fileFormat} · Size: {editingItem.fileSizeFormatted || "Unknown"}
                            </div>
                          </div>
                        </div>

                        <a
                          href={`/api/tmip/whitepapers/document?id=${editingItem._id}&action=view`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:underline px-3 py-1.5 rounded-lg border border-blue-500/30 hover:bg-blue-500/10"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Test Access</span>
                        </a>
                      </div>

                      <div className="text-[11px] font-mono text-slate-500 truncate">
                        Path: {editingItem.fileUrl}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 text-center space-y-2">
                      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                      <div className="text-sm font-semibold text-amber-300">No Document Attached Yet</div>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        A document file is required for visitors to view or download this whitepaper.
                      </p>
                    </div>
                  )}

                  {/* Upload Picker */}
                  <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/80 text-center space-y-4">
                    <Upload className="w-8 h-8 text-blue-400 mx-auto" />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {uploadingDoc ? "Uploading document to durable storage..." : "Choose document file to upload or replace"}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Files are verified for magic bytes signature and uploaded directly to Supabase Storage with local durability backup.
                      </p>
                    </div>

                    <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer transition-all shadow-md">
                      <Upload className="w-4 h-4" />
                      <span>{uploadingDoc ? "Processing..." : "Select File (PDF / DOC / DOCX)"}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleDocumentUpload}
                        disabled={uploadingDoc}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Manual URL override if needed */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-medium text-slate-400">
                      Direct Storage URL (Auto-filled on upload)
                    </label>
                    <Input
                      value={editingItem.fileUrl}
                      onChange={(e) => setEditingItem({ ...editingItem, fileUrl: e.target.value })}
                      placeholder="https://... or /uploads/documents/..."
                      className="bg-slate-950 border-slate-800 text-white font-mono text-xs"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: Cover & Access Controls */}
              {activeTab === "media" && (
                <div className="space-y-6">
                  {/* Cover Image */}
                  <div className="space-y-3">
                    <label className="text-xs font-medium text-slate-300">Cover Thumbnail Image</label>
                    <div className="flex gap-2">
                      <Input
                        value={editingItem.coverImage || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, coverImage: e.target.value })}
                        placeholder="https://... or /uploads/products/..."
                        className="bg-slate-950 border-slate-800 text-white font-mono text-xs flex-1"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingCover ? "Uploading..." : "Upload Cover"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          disabled={uploadingCover}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {editingItem.coverImage && (
                      <div className="w-48 h-32 rounded-lg border border-slate-800 overflow-hidden bg-slate-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={editingItem.coverImage}
                          alt="Whitepaper Cover"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Gating & Feature Toggles */}
                  <div className="pt-4 border-t border-slate-800 space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Access &amp; Publication Controls
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Publication Status */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Visibility Status</label>
                        <select
                          value={editingItem.publicationStatus}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              publicationStatus: e.target.value as any,
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                        >
                          <option value="Published">Published (Active in Research Library)</option>
                          <option value="Draft">Draft (Internal Back-Office Only)</option>
                        </select>
                      </div>

                      {/* Gated Toggle */}
                      <div className="flex flex-col justify-end">
                        <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <input
                            type="checkbox"
                            checked={editingItem.gated !== false}
                            onChange={(e) => setEditingItem({ ...editingItem, gated: e.target.checked })}
                            className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                          />
                          <div>
                            <span className="text-xs text-slate-200 font-medium block">
                              Require Email Verification (Email-Gated)
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              Captures lead credentials before granting download access.
                            </span>
                          </div>
                        </label>
                      </div>

                      {/* Featured Toggle */}
                      <div className="sm:col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <input
                            type="checkbox"
                            checked={editingItem.isFeatured || false}
                            onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                            className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                          />
                          <div>
                            <span className="text-xs text-slate-200 font-medium block">
                              Pin as Featured Research Paper
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              Highlighted prominently in hero sections and library grids.
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SEO & Links */}
              {activeTab === "seo" && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Optional Direct Research Page URL
                    </label>
                    <Input
                      value={editingItem.directUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, directUrl: e.target.value })}
                      placeholder="e.g. /research/roi-fleet-intelligence"
                      className="bg-slate-950 border-slate-800 text-white text-xs font-mono"
                    />
                    <p className="text-[11px] text-slate-500">
                      If specified, visitors can also read full synopsis on this dedicated landing page.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Search Engine Optimization (SEO)
                    </h4>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Meta SEO Title</label>
                      <Input
                        value={editingItem.seoTitle || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, seoTitle: e.target.value })}
                        placeholder="Default falls back to Whitepaper Title | Treel"
                        className="bg-slate-950 border-slate-800 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Meta SEO Description</label>
                      <textarea
                        rows={2}
                        value={editingItem.seoDescription || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, seoDescription: e.target.value })}
                        placeholder="Default falls back to excerpt..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                  className="border-slate-800 text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  size="sm"
                  disabled={saving || uploadingDoc || uploadingCover}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  {saving ? "Saving Changes..." : isNew ? "Publish Whitepaper" : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
