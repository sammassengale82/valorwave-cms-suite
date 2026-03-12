// src/canvas/loadTemplates.ts
import type { CmsTemplate } from "./cmsTypes";
import { cmsTemplatesToTree } from "./cmsConverters";
import type { Node } from "./CanvasState";

export function loadTemplatesToTree(): Node[] {
  const modules = import.meta.glob("/repo/templates/**/*.json", { eager: true });

  const templates: CmsTemplate[] = [];

  for (const path in modules) {
    const mod: any = modules[path];
    if (!mod || typeof mod !== "object") continue;

    // assume default export or raw JSON
    const tpl = (mod.default ?? mod) as CmsTemplate;
    templates.push(tpl);
  }

  return cmsTemplatesToTree(templates);
}
