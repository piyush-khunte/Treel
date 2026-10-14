"use client";

import { WhitepaperAccessModal } from "@/components/whitepapers/whitepaper-access-modal";
import { WhitepaperRecord } from "@/types/content";
import {
Download,
FileText,
Filter,
Search
} from "lucide-react";
import Link from "next/link";
import { useMemo,useState } from "react";

interface WhitepapersClientProps {
  initialWhitepapers?: WhitepaperRecord[];
}

export function WhitepapersClient({ initialWhitepapers = [] }: WhitepapersClientProps) {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [activePaper, setActivePaper] = useState<WhitepaperRecord | null>(null);

  // Extract dynamic topics and industries
  const topics = useMemo(() => {
    const set = new Set<string>();
    initialWhitepapers.forEach((w) => {
      if (w.topic) set.add(w.topic);
    });
    return ["All", ...Array.from(set)];
  }, [initialWhitepapers]);

  const industries = useMemo(() => {
    const set = new Set<string>();
    initialWhitepapers.forEach((w) => {
      if (w.industry && w.industry !== "All") set.add(w.industry);
    });
    return ["All", ...Array.from(set)];
  }, [initialWhitepapers]);

  const filtered = useMemo(() => {
    return initialWhitepapers.filter((paper) => {
      const matchTopic = selectedTopic === "All" || paper.topic === selectedTopic;
      const matchIndustry =
        selectedIndustry === "All" || paper.industry === selectedIndustry || paper.industry === "All";
      const matchSearch =
        searchQuery.trim() === "" ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (paper.excerpt && paper.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (paper.author && paper.author.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchTopic && matchIndustry && matchSearch;
    });
  }, [initialWhitepapers, selectedTopic, selectedIndustry, searchQuery]);

  const handleOpenGate = (paper: WhitepaperRecord) => {
    setActivePaper(paper);
  };

  const handleCloseModal = () => {
    setActivePaper(null);
  };

  return (
    <div className="space-y-12">
      {/* Search & Filter Panel */}
      <div className="p-6 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-jetbrains text-[#3B82F6] uppercase tracking-wider font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Research Library</span>
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search research topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-[3px] bg-[#050A17] border border-slate-400/20 text-xs font-ibm-plex text-[#F1F5F9] placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-slate-400/10">
          {/* Topic Filter */}
          <div className="space-y-2">
            <label className="text-xs font-jetbrains text-[#94A3B8] uppercase font-semibold">Topic Category</label>
            <div className="flex flex-wrap gap-2">
              {topics.map((top) => (
                <button
                  key={top}
                  onClick={() => setSelectedTopic(top)}
                  className={`px-3 py-1 rounded-[2px] text-xs font-jetbrains transition-all cursor-pointer ${
                    selectedTopic === top
                      ? "bg-[#3B82F6] text-white font-medium shadow-sm"
                      : "bg-white/[0.03] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] border border-slate-400/10"
                  }`}
                >
                  {top}
                </button>
              ))}
            </div>
          </div>

          {/* Industry Filter */}
          <div className="space-y-2">
            <label className="text-xs font-jetbrains text-[#94A3B8] uppercase font-semibold">Industry Lens</label>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3 py-1 rounded-[2px] text-xs font-jetbrains transition-all cursor-pointer ${
                    selectedIndustry === ind
                      ? "bg-[#3B82F6] text-white font-medium shadow-sm"
                      : "bg-white/[0.03] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] border border-slate-400/10"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Whitepaper Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((paper) => {
          const isPdf = paper.fileFormat?.toUpperCase() === "PDF";
          return (
            <div
              key={paper._id}
              className={`p-8 rounded-[4px] bg-[#0B1220]/80 border flex flex-col justify-between space-y-6 transition-all hover:border-blue-500/30 ${
                paper.isFeatured ? "border-slate-400/20 shadow-lg" : "border-slate-400/10"
              }`}
            >
              <div className="space-y-4">
                {/* Graphical Card Cover Bar */}
                <div className="h-36 rounded-[3px] bg-[#050A17] border border-slate-400/10 p-5 flex flex-col justify-between relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 rounded-[2px] text-[10px] font-jetbrains text-blue-400 uppercase font-semibold">
                      {paper.topic}
                    </span>
                    <span className="text-[10px] font-jetbrains text-[#94A3B8]">
                      {paper.length || "Research Report"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8]">
                      <FileText className="w-4 h-4 text-[#3B82F6]" />
                      <span>TREEL RESEARCH REPORT</span>
                    </div>
                    <span
                      className={`text-[10px] font-jetbrains px-1.5 py-0.5 rounded uppercase font-semibold ${
                        isPdf
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      }`}
                    >
                      {paper.fileFormat || "PDF"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8]">
                    <span>{paper.publishDate || "2026"}</span>
                    <span>·</span>
                    <span className="text-[#3B82F6]">{paper.industry || "General"}</span>
                  </div>
                  <h3 className="font-space-grotesk text-lg font-bold text-[#F1F5F9] leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-ibm-plex leading-relaxed line-clamp-3">
                    {paper.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-400/10 flex items-center justify-between">
                <span className="text-xs font-jetbrains text-[#94A3B8]">
                  {paper.fileSizeFormatted ? `${paper.fileSizeFormatted} · ` : ""}{paper.fileFormat || "PDF"}
                </span>

                <div className="flex items-center gap-3">
                  {paper.directUrl && (
                    <Link
                      href={paper.directUrl}
                      className="text-xs font-jetbrains text-slate-400 hover:text-white transition-colors"
                    >
                      Synopsis
                    </Link>
                  )}
                  <button
                    onClick={() => handleOpenGate(paper)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-jetbrains font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Access Paper</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 space-y-4">
          <p className="text-sm font-jetbrains text-[#94A3B8]">No research papers match your selected filters.</p>
          <button
            onClick={() => {
              setSelectedTopic("All");
              setSelectedIndustry("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-[3px] bg-[#3B82F6] text-white text-xs font-jetbrains font-semibold hover:bg-[#2563EB] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* REDESIGNED COMPACT ACCESSIBLE GATED MODAL */}
      {activePaper && (
        <WhitepaperAccessModal
          paper={activePaper}
          onClose={handleCloseModal}
          accentColor="blue"
        />
      )}
    </div>
  );
}
