"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  X, 
  Save, 
  Eye,
  EyeOff,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  AlertCircle,
  FileText,
  User,
  Tag,
  Truck,
  Shield,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Quote,
  ArrowUp,
  ArrowDown,
  Copy,
  Check
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { copyToClipboardSafe } from "@/lib/utils/clipboard";
import { getValidImageSrc } from "@/lib/utils/image-utils";
import { 
  getAdminCategoryContent, 
  createAdminCategoryContent, 
  updateAdminCategoryContent, 
  deleteAdminCategoryContent,
  togglePublishAdminCategoryContent
} from "@/lib/admin/admin-actions";
import { 
  ContentCategoryType, 
  TreelInsightArticle, 
  TmipCaseStudy, 
  SurakshaArticle, 
  PersonalBlogArticle 
} from "@/types/content";

interface CategoryMeta {
  id: ContentCategoryType;
  title: string;
  subtitle: string;
  description: string;
  publicUrl: string;
  itemNoun: string;
  icon: typeof BookOpen;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  badgeBg: string;
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: "treel_main",
    title: "Treel Main",
    subtitle: "/insights",
    description: "Mobility Intelligence & Long-Form Articles",
    publicUrl: "/insights",
    itemNoun: "Insight Article",
    icon: Sparkles,
    accentColor: "text-amber-400",
    accentBorder: "border-amber-500/50",
    accentBg: "bg-amber-500/10",
    badgeBg: "bg-amber-500/20 text-amber-300",
  },
  {
    id: "tmip",
    title: "TMIP",
    subtitle: "/tmip/customers/case-studies",
    description: "Enterprise Fleet Deployments & ROI Outcomes",
    publicUrl: "/tmip/customers/case-studies",
    itemNoun: "Case Study",
    icon: Truck,
    accentColor: "text-blue-400",
    accentBorder: "border-blue-500/50",
    accentBg: "bg-blue-500/10",
    badgeBg: "bg-blue-500/20 text-blue-300",
  },
  {
    id: "suraksha",
    title: "Suraksha",
    subtitle: "/suraksha/blog",
    description: "Drivers' Community Guidance & Highway Safety",
    publicUrl: "/suraksha/blog",
    itemNoun: "Suraksha Post",
    icon: Shield,
    accentColor: "text-orange-400",
    accentBorder: "border-orange-500/50",
    accentBg: "bg-orange-500/10",
    badgeBg: "bg-orange-500/20 text-orange-300",
  },
  {
    id: "personal",
    title: "Personal TPMS",
    subtitle: "/personal/blog",
    description: "Direct-to-Consumer Passenger Car Guides",
    publicUrl: "/personal/blog",
    itemNoun: "TPMS Blog",
    icon: FileText,
    accentColor: "text-emerald-400",
    accentBorder: "border-emerald-500/50",
    accentBg: "bg-emerald-500/10",
    badgeBg: "bg-emerald-500/20 text-emerald-300",
  },
];

const SUB_CATEGORIES_MAP: Record<ContentCategoryType, string[]> = {
  treel_main: [
    "Mobility Intelligence",
    "Fleet Operations",
    "Product Updates",
    "Industry Analysis",
    "Case Studies",
    "Founder Notes"
  ],
  tmip: [
    "Logistics",
    "Passenger Transport",
    "Construction",
    "Mining",
    "OEM"
  ],
  suraksha: [
    "Fuel efficiency",
    "Safety",
    "Business & GST",
    "Route planning",
    "Industry news",
    "Maintenance"
  ],
  personal: [
    "Road Safety",
    "Tyre Care",
    "Product Updates",
    "How-To Guides",
    "Fleet Telematics",
    "Industry Insights"
  ]
};

export default function AdminBlogsPage() {
  const [activeCategory, setActiveCategory] = useState<ContentCategoryType>("treel_main");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "Published" | "Draft">("ALL");
  const [subFilter, setSubFilter] = useState("ALL");
  
  // Category counts cache for all 4 categories
  const [categoryCounts, setCategoryCounts] = useState<Record<ContentCategoryType, { total: number; published: number; draft: number }>>({
    treel_main: { total: 0, published: 0, draft: 0 },
    tmip: { total: 0, published: 0, draft: 0 },
    suraksha: { total: 0, published: 0, draft: 0 },
    personal: { total: 0, published: 0, draft: 0 },
  });

  // Modal states
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingTitle, setDeletingTitle] = useState<string>("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const activeMeta = CATEGORIES.find((c) => c.id === activeCategory)!;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  const handleCopyText = async (text: string, key: string, label: string) => {
    const res = await copyToClipboardSafe(text);
    if (res.success) {
      setCopiedKey(key);
      showFeedback("success", `${label} copied to clipboard.`);
      setTimeout(() => {
        setCopiedKey((curr) => (curr === key ? null : curr));
      }, 2000);
    } else {
      showFeedback("error", res.error || `Could not copy ${label}. Please copy manually.`);
    }
  };

  // Load items for active category and refresh all category statistics
  const loadContent = async (category = activeCategory) => {
    setLoading(true);
    const res = await getAdminCategoryContent(category);
    if (res.success && res.data) {
      setItems(res.data);
    } else {
      showFeedback("error", res.error || `Failed to load ${category} content`);
    }
    setLoading(false);

    // Refresh counts for all categories in background
    refreshAllCounts();
  };

  const refreshAllCounts = async () => {
    const cats: ContentCategoryType[] = ["treel_main", "tmip", "suraksha", "personal"];
    const countsMap: any = {};
    for (const cat of cats) {
      const res = await getAdminCategoryContent(cat);
      if (res.success && res.data) {
        const total = res.data.length;
        const published = res.data.filter((i: any) => i.status === "Published").length;
        countsMap[cat] = { total, published, draft: total - published };
      }
    }
    if (Object.keys(countsMap).length > 0) {
      setCategoryCounts((prev) => ({ ...prev, ...countsMap }));
    }
  };

  useEffect(() => {
    loadContent(activeCategory);
    setSubFilter("ALL");
    setSearch("");
  }, [activeCategory]);

  const handleCategorySwitch = (catId: ContentCategoryType) => {
    if (catId === activeCategory) return;
    setActiveCategory(catId);
  };

  const handleCreate = () => {
    const now = new Date().toISOString();
    const dateFormatted = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

    if (activeCategory === "treel_main") {
      setEditingItem({
        _id: `new_insight_${Date.now()}`,
        title: "",
        slug: "",
        category: "Mobility Intelligence",
        categorySlug: "mobility-intelligence",
        deck: "",
        author: "Treel Mobility Team",
        authorRole: "Mobility Intelligence",
        authorBio: "Engineering and telemetry research team at Treel Mobility Solutions.",
        date: dateFormatted,
        publishIsoDate: now.split("T")[0],
        readTime: "5 min read",
        status: "Published",
        tldr: "",
        body: {
          sections: [
            {
              heading: "Key Analysis",
              paragraphs: [""]
            }
          ],
          pullQuote: {
            quote: "",
            attribution: "— Treel Intelligence"
          }
        },
        relatedSlugs: []
      });
    } else if (activeCategory === "tmip") {
      setEditingItem({
        _id: `new_cs_${Date.now()}`,
        headline: "",
        slug: "",
        industry: "Logistics",
        fleetSize: "100-500",
        excerpt: "",
        metricValue: "0.5–0.6% Fuel Savings",
        metricLabel: "Measured Fleet Improvement",
        isFeatured: false,
        status: "Published",
        customerProfile: "",
        challenge: "",
        solution: "",
        quote: {
          text: "",
          author: "",
          title: ""
        },
        content: ""
      });
    } else if (activeCategory === "suraksha") {
      setEditingItem({
        _id: `new_sur_${Date.now()}`,
        title: "",
        slug: "",
        category: "Safety",
        excerpt: "",
        author: "Suraksha Fleet Team",
        date: dateFormatted,
        readTime: "5 min read",
        keyTakeaway: "Suraksha delivers continuous tyre pressure and temperature alerts to protect driver safety.",
        content: "",
        image: "",
        status: "Published"
      });
    } else {
      // Personal TPMS
      setEditingItem({
        _id: `new_blog_${Date.now()}`,
        title: "",
        subtitle: "",
        slug: "",
        description: "",
        blogContent: "",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
        metatitle: "",
        metadescription: "",
        category: "Road Safety",
        author: "Treel Automotive Team",
        status: "Published",
        readTime: "4 min read",
        date: now
      });
    }
    setIsNewItem(true);
  };

  const handleEdit = (item: any) => {
    const cloned = JSON.parse(JSON.stringify(item));
    if (activeCategory === "treel_main") {
      cloned.tldr = cloned.tldr || "";
      if (!cloned.body || !Array.isArray(cloned.body.sections) || cloned.body.sections.length === 0) {
        cloned.body = {
          sections: [{ heading: "Key Analysis", paragraphs: [cloned.deck || cloned.content || ""] }],
          pullQuote: cloned.body?.pullQuote
        };
      }
    }
    if (cloned.image !== undefined) {
      cloned.image = getValidImageSrc(cloned.image) || "";
    }
    setEditingItem(cloned);
    setIsNewItem(false);
  };

  const handleTitleChange = (val: string) => {
    if (!editingItem) return;
    const titleProp = activeCategory === "tmip" ? "headline" : "title";
    const updates: any = { [titleProp]: val };

    if (isNewItem) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      updates.slug = generatedSlug;
    }
    setEditingItem({ ...editingItem, ...updates });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    // Field Validations
    if (activeCategory === "tmip") {
      if (!editingItem.headline?.trim()) {
        showFeedback("error", "Case study headline is required.");
        return;
      }
      if (!editingItem.excerpt?.trim()) {
        showFeedback("error", "Case study summary / excerpt is required.");
        return;
      }
    } else {
      if (!editingItem.title?.trim()) {
        showFeedback("error", "Title is required.");
        return;
      }
    }

    if (activeCategory === "treel_main") {
      if (!editingItem.deck?.trim()) {
        showFeedback("error", "Deck / Executive summary is required.");
        return;
      }
      if (!editingItem.body?.sections || editingItem.body.sections.length === 0) {
        showFeedback("error", "At least one article section is required.");
        return;
      }
      const hasEmpty = editingItem.body.sections.some(
        (s: any) => !s.heading?.trim() || (!Array.isArray(s.paragraphs) || s.paragraphs.length === 0)
      );
      if (hasEmpty) {
        showFeedback("error", "Please ensure every section has a heading and paragraph content.");
        return;
      }
    }

    if (activeCategory === "personal" && !editingItem.blogContent?.trim()) {
      showFeedback("error", "Blog content is required.");
      return;
    }

    setSaving(true);

    if (isNewItem) {
      const res = await createAdminCategoryContent(activeCategory, editingItem);
      if (res.success) {
        showFeedback("success", `${activeMeta.itemNoun} created successfully.`);
        setEditingItem(null);
        await loadContent();
      } else {
        showFeedback("error", res.error || "Failed to create content item");
      }
    } else {
      const res = await updateAdminCategoryContent(activeCategory, editingItem._id, editingItem);
      if (res.success) {
        showFeedback("success", `${activeMeta.itemNoun} updated successfully.`);
        setEditingItem(null);
        await loadContent();
      } else {
        showFeedback("error", res.error || "Failed to update content item");
      }
    }
    setSaving(false);
  };

  const handleToggleStatus = async (item: any) => {
    const nextStatus = item.status === "Published" ? "Draft" : "Published";
    const res = await togglePublishAdminCategoryContent(activeCategory, item._id, item.status || "Published");
    if (res.success) {
      showFeedback("success", `Marked as ${nextStatus}.`);
      await loadContent();
    } else {
      showFeedback("error", res.error || "Failed to update status");
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setSaving(true);
    const res = await deleteAdminCategoryContent(activeCategory, deletingId);
    if (res.success) {
      showFeedback("success", `"${deletingTitle}" deleted permanently.`);
      setDeletingId(null);
      await loadContent();
    } else {
      showFeedback("error", res.error || "Failed to delete item");
    }
    setSaving(false);
  };

  // Filtered Items for active category
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const titleStr = (activeCategory === "tmip" ? item.headline : item.title) || "";
      const text = typeof titleStr === "string" ? titleStr : (Array.isArray(titleStr) ? titleStr[0] : "");
      const matchesSearch = 
        !search.trim() ||
        text.toLowerCase().includes(search.toLowerCase()) ||
        (item.slug || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.author || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.category || item.industry || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.excerpt || item.deck || item.description || "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus = filterStatus === "ALL" || item.status === filterStatus;
      
      const itemSubCat = item.category || item.industry || "";
      const matchesSubFilter = subFilter === "ALL" || itemSubCat === subFilter;

      return matchesSearch && matchesStatus && matchesSubFilter;
    });
  }, [items, search, filterStatus, subFilter, activeCategory]);

  return (
    <div className="space-y-8 max-w-7xl font-sans">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Treel Admin / Content Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Content &amp; Blog Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage articles, case studies, and blogs across all four sections of the Treel ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={activeMeta.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span>View Live Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => loadContent()}
            disabled={loading}
            className="border-white/10 bg-white/5 hover:bg-white/10 text-slate-200"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin text-blue-400" : ""}`} />
            Refresh
          </Button>

          <Button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            New {activeMeta.itemNoun}
          </Button>
        </div>
      </div>

      {/* 2. Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200 ${
            feedback.type === "success"
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/40 border-red-500/40 text-red-300"
          }`}
        >
          <div className="flex items-center gap-3">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{feedback.message}</span>
          </div>
          <button 
            onClick={() => setFeedback(null)} 
            className="text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. Four Distinguishable Category Cards / Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const counts = categoryCounts[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySwitch(cat.id)}
              className={`relative text-left p-5 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? `bg-slate-900/90 ${cat.accentBorder} shadow-lg ring-1 ring-white/20`
                  : "bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/60"
              }`}
            >
              {isActive && (
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl ${cat.badgeBg.split(" ")[0]}`} />
              )}
              
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${isActive ? cat.accentBg : "bg-white/5"} ${cat.accentColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${isActive ? cat.badgeBg : "bg-white/5 text-slate-400"}`}>
                  {cat.subtitle}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className={`font-semibold text-base ${isActive ? "text-white" : "text-slate-300"}`}>
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  <strong className="text-white font-medium">{counts.total}</strong> items
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-medium">{counts.published} live</span>
                  {counts.draft > 0 && (
                    <span className="text-amber-400 font-medium">· {counts.draft} draft</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. Active Category Context Banner & Filters */}
      <Card className="bg-slate-900/60 border-white/10 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Active Category:
            </span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono uppercase tracking-wider ${activeMeta.badgeBg}`}>
              {activeMeta.title}
            </span>
            <span className="text-xs text-slate-400">
              ({filteredItems.length} of {items.length} records matching)
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Status Filter */}
            <div className="inline-flex rounded-lg border border-white/10 bg-slate-950 p-1 text-xs">
              {(["ALL", "Published", "Draft"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    filterStatus === st
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Sub-Category / Industry Dropdown */}
            <select
              value={subFilter}
              onChange={(e) => setSubFilter(e.target.value)}
              className="bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Sub-categories</option>
              {SUB_CATEGORIES_MAP[activeCategory].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder={`Search ${activeMeta.title} by title, slug, excerpt, or author...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-slate-950 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>
      </Card>

      {/* 5. Content Table */}
      <Card className="bg-slate-900/60 border-white/10 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-400 mx-auto" />
            <p className="text-sm text-slate-400">Loading {activeMeta.title} content...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-base font-semibold text-slate-200">No content items found</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {search || filterStatus !== "ALL" || subFilter !== "ALL"
                ? "Try adjusting your search query or filters to see more results."
                : `No items in ${activeMeta.title} yet. Create your first item to publish.`}
            </p>
            <Button
              size="sm"
              onClick={handleCreate}
              className="mt-2 bg-blue-600 hover:bg-blue-500 text-white"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add {activeMeta.itemNoun}
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/70 border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-6">Content Title &amp; Slug</th>
                  <th className="py-3.5 px-6">
                    {activeCategory === "tmip" ? "Industry & Fleet" : "Category / Sub"}
                  </th>
                  <th className="py-3.5 px-6">
                    {activeCategory === "tmip" ? "Primary Metric" : "Author & Read Time"}
                  </th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((item) => {
                  const title = (activeCategory === "tmip" ? item.headline : item.title) || "Untitled";
                  const displayTitle = typeof title === "string" ? title : (Array.isArray(title) ? title[0] : "Untitled");
                  const itemSlug = item.slug || item._id;

                  // Target preview link
                  let publicPreviewUrl = activeMeta.publicUrl;
                  if (activeCategory === "treel_main" && item.slug) {
                    publicPreviewUrl = `/insights/${item.slug}`;
                  } else if (activeCategory === "tmip" && item.slug) {
                    publicPreviewUrl = `/tmip/customers/case-studies/${item.slug}`;
                  } else if (activeCategory === "personal" && item.slug) {
                    publicPreviewUrl = `/personal/blog/${item.slug}`;
                  } else if (activeCategory === "suraksha") {
                    publicPreviewUrl = `/suraksha/blog/${item.slug || item._id}`;
                  }

                  return (
                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                      {/* Title & Slug */}
                      <td className="py-4 px-6 max-w-md">
                        <div className="space-y-1">
                          <div className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                            {displayTitle}
                          </div>
                          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                            <span className="truncate max-w-xs">{itemSlug}</span>
                            <button
                              type="button"
                              onClick={() => handleCopyText(itemSlug, `slug_${item._id}`, "Slug")}
                              title="Copy slug"
                              aria-label={`Copy slug ${itemSlug}`}
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer inline-flex items-center"
                            >
                              {copiedKey === `slug_${item._id}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            {item.isFeatured && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Sub-Category / Industry */}
                      <td className="py-4 px-6 text-slate-300">
                        {activeCategory === "tmip" ? (
                          <div className="space-y-1">
                            <span className="inline-block px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono">
                              {item.industry || "General"}
                            </span>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {item.fleetSize || "Fleet"}
                            </div>
                          </div>
                        ) : (
                          <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${activeMeta.badgeBg}`}>
                            {item.category || "General"}
                          </span>
                        )}
                      </td>

                      {/* Third Column (Metric or Author) */}
                      <td className="py-4 px-6 text-slate-300 text-xs">
                        {activeCategory === "tmip" ? (
                          <div className="space-y-0.5">
                            <div className="font-bold text-emerald-400 font-mono">
                              {item.metricValue || "—"}
                            </div>
                            <div className="text-[11px] text-slate-400 line-clamp-1 font-mono">
                              {item.metricLabel || ""}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <div className="text-slate-200 font-medium">
                              {item.author || "Treel Team"}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{item.readTime || "5 min"}</span>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleStatus(item)}
                          title={`Click to ${item.status === "Published" ? "unpublish (Draft)" : "publish"}`}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                            item.status === "Published"
                              ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.status === "Published" ? "bg-emerald-400" : "bg-amber-400"}`} />
                          {item.status || "Published"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Live Preview */}
                          <Link
                            href={publicPreviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            title="View blog"
                            aria-label={`View blog ${displayTitle}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          {/* Copy Public Link */}
                          <button
                            type="button"
                            onClick={() => {
                              const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${publicPreviewUrl}` : publicPreviewUrl;
                              handleCopyText(fullUrl, `link_${item._id}`, "Public link");
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            title="Copy public link"
                            aria-label={`Copy public link for ${displayTitle}`}
                          >
                            {copiedKey === `link_${item._id}` ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors cursor-pointer"
                            title="Edit content"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              setDeletingId(item._id);
                              setDeletingTitle(displayTitle);
                            }}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Delete item"
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

      {/* 6. Dynamic Create / Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-white/20 rounded-2xl max-w-3xl w-full my-8 text-white shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${activeMeta.badgeBg}`}>
                  {activeMeta.title}
                </span>
                <h2 className="text-xl font-bold mt-1">
                  {isNewItem ? `Create New ${activeMeta.itemNoun}` : `Edit ${activeMeta.itemNoun}`}
                </h2>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Scrollable Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Category-Specific Form Fields */}

              {/* === A. TREEL MAIN (INSIGHTS) === */}
              {activeCategory === "treel_main" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Article Title *
                    </label>
                    <Input
                      value={editingItem.title || ""}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. From Telemetry to Reasoning: The Architecture of Digital Twins"
                      className="bg-slate-950 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
                          URL Slug *
                        </label>
                        {editingItem.slug && (
                          <button
                            type="button"
                            onClick={() => handleCopyText(editingItem.slug, "modal_slug", "Slug")}
                            className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                            title="Copy slug"
                          >
                            {copiedKey === "modal_slug" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === "modal_slug" ? "Copied" : "Copy"}</span>
                          </button>
                        )}
                      </div>
                      <Input
                        value={editingItem.slug || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                        placeholder="e.g. vehicle-digital-twins-architecture"
                        className="bg-slate-950 border-white/10 text-white font-mono text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Category
                      </label>
                      <select
                        value={editingItem.category || "Mobility Intelligence"}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full bg-slate-950 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                      >
                        {SUB_CATEGORIES_MAP.treel_main.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Author Name
                      </label>
                      <Input
                        value={editingItem.author || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                        placeholder="e.g. Manish Ingale"
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Author Role
                      </label>
                      <Input
                        value={editingItem.authorRole || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, authorRole: e.target.value })}
                        placeholder="e.g. Founder, Treel"
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Read Time
                      </label>
                      <Input
                        value={editingItem.readTime || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                        placeholder="e.g. 6 min read"
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Deck / Executive Summary *
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.deck || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, deck: e.target.value })}
                      placeholder="Concise high-level summary that appears on the card and article header..."
                      className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Author Biography
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.authorBio || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, authorBio: e.target.value })}
                      placeholder="Short bio for the author card at the end of the article..."
                      className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Key Takeaway (Optional)
                        </label>
                        {editingItem.tldr && (
                          <button
                            type="button"
                            onClick={() => handleCopyText(editingItem.tldr, "modal_tldr", "Key Takeaway")}
                            className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                            title="Copy Key Takeaway"
                          >
                            {copiedKey === "modal_tldr" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === "modal_tldr" ? "Copied" : "Copy Key Takeaway"}</span>
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={3}
                        value={editingItem.tldr || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, tldr: e.target.value })}
                        placeholder="Key takeaway paragraph for busy executives..."
                        className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-blue-500 font-sans leading-relaxed"
                      />
                    </div>

                  {/* Multi-Section Article Editor */}
                  <div className="space-y-4 pt-2 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
                          Article Sections ({editingItem.body?.sections?.length || 0}) *
                        </label>
                        <p className="text-[11px] text-slate-400">
                          Add, edit, and reorder all sections of the article. All sections are published in order.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const currentSecs = editingItem.body?.sections || [];
                          setEditingItem({
                            ...editingItem,
                            body: {
                              ...editingItem.body,
                              sections: [
                                ...currentSecs,
                                {
                                  heading: `Section ${currentSecs.length + 1}`,
                                  paragraphs: [""]
                                }
                              ]
                            }
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors w-fit shrink-0 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Section</span>
                      </button>
                    </div>

                    {(!editingItem.body?.sections || editingItem.body.sections.length === 0) ? (
                      <div className="p-4 text-center border border-dashed border-white/10 rounded-lg text-slate-400 text-xs">
                        No sections defined. Click &ldquo;Add Section&rdquo; to add your first article section.
                      </div>
                    ) : (
                      editingItem.body.sections.map((section: any, sIdx: number) => (
                        <div key={sIdx} className="p-4 rounded-lg bg-slate-900 border border-white/10 space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 text-[11px] font-mono font-bold">
                                Section #{sIdx + 1}
                              </span>
                              <span className="text-xs font-semibold text-white">Section Heading</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={sIdx === 0}
                                onClick={() => {
                                  if (sIdx === 0) return;
                                  const nextSecs = [...editingItem.body.sections];
                                  const temp = nextSecs[sIdx];
                                  nextSecs[sIdx] = nextSecs[sIdx - 1];
                                  nextSecs[sIdx - 1] = temp;
                                  setEditingItem({
                                    ...editingItem,
                                    body: { ...editingItem.body, sections: nextSecs }
                                  });
                                }}
                                title="Move Section Up"
                                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={sIdx === editingItem.body.sections.length - 1}
                                onClick={() => {
                                  if (sIdx === editingItem.body.sections.length - 1) return;
                                  const nextSecs = [...editingItem.body.sections];
                                  const temp = nextSecs[sIdx];
                                  nextSecs[sIdx] = nextSecs[sIdx + 1];
                                  nextSecs[sIdx + 1] = temp;
                                  setEditingItem({
                                    ...editingItem,
                                    body: { ...editingItem.body, sections: nextSecs }
                                  });
                                }}
                                title="Move Section Down"
                                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const nextSecs = editingItem.body.sections.filter((_: any, idx: number) => idx !== sIdx);
                                  setEditingItem({
                                    ...editingItem,
                                    body: { ...editingItem.body, sections: nextSecs }
                                  });
                                }}
                                title="Delete Section"
                                className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-950/40 ml-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <Input
                            value={section.heading || ""}
                            onChange={(e) => {
                              const nextSecs = [...editingItem.body.sections];
                              nextSecs[sIdx] = { ...nextSecs[sIdx], heading: e.target.value };
                              setEditingItem({
                                ...editingItem,
                                body: { ...editingItem.body, sections: nextSecs }
                              });
                            }}
                            placeholder="e.g. The Three-Layer Architecture of the Vehicle Digital Twin"
                            className="bg-slate-950 border-white/10 text-white font-medium"
                            required
                          />

                          <div>
                            <label className="block text-[11px] font-mono text-slate-400 mb-1">
                              Section Paragraphs (separate paragraphs with an empty blank line)
                            </label>
                            <textarea
                              rows={5}
                              value={Array.isArray(section.paragraphs) ? section.paragraphs.join("\n\n") : (section.paragraphs || "")}
                              onChange={(e) => {
                                const pars = e.target.value.split("\n\n").filter(Boolean);
                                const nextSecs = [...editingItem.body.sections];
                                nextSecs[sIdx] = { ...nextSecs[sIdx], paragraphs: pars };
                                setEditingItem({
                                  ...editingItem,
                                  body: { ...editingItem.body, sections: nextSecs }
                                });
                              }}
                              placeholder="Write section paragraphs here. Separate each paragraph with an empty line..."
                              className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white font-sans leading-relaxed focus:outline-none focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>
                      ))
                    )}

                    {/* Pull Quote Callout Box */}
                    <div className="p-4 rounded-lg bg-slate-900/80 border border-white/10 space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Pull Quote Callout (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={editingItem.body?.pullQuote?.quote || ""}
                        onChange={(e) => {
                          setEditingItem({
                            ...editingItem,
                            body: {
                              ...editingItem.body,
                              pullQuote: {
                                ...(editingItem.body?.pullQuote || {}),
                                quote: e.target.value,
                                attribution: editingItem.body?.pullQuote?.attribution || "— Treel Intelligence"
                              }
                            }
                          });
                        }}
                        placeholder="Key highlighted quote to feature inline..."
                        className="w-full bg-slate-950 border border-white/10 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                      <Input
                        value={editingItem.body?.pullQuote?.attribution || ""}
                        onChange={(e) => {
                          setEditingItem({
                            ...editingItem,
                            body: {
                              ...editingItem.body,
                              pullQuote: {
                                ...(editingItem.body?.pullQuote || {}),
                                attribution: e.target.value
                              }
                            }
                          });
                        }}
                        placeholder="Attribution e.g. — Manish Ingale, Founder"
                        className="bg-slate-950 border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* === B. TMIP (CASE STUDIES) === */}
              {activeCategory === "tmip" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Case Study Headline *
                    </label>
                    <Input
                      value={editingItem.headline || ""}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. 1,000 trucks. 12 months. What changed."
                      className="bg-slate-950 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
                          URL Slug *
                        </label>
                        {editingItem.slug && (
                          <button
                            type="button"
                            onClick={() => handleCopyText(editingItem.slug, "modal_slug", "Slug")}
                            className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                            title="Copy slug"
                          >
                            {copiedKey === "modal_slug" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === "modal_slug" ? "Copied" : "Copy"}</span>
                          </button>
                        )}
                      </div>
                      <Input
                        value={editingItem.slug || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                        placeholder="e.g. 1000-truck-case-study"
                        className="bg-slate-950 border-white/10 text-white font-mono text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Industry Sector
                      </label>
                      <select
                        value={editingItem.industry || "Logistics"}
                        onChange={(e) => setEditingItem({ ...editingItem, industry: e.target.value })}
                        className="w-full bg-slate-950 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                      >
                        {SUB_CATEGORIES_MAP.tmip.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Fleet Size
                      </label>
                      <select
                        value={editingItem.fleetSize || "100-500"}
                        onChange={(e) => setEditingItem({ ...editingItem, fleetSize: e.target.value })}
                        className="w-full bg-slate-950 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                      >
                        {["Under 100", "100-500", "500-2000", "2000+"].map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Highlight Metric Value
                      </label>
                      <Input
                        value={editingItem.metricValue || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, metricValue: e.target.value })}
                        placeholder="e.g. 0.5–0.6% Fuel · 6.8% Tyre Life"
                        className="bg-slate-950 border-white/10 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Metric Description Label
                      </label>
                      <Input
                        value={editingItem.metricLabel || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, metricLabel: e.target.value })}
                        placeholder="e.g. 34% downtime drop across 1,000 linehaul units"
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Case Study Excerpt / Summary *
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.excerpt || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      placeholder="Overview of the fleet deployment timeline, operating changes, and measured outcomes..."
                      className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Customer Profile
                    </label>
                    <Input
                      value={editingItem.customerProfile || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, customerProfile: e.target.value })}
                      placeholder="e.g. 1,000 linehaul trailers across pan-India routes"
                      className="bg-slate-950 border-white/10 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Operational Challenge
                      </label>
                      <textarea
                        rows={3}
                        value={editingItem.challenge || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, challenge: e.target.value })}
                        placeholder="What issues did the fleet operator face before TMIP?"
                        className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        TMIP Solution &amp; Deployment
                      </label>
                      <textarea
                        rows={3}
                        value={editingItem.solution || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, solution: e.target.value })}
                        placeholder="How did TMIP sensors and cloud algorithms solve it?"
                        className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-900 border border-white/10 space-y-3">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Featured Executive Quote (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.quote?.text || ""}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        quote: { ...(editingItem.quote || {}), text: e.target.value }
                      })}
                      placeholder="Quote from VP / Operations Head..."
                      className="w-full bg-slate-950 border border-white/10 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        value={editingItem.quote?.author || ""}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          quote: { ...(editingItem.quote || {}), author: e.target.value }
                        })}
                        placeholder="Author name e.g. Rajesh Kumar"
                        className="bg-slate-950 border-white/10 text-white text-xs"
                      />
                      <Input
                        value={editingItem.quote?.title || ""}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          quote: { ...(editingItem.quote || {}), title: e.target.value }
                        })}
                        placeholder="Role / Title e.g. VP Logistics Operations"
                        className="bg-slate-950 border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Full Case Study Narrative / Content (HTML or Markdown)
                    </label>
                    <textarea
                      rows={8}
                      value={editingItem.content || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                      placeholder="Full deep-dive article content, sections, telemetry results, and operational details..."
                      className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white font-mono focus:outline-none focus:border-blue-500 leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={!!editingItem.isFeatured}
                      onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                      className="rounded bg-slate-950 border-white/10 text-blue-600 focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="isFeatured" className="text-sm text-slate-300 cursor-pointer">
                      Feature on Case Studies hero section
                    </label>
                  </div>
                </div>
              )}

              {/* === C. SURAKSHA (DRIVERS' BLOG) === */}
              {activeCategory === "suraksha" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Post Title *
                    </label>
                    <Input
                      value={editingItem.title || ""}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. 10 Simple Fuel-Saving Tips Every Driver Should Know"
                      className="bg-slate-950 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
                          URL Slug *
                        </label>
                        {editingItem.slug && (
                          <button
                            type="button"
                            onClick={() => handleCopyText(editingItem.slug, "modal_slug", "Slug")}
                            className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                            title="Copy slug"
                          >
                            {copiedKey === "modal_slug" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === "modal_slug" ? "Copied" : "Copy"}</span>
                          </button>
                        )}
                      </div>
                      <Input
                        value={editingItem.slug || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                        placeholder="e.g. fuel-10-tips"
                        className="bg-slate-950 border-white/10 text-white font-mono text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Topic Category
                      </label>
                      <select
                        value={editingItem.category || "Safety"}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full bg-slate-950 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                      >
                        {SUB_CATEGORIES_MAP.suraksha.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Read Time
                      </label>
                      <Input
                        value={editingItem.readTime || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                        placeholder="e.g. 5 min read"
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Author / Team Desk
                      </label>
                      <Input
                        value={editingItem.author || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                        placeholder="e.g. Suraksha Fleet Team"
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Date
                      </label>
                      <Input
                        value={editingItem.date || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        placeholder="e.g. October 2026"
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Article Excerpt / Guidance *
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.excerpt || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      placeholder="Practical advice written in clear language for drivers and owner-operators..."
                      className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Full Article Body (HTML or Markdown)
                    </label>
                    <textarea
                      rows={8}
                      value={editingItem.content || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                      placeholder="Detailed advice, maintenance steps, safety guidelines in HTML or Markdown..."
                      className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white font-mono focus:outline-none focus:border-blue-500 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Cover Image URL (Optional)
                    </label>
                    <Input
                      value={editingItem.image || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="bg-slate-950 border-white/10 text-white"
                    />
                    {getValidImageSrc(editingItem.image) && (
                      <div className="mt-2 h-28 rounded-lg overflow-hidden border border-white/10 bg-slate-950">
                        <img
                          src={getValidImageSrc(editingItem.image)!}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
                      Key Takeaway for Indian Highway Drivers
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.keyTakeaway || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, keyTakeaway: e.target.value })}
                      placeholder="Crucial takeaway shown highlighted in the reader modal..."
                      className="w-full bg-slate-950 border border-orange-500/20 rounded-md p-2.5 text-xs text-orange-200 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* === D. PERSONAL TPMS (CONSUMER BLOG) === */}
              {activeCategory === "personal" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Blog Title *
                    </label>
                    <Input
                      value={editingItem.title || ""}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Why Your Car's Factory TPMS Isn't Enough for Indian Roads"
                      className="bg-slate-950 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
                          URL Slug *
                        </label>
                        {editingItem.slug && (
                          <button
                            type="button"
                            onClick={() => handleCopyText(editingItem.slug, "modal_slug", "Slug")}
                            className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                            title="Copy slug"
                          >
                            {copiedKey === "modal_slug" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === "modal_slug" ? "Copied" : "Copy"}</span>
                          </button>
                        )}
                      </div>
                      <Input
                        value={editingItem.slug || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                        placeholder="e.g. why-factory-tpms-isnt-enough"
                        className="bg-slate-950 border-white/10 text-white font-mono text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Category
                      </label>
                      <select
                        value={editingItem.category || "Road Safety"}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full bg-slate-950 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
                      >
                        {SUB_CATEGORIES_MAP.personal.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Author
                      </label>
                      <Input
                        value={editingItem.author || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                        placeholder="e.g. Treel Automotive Team"
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Read Time
                      </label>
                      <Input
                        value={editingItem.readTime || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, readTime: e.target.value })}
                        placeholder="e.g. 4 min read"
                        className="bg-slate-950 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Cover Image URL
                    </label>
                    <Input
                      value={editingItem.image || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="bg-slate-950 border-white/10 text-white"
                    />
                    {getValidImageSrc(editingItem.image) && (
                      <div className="mt-2 h-28 rounded-lg overflow-hidden border border-white/10 bg-slate-950">
                        <img
                          src={getValidImageSrc(editingItem.image)!}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Summary / Excerpt *
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.description || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      placeholder="Short summary for the blog card..."
                      className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Full Article Body (HTML or Markdown) *
                    </label>
                    <textarea
                      rows={8}
                      value={editingItem.blogContent || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, blogContent: e.target.value })}
                      placeholder="<p>Enter the complete HTML body here...</p>"
                      className="w-full bg-slate-950 border border-white/10 rounded-md p-3 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Status Selector across all categories */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Publication Status</div>
                  <div className="text-xs text-slate-400">
                    Draft items will not be visible on the public website.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Published"
                      checked={editingItem.status === "Published"}
                      onChange={() => setEditingItem({ ...editingItem, status: "Published" })}
                      className="text-emerald-500 focus:ring-0"
                    />
                    <span className="text-sm text-emerald-400 font-medium">Published</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Draft"
                      checked={editingItem.status === "Draft"}
                      onChange={() => setEditingItem({ ...editingItem, status: "Draft" })}
                      className="text-amber-500 focus:ring-0"
                    />
                    <span className="text-sm text-amber-400 font-medium">Draft</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingItem(null)}
                  disabled={saving}
                  className="border-white/10 text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-500 text-white min-w-28"
                >
                  {saving ? (
                    <RefreshCw className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-1.5" />
                      {isNewItem ? "Create Post" : "Save Changes"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Delete Confirmation Dialog */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold">Delete this {activeMeta.itemNoun}?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Are you sure you want to permanently delete{" "}
                <strong className="text-white">&ldquo;{deletingTitle}&rdquo;</strong> from {activeMeta.title}? This action cannot be undone.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setDeletingId(null)}
                disabled={saving}
                className="border-white/10 text-slate-300"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={saving}
                className="bg-red-600 hover:bg-red-500 text-white"
              >
                {saving ? "Deleting..." : "Permanently Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
