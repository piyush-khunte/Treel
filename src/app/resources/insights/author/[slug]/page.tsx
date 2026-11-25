import { redirect } from "next/navigation";

export default async function InsightsAuthorRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/authors/${slug}`);
}
