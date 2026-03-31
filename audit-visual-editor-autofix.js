#!/usr/bin/env node

/**
 * Valorwave Visual Editor – Auto-Fix Script
 * --------------------------------------------------------------
 * This script reads visual-editor-audit.json and automatically:
 *
 *  - Creates missing required files
 *  - Creates missing React components
 *  - Creates missing templates
 *  - Generates correct boilerplate for each file type
 *  - Creates parent folders if needed
 *  - NEVER overwrites existing files
 *
 * This script does NOT modify or delete anything.
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
// Helpers
// ------------------------------------------------------------
function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeIfMissing(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log("⏭️  Skipped (already exists):", filePath);
    return;
  }

  ensureDir(filePath);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("✨ Created:", filePath);
}

function reactComponentBoilerplate(name) {
  return `import React from "react";

export default function ${name}() {
  return (
    <div className="${name}">
      <h2>${name} Component</h2>
    </div>
  );
}
`;
}

function templateBoilerplate(name) {
  return JSON.stringify(
    {
      name,
      description: `${name} template (auto-generated)`,
      fields: [],
    },
    null,
    2
  );
}

function htmlBoilerplate(title) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
}

function mainTsxBoilerplate() {
  return `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
}

function appTsxBoilerplate() {
  return `import React from "react";

export default function App() {
  return (
    <div className="App">
      <h1>Valorwave Visual Editor</h1>
    </div>
  );
}
`;
}

// ------------------------------------------------------------
// AUTO-FIX EXECUTION
// ------------------------------------------------------------
console.log("\n====================================================");
console.log("🛠️  VALORWAVE VISUAL EDITOR – AUTO FIX");
console.log("====================================================\n");

// ------------------------------------------------------------
// 1. Create missing required files
// ------------------------------------------------------------
console.log("📌 Creating Missing Required Files...\n");

report.missingRequiredFiles.forEach((filePath) => {
  const name = path.basename(filePath);

  if (name === "index.html") {
    writeIfMissing(filePath, htmlBoilerplate("Visual Editor"));
  } else if (name === "main.tsx") {
    writeIfMissing(filePath, mainTsxBoilerplate());
  } else if (name === "App.tsx") {
    writeIfMissing(filePath, appTsxBoilerplate());
  } else {
    writeIfMissing(filePath, `// Auto-generated required file: ${name}\n`);
  }
});

// ------------------------------------------------------------
// 2. Create missing React components
// ------------------------------------------------------------
console.log("\n📌 Creating Missing React Components...\n");

report.missingComponents.forEach(({ file, component }) => {
  const baseDir = path.dirname(file);
  const compPath = path.join(baseDir, `${component}.tsx`);

  writeIfMissing(compPath, reactComponentBoilerplate(component));
});

// ------------------------------------------------------------
// 3. Create missing templates
// ------------------------------------------------------------
console.log("\n📌 Creating Missing Templates...\n");

report.missingTemplates.forEach(({ file, template }) => {
  const baseDir = path.dirname(file);
  const templatePath = path.join(baseDir, "templates", template);

  const name = path.basename(template, path.extname(template));

  writeIfMissing(templatePath, templateBoilerplate(name));
});

// ------------------------------------------------------------
// DONE
// ------------------------------------------------------------
console.log("\n====================================================");
console.log("✅ AUTO FIX COMPLETE");
console.log("====================================================\n");