"use client";

import { useState, useEffect } from "react";
import { Users, PhoneCall, CheckCircle2, MessageSquare, Clock, ArrowUpRight, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminLeads, updateAdminLeadStatus, AdminLeadItem } from "@/lib/admin/admin-actions";

const DEFAULT_DEMO_LEADS: AdminLeadItem[] = [
  { id: "LD-101", name: "Rameshwar Patel", company: "Patel Roadways", phone: "+91 98220 54321", email: "patel.fleet@gmail.com", source: "TMIP Enterprise Demo", vehicles: "850 Multi-Axle", status: "New", time: "10 mins ago" },
  { id: "LD-102", name: "Suresh Kumar", company: "Self-Owner", phone: "+91 97110 88990", email: "suresh.truck@yahoo.com", source: "Suraksha EMI Apply", vehicles: "1 (10-Wheeler)", status: "Contacted", time: "45 mins ago" },
  { id: "LD-103", name: "Harpreet Singh", company: "Highway Express", phone: "+91 99880 11223", email: "harpreet@highwayexpress.in", source: "30s Express Callback", vehicles: "4", status: "New", time: "2 hours ago" },
  { id: "LD-104", name: "Adani Infrastructure", company: "Adani Mining & Logistics", phone: "+91 98700 00112", email: "procurement@adani.com", source: "TMIP Enterprise Demo", vehicles: "2,400", status: "Qualified", time: "1 day ago" },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<AdminLeadItem[]>(DEFAULT_DEMO_LEADS);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await getAdminLeads();
      if (res.success && res.data && res.data.length > 0) {
        setLeads(res.data);
      }
    } catch (err) {
      console.warn("Could not fetch Supabase leads, showing fallback CRM demo leads", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: AdminLeadItem["status"], rawId?: string) => {
    // Optimistic UI update
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    try {
      await updateAdminLeadStatus(rawId || id, newStatus);
    } catch (err) {
      console.error("Failed to update status remotely:", err);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Leads & Inquiries CRM</h1>
          <p className="text-sm text-slate-400 font-mono">
            Real-time submissions from TMIP Demo, Contact Form, Suraksha Callback & Contact, and Campaigns
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchLeads}
          disabled={loading}
          className="border-slate-700 text-slate-300 hover:text-white flex items-center gap-2 self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      <Card className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Lead ID</th>
                <th className="p-4">Contact Person / Fleet</th>
                <th className="p-4">Lead Source</th>
                <th className="p-4">Details / Scale</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-amber-400 font-bold">{l.id}</td>
                  <td className="p-4 text-white font-sans font-medium">
                    <div>
                      {l.name} · <span className="text-slate-400">{l.company}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {l.phone} · {l.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge
                      className={`font-mono text-[10px] border ${
                        l.source === "TMIP Demo" || l.source.includes("TMIP")
                          ? "bg-blue-950/60 text-blue-400 border-blue-800/60"
                          : l.source === "General Contact"
                          ? "bg-orange-950/60 text-orange-400 border-orange-800/60"
                          : l.source.includes("Suraksha")
                          ? "bg-red-950/60 text-red-400 border-red-800/60"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      {l.source}
                    </Badge>
                  </td>
                  <td className="p-4 text-emerald-400 font-bold">{l.vehicles}</td>
                  <td className="p-4 text-slate-500">{l.time}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        l.status === "New"
                          ? "bg-amber-500/20 text-amber-400"
                          : l.status === "Contacted"
                          ? "bg-blue-500/20 text-blue-400"
                          : l.status === "Qualified"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1">
                      {l.status === "New" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-[10px] text-blue-400 border-blue-500/30 hover:bg-blue-500/20"
                          onClick={() => handleUpdateStatus(l.id, "Contacted", l.rawId)}
                        >
                          Mark Contacted
                        </Button>
                      )}
                      {l.status === "Contacted" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-[10px] text-purple-400 border-purple-500/30 hover:bg-purple-500/20"
                          onClick={() => handleUpdateStatus(l.id, "Qualified", l.rawId)}
                        >
                          Qualify
                        </Button>
                      )}
                      {l.status === "Qualified" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-[10px] text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                          onClick={() => handleUpdateStatus(l.id, "Closed", l.rawId)}
                        >
                          Close Deal
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
