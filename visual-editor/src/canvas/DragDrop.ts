import { useCanvasState } from "./CanvasState";

export function startDrag(nodeId: string) {
  useCanvasState.getState().startDrag(nodeId);
}

export function endDrag() {
  useCanvasState.getState().endDrag();
}

export function moveNode(nodeId: string, targetIndex: number) {
  const state = useCanvasState.getState();
  const tree = state.tree;

  // TODO: implement reordering logic
  // remove node from old position
  // insert node at new position

  state.setTree({ ...tree });
}