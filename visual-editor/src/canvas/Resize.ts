import { useCanvasState } from "./CanvasState";
import type { VisualTree, VisualNode } from "./VisualTree";

export function startResize(nodeId: string) {
  useCanvasState.getState().startResize(nodeId);
}

export function endResize() {
  useCanvasState.getState().endResize();
}

export function applyResize(nodeId: string, newHeight: number) {
  const state = useCanvasState.getState();
  const tree = state.tree;

  const clone = JSON.parse(JSON.stringify(tree)) as VisualTree;

  function walk(nodes: VisualNode[]) {
    for (const n of nodes) {
      if (n.id === nodeId) {
        n.styles = n.styles || {};
        n.styles.desktop = n.styles.desktop || {};
        n.styles.desktop.height = `${newHeight}px`;
      }
      if (n.children) walk(n.children);
    }
  }

  walk(clone.root);
  state.setTree(clone);
}