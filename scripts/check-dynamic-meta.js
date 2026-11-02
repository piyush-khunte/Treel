const fs = require('fs');
const path = require('path');

function walk(d) {
  let res = [];
  if (!fs.existsSync(d)) return res;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else if (f.endsWith('page.tsx')) res.push(p);
  }
  return res;
}

const files = walk('src/app');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('generateMetadata')) {
    console.log('Dynamic page with generateMetadata:', f.replace(/\\/g, '/'));
    const gm = content.match(/generateMetadata[\s\S]*?^}/m);
    if (gm) {
      const descLine = gm[0].match(/description[\s\S]*?,/);
      if (descLine) console.log('   ', descLine[0].replace(/\s+/g, ' '));
    }
  }
});

