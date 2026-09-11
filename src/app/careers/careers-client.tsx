"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, ChevronRight, ArrowRight } from "lucide-react";

interface Role {
  id: string;
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  excerpt: string;
}

export function CareersInteractiveRoster() {
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const roles: Role[] = [
    {
      id: "role-1",
      slug: "senior-embedded-engineer",
      title: "Senior Embedded Firmware Engineer",
      team: "Engineering",
      location: "Pune",
      type: "Full-time",
      excerpt: "Design and optimize ultra-low-power BLE firmware and RF telemetry sensor protocols for extreme automotive conditions."
    },
    {
      id: "role-2",
      slug: "staff-backend-engineer",
      title: "Staff Backend Engineer (IoT & Distributed Systems)",
      team: "Engineering",
      location: "Pune",
      type: "Full-time",
      excerpt: "Architect high-throughput sub-second telemetry ingestion pipelines and Vehicle Digital Twin state engines handling 68K+ connected trucks."
    },
    {
      id: "role-3",
      slug: "product-manager-insights",
      title: "Product Manager — Telemetry & Insights",
      team: "Product",
      location: "Hybrid",
      type: "Full-time",
      excerpt: "Own the core fleet analytics features, predictive maintenance models, and customer-facing dashboard interfaces for TMIP Enterprise."
    },
    {
      id: "role-4",
      slug: "enterprise-solutions-architect",
      title: "Enterprise Solutions Architect (TMIP)",
      team: "GTM",
      location: "Pune",
      type: "Full-time",
      excerpt: "Partner with enterprise fleet technical buyers, lead 14-day pilots, and deliver TMS custom API integrations across logistics corridors."
    }
  ];

  const filteredRoles = useMemo(() => {
    return roles.filter((r) => {
      const matchTeam = selectedTeam === "All" || r.team === selectedTeam;
      const matchLoc = selectedLocation === "All" || r.location === selectedLocation;
      const matchSearch = searchQuery.trim() === "" || 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTeam && matchLoc && matchSearch;
    });
  }, [roles, selectedTeam, selectedLocation, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-white/[0.03] border border-white/10 p-4 rounded-xl">
        {/* Search box */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search roles by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/[0.04] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/50 text-xs sm:text-sm outline-none focus:border-[#D5573B] transition-all"
          />
        </div>

        {/* Team filter dropdown */}
        <div className="sm:col-span-3">
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#182234] border border-white/15 text-[#FAF7F2] text-xs sm:text-sm outline-none focus:border-[#D5573B] transition-all cursor-pointer"
          >
            <option value="All">All Teams</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
            <option value="GTM">GTM</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        {/* Location filter dropdown */}
        <div className="sm:col-span-3">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#182234] border border-white/15 text-[#FAF7F2] text-xs sm:text-sm outline-none focus:border-[#D5573B] transition-all cursor-pointer"
          >
            <option value="All">All Locations</option>
            <option value="Pune">Pune</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      </div>

      {/* Role Cards List */}
      {filteredRoles.length > 0 ? (
        <div className="space-y-4">
          {filteredRoles.map((role) => (
            <Link
              key={role.id}
              href={`/careers/${role.slug}`}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/40 transition-all group block shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/20 text-[#D5573B] text-[11px] font-mono font-semibold uppercase">
                      {role.team}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {role.location}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> {role.type}
                    </span>
                  </div>
                  <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl font-inter">
                    {role.excerpt}
                  </p>
                </div>

                <div className="sm:self-center shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D5573B] group-hover:translate-x-1 transition-transform">
                    View role <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-10 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-4">
          <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2]">
            No roles match that filter right now.
          </h3>
          <p className="text-sm text-[#94A3B8] max-w-md mx-auto">
            We hire continuously. If you don&apos;t see the right role, drop us a note and tell us what you would build here.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D5573B] text-[#FAF7F2] font-semibold text-xs hover:bg-[#CB4831] transition-all shadow-md"
            >
              Contact us <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
