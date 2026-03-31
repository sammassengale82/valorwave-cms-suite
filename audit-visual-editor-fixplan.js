#!/usr/bin/env node

/**
 * Valorwave Visual Editor – Fix Plan Generator
 * --------------------------------------------------------------
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
 * This script does NOT modify any files.
 */

const fs = require("fs");
const path = require("path");

const REPORT_FILE = "visual-editor-audit.json";

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

// ----------------------
// MUST FIX
// ----------------------
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

// ----------------------
// SHOULD FIX
// ----------------------
report.unusedFiles.forEach((f) =>
  shouldFix.push(`Unused file: ${short(f)}`)
);

report.unusedExports.forEach((e) =>
  shouldFix.push(`Unused export "${e.name}" in ${short(e.file)}`)
);

report.css.unusedClasses.forEach((c) =>
  shouldFix.push(`Unused CSS class: ".${c}"`)
);

// ----------------------
// NICE TO FIX
// ----------------------
report.reactProps.unusedProps.forEach((p) =>
  niceToFix.push(
    `Unused React prop "${p.prop}" in component ${p.component} (${short(p.file)})`
  )
);

// ------------------------------------------------------------
// Output Fix Plan
// ------------------------------------------------------------
console.log("\n====================================================");
console.log("🔥 VALORWAVE VISUAL EDITOR – FIX PLAN");
console.log("====================================================\n");

console.log("📌 MUST FIX (Critical issues)\n");
if (mustFix.length === 0) console.log("  ✔ No critical issues detected.\n");
else mustFix.forEach((i) => console.log("  - " + i));

console.log("\n📌 SHOULD FIX (Recommended cleanup)\n");
if (shouldFix.length === 0) console.log("  ✔ No recommended cleanup items.\n");
else shouldFix.forEach((i) => console.log("  - " + i));

console.log("\n📌 NICE TO FIX (Quality improvements)\n");
if (niceToFix.length === 0) console.log("  ✔ No minor issues.\n");
else niceToFix.forEach((i) => console.log("  - " + i));

console.log("\n====================================================");
console.log("🛠️  RECONSTRUCTION PLAN");
console.log("====================================================\n");

// Missing files
if (report.missingRequiredFiles.length > 0) {
  console.log("📄 Missing Required Files:");
  report.missingRequiredFiles.forEach((f) =>
    console.log("  - Create file:", short(f))
  );
  console.log("");
}

// Missing components
if (report.missingComponents.length > 0) {
  console.log("🧩 Missing Components:");
  report.missingComponents.forEach((c) =>
    console.log(
      `  - Create component "${c.component}" (referenced in ${short(c.file)})`
    )
  );
  console.log("");
}

// Missing templates
if (report.missingTemplates.length > 0) {
  console.log("📄 Missing Templates:");
  report.missingTemplates.forEach((t) =>
    console.log(
      `  - Create template "${t.template}" (referenced in ${short(t.file)})`
    )
  );
  console.log("");
}

console.log("====================================================");
console.log("🎨 CSS CLEANUP PLAN");
console.log("====================================================\n");

if (report.css.unusedClasses.length === 0) {
  console.log("✔ All CSS classes are used.\n");
} else {
  report.css.unusedClasses.forEach((c) =>
    console.log(`  - Remove or verify unused class ".${c}"`)
  );
  console.log("");
}

console.log("====================================================");
console.log("🧩 REACT PROPS CLEANUP PLAN");
console.log("====================================================\n");

if (report.reactProps.unusedProps.length === 0) {
  console.log("✔ No unused props detected.\n");
} else {
  report.reactProps.unusedProps.forEach((p) =>
    console.log(
      `  - Remove unused prop "${p.prop}" from ${p.component} (${short(p.file)})`
    )
  );
  console.log("");
}

console.log("====================================================");
console.log("🔗 DEPENDENCY CLEANUP PLAN");
console.log("====================================================\n");

if (report.circularDependencies.length === 0) {
  console.log("✔ No circular dependencies.\n");
} else {
  report.circularDependencies.forEach((cycle) =>
    console.log("  - Break cycle:", cycle.map(short).join(" → "))
  );
  console.log("");
}

console.log("====================================================");
console.log("✅ FIX PLAN COMPLETE");
console.log("====================================================\n");