const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('C:/Users/itadm/.gemini/antigravity/brain/3f8641c4-aa60-41b3-81da-b99ae899c8b2/.user_uploaded/media_1793596559697_eabf2d49.xlsx');

function extractZip(buffer) {
  const files = {};
  let i = 0;
  while (i < buffer.length - 4) {
    if (buffer.readUInt32LE(i) === 0x04034b50) {
      const compMethod = buffer.readUInt16LE(i + 8);
      const compSize = buffer.readUInt32LE(i + 18);
      const nameLen = buffer.readUInt16LE(i + 26);
      const extraLen = buffer.readUInt16LE(i + 28);
      const name = buffer.toString('utf8', i + 30, i + 30 + nameLen);
      const dataStart = i + 30 + nameLen + extraLen;
      const rawData = buffer.slice(dataStart, dataStart + compSize);
      let content;
      if (compMethod === 0) content = rawData;
      else if (compMethod === 8) {
        try { content = zlib.inflateRawSync(rawData); } catch(e) {}
      }
      if (content) files[name] = content;
      i = dataStart + compSize;
    } else {
      i++;
    }
  }
  return files;
}

const files = extractZip(buf);
const sharedStrXml = files['xl/sharedStrings.xml'].toString('utf8');

const strings = [];
const siRegex = /<si>(.*?)<\/si>/gs;
let match;
while ((match = siRegex.exec(sharedStrXml)) !== null) {
  const tMatches = [...match[1].matchAll(/<t[^>]*>(.*?)<\/t>/gs)].map(m => m[1]);
  strings.push(tMatches.join(''));
}

const sheetXml = files['xl/worksheets/sheet1.xml'].toString('utf8');
const rows = [];
const rowRegex = /<row r="(\d+)"[^>]*>(.*?)<\/row>/gs;
while ((match = rowRegex.exec(sheetXml)) !== null) {
  const rNum = parseInt(match[1]);
  const rowContent = match[2];
  const cRegex = /<c r="([A-Z]+)\d+"(?: t="([a-z]+)")?[^>]*>(?:<v>(\d+)<\/v>)?<\/c>/g;
  const cols = {};
  let cMatch;
  while ((cMatch = cRegex.exec(rowContent)) !== null) {
    const colName = cMatch[1];
    const type = cMatch[2];
    const val = cMatch[3];
    if (val !== undefined) {
      if (type === 's') {
        cols[colName] = strings[parseInt(val)];
      } else {
        cols[colName] = val;
      }
    }
  }
  rows.push({ rNum, cols });
}
const tasks = rows.filter(r => r.cols.A && !isNaN(parseInt(r.cols.A))).map(r => ({
  id: parseInt(r.cols.A),
  group: r.cols.B || '',
  area: r.cols.C || '',
  change: r.cols.D || '',
  details: r.cols.E || '',
  source: r.cols.F || '',
  priority: r.cols.G || '',
  dependsOn: r.cols.H || '',
  status: r.cols.I || ''
}));
tasks.filter(t => [2, 6, 8, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 34, 37, 38, 39, 42, 43, 44, 45, 50].includes(t.id)).forEach(t => {
  console.log(`TASK ${t.id} | ${t.group} | ${t.area} | ${t.change} | ${t.details}`);
});
