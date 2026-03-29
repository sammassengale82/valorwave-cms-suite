// src/visual/compile/compileToVisualTree.ts
import templateData from "../../templates/template/template.data.json";

export interface VisualSectionNode {
  id: string;
  type: string;
  props: Record<string, any>;
}

export interface VisualTree {
  root: VisualSectionNode[];
}

// Canvas tree is currently unused (you can later support reordering, add/remove, etc.)
export function compileToVisualTree(canvasTree: any[]): VisualTree {
  // If canvasTree is empty, fall back to template.data.json sections
  const sourceSections =
    Array.isArray(canvasTree) && canvasTree.length > 0
      ? canvasTree
      : (templateData.sections as any[]);

  const root: VisualSectionNode[] = sourceSections.map((section) => ({
    id: section.id,
    type: section.type,
    props: section.props || {}
  }));

  return { root };
}
