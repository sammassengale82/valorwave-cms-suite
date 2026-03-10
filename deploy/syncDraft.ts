import fs from "fs";
import path from "path";

export function loadDraftFiles() {
  const draftDir = path.join(process.cwd(), "draft");
  const files: any[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);

      if (stat.isDirectory()) {
        walk(full);
      } else {
        const rel = path.relative(draftDir, full);
        const content = fs.readFileSync(full, "utf8");
        files.push({ path: rel, content });
      }
    }
  }

  walk(draftDir);
  return files;
}