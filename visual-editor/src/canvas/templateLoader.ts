// src/canvas/templateLoader.ts
import type { TemplateFile } from "./templateTypes";

export function loadTemplateFiles(): Record<string, TemplateFile> {
  const modules = import.meta.glob("/templates/**/*.json", {
    eager: true,
  });

  const out: Record<string, TemplateFile> = {};

  for (const path in modules) {
    const mod: any = modules[path];
    if (!mod || !mod.id || !mod.tree) continue;
    out[mod.id] = mod as TemplateFile;
  }

  return out;
}
