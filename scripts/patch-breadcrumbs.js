const fs = require('fs');

function patchFile(filePath, replacer) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('import { Breadcrumb }')) {
    content = 'import { Breadcrumb } from "@/components/ui/breadcrumb";\n' + content;
  }
  content = replacer(content);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched:', filePath);
}

// 15. src/app/research/data-architecture/page.tsx
patchFile('src/app/research/data-architecture/page.tsx', c => {
  return c.replace(
    /<nav aria-label="Breadcrumb"[\s\S]*?<\/nav>/,
    `<Breadcrumb
              variant="corporate"
              items={[
                { label: "Research", href: "/research" },
                { label: "Data Architecture & Telemetry Ingestion", href: "/research/data-architecture" },
              ]}
            />`
  );
});

// 16. src/app/research/roi-fleet-intelligence/page.tsx
patchFile('src/app/research/roi-fleet-intelligence/page.tsx', c => {
  return c.replace(
    /<nav aria-label="Breadcrumb"[\s\S]*?<\/nav>/,
    `<Breadcrumb
              variant="corporate"
              items={[
                { label: "Research", href: "/research" },
                { label: "The Fleet ROI and Fuel Savings Paper", href: "/research/roi-fleet-intelligence" },
              ]}
            />`
  );
});

// 17. src/app/research/[slug]/page.tsx
patchFile('src/app/research/[slug]/page.tsx', c => {
  return c.replace(
    /<div className="flex items-center gap-2 text-xs font-mono text-\[#94A3B8\]">\s*<Link href="\/research"[\s\S]*?<\/div>/,
    `<Breadcrumb
              variant="corporate"
              items={[
                { label: "Research", href: "/research" },
                { label: title, href: \`/research/\${targetSlug}\` },
              ]}
            />`
  );
});

// 18. src/app/insights/[slug]/page.tsx
patchFile('src/app/insights/[slug]/page.tsx', c => {
  return c.replace(
    /<div className="flex items-center gap-2 text-xs font-mono text-\[#94A3B8\]">\s*<Link href="\/insights"[\s\S]*?<\/div>/,
    `<Breadcrumb
              variant="corporate"
              items={[
                { label: "Insights", href: "/insights" },
                { label: article.category, href: \`/insights/category/\${article.categorySlug}\` },
                { label: article.title, href: \`/insights/\${article.slug}\` },
              ]}
            />`
  );
});

// 19. src/app/events/[slug]/page.tsx
patchFile('src/app/events/[slug]/page.tsx', c => {
  return c.replace(
    /<div className="flex items-center gap-2 text-xs font-mono text-\[#94A3B8\]">\s*<Link href="\/events"[\s\S]*?<\/div>/,
    `<Breadcrumb
              variant="corporate"
              items={[
                { label: "Events", href: "/events" },
                { label: event.name, href: \`/events/\${event.slug}\` },
              ]}
            />`
  );
});

// 20. src/app/press/[year]/[slug]/page.tsx
patchFile('src/app/press/[year]/[slug]/page.tsx', c => {
  return c.replace(
    /<div className="flex items-center gap-2 text-xs font-mono text-\[#94A3B8\]">\s*<Link href="\/press"[\s\S]*?<\/div>/,
    `<Breadcrumb
              variant="corporate"
              items={[
                { label: "Press", href: "/press" },
                { label: String(release.year || year), href: \`/press?year=\${release.year || year}\` },
                { label: release.category, href: \`/press/\${release.year || year}/\${slug}\` },
              ]}
            />`
  );
});

// 21. src/app/careers/[role-slug]/page.tsx
patchFile('src/app/careers/[role-slug]/page.tsx', c => {
  return c.replace(
    /<div className="flex items-center gap-2 text-xs font-mono text-\[#94A3B8\]">\s*<Link href="\/careers"[\s\S]*?<\/div>/,
    `<Breadcrumb
              variant="corporate"
              items={[
                { label: "Careers", href: "/careers" },
                { label: role.team },
                { label: role.title, href: \`/careers/\${role.slug}\` },
              ]}
            />`
  );
});
