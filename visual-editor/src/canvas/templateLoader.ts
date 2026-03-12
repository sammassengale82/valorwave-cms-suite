// src/canvas/templateLoader.ts
import type { TemplateFile } from "./templateTypes";

export function loadTemplateFiles(): Record<string, TemplateFile> {
  const modules = import.meta.glob("/src/templates/**/*.json", {
    eager: true,
  });

  const out: Record<string, TemplateFile> = {};

  for (const path in modules) {
    const mod: any = modules[path];
    const tpl = (mod.default ?? mod) as TemplateFile;
    if (!tpl || !tpl.id || !tpl.tree) continue;
    out[tpl.id] = tpl;
  }

  return out;
}
