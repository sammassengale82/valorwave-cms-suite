import { useCanvasState } from "./CanvasState";

export function startResize(nodeId: string) {
  useCanvasState.getState().startResize(nodeId);
}

export function endResize() {
  useCanvasState.getState().endResize();
}

export function applyResize(nodeId: string, newStyles: any) {
  const state = useCanvasState.getState();
  const tree = state.tree;

  function update(node) {
    if (node.id === nodeId) {
      node.styles = { ...node.styles, ...newStyles };
    }
    node.children?.forEach(update);
  }

  tree.root.forEach(update);
  state.setTree({ ...tree });
}