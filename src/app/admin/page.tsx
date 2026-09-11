"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  BookOpen, 
  TrendingUp, 
  PackageCheck, 
  RefreshCw
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import { getAdminOverviewStats } from "@/lib/admin/admin-actions";
import { MongoCheckout, MongoPayment } from "@/types/admin";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrdersCount: 0,
    totalProductsCount: 0,
    totalBlogsCount: 0,
    recentCheckouts: [] as MongoCheckout[],
    recentPayments: [] as MongoPayment[]
  });

  const loadData = async () => {
    setLoading(true);
    const res = await getAdminOverviewStats();
    if (res.success && res.data) {
      setStats({
        totalRevenue: res.data.totalRevenue,
        totalOrdersCount: res.data.totalOrdersCount,
        totalProductsCount: res.data.totalProductsCount,
        totalBlogsCount: res.data.totalBlogsCount,
        recentCheckouts: res.data.recentCheckouts,
        recentPayments: res.data.recentPayments
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-10 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Operations Command Center</h1>
          <p className="text-sm text-slate-400 font-mono">Live e-commerce, catalogue & order management backed by Supabase</p>
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
            Refresh Data
          </Button>
          <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 font-mono text-xs">
            DATABASE SYNCED
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Total Revenue (Processed)</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {loading ? "..." : formatINR(stats.totalRevenue)}
          </div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3 h-3" /> Live from payments table
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Total Orders / Checkouts</span>
            <ShoppingCart className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {loading ? "..." : `${stats.totalOrdersCount} checkouts`}
          </div>
          <div className="text-xs text-blue-400 flex items-center gap-1 font-mono">
            <PackageCheck className="w-3 h-3" /> Supabase checkouts collection
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Catalogue SKUs</span>
            <Package className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {loading ? "..." : `${stats.totalProductsCount} products`}
          </div>
          <div className="text-xs text-purple-400 flex items-center gap-1 font-mono">
            <PackageCheck className="w-3 h-3" /> Active in catalogue
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Published Blogs</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {loading ? "..." : `${stats.totalBlogsCount} posts`}
          </div>
          <div className="text-xs text-cyan-400 font-mono">
            Supabase blogs collection
          </div>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Recent Customer Checkouts</h2>
            <Button asChild variant="ghost" size="sm" className="text-xs text-blue-400 hover:text-blue-300">
              <Link href="/admin/orders">View All Checkouts</Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 font-mono">
              <thead className="text-slate-500 border-b border-slate-800">
                <tr>
                  <th className="pb-3">Order Ref</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {stats.recentCheckouts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500 font-sans">
                      {loading ? "Loading checkouts..." : "No checkouts recorded yet."}
                    </td>
                  </tr>
                ) : (
                  stats.recentCheckouts.map((ord) => (
                    <tr key={ord._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 text-blue-400 font-bold truncate max-w-[120px]">{ord._id}</td>
                      <td className="py-3 text-white font-sans">{ord.firstname} {ord.lastname}</td>
                      <td className="py-3">{formatINR(Number(ord.price) || 0)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          ord.status === "processing" ? "bg-blue-500/20 text-blue-400" :
                          ord.status === "shipped" ? "bg-purple-500/20 text-purple-400" :
                          ord.status === "delivered" ? "bg-emerald-500/20 text-emerald-400" :
                          "bg-amber-500/20 text-amber-400"
                        }`}>
                          {ord.status || "pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Payments */}
        <Card className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Recent Payment Transactions</h2>
            <Button asChild variant="ghost" size="sm" className="text-xs text-emerald-400 hover:text-emerald-300">
              <Link href="/admin/payments">View All Payments</Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 font-mono">
              <thead className="text-slate-500 border-b border-slate-800">
                <tr>
                  <th className="pb-3">Payment ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {stats.recentPayments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500 font-sans">
                      {loading ? "Loading payments..." : "No payment records found."}
                    </td>
                  </tr>
                ) : (
                  stats.recentPayments.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 text-emerald-400 font-bold truncate max-w-[120px]">{p.payment_id || p._id}</td>
                      <td className="py-3 text-white font-sans">{p.customer_name}</td>
                      <td className="py-3 text-slate-400 truncate max-w-[140px]">{p.product_name}</td>
                      <td className="py-3 font-bold text-white">{formatINR(Number(p.amount) || 0)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
