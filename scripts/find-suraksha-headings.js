const fs = require('fs');
const path = require('path');

function walk(d) {
  let res = [];
  if (!fs.existsSync(d)) return res;
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else if (f.endsWith('.tsx') || f.endsWith('.ts')) res.push(p);
  }
  return res;
}

const files = walk('src/app/suraksha').concat(walk('src/components/suraksha'));
console.log('Suraksha files:', files.length);

const allCapsHeadings = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Look for headings: <h[1-4][^>]*>(.*?)</h[1-4]>
  const hRegex = /<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = hRegex.exec(content)) !== null) {
    const tag = `h${m[1]}`;
    const inner = m[2].replace(/<[^>]+>/g, '').replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
    // Check if inner has letters and is mostly all uppercase (more than 4 words or > 12 chars all caps)
    const letters = inner.replace(/[^a-zA-Z]/g, '');
    if (letters.length > 8 && letters === letters.toUpperCase() && !inner.startsWith('{')) {
      allCapsHeadings.push({ file: f, tag, text: inner });
    }
  }
});

console.log('Found all-caps headings:', allCapsHeadings.length);
allCapsHeadings.forEach(h => {
  console.log(`- [${h.tag}] ${h.file}\n   "${h.text}"`);
});

