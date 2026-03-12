// src/canvas/saveTemplates.ts
import type { Node } from "./CanvasState";
import { treeToCmsTemplates } from "./cmsConverters";
import type { CmsTemplate } from "./cmsTypes";

export function treeToTemplates(tree: Node[]): CmsTemplate[] {
  return treeToCmsTemplates(tree);
}

// you will wire this into your actual persistence layer (filesystem, GitHub, etc.)
