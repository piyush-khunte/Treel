const fs = require('fs');
const path = require('path');

function walk(d) {
  let res = [];
  if (!fs.existsSync(d)) return res;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.json')) res.push(p);
  }
  return res;
}

const allFiles = walk('src');
console.log('Total files scanned:', allFiles.length);

const results = [];

allFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match description in metadata or objects
  // Could be description: "...", description: `...`, "description": "..."
  const regex = /description["']?\s*:\s*(["'`])([\s\S]*?)\1/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const val = m[2].replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
    if (val.length > 155 && val.length < 350) {
      // Check if it's likely a meta description (not code / html / long article body)
      if (!val.includes('<') && !val.includes('{') && !val.includes('function') && !val.includes('return')) {
        results.push({ file: f.replace(/\\/g, '/'), len: val.length, text: val });
      }
    }
  }
});

console.log('Total descriptions > 155 chars:', results.length);
results.sort((a,b) => b.len - a.len).forEach((r, idx) => {
  if (idx < 60) {
    console.log(`${r.len} | ${r.file}\n   ${r.text.slice(0, 100)}...`);
  }
});

