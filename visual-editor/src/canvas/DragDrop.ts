import { useCanvasState } from "./CanvasState";
import type { VisualTree, VisualNode } from "./VisualTree";

function removeNode(tree: VisualTree, id: string): { tree: VisualTree; node: VisualNode | null } {
  let removed: VisualNode | null = null;

  function walk(nodes: VisualNode[]): VisualNode[] {
    const result: VisualNode[] = [];
    for (const n of nodes) {
      if (n.id === id) {
        removed = n;
        continue;
      }
      if (n.children) {
        n.children = walk(n.children);
      }
      result.push(n);
    }
    return result;
  }

  const clone = JSON.parse(JSON.stringify(tree)) as VisualTree;
  clone.root = walk(clone.root);
  return { tree: clone, node: removed };
}

export function startDrag(nodeId: string) {
  useCanvasState.getState().startDrag(nodeId);
}

export function endDrag() {
  useCanvasState.getState().endDrag();
}

export function moveNodeToRootIndex(targetIndex: number) {
  const state = useCanvasState.getState();
  const { tree, draggingId } = state;
  if (!draggingId) return;

  const { tree: without, node } = removeNode(tree, draggingId);
  if (!node) return;

  const arr = without.root;
  const safeIndex = Math.max(0, Math.min(targetIndex, arr.length));
  arr.splice(safeIndex, 0, node);

  state.setTree(without);
  state.endDrag();
}