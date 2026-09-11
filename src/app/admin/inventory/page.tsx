"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink,
  X,
  Save,
  Image as ImageIcon
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatINR } from "@/lib/utils";
import { 
  getAdminProducts, 
  updateAdminProduct, 
  createAdminProduct, 
  deleteAdminProduct 
} from "@/lib/admin/admin-actions";
import { MongoProduct } from "@/types/admin";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<MongoProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState<MongoProduct | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setErrorMsg(null);
    const res = await getAdminProducts();
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

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  const filteredProducts = products.filter(p => {
    const matchesSearch = (p.title || "").toLowerCase().includes(search.toLowerCase()) ||
                          (p.productsku || "").toLowerCase().includes(search.toLowerCase()) ||
                          (p.slug || "").toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleEdit = (prod: MongoProduct) => {
    setEditingProduct({ ...prod });
    setIsNewProduct(false);
  };

  const handleCreateNew = () => {
    setEditingProduct({
      _id: `new_${Date.now()}`,
      title: "",
      price: 0,
      saleprice: null,
      category: "Personal TPMS",
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
    });
    setIsNewProduct(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSaving(true);
    setErrorMsg(null);

    if (isNewProduct) {
      const res = await createAdminProduct(editingProduct);
      if (res.success) {
        setEditingProduct(null);
        await loadProducts();
      } else {
        setErrorMsg(res.error || "Failed to create product");
      }
    } else {
      const res = await updateAdminProduct(editingProduct._id, editingProduct);
      if (res.success) {
        setEditingProduct(null);
        await loadProducts();
      } else {
        setErrorMsg(res.error || "Failed to update product");
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setLoading(true);
    const res = await deleteAdminProduct(id);
    if (res.success) {
      await loadProducts();
    } else {
      alert(res.error || "Failed to delete product");
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

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <Input
            placeholder="Search by Title, SKU, Slug..."
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
            All Categories ({products.length})
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
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-sans">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-purple-400" />
                    Loading products from Supabase...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-sans">
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
                <div className="space-y-1">
                  <label className="text-slate-400">Category *</label>
                  <Input
                    required
                    value={editingProduct.category || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
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
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-purple-400" /> S3 Image Asset URLs
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    placeholder="Primary image URL (image)"
                    value={editingProduct.image || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                  <Input
                    placeholder="Image 2 URL (image2)"
                    value={editingProduct.image2 || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image2: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                  <Input
                    placeholder="Image 3 URL (image3)"
                    value={editingProduct.image3 || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image3: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                  <Input
                    placeholder="Image 4 URL (image4)"
                    value={editingProduct.image4 || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image4: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
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
