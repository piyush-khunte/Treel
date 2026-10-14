"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
deleteEventAction,
getAdminEventsListAction,
saveEventAction,
toggleEventPublishAction
} from "@/lib/admin/admin-actions";
import { EventAgendaItem,EventItemRecord,EventSpeaker } from "@/types/content";
import {
AlertCircle,
Calendar,
CheckCircle2,
Clock,
Edit3,
ExternalLink,
Eye,
EyeOff,
MapPin,
Plus,
RefreshCw,
Save,
Search,
Star,
Trash2,
Upload,
User,
Video,
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

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterPub, setFilterPub] = useState<string>("ALL");
  const [filterType, setFilterType] = useState<string>("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItemRecord | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "agenda" | "speakers" | "seo">("general");

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showFeedback = useCallback((type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 6000);
  }, []);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    const res = await getAdminEventsListAction();
    if (res.success && res.data) {
      setEvents(res.data);
    } else {
      showFeedback("error", res.error || "Failed to load events.");
    }
    setLoading(false);
  }, [showFeedback]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleCreate = () => {
    const today = new Date().toISOString().split("T")[0];
    const newRecord: EventItemRecord = {
      _id: `evt_${Date.now()}`,
      slug: "",
      name: "",
      title: "",
      type: "Conference",
      dateTime: "",
      startDate: today,
      endDate: "",
      location: "Online / Virtual",
      isOnline: true,
      excerpt: "",
      about: [""],
      agenda: [],
      speakers: [],
      materialUrl: "",
      materialLabel: "Download Presentation Deck",
      registrationUrl: "",
      bannerUrl: "",
      image: "",
      featured: false,
      status: "Upcoming",
      publicationStatus: "Published",
      seoTitle: "",
      seoDescription: ""
    };
    setEditingItem(newRecord);
    setIsNew(true);
    setActiveTab("general");
    setModalOpen(true);
  };

  const handleEdit = (item: EventItemRecord) => {
    setEditingItem({
      ...item,
      about: Array.isArray(item.about) && item.about.length > 0 ? [...item.about] : [""],
      agenda: Array.isArray(item.agenda) ? item.agenda.map((a) => ({ ...a })) : [],
      speakers: Array.isArray(item.speakers) ? item.speakers.map((s) => ({ ...s })) : []
    });
    setIsNew(false);
    setActiveTab("general");
    setModalOpen(true);
  };

  const handleTogglePublish = async (item: EventItemRecord) => {
    const res = await toggleEventPublishAction(item._id);
    if (res.success && res.data) {
      setEvents((prev) => prev.map((e) => (e._id === item._id ? res.data! : e)));
      showFeedback(
        "success",
        `Event "${item.name}" is now ${res.data.publicationStatus.toLowerCase()}.`
      );
    } else {
      showFeedback("error", res.error || "Failed to toggle status.");
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const res = await deleteEventAction(id);
    if (res.success) {
      setEvents((prev) => prev.filter((e) => e._id !== id));
      setDeleteConfirmId(null);
      showFeedback("success", "Event deleted successfully.");
    } else {
      showFeedback("error", res.error || "Failed to delete event.");
    }
    setDeleting(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload-product-image", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        setEditingItem({
          ...editingItem,
          bannerUrl: data.url,
          image: data.url
        });
        showFeedback("success", "Image uploaded successfully.");
      } else {
        showFeedback("error", data.error || "Image upload failed.");
      }
    } catch (err: any) {
      showFeedback("error", err.message || "Network error while uploading image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const trimmedName = (editingItem.name || editingItem.title || "").trim();
    if (!trimmedName) {
      showFeedback("error", "Event name/title is required.");
      return;
    }

    let finalSlug = (editingItem.slug || "").trim();
    if (!finalSlug) {
      finalSlug = slugify(trimmedName);
    }

    if (!editingItem.dateTime?.trim()) {
      showFeedback("error", "Date & Time display string is required (e.g. 'April 18, 2026 • 2:00 PM IST').");
      return;
    }

    if (!editingItem.excerpt?.trim()) {
      showFeedback("error", "Event excerpt is required.");
      return;
    }

    setSaving(true);
    const cleanedAbout = (editingItem.about || []).map((p) => p.trim()).filter(Boolean);

    const payload: EventItemRecord = {
      ...editingItem,
      name: trimmedName,
      title: trimmedName,
      slug: finalSlug,
      about: cleanedAbout.length > 0 ? cleanedAbout : [editingItem.excerpt.trim()],
      image: editingItem.bannerUrl || editingItem.image || ""
    };

    const res = await saveEventAction(payload);
    if (res.success && res.data) {
      if (isNew) {
        setEvents((prev) => [res.data!, ...prev]);
        showFeedback("success", `New event "${res.data.name}" created.`);
      } else {
        setEvents((prev) => prev.map((e) => (e._id === res.data!._id ? res.data! : e)));
        showFeedback("success", `Event "${res.data.name}" updated successfully.`);
      }
      setModalOpen(false);
      setEditingItem(null);
    } else {
      showFeedback("error", res.error || "Failed to save event.");
    }
    setSaving(false);
  };

  // Agenda helper
  const addAgendaItem = () => {
    if (!editingItem) return;
    const item: EventAgendaItem = {
      time: "",
      title: "",
      speaker: "",
      desc: ""
    };
    setEditingItem({
      ...editingItem,
      agenda: [...(editingItem.agenda || []), item]
    });
  };

  const updateAgendaItem = (idx: number, field: keyof EventAgendaItem, value: string) => {
    if (!editingItem || !editingItem.agenda) return;
    const updated = [...editingItem.agenda];
    updated[idx] = { ...updated[idx], [field]: value };
    setEditingItem({ ...editingItem, agenda: updated });
  };

  const removeAgendaItem = (idx: number) => {
    if (!editingItem || !editingItem.agenda) return;
    setEditingItem({
      ...editingItem,
      agenda: editingItem.agenda.filter((_, i) => i !== idx)
    });
  };

  // Speaker helper
  const addSpeaker = () => {
    if (!editingItem) return;
    const speaker: EventSpeaker = {
      name: "",
      role: "",
      org: "",
      bio: ""
    };
    setEditingItem({
      ...editingItem,
      speakers: [...(editingItem.speakers || []), speaker]
    });
  };

  const updateSpeaker = (idx: number, field: keyof EventSpeaker, value: string) => {
    if (!editingItem || !editingItem.speakers) return;
    const updated = [...editingItem.speakers];
    updated[idx] = { ...updated[idx], [field]: value };
    setEditingItem({ ...editingItem, speakers: updated });
  };

  const removeSpeaker = (idx: number) => {
    if (!editingItem || !editingItem.speakers) return;
    setEditingItem({
      ...editingItem,
      speakers: editingItem.speakers.filter((_, i) => i !== idx)
    });
  };

  // Paragraphs helper
  const addParagraph = () => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      about: [...(editingItem.about || []), ""]
    });
  };

  const updateParagraph = (idx: number, val: string) => {
    if (!editingItem || !editingItem.about) return;
    const updated = [...editingItem.about];
    updated[idx] = val;
    setEditingItem({ ...editingItem, about: updated });
  };

  const removeParagraph = (idx: number) => {
    if (!editingItem || !editingItem.about) return;
    setEditingItem({
      ...editingItem,
      about: editingItem.about.filter((_, i) => i !== idx)
    });
  };

  // Filtering
  const eventTypes = useMemo(() => {
    const types = new Set<string>();
    events.forEach((e) => {
      if (e.type) types.add(e.type);
    });
    return Array.from(types);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchSearch =
        search.trim() === "" ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.slug.toLowerCase().includes(search.toLowerCase()) ||
        (e.location && e.location.toLowerCase().includes(search.toLowerCase())) ||
        (e.excerpt && e.excerpt.toLowerCase().includes(search.toLowerCase()));

      const matchStatus = filterStatus === "ALL" || e.status === filterStatus;
      const matchPub = filterPub === "ALL" || e.publicationStatus === filterPub;
      const matchType = filterType === "ALL" || e.type === filterType;

      return matchSearch && matchStatus && matchPub && matchType;
    });
  }, [events, search, filterStatus, filterPub, filterType]);

  const stats = useMemo(() => {
    return {
      total: events.length,
      upcoming: events.filter((e) => e.status === "Upcoming").length,
      completed: events.filter((e) => e.status === "Completed").length,
      published: events.filter((e) => e.publicationStatus === "Published").length,
      drafts: events.filter((e) => e.publicationStatus === "Draft").length
    };
  }, [events]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Events & Webinars Management</h1>
              <p className="text-xs text-slate-400 font-mono">
                Manage live conferences, webinars, roundtables, and public past events on{" "}
                <Link href="/events" target="_blank" className="text-indigo-400 hover:underline">
                  /events
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={loadEvents}
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
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Event
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
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-slate-400">Total Events</div>
          <div className="text-xl font-bold text-white mt-1">{stats.total}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-emerald-400">Upcoming</div>
          <div className="text-xl font-bold text-emerald-300 mt-1">{stats.upcoming}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-slate-400">Completed (Archive)</div>
          <div className="text-xl font-bold text-slate-300 mt-1">{stats.completed}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-indigo-400">Published Live</div>
          <div className="text-xl font-bold text-indigo-300 mt-1">{stats.published}</div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-amber-400">Drafts (Hidden)</div>
          <div className="text-xl font-bold text-amber-300 mt-1">{stats.drafts}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, slug, location..."
            className="pl-9 bg-slate-900/80 border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 rounded-xl"
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
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">Status: All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Publication Filter */}
          <select
            value={filterPub}
            onChange={(e) => setFilterPub(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">Visibility: All</option>
            <option value="Published">Published Only</option>
            <option value="Draft">Drafts Only</option>
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">Type: All</option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Table / List */}
      <Card className="bg-slate-900/60 border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-7 h-7 text-indigo-400 animate-spin mx-auto" />
            <div className="text-sm font-mono text-slate-400">Loading events catalog...</div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="text-sm font-medium text-slate-300">No events found</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {search || filterStatus !== "ALL" || filterPub !== "ALL" || filterType !== "ALL"
                ? "Try clearing your filters or search keywords."
                : "Get started by adding your first event or webinar."}
            </p>
            <Button
              onClick={handleCreate}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium mt-2"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Event
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Event Details</th>
                  <th className="py-3.5 px-4">Schedule & Location</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Event Status</th>
                  <th className="py-3.5 px-4">Visibility</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredEvents.map((item) => {
                  const isPublished = item.publicationStatus === "Published";
                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Name & Slug */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {item.featured && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                <Star className="w-2.5 h-2.5 fill-amber-300" /> Featured
                              </span>
                            )}
                            <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                              {item.name}
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

                      {/* Schedule & Location */}
                      <td className="py-4 px-4 text-xs space-y-1 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-300 font-mono">
                          <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>{item.dateTime || "TBD"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          {item.isOnline ? (
                            <Video className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          )}
                          <span className="truncate max-w-[180px]">
                            {item.location || (item.isOnline ? "Online Webinar" : "Venue TBD")}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                          {item.type || "Event"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
                            item.status === "Upcoming"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : item.status === "Ongoing"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/30 animate-pulse"
                              : item.status === "Completed"
                              ? "bg-slate-800 text-slate-400 border border-slate-700"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {item.status}
                        </span>
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

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {isPublished && (
                            <Link
                              href={`/events/${item.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                              title="View on live website"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}

                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-600/30 transition-colors"
                            title="Edit Event"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(item._id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-600/30 transition-colors"
                            title="Delete Event"
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
              <h3 className="text-lg font-bold text-white">Delete Event?</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Are you sure you want to delete this event? This action removes the event from both
                the admin panel and the public website.
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
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {isNew ? "Create New Event" : `Edit: ${editingItem.name || "Event"}`}
                  </h2>
                  <div className="text-[11px] font-mono text-slate-400">
                    {editingItem.slug ? `/events/${editingItem.slug}` : "Slug will be auto-generated"}
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
                    ? "border-indigo-500 text-indigo-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Basic & Schedule
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("agenda")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === "agenda"
                    ? "border-indigo-500 text-indigo-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Agenda ({editingItem.agenda?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("speakers")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === "speakers"
                    ? "border-indigo-500 text-indigo-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Speakers ({editingItem.speakers?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className={`py-3 px-3 border-b-2 font-medium transition-colors ${
                  activeTab === "seo"
                    ? "border-indigo-500 text-indigo-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                SEO & Media
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: General & Schedule */}
              {activeTab === "general" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Event Name */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-medium text-slate-300">
                        Event Title / Name <span className="text-rose-400">*</span>
                      </label>
                      <Input
                        value={editingItem.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingItem({
                            ...editingItem,
                            name: val,
                            title: val,
                            slug: isNew && (!editingItem.slug || editingItem.slug === slugify(editingItem.name))
                              ? slugify(val)
                              : editingItem.slug
                          });
                        }}
                        placeholder="e.g. Treel Mobility Summit 2026: The Connected Fleet"
                        className="bg-slate-950 border-slate-800 text-white focus:border-indigo-500 text-sm"
                        required
                      />
                    </div>

                    {/* Slug */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        URL Slug <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          value={editingItem.slug}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              slug: slugify(e.target.value)
                            })
                          }
                          placeholder="e.g. treel-mobility-summit-2026"
                          className="bg-slate-950 border-slate-800 text-white font-mono text-xs focus:border-indigo-500"
                          required
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Public link: /events/{editingItem.slug || "your-slug"}
                      </p>
                    </div>

                    {/* Event Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Event Format / Type</label>
                      <select
                        value={editingItem.type}
                        onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Conference">Conference</option>
                        <option value="Webinar">Webinar</option>
                        <option value="In-person">In-person</option>
                        <option value="Meetup">Meetup</option>
                        <option value="Roundtable">Roundtable</option>
                        <option value="Keynote">Keynote</option>
                        <option value="Workshop">Workshop</option>
                      </select>
                    </div>

                    {/* Date Time Display String */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Date & Time Display String <span className="text-rose-400">*</span>
                      </label>
                      <Input
                        value={editingItem.dateTime}
                        onChange={(e) => setEditingItem({ ...editingItem, dateTime: e.target.value })}
                        placeholder="e.g. April 18, 2026 • 2:00 PM IST"
                        className="bg-slate-950 border-slate-800 text-white text-sm focus:border-indigo-500"
                        required
                      />
                    </div>

                    {/* Start Date (ISO) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Start Date (Sorting & Calendar)
                      </label>
                      <Input
                        type="date"
                        value={editingItem.startDate || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-white text-sm focus:border-indigo-500"
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Location / Platform</label>
                      <Input
                        value={editingItem.location}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        placeholder="e.g. Online / Zoom or Pragati Maidan, New Delhi"
                        className="bg-slate-950 border-slate-800 text-white text-sm focus:border-indigo-500"
                      />
                    </div>

                    {/* Is Online & Featured Toggles */}
                    <div className="flex items-center gap-6 pt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingItem.isOnline || false}
                          onChange={(e) => setEditingItem({ ...editingItem, isOnline: e.target.checked })}
                          className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
                        />
                        <span className="text-xs text-slate-300 font-medium">Virtual / Online Event</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingItem.featured || false}
                          onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                          className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
                        />
                        <span className="text-xs text-slate-300 font-medium">Featured Event</span>
                      </label>
                    </div>

                    {/* Event Lifecycle Status */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Event Status</label>
                      <select
                        value={editingItem.status}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            status: e.target.value as any
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Upcoming">Upcoming (Active Registrations)</option>
                        <option value="Ongoing">Ongoing (Happening Now)</option>
                        <option value="Completed">Completed (Past Events Archive)</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Publication Status */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Publication Visibility</label>
                      <select
                        value={editingItem.publicationStatus}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            publicationStatus: e.target.value as any
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Published">Published (Live on Website)</option>
                        <option value="Draft">Draft (Internal Only)</option>
                      </select>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-medium text-slate-300">
                      Short Excerpt / Teaser <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.excerpt}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      placeholder="Concise 1-2 sentence overview shown in event listing cards..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  {/* About Paragraphs */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-300">
                        About This Event (Full Description Paragraphs)
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addParagraph}
                        className="border-slate-800 bg-slate-950 text-indigo-400 text-xs hover:bg-slate-800"
                      >
                        <Plus className="w-3 h-3 mr-1" /> Add Paragraph
                      </Button>
                    </div>
                    {(editingItem.about || []).map((p, idx) => (
                      <div key={idx} className="flex gap-2">
                        <textarea
                          rows={2}
                          value={p}
                          onChange={(e) => updateParagraph(idx, e.target.value)}
                          placeholder={`Paragraph ${idx + 1}...`}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                        {(editingItem.about?.length || 0) > 1 && (
                          <button
                            type="button"
                            onClick={() => removeParagraph(idx)}
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

              {/* TAB 2: Agenda Builder */}
              {activeTab === "agenda" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                        Event Agenda Schedule
                      </h4>
                      <p className="text-xs text-slate-500">
                        Define chronological sessions, keynote speeches, panels, and breakouts.
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={addAgendaItem}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Agenda Session
                    </Button>
                  </div>

                  {(!editingItem.agenda || editingItem.agenda.length === 0) ? (
                    <div className="py-12 text-center space-y-2 border border-dashed border-slate-800 rounded-xl">
                      <Clock className="w-8 h-8 text-slate-600 mx-auto" />
                      <div className="text-xs font-mono text-slate-400">No agenda sessions added yet.</div>
                      <Button
                        type="button"
                        size="sm"
                        onClick={addAgendaItem}
                        variant="outline"
                        className="text-xs border-slate-800 text-indigo-400 hover:bg-slate-800"
                      >
                        <Plus className="w-3 h-3 mr-1" /> Add First Session
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {editingItem.agenda.map((slot, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-indigo-400">
                              Session #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeAgendaItem(idx)}
                              className="text-slate-500 hover:text-rose-400 p-1"
                              title="Remove session"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                                Time Slot
                              </label>
                              <Input
                                value={slot.time}
                                onChange={(e) => updateAgendaItem(idx, "time", e.target.value)}
                                placeholder="e.g. 10:00 - 10:45 AM"
                                className="bg-slate-900 border-slate-800 text-white text-xs"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                                Session Title
                              </label>
                              <Input
                                value={slot.title}
                                onChange={(e) => updateAgendaItem(idx, "title", e.target.value)}
                                placeholder="e.g. Opening Keynote: AI Fleet Telematics in 2026"
                                className="bg-slate-900 border-slate-800 text-white text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                                Speaker(s)
                              </label>
                              <Input
                                value={slot.speaker}
                                onChange={(e) => updateAgendaItem(idx, "speaker", e.target.value)}
                                placeholder="e.g. Dinesh Kumar (VP Eng) & Guest Panel"
                                className="bg-slate-900 border-slate-800 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                                Session Description
                              </label>
                              <Input
                                value={slot.desc}
                                onChange={(e) => updateAgendaItem(idx, "desc", e.target.value)}
                                placeholder="Brief overview of key discussion points..."
                                className="bg-slate-900 border-slate-800 text-white text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Speakers Builder */}
              {activeTab === "speakers" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                        Event Speakers & Hosts
                      </h4>
                      <p className="text-xs text-slate-500">
                        Showcase executive leaders, guest industry experts, and moderators.
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={addSpeaker}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Speaker
                    </Button>
                  </div>

                  {(!editingItem.speakers || editingItem.speakers.length === 0) ? (
                    <div className="py-12 text-center space-y-2 border border-dashed border-slate-800 rounded-xl">
                      <User className="w-8 h-8 text-slate-600 mx-auto" />
                      <div className="text-xs font-mono text-slate-400">No speakers assigned yet.</div>
                      <Button
                        type="button"
                        size="sm"
                        onClick={addSpeaker}
                        variant="outline"
                        className="text-xs border-slate-800 text-indigo-400 hover:bg-slate-800"
                      >
                        <Plus className="w-3 h-3 mr-1" /> Add First Speaker
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {editingItem.speakers.map((spk, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-indigo-400">
                              Speaker #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeSpeaker(idx)}
                              className="text-slate-500 hover:text-rose-400 p-1"
                              title="Remove speaker"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                                Full Name
                              </label>
                              <Input
                                value={spk.name}
                                onChange={(e) => updateSpeaker(idx, "name", e.target.value)}
                                placeholder="e.g. Dr. Rajesh Verma"
                                className="bg-slate-900 border-slate-800 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                                Designation / Role
                              </label>
                              <Input
                                value={spk.role}
                                onChange={(e) => updateSpeaker(idx, "role", e.target.value)}
                                placeholder="e.g. Chief Technology Officer"
                                className="bg-slate-900 border-slate-800 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-mono text-slate-400 block mb-1">
                                Organization
                              </label>
                              <Input
                                value={spk.org}
                                onChange={(e) => updateSpeaker(idx, "org", e.target.value)}
                                placeholder="e.g. Treel Mobility"
                                className="bg-slate-900 border-slate-800 text-white text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-mono text-slate-400 block mb-1">
                              Short Bio / Credentials
                            </label>
                            <Input
                              value={spk.bio}
                              onChange={(e) => updateSpeaker(idx, "bio", e.target.value)}
                              placeholder="e.g. 15+ years in connected vehicle telematics and IoT architectures."
                              className="bg-slate-900 border-slate-800 text-white text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: Media, URLs & SEO */}
              {activeTab === "seo" && (
                <div className="space-y-5">
                  {/* Banner Image */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">
                      Cover Banner Image URL
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={editingItem.bannerUrl || editingItem.image || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            bannerUrl: e.target.value,
                            image: e.target.value
                          })
                        }
                        placeholder="https://... or /uploads/products/..."
                        className="bg-slate-950 border-slate-800 text-white text-xs font-mono flex-1"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingImage ? "Uploading..." : "Upload File"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {(editingItem.bannerUrl || editingItem.image) && (
                      <div className="mt-2 w-full max-w-xs h-32 rounded-xl overflow-hidden border border-slate-800 relative bg-slate-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={editingItem.bannerUrl || editingItem.image}
                          alt="Banner Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* URLs & Registration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Registration Link URL
                      </label>
                      <Input
                        value={editingItem.registrationUrl || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, registrationUrl: e.target.value })}
                        placeholder="e.g. https://zoom.us/webinar/register/... or internal"
                        className="bg-slate-950 border-slate-800 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Download Presentation / Material URL
                      </label>
                      <Input
                        value={editingItem.materialUrl || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, materialUrl: e.target.value })}
                        placeholder="e.g. https://drive.google.com/... or /docs/deck.pdf"
                        className="bg-slate-950 border-slate-800 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-medium text-slate-300">
                        Material Button Label
                      </label>
                      <Input
                        value={editingItem.materialLabel || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, materialLabel: e.target.value })}
                        placeholder="e.g. Download Slide Deck or View Recording"
                        className="bg-slate-950 border-slate-800 text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* SEO Metadata */}
                  <div className="pt-3 border-t border-slate-800 space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Search Engine Optimization (SEO)
                    </h4>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Meta SEO Title</label>
                      <Input
                        value={editingItem.seoTitle || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, seoTitle: e.target.value })}
                        placeholder="Default falls back to Event Name | Treel Mobility"
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
                        className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
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
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  {saving ? "Saving Changes..." : isNew ? "Create Event" : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
