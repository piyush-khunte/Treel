import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/content/casestudies-storage";
import { CaseStudyDetailView } from "@/components/content/case-study-detail-view";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study || study.status === "Draft") {
    return {
      title: "Case Study Not Found · TMIP Customers",
      description: "The requested TMIP fleet customer case study could not be found.",
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

export default async function TmipCustomersCaseStudiesSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study || study.status === "Draft") {
    notFound();
  }

  return <CaseStudyDetailView study={study} />;
}
