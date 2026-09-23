"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  category: "Implementation" | "Integration" | "Escalation" | "Contract" | "Billing";
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Implementation",
    question: "How does the TMIP deployment and onboarding process work?",
    answer:
      "Upon contract execution, our enterprise deployment engineering team works with your fleet operations lead to provision organizational hierarchy, configure vehicle asset profiles, schedule gateway and sensor fitment across depots, and verify initial sub-second telemetry streams. Typical fleet onboarding ranges from 2 to 4 weeks depending on asset count.",
  },
  {
    id: "faq-2",
    category: "Implementation",
    question: "How is sensor and edge gateway fitment carried out across depot hubs?",
    answer:
      "Hardware fitment is conducted either by your certified depot maintenance teams using our standardized digital fitment tool and mechanical handbook, or assisted on-site by Treel's authorized pan-India service network. Each asset undergoes end-to-end signal calibration and pressure validation before release.",
  },
  {
    id: "faq-3",
    category: "Integration",
    question: "How do our developers obtain API credentials and webhook access?",
    answer:
      "API keys with configurable role-based access scopes are issued during technical onboarding. TMIP provides REST endpoints and bidirectional webhooks for real-time telemetry streaming, historical tyre physics logs, and threshold alert routing into your internal systems.",
  },
  {
    id: "faq-4",
    category: "Integration",
    question: "Which transport management (TMS) and ERP platforms does TMIP support?",
    answer:
      "TMIP integrates natively with enterprise platforms including SAP, Oracle, and commercial fleet management solutions like Fleetx, Locus, and LogiNext. Custom internal dispatch, maintenance ERPs, or BI dashboards (Power BI, Tableau) connect seamlessly via our open REST APIs.",
  },
  {
    id: "faq-5",
    category: "Escalation",
    question: "How are support tickets classified between Standard and Critical severity?",
    answer:
      "Critical severity applies to catastrophic service disruptions, telemetry ingestion halts, or platform-wide alert delivery failures affecting active vehicle operations. Standard severity encompasses user account administration, dashboard configuration queries, scheduled report adjustments, and routine telemetry inquiries.",
  },
  {
    id: "faq-6",
    category: "Escalation",
    question: "What is the escalation procedure if an incident exceeds target response times?",
    answer:
      "Support tickets are automatically monitored against contractual response SLAs. If an issue nears or crosses defined thresholds, automated alerts trigger escalation to senior engineering duty officers and operations directors. Enterprise tier clients also maintain direct hotline escalation to their dedicated Customer Success Manager.",
  },
  {
    id: "faq-7",
    category: "Contract",
    question: "What is covered under the Enterprise tier SLA rider?",
    answer:
      "The Enterprise tier SLA rider provides a contractually binding response commitment of within 1 hour for critical incidents, 24/7 critical coverage, dedicated Slack/Teams communication channels, and a named Customer Success Manager for quarterly business reviews and operational optimization.",
  },
  {
    id: "faq-8",
    category: "Contract",
    question: "Can we add more commercial assets or upgrade our support tier mid-contract?",
    answer:
      "Yes. Fleets can scale active vehicle licenses or upgrade support tiers (e.g., from Starter to Growth or Enterprise) at any point during the contract term. Additional hardware provisioning and ingestion quota adjustments are handled proactively by your account representative.",
  },
  {
    id: "faq-9",
    category: "Billing",
    question: "How are subscription billings, telemetry usage, and hardware invoices managed?",
    answer:
      "All invoicing, license counts, and billing statements are accessible within the customer portal under the Account & Finance section. For custom payment structures, billing cycles, or reconciliation questions, our finance desk is reachable via the general contact form with your contract reference ID.",
  },
  {
    id: "faq-10",
    category: "Implementation",
    question: "Is training provided for our fleet controllers, depot technicians, and drivers?",
    answer:
      "Yes. Deployment includes role-specific training sessions for dispatchers, maintenance supervisors, and depot staff. Modules cover dashboard navigation, thermal/pressure alert threshold interpretation, rim sensor handling, and preventative action workflows.",
  },
];

export function SupportFaqAccordion() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "faq-1": true });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-4">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = !!openIds[item.id];
        return (
          <div
            key={item.id}
            className="rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 overflow-hidden transition-colors hover:border-slate-400/20"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              className="w-full p-6 text-left flex items-start justify-between gap-4 transition-colors hover:bg-white/[0.02]"
            >
              <div className="space-y-1.5 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-jetbrains uppercase tracking-wider text-[#3B82F6] font-semibold">
                    {item.category}
                  </span>
                  <span className="text-slate-600 text-xs font-jetbrains">•</span>
                  <span className="text-slate-500 text-xs font-jetbrains">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-space-grotesk text-base sm:text-lg font-bold text-[#F1F5F9] leading-snug">
                  {item.question}
                </h3>
              </div>
              <div
                className={`w-7 h-7 rounded-[3px] bg-white/[0.04] border border-slate-400/20 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-200 mt-1 ${
                  isOpen ? "rotate-180 text-[#3B82F6] border-[#3B82F6]/40 bg-[#3B82F6]/10" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            {isOpen && (
              <div
                id={`faq-answer-${item.id}`}
                className="px-6 pb-6 pt-1 text-sm text-[#94A3B8] leading-relaxed font-ibm-plex border-t border-slate-400/5"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
