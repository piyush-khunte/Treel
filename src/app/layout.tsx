import type { Metadata } from "next";
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
import { ChatWidget } from "@/components/layout/chat-widget";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { CartProvider } from "@/lib/commerce/cart-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://treel.in"),
  title: {
    default: "Treel · Mobility Intelligence & Vehicle Digital Twin Platform",
    template: "%s | Treel",
  },
  icons: {
    icon: "/images/treel-favicon.jpeg",
    shortcut: "/images/treel-favicon.jpeg",
    apple: "/images/treel-favicon.jpeg",
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
    "JK Tyre",
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
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#00B37E]/20 selection:text-[#0F1E19]">
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#00B37E] text-white font-medium rounded-lg shadow-lg"
          >
            Skip to main content
          </a>
          <MasterHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <MasterFooter />
          <ChatWidget />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
