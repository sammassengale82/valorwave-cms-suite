export type Device = "desktop" | "tablet" | "mobile";

export interface ResponsiveStyles {
  desktop?: React.CSSProperties;
  tablet?: React.CSSProperties;
  mobile?: React.CSSProperties;
}

export interface VisualNode {
  id: string;
  type: "section" | "block";
  component: string;
  children?: VisualNode[];
  props?: Record<string, any>;
  styles?: ResponsiveStyles;
}

export interface VisualTree {
  root: VisualNode[];
}

export function findNodeById(tree: VisualTree, id: string): VisualNode | null {
  function walk(nodes: VisualNode[]): VisualNode | null {
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.children) {
        const found = walk(n.children);
        if (found) return found;
      }
    }
    return null;
  }
  return walk(tree.root);
}

export function updateNodeById(
  tree: VisualTree,
  id: string,
  updater: (node: VisualNode) => void
): VisualTree {
  function walk(nodes: VisualNode[]): void {
    for (const n of nodes) {
      if (n.id === id) {
        updater(n);
      }
      if (n.children) walk(n.children);
    }
  }
  const clone = JSON.parse(JSON.stringify(tree)) as VisualTree;
  walk(clone.root);
  return clone;
}

export function removeNodeById(tree: VisualTree, id: string): VisualTree {
  function filter(nodes: VisualNode[]): VisualNode[] {
    return nodes
      .filter((n) => n.id !== id)
      .map((n) => ({
        ...n,
        children: n.children ? filter(n.children) : undefined
      }));
  }
  return { root: filter(tree.root) };
}

export function insertNodeAtRoot(
  tree: VisualTree,
  node: VisualNode,
  index: number
): VisualTree {
  const clone = JSON.parse(JSON.stringify(tree)) as VisualTree;
  const arr = clone.root;
  const safeIndex = Math.max(0, Math.min(index, arr.length));
  arr.splice(safeIndex, 0, node);
  return clone;
}