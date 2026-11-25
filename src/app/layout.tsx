import type { Metadata } from "next";
import Script from "next/script";
import {
  fraunces,
  inter,
  spaceGrotesk,
  jetbrainsMono,
} from "./fonts";
import "./globals.css";
import { MasterHeader } from "@/components/layout/master-header";
import { MasterFooter } from "@/components/layout/master-footer";
import { CartProvider } from "@/lib/commerce/cart-context";
import { ClientPrivacyProviders } from "@/components/layout/client-privacy-providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://treel.in"),
  title: {
    default: "Treel · Mobility Intelligence & Vehicle Digital Twin Platform",
    template: "%s | Treel",
  },
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  description:
    "Treel turns tyre physics and telemetry into predictive mobility intelligence. Solutions for Enterprise Fleets (TMIP), Suraksha, and Consumer TPMS.",
  keywords: [
    "Treel",
    "TPMS",
    "Vehicle Digital Twin",
    "Mobility Intelligence",
    "Fleet Telematics",
    "Tyre Pressure Monitoring System",
    "Suraksha Truck Kit",
    "TMIP Platform",
  ],
  authors: [{ name: "Treel Mobility Solutions" }],
  creator: "MagicWorks IT Solutions",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://treel.in",
    siteName: "Treel",
    title: "Treel · Mobility Intelligence & Vehicle Digital Twin",
    description:
      "Transforming raw physical tyre contact into predictive fleet safety and vehicle intelligence.",
    images: [
      {
        url: "/images/og/treel-og.jpg",
        width: 1200,
        height: 630,
        alt: "Treel Mobility Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Treel · Mobility Intelligence & Vehicle Digital Twin",
    description:
      "Transforming raw physical tyre contact into predictive fleet safety and vehicle intelligence.",
    creator: "@TreelMobility",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Home hero image preloads live in src/app/page.tsx (react-dom preload) so they
            don't compete with the LCP image on every other route. */}
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {process.env.NODE_ENV === "production" ? (
          <Script id="google-tag-aw-18528246360" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              // Consent Mode: everything denied until the visitor opts in to marketing cookies.
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied'
              });

              (function() {
                var POLICY_VERSION = '2026-10-01';
                var started = false;
                var loaded = false;

                function readConsent() {
                  try {
                    var m = document.cookie.match(/(^|;\\s*)treel_cookie_consent=([^;]*)/);
                    var raw = m ? decodeURIComponent(m[2]) : localStorage.getItem('treel_cookie_consent');
                    if (!raw) return null;
                    if (raw === 'accepted') return { policyVersion: POLICY_VERSION, categories: { marketing: true } };
                    return JSON.parse(raw);
                  } catch (e) { return null; }
                }
                function marketingAllowed(c) {
                  return !!(c && c.policyVersion === POLICY_VERSION && c.categories && c.categories.marketing && c.status !== 'withdrawn');
                }

                // Google Ads (gtag.js) is only fetched after marketing consent.
                function startAds() {
                  if (started) return;
                  started = true;
                  gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
                  gtag('js', new Date());
                  gtag('config', 'AW-18528246360');
                  ['scroll', 'touchstart', 'pointerdown', 'keydown', 'click'].forEach(function(ev) {
                    window.addEventListener(ev, loadGTM, { passive: true, once: true });
                  });
                  if ('requestIdleCallback' in window) {
                    window.requestIdleCallback(function() { setTimeout(loadGTM, 8000); });
                  } else {
                    setTimeout(loadGTM, 8000);
                  }
                }

                window.addEventListener('treel_consent_updated', function(e) {
                  if (marketingAllowed(e.detail)) {
                    startAds();
                  } else {
                    gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
                  }
                });

                function loadGTM() {
                  if (loaded) return;
                  loaded = true;
                  ['scroll', 'touchstart', 'pointerdown', 'keydown', 'click'].forEach(function(ev) {
                    window.removeEventListener(ev, loadGTM, { passive: true });
                  });
                  var s = document.createElement('script');
                  s.type = 'text/javascript';
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18528246360';
                  var f = document.getElementsByTagName('script')[0];
                  if (f && f.parentNode) {
                    f.parentNode.insertBefore(s, f);
                  } else {
                    document.head.appendChild(s);
                  }
                }

                if (marketingAllowed(readConsent())) startAds();
              })();
            `}
          </Script>
        ) : null}
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#D5573B]/20 selection:text-[#FAF7F2]">
      <script src="https://www.magicflowai.io/chatbot.js"></script>
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#C64529] text-white font-medium rounded-lg shadow-lg"
          >
            Skip to main content
          </a>
          <MasterHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <MasterFooter />
          <ClientPrivacyProviders />
        </CartProvider>
      </body>
    </html>
  );
}
