import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { VisualTree, VisualNode } from "./VisualTree";

interface CanvasState {
  tree: VisualTree;
  selectedId: string | null;
  hoveredId: string | null;
  draggingId: string | null;
  resizingId: string | null;

  setTree: (tree: VisualTree) => void;
  select: (id: string | null) => void;
  hover: (id: string | null) => void;
  startDrag: (id: string) => void;
  endDrag: () => void;
  startResize: (id: string) => void;
  endResize: () => void;
}

export const useCanvasState = create<CanvasState>()(
  immer((set) => ({
    tree: { root: [] },
    selectedId: null,
    hoveredId: null,
    draggingId: null,
    resizingId: null,

    setTree: (tree) => set((s) => { s.tree = tree }),
    select: (id) => set((s) => { s.selectedId = id }),
    hover: (id) => set((s) => { s.hoveredId = id }),
    startDrag: (id) => set((s) => { s.draggingId = id }),
    endDrag: () => set((s) => { s.draggingId = null }),
    startResize: (id) => set((s) => { s.resizingId = id }),
    endResize: () => set((s) => { s.resizingId = null })
  }))
);