"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
deleteAdminCoupon,
getAdminCoupons,
getAdminProducts,
saveAdminCoupon,
toggleAdminCouponStatus,
} from "@/lib/admin/admin-actions";
import { PERSONAL_PRODUCTS } from "@/lib/data/personal-products";
import { formatINR } from "@/lib/utils";
import { copyToClipboardSafe } from "@/lib/utils/clipboard";
import { AdminCoupon,CouponCategory,MongoProduct } from "@/types/admin";
import {
AlertCircle,
Car,
CheckCircle2,
Copy,
Edit3,
ExternalLink,
Percent,
Plus,
RefreshCw,
Save,
Search,
ShoppingBag,
SlidersHorizontal,
Sparkles,
Tag,
ToggleLeft,
ToggleRight,
Trash2,
Truck,
X
} from "lucide-react";
import Link from "next/link";
import { useEffect,useMemo,useState } from "react";

interface CategoryMeta {
  id: CouponCategory;
  name: string;
  shortName: string;
  description: string;
  publicUrl: string;
  icon: any;
  accentBorder: string;
  accentText: string;
  badgeBg: string;
  bannerBg: string;
}

const COUPON_CATEGORIES: CategoryMeta[] = [
  {
    id: "PERSONAL_TPMS",
    name: "Personal TPMS Coupons",
    shortName: "Personal TPMS",
    description: "Passenger Cars, 2-Wheelers & Consumer TPMS kits (/personal/buy/*)",
    publicUrl: "/personal/buy/cart",
    icon: Car,
    accentBorder: "border-amber-500/50",
    accentText: "text-amber-400",
    badgeBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    bannerBg: "bg-amber-500/10 border-amber-500/30",
  },
  {
    id: "SURAKSHA",
    name: "Suraksha Coupons",
    shortName: "Suraksha Commercial",
    description: "Commercial Fleet Trucks & Heavy Transporters (/suraksha/*)",
    publicUrl: "/suraksha/checkout",
    icon: Truck,
    accentBorder: "border-red-500/50",
    accentText: "text-red-400",
    badgeBg: "bg-red-500/15 text-red-300 border-red-500/30",
    bannerBg: "bg-red-500/10 border-red-500/30",
  },
];

// Fallback commercial catalogue for Suraksha if no products marked in db
const SURAKSHA_DEFAULT_PRODUCTS = [
  { _id: "suraksha_6w", title: "Suraksha 6-Wheel Commercial Kit", productsku: "SKU-SURAKSHA-6W", price: 10200 },
  { _id: "suraksha_10w", title: "Suraksha 10-Wheel Multi-Axle Kit", productsku: "SKU-SURAKSHA-10W", price: 17000 },
  { _id: "suraksha_12w", title: "Suraksha 12-Wheel Heavy Haul Kit", productsku: "SKU-SURAKSHA-12W", price: 20400 },
  { _id: "suraksha_14w", title: "Suraksha 14-Wheel Freight Kit", productsku: "SKU-SURAKSHA-14W", price: 23800 },
  { _id: "suraksha_16w", title: "Suraksha 16-Wheel Commercial Kit", productsku: "SKU-SURAKSHA-16W", price: 27200 },
  { _id: "suraksha_22w", title: "Suraksha 22-Wheel Prime Mover Kit", productsku: "SKU-SURAKSHA-22W", price: 37400 },
];

// Fallback consumer catalogue for Personal TPMS
const PERSONAL_DEFAULT_PRODUCTS = PERSONAL_PRODUCTS.map((p) => ({
  _id: p.id,
  title: p.title,
  productsku: p.productsku || `SKU-TPMS-${p.id.slice(-6)}`,
  price: p.price,
  category: p.category,
}));

export default function AdminCouponsPage() {
  const [activeCategory, setActiveCategory] = useState<CouponCategory>("PERSONAL_TPMS");
  const [allCoupons, setAllCoupons] = useState<AdminCoupon[]>([]);
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

  // Form scope and product multi-select state
  const [formScope, setFormScope] = useState<"category" | "product">("category");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [productFilterQuery, setProductFilterQuery] = useState("");

  const loadData = async () => {
    setLoading(true);
    setErrorMsg(null);

    const [couponsRes, productsRes] = await Promise.all([
      getAdminCoupons(),
      getAdminProducts(),
    ]);

    if (couponsRes.success && couponsRes.data) {
      setAllCoupons(couponsRes.data);
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

  const activeMeta = useMemo(() => {
    return COUPON_CATEGORIES.find((c) => c.id === activeCategory) || COUPON_CATEGORIES[0];
  }, [activeCategory]);

  // Coupons strictly filtered to activeCategory
  const categoryCoupons = useMemo(() => {
    return allCoupons.filter((c) => c.category === activeCategory);
  }, [allCoupons, activeCategory]);

  // Counts for each category tab
  const categoryCounts = useMemo(() => {
    return {
      PERSONAL_TPMS: allCoupons.filter((c) => c.category === "PERSONAL_TPMS").length,
      SURAKSHA: allCoupons.filter((c) => c.category === "SURAKSHA").length,
    };
  }, [allCoupons]);

  // Relevant products scoped to the target category (supports modal category switching)
  const targetCategoryForProducts = editingCoupon?.category || activeCategory;
  const relevantProducts = useMemo(() => {
    if (targetCategoryForProducts === "SURAKSHA") {
      const fromDb = products.filter((p) => {
        const cat = (p.category || "").toLowerCase();
        const title = (p.title || "").toLowerCase();
        const sku = (p.productsku || "").toUpperCase();
        return (
          cat.includes("commercial") ||
          cat.includes("truck") ||
          cat.includes("suraksha") ||
          title.includes("suraksha") ||
          sku.includes("SURAKSHA")
        );
      });
      return fromDb.length > 0 ? fromDb : SURAKSHA_DEFAULT_PRODUCTS;
    } else {
      // Personal TPMS products
      const fromDb = products.filter((p) => {
        const cat = (p.category || "").toLowerCase();
        const title = (p.title || "").toLowerCase();
        const sku = (p.productsku || "").toUpperCase();
        const isSur =
          cat.includes("commercial") ||
          cat.includes("truck") ||
          cat.includes("suraksha") ||
          title.includes("suraksha") ||
          sku.includes("SURAKSHA");
        return !isSur;
      });
      return fromDb.length > 0 ? fromDb : PERSONAL_DEFAULT_PRODUCTS;
    }
  }, [products, targetCategoryForProducts]);

  const handleCopy = async (code: string) => {
    const res = await copyToClipboardSafe(code);
    if (res.success) {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const handleCreateNew = () => {
    setFormScope("category");
    setSelectedProductIds([]);
    setProductFilterQuery("");
    setEditingCoupon({
      _id: `coup_new_${Date.now()}`,
      code: "",
      category: activeCategory,
      discountType: "percent",
      discountValue: 10,
      scope: "category",
      productId: "all",
      productTitle:
        activeCategory === "SURAKSHA"
          ? "All Suraksha Commercial Fleet Orders (Category-Wide)"
          : "All Personal TPMS Products (Category-Wide)",
      productSku: activeCategory === "SURAKSHA" ? "SURAKSHA-SITEWIDE" : "PERSONAL-SITEWIDE",
      productIds: [],
      productSkus: [],
      minOrderValue: 0,
      status: "Active",
      description: "",
    });
    setIsNewCoupon(true);
    setErrorMsg(null);
  };

  const handleEdit = (coupon: AdminCoupon) => {
    const isProdScope =
      coupon.scope === "product" ||
      (coupon.scope !== "category" &&
        ((!!coupon.productId && coupon.productId !== "all") ||
          (Array.isArray(coupon.productIds) && coupon.productIds.length > 0)));

    let initialIds: string[] = [];
    if (Array.isArray(coupon.productIds) && coupon.productIds.length > 0) {
      initialIds = [...coupon.productIds];
    } else if (coupon.productId && coupon.productId !== "all") {
      initialIds = [coupon.productId];
    }

    setFormScope(isProdScope ? "product" : "category");
    setSelectedProductIds(initialIds);
    setProductFilterQuery("");
    setEditingCoupon({
      ...coupon,
      category: coupon.category || activeCategory,
      scope: isProdScope ? "product" : "category",
      productId: coupon.productId || (isProdScope ? initialIds[0] || null : "all"),
      productIds: initialIds,
      productSkus: coupon.productSkus || (coupon.productSku ? [coupon.productSku] : []),
    });
    setIsNewCoupon(false);
    setErrorMsg(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon) return;

    if (formScope === "product") {
      if (selectedProductIds.length === 0) {
        setErrorMsg("Please select at least one specific product for product-specific coupons.");
        return;
      }
    }

    setSaving(true);
    setErrorMsg(null);

    const targetCategory = editingCoupon.category || activeCategory;
    let productIdsPayload: string[] | null = null;
    let productSkusPayload: string[] | null = null;
    let productIdPayload: string | null = null;
    let productSkuPayload: string | null = null;
    let productTitlePayload: string | null = null;

    if (formScope === "product") {
      productIdsPayload = selectedProductIds;
      const matchedProducts = selectedProductIds.map((id) => {
        const found = relevantProducts.find((p) => p._id === id);
        return {
          id,
          sku: found?.productsku || id,
          title: found?.title || id,
        };
      });

      productSkusPayload = matchedProducts.map((p) => p.sku);
      productIdPayload = productIdsPayload[0] || null;
      productSkuPayload = productSkusPayload[0] || null;

      if (matchedProducts.length === 1) {
        productTitlePayload = matchedProducts[0].title;
      } else {
        productTitlePayload = `${matchedProducts[0].title} (+${matchedProducts.length - 1} more)`;
      }
    } else {
      productIdPayload = null;
      productSkuPayload =
        targetCategory === "SURAKSHA" ? "SURAKSHA-SITEWIDE" : "PERSONAL-SITEWIDE";
      productTitlePayload =
        targetCategory === "SURAKSHA"
          ? "All Suraksha Commercial Fleet Orders (Category-Wide)"
          : "All Personal TPMS Products (Category-Wide)";
    }

    const res = await saveAdminCoupon({
      code: editingCoupon.code,
      category: targetCategory,
      discountType: editingCoupon.discountType,
      discountValue: editingCoupon.discountValue,
      scope: formScope,
      productId: productIdPayload,
      productTitle: productTitlePayload,
      productSku: productSkuPayload,
      productIds: productIdsPayload,
      productSkus: productSkusPayload,
      minOrderValue: editingCoupon.minOrderValue,
      maxDiscount: editingCoupon.maxDiscount,
      status: editingCoupon.status,
      description: editingCoupon.description,
    });

    if (res.success) {
      setSuccessMsg(
        `Coupon "${editingCoupon.code.toUpperCase()}" saved to ${
          targetCategory === "SURAKSHA" ? "Suraksha" : "Personal TPMS"
        } database.`
      );
      setTimeout(() => setSuccessMsg(null), 4000);
      setEditingCoupon(null);
      await loadData();
    } else {
      setErrorMsg(res.error || "Failed to save coupon");
    }
    setSaving(false);
  };

  const handleDelete = async (coupon: AdminCoupon) => {
    if (
      !confirm(
        `Are you sure you want to permanently delete coupon "${coupon.code}" from ${
          coupon.category === "SURAKSHA" ? "Suraksha" : "Personal TPMS"
        }?`
      )
    )
      return;

    setLoading(true);
    const res = await deleteAdminCoupon(coupon.code, coupon.category, coupon.productId);
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
    const res = await toggleAdminCouponStatus(
      coupon.code,
      coupon.category,
      coupon.productId || null,
      coupon.status
    );
    if (res.success) {
      setAllCoupons((prev) =>
        prev.map((c) =>
          c.code === coupon.code && c.category === coupon.category
            ? { ...c, status: nextStatus }
            : c
        )
      );
      setSuccessMsg(`Coupon "${coupon.code}" marked as ${nextStatus}.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      alert(res.error || "Failed to update coupon status");
    }
  };

  const isCouponProductSpecific = (c: AdminCoupon) => {
    return (
      c.scope === "product" ||
      (c.scope !== "category" &&
        ((!!c.productId && c.productId !== "all") ||
          (Array.isArray(c.productIds) && c.productIds.length > 0)))
    );
  };

  const filteredCoupons = categoryCoupons.filter((c) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      (c.code || "").toLowerCase().includes(searchLower) ||
      (c.productTitle || "").toLowerCase().includes(searchLower) ||
      (c.productSku || "").toLowerCase().includes(searchLower) ||
      (c.productSkus || []).some((s) => s.toLowerCase().includes(searchLower)) ||
      (c.description || "").toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === "all" || c.status === statusFilter;

    const isProd = isCouponProductSpecific(c);
    const matchesScope =
      scopeFilter === "all" ||
      (scopeFilter === "product" && isProd) ||
      (scopeFilter === "sitewide" && !isProd);

    return matchesSearch && matchesStatus && matchesScope;
  });

  const activeCount = categoryCoupons.filter((c) => c.status === "Active").length;
  const productCouponsCount = categoryCoupons.filter((c) => isCouponProductSpecific(c)).length;
  const sitewideCouponsCount = categoryCoupons.filter((c) => !isCouponProductSpecific(c)).length;

  return (
    <div className="space-y-8 max-w-7xl">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Tag className="w-7 h-7 text-amber-400" /> Coupons &amp; Discount Management
          </h1>
          <p className="text-sm text-slate-400 font-mono">
            Strict brand separation between Personal TPMS and Suraksha Commercial Fleet codes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={activeMeta.publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span>Live Cart</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
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
            className={
              activeCategory === "SURAKSHA"
                ? "bg-red-600 hover:bg-red-500 text-white text-xs font-mono gap-1.5 shadow-lg shadow-red-950/40"
                : "bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono gap-1.5 shadow-lg shadow-amber-950/40"
            }
          >
            <Plus className="w-3.5 h-3.5" />
            Add {activeCategory === "SURAKSHA" ? "Suraksha" : "TPMS"} Coupon
          </Button>
        </div>
      </div>

      {/* 2. Top-Level Category Navigation (Personal TPMS vs Suraksha) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COUPON_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const count = categoryCounts[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-left p-5 rounded-2xl border transition-all cursor-pointer relative ${
                isActive
                  ? `${cat.bannerBg} ${cat.accentBorder} shadow-xl ring-1 ring-white/10`
                  : "bg-slate-900/70 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isActive ? "bg-white/10" : "bg-slate-800"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? cat.accentText : "text-slate-400"}`} />
                  </div>
                  <div>
                    <h2
                      className={`text-base font-bold tracking-tight ${
                        isActive ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {cat.name}
                    </h2>
                    <span className="text-[11px] font-mono text-slate-400">
                      {cat.shortName} Section
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                    isActive ? cat.badgeBg : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {count} {count === 1 ? "Coupon" : "Coupons"}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-1">{cat.description}</p>
            </button>
          );
        })}
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

      {/* 3. KPI Stats Cards (Scoped to Active Category) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>Total {activeCategory === "SURAKSHA" ? "Suraksha" : "TPMS"}</span>
            <Tag className={`w-4 h-4 ${activeMeta.accentText}`} />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {loading ? "..." : categoryCoupons.length}
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Configured in database
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
            Redeemable in {activeCategory === "SURAKSHA" ? "Suraksha checkout" : "Personal cart"}
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
            Linked to {activeCategory === "SURAKSHA" ? "truck SKUs" : "personal SKUs"}
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
            {activeCategory === "SURAKSHA"
              ? "All Suraksha orders only"
              : "All Personal TPMS orders only"}
          </div>
        </Card>
      </div>

      {/* 4. Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <Input
            placeholder={`Search ${activeCategory === "SURAKSHA" ? "Suraksha" : "TPMS"} codes, SKUs...`}
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
                ? activeCategory === "SURAKSHA"
                  ? "bg-red-600 text-white"
                  : "bg-amber-600 text-white"
                : "border-slate-800 text-slate-400 hover:bg-slate-800"
            }`}
          >
            All Status ({categoryCoupons.length})
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
            Inactive ({categoryCoupons.length - activeCount})
          </Button>

          {/* Scope filter */}
          <Button
            variant={scopeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setScopeFilter(
                scopeFilter === "all"
                  ? "product"
                  : scopeFilter === "product"
                  ? "sitewide"
                  : "all"
              )
            }
            className="text-xs uppercase font-mono border-slate-800 text-slate-300 hover:bg-slate-800 gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
            Scope: {scopeFilter === "all" ? "All" : scopeFilter === "product" ? "Product-Only" : "Sitewide"}
          </Button>
        </div>
      </div>

      {/* 5. Coupons Table */}
      <Card className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Category Scope</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Applicable Product / Scope</th>
                <th className="p-4">Min. Order</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-sans">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-amber-400" />
                    Loading {activeMeta.name} from database...
                  </td>
                </tr>
              ) : filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-sans">
                    No {activeMeta.name} found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((coupon) => (
                  <tr key={coupon.code} className="hover:bg-slate-800/40 transition-colors">
                    {/* Code */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-lg border font-bold font-mono text-sm tracking-wider ${
                            coupon.category === "SURAKSHA"
                              ? "bg-red-500/10 border-red-500/30 text-red-400"
                              : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          }`}
                        >
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

                    {/* Category Scope */}
                    <td className="p-4">
                      {coupon.category === "SURAKSHA" ? (
                        <Badge className="bg-red-500/15 text-red-300 border-red-500/30 text-[10px] font-mono flex items-center gap-1 w-fit">
                          <Truck className="w-3 h-3" /> Suraksha Commercial
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 text-[10px] font-mono flex items-center gap-1 w-fit">
                          <Car className="w-3 h-3" /> Personal TPMS
                        </Badge>
                      )}
                    </td>

                    {/* Discount Value */}
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">
                        {coupon.discountType === "percent"
                          ? `${coupon.discountValue}% OFF`
                          : `₹${coupon.discountValue.toLocaleString("en-IN")} FLAT`}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase">
                        {coupon.discountType === "percent"
                          ? "Percentage Discount"
                          : "Fixed Cash Discount"}
                      </div>
                    </td>

                    {/* Scope */}
                    <td className="p-4">
                      {isCouponProductSpecific(coupon) ? (
                        <div className="space-y-1 max-w-[280px]">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Badge className="bg-purple-500/15 text-purple-300 border-purple-500/30 text-[10px] font-mono">
                              Specific Product{coupon.productIds && coupon.productIds.length > 1 ? `s (${coupon.productIds.length})` : ""}
                            </Badge>
                          </div>
                          <div className="text-white font-sans font-medium text-xs leading-tight line-clamp-2">
                            {coupon.productTitle || "Specific Selected Product(s)"}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(coupon.productSkus && coupon.productSkus.length > 0
                              ? coupon.productSkus
                              : coupon.productSku
                              ? [coupon.productSku]
                              : []
                            ).map((sku) => (
                              <span
                                key={sku}
                                className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-purple-300 font-mono text-[10px]"
                              >
                                SKU: {sku}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-[10px] font-mono">
                            {coupon.category === "SURAKSHA"
                              ? "Category-Wide (All Suraksha Fleet)"
                              : "Category-Wide (All Personal TPMS)"}
                          </Badge>
                          <div className="text-[10px] text-slate-500 truncate max-w-[220px] mt-0.5">
                            {coupon.description || "Applies to any eligible item in category"}
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

      {/* 6. Add / Edit Coupon Modal */}
      {editingCoupon && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    className={
                      editingCoupon.category === "SURAKSHA"
                        ? "bg-red-500/20 text-red-300 border-red-500/40 text-[10px] font-mono"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px] font-mono"
                    }
                  >
                    {editingCoupon.category === "SURAKSHA" ? "Suraksha Commercial" : "Personal TPMS"}
                  </Badge>
                </div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Tag
                    className={`w-5 h-5 ${
                      editingCoupon.category === "SURAKSHA" ? "text-red-400" : "text-amber-400"
                    }`}
                  />
                  {isNewCoupon
                    ? `Create ${editingCoupon.category === "SURAKSHA" ? "Suraksha" : "Personal TPMS"} Coupon`
                    : `Edit Coupon: ${editingCoupon.code}`}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Saves to persistent database store with strict category isolation
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
                {/* Coupon Category Scope (Locked to target tab) */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Category Scope *</label>
                  <select
                    value={editingCoupon.category}
                    onChange={(e) => {
                      const nextCat = e.target.value as CouponCategory;
                      setSelectedProductIds([]);
                      setEditingCoupon({
                        ...editingCoupon,
                        category: nextCat,
                        productId: formScope === "category" ? "all" : null,
                        productTitle:
                          nextCat === "SURAKSHA"
                            ? "All Suraksha Commercial Fleet Orders (Category-Wide)"
                            : "All Personal TPMS Products (Category-Wide)",
                        productSku:
                          nextCat === "SURAKSHA"
                            ? "SURAKSHA-SITEWIDE"
                            : "PERSONAL-SITEWIDE",
                        productIds: [],
                        productSkus: [],
                      });
                    }}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="PERSONAL_TPMS">🚗 Personal TPMS (/personal/buy/*)</option>
                    <option value="SURAKSHA">🚛 Suraksha Commercial Fleet (/suraksha/*)</option>
                  </select>
                  <div className="text-[10px] text-slate-500">
                    Category cannot be bypassed or shared across carts.
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Coupon Code *</label>
                  <Input
                    required
                    placeholder={
                      editingCoupon.category === "SURAKSHA"
                        ? "e.g. FLEET15, HIGHWAY10"
                        : "e.g. TREEL20, DIWALI500"
                    }
                    value={editingCoupon.code}
                    onChange={(e) =>
                      setEditingCoupon({
                        ...editingCoupon,
                        code: e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ""),
                      })
                    }
                    className={`bg-slate-950 border-slate-800 font-bold text-sm tracking-wider uppercase ${
                      editingCoupon.category === "SURAKSHA" ? "text-red-400" : "text-amber-400"
                    }`}
                  />
                  <div className="text-[10px] text-slate-500">
                    Alphanumeric uppercase. Min 3 characters.
                  </div>
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
                    placeholder={editingCoupon.discountType === "percent" ? "e.g. 10" : "e.g. 500"}
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

                {/* 1. Dedicated Scope Selector */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-slate-300 font-bold block">
                    Coupon Scope / Eligibility Level *
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Choose whether this coupon applies across all {editingCoupon.category === "SURAKSHA" ? "Suraksha Commercial" : "Personal TPMS"} products or is strictly restricted to specific individual products/SKUs.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Option 1: Category-Wide */}
                    <button
                      type="button"
                      onClick={() => {
                        setFormScope("category");
                        setSelectedProductIds([]);
                      }}
                      className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        formScope === "category"
                          ? editingCoupon.category === "SURAKSHA"
                            ? "bg-red-500/15 border-red-500/50 text-white ring-1 ring-red-500/30"
                            : "bg-amber-500/15 border-amber-500/50 text-white ring-1 ring-amber-500/30"
                          : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          formScope === "category"
                            ? editingCoupon.category === "SURAKSHA"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-amber-500/20 text-amber-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <Percent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white flex items-center gap-1.5">
                          <span>Category-Wide</span>
                          {formScope === "category" && (
                            <span className="text-[10px] text-emerald-400 font-mono">
                              (Selected)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Applies to all eligible {editingCoupon.category === "SURAKSHA" ? "Suraksha Commercial Fleet" : "Personal TPMS"} orders.
                        </div>
                      </div>
                    </button>

                    {/* Option 2: Specific Product(s) */}
                    <button
                      type="button"
                      onClick={() => {
                        setFormScope("product");
                        if (selectedProductIds.length === 0 && relevantProducts.length > 0) {
                          setSelectedProductIds([relevantProducts[0]._id]);
                        }
                      }}
                      className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        formScope === "product"
                          ? "bg-purple-500/15 border-purple-500/50 text-white ring-1 ring-purple-500/30"
                          : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          formScope === "product"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white flex items-center gap-1.5">
                          <span>Specific Product(s)</span>
                          {formScope === "product" && (
                            <span className="text-[10px] text-purple-400 font-mono">
                              (Selected)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Restricted only to explicitly selected products and canonical SKUs.
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Specific Product(s) Multi-Select Checklist */}
                {formScope === "product" && (
                  <div className="sm:col-span-2 space-y-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                      <div>
                        <label className="text-slate-200 font-bold block text-xs flex items-center gap-1.5">
                          <span>Select Eligible Products / Canonical SKUs *</span>
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 text-[10px] font-mono">
                            {selectedProductIds.length} Selected
                          </Badge>
                        </label>
                        <span className="text-[11px] text-slate-400">
                          Coupons will ONLY apply if at least one of these exact items is in the customer cart.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProductIds(relevantProducts.map((p) => p._id))}
                          className="text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          Select All ({relevantProducts.length})
                        </button>
                        <span className="text-slate-700">•</span>
                        <button
                          type="button"
                          onClick={() => setSelectedProductIds([])}
                          className="text-[11px] text-slate-400 hover:text-slate-300 transition-colors"
                        >
                          Deselect All
                        </button>
                      </div>
                    </div>

                    {/* Filter query if list has more than 3 products */}
                    {relevantProducts.length > 3 && (
                      <Input
                        placeholder="Search products or SKUs..."
                        value={productFilterQuery}
                        onChange={(e) => setProductFilterQuery(e.target.value)}
                        className="bg-slate-900 border-slate-800 text-xs font-mono h-8 placeholder:text-slate-500"
                      />
                    )}

                    {/* Checklist Container */}
                    <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                      {relevantProducts
                        .filter((p) => {
                          if (!productFilterQuery.trim()) return true;
                          const q = productFilterQuery.toLowerCase();
                          return (
                            (p.title || "").toLowerCase().includes(q) ||
                            (p.productsku || "").toLowerCase().includes(q) ||
                            (p._id || "").toLowerCase().includes(q)
                          );
                        })
                        .map((p) => {
                          const isSelected = selectedProductIds.includes(p._id);
                          const sku = p.productsku || p._id;
                          return (
                            <label
                              key={p._id}
                              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-purple-950/20 border-purple-500/50 text-white shadow-sm"
                                  : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:bg-slate-850 hover:text-slate-300"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {
                                    if (isSelected) {
                                      setSelectedProductIds(
                                        selectedProductIds.filter((id) => id !== p._id)
                                      );
                                    } else {
                                      setSelectedProductIds([...selectedProductIds, p._id]);
                                    }
                                  }}
                                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-purple-600 focus:ring-0 cursor-pointer"
                                />
                                <div>
                                  <div className="font-sans font-medium text-xs text-white leading-tight">
                                    {p.title}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-mono text-purple-300 bg-purple-500/15 px-1.5 py-0.5 rounded border border-purple-500/30">
                                      SKU: {sku}
                                    </span>
                                    {p.price ? (
                                      <span className="text-[10px] font-mono text-slate-400">
                                        ₹{p.price.toLocaleString("en-IN")}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              {isSelected ? (
                                <Badge className="bg-purple-500/25 text-purple-200 border-purple-500/50 text-[10px] font-mono shrink-0">
                                  Eligible
                                </Badge>
                              ) : (
                                <span className="text-[10px] text-slate-500 font-mono shrink-0">
                                  Excluded
                                </span>
                              )}
                            </label>
                          );
                        })}
                    </div>

                    {selectedProductIds.length === 0 && (
                      <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-mono flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          Error: At least one specific product must be selected for product-level coupons.
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Description / Notes */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-slate-300 font-bold">Admin Description / Offer Tagline</label>
                  <Input
                    placeholder="e.g. Highway Transporter Festive Safety Campaign"
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
                  className={
                    editingCoupon.category === "SURAKSHA"
                      ? "bg-red-600 hover:bg-red-500 text-white gap-2 font-mono"
                      : "bg-amber-600 hover:bg-amber-500 text-white gap-2 font-mono"
                  }
                >
                  <Save className="w-4 h-4" />
                  {saving
                    ? "Saving to Database..."
                    : isNewCoupon
                    ? `Create ${editingCoupon.category === "SURAKSHA" ? "Suraksha" : "Personal"} Coupon`
                    : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
