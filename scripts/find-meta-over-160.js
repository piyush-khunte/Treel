const fs = require('fs');
const path = require('path');

function walk(d) {
  let res = [];
  if (!fs.existsSync(d)) return res;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else if (f.endsWith('page.tsx') || f.endsWith('layout.tsx')) res.push(p);
  }
  return res;
}

const files = walk('src/app');
const over155 = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const dMatches = [...content.matchAll(/description:\s*(["'`])([\s\S]*?)\1/g)];
  dMatches.forEach(dm => {
    const d = dm[2].replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
    if (d.length > 155 && !d.includes('${') && !d.includes('<') && !d.startsWith('The requested')) {
      over155.push({ file: f.replace(/\\/g, '/'), len: d.length, desc: d });
    }
  });
});

console.log('Total metadata description occurrences > 155 chars:', over155.length);

const byFile = {};
over155.forEach(x => {
  if (!byFile[x.file]) byFile[x.file] = [];
  byFile[x.file].push(x);
});

console.log('Unique files:', Object.keys(byFile).length);
Object.keys(byFile).sort().forEach(f => {
  const item = byFile[f][0];
  console.log(`- [${item.len} chars] ${f}`);
  console.log(`  "${item.desc}"`);
});
