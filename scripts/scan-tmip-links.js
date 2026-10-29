const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
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

const files = walk(path.join('src', 'app', 'tmip'));
files.forEach(f => {
  if (f.includes(path.join('tmip', 'customers'))) return;
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('/tmip/customers') || content.includes('case-studies') || content.toLowerCase().includes('customer case')) {
    console.log('Match in:', f);
  }
});
