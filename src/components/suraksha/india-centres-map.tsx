"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  Phone,
  ShieldCheck,
  Layers,
  ChevronRight,
  Info
} from "lucide-react";
import {
  SURAKSHA_CENTRES,
  CENTRE_CLUSTERS,
  INDIA_MAP_VIEWBOX,
  INDIA_STATES_PATHS,
  SurakshaCentre,
  CentreCluster
} from "./india-map-data";

interface IndiaCentresMapProps {
  onSelectCentre?: (centre: SurakshaCentre) => void;
  selectedCentreId?: string | null;
  searchQuery?: string;
}

export default function IndiaCentresMap({
  onSelectCentre,
  selectedCentreId,
  searchQuery = ""
}: IndiaCentresMapProps) {
  const [selectedClusterId, setSelectedClusterId] = useState<string>(CENTRE_CLUSTERS[0]?.id || "");
  const [activeCentreIndex, setActiveCentreIndex] = useState<number>(0);
  const [hoveredClusterId, setHoveredClusterId] = useState<string | null>(null);
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>("All");

  // Sync selectedCentreId if provided from outside
  useEffect(() => {
    if (selectedCentreId) {
      const cluster = CENTRE_CLUSTERS.find((cl) =>
        cl.centres.some((c) => c.id === selectedCentreId)
      );
      if (cluster) {
        setSelectedClusterId(cluster.id);
        const idx = cluster.centres.findIndex((c) => c.id === selectedCentreId);
        if (idx >= 0) setActiveCentreIndex(idx);
      }
    }
  }, [selectedCentreId]);

  const currentCluster = useMemo(() => {
    return CENTRE_CLUSTERS.find((c) => c.id === selectedClusterId) || CENTRE_CLUSTERS[0];
  }, [selectedClusterId]);

  const activeCentre: SurakshaCentre = useMemo(() => {
    if (!currentCluster || !currentCluster.centres.length) {
      return SURAKSHA_CENTRES[0];
    }
    return currentCluster.centres[activeCentreIndex] || currentCluster.centres[0];
  }, [currentCluster, activeCentreIndex]);

  const stateList = useMemo(() => {
    const states = Array.from(new Set(SURAKSHA_CENTRES.map((c) => c.state))).sort();
    return ["All", ...states];
  }, []);

  const filteredClusters = useMemo(() => {
    return CENTRE_CLUSTERS.filter((cluster) => {
      const matchesState =
        selectedStateFilter === "All" || cluster.state.toLowerCase() === selectedStateFilter.toLowerCase();

      const matchesSearch =
        !searchQuery ||
        cluster.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cluster.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cluster.centres.some(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.city.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesState && matchesSearch;
    });
  }, [selectedStateFilter, searchQuery]);

  const handleClusterClick = (cluster: CentreCluster) => {
    setSelectedClusterId(cluster.id);
    setActiveCentreIndex(0);
    if (onSelectCentre && cluster.centres.length > 0) {
      onSelectCentre(cluster.centres[0]);
    }
  };

  const scrollToCentreCard = (centreId: string) => {
    const element = document.getElementById(centreId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="py-12 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5" />
              NATIONWIDE FITMENT NETWORK
            </div>
            <h2 className="font-anton uppercase tracking-normal text-3xl sm:text-4xl text-[#451A03] leading-[1.1]">
              India Network Map — <span className="text-[#DC2626]">{SURAKSHA_CENTRES.length} Authorized Centres</span>
            </h2>
            <p className="text-[#78350F] text-sm sm:text-base font-rubik font-medium mt-2 max-w-2xl">
              Map of India showing all {SURAKSHA_CENTRES.length} official JK Truck Wheels Centres with calibrated GPS coordinates. Click any pin or cluster to view location specifications and contact details.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#FEF3C7] border-2 border-[#451A03]/15 rounded-lg p-3 self-start md:self-auto shrink-0 shadow-sm">
            <div className="text-center px-2">
              <div className="font-anton text-2xl text-[#DC2626]">{SURAKSHA_CENTRES.length}</div>
              <div className="text-[10px] uppercase font-bold text-[#78350F] tracking-wider">Centres</div>
            </div>
            <div className="h-8 w-[1px] bg-[#451A03]/20" />
            <div className="text-center px-2">
              <div className="font-anton text-2xl text-[#451A03]">{stateList.length - 1}</div>
              <div className="text-[10px] uppercase font-bold text-[#78350F] tracking-wider">States / UTs</div>
            </div>
            <div className="h-8 w-[1px] bg-[#451A03]/20" />
            <div className="text-center px-2">
              <div className="font-anton text-2xl text-[#0891B2]">100%</div>
              <div className="text-[10px] uppercase font-bold text-[#78350F] tracking-wider">Corridors</div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#78350F] mr-1">Filter by State:</span>
          {stateList.map((st) => {
            const count =
              st === "All"
                ? SURAKSHA_CENTRES.length
                : SURAKSHA_CENTRES.filter((c) => c.state.toLowerCase() === st.toLowerCase()).length;
            const isSelected = selectedStateFilter.toLowerCase() === st.toLowerCase();

            return (
              <button
                key={st}
                onClick={() => setSelectedStateFilter(st)}
                className={`px-3 py-1 rounded-[4px] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#DC2626] text-white shadow-sm"
                    : "bg-[#FEF3C7] text-[#78350F] border border-[#451A03]/15 hover:bg-white hover:text-[#451A03]"
                }`}
              >
                <span>{st}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#451A03]/10 text-[#451A03]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-[#FEF3C7] border-2 border-[#451A03]/20 rounded-xl p-4 sm:p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#451A03]/10 pb-3 mb-4 text-xs font-bold uppercase tracking-wider text-[#78350F]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] inline-block" />
                <span>India National Freight Map</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#DC2626] border border-white" />
                  Single Centre
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#EA580C] text-white text-[9px] flex items-center justify-center font-bold border border-white">
                    3
                  </span>
                  Cluster Hub
                </span>
              </div>
            </div>

            <div className="relative w-full aspect-[612/696] max-h-[640px] mx-auto select-none">
              <svg
                viewBox={INDIA_MAP_VIEWBOX}
                className="w-full h-full drop-shadow-sm transition-all"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g className="india-states-layer">
                  {INDIA_STATES_PATHS.map((st) => (
                    <path
                      key={st.id}
                      d={st.path}
                      id={st.id}
                      className="fill-[#FFFBEB] stroke-[#451A03]/25 stroke-[0.8] hover:fill-[#FDE68A] hover:stroke-[#DC2626]/50 transition-colors cursor-default"
                    >
                      <title>{st.name}</title>
                    </path>
                  ))}
                </g>

                <g className="centres-pins-layer">
                  {filteredClusters.map((cluster) => {
                    const isSelected = cluster.id === currentCluster?.id;
                    const isHovered = cluster.id === hoveredClusterId;
                    const hasMultiple = cluster.centres.length > 1;

                    return (
                      <g
                        key={cluster.id}
                        transform={`translate(${cluster.x}, ${cluster.y})`}
                        className="cursor-pointer transition-transform duration-200"
                        onClick={() => handleClusterClick(cluster)}
                        onMouseEnter={() => setHoveredClusterId(cluster.id)}
                        onMouseLeave={() => setHoveredClusterId(null)}
                      >
                        {(isSelected || hasMultiple) && (
                          <circle
                            r={isSelected ? 16 : 12}
                            className={`fill-none stroke-[2] ${
                              isSelected ? "stroke-[#DC2626] opacity-75" : "stroke-[#EA580C] opacity-40"
                            }`}
                          />
                        )}

                        <circle
                          r={isSelected ? 14 : hasMultiple ? 11 : 9}
                          className={`transition-all ${
                            isSelected
                              ? "fill-[#DC2626] stroke-white stroke-[2.5] shadow-lg"
                              : hasMultiple
                              ? "fill-[#EA580C] stroke-white stroke-[2]"
                              : "fill-[#DC2626] stroke-white stroke-[1.5] hover:fill-[#B91C1C]"
                          }`}
                        />

                        {hasMultiple ? (
                          <text
                            y="3.5"
                            textAnchor="middle"
                            className="fill-white font-anton text-[10px] font-bold pointer-events-none select-none"
                          >
                            {cluster.centres.length}
                          </text>
                        ) : (
                          <circle r={2.5} className="fill-white pointer-events-none" />
                        )}

                        {(isHovered || isSelected) && (
                          <g transform="translate(0, -20)" className="pointer-events-none">
                            <rect
                              x={-(cluster.city.length * 4.2 + 16)}
                              y="-16"
                              width={(cluster.city.length * 4.2 + 16) * 2}
                              height="22"
                              rx="4"
                              className="fill-[#451A03] opacity-95 stroke-[#DC2626] stroke-[1]"
                            />
                            <text
                              y="-2"
                              textAnchor="middle"
                              className="fill-white font-rubik text-[10px] font-bold tracking-wider uppercase select-none"
                            >
                              {cluster.city} {hasMultiple ? `(${cluster.centres.length})` : ""}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-[#78350F] font-medium border-t border-[#451A03]/10 pt-2">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#0891B2]" />
                All {SURAKSHA_CENTRES.length} coordinates loaded directly from JK Truck Wheels Centre network directory.
              </span>
              <span className="font-bold text-[#451A03]">Source: Authoritative Centre List</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#FFFBEB] border-2 border-[#DC2626] rounded-xl p-6 sm:p-7 shadow-lg space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#DC2626]/10 text-[#DC2626] font-bold text-xs uppercase tracking-wider border border-[#DC2626]/25">
                  <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                  <span>TRUCK WHEELS CENTRE</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-[#EA580C]/10 text-[#EA580C] font-bold text-xs uppercase tracking-wider">
                  <span>Record #{activeCentre.srNo}</span>
                </div>
              </div>

              <div>
                <h3 className="font-anton text-2xl sm:text-3xl text-[#451A03] uppercase tracking-normal leading-tight">
                  {activeCentre.name}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-sm font-bold text-[#EA580C] uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#DC2626] shrink-0" />
                  <span>
                    {activeCentre.city}, {activeCentre.state}
                  </span>
                </div>
              </div>

              {currentCluster.centres.length > 1 && (
                <div className="bg-[#FEF3C7] border border-[#451A03]/15 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#451A03] uppercase tracking-wider">
                    <span>Multiple Centres in {currentCluster.city}:</span>
                    <span className="text-[#DC2626] font-extrabold">{currentCluster.centres.length} Locations</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentCluster.centres.map((c, idx) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setActiveCentreIndex(idx);
                          if (onSelectCentre) onSelectCentre(c);
                        }}
                        className={`px-3 py-1.5 rounded-[4px] text-xs font-bold transition-all cursor-pointer ${
                          idx === activeCentreIndex
                            ? "bg-[#DC2626] text-white shadow-sm"
                            : "bg-[#FFFBEB] text-[#78350F] border border-[#451A03]/15 hover:bg-white"
                        }`}
                      >
                        #{c.srNo} {c.name.length > 20 ? c.name.slice(0, 18) + "…" : c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3 text-xs text-[#78350F] font-medium bg-[#FEF3C7]/40 p-3.5 rounded-lg border border-[#451A03]/10">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-[#451A03]">
                    {activeCentre.address}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                  <span className="font-bold text-[#451A03]">
                    Phone:{" "}
                    <a href={`tel:${activeCentre.phone}`} className="text-[#DC2626] hover:underline font-mono">
                      {activeCentre.phone}
                    </a>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                <div className="bg-[#FEF3C7]/60 border border-[#451A03]/10 rounded-lg p-3">
                  <div className="text-[10px] uppercase font-bold text-[#78350F] tracking-wider">Latitude</div>
                  <div className="font-mono font-bold text-[#451A03] text-sm mt-0.5">
                    {activeCentre.lat.toFixed(6)}° N
                  </div>
                </div>
                <div className="bg-[#FEF3C7]/60 border border-[#451A03]/10 rounded-lg p-3">
                  <div className="text-[10px] uppercase font-bold text-[#78350F] tracking-wider">Longitude</div>
                  <div className="font-mono font-bold text-[#451A03] text-sm mt-0.5">
                    {activeCentre.lng.toFixed(6)}° E
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#451A03]/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${activeCentre.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#DC2626] text-white font-anton uppercase text-sm tracking-wider rounded-[4px] hover:bg-[#B91C1C] transition-colors shadow-sm text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Centre</span>
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=919112000174&text=Suraksha+info+chahiye&type=phone_number&app_absent=0"
                  aria-label="WhatsApp Helpline"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] text-white font-anton uppercase text-sm tracking-wider rounded-[4px] hover:bg-[#1EBE5D] transition-colors shadow-sm text-center focus-visible:outline-2 focus-visible:outline-[#25D366]"
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

              <button
                onClick={() => scrollToCentreCard(activeCentre.id)}
                className="w-full text-center text-xs font-bold text-[#78350F] hover:text-[#DC2626] underline uppercase tracking-wider pt-1 cursor-pointer flex items-center justify-center gap-1"
              >
                <span>View Centre Details in Table Below</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-[#FEF3C7] border-2 border-[#451A03]/15 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#451A03]">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#DC2626]" />
                  Active Corridor Centres ({filteredClusters.reduce((acc, c) => acc + c.centres.length, 0)})
                </span>
                <span className="text-[#0891B2] text-[11px]">Click to inspect</span>
              </div>
              <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-1 text-xs">
                {filteredClusters.map((cl) => {
                  const isCurrent = cl.id === currentCluster.id;
                  return (
                    <button
                      key={cl.id}
                      onClick={() => handleClusterClick(cl)}
                      className={`w-full text-left px-3 py-2 rounded-[4px] flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-[#DC2626] text-white font-bold shadow-sm"
                          : "bg-[#FFFBEB] text-[#451A03] hover:bg-white border border-[#451A03]/10"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${isCurrent ? "text-white" : "text-[#DC2626]"}`} />
                        <span>
                          {cl.city}, {cl.state}
                        </span>
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          isCurrent ? "bg-white/20 text-white" : "bg-[#FEF3C7] text-[#78350F]"
                        }`}
                      >
                        {cl.centres.length} {cl.centres.length > 1 ? "Centres" : "Centre"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
