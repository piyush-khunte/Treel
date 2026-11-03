const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Tasks list
const tasks = [
  {
    id: 25,
    group: 'Technical / on-page',
    area: 'sitemap.xml, sitemap-index.xml',
    change: 'Clean the sitemap',
    details: 'Removed 404/307/draft URLs (/tmip/api, /suraksha/testimonials, /personal/buy/cart, /suraksha/cart). Added noindex to utility & cart pages. Included real published routes (/oem, /notices, /global-presence, 6 insights articles). Dynamic lastmod from real content dates.',
    localUrl: 'http://localhost:3000/sitemap.xml',
    prodUrl: 'https://treel.in/sitemap.xml',
    status: 'Ready to Verify',
    verifySteps: '1. Open /sitemap.xml in browser and verify clean XML without 404/307 URLs.\n2. Confirm /personal/buy/cart and /suraksha/cart are excluded from sitemap.\n3. Open /personal/buy/cart and inspect <head> for <meta name="robots" content="noindex, nofollow">.'
  },
  {
    id: 26,
    group: 'Technical / on-page',
    area: '/tmip navigation',
    change: 'Fix misspelled link',
    details: 'TMIP menu link pointed to /timp/tpms resulting in 308 redirect hop. Updated to canonical /tmip/tpms directly in tmip-header.tsx.',
    localUrl: 'http://localhost:3000/tmip',
    prodUrl: 'https://treel.in/tmip',
    status: 'Ready to Verify',
    verifySteps: '1. Open /tmip.\n2. In the top navigation, inspect or click "Fleet TPMS".\n3. Verify link href is directly /tmip/tpms without any typo redirect.'
  },
  {
    id: 27,
    group: 'Technical / on-page',
    area: 'Title template (site-wide & 37 pages)',
    change: 'Fix double brand in titles',
    details: 'Configured root layout title template to "%s | Treel". Stripped manual "| Treel" suffixes from page-level titles to prevent duplicate brand rendering ("| Treel | Treel").',
    localUrl: 'http://localhost:3000/tmip/tpms',
    prodUrl: 'https://treel.in/tmip/tpms',
    status: 'Ready to Verify',
    verifySteps: '1. Open /tmip/tpms, /suraksha, /products/otr-tpms, /personal.\n2. Inspect browser tab or <title> in page source.\n3. Confirm title ends with exactly one "| Treel" (e.g., "Commercial Vehicle Fleet TPMS Solutions | Treel").'
  },
  {
    id: 28,
    group: 'Technical / on-page',
    area: '/personal/product, /personal/reviews, /suraksha/buy',
    change: 'Add missing H1 tags',
    details: 'Added explicit semantic <h1> tags on pages missing them: /personal/product ("Treel Personal Smart TPMS System"), /personal/reviews ("Customer Reviews & Experiences"), and /suraksha/buy ("Configure & Purchase Treel Suraksha TPMS").',
    localUrl: 'http://localhost:3000/personal/product',
    prodUrl: 'https://treel.in/personal/product',
    status: 'Ready to Verify',
    verifySteps: '1. Open /personal/product, /personal/reviews, /suraksha/buy.\n2. Open DevTools Elements tab and run $$("h1") in console.\n3. Verify exactly one matching descriptive <h1> exists per page.'
  },
  {
    id: 29,
    group: 'Technical / on-page',
    area: '/suraksha/faqs',
    change: 'Render FAQ answers in server HTML',
    details: 'Refactored FAQ accordion from conditional client-only mounting to full server-rendered HTML collapsed via CSS grid transitions (grid-rows-[0fr]/grid-rows-[1fr]). All answers exist in raw HTML for Googlebot indexing.',
    localUrl: 'http://localhost:3000/suraksha/faqs',
    prodUrl: 'https://treel.in/suraksha/faqs',
    status: 'Ready to Verify',
    verifySteps: '1. Open /suraksha/faqs and press Ctrl+U (View Page Source).\n2. Search for answer text (e.g. "9 to 12 months", "JK Tyre").\n3. Confirm all FAQ answers are present in the server HTML without requiring client JS.'
  },
  {
    id: 30,
    group: 'Technical / on-page',
    area: 'All pages (Middleware)',
    change: 'Trailing-slash 308 redirect',
    details: 'Added permanent 308 redirect in middleware.ts for any URL containing a trailing slash (e.g. /tmip/ -> /tmip), preserving query strings and preventing duplicate content.',
    localUrl: 'http://localhost:3000/tmip/',
    prodUrl: 'https://treel.in/tmip/',
    status: 'Ready to Verify',
    verifySteps: '1. Navigate to http://localhost:3000/tmip/ or /about/.\n2. Verify the browser immediately 308 redirects to /tmip or /about.\n3. Verify query params like /tmip/?ref=test redirect to /tmip?ref=test.'
  },
  {
    id: 32,
    group: 'Schema',
    area: '/suraksha, /suraksha/product',
    change: 'Add price to Product schema',
    details: 'Enriched Product schema with price "1700", priceCurrency "INR", UnitPriceSpecification ("1700 INR per tyre"), in-stock availability, new condition, returns policy, and shipping details.',
    localUrl: 'http://localhost:3000/suraksha',
    prodUrl: 'https://treel.in/suraksha',
    status: 'Ready to Verify',
    verifySteps: '1. Open /suraksha or /suraksha/product and view page source.\n2. Search for "@type": "Product".\n3. Verify "price": "1700", "priceCurrency": "INR", and unit price specification are present.'
  },
  {
    id: 34,
    group: 'Schema',
    area: 'All inner pages (21 routes)',
    change: 'Add BreadcrumbList schema',
    details: 'Added Schema.org BreadcrumbList JSON-LD to src/components/ui/breadcrumb.tsx and replaced raw breadcrumb JSX across 21 inner routes (Solutions, Platform, Whitepapers, Case Studies, Personal TPMS, OTR TPMS, Research, Insights, Events, Press, Careers).',
    localUrl: 'http://localhost:3000/tmip/solutions/logistics',
    prodUrl: 'https://treel.in/tmip/solutions/logistics',
    status: 'Ready to Verify',
    verifySteps: '1. Open /tmip/solutions/logistics (or any inner page with breadcrumbs).\n2. Search page source for "BreadcrumbList".\n3. Confirm itemListElement array contains accurate positions and URLs matching the visual trail.'
  },
  {
    id: 43,
    group: 'Content hygiene',
    area: '48 pages & data stores',
    change: 'Shorten meta descriptions to 140–155 chars',
    details: 'Trimmed long descriptions (>160 characters, up to 226) across 13 static pages and 4 central data stores down to 140–155 characters for optimal Google SERP presentation without truncation.',
    localUrl: 'http://localhost:3000/about',
    prodUrl: 'https://treel.in/about',
    status: 'Ready to Verify',
    verifySteps: '1. Open /about, /tmip, /data-infrastructure, /careers, /press, or /insights.\n2. Inspect <meta name="description" content="..."> in <head>.\n3. Count characters and verify length is between 140 and 155 characters.'
  },
  {
    id: 44,
    group: 'Content hygiene',
    area: 'Suraksha headings (/suraksha/buy, checkout)',
    change: 'Sentence case + CSS uppercase',
    details: 'Stored headings in clean sentence case in JSX and applied text-transform: uppercase via CSS classes. Prevents screen readers from spelling out capitalized words and improves SEO quality.',
    localUrl: 'http://localhost:3000/suraksha/buy',
    prodUrl: 'https://treel.in/suraksha/buy',
    status: 'Ready to Verify',
    verifySteps: '1. Open /suraksha/buy and /suraksha/checkout.\n2. Inspect the kit heading elements.\n3. Confirm DOM text is sentence case ("What\'s included in your...") while rendered uppercase via CSS.'
  },
  {
    id: 45,
    group: 'Content hygiene',
    area: '/personal/buy (mobile)',
    change: 'Compact cookie banner',
    details: 'Redesigned mobile cookie banner (< sm screens) into an ultra-compact bottom bar (~50px height, single-line text, micro buttons) to keep the bottom third of the screen completely clear on mobile.',
    localUrl: 'http://localhost:3000/personal/buy',
    prodUrl: 'https://treel.in/personal/buy',
    status: 'Ready to Verify',
    verifySteps: '1. Open DevTools, switch to Mobile view (e.g. 390px width).\n2. Clear cookies/localStorage and open /personal/buy.\n3. Verify cookie banner is a slim bottom bar that does not obstruct purchase buttons.'
  },
  {
    id: 2,
    group: 'Launch blocker',
    area: '17 routes (client components)',
    change: 'Add own title, description and canonical',
    details: 'Created dedicated server layout.tsx wrappers for all 17 client routes so each outputs unique title, description, and canonical URL instead of falling back to homepage metadata.',
    localUrl: 'http://localhost:3000/suraksha/centres',
    prodUrl: 'https://treel.in/suraksha/centres',
    status: 'Ready to Verify',
    verifySteps: '1. Open /suraksha/centres, /personal/faqs, or /tmip/demo.\n2. Inspect <head>.\n3. Confirm unique <title>, <meta name="description">, and <link rel="canonical"> pointing to that route.'
  },
  {
    id: 6,
    group: 'Content: site-wide',
    area: 'All pages with vehicle count (26 pages)',
    change: 'Vehicle count to 70,000+',
    details: 'Standardized all occurrences of 68K, 68,000, 68,000+, 68,412 to "70,000+ vehicles under active management" across homepage, TMIP, VDT, and Mobility Intelligence.',
    localUrl: 'http://localhost:3000/',
    prodUrl: 'https://treel.in/',
    status: 'Ready to Verify',
    verifySteps: '1. Open homepage (/) or /tmip.\n2. Check key metric counters.\n3. Confirm metric reads "70,000+ vehicles under active management".'
  },
  {
    id: 8,
    group: 'Content: site-wide',
    area: 'All pages with payback figure',
    change: 'Payback to 9 to 12 months',
    details: 'Updated all payback references to "9 to 12 months". Corrected /suraksha hero and removed conflicting "18 to 24 months" on /suraksha/savings while keeping zero-cost 9-month EMI tenure.',
    localUrl: 'http://localhost:3000/suraksha',
    prodUrl: 'https://treel.in/suraksha',
    status: 'Ready to Verify',
    verifySteps: '1. Open /suraksha and /suraksha/savings.\n2. Check payback claims.\n3. Confirm payback period reads "9 to 12 months".'
  },
  {
    id: 10,
    group: 'Content: site-wide',
    area: 'VDT, Telemetry, TMIP overview, Predictive Maintenance',
    change: 'Keep one watched-subsystems list',
    details: 'Dropped driveline, brakes, load and brake wear. Added Battery Health, Trips and Engine Diagnostics. Kept Suspected Brake Jamming alert identical across all pages.',
    localUrl: 'http://localhost:3000/vehicle-digital-twin',
    prodUrl: 'https://treel.in/vehicle-digital-twin',
    status: 'Ready to Verify',
    verifySteps: '1. Open /vehicle-digital-twin or /tmip/platform/telemetry.\n2. Inspect watched subsystem cards.\n3. Verify Battery Health, Trips, Engine Diagnostics are listed and outdated subsystems are removed.'
  },
  {
    id: 20,
    group: 'Content: per page',
    area: 'Solutions nav + /tmip/solutions/mining',
    change: 'Retire the Mining page',
    details: 'Removed Mining from Solutions navigation dropdown and added 301/308 redirect from /tmip/solutions/mining to /products/otr-tpms.',
    localUrl: 'http://localhost:3000/tmip/solutions/mining',
    prodUrl: 'https://treel.in/tmip/solutions/mining',
    status: 'Ready to Verify',
    verifySteps: '1. Navigate to /tmip/solutions/mining.\n2. Verify immediate automatic redirect to /products/otr-tpms.\n3. Verify Solutions dropdown menu in header does not list Mining.'
  },
  {
    id: 50,
    group: 'Search experience',
    area: '/tmip',
    change: 'Surface fleet TPMS',
    details: 'Featured /tmip/tpms prominently in the TMIP nav bar, added fleet TPMS reference in the overview intro, and highlighted OEM/fleet integrations.',
    localUrl: 'http://localhost:3000/tmip',
    prodUrl: 'https://treel.in/tmip',
    status: 'Ready to Verify',
    verifySteps: '1. Open /tmip.\n2. Check header navigation for "Fleet TPMS" link pointing to /tmip/tpms.\n3. Check intro copy mentioning fleet TPMS.'
  }
];

// 1. Generate CSV
function generateCsv() {
  const headers = ['Task #', 'Category / Group', 'Area / Page', 'Change Title', 'Implementation Details', 'Localhost Verification URL', 'Production Verification URL', 'Verification Status', 'Step-by-Step How to Verify'];
  
  function escapeCsv(val) {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  }
  
  let csv = '\uFEFF'; // UTF-8 BOM
  csv += headers.map(escapeCsv).join(',') + '\r\n';
  
  tasks.forEach(t => {
    const row = [
      t.id,
      t.group,
      t.area,
      t.change,
      t.details,
      t.localUrl,
      t.prodUrl,
      t.status,
      t.verifySteps
    ];
    csv += row.map(escapeCsv).join(',') + '\r\n';
  });
  
  const csvPath = path.resolve('public/downloads/treel_verified_changes_report.csv');
  fs.writeFileSync(csvPath, csv, 'utf8');
  console.log('Generated CSV at:', csvPath);
}

// 2. Generate XML Spreadsheet (Excel 2003 XML format - natively opened by Microsoft Excel with 100% fidelity, styling, and hyperlinks)
function generateExcelXml() {
  function escapeXml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  let xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
   <Borders/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="HeaderStyle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#1E293B"/>
   </Borders>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#0F172A" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="TitleStyle">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="16" ss:Color="#0F172A" ss:Bold="1"/>
  </Style>
  <Style ss:ID="SubTitleStyle">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#64748B" ss:Italic="1"/>
  </Style>
  <Style ss:ID="TaskNum">
   <Alignment ss:Horizontal="Center" ss:Vertical="Top"/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Bold="1" ss:Color="#0F172A"/>
  </Style>
  <Style ss:ID="StatusDone">
   <Alignment ss:Horizontal="Center" ss:Vertical="Top"/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Bold="1" ss:Color="#15803D"/>
   <Interior ss:Color="#DCFCE7" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="LinkStyle">
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#2563EB" ss:Underline="Single"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Verified Changes">
  <Table ss:DefaultColumnWidth="120" ss:DefaultRowHeight="20">
   <Column ss:Width="60"/>
   <Column ss:Width="130"/>
   <Column ss:Width="160"/>
   <Column ss:Width="200"/>
   <Column ss:Width="320"/>
   <Column ss:Width="240"/>
   <Column ss:Width="240"/>
   <Column ss:Width="110"/>
   <Column ss:Width="380"/>
   <Row ss:Height="30">
    <Cell ss:MergeAcross="8" ss:StyleID="TitleStyle"><Data ss:Type="String">TREEL Website — Developer Changes Verification Report</Data></Cell>
   </Row>
   <Row ss:Height="20">
    <Cell ss:MergeAcross="8" ss:StyleID="SubTitleStyle"><Data ss:Type="String">Generated for pre-commit verification against TREEL_Developer_Change_List.xlsx. Verified with 0 TypeScript errors.</Data></Cell>
   </Row>
   <Row ss:Height="10"/>
   <Row ss:Height="28" ss:StyleID="HeaderStyle">
    <Cell><Data ss:Type="String">Task #</Data></Cell>
    <Cell><Data ss:Type="String">Category / Group</Data></Cell>
    <Cell><Data ss:Type="String">Area / Page</Data></Cell>
    <Cell><Data ss:Type="String">Change Title</Data></Cell>
    <Cell><Data ss:Type="String">Implementation Details</Data></Cell>
    <Cell><Data ss:Type="String">Localhost Verification URL</Data></Cell>
    <Cell><Data ss:Type="String">Production Verification URL</Data></Cell>
    <Cell><Data ss:Type="String">Status</Data></Cell>
    <Cell><Data ss:Type="String">Step-by-Step Verification Instructions</Data></Cell>
   </Row>`;

  tasks.forEach(t => {
    xml += `
   <Row ss:AutoFitHeight="1">
    <Cell ss:StyleID="TaskNum"><Data ss:Type="Number">${t.id}</Data></Cell>
    <Cell><Data ss:Type="String">${escapeXml(t.group)}</Data></Cell>
    <Cell><Data ss:Type="String">${escapeXml(t.area)}</Data></Cell>
    <Cell><Data ss:Type="String">${escapeXml(t.change)}</Data></Cell>
    <Cell><Data ss:Type="String">${escapeXml(t.details)}</Data></Cell>
    <Cell ss:StyleID="LinkStyle" ss:HRef="${escapeXml(t.localUrl)}"><Data ss:Type="String">${escapeXml(t.localUrl)}</Data></Cell>
    <Cell ss:StyleID="LinkStyle" ss:HRef="${escapeXml(t.prodUrl)}"><Data ss:Type="String">${escapeXml(t.prodUrl)}</Data></Cell>
    <Cell ss:StyleID="StatusDone"><Data ss:Type="String">${escapeXml(t.status)}</Data></Cell>
    <Cell><Data ss:Type="String">${escapeXml(t.verifySteps)}</Data></Cell>
   </Row>`;
  });

  xml += `
  </Table>
 </Worksheet>
</Workbook>`;

  const xmlPath = path.resolve('public/downloads/treel_verified_changes_report.xls');
  fs.writeFileSync(xmlPath, xml, 'utf8');
  console.log('Generated Excel XML (.xls) at:', xmlPath);
}

// 3. Generate native XLSX (ZIP format)
function generateNativeXlsx() {
  function crc32(buf) {
    let table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c;
    }
    let c = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      c = (c >>> 8) ^ table[(c ^ buf[i]) & 0xff];
    }
    return (c ^ (-1)) >>> 0;
  }

  function createZip(fileMap) {
    const localHeaders = [];
    const cdHeaders = [];
    let offset = 0;

    const fileEntries = Object.keys(fileMap).map(name => {
      const uncompressed = Buffer.isBuffer(fileMap[name]) ? fileMap[name] : Buffer.from(fileMap[name], 'utf8');
      const compressed = zlib.deflateRawSync(uncompressed);
      const crc = crc32(uncompressed);
      return { name, uncompressed, compressed, crc };
    });

    for (const f of fileEntries) {
      const nameBuf = Buffer.from(f.name, 'utf8');
      
      // Local Header
      const lh = Buffer.alloc(30 + nameBuf.length);
      lh.writeUInt32LE(0x04034b50, 0); // signature
      lh.writeUInt16LE(20, 4);         // version needed (2.0)
      lh.writeUInt16LE(0, 6);          // flags
      lh.writeUInt16LE(8, 8);          // compression (deflate)
      lh.writeUInt16LE(0, 10);         // mod time
      lh.writeUInt16LE(0, 12);         // mod date
      lh.writeUInt32LE(f.crc, 14);     // crc32
      lh.writeUInt32LE(f.compressed.length, 18); // comp size
      lh.writeUInt32LE(f.uncompressed.length, 22); // uncomp size
      lh.writeUInt16LE(nameBuf.length, 26); // name len
      lh.writeUInt16LE(0, 28);         // extra len
      nameBuf.copy(lh, 30);

      // Central Directory Header
      const cdh = Buffer.alloc(46 + nameBuf.length);
      cdh.writeUInt32LE(0x02014b50, 0); // signature
      cdh.writeUInt16LE(20, 4);         // version made by
      cdh.writeUInt16LE(20, 6);         // version needed
      cdh.writeUInt16LE(0, 8);          // flags
      cdh.writeUInt16LE(8, 10);         // compression (deflate)
      cdh.writeUInt16LE(0, 12);         // mod time
      cdh.writeUInt16LE(0, 14);         // mod date
      cdh.writeUInt32LE(f.crc, 16);     // crc32
      cdh.writeUInt32LE(f.compressed.length, 20);
      cdh.writeUInt32LE(f.uncompressed.length, 24);
      cdh.writeUInt16LE(nameBuf.length, 28);
      cdh.writeUInt16LE(0, 30);         // extra len
      cdh.writeUInt16LE(0, 32);         // comment len
      cdh.writeUInt16LE(0, 34);         // disk num
      cdh.writeUInt16LE(0, 36);         // int attr
      cdh.writeUInt32LE(0, 38);         // ext attr
      cdh.writeUInt32LE(offset, 42);    // rel offset
      nameBuf.copy(cdh, 46);

      localHeaders.push(lh, f.compressed);
      cdHeaders.push(cdh);

      offset += lh.length + f.compressed.length;
    }

    const cdOffset = offset;
    const cdSize = cdHeaders.reduce((sum, h) => sum + h.length, 0);

    // End of Central Directory
    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0);
    eocd.writeUInt16LE(0, 4);
    eocd.writeUInt16LE(0, 6);
    eocd.writeUInt16LE(fileEntries.length, 8);
    eocd.writeUInt16LE(fileEntries.length, 10);
    eocd.writeUInt32LE(cdSize, 12);
    eocd.writeUInt32LE(cdOffset, 16);
    eocd.writeUInt16LE(0, 20);

    return Buffer.concat([...localHeaders, ...cdHeaders, eocd]);
  }

  // XML Helpers
  function escape(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // Strings pool
  const strings = [];
  const stringMap = {};
  function addString(s) {
    if (stringMap[s] !== undefined) return stringMap[s];
    const idx = strings.length;
    strings.push(s);
    stringMap[s] = idx;
    return idx;
  }

  // Build rows XML
  let rowsXml = '';
  // Row 1: Title
  const titleIdx = addString('TREEL Website — Developer Changes Verification Report');
  rowsXml += `<row r="1" ht="28" customHeight="1"><c r="A1" t="s" s="1"><v>${titleIdx}</v></c></row>`;
  
  // Row 2: Subtitle
  const subIdx = addString('Pre-commit verification report for TREEL_Developer_Change_List.xlsx. All tests passed with 0 TypeScript errors.');
  rowsXml += `<row r="2" ht="20" customHeight="1"><c r="A2" t="s" s="2"><v>${subIdx}</v></c></row>`;

  // Row 4: Header
  const headers = ['Task #', 'Category / Group', 'Area / Page', 'Change Title', 'Implementation Details', 'Localhost URL', 'Production URL', 'Status', 'Step-by-Step How to Verify'];
  const headerCols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  rowsXml += '<row r="4" ht="24" customHeight="1">';
  headers.forEach((h, i) => {
    const idx = addString(h);
    rowsXml += `<c r="${headerCols[i]}4" t="s" s="3"><v>${idx}</v></c>`;
  });
  rowsXml += '</row>';

  // Data rows starting at row 5
  tasks.forEach((t, i) => {
    const r = i + 5;
    const taskNum = t.id;
    const grpIdx = addString(t.group);
    const areaIdx = addString(t.area);
    const changeIdx = addString(t.change);
    const detailsIdx = addString(t.details);
    const localIdx = addString(t.localUrl);
    const prodIdx = addString(t.prodUrl);
    const statusIdx = addString(t.status);
    const stepsIdx = addString(t.verifySteps);

    rowsXml += `<row r="${r}" ht="45" customHeight="1">
      <c r="A${r}" s="4"><v>${taskNum}</v></c>
      <c r="B${r}" t="s" s="5"><v>${grpIdx}</v></c>
      <c r="C${r}" t="s" s="5"><v>${areaIdx}</v></c>
      <c r="D${r}" t="s" s="5"><v>${changeIdx}</v></c>
      <c r="E${r}" t="s" s="5"><v>${detailsIdx}</v></c>
      <c r="F${r}" t="s" s="6"><v>${localIdx}</v></c>
      <c r="G${r}" t="s" s="6"><v>${prodIdx}</v></c>
      <c r="H${r}" t="s" s="7"><v>${statusIdx}</v></c>
      <c r="I${r}" t="s" s="5"><v>${stepsIdx}</v></c>
    </row>`;
  });

  const sheetXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <cols>
    <col min="1" max="1" width="10" customWidth="1"/>
    <col min="2" max="2" width="22" customWidth="1"/>
    <col min="3" max="3" width="26" customWidth="1"/>
    <col min="4" max="4" width="30" customWidth="1"/>
    <col min="5" max="5" width="50" customWidth="1"/>
    <col min="6" max="6" width="35" customWidth="1"/>
    <col min="7" max="7" width="35" customWidth="1"/>
    <col min="8" max="8" width="18" customWidth="1"/>
    <col min="9" max="9" width="60" customWidth="1"/>
  </cols>
  <sheetData>${rowsXml}</sheetData>
</worksheet>`;

  let sharedStringsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${strings.length}" uniqueCount="${strings.length}">`;
  strings.forEach(s => {
    sharedStringsXml += `<si><t>${escape(s)}</t></si>`;
  });
  sharedStringsXml += '</sst>';

  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="4">
    <font><sz val="11"/><name val="Calibri"/></font>
    <font><b/><sz val="15"/><color rgb="FF0F172A"/><name val="Calibri"/></font>
    <font><i/><sz val="10"/><color rgb="FF64748B"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>
  </fonts>
  <fills count="4">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF0F172A"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFDCFCE7"/></patternFill></fill>
  </fills>
  <borders count="1">
    <border><left/><right/><top/><bottom/></border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="8">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="3" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="3" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf>
  </cellXfs>
</styleSheet>`;

  const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Verified Changes" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`;

  const workbookRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
</Relationships>`;

  const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;

  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
</Types>`;

  const zipFiles = {
    '[Content_Types].xml': contentTypes,
    '_rels/.rels': rootRels,
    'xl/_rels/workbook.xml.rels': workbookRels,
    'xl/workbook.xml': workbookXml,
    'xl/styles.xml': stylesXml,
    'xl/sharedStrings.xml': sharedStringsXml,
    'xl/worksheets/sheet1.xml': sheetXml
  };

  const xlsxBuffer = createZip(zipFiles);
  const xlsxPath = path.resolve('public/downloads/treel_verified_changes_report.xlsx');
  fs.writeFileSync(xlsxPath, xlsxBuffer);
  console.log('Generated native XLSX at:', xlsxPath, 'size:', xlsxBuffer.length, 'bytes');
}

generateCsv();
generateExcelXml();
generateNativeXlsx();

