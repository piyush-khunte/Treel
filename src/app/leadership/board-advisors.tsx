"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Building2, ChevronDown } from "lucide-react";
import { type BoardMember, BOARD_MEMBERS } from "@/lib/data/leadership";

export { type BoardMember, BOARD_MEMBERS };

export function BoardAdvisors() {
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});

  const toggleExpand = (order: number) => {
    setExpandedMap((prev) => ({
      ...prev,
      [order]: !prev[order],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {BOARD_MEMBERS.map((member) => {
        const isExpanded = !!expandedMap[member.order];
        const hasMultipleParagraphs = member.paragraphs.length > 1;

        return (
          <div
            key={member.order}
            className="group rounded-lg bg-[#141A22] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-black/30 w-full max-w-[360px] sm:max-w-none mx-auto"
          >
            {/* Top Portrait Container with subtle gradient backdrop */}
            <div className="relative w-full h-[230px] bg-gradient-to-b from-[#1C2430] via-[#161D26] to-[#141A22] overflow-hidden flex items-end justify-center pt-4">
              <div
                className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle at 50% 60%, rgba(213, 87, 59, 0.16) 0%, transparent 65%)",
                }}
                aria-hidden="true"
              />
              <div className="relative w-[190px] h-[215px]">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}, ${member.role} at ${member.organization}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                  className="object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.03]"
                  priority
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#141A22] to-transparent pointer-events-none" />
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              <div className="space-y-4">
                {/* Organization & Title */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono tracking-wider bg-[#D5573B]/10 text-[#D5573B] border border-[#D5573B]/20 font-semibold uppercase">
                    <Building2 className="w-3 h-3 shrink-0" />
                    <span>{member.organization}</span>
                  </div>

                  <div>
                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] tracking-tight leading-snug">
                      {member.name}
                    </h3>
                    <div className="text-xs font-jetbrains font-mono uppercase tracking-wider text-[#D5573B] mt-1 font-semibold leading-tight">
                      {member.role}
                    </div>
                  </div>
                </div>

                {/* Verbatim Headline Quote from official JK Tyre website */}
                <blockquote className="relative pl-3.5 border-l-2 border-[#D5573B] text-xs sm:text-[13px] italic text-[#FAF7F2]/90 leading-relaxed font-inter bg-white/[0.02] py-2.5 px-3 rounded-r">
                  &ldquo;{member.headline}&rdquo;
                </blockquote>

                {/* Bio text (expandable for full multi-paragraph depth) */}
                <div className="space-y-3">
                  {!isExpanded ? (
                    <p className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed font-inter">
                      {member.paragraphs[0]}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {member.paragraphs.map((para, idx) => (
                        <p
                          key={idx}
                          className="text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed font-inter"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {hasMultipleParagraphs && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(member.order)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#D5573B] hover:text-[#FAF7F2] transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer pt-1"
                      aria-expanded={isExpanded}
                    >
                      <span>
                        {isExpanded ? "Show overview" : "Read full profile"}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Attribution Footer */}
              <div className="pt-3 border-t border-white/[0.08] mt-auto flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span>JK Tyre Corporate Leadership</span>
                <span className="text-[#94A3B8]">Management</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

