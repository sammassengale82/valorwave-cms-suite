import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { VisualTree } from "./VisualTree";

interface CanvasState {
  tree: VisualTree;
  selectedId: string | null;
  hoveredId: string | null;
  draggingId: string | null;
  resizingId: string | null;

  history: VisualTree[];
  historyIndex: number;

  setTree: (tree: VisualTree, pushHistory?: boolean) => void;
  select: (id: string | null) => void;
  hover: (id: string | null) => void;
  startDrag: (id: string) => void;
  endDrag: () => void;
  startResize: (id: string) => void;
  endResize: () => void;

  undo: () => void;
  redo: () => void;
}

function cloneTree(tree: VisualTree): VisualTree {
  return JSON.parse(JSON.stringify(tree));
}

export const useCanvasState = create<CanvasState>()(
  immer((set, get) => ({
    tree: { root: [] },
    selectedId: null,
    hoveredId: null,
    draggingId: null,
    resizingId: null,

    history: [],
    historyIndex: -1,

    setTree: (tree, pushHistory = true) =>
      set((state) => {
        state.tree = tree;

        if (pushHistory) {
          const snapshot = cloneTree(tree);
          state.history = state.history.slice(0, state.historyIndex + 1);
          state.history.push(snapshot);
          state.historyIndex = state.history.length - 1;
        }
      }),

    select: (id) =>
      set((state) => {
        state.selectedId = id;
      }),

    hover: (id) =>
      set((state) => {
        state.hoveredId = id;
      }),

    startDrag: (id) =>
      set((state) => {
        state.draggingId = id;
      }),

    endDrag: () =>
      set((state) => {
        state.draggingId = null;
      }),

    startResize: (id) =>
      set((state) => {
        state.resizingId = id;
      }),

    endResize: () =>
      set((state) => {
        state.resizingId = null;
      }),

    undo: () =>
      set((state) => {
        if (state.historyIndex <= 0) return;
        state.historyIndex -= 1;
        state.tree = cloneTree(state.history[state.historyIndex]);
      }),

    redo: () =>
      set((state) => {
        if (state.historyIndex >= state.history.length - 1) return;
        state.historyIndex += 1;
        state.tree = cloneTree(state.history[state.historyIndex]);
      })
  }))
);