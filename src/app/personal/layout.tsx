import React from "react";
import { PersonalHeader } from "@/components/layout/personal-header";

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FFFFFF] text-[#111827] min-h-screen font-manrope antialiased selection:bg-[#2563EB]/20 selection:text-[#111827]">
      <PersonalHeader />
      <div>{children}</div>
    </div>
  );
}
