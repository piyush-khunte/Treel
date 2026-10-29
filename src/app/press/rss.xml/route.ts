import { getPublishedPressItems } from "@/lib/content/press-storage";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
  const baseUrl = "https://treel.in";
  const buildDate = new Date().toUTCString();
  const items = await getPublishedPressItems();

  const itemsXml = items
    .map((item) => {
      const url = item.externalUrl || `${baseUrl}/press/${item.year || "2026"}/${item.slug}`;
      const pubDate = item.createdAt ? new Date(item.createdAt).toUTCString() : buildDate;
      const desc = item.excerpt || item.leadParagraph || item.headline;

      return `    <item>
      <title><![CDATA[${item.headline}]]></title>
      <link>${url}</link>
      <description><![CDATA[${desc}]]></description>
      <category><![CDATA[${item.category || "Press Release"}]]></category>
      <author>hello@treel.in (Treel Communications)</author>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${url}</guid>
    </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Treel Mobility Solutions — Press &amp; Media Feed</title>
    <link>${baseUrl}/press</link>
    <description>Official press releases, product updates, enterprise announcements, and media statements from Treel Mobility Solutions.</description>
    <language>en-in</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/press/rss.xml" rel="self" type="application/rss+xml" />
    <managingEditor>hello@treel.in (Treel Media Relations)</managingEditor>
    <webMaster>hello@treel.in (Treel Engineering)</webMaster>
    <copyright>© ${new Date().getFullYear()} Treel Mobility Solutions Pvt. Ltd. All rights reserved.</copyright>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

