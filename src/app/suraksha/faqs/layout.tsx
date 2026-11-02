import type { Metadata } from "next";
import { SURAKSHA_FAQS } from "./faqs-data";

export const metadata: Metadata = {
  title: "Suraksha Commercial Truck TPMS FAQs",
  description:
    "Get clear answers about Treel Suraksha truck tyre pressure monitoring, ROI payback, warranty, sensor fitment, and zero-interest EMI financing.",
  alternates: {
    canonical: "https://treel.in/suraksha/faqs",
  },
  openGraph: {
    title: "Suraksha Commercial Truck TPMS FAQs",
    description:
      "Get clear answers about Treel Suraksha truck tyre pressure monitoring, ROI payback, warranty, sensor fitment, and zero-interest EMI financing.",
    url: "https://treel.in/suraksha/faqs",
  },
};

export default function SurakshaFaqsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": SURAKSHA_FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
