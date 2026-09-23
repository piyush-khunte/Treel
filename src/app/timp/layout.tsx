import React from "react";
import { TmipHeader } from "@/components/layout/tmip-header";

export default function TimpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tmip-page min-h-screen bg-[#050A17] text-[#F1F5F9] font-ibm-plex antialiased selection:bg-[#3B82F6]/30 selection:text-white">
      <TmipHeader />
      <main>{children}</main>
    </div>
  );
}
