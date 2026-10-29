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

const allFiles = walk('src');
allFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (/cost per ton|per ton|per metric ton|per tonne/i.test(content)) {
    console.log('Match in:', f);
  }
});

