import { Suspense } from "react";
import type { Metadata } from "next";
import { PersonalGenericCampaignPage } from "@/components/personal/personal-generic-campaign-page";

export const metadata: Metadata = {
  title: "TPMS for Car & Bike | Tyre Pressure Sensor | Treel",
  description:
    "Treel TPMS: tyre pressure monitoring sensors for cars and bikes, with live pressure and temperature in the free TREEL CARE app. ARAI certified. Enquire today.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://treel.in/lp-tpms",
  },
  openGraph: {
    type: "website",
    title: "Treel TPMS for cars and bikes: tyre pressure, live on your phone",
    description:
      "Treel TPMS: tyre pressure monitoring sensors for cars and bikes, with live pressure and temperature in the free TREEL CARE app. ARAI certified. Enquire today.",
    url: "https://treel.in/lp-tpms",
    siteName: "Treel",
    locale: "en_IN",
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
      name: "What is a tyre pressure monitoring system (TPMS)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A TPMS keeps an eye on the air pressure in your tyres and tells you when one of them drops. Treel's TPMS puts a sensor at each tyre's valve, reads pressure and temperature 24/7, and sends the readings to the free TREEL CARE app.",
      },
    },
    {
      "@type": "Question",
      name: "Does Treel make TPMS for both cars and bikes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. There are car kits with 4 or 5 sensors (with the app, an in-cabin display or GPS tracking), a 2W TPMS kit for motorbikes, and a separate kit for scooters.",
      },
    },
    {
      "@type": "Question",
      name: "Which TPMS kit is right for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your vehicle and how you'd like to see your readings. Pick your vehicle in the kits section to compare, or request a free call back and we'll help you choose.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Treel TPMS cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prices depend on your vehicle and kit. You can see today's price for each kit on treel.in, or request a free call back and we'll help you choose.",
      },
    },
    {
      "@type": "Question",
      name: "Is the TREEL CARE app free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TREEL CARE is free on Android and iOS. On both stores it's listed as SMART TYRE CAR & BIKE.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the app without sensors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The app works on its own for mileage, fuel, insurance and service reminders. Add Treel sensors to see live tyre pressure and temperature.",
      },
    },
    {
      "@type": "Question",
      name: "Can one app handle my car and my bike?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TREEL CARE handles up to 10 vehicles, and you can share vehicle stats with family members.",
      },
    },
    {
      "@type": "Question",
      name: "How are the sensors fitted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Treel uses high-grade clamp-in valve sensors, fitted at each wheel's valve. Find a Treel tyre shop near you on treel.in to have them fitted.",
      },
    },
    {
      "@type": "Question",
      name: "What does the sensor measure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tyre pressure from 0 to 100 psi and tyre temperature from −20 to 100 °C, around the clock.",
      },
    },
    {
      "@type": "Question",
      name: "What is the warranty on Treel sensors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Treel car sensors come with a 5-year warranty, and the bike sensor with a 3-year warranty.",
      },
    },
    {
      "@type": "Question",
      name: "Is Treel TPMS certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Treel TPMS is ARAI certified, made in India and tested against international benchmarks.",
      },
    },
    {
      "@type": "Question",
      name: "How far can my phone be from the sensors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The wireless range is up to 100 ft, so you can check your tyres before you reach your vehicle.",
      },
    },
    {
      "@type": "Question",
      name: "What is the right tyre pressure for my vehicle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For cars, it's usually on a sticker on the driver's door frame or fuel flap. For bikes, it's in the owner's manual and often on a sticker on the bike. With Treel you see each tyre's live reading, so topping up to exactly that number is easy.",
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
      contactType: "customer service",
      areaServed: "IN",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "S.No.6/1B, 6/4, 7/4, Plot No.02, Laxmi Vishnupuram Amenities Business, NDA Road, Vill. Shivane, Tal. Haveli",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411023",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/jktreel/",
    "https://www.instagram.com/jktreel/",
    "https://youtube.com/@jktreel5290",
    "https://www.linkedin.com/company/jktreel/",
  ],
};

export default function GenericTpmsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <PersonalGenericCampaignPage />
      </Suspense>
    </>
  );
}
