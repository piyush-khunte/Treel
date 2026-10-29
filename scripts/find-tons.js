const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(full);
    }
  });
  return results;
}

const tmipFiles = walk('src/app/tmip');
console.log('Total TMIP files:', tmipFiles.length);

const tonRegex = /\b(ton|tons|tonne|tonnes|tonnage)\b/i;

tmipFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (tonRegex.test(line)) {
      console.log(`${f}:${idx + 1}: ${line.trim()}`);
    }
  });
});

