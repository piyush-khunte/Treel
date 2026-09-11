"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Eye, 
  RefreshCw, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  X,
  Package
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatINR } from "@/lib/utils";
import { getAdminCheckouts, updateAdminCheckoutStatus } from "@/lib/admin/admin-actions";
import { MongoCheckout } from "@/types/admin";

export default function AdminOrdersPage() {
  const [checkouts, setCheckouts] = useState<MongoCheckout[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCheckout, setSelectedCheckout] = useState<MongoCheckout | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadCheckouts = async () => {
    setLoading(true);
    const res = await getAdminCheckouts();
    if (res.success && res.data) {
      setCheckouts(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCheckouts();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const res = await updateAdminCheckoutStatus(id, newStatus);
    if (res.success) {
      setCheckouts(checkouts.map(c => c._id === id ? { ...c, status: newStatus } : c));
      if (selectedCheckout && selectedCheckout._id === id) {
        setSelectedCheckout({ ...selectedCheckout, status: newStatus });
      }
    } else {
      alert(res.error || "Failed to update status");
    }
    setUpdatingId(null);
  };

  const filteredCheckouts = checkouts.filter(c => {
    const custName = `${c.firstname || ''} ${c.lastname || ''}`.toLowerCase();
    const phone = String(c.phone || '');
    const id = (c._id || '').toLowerCase();
    const matchesSearch = custName.includes(search.toLowerCase()) || 
                          phone.includes(search) || 
                          id.includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || (c.status || "pending").toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Orders & Checkout Management</h1>
          <p className="text-sm text-slate-400 font-mono">Live customer checkouts synchronized from Supabase ({checkouts.length} records)</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadCheckouts}
            disabled={loading}
            className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-mono gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <Input
            placeholder="Search by Customer, Phone, Ref ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((st) => (
            <Button
              key={st}
              variant={statusFilter === st ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(st)}
              className={`text-xs uppercase font-mono ${statusFilter === st ? "bg-blue-600 text-white" : "border-slate-800 text-slate-400 hover:bg-slate-800"}`}
            >
              {st}
            </Button>
          ))}
        </div>
      </div>

      {/* Checkouts Table */}
      <Card className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Checkout Ref</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Contact / Phone</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Cart Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-sans">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-blue-400" />
                    Loading checkouts from Supabase...
                  </td>
                </tr>
              ) : filteredCheckouts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-sans">
                    No checkout records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredCheckouts.map((c) => {
                  const cartCount = Array.isArray(c.cartData) ? c.cartData.length : 0;
                  return (
                    <tr key={c._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 text-blue-400 font-bold truncate max-w-[120px]">{c._id}</td>
                      <td className="p-4 font-sans font-medium text-white">
                        {c.firstname} {c.lastname}
                      </td>
                      <td className="p-4">
                        <div>{c.phone}</div>
                        <div className="text-[11px] text-slate-500">{c.contact}</div>
                      </td>
                      <td className="p-4 text-slate-400">
                        {c.city}, {c.state} ({c.pin})
                      </td>
                      <td className="p-4 font-bold text-white">
                        {formatINR(Number(c.price) || 0)}
                        <span className="text-[10px] text-slate-500 block font-normal">{cartCount} items</span>
                      </td>
                      <td className="p-4">
                        <select
                          value={c.status || "pending"}
                          disabled={updatingId === c._id}
                          onChange={(e) => handleStatusChange(c._id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                        >
                          <option value="pending">PENDING</option>
                          <option value="processing">PROCESSING</option>
                          <option value="shipped">SHIPPED</option>
                          <option value="delivered">DELIVERED</option>
                          <option value="cancelled">CANCELLED</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedCheckout(c)}
                          className="h-7 px-2.5 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs gap-1"
                        >
                          <Eye className="w-3 h-3" /> View
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Checkout Detail Modal with cartData items breakdown */}
      {selectedCheckout && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Checkout Details</h2>
                <p className="text-xs text-slate-400 font-mono">Ref ID: {selectedCheckout._id}</p>
              </div>
              <button 
                onClick={() => setSelectedCheckout(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Delivery Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="space-y-1">
                <div className="text-slate-500 uppercase">Customer</div>
                <div className="text-white font-sans text-sm font-bold">
                  {selectedCheckout.firstname} {selectedCheckout.lastname}
                </div>
                <div className="text-slate-400 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-500" /> {selectedCheckout.phone}
                </div>
                <div className="text-slate-400 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-500" /> {selectedCheckout.contact || "No email"}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-500 uppercase">Shipping Address</div>
                <div className="text-slate-300">
                  {selectedCheckout.address}
                  {selectedCheckout.addressoptional ? `, ${selectedCheckout.addressoptional}` : ''}
                </div>
                <div className="text-slate-400">
                  {selectedCheckout.city}, {selectedCheckout.state} - {selectedCheckout.pin}
                </div>
                <div className="text-slate-500">{selectedCheckout.country || 'India'}</div>
              </div>
            </div>

            {/* Cart Items Breakdown */}
            <div className="space-y-3">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-400" /> Itemized Cart Data (cartData)
              </div>
              <div className="space-y-2">
                {Array.isArray(selectedCheckout.cartData) && selectedCheckout.cartData.length > 0 ? (
                  selectedCheckout.cartData.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-xs font-mono">
                      <div>
                        <div className="text-white font-medium font-sans">{item.title}</div>
                        <div className="text-slate-500 text-[10px]">
                          SKU: {item.productsku || '--'} · Cat: {item.category || '--'}
                          {item.couponcode ? ` · Coupon: ${item.couponcode}` : ''}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-white font-bold">{formatINR(Number(item.price) || 0)} × {item.quantity || 1}</div>
                        {item.originalPrice ? (
                          <div className="text-slate-600 line-through text-[10px]">{formatINR(Number(item.originalPrice))}</div>
                        ) : null}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-slate-950 rounded-xl text-center text-slate-500 text-xs font-sans">
                    No itemized cart breakdown available in this record.
                  </div>
                )}
              </div>
            </div>

            {/* Status and Total */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400 mr-2">Status:</span>
                <span className="px-2 py-0.5 rounded uppercase font-bold bg-blue-500/20 text-blue-400">
                  {selectedCheckout.status || "pending"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 mr-2">Total Amount:</span>
                <span className="text-lg font-bold text-white">{formatINR(Number(selectedCheckout.price) || 0)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
