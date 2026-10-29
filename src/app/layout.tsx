import type { Metadata } from "next";
import Script from "next/script";
import {
  fraunces,
  inter,
  spaceGrotesk,
  ibmPlexSans,
  jetbrainsMono,
  anton,
  rubik,
  baloo2,
  manrope,
} from "./fonts";
import "./globals.css";
import { MasterHeader } from "@/components/layout/master-header";
import { MasterFooter } from "@/components/layout/master-footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { ConsentScriptLoader } from "@/components/privacy/consent-script-loader";
import { CartProvider } from "@/lib/commerce/cart-context";

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
    "Treel transforms dynamic tyre physics and vehicle telemetry into predictive mobility intelligence. Solutions for Enterprise Fleets (TMIP), Commercial Trucks (Suraksha), and Consumer TPMS.",
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
      className={`${fraunces.variable} ${inter.variable} ${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} ${anton.variable} ${rubik.variable} ${baloo2.variable} ${manrope.variable}`}
    >
      <head>
        
        
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          media="(max-width: 640px)"
          href="https://res.cloudinary.com/uwd11u7t/image/upload/f_webp,q_auto:good,w_420/v1792650870/Fleet_Intelligence_Digital_Twin.png"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          media="(min-width: 641px)"
          href="https://res.cloudinary.com/uwd11u7t/image/upload/f_webp,q_auto:good,w_650/v1792650870/Fleet_Intelligence_Digital_Twin.png"
          fetchPriority="high"
        />
        {process.env.NODE_ENV === "production" ? (
          <Script id="google-tag-aw-18528246360" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18528246360');

              (function() {
                var loaded = false;
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
                ['scroll', 'touchstart', 'pointerdown', 'keydown', 'click'].forEach(function(ev) {
                  window.addEventListener(ev, loadGTM, { passive: true, once: true });
                });
                if ('requestIdleCallback' in window) {
                  window.requestIdleCallback(function() { setTimeout(loadGTM, 5000); });
                } else {
                  setTimeout(loadGTM, 6000);
                }
              })();
            `}
          </Script>
        ) : null}
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#D5573B]/20 selection:text-[#FAF7F2]">
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#D5573B] text-white font-medium rounded-lg shadow-lg"
          >
            Skip to main content
          </a>
          <MasterHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <ConsentScriptLoader />
          <MasterFooter />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
