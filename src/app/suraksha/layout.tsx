import React from "react";
import { SurakshaHeader } from "@/components/layout/suraksha-header";
import { SurakshaHighwayHelpBar } from "@/components/layout/suraksha-highway-help-bar";

export default function SurakshaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="suraksha-page min-h-screen bg-[#FEF3C7] text-[#451A03] font-rubik antialiased selection:bg-[#DC2626]/20 selection:text-[#451A03]">
      <SurakshaHeader />
      <main id="suraksha-main">{children}</main>
      <SurakshaHighwayHelpBar />
    </div>
  );
}
