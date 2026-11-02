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
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/app');
const rawBreadcrumbFiles = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Check if file has raw breadcrumbs without Breadcrumb component
  if (!content.includes('<Breadcrumb') && (
    content.includes('ChevronRight className="w-3.5') ||
    content.includes('aria-label="Breadcrumb"') ||
    content.includes('aria-label="breadcrumb"') ||
    content.includes('{/* Breadcrumbs */}') ||
    content.includes('{/* Breadcrumb */}') ||
    (content.includes('hover:text-[#F1F5F9]') && content.includes('ChevronRight'))
  )) {
    rawBreadcrumbFiles.push(f);
  }
});

console.log('Files with raw breadcrumbs (no Breadcrumb component):', rawBreadcrumbFiles.length);
rawBreadcrumbFiles.forEach(f => console.log(' -', f.replace(/\\/g, '/')));

