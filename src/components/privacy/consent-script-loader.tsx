"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { getStoredConsent, StoredConsent } from "@/lib/privacy/cookie-consent";

export function ConsentScriptLoader() {
  const [consent, setConsent] = React.useState<StoredConsent | null>(null);

  useEffect(() => {
    // Initial check
    const current = getStoredConsent();
    setConsent(current);

    // Subscribe to dynamic consent changes
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<StoredConsent>;
      setConsent(customEvent.detail);
    };

    window.addEventListener("treel_consent_updated", handler);
    return () => {
      window.removeEventListener("treel_consent_updated", handler);
    };
  }, []);

  const allowAnalytics = Boolean(consent?.categories?.analytics);
  const allowMarketing = Boolean(consent?.categories?.marketing);

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {/* Google Analytics - only mounted if user explicitly consented to Analytics */}
      {allowAnalytics && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-consent" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', {
                'analytics_storage': 'granted',
                'ad_storage': '${allowMarketing ? "granted" : "denied"}',
                'ad_user_data': '${allowMarketing ? "granted" : "denied"}',
                'ad_personalization': '${allowMarketing ? "granted" : "denied"}'
              });
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity - only mounted if user explicitly consented to Analytics */}
      {allowAnalytics && clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  );
}
