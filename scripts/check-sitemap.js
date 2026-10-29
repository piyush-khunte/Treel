const fs = require('fs');
const s = fs.readFileSync('src/app/sitemap.ts', 'utf8');
const lines = s.split('\n');
console.log('Line 50:', JSON.stringify(lines[49]));
console.log('Line 51:', JSON.stringify(lines[50]));
