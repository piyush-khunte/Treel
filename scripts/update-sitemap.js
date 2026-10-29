const fs = require('fs');
let s = fs.readFileSync('src/app/sitemap.ts', 'utf8');
const lines = s.split(/\r?\n/);
const filtered = lines.filter(line => !line.includes('${baseUrl}/tmip/customers'));
fs.writeFileSync('src/app/sitemap.ts', filtered.join('\r\n'), 'utf8');
console.log('Filtered sitemap lines from', lines.length, 'to', filtered.length);
