import React from "react";
import { TmipHeader } from "@/components/layout/tmip-header";

export default function TmipLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tmip-page min-h-screen text-[#E5E7EB] font-ibm-plex antialiased selection:bg-[#3B82F6]/30 selection:text-white">
      <TmipHeader />
      <main>{children}</main>
    </div>
  );
}

