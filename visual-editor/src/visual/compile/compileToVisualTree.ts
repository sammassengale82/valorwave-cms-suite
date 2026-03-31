// src/visual/compile/compileToVisualTree.ts
import templateData from "../../template/template.data.json";

export interface VisualSectionNode {
  id: string;
  type: string;
  props: Record<string, any>;
}

export interface VisualTree {
  root: VisualSectionNode[];
}

export function compileToVisualTree(): VisualTree {
  const root: VisualSectionNode[] = templateData.sections.map((section) => ({
    id: section.id,
    type: section.type,
    props: section.props || {}
  }));

  return { root };
}
