#!/usr/bin/env node

/**
 * Valorwave Visual Editor – Fix Plan Generator (DOC/TXT OUTPUT EDITION)
 * -----------------------------------------------------------------------
 * This script reads visual-editor-audit.json and produces:
 *
 *  - Must-Fix issues
 *  - Should-Fix issues
 *  - Nice-to-Fix issues
 *  - Missing file reconstruction plan
 *  - Component repair plan
 *  - CSS cleanup plan
 *  - Props cleanup plan
 *  - Dependency cleanup plan
 *
 * AND ALSO:
 *  - Writes a full DOC-style report to: visual-editor-fix-report.txt
 *
 * This script does NOT modify any project files.
 */

const fs = require("fs");
const path = require("path");

const REPORT_FILE = "visual-editor-audit.json";
const OUTPUT_FILE = "visual-editor-fix-report.txt";

if (!fs.existsSync(REPORT_FILE)) {
  console.error("❌ ERROR: visual-editor-audit.json not found. Run the audit script first.");
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(REPORT_FILE, "utf8"));

// ------------------------------------------------------------
// Helper: Format file paths
// ------------------------------------------------------------
function short(p) {
  return p.replace(process.cwd(), "").replace(/\\/g, "/");
}

// ------------------------------------------------------------
// Build Fix Categories
// ------------------------------------------------------------
const mustFix = [];
const shouldFix = [];
const niceToFix = [];

// MUST FIX
report.brokenImports.forEach((b) =>
  mustFix.push(`Broken import in ${short(b.file)} → "${b.import}"`)
);

report.missingComponents.forEach((c) =>
  mustFix.push(`Missing React component "${c.component}" referenced in ${short(c.file)}`)
);

report.missingTemplates.forEach((t) =>
  mustFix.push(`Missing template "${t.template}" referenced in ${short(t.file)}`)
);

report.missingRequiredFiles.forEach((f) =>
  mustFix.push(`Required file missing: ${short(f)}`)
);

report.circularDependencies.forEach((cycle) =>
  mustFix.push(`Circular dependency: ${cycle.map(short).join(" → ")}`)
);

// SHOULD FIX
report.unusedFiles.forEach((f) =>
  shouldFix.push(`Unused file: ${short(f)}`)
);

report.unusedExports.forEach((e) =>
  shouldFix.push(`Unused export "${e.name}" in ${short(e.file)}`)
);

report.css.unusedClasses.forEach((c) =>
  shouldFix.push(`Unused CSS class: ".${c}"`)
);

// NICE TO FIX
report.reactProps.unusedProps.forEach((p) =>
  niceToFix.push(
    `Unused React prop "${p.prop}" in component ${p.component} (${short(p.file)})`
  )
);

// ------------------------------------------------------------
// Build DOC/TXT Report
// ------------------------------------------------------------
let doc = "";

function section(title) {
  doc += `\n============================================================\n`;
  doc += `${title}\n`;
  doc += `============================================================\n\n`;
}

function list(items) {
  if (items.length === 0) {
    doc += `✔ None\n\n`;
  } else {
    items.forEach((i) => (doc += `• ${i}\n`));
    doc += `\n`;
  }
}

doc += `VALORWAVE VISUAL EDITOR – FULL FIX PLAN REPORT\n`;
doc += `Generated: ${new Date().toLocaleString()}\n`;
doc += `Source: visual-editor-audit.json\n`;

section("MUST FIX (Critical Issues)");
list(mustFix);

section("SHOULD FIX (Recommended Cleanup)");
list(shouldFix);

section("NICE TO FIX (Quality Improvements)");
list(niceToFix);

section("RECONSTRUCTION PLAN – Missing Required Files");
list(report.missingRequiredFiles.map((f) => `Create file: ${short(f)}`));

section("RECONSTRUCTION PLAN – Missing Components");
list(
  report.missingComponents.map(
    (c) => `Create component "${c.component}" (referenced in ${short(c.file)})`
  )
);

section("RECONSTRUCTION PLAN – Missing Templates");
list(
  report.missingTemplates.map(
    (t) => `Create template "${t.template}" (referenced in ${short(t.file)})`
  )
);

section("CSS CLEANUP PLAN");
list(report.css.unusedClasses.map((c) => `Remove or verify unused class ".${c}"`));

section("REACT PROPS CLEANUP PLAN");
list(
  report.reactProps.unusedProps.map(
    (p) => `Remove unused prop "${p.prop}" from ${p.component} (${short(p.file)})`
  )
);

section("DEPENDENCY CLEANUP PLAN");
list(
  report.circularDependencies.map(
    (cycle) => `Break cycle: ${cycle.map(short).join(" → ")}`
  )
);

// ------------------------------------------------------------
// Write report file
// ------------------------------------------------------------
fs.writeFileSync(OUTPUT_FILE, doc, "utf8");

console.log("\n====================================================");
console.log("🔥 VALORWAVE VISUAL EDITOR – FIX PLAN");
console.log("====================================================\n");

console.log(doc);

console.log("====================================================");
console.log(`📄 FIX REPORT WRITTEN TO: ${OUTPUT_FILE}`);
console.log("====================================================\n");

console.log("✅ FIX PLAN REPORT COMPLETE\n");
