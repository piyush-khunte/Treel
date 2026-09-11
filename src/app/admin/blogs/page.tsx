"use client";

import { useState, useEffect } from "react";
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
  Calendar
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  getAdminBlogs, 
  createAdminBlog, 
  updateAdminBlog, 
  deleteAdminBlog 
} from "@/lib/admin/admin-actions";
import { MongoBlog } from "@/types/admin";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<MongoBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingBlog, setEditingBlog] = useState<MongoBlog | null>(null);
  const [isNewBlog, setIsNewBlog] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadBlogs = async () => {
    setLoading(true);
    const res = await getAdminBlogs();
    if (res.success && res.data) {
      setBlogs(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleEdit = (blog: MongoBlog) => {
    setEditingBlog({ ...blog });
    setIsNewBlog(false);
  };

  const handleCreate = () => {
    setEditingBlog({
      _id: `new_${Date.now()}`,
      title: "",
      subtitle: "",
      slug: "",
      description: "",
      blogContent: "",
      image: "",
      metatitle: "",
      metadescription: "",
      date: new Date().toISOString()
    });
    setIsNewBlog(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    setSaving(true);

    if (isNewBlog) {
      const res = await createAdminBlog(editingBlog);
      if (res.success) {
        setEditingBlog(null);
        await loadBlogs();
      } else {
        alert(res.error || "Failed to create blog");
      }
    } else {
      const res = await updateAdminBlog(editingBlog._id, editingBlog);
      if (res.success) {
        setEditingBlog(null);
        await loadBlogs();
      } else {
        alert(res.error || "Failed to update blog");
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete blog "${title}"?`)) return;
    setLoading(true);
    const res = await deleteAdminBlog(id);
    if (res.success) {
      await loadBlogs();
    } else {
      alert(res.error || "Failed to delete blog");
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    (b.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (b.slug || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Blog & Editorial Management</h1>
          <p className="text-sm text-slate-400 font-mono">Live synchronization with Supabase blogs table ({blogs.length} posts)</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadBlogs}
            disabled={loading}
            className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-mono gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            size="sm" 
            onClick={handleCreate}
            className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Blog Post
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <Input
            placeholder="Search by Title, Slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 text-xs font-mono"
          />
        </div>
      </div>

      {/* Blogs Table */}
      <Card className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Date</th>
                <th className="p-4">SEO Meta Title</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-sans">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-cyan-400" />
                    Loading blogs from Supabase...
                  </td>
                </tr>
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-sans">
                    No blogs found. Click "Add Blog Post" to create one.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="text-white font-sans font-medium text-sm">{b.title}</div>
                      {b.subtitle ? <div className="text-[11px] text-slate-400">{b.subtitle}</div> : null}
                    </td>
                    <td className="p-4 text-cyan-400 font-mono">/{b.slug}</td>
                    <td className="p-4 text-slate-400">{b.date ? new Date(b.date).toLocaleDateString() : "--"}</td>
                    <td className="p-4 text-slate-500 truncate max-w-[200px]">{b.metatitle || "--"}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(b)}
                          className="h-7 px-2 border-slate-700 text-slate-300 hover:bg-slate-800 text-[11px] gap-1"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDelete(b._id, b.title)}
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

      {/* Edit / Create Blog Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isNewBlog ? "Add New Blog Post" : `Edit Blog: ${editingBlog.title}`}
                </h2>
                <p className="text-xs text-slate-400 font-mono">MongoDB ObjectId: {editingBlog._id}</p>
              </div>
              <button 
                onClick={() => setEditingBlog(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-400">Title *</label>
                <Input
                  required
                  value={editingBlog.title || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white font-sans text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Subtitle</label>
                  <Input
                    value={editingBlog.subtitle || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, subtitle: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Slug *</label>
                  <Input
                    required
                    value={editingBlog.slug || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Featured Image URL (image) *</label>
                <Input
                  required
                  value={editingBlog.image || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white"
                  placeholder="https://...s3.amazonaws.com/..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Short Summary / Excerpt (description) *</label>
                <textarea
                  required
                  rows={3}
                  value={editingBlog.description || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, description: e.target.value })}
                  className="w-full rounded-md bg-slate-950 border border-slate-800 p-2 text-white font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Full HTML Article Body (blogContent) *</label>
                <textarea
                  required
                  rows={6}
                  value={editingBlog.blogContent || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, blogContent: e.target.value })}
                  className="w-full rounded-md bg-slate-950 border border-slate-800 p-2 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="space-y-1">
                  <label className="text-slate-400">Meta Title (metatitle)</label>
                  <Input
                    value={editingBlog.metatitle || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, metatitle: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Meta Description (metadescription)</label>
                  <Input
                    value={editingBlog.metadescription || ""}
                    onChange={(e) => setEditingBlog({ ...editingBlog, metadescription: e.target.value })}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingBlog(null)}
                  className="border-slate-800 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving to Supabase..." : "Save Blog Post"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
