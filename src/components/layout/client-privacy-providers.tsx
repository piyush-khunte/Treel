"use client";

import dynamic from "next/dynamic";

const CookieBanner = dynamic(
  () => import("@/components/layout/cookie-banner").then((mod) => mod.CookieBanner),
  { ssr: false }
);

const ConsentScriptLoader = dynamic(
  () => import("@/components/privacy/consent-script-loader").then((mod) => mod.ConsentScriptLoader),
  { ssr: false }
);

export function ClientPrivacyProviders() {
  return (
    <>
      <ConsentScriptLoader />
      <CookieBanner />
    </>
  );
}

export default ClientPrivacyProviders;

