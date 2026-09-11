import React from "react";
import { PersonalHeader } from "@/components/layout/personal-header";

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen font-manrope antialiased selection:bg-blue-600/20 selection:text-blue-900">
      <PersonalHeader />
      <div>{children}</div>
    </div>
  );
}
