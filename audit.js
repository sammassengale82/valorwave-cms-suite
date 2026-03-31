#!/usr/bin/env node

/**
 * Valorwave CMS Suite – File Usage + Dependency Audit
 * ---------------------------------------------------
 * This script scans your repo and reports:
 *  - Which files are used (imported)
 *  - Which files are unused
 *  - Which imports are broken
 *  - Which files talk to each other (dependency graph)
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const VALID_EXT = [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"];

// -------------------------------
// Utility Helpers
// -------------------------------
function walk(dir, fileList = []) {
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
    if (fs.existsSync(path.join(full, "index" + ext))) {
      return path.join(full, "index" + ext);
    }
  }

  return null;
}

// -------------------------------
// Main Audit
// -------------------------------
console.log("🔍 Scanning repo:", ROOT);

const allFiles = walk(ROOT).filter(f => VALID_EXT.includes(path.extname(f)));
const graph = {};
const usedFiles = new Set();
const brokenImports = [];

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf8");
  const imports = extractImports(content);

  graph[file] = [];

  for (const imp of imports) {
    const resolved = resolveImport(file, imp);

    if (resolved) {
      graph[file].push(resolved);
      usedFiles.add(resolved);
    } else if (imp.startsWith(".")) {
      brokenImports.push({ file, import: imp });
    }
  }
}

// -------------------------------
// Unused Files
// -------------------------------
const unusedFiles = allFiles.filter(f => !usedFiles.has(f));

// -------------------------------
// Circular Dependency Detection
// -------------------------------
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

const cycles = detectCycles(graph);

// -------------------------------
// Output
// -------------------------------
console.log("\n📁 TOTAL FILES:", allFiles.length);
console.log("📎 USED FILES:", usedFiles.size);
console.log("🗑️ UNUSED FILES:", unusedFiles.length);
console.log("❌ BROKEN IMPORTS:", brokenImports.length);
console.log("🔁 CIRCULAR DEPENDENCIES:", cycles.length);

console.log("\n===============================");
console.log("UNUSED FILES");
console.log("===============================");
unusedFiles.forEach(f => console.log(" -", f));

console.log("\n===============================");
console.log("BROKEN IMPORTS");
console.log("===============================");
brokenImports.forEach(b =>
  console.log(` - ${b.file} → ${b.import}`)
);

console.log("\n===============================");
console.log("CIRCULAR DEPENDENCIES");
console.log("===============================");
cycles.forEach(c => console.log(" -", c.join(" → ")));

console.log("\n===============================");
console.log("DEPENDENCY GRAPH (who talks to who)");
console.log("===============================");
Object.entries(graph).forEach(([file, deps]) => {
  console.log(`\n${file}`);
  deps.forEach(d => console.log("   →", d));
});

console.log("\n✅ Audit complete.\n");