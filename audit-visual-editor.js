#!/usr/bin/env node

/**
 * Valorwave Visual Editor – Full Forensic Audit
 * --------------------------------------------------------------
 * This script performs a deep audit of the visual-editor folder:
 *
 *  - Dependency graph
 *  - Unused files
 *  - Unused exports
 *  - Broken imports
 *  - Missing React components
 *  - Missing templates
 *  - Missing inferred required files
 *  - Circular dependencies
 *  - JSON report output
 *
 * Output file: visual-editor-audit.json
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "visual-editor");
const VALID_EXT = [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs", ".json"];

const REPORT_FILE = "visual-editor-audit.json";

// ------------------------------------------------------------
// Utility Helpers
// ------------------------------------------------------------
function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full, fileList);
    } else {
      fileList.push(full);
    }
  }
  return fileList;
}

function extractImports(content) {
  const importRegex = /import\s+.*?from\s+['"](.*?)['"]/g;
  const requireRegex = /require\(['"](.*?)['"]\)/g;

  const imports = [];
  let match;

  while ((match = importRegex.exec(content))) imports.push(match[1]);
  while ((match = requireRegex.exec(content))) imports.push(match[1]);

  return imports;
}

function extractExports(content) {
  const exportRegex =
    /export\s+(?:function|class|const|let|var|async function)\s+([A-Za-z0-9_]+)/g;
  const namedExportRegex = /export\s*{\s*([^}]+)\s*}/g;

  const exports = [];
  let match;

  while ((match = exportRegex.exec(content))) {
    exports.push(match[1]);
  }

  while ((match = namedExportRegex.exec(content))) {
    const names = match[1]
      .split(",")
      .map((n) => n.trim().split(" as ")[0]);
    exports.push(...names);
  }

  return exports;
}

function extractJSXComponents(content) {
  const jsxRegex = /<([A-Z][A-Za-z0-9_]*)\b/g;

  const components = [];
  let match;

  while ((match = jsxRegex.exec(content))) {
    components.push(match[1]);
  }

  return components;
}

function resolveImport(baseFile, importPath) {
  if (!importPath.startsWith(".")) return null; // ignore node_modules

  const baseDir = path.dirname(baseFile);
  const full = path.resolve(baseDir, importPath);

  // Try exact file
  if (fs.existsSync(full)) return full;

  // Try with extensions
  for (const ext of VALID_EXT) {
    if (fs.existsSync(full + ext)) return full + ext;
  }

  // Try index.js inside folder
  for (const ext of VALID_EXT) {
    const indexPath = path.join(full, "index" + ext);
    if (fs.existsSync(indexPath)) return indexPath;
  }

  return null;
}

// ------------------------------------------------------------
// Main Scan
// ------------------------------------------------------------
console.log("🔍 Scanning visual-editor folder:", TARGET);

const allFiles = walk(TARGET).filter((f) =>
  VALID_EXT.includes(path.extname(f))
);

const dependencyGraph = {};
const usedFiles = new Set();
const brokenImports = [];
const exportMap = {};
const exportUsage = {};
const jsxComponentUsage = {};
const missingComponents = [];
const missingTemplates = [];
const missingRequiredFiles = [];

// ------------------------------------------------------------
// First pass: parse imports, exports, JSX
// ------------------------------------------------------------
for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf8");

  const imports = extractImports(content);
  const exports = extractExports(content);
  const jsxComponents = extractJSXComponents(content);

  dependencyGraph[file] = [];
  exportMap[file] = exports;
  jsxComponentUsage[file] = jsxComponents;

  // Track export usage
  exports.forEach((e) => {
    exportUsage[e] = exportUsage[e] || { definedIn: file, usedBy: [] };
  });

  // Resolve imports
  for (const imp of imports) {
    const resolved = resolveImport(file, imp);

    if (resolved) {
      dependencyGraph[file].push(resolved);
      usedFiles.add(resolved);

      // Track export usage
      const importedContent = fs.existsSync(resolved)
        ? fs.readFileSync(resolved, "utf8")
        : "";

      const importedExports = extractExports(importedContent);
      importedExports.forEach((e) => {
        exportUsage[e] = exportUsage[e] || { definedIn: resolved, usedBy: [] };
        exportUsage[e].usedBy.push(file);
      });
    } else if (imp.startsWith(".")) {
      brokenImports.push({ file, import: imp });
    }
  }
}

// ------------------------------------------------------------
// Detect unused files
// ------------------------------------------------------------
const unusedFiles = allFiles.filter((f) => !usedFiles.has(f));

// ------------------------------------------------------------
// Detect unused exports
// ------------------------------------------------------------
const unusedExports = Object.entries(exportUsage)
  .filter(([_, info]) => info.usedBy.length === 0)
  .map(([name, info]) => ({ name, file: info.definedIn }));

// ------------------------------------------------------------
// Detect missing React components
// ------------------------------------------------------------
for (const [file, components] of Object.entries(jsxComponentUsage)) {
  for (const comp of components) {
    const searchPaths = [
      `${comp}.tsx`,
      `${comp}.jsx`,
      `${comp}.ts`,
      `${comp}.js`,
      `${comp}/index.tsx`,
      `${comp}/index.jsx`,
      `${comp}/index.js`,
      `${comp}/index.ts`,
    ];

    const baseDir = path.dirname(file);
    const found = searchPaths.some((p) =>
      fs.existsSync(path.join(baseDir, p))
    );

    if (!found) {
      missingComponents.push({ file, component: comp });
    }
  }
}

// ------------------------------------------------------------
// Detect missing templates
// ------------------------------------------------------------
for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf8");

  const templateRegex = /['"]\.\/templates\/(.*?)['"]/g;
  let match;

  while ((match = templateRegex.exec(content))) {
    const templatePath = path.join(
      path.dirname(file),
      "templates",
      match[1]
    );

    if (!fs.existsSync(templatePath)) {
      missingTemplates.push({
        file,
        template: match[1],
      });
    }
  }
}

// ------------------------------------------------------------
// Detect circular dependencies
// ------------------------------------------------------------
function detectCycles(graph) {
  const visited = new Set();
  const stack = new Set();
  const cycles = [];

  function dfs(node) {
    if (stack.has(node)) {
      cycles.push([...stack, node]);
      return;
    }
    if (visited.has(node)) return;

    visited.add(node);
    stack.add(node);

    for (const dep of graph[node] || []) {
      dfs(dep);
    }

    stack.delete(node);
  }

  Object.keys(graph).forEach(dfs);
  return cycles;
}

const circularDependencies = detectCycles(dependencyGraph);

// ------------------------------------------------------------
// Infer missing required files
// ------------------------------------------------------------
function inferRequiredFiles() {
  const required = [];

  // If main.tsx or App.tsx referenced anywhere
  const common = ["main.tsx", "App.tsx", "index.html"];

  for (const f of common) {
    const full = path.join(TARGET, "src", f);
    if (!fs.existsSync(full)) {
      required.push(full);
    }
  }

  return required;
}

missingRequiredFiles.push(...inferRequiredFiles());

// ------------------------------------------------------------
// Write JSON report
// ------------------------------------------------------------
const report = {
  scannedFiles: allFiles,
  dependencyGraph,
  unusedFiles,
  unusedExports,
  brokenImports,
  missingComponents,
  missingTemplates,
  missingRequiredFiles,
  circularDependencies,
};

fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), "utf8");

// ------------------------------------------------------------
// Console Output
// ------------------------------------------------------------
console.log("\n📁 TOTAL FILES:", allFiles.length);
console.log("📎 USED FILES:", usedFiles.size);
console.log("🗑️ UNUSED FILES:", unusedFiles.length);
console.log("❌ BROKEN IMPORTS:", brokenImports.length);
console.log("⚠️ UNUSED EXPORTS:", unusedExports.length);
console.log("🚫 MISSING COMPONENTS:", missingComponents.length);
console.log("📄 MISSING TEMPLATES:", missingTemplates.length);
console.log("📌 MISSING REQUIRED FILES:", missingRequiredFiles.length);
console.log("🔁 CIRCULAR DEPENDENCIES:", circularDependencies.length);

console.log(`\n📄 JSON report written to: ${REPORT_FILE}\n`);
console.log("✅ Visual Editor Audit complete.\n");