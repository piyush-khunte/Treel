import { DEFAULT_OG_IMAGES } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { getPublicBlogs } from "@/lib/admin/admin-actions";
import { filterPersonalBlogs } from "@/lib/blogs/personal-blog-scope";
import { PersonalBlogClient } from "./personal-blog-client";

export const metadata: Metadata = {
  title: "The Personal TPMS Blog · Tyre Care & Road Safety",
  description: "Practical tyre care tips, road safety insights, product updates, and consumer vehicle maintenance advice from the Treel team.",
  alternates: {
    canonical: "https://treel.in/personal/blog",
  },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: "The Personal TPMS Blog",
    description: "Practical tyre care tips, road safety insights, product updates, and consumer vehicle maintenance advice from the Treel team.",
    url: "https://treel.in/personal/blog",
  },
};

export const revalidate = 60;

export default async function PersonalBlogPage() {
  const result = await getPublicBlogs();
  const articles = await filterPersonalBlogs(result.success && result.data ? result.data : []);

  return <PersonalBlogClient initialArticles={articles} />;
}
