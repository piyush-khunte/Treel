"use client";

import { useState, useEffect } from "react";
import {
  Tag,
  Plus,
  Search,
  Edit3,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Copy,
  Percent,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  X,
  Save,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatINR } from "@/lib/utils";
import {
  getAdminCoupons,
  saveAdminCoupon,
  deleteAdminCoupon,
  toggleAdminCouponStatus,
  getAdminProducts,
} from "@/lib/admin/admin-actions";
import { AdminCoupon, MongoProduct } from "@/types/admin";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [products, setProducts] = useState<MongoProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Inactive">("all");
  const [scopeFilter, setScopeFilter] = useState<"all" | "product" | "sitewide">("all");
  const [editingCoupon, setEditingCoupon] = useState<AdminCoupon | null>(null);
  const [isNewCoupon, setIsNewCoupon] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setErrorMsg(null);

    const [couponsRes, productsRes] = await Promise.all([
      getAdminCoupons(),
      getAdminProducts(),
    ]);

    if (couponsRes.success && couponsRes.data) {
      setCoupons(couponsRes.data);
    } else {
      setErrorMsg(couponsRes.error || "Failed to load coupons");
    }

    if (productsRes.success && productsRes.data) {
      setProducts(productsRes.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateNew = () => {
    setEditingCoupon({
      _id: `coup_new_${Date.now()}`,
      code: "",
      discountType: "percent",
      discountValue: 10,
      productId: "all",
      productTitle: "All Products (Sitewide)",
      minOrderValue: 0,
      status: "Active",
      description: "",
    });
    setIsNewCoupon(true);
    setErrorMsg(null);
  };

  const handleEdit = (coupon: AdminCoupon) => {
    setEditingCoupon({
      ...coupon,
      productId: coupon.productId || "all",
    });
    setIsNewCoupon(false);
    setErrorMsg(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon) return;

    setSaving(true);
    setErrorMsg(null);

    const res = await saveAdminCoupon({
      code: editingCoupon.code,
      discountType: editingCoupon.discountType,
      discountValue: editingCoupon.discountValue,
      productId: editingCoupon.productId === "all" ? null : editingCoupon.productId,
      minOrderValue: editingCoupon.minOrderValue,
      status: editingCoupon.status,
      description: editingCoupon.description,
    });

    if (res.success) {
      setSuccessMsg(`Coupon "${editingCoupon.code.toUpperCase()}" saved successfully to database.`);
      setTimeout(() => setSuccessMsg(null), 4000);
      setEditingCoupon(null);
      await loadData();
    } else {
      setErrorMsg(res.error || "Failed to save coupon");
    }
    setSaving(false);
  };

  const handleDelete = async (coupon: AdminCoupon) => {
    if (!confirm(`Are you sure you want to remove coupon "${coupon.code}" from the database?`)) return;

    setLoading(true);
    const res = await deleteAdminCoupon(coupon.code, coupon.productId);
    if (res.success) {
      setSuccessMsg(`Coupon "${coupon.code}" deleted.`);
      setTimeout(() => setSuccessMsg(null), 3000);
      await loadData();
    } else {
      setErrorMsg(res.error || "Failed to delete coupon");
      setLoading(false);
    }
  };

  const handleToggleStatus = async (coupon: AdminCoupon) => {
    const nextStatus = coupon.status === "Active" ? "Inactive" : "Active";
    const res = await toggleAdminCouponStatus(coupon.code, coupon.productId || null, coupon.status);
    if (res.success) {
      setCoupons((prev) =>
        prev.map((c) => (c.code === coupon.code ? { ...c, status: nextStatus } : c))
      );
      setSuccessMsg(`Coupon "${coupon.code}" marked as ${nextStatus}.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      alert(res.error || "Failed to update coupon status");
    }
  };

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      (c.code || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.productTitle || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.productSku || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.description || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || c.status === statusFilter;

    const matchesScope =
      scopeFilter === "all" ||
      (scopeFilter === "product" && !!c.productId) ||
      (scopeFilter === "sitewide" && !c.productId);

    return matchesSearch && matchesStatus && matchesScope;
  });

  const activeCount = coupons.filter((c) => c.status === "Active").length;
  const productCouponsCount = coupons.filter((c) => !!c.productId).length;
  const sitewideCouponsCount = coupons.filter((c) => !c.productId).length;

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Tag className="w-7 h-7 text-amber-400" /> Coupons & Discount Codes
          </h1>
          <p className="text-sm text-slate-400 font-mono">
            Live database-backed promotion codes for Personal TPMS cart & checkout
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
          <Button
            size="sm"
            onClick={handleCreateNew}
            className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Coupon
          </Button>
        </div>
      </div>

      {/* Status Alerts */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>Total Coupons</span>
            <Tag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {loading ? "..." : coupons.length}
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Configured in Supabase
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>Active Live Codes</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {loading ? "..." : activeCount}
          </div>
          <div className="text-xs text-emerald-400/80 font-mono">
            Redeemable in cart
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>Product-Specific</span>
            <ShoppingBag className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {loading ? "..." : productCouponsCount}
          </div>
          <div className="text-xs text-purple-400 font-mono">
            Linked to catalogue SKUs
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>Sitewide Promos</span>
            <Percent className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {loading ? "..." : sitewideCouponsCount}
          </div>
          <div className="text-xs text-cyan-400 font-mono">
            Applies to any cart
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <Input
            placeholder="Search by Code, Product, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 font-mono text-xs"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {/* Status filter */}
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
            className={`text-xs uppercase font-mono ${
              statusFilter === "all"
                ? "bg-amber-600 text-white"
                : "border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            All Status ({coupons.length})
          </Button>
          <Button
            variant={statusFilter === "Active" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("Active")}
            className={`text-xs uppercase font-mono ${
              statusFilter === "Active"
                ? "bg-emerald-600 text-white"
                : "border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            Active ({activeCount})
          </Button>
          <Button
            variant={statusFilter === "Inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("Inactive")}
            className={`text-xs uppercase font-mono ${
              statusFilter === "Inactive"
                ? "bg-rose-600 text-white"
                : "border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            Inactive ({coupons.length - activeCount})
          </Button>

          {/* Scope filter */}
          <Button
            variant={scopeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setScopeFilter(scopeFilter === "all" ? "product" : scopeFilter === "product" ? "sitewide" : "all")}
            className="text-xs uppercase font-mono border-slate-800 text-slate-300 hover:bg-slate-800 gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
            Scope: {scopeFilter === "all" ? "All" : scopeFilter === "product" ? "Product-Only" : "Sitewide"}
          </Button>
        </div>
      </div>

      {/* Coupons Table */}
      <Card className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Scope / Applicable Product</th>
                <th className="p-4">Min. Order</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-sans">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-amber-400" />
                    Loading coupons from Supabase database...
                  </td>
                </tr>
              ) : filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-sans">
                    No coupons found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((coupon) => (
                  <tr key={coupon.code} className="hover:bg-slate-800/40 transition-colors">
                    {/* Code */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold font-mono text-sm tracking-wider">
                          {coupon.code}
                        </span>
                        <button
                          onClick={() => handleCopy(coupon.code)}
                          className="p-1 text-slate-500 hover:text-white transition-colors"
                          title="Copy Code"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {copiedCode === coupon.code && (
                          <span className="text-[10px] text-emerald-400">Copied!</span>
                        )}
                      </div>
                    </td>

                    {/* Discount Value */}
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">
                        {coupon.discountType === "percent"
                          ? `${coupon.discountValue}% OFF`
                          : `₹${coupon.discountValue.toLocaleString("en-IN")} FLAT`}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase">
                        {coupon.discountType === "percent" ? "Percentage Discount" : "Fixed Cash Discount"}
                      </div>
                    </td>

                    {/* Scope */}
                    <td className="p-4">
                      {coupon.productId ? (
                        <div>
                          <div className="text-white font-sans font-medium truncate max-w-[240px]">
                            {coupon.productTitle}
                          </div>
                          <div className="text-[10px] text-purple-400 font-mono">
                            SKU: {coupon.productSku || "PRODUCT"}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-[10px] font-mono">
                            Sitewide (All Products)
                          </Badge>
                          <div className="text-[10px] text-slate-500 truncate max-w-[220px]">
                            {coupon.description || "Applies to entire cart"}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Min Order */}
                    <td className="p-4">
                      {coupon.minOrderValue && coupon.minOrderValue > 0 ? (
                        <span className="text-slate-300 font-bold font-mono">
                          {formatINR(coupon.minOrderValue)}
                        </span>
                      ) : (
                        <span className="text-slate-600">No Minimum</span>
                      )}
                    </td>

                    {/* Status & Quick Toggle */}
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(coupon)}
                        className="flex items-center gap-1.5 cursor-pointer group"
                        title="Click to toggle status"
                      >
                        {coupon.status === "Active" ? (
                          <>
                            <ToggleRight className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold text-xs">Active</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-5 h-5 text-slate-500" />
                            <span className="text-slate-500 font-bold text-xs">Inactive</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(coupon)}
                          className="h-7 px-2.5 border-slate-700 text-slate-300 hover:bg-slate-800 text-[11px] gap-1 font-mono"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(coupon)}
                          className="h-7 px-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-[11px]"
                          title="Delete Coupon"
                        >
                          <Trash2 className="w-3 h-3" />
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

      {/* Add / Edit Coupon Modal */}
      {editingCoupon && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-amber-400" />
                  {isNewCoupon ? "Create New Coupon" : `Edit Coupon: ${editingCoupon.code}`}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Saves directly to Supabase database table TreelEcommerce.products
                </p>
              </div>
              <button
                onClick={() => setEditingCoupon(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 text-xs font-mono">
              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Coupon Code */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Coupon Code *</label>
                  <Input
                    required
                    placeholder="e.g. SUMMER25, DIWALI500"
                    value={editingCoupon.code}
                    onChange={(e) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        code: e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ""),
                      })
                    }
                    className="bg-slate-950 border-slate-800 text-amber-400 font-bold text-sm tracking-wider uppercase"
                  />
                  <div className="text-[10px] text-slate-500">
                    Alphanumeric only. Will be auto-formatted to uppercase.
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Status *</label>
                  <select
                    value={editingCoupon.status}
                    onChange={(e) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="Active">Active (Customer Can Redeem)</option>
                    <option value="Inactive">Inactive (Disabled / Paused)</option>
                  </select>
                </div>

                {/* Discount Type */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Discount Type *</label>
                  <select
                    value={editingCoupon.discountType}
                    onChange={(e) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        discountType: e.target.value as "percent" | "fixed",
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="percent">Percentage Discount (%)</option>
                    <option value="fixed">Fixed INR Amount (₹)</option>
                  </select>
                </div>

                {/* Discount Value */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">
                    {editingCoupon.discountType === "percent"
                      ? "Discount Percentage (%) *"
                      : "Discount Amount (₹ INR) *"}
                  </label>
                  <Input
                    type="number"
                    required
                    min={1}
                    max={editingCoupon.discountType === "percent" ? 100 : 100000}
                    placeholder={editingCoupon.discountType === "percent" ? "e.g. 15" : "e.g. 500"}
                    value={editingCoupon.discountValue || ""}
                    onChange={(e) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        discountValue: Number(e.target.value),
                      })
                    }
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                {/* Applicable Scope / Product */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-slate-300 font-bold">Applicable Product / Scope *</label>
                  <select
                    value={editingCoupon.productId || "all"}
                    onChange={(e) => {
                      const selId = e.target.value;
                      const prod = products.find((p) => p._id === selId);
                      setEditingCoupon({
                        ...editingCoupon,
                        productId: selId,
                        productTitle: prod ? prod.title : "All Products (Sitewide)",
                        productSku: prod?.productsku || "SITEWIDE",
                      });
                    }}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">🌐 All Products (Sitewide Promotional Code)</option>
                    {products.map((p) => (
                      <option key={p._id} value={p._id}>
                        📦 {p.title} (SKU: {p.productsku || "N/A"}) - ₹{p.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Minimum Order Value */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Minimum Order Amount (₹ INR)</label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="0 for no minimum"
                    value={editingCoupon.minOrderValue || ""}
                    onChange={(e) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        minOrderValue: Number(e.target.value),
                      })
                    }
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                {/* Description / Notes */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Admin Description / Purpose</label>
                  <Input
                    placeholder="e.g. Festive promotional campaign"
                    value={editingCoupon.description || ""}
                    onChange={(e) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        description: e.target.value,
                      })
                    }
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingCoupon(null)}
                  className="border-slate-800 text-slate-300 hover:bg-slate-800 font-mono"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-amber-600 hover:bg-amber-500 text-white gap-2 font-mono"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving to Database..." : isNewCoupon ? "Create Coupon" : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
