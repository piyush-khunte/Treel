const fs = require('fs');

fs.readdirSync('src/lib/data').forEach(f => {
  if (f.endsWith('.json') || f.endsWith('.ts')) {
    const content = fs.readFileSync('src/lib/data/' + f, 'utf8');
    const m = [...content.matchAll(/"?(?:description|deck|roleSummary|excerpt|seoDescription)"?\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/g)];
    m.forEach(x => {
      const val = x[1].replace(/\\"/g, '"').replace(/\s+/g, ' ').trim();
      if (val.length > 155 && val.length < 350 && !val.includes('<')) {
        console.log(`[${val.length}] ${f}: ${val.slice(0, 80)}...`);
      }
    });
  }
});

