"use client";

import { usePathname } from "next/navigation";
import { TmipHeader } from "./tmip-header";

export function TmipConditionalHeader() {
  const pathname = usePathname();
  // Don't render the enterprise multi-level navigation header on dedicated campaign landing pages
  if (pathname?.startsWith("/tmip/campaign")) {
    return null;
  }
  return <TmipHeader />;
}
