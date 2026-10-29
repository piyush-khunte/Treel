"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAdminPayments } from "@/lib/admin/admin-actions";
import { MongoPayment } from "@/types/admin";
import {
  Calendar,
  Filter,
  RefreshCw,
  Search,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

const normalizePaymentAmount = (rawAmount: number | string): number => {
  const num = Number(rawAmount) || 0;
  // If stored in paise (Razorpay integer e.g. 374900 paise = ₹3,749.00), convert to rupees
  if (num >= 50000) {
    return num / 100;
  }
  return num;
};

const formatRupees = (amountInRupees: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountInRupees);
};

const formatPaymentAmount = (rawAmount: number | string): string => {
  const inRupees = normalizePaymentAmount(rawAmount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(inRupees);
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<MongoPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [datePreset, setDatePreset] = useState<string>("all");

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

  const setPreset = (preset: string) => {
    setDatePreset(preset);
    const now = new Date();
    const formatYMD = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    if (preset === "all") {
      setStartDate("");
      setEndDate("");
    } else if (preset === "today") {
      const todayStr = formatYMD(now);
      setStartDate(todayStr);
      setEndDate(todayStr);
    } else if (preset === "yesterday") {
      const y = new Date(now);
      y.setDate(y.getDate() - 1);
      const yStr = formatYMD(y);
      setStartDate(yStr);
      setEndDate(yStr);
    } else if (preset === "7days") {
      const past = new Date(now);
      past.setDate(past.getDate() - 7);
      setStartDate(formatYMD(past));
      setEndDate(formatYMD(now));
    } else if (preset === "30days") {
      const past = new Date(now);
      past.setDate(past.getDate() - 30);
      setStartDate(formatYMD(past));
      setEndDate(formatYMD(now));
    } else if (preset === "thisMonth") {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      setStartDate(formatYMD(start));
      setEndDate(formatYMD(now));
    }
  };

  const totalAmount = payments.reduce((acc, p) => acc + normalizePaymentAmount(p.amount), 0);

  const filteredPayments = payments.filter((p) => {
    // 1. Text search
    const searchLow = search.toLowerCase();
    const matchesText =
      !search ||
      (p.payment_id || "").toLowerCase().includes(searchLow) ||
      (p.order_id || "").toLowerCase().includes(searchLow) ||
      (p.customer_name || "").toLowerCase().includes(searchLow) ||
      (p.product_name || "").toLowerCase().includes(searchLow);

    if (!matchesText) return false;

    // 2. Date range filter
    const rawDate = p.createdAt || p.created_at;
    if (!startDate && !endDate) return true;
    if (!rawDate) return false;

    const pDate = new Date(rawDate);
    if (isNaN(pDate.getTime())) return false;

    if (startDate) {
      const start = new Date(startDate + "T00:00:00");
      if (pDate < start) return false;
    }

    if (endDate) {
      const end = new Date(endDate + "T23:59:59.999");
      if (pDate > end) return false;
    }

    return true;
  });

  const filteredTotalAmount = filteredPayments.reduce((acc, p) => acc + normalizePaymentAmount(p.amount), 0);
  const isFilterActive = Boolean(search || startDate || endDate);

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
          <div className="text-xs text-slate-400 font-mono">
            {isFilterActive ? "Filtered Volume" : "Total Processed Volume"}
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {formatRupees(isFilterActive ? filteredTotalAmount : totalAmount)}
          </div>
          {isFilterActive && (
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              All-time volume: {formatRupees(totalAmount)}
            </div>
          )}
        </Card>
        <Card className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-xs text-slate-400 font-mono">
            {isFilterActive ? "Filtered Transactions" : "Transaction Count"}
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {filteredPayments.length} transactions
          </div>
          {isFilterActive && (
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              All-time records: {payments.length}
            </div>
          )}
        </Card>
        <Card className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-xs text-slate-400 font-mono">Gateway Status</div>
          <div className="text-emerald-400 font-bold font-mono mt-1 flex items-center gap-1.5 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Razorpay / Online Sync
          </div>
        </Card>
      </div>

      {/* Filter & Search Bar with Date Pickers & Presets */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
        {/* Top Row: Search and Custom Date Pickers */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <Input
              placeholder="Search by Payment ID, Order ID, Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 text-xs font-mono h-10"
            />
          </div>

          {/* Date Range Inputs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 h-10">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-400 text-xs font-mono">From:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setDatePreset("custom");
                }}
                className="bg-transparent text-white text-xs font-mono focus:outline-none [color-scheme:dark] cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 h-10">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-400 text-xs font-mono">To:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setDatePreset("custom");
                }}
                className="bg-transparent text-white text-xs font-mono focus:outline-none [color-scheme:dark] cursor-pointer"
              />
            </div>

            {isFilterActive && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setDatePreset("all");
                  setSearch("");
                }}
                className="h-10 px-3 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 font-mono gap-1.5 border border-rose-500/20"
              >
                <X className="w-3.5 h-3.5" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Bottom Row: Quick Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60 text-xs font-mono">
          <span className="text-slate-500 text-[11px] uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <Filter className="w-3 h-3 text-emerald-400" /> Filter by Date:
          </span>
          {[
            { id: "all", label: "All Time" },
            { id: "today", label: "Today" },
            { id: "yesterday", label: "Yesterday" },
            { id: "7days", label: "Last 7 Days" },
            { id: "30days", label: "Last 30 Days" },
            { id: "thisMonth", label: "This Month" },
          ].map((p) => {
            const isActive =
              (p.id === "all" && !startDate && !endDate && datePreset === "all") ||
              (datePreset === p.id && (startDate || endDate || p.id === "all"));
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreset(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white font-semibold shadow-sm shadow-emerald-500/20"
                    : "bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {p.label}
              </button>
            );
          })}
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
                    <Calendar className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                    <div>No payment records match the selected date range or search query.</div>
                    {isFilterActive && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setStartDate("");
                          setEndDate("");
                          setDatePreset("all");
                          setSearch("");
                        }}
                        className="mt-3 text-xs border-slate-800 text-emerald-400 hover:bg-slate-800"
                      >
                        Reset Filters
                      </Button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 text-emerald-400 font-bold">{p.payment_id || p._id}</td>
                    <td className="p-4 text-blue-400">{p.order_id || "--"}</td>
                    <td className="p-4 text-white font-sans font-medium">{p.customer_name}</td>
                    <td className="p-4 text-slate-400 truncate max-w-[200px]">{p.product_name}</td>
                    <td className="p-4 font-bold text-white text-sm">{formatPaymentAmount(p.amount)}</td>
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
