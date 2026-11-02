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

const files = walk('src/app/suraksha');
const allCaps = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match any JSX text inside <h1...>, <h2...>, <h3...>
  const headingMatches = [...content.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi)];
  headingMatches.forEach(hm => {
    const tag = `h${hm[1]}`;
    // Strip inner tags
    const text = hm[2].replace(/<[^>]+>/g, '').replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
    // Count words
    const words = text.split(' ').filter(w => /^[A-Z]{2,}/.test(w) && !['TPMS', 'TMIP', 'ARAI', 'ISO', 'JK', 'OEM', 'ROI', 'EMI', 'GPS', 'CAN', 'PSI', 'FAQ', 'FAQS', 'HTML', 'CSS', 'II', 'III', 'IV'].includes(w));
    if (words.length >= 2) {
      allCaps.push({ file: f, tag, text });
    }
  });
});

console.log('Headings with multiple all-caps words in src/app/suraksha:');
allCaps.forEach(x => console.log(`- [${x.tag}] ${x.file}: "${x.text}"`));

