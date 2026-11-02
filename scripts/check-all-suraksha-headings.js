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
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/g)];
  matches.forEach(m => {
    const text = m[1].replace(/<[^>]+>/g, '').replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
    // Check if any heading text is ALL CAPS
    const letters = text.replace(/[^A-Za-z]/g, '');
    if (letters.length > 5 && letters === letters.toUpperCase()) {
      console.log(`${f}: "${text}"`);
    }
  });
});

