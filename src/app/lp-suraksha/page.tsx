import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { SurakshaCampaignPage } from "@/components/suraksha/suraksha-campaign-page";

export const viewport: Viewport = {
  themeColor: "#FEF3C7",
};

export const metadata: Metadata = {
  title: "Suraksha Truck Tyre Safety Kit | TPMS for Trucks | Treel",
  description:
    "Suraksha by Treel: an in-cab display and tyre sensors that warn truck drivers before a tyre fails. Fits any truck in 15 minutes. Easy EMI available.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://treel.in/lp-suraksha",
  },
  openGraph: {
    type: "website",
    siteName: "Treel",
    locale: "en_IN",
    title: "Suraksha: a truck tyre safety kit that warns the driver before a tyre fails",
    description:
      "Suraksha by Treel: an in-cab display and tyre sensors that warn truck drivers before a tyre fails. Fits any truck in 15 minutes. Easy EMI available.",
    url: "https://treel.in/lp-suraksha",
  },
  twitter: {
    card: "summary",
  },
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Will it fit my truck?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Suraksha fits any truck and works with any tyre brand.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a smartphone or an app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The readings and warnings show on the display in the cabin. No app, no monthly fee, no subscription.",
      },
    },
    {
      "@type": "Question",
      name: "How long does fitting take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "About 15 minutes, at any Truck Wheels centre or roadside puncture shop.",
      },
    },
    {
      "@type": "Question",
      name: "Is EMI available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Easy EMI through Bajaj Finance is available at every Truck Wheels centre.",
      },
    },
    {
      "@type": "Question",
      name: "I have many trucks. How does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fit one kit in each truck. Each driver sees his own truck's tyres on the cabin display.",
      },
    },
    {
      "@type": "Question",
      name: "How does it pay for itself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With 0.5–0.6% fuel savings, 5–7% longer tyre life and no roadside towing fees, the kit pays for itself in nine to twelve months.",
      },
    },
  ],
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Treel Mobility Solutions Private Limited",
  alternateName: "Treel",
  url: "https://treel.in/",
  email: "hello@treel.in",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-1800-833-0233",
      contactType: "sales",
      areaServed: "IN",
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-1800-258-4567",
      contactType: "customer support",
      areaServed: "IN",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411023",
    addressCountry: "IN",
  },
};

export default function LPSurakshaPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Baloo+Chettan+2:wght@500;600;700&family=Baloo+Bhai+2:wght@500;600;700&family=Baloo+Thambi+2:wght@500;600;700&family=Baloo+Tammudu+2:wght@500;600;700&family=Baloo+Tamma+2:wght@500;600;700&family=Baloo+Paaji+2:wght@500;600;700&family=Baloo+Da+2:wght@500;600;700&display=swap"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#FEF3C7]" />}>
        <SurakshaCampaignPage />
      </Suspense>
    </>
  );
}
