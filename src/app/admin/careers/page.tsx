"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
closeJobAction,
deleteJobAction,
getAdminCareersListAction,
saveJobAction,
toggleJobPublishAction
} from "@/lib/admin/admin-actions";
import { JobOpeningRecord } from "@/types/content";
import {
AlertCircle,
Briefcase,
CheckCircle2,
Edit3,
ExternalLink,
Eye,
EyeOff,
Lock,
MapPin,
Plus,
RefreshCw,
Save,
Search,
Trash2,
Unlock,
X
} from "lucide-react";
import Link from "next/link";
import { useCallback,useEffect,useMemo,useState } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const COMMON_TEAMS = [
  "Engineering",
  "Hardware & Embedded",
  "Product & Design",
  "GTM & Enterprise Sales",
  "Operations & Logistics",
  "Customer Success & Field Support",
  "Marketing & Growth",
  "People & HR"
];

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<JobOpeningRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTeam, setFilterTeam] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterArrangement, setFilterArrangement] = useState<string>("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<JobOpeningRecord | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "responsibilities" | "qualifications" | "benefits" | "seo">("details");

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showFeedback = useCallback((type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 6000);
  }, []);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    const res = await getAdminCareersListAction();
    if (res.success && res.data) {
      setJobs(res.data);
    } else {
      showFeedback("error", res.error || "Failed to load careers openings.");
    }
    setLoading(false);
  }, [showFeedback]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleCreate = () => {
    const today = new Date().toISOString().split("T")[0];
    const newRecord: JobOpeningRecord = {
      _id: `job_${Date.now()}`,
      slug: "",
      title: "",
      team: "Engineering",
      location: "Pune, India (Hybrid)",
      type: "Full-time",
      workArrangement: "Hybrid",
      postedDate: today,
      deadline: "",
      roleSummary: "",
      aboutTheRole: [""],
      responsibilities: [""],
      mustHaves: [""],
      niceToHaves: [""],
      whatYouGet: [""],
      experienceLevel: "Mid-Senior Level",
      applicationUrl: "",
      status: "Published",
      seoTitle: "",
      seoDescription: ""
    };
    setEditingItem(newRecord);
    setIsNew(true);
    setActiveTab("details");
    setModalOpen(true);
  };

  const handleEdit = (item: JobOpeningRecord) => {
    setEditingItem({
      ...item,
      aboutTheRole: Array.isArray(item.aboutTheRole) && item.aboutTheRole.length > 0 ? [...item.aboutTheRole] : [""],
      responsibilities: Array.isArray(item.responsibilities) && item.responsibilities.length > 0 ? [...item.responsibilities] : [""],
      mustHaves: Array.isArray(item.mustHaves) && item.mustHaves.length > 0 ? [...item.mustHaves] : [""],
      niceToHaves: Array.isArray(item.niceToHaves) && item.niceToHaves.length > 0 ? [...item.niceToHaves] : [""],
      whatYouGet: Array.isArray(item.whatYouGet) && item.whatYouGet.length > 0 ? [...item.whatYouGet] : [""]
    });
    setIsNew(false);
    setActiveTab("details");
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: JobOpeningRecord) => {
    const res = await toggleJobPublishAction(item._id);
    if (res.success && res.data) {
      setJobs((prev) => prev.map((j) => (j._id === item._id ? res.data! : j)));
      showFeedback(
        "success",
        `Job "${item.title}" is now ${res.data.status.toLowerCase()}.`
      );
    } else {
      showFeedback("error", res.error || "Failed to toggle status.");
    }
  };

  const handleToggleClose = async (item: JobOpeningRecord) => {
    if (item.status === "Closed") {
      // Reopen
      const updated: JobOpeningRecord = { ...item, status: "Published" };
      const res = await saveJobAction(updated);
      if (res.success && res.data) {
        setJobs((prev) => prev.map((j) => (j._id === item._id ? res.data! : j)));
        showFeedback("success", `Opening "${item.title}" has been reopened.`);
      } else {
        showFeedback("error", res.error || "Failed to reopen opening.");
      }
    } else {
      // Close
      const res = await closeJobAction(item._id);
      if (res.success && res.data) {
        setJobs((prev) => prev.map((j) => (j._id === item._id ? res.data! : j)));
        showFeedback("success", `Opening "${item.title}" is now marked as Closed.`);
      } else {
        showFeedback("error", res.error || "Failed to close opening.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const res = await deleteJobAction(id);
    if (res.success) {
      setJobs((prev) => prev.filter((j) => j._id !== id));
      setDeleteConfirmId(null);
      showFeedback("success", "Job opening removed successfully. Applicant records are preserved.");
    } else {
      showFeedback("error", res.error || "Failed to delete opening.");
    }
    setDeleting(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const trimmedTitle = (editingItem.title || "").trim();
    if (!trimmedTitle) {
      showFeedback("error", "Job title is required.");
      return;
    }

    let finalSlug = (editingItem.slug || "").trim();
    if (!finalSlug) {
      finalSlug = slugify(trimmedTitle);
    }

    if (!editingItem.roleSummary?.trim()) {
      showFeedback("error", "Role summary is required.");
      return;
    }

    setSaving(true);

    const cleanList = (arr?: string[]) =>
      (arr || []).map((x) => x.trim()).filter(Boolean);

    const cleanedAbout = cleanList(editingItem.aboutTheRole);
    const cleanedResp = cleanList(editingItem.responsibilities);
    const cleanedMust = cleanList(editingItem.mustHaves);
    const cleanedNice = cleanList(editingItem.niceToHaves);
    const cleanedPerks = cleanList(editingItem.whatYouGet);

    const payload: JobOpeningRecord = {
      ...editingItem,
      title: trimmedTitle,
      slug: finalSlug,
      aboutTheRole: cleanedAbout.length > 0 ? cleanedAbout : [editingItem.roleSummary.trim()],
      responsibilities: cleanedResp.length > 0 ? cleanedResp : ["Drive innovation and lead execution in this domain."],
      mustHaves: cleanedMust.length > 0 ? cleanedMust : ["Relevant professional experience in this technical area."],
      niceToHaves: cleanedNice,
      whatYouGet: cleanedPerks
    };

    const res = await saveJobAction(payload);
    if (res.success && res.data) {
      if (isNew) {
        setJobs((prev) => [res.data!, ...prev]);
        showFeedback("success", `Job opening "${res.data.title}" created.`);
      } else {
        setJobs((prev) => prev.map((j) => (j._id === res.data!._id ? res.data! : j)));
        showFeedback("success", `Job opening "${res.data.title}" updated successfully.`);
      }
      setModalOpen(false);
      setEditingItem(null);
    } else {
      showFeedback("error", res.error || "Failed to save job opening.");
    }
    setSaving(false);
  };

  // Generic dynamic list item helpers
  const addListItem = (field: keyof JobOpeningRecord) => {
    if (!editingItem) return;
    const current = (editingItem[field] as string[]) || [];
    setEditingItem({
      ...editingItem,
      [field]: [...current, ""]
    });
  };

  const updateListItem = (field: keyof JobOpeningRecord, idx: number, value: string) => {
    if (!editingItem) return;
    const current = [...((editingItem[field] as string[]) || [])];
    current[idx] = value;
    setEditingItem({
      ...editingItem,
      [field]: current
    });
  };

  const removeListItem = (field: keyof JobOpeningRecord, idx: number) => {
    if (!editingItem) return;
    const current = ((editingItem[field] as string[]) || []).filter((_, i) => i !== idx);
    setEditingItem({
      ...editingItem,
      [field]: current
    });
  };

  // Filter & Stats calculation
  const teams = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.team) set.add(j.team);
    });
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchSearch =
        search.trim() === "" ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.slug.toLowerCase().includes(search.toLowerCase()) ||
        (j.location && j.location.toLowerCase().includes(search.toLowerCase())) ||
        (j.team && j.team.toLowerCase().includes(search.toLowerCase())) ||
        (j.roleSummary && j.roleSummary.toLowerCase().includes(search.toLowerCase()));

      const matchTeam = filterTeam === "ALL" || j.team === filterTeam;
      const matchStatus = filterStatus === "ALL" || j.status === filterStatus;
      const matchArrangement =
        filterArrangement === "ALL" || j.workArrangement === filterArrangement;

      return matchSearch && matchTeam && matchStatus && matchArrangement;
    });
  }, [jobs, search, filterTeam, filterStatus, filterArrangement]);

  const stats = useMemo(() => {
    return {
      total: jobs.length,
      published: jobs.filter((j) => j.status === "Published").length,
      drafts: jobs.filter((j) => j.status === "Draft").length,
      closed: jobs.filter((j) => j.status === "Closed").length
    };
  }, [jobs]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Careers & Openings Management</h1>
              <p className="text-xs text-slate-400 font-mono">
                Manage live job postings, engineering roles, and hiring status on{" "}
                <Link href="/careers" target="_blank" className="text-teal-400 hover:underline">
                  /careers
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={loadJobs}
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
            className="bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-600/20"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Opening
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
          <div className="text-[11px] font-mono text-slate-400">Total Positions</div>
          <div className="text-xl font-bold text-white mt-1">{stats.total}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-emerald-400">Published / Active</div>
          <div className="text-xl font-bold text-emerald-300 mt-1">{stats.published}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-amber-400">Drafts (Internal)</div>
          <div className="text-xl font-bold text-amber-300 mt-1">{stats.drafts}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-slate-400">Closed Positions</div>
          <div className="text-xl font-bold text-slate-300 mt-1">{stats.closed}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role title, slug, team, location..."
            className="pl-9 bg-slate-900/80 border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-500 rounded-xl"
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
          {/* Department / Team Filter */}
          <select
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">Department: All</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">Status: All</option>
            <option value="Published">Published (Active)</option>
            <option value="Draft">Drafts Only</option>
            <option value="Closed">Closed Only</option>
          </select>

          {/* Work Arrangement Filter */}
          <select
            value={filterArrangement}
            onChange={(e) => setFilterArrangement(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-teal-500"
          >
            <option value="ALL">Workplace: All</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>

      {/* Jobs Table / List */}
      <Card className="bg-slate-900/60 border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-7 h-7 text-teal-400 animate-spin mx-auto" />
            <div className="text-sm font-mono text-slate-400">Loading careers roster...</div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="text-sm font-medium text-slate-300">No job openings found</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {search || filterTeam !== "ALL" || filterStatus !== "ALL" || filterArrangement !== "ALL"
                ? "Try clearing your search terms or filters."
                : "Get started by publishing your first job opening."}
            </p>
            <Button
              onClick={handleCreate}
              size="sm"
              className="bg-teal-600 hover:bg-teal-500 text-white font-medium mt-2"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Opening
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Role Title & Slug</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Location & Workplace</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredJobs.map((item) => {
                  const isPublished = item.status === "Published";
                  const isClosed = item.status === "Closed";
                  const isDraft = item.status === "Draft";

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Title & Slug */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="space-y-1">
                          <span className="font-semibold text-white group-hover:text-teal-300 transition-colors line-clamp-1">
                            {item.title}
                          </span>
                          <div className="text-xs font-mono text-slate-500 truncate">
                            /{item.slug}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">
                            {item.roleSummary}
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                          {item.team || "General"}
                        </span>
                      </td>

                      {/* Location & Workplace */}
                      <td className="py-4 px-4 text-xs space-y-1 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>{item.location || "Pune, India"}</span>
                        </div>
                        {item.workArrangement && (
                          <div className="text-[11px] font-mono text-slate-400 pl-5">
                            {item.workArrangement}
                          </div>
                        )}
                      </td>

                      {/* Employment Type */}
                      <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-300">
                        <div>{item.type || "Full-time"}</div>
                        {item.experienceLevel && (
                          <div className="text-[11px] text-slate-500 font-mono">
                            {item.experienceLevel}
                          </div>
                        )}
                      </td>

                      {/* Status Badge & Toggle */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {isPublished && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                              <Eye className="w-3 h-3 text-emerald-400" /> Live
                            </span>
                          )}
                          {isDraft && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30">
                              <EyeOff className="w-3 h-3 text-amber-400" /> Draft
                            </span>
                          )}
                          {isClosed && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700">
                              <Lock className="w-3 h-3" /> Closed
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {isPublished && (
                            <Link
                              href={`/careers/${item.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                              title="View on live website"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}

                          <button
                            onClick={() => handleTogglePublish(item)}
                            className="p-1.5 rounded-lg text-amber-400 hover:text-white hover:bg-amber-600/30 transition-colors"
                            title={isPublished ? "Set to Draft" : "Publish to live website"}
                          >
                            {isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => handleToggleClose(item)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isClosed
                                ? "text-emerald-400 hover:text-white hover:bg-emerald-600/30"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                            }`}
                            title={isClosed ? "Reopen opening" : "Mark opening as Closed"}
                          >
                            {isClosed ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 rounded-lg text-teal-400 hover:text-white hover:bg-teal-600/30 transition-colors"
                            title="Edit Role"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(item._id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-600/30 transition-colors"
                            title="Delete Opening"
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
              <h3 className="text-lg font-bold text-white">Delete Job Opening?</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Are you sure you want to delete this job opening? This removes the listing from the
                careers portal. Prior applicant records and inquiries will remain intact.
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
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {isNew ? "Create New Job Opening" : `Edit: ${editingItem.title || "Job Opening"}`}
                  </h2>
                  <div className="text-[11px] font-mono text-slate-400">
                    {editingItem.slug ? `/careers/${editingItem.slug}` : "Slug will be auto-generated"}
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
            <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2 text-xs font-mono shrink-0 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "details"
                    ? "border-teal-500 text-teal-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Job Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("responsibilities")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "responsibilities"
                    ? "border-teal-500 text-teal-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Responsibilities ({editingItem.responsibilities?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("qualifications")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "qualifications"
                    ? "border-teal-500 text-teal-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Qualifications
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("benefits")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "benefits"
                    ? "border-teal-500 text-teal-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                What You Get ({editingItem.whatYouGet?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "seo"
                    ? "border-teal-500 text-teal-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                SEO & Apply Link
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: Role Details */}
              {activeTab === "details" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Role Title */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-medium text-slate-300">
                        Job / Role Title <span className="text-rose-400">*</span>
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
                              : editingItem.slug
                          });
                        }}
                        placeholder="e.g. Lead Embedded Firmware Engineer"
                        className="bg-slate-950 border-slate-800 text-white focus:border-teal-500 text-sm"
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
                            slug: slugify(e.target.value)
                          })
                        }
                        placeholder="e.g. lead-embedded-firmware-engineer"
                        className="bg-slate-950 border-slate-800 text-white font-mono text-xs focus:border-teal-500"
                        required
                      />
                      <p className="text-[11px] text-slate-500 font-mono">
                        Public link: /careers/{editingItem.slug || "your-slug"}
                      </p>
                    </div>

                    {/* Department / Team */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Department / Team</label>
                      <div className="relative">
                        <Input
                          list="team-suggestions"
                          value={editingItem.team}
                          onChange={(e) => setEditingItem({ ...editingItem, team: e.target.value })}
                          placeholder="Select or enter team..."
                          className="bg-slate-950 border-slate-800 text-white text-sm focus:border-teal-500"
                        />
                        <datalist id="team-suggestions">
                          {COMMON_TEAMS.map((t) => (
                            <option key={t} value={t} />
                          ))}
                        </datalist>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Location</label>
                      <Input
                        value={editingItem.location}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        placeholder="e.g. Pune, India (Hybrid) or Bengaluru"
                        className="bg-slate-950 border-slate-800 text-white text-sm focus:border-teal-500"
                      />
                    </div>

                    {/* Work Arrangement */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Workplace Arrangement</label>
                      <select
                        value={editingItem.workArrangement || "Hybrid"}
                        onChange={(e) => setEditingItem({ ...editingItem, workArrangement: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>

                    {/* Employment Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Employment Type</label>
                      <select
                        value={editingItem.type}
                        onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    {/* Experience Level */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Experience Level</label>
                      <Input
                        value={editingItem.experienceLevel || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, experienceLevel: e.target.value })}
                        placeholder="e.g. 5+ years or Senior / Staff"
                        className="bg-slate-950 border-slate-800 text-white text-sm focus:border-teal-500"
                      />
                    </div>

                    {/* Status */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Publication Status</label>
                      <select
                        value={editingItem.status}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            status: e.target.value as any
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="Published">Published (Active on /careers)</option>
                        <option value="Draft">Draft (Internal Only)</option>
                        <option value="Closed">Closed (Position Filled / Paused)</option>
                      </select>
                    </div>

                    {/* Application Deadline */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Application Deadline</label>
                      <Input
                        type="date"
                        value={editingItem.deadline || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, deadline: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-white text-sm focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Role Summary */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-medium text-slate-300">
                      Role Summary / Teaser <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.roleSummary}
                      onChange={(e) => setEditingItem({ ...editingItem, roleSummary: e.target.value })}
                      placeholder="High-level overview displayed in the careers roster and search snippets..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
                      required
                    />
                  </div>

                  {/* About the Role (Paragraphs) */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-300">
                        About The Role (Paragraphs)
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addListItem("aboutTheRole")}
                        className="border-slate-800 bg-slate-950 text-teal-400 text-xs hover:bg-slate-800"
                      >
                        <Plus className="w-3 h-3 mr-1" /> Add Paragraph
                      </Button>
                    </div>
                    {(editingItem.aboutTheRole || []).map((p, idx) => (
                      <div key={idx} className="flex gap-2">
                        <textarea
                          rows={2}
                          value={p}
                          onChange={(e) => updateListItem("aboutTheRole", idx, e.target.value)}
                          placeholder={`Paragraph ${idx + 1}...`}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                        {(editingItem.aboutTheRole?.length || 0) > 1 && (
                          <button
                            type="button"
                            onClick={() => removeListItem("aboutTheRole", idx)}
                            className="p-2 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: Responsibilities */}
              {activeTab === "responsibilities" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                        Core Responsibilities
                      </h4>
                      <p className="text-xs text-slate-500">
                        Define day-to-day deliverables, architecture ownership, and key objectives.
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addListItem("responsibilities")}
                      className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Responsibility
                    </Button>
                  </div>

                  <div className="space-y-2.5">
                    {(editingItem.responsibilities || []).map((resp, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-500 w-6 text-right">
                          {idx + 1}.
                        </span>
                        <Input
                          value={resp}
                          onChange={(e) => updateListItem("responsibilities", idx, e.target.value)}
                          placeholder="e.g. Architect firmware updates for BLE tyre sensor clusters..."
                          className="bg-slate-950 border-slate-800 text-white text-xs flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem("responsibilities", idx)}
                          className="p-2 text-slate-500 hover:text-rose-400"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Qualifications */}
              {activeTab === "qualifications" && (
                <div className="space-y-6">
                  {/* Must Haves */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                          Must-Have Requirements
                        </h4>
                        <p className="text-xs text-slate-500">
                          Non-negotiable skills, background, and core technical proficiencies.
                        </p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => addListItem("mustHaves")}
                        className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Requirement
                      </Button>
                    </div>

                    <div className="space-y-2.5">
                      {(editingItem.mustHaves || []).map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-xs font-mono text-teal-400 w-6 text-right">
                            {idx + 1}.
                          </span>
                          <Input
                            value={req}
                            onChange={(e) => updateListItem("mustHaves", idx, e.target.value)}
                            placeholder="e.g. 5+ years of C/C++ in embedded systems & RTOS environments..."
                            className="bg-slate-950 border-slate-800 text-white text-xs flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeListItem("mustHaves", idx)}
                            className="p-2 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nice To Haves */}
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                          Nice-to-Have Skills
                        </h4>
                        <p className="text-xs text-slate-500">
                          Bonus qualifications, domain experience, and preferred certifications.
                        </p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => addListItem("niceToHaves")}
                        variant="outline"
                        className="border-slate-800 text-slate-300 hover:text-white text-xs font-medium"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Bonus Skill
                      </Button>
                    </div>

                    <div className="space-y-2.5">
                      {(editingItem.niceToHaves || []).map((bonus, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-500 w-6 text-right">
                            +
                          </span>
                          <Input
                            value={bonus}
                            onChange={(e) => updateListItem("niceToHaves", idx, e.target.value)}
                            placeholder="e.g. Experience with automotive CAN-bus telematics protocols..."
                            className="bg-slate-950 border-slate-800 text-white text-xs flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeListItem("niceToHaves", idx)}
                            className="p-2 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: What You Get / Perks */}
              {activeTab === "benefits" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                        What We Offer (Perks & Compensation)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Equity stock options, health coverage, work equipment, and learning allowances.
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addListItem("whatYouGet")}
                      className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Benefit
                    </Button>
                  </div>

                  <div className="space-y-2.5">
                    {(editingItem.whatYouGet || []).map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs font-mono text-teal-400 w-6 text-right">
                          ★
                        </span>
                        <Input
                          value={perk}
                          onChange={(e) => updateListItem("whatYouGet", idx, e.target.value)}
                          placeholder="e.g. Competitive base salary with ESOP equity grants..."
                          className="bg-slate-950 border-slate-800 text-white text-xs flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem("whatYouGet", idx)}
                          className="p-2 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SEO & Application Link */}
              {activeTab === "seo" && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      External Application URL or Mailto Link
                    </label>
                    <Input
                      value={editingItem.applicationUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, applicationUrl: e.target.value })}
                      placeholder="e.g. mailto:careers@treel.in?subject=Application or https://jobs.lever.co/..."
                      className="bg-slate-950 border-slate-800 text-white text-xs"
                    />
                    <p className="text-[11px] text-slate-500 font-mono">
                      If left empty, the public role page provides our standard quick-apply email prompt.
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
                        placeholder="Default falls back to Role Title | Careers | Treel Mobility"
                        className="bg-slate-950 border-slate-800 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Meta SEO Description</label>
                      <textarea
                        rows={2}
                        value={editingItem.seoDescription || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, seoDescription: e.target.value })}
                        placeholder="Default falls back to role summary..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
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
                  disabled={saving}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-medium"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  {saving ? "Saving Changes..." : isNew ? "Create Job Opening" : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
