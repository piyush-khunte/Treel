"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
createAdminProduct,
deleteAdminProduct,
getAdminProducts,
updateAdminProduct
} from "@/lib/admin/admin-actions";
import { formatINR } from "@/lib/utils";
import { MongoProduct,ProductBrand } from "@/types/admin";
import {
Bike,
Car,
CheckCircle2,
Disc,
Edit3,
ExternalLink,
Image as ImageIcon,
Layers,
Plus,
Radio,
RefreshCw,
Save,
Search,
Shield,
Trash2,
X
} from "lucide-react";
import { useEffect,useState } from "react";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<MongoProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBrandTab, setActiveBrandTab] = useState<"all" | "personal" | "suraksha">("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState<MongoProduct | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setUploadError("Invalid file type. Please choose a JPG, PNG, WebP, GIF, or SVG image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is 5MB.`);
      return;
    }

    setUploadError(null);
    setUploadingImage(true);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-product-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.success && data.url) {
        setEditingProduct({ ...editingProduct, image: data.url });
        setImagePreview(data.url);
      } else {
        setUploadError(data.error || "Failed to upload image");
      }
    } catch (err: any) {
      setUploadError(err.message || "Network error while uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    setErrorMsg(null);
    const res = await getAdminProducts("all");
    if (res.success && res.data) {
      setProducts(res.data);
    } else {
      setErrorMsg(res.error || "Failed to load products");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const totalCount = products.length;
  const personalCount = products.filter(p => (p.brand || "personal") === "personal").length;
  const surakshaCount = products.filter(p => p.brand === "suraksha").length;

  const brandScopedProducts = products.filter(p => {
    if (activeBrandTab === "personal") return (p.brand || "personal") === "personal";
    if (activeBrandTab === "suraksha") return p.brand === "suraksha";
    return true;
  });

  const categories = Array.from(new Set(brandScopedProducts.map(p => p.category).filter(Boolean)));

  const filteredProducts = brandScopedProducts.filter(p => {
    const matchesSearch = (p.title || "").toLowerCase().includes(search.toLowerCase()) ||
                          (p.productsku || "").toLowerCase().includes(search.toLowerCase()) ||
                          (p.slug || "").toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleBrandTabChange = (tab: "all" | "personal" | "suraksha") => {
    setActiveBrandTab(tab);
    setCategoryFilter("all");
  };

  const handleEdit = (prod: MongoProduct) => {
    const brand: ProductBrand = (prod.brand as ProductBrand) || (
      prod.category?.toLowerCase().includes("suraksha") || 
      prod.productsku?.includes("SURAKSHA") || 
      prod.title?.toLowerCase().includes("suraksha") ? "suraksha" : "personal"
    );
    setEditingProduct({ ...prod, brand, brand_scope: brand });
    setImagePreview(prod.image || null);
    setUploadError(null);
    setIsNewProduct(false);
  };

  const handleCreateNew = () => {
    const defaultBrand: ProductBrand = activeBrandTab === "suraksha" ? "suraksha" : "personal";
    setEditingProduct({
      _id: `new_${Date.now()}`,
      brand: defaultBrand,
      brand_scope: defaultBrand,
      title: "",
      price: 0,
      saleprice: null,
      category: defaultBrand === "suraksha" ? "Commercial Truck Kit" : "Car Kit",
      slug: "",
      image: "",
      description: "",
      editorValue: "",
      boxpoint: "",
      stepone: "",
      steptwo: "",
      stepthree: "",
      stepfour: "",
      stepdescription1: "",
      stepdescription2: "",
      stepdescription3: "",
      stepdescription4: "",
      couponcode: "",
      couponamount: null,
      productsku: "",
      status: "active",
      stock: 100,
    });
    setImagePreview(null);
    setUploadError(null);
    setIsNewProduct(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    if (!editingProduct.brand) {
      setErrorMsg("Product brand is required. Please choose Personal TPMS or Treel Suraksha.");
      return;
    }
    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (isNewProduct) {
      const res = await createAdminProduct(editingProduct);
      if (res.success) {
        const brandLabel = editingProduct.brand === "suraksha" ? "Treel Suraksha (/suraksha/pricing)" : "Personal TPMS";
        setSuccessMsg(`Product "${editingProduct.title}" created successfully and published to ${brandLabel}!`);
        setEditingProduct(null);
        await loadProducts();
        setTimeout(() => setSuccessMsg(null), 6000);
      } else {
        setErrorMsg(res.error || "Failed to create product");
      }
    } else {
      const res = await updateAdminProduct(editingProduct._id, editingProduct);
      if (res.success) {
        setSuccessMsg(`Product "${editingProduct.title}" updated successfully! Price: ₹${Number(editingProduct.price).toLocaleString("en-IN")}.`);
        setEditingProduct(null);
        await loadProducts();
        setTimeout(() => setSuccessMsg(null), 6000);
      } else {
        setErrorMsg(res.error || "Failed to update product");
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    const res = await deleteAdminProduct(id);
    if (res.success) {
      setSuccessMsg(`Product "${title}" deleted successfully.`);
      await loadProducts();
      setTimeout(() => setSuccessMsg(null), 5000);
    } else {
      setErrorMsg(res.error || "Failed to delete product");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Catalogue & Product Management</h1>
          <p className="text-sm text-slate-400 font-mono">Live synchronization with Supabase products table ({products.length} active SKUs)</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadProducts}
            disabled={loading}
            className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-mono gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            size="sm" 
            onClick={handleCreateNew}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </Button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between shadow-lg shadow-emerald-500/5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
          <button type="button" onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-300">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center justify-between">
          <span>{errorMsg}</span>
          <button type="button" onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-rose-300">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Brand Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        <button
          type="button"
          onClick={() => handleBrandTabChange("all")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
            activeBrandTab === "all"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/20 ring-1 ring-purple-500"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Products</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeBrandTab === "all" ? "bg-purple-800 text-purple-100" : "bg-slate-800 text-slate-400"}`}>
            {totalCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleBrandTabChange("personal")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
            activeBrandTab === "personal"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-1 ring-emerald-500"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
          <span>Personal TPMS</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeBrandTab === "personal" ? "bg-emerald-800 text-emerald-100" : "bg-slate-800 text-slate-400"}`}>
            {personalCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleBrandTabChange("suraksha")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
            activeBrandTab === "suraksha"
              ? "bg-amber-600 text-white shadow-md shadow-amber-600/20 ring-1 ring-amber-500"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse"></span>
          <span>Treel Suraksha</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeBrandTab === "suraksha" ? "bg-amber-800 text-amber-100" : "bg-slate-800 text-slate-400"}`}>
            {surakshaCount}
          </span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <Input
            placeholder={
              activeBrandTab === "personal" 
                ? "Search Personal TPMS (Title, SKU)..." 
                : activeBrandTab === "suraksha" 
                ? "Search Suraksha (Title, SKU)..." 
                : "Search all products (Title, SKU)..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button
            variant={categoryFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter("all")}
            className={`text-xs uppercase font-mono ${categoryFilter === "all" ? "bg-purple-600 text-white" : "border-slate-800 text-slate-400 hover:bg-slate-800"}`}
          >
            All Categories ({brandScopedProducts.length})
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={categoryFilter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs uppercase font-mono ${categoryFilter === cat ? "bg-purple-600 text-white" : "border-slate-800 text-slate-400 hover:bg-slate-800"}`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <Card className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">SKU / ID</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Regular Price</th>
                <th className="p-4">Sale Price</th>
                <th className="p-4">Coupon</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 font-sans">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-purple-400" />
                    Loading products from Supabase...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 font-sans">
                    No products found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="text-purple-400 font-bold">{p.productsku || "NO-SKU"}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[100px]">{p._id}</div>
                    </td>
                    <td className="p-4">
                      {p.brand === "suraksha" ? (
                        <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/30 font-mono text-[10px] gap-1 px-2 py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                          Treel Suraksha
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 font-mono text-[10px] gap-1 px-2 py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                          Personal TPMS
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-white font-sans font-medium">{p.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">/{p.slug}</div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-slate-800 text-slate-300 border-slate-700 font-mono text-[10px]">
                        {p.category || "General"}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-300 font-bold">{formatINR(Number(p.price) || 0)}</td>
                    <td className="p-4">
                      {p.saleprice ? (
                        <span className="text-emerald-400 font-bold">{formatINR(Number(p.saleprice))}</span>
                      ) : (
                        <span className="text-slate-600">--</span>
                      )}
                    </td>
                    <td className="p-4">
                      {p.couponcode ? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px]">
                          {p.couponcode} {p.couponamount ? `(-₹${p.couponamount})` : ''}
                        </span>
                      ) : (
                        <span className="text-slate-600">--</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <a 
                          href={p.brand === "suraksha" ? "/suraksha/pricing" : `/personal/product?slug=${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={p.brand === "suraksha" ? "View on Suraksha storefront (/suraksha/pricing)" : "View on Personal TPMS storefront"}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(p)}
                          className="h-7 px-2 border-slate-700 text-slate-300 hover:bg-slate-800 text-[11px] gap-1"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDelete(p._id, p.title)}
                          className="h-7 px-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-[11px]"
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

      {/* Edit / Create Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isNewProduct ? "Add New Product" : `Edit Product: ${editingProduct.title}`}
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  MongoDB ObjectId: {editingProduct._id}
                </p>
              </div>
              <button 
                onClick={() => setEditingProduct(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 text-xs font-mono">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                  {errorMsg}
                </div>
              )}
              {/* Product Brand Selector */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-bold text-xs flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    Product Brand / Storefront Scope *
                  </label>
                  {!isNewProduct && (
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Brand Locked (Preserves Order & Storefront Integrity)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={!isNewProduct}
                    onClick={() => {
                      setEditingProduct({
                        ...editingProduct,
                        brand: "personal",
                        brand_scope: "personal",
                        category: editingProduct.category === "Commercial Truck Kit" ? "Car Kit" : editingProduct.category
                      });
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      editingProduct.brand === "personal"
                        ? "bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    } ${!isNewProduct ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className={`w-4 h-4 ${editingProduct.brand === "personal" ? "text-emerald-400" : "text-slate-600"}`} />
                        Personal TPMS
                      </span>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[9px] font-mono">
                        Consumer (2W / 4W)
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      Consumer tyre monitoring kits for bikes and cars. Displayed exclusively on the /personal storefront.
                    </p>
                  </button>

                  <button
                    type="button"
                    disabled={!isNewProduct}
                    onClick={() => {
                      setEditingProduct({
                        ...editingProduct,
                        brand: "suraksha",
                        brand_scope: "suraksha",
                        category: editingProduct.category === "Car Kit" ? "Commercial Truck Kit" : editingProduct.category
                      });
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      editingProduct.brand === "suraksha"
                        ? "bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/5 ring-1 ring-amber-500"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    } ${!isNewProduct ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-amber-400 flex items-center gap-1.5">
                        <CheckCircle2 className={`w-4 h-4 ${editingProduct.brand === "suraksha" ? "text-amber-400" : "text-slate-600"}`} />
                        Treel Suraksha
                      </span>
                      <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[9px] font-mono">
                        Commercial Fleets
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                      Commercial truck TPMS, multi-axle trailers, in-cab display units. Displayed exclusively on /suraksha.
                    </p>
                  </button>
                </div>
              </div>

              {/* Core Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Product Title *</label>
                  <Input
                    required
                    value={editingProduct.title || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Slug *</label>
                  <Input
                    required
                    value={editingProduct.slug || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                {/* Product Type / Category Selector */}
                <div className="space-y-3 sm:col-span-2 p-4 rounded-xl border border-slate-800 bg-slate-950/80">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-200 font-bold text-xs flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-400" />
                      {editingProduct.brand === "suraksha" ? "Commercial Suraksha Kit Type *" : "Personal TPMS Product Type *"}
                    </label>
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {editingProduct.brand === "suraksha" ? "Suraksha Storefront Fleet Specs" : "Controls Storefront Badge (CAR KIT / BIKE KIT)"}
                    </span>
                  </div>

                  {editingProduct.brand === "personal" ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {[
                          {
                            id: "Car Kit",
                            title: "Car Kit",
                            specs: "4W TPMS (Cars & SUVs)",
                            badge: "CAR KIT",
                            Icon: Car,
                            color: "blue",
                            activeClass: "bg-blue-600/15 border-blue-500 ring-2 ring-blue-500 text-white shadow-md shadow-blue-500/10",
                            badgeClass: "bg-blue-500 text-white",
                          },
                          {
                            id: "Bike Kit",
                            title: "Bike Kit",
                            specs: "2W TPMS (Bikes & Scooters)",
                            badge: "BIKE KIT",
                            Icon: Bike,
                            color: "emerald",
                            activeClass: "bg-emerald-600/15 border-emerald-500 ring-2 ring-emerald-500 text-white shadow-md shadow-emerald-500/10",
                            badgeClass: "bg-emerald-500 text-white",
                          },
                          {
                            id: "Upgrade Kit",
                            title: "Upgrade Kit",
                            specs: "MTrac GPS & Smart Sync",
                            badge: "UPGRADE KIT",
                            Icon: Radio,
                            color: "indigo",
                            activeClass: "bg-indigo-600/15 border-indigo-500 ring-2 ring-indigo-500 text-white shadow-md shadow-indigo-500/10",
                            badgeClass: "bg-indigo-500 text-white",
                          },
                          {
                            id: "Replacement Sensor",
                            title: "Replacement Sensor",
                            specs: "Standalone Valve / Sensor",
                            badge: "REPLACEMENT SENSOR",
                            Icon: Disc,
                            color: "purple",
                            activeClass: "bg-purple-600/15 border-purple-500 ring-2 ring-purple-500 text-white shadow-md shadow-purple-500/10",
                            badgeClass: "bg-purple-500 text-white",
                          },
                        ].map((item) => {
                          const currentNorm = (editingProduct.category || "").toLowerCase();
                          const isSelected = 
                            currentNorm === item.id.toLowerCase() ||
                            (item.id === "Bike Kit" && currentNorm.includes("bike")) ||
                            (item.id === "Car Kit" && currentNorm.includes("car") && !currentNorm.includes("truck")) ||
                            (item.id === "Upgrade Kit" && currentNorm.includes("upgrade")) ||
                            (item.id === "Replacement Sensor" && (currentNorm.includes("replacement") || currentNorm.includes("sensor")));

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setEditingProduct({ ...editingProduct, category: item.id })}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                                isSelected
                                  ? item.activeClass
                                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <item.Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-slate-400"}`} />
                                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                                  isSelected ? item.badgeClass : "bg-slate-800 text-slate-400"
                                }`}>
                                  {item.badge}
                                </span>
                              </div>
                              <div>
                                <div className="font-bold text-xs flex items-center gap-1.5">
                                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-white" : "text-slate-700"}`} />
                                  <span>{item.title}</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1 leading-snug">{item.specs}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-1 border-t border-slate-800/60">
                        <span className="text-[11px] text-slate-400 shrink-0 font-mono">Selected Category:</span>
                        <Input
                          required
                          value={editingProduct.category || ""}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="bg-slate-950 border-slate-800 text-white font-mono text-xs h-8 max-w-sm"
                          placeholder="e.g. Car Kit, Bike Kit"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "Commercial Truck Kit",
                          "Multi-Axle Kit",
                          "Prime Mover Kit",
                          "Display Kit",
                          "Replacement Sensor"
                        ].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setEditingProduct({ ...editingProduct, category: preset })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                              editingProduct.category === preset
                                ? "bg-amber-600 text-white font-bold ring-1 ring-amber-400"
                                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                            }`}
                          >
                            + {preset}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-1 border-t border-slate-800/60">
                        <span className="text-[11px] text-slate-400 shrink-0 font-mono">Category Value:</span>
                        <Input
                          required
                          value={editingProduct.category || ""}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="bg-slate-950 border-slate-800 text-white font-mono text-xs h-8 max-w-sm"
                          placeholder="e.g. Commercial Truck Kit"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Product SKU</label>
                  <Input
                    value={editingProduct.productsku || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, productsku: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Inventory Stock Count</label>
                  <Input
                    type="number"
                    value={editingProduct.stock ?? 100}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Regular Price (INR) *</label>
                  <Input
                    type="number"
                    required
                    value={editingProduct.price ?? 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Sale Price (INR)</label>
                  <Input
                    type="number"
                    value={editingProduct.saleprice ?? ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, saleprice: e.target.value ? Number(e.target.value) : null })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* Coupons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="space-y-1">
                  <label className="text-slate-400">Coupon Code</label>
                  <Input
                    value={editingProduct.couponcode || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, couponcode: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                    placeholder="e.g. TREEL10"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Coupon Amount</label>
                  <Input
                    value={editingProduct.couponamount || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, couponamount: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-purple-400" /> Primary Product Image *
                  </div>
                  {editingProduct.image && (
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Image attached
                    </span>
                  )}
                </div>

                {/* Upload or URL Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {/* File Upload Selector */}
                  <div className="space-y-2">
                    <label className="text-slate-300 font-semibold block text-xs">
                      Option A: Upload Image File (PNG, JPG, WebP max 5MB)
                    </label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                        disabled={uploadingImage}
                        onChange={handleImageFileUpload}
                        className="file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 text-slate-400 text-xs cursor-pointer border border-slate-800 rounded-lg p-2 bg-slate-900 w-full"
                      />
                      {uploadingImage && (
                        <div className="flex items-center gap-2 text-xs text-purple-400 animate-pulse font-mono">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading image to storage...
                        </div>
                      )}
                      {uploadError && (
                        <div className="text-rose-400 text-[11px] font-sans">
                          {uploadError}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Manual URL Input */}
                  <div className="space-y-2">
                    <label className="text-slate-300 font-semibold block text-xs">
                      Option B: Or Enter Image URL
                    </label>
                    <Input
                      placeholder="https://...image.png"
                      value={editingProduct.image || ""}
                      onChange={(e) => {
                        setEditingProduct({ ...editingProduct, image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="bg-slate-900 border-slate-800 text-white font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Preview Thumbnail */}
                {(imagePreview || editingProduct.image) && (
                  <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="w-16 h-16 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview || editingProduct.image}
                        alt="Product Preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      <div className="text-xs font-semibold text-white">Live Image Preview</div>
                      <div className="text-[11px] text-slate-400 font-mono truncate max-w-md">
                        {editingProduct.image}
                      </div>
                    </div>
                  </div>
                )}

                {/* Secondary Gallery Images */}
                <div className="space-y-2 pt-2">
                  <label className="text-slate-400 block text-xs">Secondary Gallery Image URLs (Optional)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      placeholder="Gallery 2 (image2)"
                      value={editingProduct.image2 || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image2: e.target.value })}
                      className="bg-slate-950 border-slate-800 text-white text-xs"
                    />
                    <Input
                      placeholder="Gallery 3 (image3)"
                      value={editingProduct.image3 || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image3: e.target.value })}
                      className="bg-slate-950 border-slate-800 text-white text-xs"
                    />
                    <Input
                      placeholder="Gallery 4 (image4)"
                      value={editingProduct.image4 || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image4: e.target.value })}
                      className="bg-slate-950 border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="space-y-1">
                  <label className="text-slate-400">Short Description</label>
                  <textarea
                    rows={3}
                    value={editingProduct.description || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full rounded-md bg-slate-950 border border-slate-800 p-2 text-white font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Box Contents / Bullet Points (boxpoint)</label>
                  <textarea
                    rows={2}
                    value={editingProduct.boxpoint || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, boxpoint: e.target.value })}
                    className="w-full rounded-md bg-slate-950 border border-slate-800 p-2 text-white font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Rich HTML Content (editorValue)</label>
                  <textarea
                    rows={4}
                    value={editingProduct.editorValue || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, editorValue: e.target.value })}
                    className="w-full rounded-md bg-slate-950 border border-slate-800 p-2 text-white font-mono"
                  />
                </div>
              </div>

              {/* Installation Steps */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="text-sm font-bold text-white">4-Step Installation Guide</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-slate-400 font-bold">Step 1</label>
                    <Input
                      placeholder="stepone"
                      value={editingProduct.stepone || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stepone: e.target.value })}
                      className="bg-slate-900 border-slate-800 text-white"
                    />
                    <textarea
                      placeholder="stepdescription1"
                      rows={2}
                      value={editingProduct.stepdescription1 || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stepdescription1: e.target.value })}
                      className="w-full rounded-md bg-slate-900 border border-slate-800 p-2 text-white font-sans"
                    />
                  </div>

                  <div className="space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-slate-400 font-bold">Step 2</label>
                    <Input
                      placeholder="steptwo"
                      value={editingProduct.steptwo || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, steptwo: e.target.value })}
                      className="bg-slate-900 border-slate-800 text-white"
                    />
                    <textarea
                      placeholder="stepdescription2"
                      rows={2}
                      value={editingProduct.stepdescription2 || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stepdescription2: e.target.value })}
                      className="w-full rounded-md bg-slate-900 border border-slate-800 p-2 text-white font-sans"
                    />
                  </div>

                  <div className="space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-slate-400 font-bold">Step 3</label>
                    <Input
                      placeholder="stepthree"
                      value={editingProduct.stepthree || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stepthree: e.target.value })}
                      className="bg-slate-900 border-slate-800 text-white"
                    />
                    <textarea
                      placeholder="stepdescription3"
                      rows={2}
                      value={editingProduct.stepdescription3 || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stepdescription3: e.target.value })}
                      className="w-full rounded-md bg-slate-900 border border-slate-800 p-2 text-white font-sans"
                    />
                  </div>

                  <div className="space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-slate-400 font-bold">Step 4</label>
                    <Input
                      placeholder="stepfour"
                      value={editingProduct.stepfour || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stepfour: e.target.value })}
                      className="bg-slate-900 border-slate-800 text-white"
                    />
                    <textarea
                      placeholder="stepdescription4"
                      rows={2}
                      value={editingProduct.stepdescription4 || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stepdescription4: e.target.value })}
                      className="w-full rounded-md bg-slate-900 border border-slate-800 p-2 text-white font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingProduct(null)}
                  className="border-slate-800 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving to Supabase..." : "Save Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
