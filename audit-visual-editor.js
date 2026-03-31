#!/usr/bin/env node

/**
 * Valorwave Visual Editor – Full Forensic Audit (Patched & Scoped)
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
 *  - Unused CSS classes
 *  - Unused React props
 *
 * Output file: visual-editor-audit.json
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "visual-editor");
const SRC_DIR = path.join(TARGET, "src");
const PUBLIC_DIR = path.join(TARGET, "public");

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

function safeWalk(dir) {
  return fs.existsSync(dir) ? walk(dir) : [];
}

// ------------------------------------------------------------
// Build scoped file list
// ------------------------------------------------------------

// 1. Root-level files (exclude repo-tree.txt)
const rootFiles = fs
  .readdirSync(TARGET)
  .filter((name) => {
    const full = path.join(TARGET, name);
    return (
      fs.statSync(full).isFile() &&
      name !== "repo-tree.txt" &&
      name !== "package-lock.json" &&
      name !== "yarn.lock"
    );
  })
  .map((name) => path.join(TARGET, name));

// 2. Files inside src/ and public/
const scopedFiles = [
  ...safeWalk(SRC_DIR),
  ...safeWalk(PUBLIC_DIR),
];

// 3. Combine and filter by extension
const allFiles = [...rootFiles, ...scopedFiles].filter((f) =>
  VALID_EXT.includes(path.extname(f))
);

// 4. CSS files
const cssFiles = [...rootFiles, ...scopedFiles].filter(
  (f) => path.extname(f) === ".css"
);

// ------------------------------------------------------------
// Extractors
// ------------------------------------------------------------
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

  while ((match = exportRegex.exec(content))) exports.push(match[1]);

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

// ------------------------------------------------------------
// PATCHED resolveImport (no EISDIR)
// ------------------------------------------------------------
function resolveImport(baseFile, importPath) {
  if (!importPath.startsWith(".")) return null;

  const baseDir = path.dirname(baseFile);
  const full = path.resolve(baseDir, importPath);

  // Exact file
  if (fs.existsSync(full) && fs.statSync(full).isFile()) {
    return full;
  }

  // Try extensions
  for (const ext of VALID_EXT) {
    const candidate = full + ext;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  // Directory → try index files
  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) {
    for (const ext of VALID_EXT) {
      const indexPath = path.join(full, "index" + ext);
      if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
        return indexPath;
      }
    }
    return null;
  }

  return null;
}

// ------------------------------------------------------------
// CSS helpers
// ------------------------------------------------------------
function extractCssClasses(content) {
  const classRegex = /\.([A-Za-z0-9_-]+)\s*[{,]/g;
  const classes = new Set();
  let match;

  while ((match = classRegex.exec(content))) {
    classes.add(match[1]);
  }

  return Array.from(classes);
}

function extractClassNameUsages(content) {
  const usages = new Set();

  const classNameStringRegex = /className\s*=\s*["']([^"']+)["']/g;
  let match;
  while ((match = classNameStringRegex.exec(content))) {
    match[1].split(/\s+/).forEach((c) => usages.add(c));
  }

  const classNameJsxRegex = /className\s*=\s*{\s*['"]([^'"]+)['"]\s*}/g;
  while ((match = classNameJsxRegex.exec(content))) {
    match[1].split(/\s+/).forEach((c) => usages.add(c));
  }

  return Array.from(usages);
}

// ------------------------------------------------------------
// React props helpers
// ------------------------------------------------------------
function extractComponentProps(content, filePath) {
  const results = [];

  const funcRegex =
    /function\s+([A-Z][A-Za-z0-9_]*)\s*\(\s*{([^}]*)}\s*\)\s*{([\s\S]*?)}\s*/g;

  let match;
  while ((match = funcRegex.exec(content))) {
    const compName = match[1];
    const propsList = match[2]
      .split(",")
      .map((p) => p.trim().split(":")[0].split("=")[0].trim())
      .filter(Boolean);
    const body = match[3];

    if (propsList.length > 0) {
      results.push({ file: filePath, component: compName, props: propsList, body });
    }
  }

  const arrowRegex =
    /const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*\(\s*{([^}]*)}\s*\)\s*=>\s*{([\s\S]*?)}\s*/g;

  while ((match = arrowRegex.exec(content))) {
    const compName = match[1];
    const propsList = match[2]
      .split(",")
      .map((p) => p.trim().split(":")[0].split("=")[0].trim())
      .filter(Boolean);
    const body = match[3];

    if (propsList.length > 0) {
      results.push({ file: filePath, component: compName, props: propsList, body });
    }
  }

  return results;
}

function detectUnusedProps(componentsWithProps) {
  const unused = [];

  for (const comp of componentsWithProps) {
    const { file, component, props, body } = comp;

    props.forEach((prop) => {
      const propRegex = new RegExp(`\\b${prop}\\b`, "g");
      if (!propRegex.test(body)) {
        unused.push({ file, component, prop });
      }
    });
  }

  return unused;
}

// ------------------------------------------------------------
// Main Scan
// ------------------------------------------------------------
console.log("🔍 Scanning visual-editor folder:", TARGET);

const dependencyGraph = {};
const usedFiles = new Set();
const brokenImports = [];
const exportMap = {};
const exportUsage = {};
const jsxComponentUsage = {};
const missingComponents = [];
const missingTemplates = [];
const missingRequiredFiles = [];
const allCssClasses = new Set();
const usedCssClasses = new Set();
const componentsWithProps = [];

// ------------------------------------------------------------
// First pass
// ------------------------------------------------------------
for (const cssFile of cssFiles) {
  const cssContent = fs.readFileSync(cssFile, "utf8");
  extractCssClasses(cssContent).forEach((c) => allCssClasses.add(c));
}

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf8");

  const imports = extractImports(content);
  const exports = extractExports(content);
  const jsxComponents = extractJSXComponents(content);
  const classUsages = extractClassNameUsages(content);
  const propsInfo = extractComponentProps(content, file);

  dependencyGraph[file] = [];
  exportMap[file] = exports;
  jsxComponentUsage[file] = jsxComponents;
  propsInfo.forEach((p) => componentsWithProps.push(p));
  classUsages.forEach((c) => usedCssClasses.add(c));

  exports.forEach((e) => {
    exportUsage[e] = exportUsage[e] || { definedIn: file, usedBy: [] };
  });

  for (const imp of imports) {
    const resolved = resolveImport(file, imp);

    if (resolved) {
      dependencyGraph[file].push(resolved);
      usedFiles.add(resolved);

      let importedContent = "";
      if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
        importedContent = fs.readFileSync(resolved, "utf8");
      }

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

  const common = ["main.tsx", "App.tsx", "index.html"];

  for (const f of common) {
    const full =
      f === "index.html"
        ? path.join(TARGET, f)
        : path.join(SRC_DIR, f);
    if (!fs.existsSync(full)) {
      required.push(full);
    }
  }

  return required;
}

missingRequiredFiles.push(...inferRequiredFiles());

// ------------------------------------------------------------
// Detect unused CSS classes
// ------------------------------------------------------------
const unusedCssClasses = Array.from(allCssClasses).filter(
  (c) => !usedCssClasses.has(c)
);

// ------------------------------------------------------------
// Detect unused React props
// ------------------------------------------------------------
const unusedReactProps = detectUnusedProps(componentsWithProps);

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
  css: {
    allClasses: Array.from(allCssClasses),
    usedClasses: Array.from(usedCssClasses),
    unusedClasses: unusedCssClasses,
  },
  reactProps: {
    componentsWithProps: componentsWithProps.map(
      ({ file, component, props }) => ({ file, component, props })
    ),
    unusedProps: unusedReactProps,
  },
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
console.log("🎨 CSS CLASSES (total):", allCssClasses.size);
console.log("🎨 UNUSED CSS CLASSES:", unusedCssClasses.length);
console.log("🧩 COMPONENTS WITH PROPS:", componentsWithProps.length);
console.log("🧩 UNUSED REACT PROPS:", unusedReactProps.length);
console.log("🔁 CIRCULAR DEPENDENCIES:", circularDependencies.length);

console.log(`\n📄 JSON report written to: ${REPORT_FILE}\n`);
console.log("✅ Visual Editor Audit complete.\n");
