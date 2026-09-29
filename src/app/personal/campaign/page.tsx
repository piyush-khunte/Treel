import { Suspense } from "react";
import type { Metadata } from "next";
import { PersonalCampaignPage } from "@/components/personal/personal-campaign-page";

export const metadata: Metadata = {
  title: "TPMS for Bikes & Scooters | Tyre Pressure Sensor | Treel",
  description:
    "Treel TPMS for bikes and scooters: live tyre pressure and temperature on your phone, early leak alerts and a 3-year sensor warranty. ARAI certified.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://treel.in/personal/campaign",
  },
  openGraph: {
    type: "website",
    title: "Treel TPMS for bikes and scooters",
    description:
      "Treel TPMS for bikes and scooters: live tyre pressure and temperature on your phone, early leak alerts and a 3-year sensor warranty. ARAI certified.",
    url: "https://treel.in/personal/campaign",
  },
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does TPMS work on bikes and scooters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Treel makes a 2W TPMS kit for motorbikes and a separate kit for scooters. Both send live tyre pressure and temperature to the free TREEL CARE app.",
      },
    },
    {
      "@type": "Question",
      name: "How are the bike sensors fitted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Treel uses high-grade clamp-in valve sensors, fitted at each wheel's valve. Find a Treel tyre shop near you on treel.in to have them fitted.",
      },
    },
    {
      "@type": "Question",
      name: "Will it fit my bike?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Treel has separate kits for motorbikes and scooters. Share your make and model in the call-back form, or call 1800 833 0233, and we'll confirm the right kit before you buy.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to look at my phone while riding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Alerts appear as on-screen notifications. Check them once you've stopped somewhere safe.",
      },
    },
    {
      "@type": "Question",
      name: "How far can my phone be from the sensors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The wireless range is up to 100 ft, so you can check both tyres before you reach the bike.",
      },
    },
    {
      "@type": "Question",
      name: "What else can the TREEL CARE app do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It tracks mileage, fuel consumption, insurance renewals and services, handles up to 10 vehicles, lets you share stats with family, and backs up your data to the cloud.",
      },
    },
    {
      "@type": "Question",
      name: "Is the app free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TREEL CARE is free on Android and iOS, and you can start using it before you add sensors.",
      },
    },
    {
      "@type": "Question",
      name: "What is the warranty on the bike sensor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The bike sensor comes with a 3-year warranty.",
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
      name: "What is the right tyre pressure for my bike?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's in your owner's manual, and often on a sticker on the bike itself. With Treel you can see your live reading, so topping up to exactly that number is easy.",
      },
    },
  ],
};

export default function PersonalCampaignRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <PersonalCampaignPage />
      </Suspense>
    </>
  );
}
