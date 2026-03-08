import { useCanvasState } from "./CanvasState";

export function selectNode(id: string | null) {
  useCanvasState.getState().select(id);
}

export function getSelectedNode() {
  const state = useCanvasState.getState();
  const id = state.selectedId;

  function find(nodes) {
    for (const n of nodes) {
      if (n.id === id) return n;
      const child = find(n.children || []);
      if (child) return child;
    }
    return null;
  }

  return find(state.tree.root);
}