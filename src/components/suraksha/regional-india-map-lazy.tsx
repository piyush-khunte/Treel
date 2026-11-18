"use client";

import dynamic from "next/dynamic";

// The regional map ships ~200 KB of SVG path data. It sits far below the fold on
// /suraksha, so load it on the client only to keep it out of the initial HTML and
// the hydration bundle (improves mobile LCP). The placeholder reserves space to avoid CLS.
const RegionalIndiaMap = dynamic(() => import("./regional-india-map"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-[900px] lg:min-h-[720px] rounded-xl border-2 border-[#451A03]/10 bg-[#FFFBEB]"
      aria-hidden="true"
    />
  ),
});

export function RegionalIndiaMapLazy() {
  return <RegionalIndiaMap />;
}

export default RegionalIndiaMapLazy;
