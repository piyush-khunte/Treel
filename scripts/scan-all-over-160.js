const fs = require('fs');

const over160 = [];

// 1. Static page descriptions
function walk(d) {
  let res = [];
  if (!fs.existsSync(d)) return res;
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else if (f.endsWith('page.tsx') || f.endsWith('layout.tsx')) res.push(p);
  }
  return res;
}

walk('src/app').forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match `description: "..."` in metadata
  const m = content.match(/export\s+const\s+metadata[\s\S]*?;\s*$/m) || [content];
  const dMatches = [...m[0].matchAll(/description:\s*(["'`])([\s\S]*?)\1/g)];
  dMatches.forEach(dm => {
    const d = dm[2].replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
    if (d.length > 160 && !d.includes('${') && !d.includes('<') && !d.startsWith('The requested')) {
      over160.push({ source: f, len: d.length, text: d });
    }
  });
});

// 2. Data stores
function checkJson(filePath, getDesc) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const items = Array.isArray(data) ? data : Object.values(data);
  items.forEach((item, idx) => {
    const d = getDesc(item);
    if (d && typeof d === 'string') {
      const clean = d.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
      if (clean.length > 160) {
        over160.push({ source: `${filePath} [#${item.slug || item.id || idx}]`, len: clean.length, text: clean });
      }
    }
  });
}

checkJson('src/lib/data/insights-store.json', i => i.deck || i.description || i.seoDescription);
checkJson('src/lib/data/careers-store.json', i => i.seoDescription || i.roleSummary);
checkJson('src/lib/data/events-store.json', i => i.seoDescription || i.excerpt);
checkJson('src/lib/data/whitepapers-store.json', i => i.description || i.excerpt);
checkJson('src/lib/data/casestudies-store.json', i => i.description || i.excerpt || i.deck);
checkJson('src/lib/data/press-store.json', i => i.leadParagraph || i.excerpt || i.headline);

// 3. Static articles inside insights/[slug]/page.tsx
const insightsSlugContent = fs.readFileSync('src/app/insights/[slug]/page.tsx', 'utf8');
const deckMatches = [...insightsSlugContent.matchAll(/deck:\s*["'`]([\s\S]*?)["'`]/g)];
deckMatches.forEach(dm => {
  const d = dm[1].replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
  if (d.length > 160) {
    over160.push({ source: 'src/app/insights/[slug]/page.tsx (hardcoded article deck)', len: d.length, text: d });
  }
});

console.log('Total over 160 chars found:', over160.length);
// Deduplicate by text
const seen = new Set();
const unique = [];
over160.forEach(x => {
  if (!seen.has(x.text)) {
    seen.add(x.text);
    unique.push(x);
  }
});

console.log('Unique descriptions over 160 chars:', unique.length);
unique.sort((a,b) => b.len - a.len).forEach((x, i) => {
  console.log(`${i+1}. [${x.len} chars] ${x.source}\n   "${x.text}"\n`);
});

