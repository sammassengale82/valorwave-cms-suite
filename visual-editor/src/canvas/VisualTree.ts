export interface VisualNode {
  id: string;
  type: "section" | "block";
  component: string;

  props?: Record<string, any>;

  styles?: {
    desktop?: Record<string, string>;
    tablet?: Record<string, string>;
    mobile?: Record<string, string>;
  };

  children?: VisualNode[];
}

export interface VisualTree {
  root: VisualNode[];
}

export function findNodeById(tree: VisualTree, id: string): VisualNode | null {
  function search(nodes: VisualNode[]): VisualNode | null {
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.children) {
        const child = search(n.children);
        if (child) return child;
      }
    }
    return null;
  }

  return search(tree.root);
}