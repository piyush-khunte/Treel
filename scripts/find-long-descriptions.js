const fs = require('fs');
const path = require('path');

function walk(d) {
  let res = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else if (f.endsWith('.tsx') || f.endsWith('.ts')) res.push(p);
  }
  return res;
}

const files = walk('src/app');
const over160 = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match all description properties in metadata
  const regex = /description:\s*["'`]([\s\S]*?)["'`]/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const desc = m[1].replace(/\s+/g, ' ').trim();
    // Ignore internal fields or long strings not in metadata if not applicable
    if (desc.length > 160 && !desc.includes('${') && !desc.includes('<') && !desc.includes('{')) {
      over160.push({ file: f.replace(/\\/g, '/'), len: desc.length, desc });
    }
  }
});

console.log('Total over 160:', over160.length);
// Deduplicate by file
const byFile = {};
over160.forEach(x => {
  if (!byFile[x.file] || byFile[x.file].len < x.len) {
    byFile[x.file] = x;
  }
});

const list = Object.values(byFile).sort((a,b) => b.len - a.len);
console.log('Unique files over 160:', list.length);
list.forEach(x => {
  console.log(`${x.len} | ${x.file}\n   ${x.desc}`);
});
