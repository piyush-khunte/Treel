export const dynamic = "force-static";

export async function GET() {
  const baseUrl = "https://treel.in";
  const buildDate = new Date().toUTCString();

  const articles = [
    {
      title: "The Fleet ROI Paper — How TMIP customers reach payback in nine months",
      url: `${baseUrl}/tmip/whitepapers/roi-fleet-intelligence`,
      description:
        "The economics of mobility intelligence deployment across two hundred TMIP customers. Payback drivers, ROI attribution, and what fuel-and-tyre economics look like when you can see them at vehicle level.",
      author: "hello@treel.in (Treel Research & Analytics)",
      pubDate: new Date("2026-10-01T09:00:00Z").toUTCString(),
    },
    {
      title: "How Sub-Second Vehicle Telemetry Redefines Chassis Maintenance",
      url: `${baseUrl}/tmip/platform/telemetry`,
      description:
        "A technical dissection of why 5-minute telematics polling fails to prevent blowout catastrophes, and how 180ms edge event streaming transforms fleet safety.",
      author: "hello@treel.in (Rohan Varma)",
      pubDate: new Date("2026-09-24T09:00:00Z").toUTCString(),
    },
    {
      title: "Deploying 1,000 Heavy Commercial Assets on the Western Logistics Corridor",
      url: `${baseUrl}/tmip/customers/case-studies/1000-truck-case-study`,
      description:
        "Field engineering takeaways from equipping linehaul tractor-trailers across seven depot hubs under operational delivery schedules.",
      author: "hello@treel.in (Vikram Sengupta)",
      pubDate: new Date("2026-09-15T09:00:00Z").toUTCString(),
    },
    {
      title: "TMIP Engine 2.4: Predictive Thermal Anomaly Detection & Custom TMS Webhooks",
      url: `${baseUrl}/tmip/platform`,
      description:
        "Announcing major algorithm enhancements to the thermal degradation engine, plus bi-directional event webhooks for SAP and custom TMS stacks.",
      author: "hello@treel.in (Product Engineering Group)",
      pubDate: new Date("2026-08-28T09:00:00Z").toUTCString(),
    },
    {
      title: "The Math of Rolling Resistance: Correlating 10 PSI Under-Inflation to Diesel Burn",
      url: `${baseUrl}/tmip/platform/vehicle-digital-twin`,
      description:
        "Empirical analysis tracking 18 million kilometres of commercial haulage. How continuous pressure calibration cuts fleet operating fuel expense by 5.2%.",
      author: "hello@treel.in (Pooja Deshmukh)",
      pubDate: new Date("2026-07-19T09:00:00Z").toUTCString(),
    },
  ];

  const itemsXml = articles
    .map(
      (a) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${a.url}</link>
      <description><![CDATA[${a.description}]]></description>
      <author>${a.author}</author>
      <pubDate>${a.pubDate}</pubDate>
      <guid isPermaLink="true">${a.url}</guid>
    </item>`
    )
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TMIP Insights</title>
    <link>${baseUrl}/tmip/insights</link>
    <description>Platform deep-dives, deployment lessons, and fleet analytics from the TMIP team.</description>
    <language>en-in</language>
    <copyright>© 2026 Treel Mobility Solutions Private Limited</copyright>
    <pubDate>${articles[0].pubDate}</pubDate>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/tmip/insights/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
