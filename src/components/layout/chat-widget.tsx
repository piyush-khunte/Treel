"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isTmip = pathname.startsWith("/tmip");

  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "Hello! I am Magic Flow AI, Treel's mobility assistant. Are you looking for Enterprise Fleet Telemetry (TMIP), Commercial Truck Safety (Suraksha), or Personal TPMS?"
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputText("");

    setTimeout(() => {
      let reply = "Thank you for contacting Treel. Our mobility experts are available 24/7. Would you like to schedule a TMIP enterprise demo or speak with a Suraksha truck safety specialist?";
      const lower = userMsg.toLowerCase();
      if (lower.includes("truck") || lower.includes("suraksha") || lower.includes("blowout")) {
        reply = "Suraksha Commercial Kit prevents front-tyre blowouts and pays for itself within 9 months. You can apply for zero-downpayment EMI at /suraksha/emi or call our toll-free support.";
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("buy")) {
        reply = "Personal TPMS starts at ₹2,199 (2-Wheeler) and ₹4,499 (4-Wheeler Internal Kit). You can purchase online directly at /personal/buy with fast free shipping!";
      } else if (lower.includes("fleet") || lower.includes("tmip") || lower.includes("demo")) {
        reply = "TMIP Enterprise Platform offers real-time Vehicle Digital Twin telemetry for commercial fleets. You can book an interactive demo at /tmip/demo.";
      }
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 pointer-events-none">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 flex justify-end">
        <div className="pointer-events-auto">
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className={`group flex items-center gap-2.5 p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                isTmip
                  ? "bg-[#0A0F1A] text-[#00E5FF] hover:bg-[#121B2E] border border-[#00E5FF]/40"
                  : "bg-[#0F1419] text-[#FAF7F2] hover:bg-[#1A2330] border border-[#00B37E]/50 hover:border-[#00B37E]"
              }`}
              aria-label="Open AI assistant"
            >
              <div className="relative">
                <Bot className={`w-5 h-5 ${isTmip ? "text-[#00E5FF]" : "text-[#00B37E]"}`} />
                <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping ${isTmip ? "bg-[#00E5FF]" : "bg-[#00B37E]"}`} />
                <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${isTmip ? "bg-[#00E5FF]" : "bg-[#00B37E]"}`} />
              </div>
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">
                Chat with Treel AI
              </span>
            </button>
          )}

          {isOpen && (
            <div className="w-[350px] sm:w-[390px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Chat Header */}
              <div className={`p-4 flex items-center justify-between ${
                isTmip
                  ? "bg-[#0A0F1A] text-[#00E5FF] border-b border-[#00E5FF]/20"
                  : "bg-[#0F1419] text-[#FAF7F2] border-b border-white/10"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    isTmip ? "bg-[#00E5FF]/20 text-[#00E5FF]" : "bg-[#00B37E]/20 text-[#00B37E]"
                  }`}>
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-1.5">
                      Magic Flow AI <Sparkles className={`w-3.5 h-3.5 ${isTmip ? "text-[#00E5FF]" : "text-[#00B37E]"}`} />
                    </div>
                    <div className="text-[11px] text-slate-300 flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${isTmip ? "bg-[#00E5FF]" : "bg-[#00B37E]"}`} /> Online · Treel Assistant
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF7F2]/60 text-xs">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed ${
                        m.sender === "user"
                          ? isTmip
                            ? "bg-[#0A0F1A] text-white rounded-br-none shadow-sm"
                            : "bg-[#00B37E] text-white rounded-br-none shadow-sm"
                          : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Action Suggestions */}
              <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
                <button
                  onClick={() => setInputText("Tell me about TMIP Enterprise Fleet")}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer ${
                    isTmip ? "bg-slate-100 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] text-slate-700" : "bg-slate-100 hover:bg-[#00B37E]/10 hover:text-[#00B37E] text-slate-700"
                  }`}
                >
                  TMIP Fleet
                </button>
                <button
                  onClick={() => setInputText("How does Suraksha 9-month ROI work?")}
                  className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 whitespace-nowrap cursor-pointer"
                >
                  Suraksha ROI
                </button>
                <button
                  onClick={() => setInputText("What is the price of Personal TPMS?")}
                  className="px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 whitespace-nowrap cursor-pointer"
                >
                  Buy TPMS
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask anything about Treel..."
                  className={`flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 bg-slate-50 ${
                    isTmip ? "focus:ring-[#00E5FF]" : "focus:ring-[#00B37E]"
                  }`}
                />
                <Button 
                  type="submit" 
                  variant={isTmip ? "tmip" : "emerald"} 
                  size="sm" 
                  className="h-10 w-10 p-0 shrink-0 rounded-xl cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
