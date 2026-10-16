"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  deleteWarrantyAction,
  getAdminWarrantyListAction,
  saveWarrantyAction,
  updateWarrantyStatusAction,
} from "@/lib/admin/admin-actions";
import { WarrantyRecord, WarrantyStatus } from "@/types/content";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  Eye,
  FileCheck2,
  Filter,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const STATUS_OPTIONS: WarrantyStatus[] = [
  "Submitted",
  "Pending Review",
  "Under Review",
  "Approved",
  "Active",
  "Rejected",
  "Resolved",
];

function getStatusBadge(status: WarrantyStatus) {
  switch (status) {
    case "Active":
    case "Approved":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
    case "Pending Review":
    case "Submitted":
      return "bg-amber-500/20 text-amber-400 border-amber-500/40";
    case "Under Review":
      return "bg-blue-500/20 text-blue-400 border-blue-500/40";
    case "Resolved":
      return "bg-purple-500/20 text-purple-400 border-purple-500/40";
    case "Rejected":
      return "bg-red-500/20 text-red-400 border-red-500/40";
    default:
      return "bg-slate-800 text-slate-300 border-slate-700";
  }
}

export default function AdminWarrantiesPage() {
  const [items, setItems] = useState<WarrantyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  // Inspect / Edit Modal State
  const [selectedItem, setSelectedItem] = useState<WarrantyRecord | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // Form Fields State inside Modal
  const [formStatus, setFormStatus] = useState<WarrantyStatus>("Submitted");
  const [formNotes, setFormNotes] = useState("");
  const [formCustomerName, setFormCustomerName] = useState("");
  const [formCustomerPhone, setFormCustomerPhone] = useState("");
  const [formOrderId, setFormOrderId] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formProduct, setFormProduct] = useState("Personal TPMS (4-Tyre Kit)");
  const [formType, setFormType] = useState<"registration" | "claim">("registration");
  const [formIssueType, setFormIssueType] = useState("Sensor not working");
  const [formDesc, setFormDesc] = useState("");
  const [formResolution, setFormResolution] = useState("Replacement");

  // Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Toast Feedback State
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showFeedback = useCallback((type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 6000);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await getAdminWarrantyListAction();
    if (res.success && res.data) {
      setItems(res.data);
    } else {
      showFeedback("error", res.error || "Failed to load warranty records.");
    }
    setLoading(false);
  }, [showFeedback]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenDetails = (item: WarrantyRecord) => {
    setSelectedItem(item);
    setIsNew(false);
    setFormType(item.type);
    setFormStatus(item.status);
    setFormNotes(item.adminNotes || "");
    setFormCustomerName(item.customerName || "");
    setFormCustomerPhone(item.customerPhone || "");
    setFormOrderId(item.orderId || "");
    setFormEmail(item.customerEmail || "");
    setFormProduct(item.productName || "Personal TPMS (4-Tyre Kit)");
    setFormIssueType(item.claimIssueType || "Sensor not working");
    setFormDesc(item.claimDescription || "");
    setFormResolution(item.claimResolution || "Replacement");
    setModalOpen(true);
  };

  const handleCreateNew = () => {
    const year = new Date().getFullYear();
    const newRecord: WarrantyRecord = {
      _id: `wr_${Date.now()}`,
      registrationId: `WR-${year}-${Math.floor(10000 + Math.random() * 90000)}`,
      type: "registration",
      orderId: "",
      customerEmail: "",
      productName: "Personal TPMS (4-Tyre Kit)",
      coverageDuration: "12 Months (1 Year)",
      coverageStatus: "Active",
      registeredAt: new Date().toISOString(),
      status: "Approved",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSelectedItem(newRecord);
    setIsNew(true);
    setFormType("registration");
    setFormStatus("Approved");
    setFormNotes("Manual administrative registration.");
    setFormCustomerName("");
    setFormCustomerPhone("");
    setFormOrderId("");
    setFormEmail("");
    setFormProduct("Personal TPMS (4-Tyre Kit)");
    setFormIssueType("");
    setFormDesc("");
    setFormResolution("Replacement");
    setModalOpen(true);
  };

  const handleSaveRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    if (!formOrderId.trim()) {
      showFeedback("error", "Order ID is required.");
      return;
    }
    if (!formEmail.trim() || !formEmail.includes("@")) {
      showFeedback("error", "A valid email address is required.");
      return;
    }

    setSaving(true);

    const payload: Partial<WarrantyRecord> = {
      ...selectedItem,
      type: formType,
      status: formStatus,
      adminNotes: formNotes.trim() || undefined,
      orderId: formOrderId.trim(),
      customerEmail: formEmail.trim().toLowerCase(),
      customerName: formCustomerName.trim() || undefined,
      customerPhone: formCustomerPhone.trim() || undefined,
      productName: formProduct.trim(),
      claimIssueType: formType === "claim" ? formIssueType : undefined,
      claimDescription: formType === "claim" ? formDesc : undefined,
      claimResolution: formType === "claim" ? formResolution : undefined,
    };

    const res = await saveWarrantyAction(payload);
    if (res.success && res.data) {
      showFeedback(
        "success",
        `Warranty record ${res.data.registrationId} saved successfully.`
      );
      setModalOpen(false);
      setSelectedItem(null);
      await loadData();
    } else {
      showFeedback("error", res.error || "Failed to save warranty record.");
    }
    setSaving(false);
  };

  const handleQuickStatusChange = async (
    id: string,
    newStatus: WarrantyStatus
  ) => {
    const res = await updateWarrantyStatusAction(id, newStatus);
    if (res.success && res.data) {
      showFeedback("success", `Status updated to ${newStatus}.`);
      setItems((prev) =>
        prev.map((it) => (it._id === id ? { ...it, status: newStatus } : it))
      );
    } else {
      showFeedback("error", res.error || "Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const res = await deleteWarrantyAction(id);
    if (res.success) {
      showFeedback("success", "Warranty record deleted successfully.");
      setDeleteConfirmId(null);
      await loadData();
    } else {
      showFeedback("error", res.error || "Failed to delete record.");
    }
    setDeleting(false);
  };

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((it) => {
      if (filterType !== "ALL" && it.type !== filterType) return false;
      if (filterStatus !== "ALL" && it.status !== filterStatus) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesRegId = (it.registrationId || "").toLowerCase().includes(q);
        const matchesOrderId = (it.orderId || "").toLowerCase().includes(q);
        const matchesEmail = (it.customerEmail || "").toLowerCase().includes(q);
        const matchesName = (it.customerName || "").toLowerCase().includes(q);
        const matchesProduct = (it.productName || "").toLowerCase().includes(q);
        const matchesIssue = (it.claimIssueType || "").toLowerCase().includes(q);
        if (
          !matchesRegId &&
          !matchesOrderId &&
          !matchesEmail &&
          !matchesName &&
          !matchesProduct &&
          !matchesIssue
        ) {
          return false;
        }
      }
      return true;
    });
  }, [items, filterType, filterStatus, search]);

  // Statistics
  const stats = useMemo(() => {
    const total = items.length;
    const registrations = items.filter((i) => i.type === "registration").length;
    const claims = items.filter((i) => i.type === "claim").length;
    const pending = items.filter(
      (i) => i.status === "Pending Review" || i.status === "Under Review" || i.status === "Submitted"
    ).length;
    const approved = items.filter((i) => i.status === "Approved" || i.status === "Active").length;
    return { total, registrations, claims, pending, approved };
  }, [items]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Alert */}
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PERSONAL TPMS SUPPORT CONSOLE</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Warranty Registrations & Claims</h1>
          <p className="text-sm text-slate-400 font-mono mt-0.5">
            Manage customer 1-year warranty registrations, verify purchase orders, and resolve replacement claims.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            disabled={loading}
            className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-mono gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button asChild variant="outline" size="sm" className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-mono gap-1.5">
            <Link href="/personal/support/warranty" target="_blank">
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              Public Warranty Page
            </Link>
          </Button>

          <Button
            onClick={handleCreateNew}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-1.5 shadow-lg shadow-emerald-900/30"
          >
            <Plus className="w-4 h-4" />
            Add Record
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Total Submissions</div>
          <div className="text-2xl font-bold text-white font-mono">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Registrations</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{stats.registrations}</div>
        </Card>
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Active Claims</div>
          <div className="text-2xl font-bold text-blue-400 font-mono">{stats.claims}</div>
        </Card>
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Pending / Review</div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{stats.pending}</div>
        </Card>
        <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-xl space-y-1">
          <div className="text-xs text-slate-400 font-mono">Approved / Active</div>
          <div className="text-2xl font-bold text-purple-400 font-mono">{stats.approved}</div>
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
              placeholder="Search Reg ID, Order ID, Email, Name, Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-950 border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 h-9"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full h-9 px-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value="ALL">All Submission Types</option>
              <option value="registration">Registrations Only</option>
              <option value="claim">Claims Only</option>
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
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
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
                <th className="py-3 px-4">Record ID / Type</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Order / Product</th>
                <th className="py-3 px-4">Submission Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-mono">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
                    Loading warranty records...
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                    No warranty records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Record ID & Type */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="font-mono font-bold text-white flex items-center gap-1.5">
                          {item.type === "registration" ? (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
                          )}
                          <span>{item.registrationId}</span>
                        </div>
                        <Badge
                          className={`text-[10px] font-mono uppercase ${
                            item.type === "registration"
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                              : "bg-blue-500/15 text-blue-400 border-blue-500/30"
                          }`}
                        >
                          {item.type}
                        </Badge>
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-slate-200 truncate">
                          {item.customerName || item.customerEmail.split("@")[0]}
                        </div>
                        <div className="text-slate-400 font-mono text-[11px] truncate">
                          {item.customerEmail}
                        </div>
                        {item.customerPhone && (
                          <div className="text-slate-500 font-mono text-[10px]">
                            {item.customerPhone}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Order & Product */}
                    <td className="py-4 px-4 max-w-sm">
                      <div className="space-y-0.5">
                        <div className="font-mono text-xs text-emerald-400 font-semibold">
                          Order: {item.orderId}
                        </div>
                        <div className="text-slate-300 text-[11px] line-clamp-1">
                          {item.productName}
                        </div>
                        {item.claimIssueType && (
                          <div className="text-blue-400 font-mono text-[10px]">
                            Issue: {item.claimIssueType}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap font-mono text-slate-300 text-[11px]">
                      <div>{new Date(item.registeredAt).toLocaleDateString()}</div>
                      <div className="text-[10px] text-slate-500">
                        {new Date(item.registeredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleQuickStatusChange(item._id, e.target.value as WarrantyStatus)
                          }
                          className={`text-[11px] font-mono px-2 py-1 rounded border bg-slate-950 focus:outline-none cursor-pointer ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st} className="bg-slate-900 text-white">
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDetails(item)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                          title="View complete details & audit notes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDetails(item)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-blue-400 hover:bg-slate-800"
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
              <h3 className="text-lg font-bold text-white">Delete Warranty Record?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete this warranty registration record? It will be removed from local storage and Supabase backup.
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

      {/* Details & Edit Modal */}
      {modalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <Card className="max-w-2xl w-full my-8 bg-slate-900 border-slate-800 shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {selectedItem.registrationId}
                  </span>
                  <Badge className={getStatusBadge(formStatus)}>
                    {formStatus}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {isNew ? "Create Warranty Record" : "Warranty Record Details"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveRecord} className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Type & Order ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Record Type
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as "registration" | "claim")}
                    className="w-full h-9 px-3 rounded-md bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  >
                    <option value="registration">Warranty Registration</option>
                    <option value="claim">Warranty Claim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Order ID <span className="text-emerald-400">*</span>
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="TR-98241 or 677dffae..."
                    value={formOrderId}
                    onChange={(e) => setFormOrderId(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-xs font-mono text-white"
                  />
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Customer Email <span className="text-emerald-400">*</span>
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="customer@email.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-xs font-mono text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Customer Name
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Akash Patil"
                    value={formCustomerName}
                    onChange={(e) => setFormCustomerName(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Product Name
                  </label>
                  <Input
                    type="text"
                    value={formProduct}
                    onChange={(e) => setFormProduct(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Customer Phone
                  </label>
                  <Input
                    type="text"
                    placeholder="+91 98201 12345"
                    value={formCustomerPhone}
                    onChange={(e) => setFormCustomerPhone(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-xs font-mono text-white"
                  />
                </div>
              </div>

              {/* Specific to Claims */}
              {formType === "claim" && (
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono font-semibold text-blue-400">
                    CLAIM DETAILS
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Issue Type
                      </label>
                      <select
                        value={formIssueType}
                        onChange={(e) => setFormIssueType(e.target.value)}
                        className="w-full h-8 px-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                      >
                        <option value="Sensor not working">Sensor not working</option>
                        <option value="App issue">App issue</option>
                        <option value="Physical damage (limited coverage)">Physical damage (limited coverage)</option>
                        <option value="Battery issue (guidance)">Battery issue (guidance)</option>
                        <option value="Other">Other issue</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Preferred Resolution
                      </label>
                      <select
                        value={formResolution}
                        onChange={(e) => setFormResolution(e.target.value)}
                        className="w-full h-8 px-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                      >
                        <option value="Replacement">Replacement Sensor</option>
                        <option value="Refund (if within return window)">Refund (if eligible)</option>
                        <option value="Repair guidance">Technical Troubleshooting Guidance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Problem Description
                    </label>
                    <textarea
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Customer explanation of the failure..."
                      className="w-full p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Status & Review Notes */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="text-xs font-mono font-semibold text-emerald-400">
                  ADMINISTRATION & LIFECYCLE
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Warranty Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as WarrantyStatus)}
                    className="w-full h-9 px-3 rounded-md bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Internal Admin Notes (Diagnostic findings, courier AWB, return labels)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Verified serial number. Replacement dispatch scheduled..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              {/* Timestamps */}
              {!isNew && (
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>Registered: {new Date(selectedItem.registeredAt).toLocaleString()}</span>
                  <span>Last Updated: {new Date(selectedItem.updatedAt).toLocaleString()}</span>
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
                  Close
                </Button>

                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-1.5 shadow-lg shadow-emerald-900/30"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : isNew ? "Create Record" : "Save Changes"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
