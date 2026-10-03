import { Suspense } from "react";
import type { Metadata } from "next";
import { PersonalCarCampaignPage } from "@/components/personal/personal-car-campaign-page";

export const metadata: Metadata = {
  title: "TPMS for Car | Car Tyre Pressure Sensor | Treel",
  description:
    "Treel car TPMS: clamp-in valve sensors watch all four tyres 24/7, with alerts on your phone or an in-cabin display. 5-year sensor warranty. Enquire today.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://treel.in/lp-tpms/car",
  },
  openGraph: {
    type: "website",
    title: "Treel TPMS for cars: a tyre pressure sensor in every tyre",
    description:
      "Treel car TPMS: clamp-in valve sensors watch all four tyres 24/7, with alerts on your phone or an in-cabin display. 5-year sensor warranty. Enquire today.",
    url: "https://treel.in/lp-tpms/car",
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
      name: "What is TPMS in a car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TPMS stands for tyre pressure monitoring system. Treel's car TPMS puts a sensor at the valve of each tyre, reads pressure and temperature 24/7, and alerts you early if a tyre starts to lose air.",
      },
    },
    {
      "@type": "Question",
      name: "Which Treel car TPMS kit should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose the 4-sensor kit if you're happy to see readings in the free app. Pick a display kit to see your tyres on a screen in the cabin, a 5-sensor kit to cover the spare too, or the GPS kit to track your car's location as well. Not sure? Request a free call back and we'll help.",
      },
    },
    {
      "@type": "Question",
      name: "Can I see tyre pressure without using my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The display kits show your tyres on a dedicated in-cabin display.",
      },
    },
    {
      "@type": "Question",
      name: "Does Treel monitor the spare tyre?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with the 5-sensor kits. The fifth sensor goes on your spare.",
      },
    },
    {
      "@type": "Question",
      name: "How are the car sensors fitted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Treel's clamp-in valve sensors are fitted at each wheel's valve at a tyre shop. Find a Treel tyre shop near you on treel.in.",
      },
    },
    {
      "@type": "Question",
      name: "Will it fit my car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Share your car's make and model in the enquiry form, or call 1800 833 0233, and we'll confirm the right kit before you buy.",
      },
    },
    {
      "@type": "Question",
      name: "What does the car TPMS sensor measure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tyre pressure from 0 to 100 psi and tyre temperature from −20 to 100 °C, around the clock.",
      },
    },
    {
      "@type": "Question",
      name: "What is the warranty on Treel car sensors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Treel car sensors come with a 5-year warranty.",
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
        text: "The wireless range is up to 100 ft, so you can check every tyre before you reach the car.",
      },
    },
    {
      "@type": "Question",
      name: "Is the TREEL CARE app free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It's free on Android and iOS, and it also tracks mileage, fuel, insurance renewals and services for up to 10 vehicles.",
      },
    },
    {
      "@type": "Question",
      name: "What is the right tyre pressure for my car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's usually on a sticker on the driver's door frame or fuel flap, and in your owner's manual. With Treel you see each tyre's live reading, so topping up to exactly that number is easy.",
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

export default function CarTpmsLandingPage() {
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
        <PersonalCarCampaignPage />
      </Suspense>
    </>
  );
}
