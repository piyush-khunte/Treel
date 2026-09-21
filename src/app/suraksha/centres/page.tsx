"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, Search } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import IndiaCentresMap from "@/components/suraksha/india-centres-map";
import { SURAKSHA_CENTRES, SurakshaCentre } from "@/components/suraksha/india-map-data";

export default function SurakshaCentresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCentreId, setSelectedCentreId] = useState<string | null>(null);

  // All 29 authoritative centres from client file
  const centres = SURAKSHA_CENTRES;

  const filteredCentres = centres.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtype.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "All" ||
      c.category === selectedType ||
      (selectedType === "JK Tyre Dealer" && c.subtype === "JK Tyre") ||
      (selectedType === "Truck Wheels Centre" && c.categoryCode === "TWC");

    return matchesSearch && matchesType;
  });

  const handleSelectFromMap = (centre: SurakshaCentre) => {
    setSelectedCentreId(centre.id);
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
              NEAREST CENTRE
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              करीब का <span className="italic text-[#DC2626]">Suraksha Centre</span> ढूंढिए.
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Truck Wheels centres, JK tyre dealers, और 400+ certified highway service points across India. 15-minute quick installation, instant warranty setup, and easy EMI approval.
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

      {/* Locator Controls */}
      <section className="py-10 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78350F]" />
              <input
                type="text"
                placeholder="Pincode, city, state, या highway number search करें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] font-medium text-base focus:outline-none focus:border-[#DC2626] shadow-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 items-center text-xs font-bold uppercase tracking-wider">
              {["All", "Truck Wheels Centre", "JK Tyre Dealer"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-4 py-2 rounded-[4px] transition-all cursor-pointer ${
                    selectedType === t
                      ? "bg-[#DC2626] text-white shadow-md"
                      : "bg-[#FFFBEB] text-[#78350F] border-2 border-[#451A03]/15 hover:bg-white hover:text-[#451A03]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Centres List Grid */}
      <section className="py-16 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-[#451A03]/10">
            <div>
              <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl text-[#451A03]">
                Centres Directory ({filteredCentres.length})
              </h2>
              <p className="text-xs text-[#78350F] font-bold uppercase tracking-wider mt-1">
                Showing all verified JK Steel Wheels locations
              </p>
            </div>
            {selectedCentreId && (
              <button
                onClick={() => setSelectedCentreId(null)}
                className="text-xs font-bold text-[#DC2626] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Clear Map Selection ✕
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCentres.map((c) => {
              const isSelected = selectedCentreId === c.id;
              return (
                <div
                  key={c.id}
                  id={c.id}
                  className={`bg-[#FFFBEB] rounded-lg p-6 sm:p-8 shadow-sm transition-all space-y-6 flex flex-col justify-between ${
                    isSelected
                      ? "border-2 border-[#DC2626] ring-4 ring-[#DC2626]/20 shadow-md"
                      : "border-2 border-[#451A03]/15 hover:border-[#DC2626] hover:shadow-md"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-block px-2.5 py-1 rounded-[4px] bg-[#DC2626]/10 text-[#DC2626] font-bold text-xs uppercase tracking-wider border border-[#DC2626]/20">
                        {c.category}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#78350F] bg-[#FEF3C7] px-2 py-0.5 rounded">
                        #{c.srNo}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-anton text-xl uppercase tracking-normal text-[#451A03]">{c.name}</h3>
                      <div className="text-xs font-bold text-[#EA580C] mt-1 uppercase tracking-wider">
                        {c.city}, {c.state}
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-[#78350F] font-medium">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                        <span>
                          JK Steel Wheels Centre, {c.city}, {c.state} (GPS: {c.lat.toFixed(4)}° N, {c.lng.toFixed(4)}° E)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                        <span>Toll-Free: {c.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#0891B2] shrink-0" />
                        <span>{c.hours}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {c.services.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/15 text-[10px] font-bold text-[#451A03]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-[#451A03]/10 flex items-center justify-between">
                    <Link
                      href={`tel:${c.phone}`}
                      className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1 uppercase tracking-wider"
                    >
                      Call Centre →
                    </Link>
                    <Link
                      href="/suraksha/whatsapp"
                      className="text-xs font-bold text-[#0891B2] hover:underline flex items-center gap-1 uppercase tracking-wider"
                    >
                      WhatsApp Helpline
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
