import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/content/casestudies-storage";
import { CaseStudyDetailView } from "@/components/content/case-study-detail-view";

const SLUG = "cold-chain-express-transit";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const study = await getCaseStudyBySlug(SLUG);

  if (!study || study.status === "Draft") {
    return {
      title: "Case Study · TMIP Customers",
      description: "TMIP fleet customer case study.",
    };
  }

  return {
    title: `${study.headline} · TMIP Case Study`,
    description: study.excerpt,
    alternates: {
      canonical: `https://treel.in/tmip/customers/case-studies/${study.slug}`,
    },
    openGraph: {
      title: `${study.headline} · TMIP Case Study`,
      description: study.excerpt,
      url: `https://treel.in/tmip/customers/case-studies/${study.slug}`,
    },
  };
}

export default async function ColdChainCaseStudyPage() {
  const study = await getCaseStudyBySlug(SLUG);

  if (!study || study.status === "Draft") {
    notFound();
  }

  return <CaseStudyDetailView study={study} />;
}
