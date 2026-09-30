"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Filter
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import IndiaCentresMap from "@/components/suraksha/india-centres-map";
import { SURAKSHA_CENTRES, SurakshaCentre } from "@/components/suraksha/india-map-data";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

const ITEMS_PER_PAGE = 24;

export default function SurakshaCentresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCentreId, setSelectedCentreId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Authoritative centres list
  const centres = SURAKSHA_CENTRES;

  // Extract unique sorted states
  const uniqueStates = useMemo(() => {
    const states = Array.from(new Set(centres.map((c) => c.state))).sort();
    return ["All", ...states];
  }, [centres]);

  // Extract unique sorted cities count
  const cityCount = useMemo(() => {
    return new Set(centres.map((c) => c.city)).size;
  }, [centres]);

  // Filter centres based on search and state filter
  const filteredCentres = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return centres.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.phone.includes(q);

      const matchesState = selectedState === "All" || c.state === selectedState;

      return matchesSearch && matchesState;
    });
  }, [centres, searchQuery, selectedState]);

  // Reset page when search or state changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedState]);

  // Total pages
  const totalPages = Math.ceil(filteredCentres.length / ITEMS_PER_PAGE) || 1;

  // Current page items
  const paginatedCentres = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCentres.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCentres, currentPage]);

  // Handle centre selection from the map
  const handleSelectFromMap = (centre: SurakshaCentre) => {
    setSelectedCentreId(centre.id);
    
    // Find centre in filtered list and auto switch to its page
    const indexInFiltered = filteredCentres.findIndex((c) => c.id === centre.id);
    if (indexInFiltered !== -1) {
      const targetPage = Math.floor(indexInFiltered / ITEMS_PER_PAGE) + 1;
      setCurrentPage(targetPage);
    }

    // Smooth scroll to directory section or specific card
    setTimeout(() => {
      const element = document.getElementById(centre.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Fitment Centres" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              {centres.length} AUTHORISED FITMENT CENTRES
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              FIND YOUR <span className="italic text-[#DC2626]">NEAREST CENTRE.</span>
            </h1>
            <SurakshaRotator
              page="5.12"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-2"
            >
              आपके रूट पर, आपके पास।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Get Suraksha fitted at any of our {centres.length} authorised Truck Wheels centres across {uniqueStates.length - 1} states and {cityCount} cities. Search by city, state, or address below to find one on your route.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive India Map Section */}
      <IndiaCentresMap
        onSelectCentre={handleSelectFromMap}
        selectedCentreId={selectedCentreId}
        searchQuery={searchQuery}
      />

      {/* Locator & Filter Controls */}
      <section className="py-10 border-b-2 border-[#451A03]/10 bg-[#FEF3C7] sticky top-0 z-30 shadow-sm backdrop-blur-md bg-[#FEF3C7]/95">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78350F]" />
                <input
                  type="text"
                  placeholder="Search by centre name, city, state, address, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] font-medium text-base focus:outline-none focus:border-[#DC2626] shadow-sm transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#78350F] hover:text-[#DC2626] bg-[#FEF3C7] px-2 py-1 rounded"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* State Filter Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="relative flex items-center">
                  <Filter className="absolute left-3.5 w-4 h-4 text-[#78350F] pointer-events-none" />
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    aria-label="Filter by State or Union Territory"
                    className="pl-10 pr-8 py-3.5 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] font-bold text-sm focus:outline-none focus:border-[#DC2626] shadow-sm appearance-none cursor-pointer"
                  >
                    {uniqueStates.map((s) => (
                      <option key={s} value={s}>
                        {s === "All" ? `All States & UTs (${centres.length})` : s}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#78350F] text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Quick State Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold uppercase tracking-wider">
              <span className="text-[11px] text-[#78350F] shrink-0 font-bold">Quick Filter:</span>
              {["All", "Maharashtra", "Gujarat", "Tamil Nadu", "Rajasthan", "Uttar Pradesh", "Karnataka", "Punjab", "Haryana"].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedState(st)}
                  className={`px-3 py-1.5 rounded-[4px] transition-all whitespace-nowrap cursor-pointer text-xs ${
                    selectedState === st
                      ? "bg-[#DC2626] text-white shadow-sm"
                      : "bg-[#FFFBEB] text-[#78350F] border border-[#451A03]/15 hover:bg-white hover:text-[#451A03]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Centres List Grid */}
      <section className="py-16 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b-2 border-[#451A03]/10 gap-4">
            <div>
              <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl text-[#451A03]">
                Centres Directory ({filteredCentres.length})
              </h2>
              <p className="text-xs text-[#78350F] font-bold uppercase tracking-wider mt-1">
                Showing {filteredCentres.length === 0 ? "0" : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredCentres.length)}`} of {filteredCentres.length} matching locations
                {selectedState !== "All" && ` in ${selectedState}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {selectedCentreId && (
                <button
                  onClick={() => setSelectedCentreId(null)}
                  className="text-xs font-bold text-[#DC2626] hover:underline uppercase tracking-wider cursor-pointer bg-[#FFFBEB] px-3 py-1.5 rounded border border-[#DC2626]/30"
                >
                  Clear Selection ✕
                </button>
              )}
            </div>
          </div>

          {filteredCentres.length === 0 ? (
            <div className="bg-[#FFFBEB] rounded-xl p-12 text-center border-2 border-[#451A03]/15 space-y-4 max-w-xl mx-auto my-8">
              <Building2 className="w-12 h-12 text-[#78350F]/40 mx-auto" />
              <h3 className="font-anton text-2xl uppercase text-[#451A03]">No Centres Found</h3>
              <p className="text-[#78350F] text-sm">
                No authorised Truck Wheels centre matched your search query &ldquo;{searchQuery}&rdquo; {selectedState !== "All" && `in ${selectedState}`}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedState("All");
                }}
                className="px-6 py-2.5 bg-[#DC2626] text-white font-bold text-xs uppercase tracking-wider rounded-[4px] shadow-sm hover:bg-[#B91C1C] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {paginatedCentres.map((c) => {
                  const isSelected = selectedCentreId === c.id;
                  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`;

                  return (
                    <div
                      key={c.id}
                      id={c.id}
                      className={`bg-[#FFFBEB] rounded-lg p-6 sm:p-7 shadow-sm transition-all space-y-5 flex flex-col justify-between ${
                        isSelected
                          ? "border-2 border-[#DC2626] ring-4 ring-[#DC2626]/20 shadow-lg scale-[1.01]"
                          : "border-2 border-[#451A03]/15 hover:border-[#DC2626] hover:shadow-md"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#DC2626]/10 text-[#DC2626] font-bold text-xs uppercase tracking-wider border border-[#DC2626]/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {c.category}
                          </div>
                          <span className="text-[11px] font-mono font-bold text-[#78350F] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#451A03]/10">
                            #{c.srNo}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-anton text-xl uppercase tracking-normal text-[#451A03] leading-snug">
                            {c.name}
                          </h3>
                          <div className="text-xs font-bold text-[#EA580C] mt-1 uppercase tracking-wider">
                            {c.city}, {c.state}
                          </div>
                        </div>

                        <div className="space-y-2.5 text-xs text-[#78350F] font-medium pt-1">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{c.address}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                            <Link
                              href={`tel:${c.phone}`}
                              className="font-bold text-[#451A03] hover:text-[#DC2626] hover:underline"
                            >
                              +91 {c.phone}
                            </Link>
                          </div>

                          <div className="text-[11px] font-mono text-[#78350F]/70 pt-0.5">
                            GPS: {c.lat.toFixed(4)}° N, {c.lng.toFixed(4)}° E
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t-2 border-[#451A03]/10 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <Link
                            href={`tel:${c.phone}`}
                            className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1 uppercase tracking-wider"
                          >
                            Call Centre →
                          </Link>
                          <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-[#78350F] hover:text-[#DC2626] flex items-center gap-1 uppercase tracking-wider"
                          >
                            Directions <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <a
                          href="https://api.whatsapp.com/send/?phone=919112000174&text=Suraksha+info+chahiye&type=phone_number&app_absent=0"
                          aria-label={`Contact ${c.name} on WhatsApp Helpline`}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-[4px] bg-[#25D366] text-white hover:bg-[#1EBE5D] font-rubik font-bold text-xs uppercase tracking-wider transition-all duration-150 shadow-xs hover:shadow-sm focus-visible:outline-2 focus-visible:outline-[#25D366]"
                        >
                          <svg
                            className="w-4 h-4 fill-white shrink-0"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.953 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.15-.176.201-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.677-1.631-.928-2.233-.244-.585-.492-.505-.677-.515-.176-.01-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.43.25-.703.25-1.305.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 21.786h-.005a9.832 9.832 0 0 1-5.01-1.377l-.36-.214-3.725.976.994-3.63-.235-.374a9.858 9.858 0 0 1-1.512-5.263c0-5.446 4.435-9.879 9.886-9.879 2.639 0 5.118 1.028 6.982 2.894a9.824 9.824 0 0 1 2.891 6.985c0 5.448-4.434 9.882-9.886 9.882zm0-18.286c-4.636 0-8.406 3.768-8.406 8.404a8.38 8.38 0 0 0 1.29 4.474l.199.317-.588 2.148 2.2-.577.308.183a8.356 8.356 0 0 0 4.997 1.459h.004c4.636 0 8.406-3.769 8.406-8.405a8.344 8.344 0 0 0-2.463-5.942 8.345 8.345 0 0 0-5.947-2.461z" />
                          </svg>
                          <span>WhatsApp Helpline</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 pt-8 border-t-2 border-[#451A03]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-bold text-[#78350F] uppercase tracking-wider">
                    Page {currentPage} of {totalPages} ({filteredCentres.length} Total Centres)
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-[4px] bg-[#FFFBEB] border-2 border-[#451A03]/15 text-[#451A03] text-xs font-bold uppercase tracking-wider hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </button>

                    <div className="flex items-center gap-1 px-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => {
                          // Show current, first, last, and neighbours
                          return (
                            p === 1 ||
                            p === totalPages ||
                            Math.abs(p - currentPage) <= 1
                          );
                        })
                        .map((p, idx, arr) => {
                          const prev = arr[idx - 1];
                          const showEllipsis = prev && p - prev > 1;

                          return (
                            <React.Fragment key={p}>
                              {showEllipsis && (
                                <span className="px-1 text-xs text-[#78350F]">...</span>
                              )}
                              <button
                                onClick={() => setCurrentPage(p)}
                                className={`w-8 h-8 rounded-[4px] text-xs font-bold transition-all cursor-pointer ${
                                  currentPage === p
                                    ? "bg-[#DC2626] text-white shadow-sm"
                                    : "bg-[#FFFBEB] text-[#78350F] border border-[#451A03]/15 hover:bg-white hover:text-[#451A03]"
                                }`}
                              >
                                {p}
                              </button>
                            </React.Fragment>
                          );
                        })}
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-[4px] bg-[#FFFBEB] border-2 border-[#451A03]/15 text-[#451A03] text-xs font-bold uppercase tracking-wider hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}