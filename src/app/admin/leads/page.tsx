"use client";

import { useState } from "react";
import { Users, PhoneCall, CheckCircle2, MessageSquare, Clock, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LeadItem {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  source: "TMIP Enterprise Demo" | "Suraksha EMI Apply" | "30s Express Callback" | "General Inquiry";
  vehicles: string;
  status: "New" | "Contacted" | "Qualified" | "Closed";
  time: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([
    { id: "LD-101", name: "Rameshwar Patel", company: "Patel Roadways", phone: "+91 98220 54321", email: "patel.fleet@gmail.com", source: "TMIP Enterprise Demo", vehicles: "850 Multi-Axle", status: "New", time: "10 mins ago" },
    { id: "LD-102", name: "Suresh Kumar", company: "Self-Owner", phone: "+91 97110 88990", email: "suresh.truck@yahoo.com", source: "Suraksha EMI Apply", vehicles: "1 (10-Wheeler)", status: "Contacted", time: "45 mins ago" },
    { id: "LD-103", name: "Harpreet Singh", company: "Highway Express", phone: "+91 99880 11223", email: "harpreet@highwayexpress.in", source: "30s Express Callback", vehicles: "4", status: "New", time: "2 hours ago" },
    { id: "LD-104", name: "Adani Infrastructure", company: "Adani Mining & Logistics", phone: "+91 98700 00112", email: "procurement@adani.com", source: "TMIP Enterprise Demo", vehicles: "2,400", status: "Qualified", time: "1 day ago" },
  ]);

  const updateLeadStatus = (id: string, newStatus: LeadItem["status"]) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Leads & Inquiries CRM</h1>
        <p className="text-sm text-slate-400 font-mono">Real-time submissions from TMIP demo wizard, Suraksha EMI applications, and 30s callbacks</p>
      </div>

      <Card className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Lead ID</th>
                <th className="p-4">Contact Person / Fleet</th>
                <th className="p-4">Lead Source</th>
                <th className="p-4">Fleet Scale</th>
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
                    <div>{l.name} · <span className="text-slate-400">{l.company}</span></div>
                    <div className="text-[11px] text-slate-500 font-mono">{l.phone} · {l.email}</div>
                  </td>
                  <td className="p-4">
                    <Badge className="bg-slate-800 text-slate-300 border-slate-700 font-mono text-[10px]">
                      {l.source}
                    </Badge>
                  </td>
                  <td className="p-4 text-emerald-400 font-bold">{l.vehicles}</td>
                  <td className="p-4 text-slate-500">{l.time}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      l.status === "New" ? "bg-amber-500/20 text-amber-400" :
                      l.status === "Contacted" ? "bg-blue-500/20 text-blue-400" :
                      l.status === "Qualified" ? "bg-purple-500/20 text-purple-400" :
                      "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1">
                      {l.status === "New" && (
                        <Button size="sm" variant="outline" className="h-7 text-[10px] text-blue-400 border-blue-500/30 hover:bg-blue-500/20" onClick={() => updateLeadStatus(l.id, "Contacted")}>
                          Mark Contacted
                        </Button>
                      )}
                      {l.status === "Contacted" && (
                        <Button size="sm" variant="outline" className="h-7 text-[10px] text-purple-400 border-purple-500/30 hover:bg-purple-500/20" onClick={() => updateLeadStatus(l.id, "Qualified")}>
                          Qualify
                        </Button>
                      )}
                      {l.status === "Qualified" && (
                        <Button size="sm" variant="outline" className="h-7 text-[10px] text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20" onClick={() => updateLeadStatus(l.id, "Closed")}>
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
