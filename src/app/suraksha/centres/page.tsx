"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import IndiaCentresMap from "@/components/suraksha/india-centres-map";
import { SURAKSHA_CENTRES, SurakshaCentre } from "@/components/suraksha/india-map-data";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

export default function SurakshaCentresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCentreId, setSelectedCentreId] = useState<string | null>(null);

  // All 29 authoritative centres from client file
  const centres = SURAKSHA_CENTRES;

  const filteredCentres = centres.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.subtype.toLowerCase().includes(q);

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
              Get Suraksha fitted at Truck Wheels centres, authorised dealers and select puncture shops across India. Search by pincode or city below to find one on your route.
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
      <section className="py-10 border-b-2 border-[#451A03]/10 bg-[#FEF3C7] sticky top-0 z-30 shadow-sm backdrop-blur-md bg-[#FEF3C7]/95">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78350F]" />
              <input
                type="text"
                placeholder="Search by pincode, city, state, or highway number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] font-medium text-base focus:outline-none focus:border-[#DC2626] shadow-sm transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#78350F] hover:text-[#DC2626] bg-[#FEF3C7] px-2 py-1 rounded cursor-pointer"
                >
                  CLEAR
                </button>
              )}
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
                className="text-xs font-bold text-[#DC2626] hover:underline uppercase tracking-wider cursor-pointer bg-[#FFFBEB] px-3 py-1.5 rounded border border-[#DC2626]/30"
              >
                Clear Map Selection ✕
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCentres.map((c) => {
              const isSelected = selectedCentreId === c.id;
              const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`;

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
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#DC2626]/10 text-[#DC2626] font-bold text-xs uppercase tracking-wider border border-[#DC2626]/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {c.category}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#78350F] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#451A03]/10">
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
                        <Link
                          href={`tel:${c.phone}`}
                          className="font-bold text-[#451A03] hover:text-[#DC2626] hover:underline"
                        >
                          Toll-Free: {c.phone}
                        </Link>
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
        </div>
      </section>
    </div>
  );
}