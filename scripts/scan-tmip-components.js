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

['src/components/layout', 'src/components/tmip'].forEach(d => {
  const files = walk(d);
  files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    if (content.includes('/tmip/customers') || content.includes('case-studies') || content.toLowerCase().includes('customer case')) {
      console.log('Match in components:', f);
    }
  });
});
