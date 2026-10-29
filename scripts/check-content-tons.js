const fs = require('fs');

const files = [
  'src/app/tmip/customers/case-studies/page.content.tsx',
  'src/app/tmip/customers/page.content.tsx',
  'src/app/tmip/roi-calculator/page.tsx',
  'src/app/tmip/demo/page.tsx',
  'src/app/tmip/solutions/page.tsx',
  'src/lib/content/casestudies-storage.ts',
  'src/lib/supabase/seed-data.ts'
];

const tonRegex = /\b(ton|tons|tonne|tonnes|tonnage)\b/i;

files.forEach(f => {
  if (fs.existsSync(f)) {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    lines.forEach((line, idx) => {
      if (tonRegex.test(line)) {
        console.log(`${f}:${idx + 1}: ${line.trim()}`);
      }
    });
  }
});

