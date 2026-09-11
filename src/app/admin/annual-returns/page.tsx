"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  X, 
  Save, 
  ExternalLink 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  getAdminAnnualReturns, 
  createAdminAnnualReturn, 
  updateAdminAnnualReturn, 
  deleteAdminAnnualReturn 
} from "@/lib/admin/admin-actions";
import { MongoAnnualReturn } from "@/types/admin";

export default function AdminAnnualReturnsPage() {
  const [returns, setReturns] = useState<MongoAnnualReturn[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState<MongoAnnualReturn | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await getAdminAnnualReturns();
    if (res.success && res.data) {
      setReturns(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (item: MongoAnnualReturn) => {
    setEditingItem({ ...item });
    setIsNew(false);
  };

  const handleCreate = () => {
    setEditingItem({
      _id: `new_${Date.now()}`,
      title: "",
      pdf: "",
      date: new Date().toISOString()
    });
    setIsNew(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);

    if (isNew) {
      const res = await createAdminAnnualReturn(editingItem);
      if (res.success) {
        setEditingItem(null);
        await loadData();
      } else {
        alert(res.error || "Failed to create return");
      }
    } else {
      const res = await updateAdminAnnualReturn(editingItem._id, editingItem);
      if (res.success) {
        setEditingItem(null);
        await loadData();
      } else {
        alert(res.error || "Failed to update return");
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setLoading(true);
    const res = await deleteAdminAnnualReturn(id);
    if (res.success) {
      await loadData();
    } else {
      alert(res.error || "Failed to delete return");
      setLoading(false);
    }
  };

  const filtered = returns.filter(r => 
    (r.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Annual Returns & Compliance</h1>
          <p className="text-sm text-slate-400 font-mono">Live synchronization with Supabase annualreturns table ({returns.length} reports)</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadData}
            disabled={loading}
            className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-mono gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            size="sm" 
            onClick={handleCreate}
            className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Annual Return
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <Input
            placeholder="Search by Report Title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 text-xs font-mono"
          />
        </div>
      </div>

      {/* Annual Returns Table */}
      <Card className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Report Title</th>
                <th className="p-4">PDF Document Link</th>
                <th className="p-4">Filing Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 font-sans">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-rose-400" />
                    Loading annual returns from Supabase...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 font-sans">
                    No annual returns records found.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="text-white font-sans font-medium text-sm">{r.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono">ID: {r._id}</div>
                    </td>
                    <td className="p-4">
                      <a 
                        href={r.pdf} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-rose-400 hover:underline flex items-center gap-1.5 truncate max-w-[280px]"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{r.pdf}</span>
                      </a>
                    </td>
                    <td className="p-4 text-slate-400">{r.date ? new Date(r.date).toLocaleDateString() : "--"}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(r)}
                          className="h-7 px-2 border-slate-700 text-slate-300 hover:bg-slate-800 text-[11px] gap-1"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDelete(r._id, r.title)}
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

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isNew ? "Add Annual Return" : `Edit: ${editingItem.title}`}
                </h2>
                <p className="text-xs text-slate-400 font-mono">ID: {editingItem._id}</p>
              </div>
              <button 
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-400">Report Title (title) *</label>
                <Input
                  required
                  value={editingItem.title || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white font-sans text-sm"
                  placeholder="e.g. Annual Return MGT-7 2023-24"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">PDF Document Link (pdf) *</label>
                <Input
                  required
                  value={editingItem.pdf || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, pdf: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white"
                  placeholder="https://...s3.amazonaws.com/annual-returns/..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Filing Date (date)</label>
                <Input
                  value={editingItem.date || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingItem(null)}
                  className="border-slate-800 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-rose-600 hover:bg-rose-500 text-white gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Return"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
