"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface TeamMember {
  order: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedIn: string;
}

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    order: 1,
    name: "Mr. Imran Khan",
    role: "Head of Strategy/Finance",
    bio: "Mr. Imran Khan is an accomplished finance professional with over 23 years of experience across Finance, Accounts, Taxation, Commercial and Operations. Associated with JK Tyre & Industries Ltd. since October 2015, he brings strong expertise in financial strategy, P&L management, FP&A, business performance, financial governance and cost optimization.",
    image: "/images/leadership/imran-khan.png",
    linkedIn: "https://www.linkedin.com/in/imran-khan-82057672",
  },
  {
    order: 2,
    name: "Mrs. Pradnya Chaudhari",
    role: "Head of Design & Development",
    bio: "Leads end-to-end product architecture, design execution, and engineering strategy for Tyre Pressure Monitoring Systems (TPMS), overseeing hardware-software co-design from development to mass manufacturing and regulatory compliance. She leads R&D teams in developing next-generation sensor platforms that advance smart mobility across passenger vehicles and heavy-duty commercial fleets.",
    image: "/images/leadership/pradnya-chaudhari.jpeg",
    linkedIn: "https://www.linkedin.com/in/pradnya-chaudhari-4b737839",
  },
  {
    order: 3,
    name: "Mr. Nitin Karande",
    role: "Head of Software Engineering",
    bio: "Leads software engineering and product development at Treel, specializing in automotive IoT, TPMS, telematics, and connected-vehicle solutions. His technical expertise spans Android, MEAN Stack development, AWS, desktop applications, and microservices architecture. He drives software architecture, end-to-end product development, technical delivery, and cross-functional engineering initiatives to build scalable and reliable mobility solutions.",
    image: "/images/leadership/nitin-karande.png",
    linkedIn: "https://www.linkedin.com/in/nitin-karande-90ab837a",
  },
  {
    order: 4,
    name: "Mr. Vinod Guddeti",
    role: "Head of Purchase",
    bio: "A Procurement and Supply Chain professional with 20+ years of experience in the Electronics Industry with expertise in strategic sourcing, supplier management, procurement planning, and supply chain operations.",
    image: "/images/leadership/vinod-guddeti.png",
    linkedIn: "https://www.linkedin.com/in/vinod-guddeti-95194038",
  },
  {
    order: 5,
    name: "Mr. Mahesh Sakat",
    role: "Head of Quality",
    bio: "Automotive quality professional with over 14 years of experience in quality management system, product development, supplier quality & manufacturing quality assurance. Currently serves as Quality Manager at JK TREEL driving strategic quality initiatives, quality management systems, process improvement, supplier Quality optimization, customer satisfaction, and compliance with automotive quality standards.",
    image: "/images/leadership/mahesh-sakat.jpeg",
    linkedIn: "https://www.linkedin.com/in/mahesh-sakat-3ba62b107",
  },
  {
    order: 6,
    name: "Mr. Dattatray Dudhe",
    role: "Production Incharge",
    bio: "Lead the Production team & responsibilities of all Manufacturing activities including Process, Planning, Resources, Maintenance. Total 32 years experience in Electronic manufacturing.",
    image: "/images/leadership/dattatray-dudhe.png",
    linkedIn: "https://www.linkedin.com/in/dattatray-dudhe-525436443",
  },
  {
    order: 7,
    name: "Mr. Suresh Fale",
    role: "Senior Manager Finance & HR, Admin",
    bio: "Currently serving as Manager – Accounts, with 17 years of professional experience across accounting, finance, administration, human resources, taxation, and financial operations. Demonstrates strong expertise in financial reporting, statutory compliance, GST and TDS, audit management, and treasury operations, with a focus on strengthening financial controls, enhancing operational efficiency, and ensuring regulatory compliance.",
    image: "/images/leadership/suresh-fale.png",
    linkedIn: "https://www.linkedin.com/in/suresh-fale-69a035130",
  },
] as const;

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
      />
    </svg>
  );
}

export function LeadershipTeam() {
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});

  const toggleExpand = (order: number) => {
    setExpandedMap((prev) => ({
      ...prev,
      [order]: !prev[order],
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 justify-center">
      {TEAM_MEMBERS.map((member) => {
        const isExpanded = !!expandedMap[member.order];
        const isLongBio = member.bio.length > 180;

        return (
          <div
            key={member.order}
            className="group rounded-lg bg-[#141A22] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-black/30 w-full max-w-[340px] sm:max-w-none mx-auto"
          >
            {/* Top Portrait Container with 200–240px height */}
            <div className="relative w-full h-[220px] bg-[#1A222D] overflow-hidden">
              <Image
                src={member.image}
                alt={`Portrait of ${member.name}, ${member.role} at Treel`}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                priority={member.order <= 3}
              />
            </div>

            {/* Content Area with clear hierarchy */}
            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
              <div className="space-y-2.5">
                <div>
                  <h3 className="font-fraunces text-lg sm:text-xl font-medium text-[#FAF7F2] tracking-tight leading-snug">
                    {member.name}
                  </h3>
                  <div className="text-[11px] font-jetbrains font-mono uppercase tracking-wider text-[#D5573B] mt-1 font-semibold leading-tight">
                    {member.role}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p
                    className={`text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed font-inter transition-all ${
                      !isExpanded && isLongBio ? "line-clamp-3" : ""
                    }`}
                  >
                    {member.bio}
                  </p>
                  {isLongBio && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(member.order)}
                      className="text-[11px] font-mono font-medium text-[#D5573B] hover:text-[#FAF7F2] transition-colors focus-visible:outline-none focus-visible:underline inline-flex items-center gap-1 cursor-pointer pt-0.5"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom aligned LinkedIn Link */}
              <div className="pt-3 border-t border-white/[0.08] mt-auto flex items-center justify-between">
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${member.name}'s LinkedIn profile (opens in new tab)`}
                  className="inline-flex items-center gap-2 text-xs font-jetbrains font-mono text-[#94A3B8] hover:text-[#0077B5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5573B] rounded py-1 px-1 -ml-1 group/link"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-[#94A3B8] group-hover/link:text-[#0077B5] transition-colors shrink-0" />
                  <span className="font-medium">LinkedIn Profile</span>
                  <ArrowUpRight
                    className="w-3 h-3 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

