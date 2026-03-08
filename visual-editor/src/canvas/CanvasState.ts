import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { VisualTree, VisualNode } from "./VisualTree";

interface CanvasState {
  tree: VisualTree;

  selectedId: string | null;
  hoveredId: string | null;

  draggingId: string | null;
  resizingId: string | null;

  history: VisualTree[];
  historyIndex: number;

  // Core
  setTree: (tree: VisualTree, pushHistory?: boolean) => void;

  // Selection
  select: (id: string | null) => void;
  hover: (id: string | null) => void;

  // Dragging
  startDrag: (id: string) => void;
  endDrag: () => void;

  // Resizing
  startResize: (id: string) => void;
  endResize: () => void;

  // Undo / Redo
  undo: () => void;
  redo: () => void;
  resetHistory: () => void;

  // Section Library
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  moveSection: (id: string, newIndex: number) => void;
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

    // -----------------------------
    // CORE TREE UPDATE
    // -----------------------------
    setTree: (tree, pushHistory = true) =>
      set((state) => {
        state.tree = tree;

        if (pushHistory) {
          const snapshot = cloneTree(tree);

          state.history = state.history.slice(0, state.historyIndex + 1);
          state.history.push(snapshot);
          state.historyIndex = state.history.length - 1;

          // History cap
          const MAX = 200;
          if (state.history.length > MAX) {
            state.history.shift();
            state.historyIndex = state.history.length - 1;
          }
        }
      }),

    // -----------------------------
    // SELECTION
    // -----------------------------
    select: (id) =>
      set((state) => {
        state.selectedId = id;
      }),

    hover: (id) =>
      set((state) => {
        state.hoveredId = id;
      }),

    // -----------------------------
    // DRAGGING
    // -----------------------------
    startDrag: (id) =>
      set((state) => {
        state.draggingId = id;
      }),

    endDrag: () =>
      set((state) => {
        state.draggingId = null;
      }),

    // -----------------------------
    // RESIZING
    // -----------------------------
    startResize: (id) =>
      set((state) => {
        state.resizingId = id;
      }),

    endResize: () =>
      set((state) => {
        state.resizingId = null;
      }),

    // -----------------------------
    // UNDO / REDO
    // -----------------------------
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
      }),

    resetHistory: () =>
      set((state) => {
        state.history = [];
        state.historyIndex = -1;
      }),

    // -----------------------------
    // SECTION LIBRARY ACTIONS
    // -----------------------------
    removeSection: (id) =>
      set((state) => {
        state.tree.root = state.tree.root.filter((n) => n.id !== id);
      }),

    duplicateSection: (id) =>
      set((state) => {
        const original = state.tree.root.find((n) => n.id === id);
        if (!original) return;

        const clone = cloneTree({ root: [original] }).root[0];
        clone.id = crypto.randomUUID();

        if (clone.children) {
          clone.children = clone.children.map((c) => ({
            ...c,
            id: crypto.randomUUID()
          }));
        }

        state.tree.root.push(clone);
      }),

    moveSection: (id, newIndex) =>
      set((state) => {
        const arr = state.tree.root;
        const oldIndex = arr.findIndex((n) => n.id === id);
        if (oldIndex === -1) return;

        const [node] = arr.splice(oldIndex, 1);
        const safeIndex = Math.max(0, Math.min(newIndex, arr.length));
        arr.splice(safeIndex, 0, node);
      })
  }))
);