"use client";

import { usePathname } from "next/navigation";
import { PersonalHeader } from "./personal-header";

export function PersonalConditionalHeader() {
  const pathname = usePathname();
  // Don't render the multi-level navigation header on dedicated campaign landing pages
  if (pathname?.startsWith("/personal/campaign")) {
    return null;
  }
  return <PersonalHeader />;
}
