const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('page.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const allPages = walk('src/app');
const innerPages = allPages.filter(p => {
  const norm = p.replace(/\\/g, '/');
  // exclude root page, admin pages, api routes, error pages
  if (norm === 'src/app/page.tsx') return false;
  if (norm.startsWith('src/app/admin/')) return false;
  if (norm.startsWith('src/app/api/')) return false;
  if (norm.includes('404') || norm.includes('500')) return false;
  return true;
});

const pagesWithBreadcrumbs = [];
const pagesWithoutBreadcrumbs = [];

innerPages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  if (content.includes('Breadcrumb') || content.includes('breadcrumb')) {
    pagesWithBreadcrumbs.push(p);
  } else {
    pagesWithoutBreadcrumbs.push(p);
  }
});

console.log('Total inner pages:', innerPages.length);
console.log('Pages with Breadcrumbs:', pagesWithBreadcrumbs.length);
console.log('Pages WITHOUT Breadcrumbs:', pagesWithoutBreadcrumbs.length);
console.log('\nList of pages without Breadcrumbs:');
pagesWithoutBreadcrumbs.forEach(p => console.log(' -', p.replace(/\\/g, '/')));

