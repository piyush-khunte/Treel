"use client";

import { useState, useEffect } from "react";
import { 
  CreditCard, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  DollarSign, 
  Calendar 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatINR } from "@/lib/utils";
import { getAdminPayments } from "@/lib/admin/admin-actions";
import { MongoPayment } from "@/types/admin";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<MongoPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadPayments = async () => {
    setLoading(true);
    const res = await getAdminPayments();
    if (res.success && res.data) {
      setPayments(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const totalAmount = payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  const filteredPayments = payments.filter(p => {
    const searchLow = search.toLowerCase();
    return (p.payment_id || '').toLowerCase().includes(searchLow) ||
           (p.order_id || '').toLowerCase().includes(searchLow) ||
           (p.customer_name || '').toLowerCase().includes(searchLow) ||
           (p.product_name || '').toLowerCase().includes(searchLow);
  });

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Payment Transactions</h1>
          <p className="text-sm text-slate-400 font-mono">Live payment gateway records from Supabase payments table</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadPayments}
            disabled={loading}
            className="border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-mono gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Band */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-xs text-slate-400 font-mono">Total Processed Volume</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{formatINR(totalAmount)}</div>
        </Card>
        <Card className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-xs text-slate-400 font-mono">Transaction Count</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{payments.length} transactions</div>
        </Card>
        <Card className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-xs text-slate-400 font-mono">Gateway Status</div>
          <div className="text-emerald-400 font-bold font-mono mt-1 flex items-center gap-1.5 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Razorpay / Online Sync
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <Input
            placeholder="Search by Payment ID, Order ID, Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 text-xs font-mono"
          />
        </div>
      </div>

      {/* Payments Table */}
      <Card className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Payment ID</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Product Summary</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-sans">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
                    Loading payment records from Supabase...
                  </td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-sans">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 text-emerald-400 font-bold">{p.payment_id || p._id}</td>
                    <td className="p-4 text-blue-400">{p.order_id || "--"}</td>
                    <td className="p-4 text-white font-sans font-medium">{p.customer_name}</td>
                    <td className="p-4 text-slate-400 truncate max-w-[200px]">{p.product_name}</td>
                    <td className="p-4 font-bold text-white text-sm">{formatINR(Number(p.amount) || 0)}</td>
                    <td className="p-4 text-slate-500 text-[11px]">
                      {p.createdAt ? new Date(p.createdAt).toLocaleString() : (p.created_at || "--")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
