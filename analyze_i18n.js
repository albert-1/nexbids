const fs = require('fs');
const code = fs.readFileSync('app.js','utf8');

// Extract all t('...','...') calls
const tCalls = new Set();
const regex = /\bt\s*\(\s*'((?:[^'\\]|\\.)*)'\s*,/g;
let m;
while ((m = regex.exec(code)) !== null) {
  tCalls.add(m[1].replace(/\\'/g,"'"));
}

// Extract CONTENT_T keys
const ctKeys = new Set();
const ctMatch = code.match(/const CONTENT_T = \{([\s\S]*?)^\};/m);
if (ctMatch) {
  const keyRegex = /^  '((?:[^'\\]|\\.)*)'\s*:/mg;
  let km;
  while ((km = keyRegex.exec(ctMatch[1])) !== null) {
    ctKeys.add(km[1].replace(/\\'/g,"'"));
  }
}

const missing = [...tCalls].filter(k => !ctKeys.has(k));
console.log('Total t() keys:', tCalls.size);
console.log('CONTENT_T keys:', ctKeys.size);
console.log('Missing:', missing.length);
fs.writeFileSync('missing_keys.json', JSON.stringify(missing, null, 2));
console.log('Written to missing_keys.json');
