import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { VisualTree, VisualNode, AnimationConfig } from "./VisualTree";

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
  resetHistory: () => void;

  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  moveSection: (id: string, newIndex: number) => void;

  addBlock: (parentId: string, type: string) => void;
  removeBlock: (parentId: string, blockId: string) => void;
  duplicateBlock: (parentId: string, blockId: string) => void;
  moveBlock: (parentId: string, blockId: string, newIndex: number) => void;

  updateStyle: (
    id: string,
    device: "desktop" | "tablet" | "mobile",
    prop: string,
    value: string
  ) => void;

  updateAnimations: (
    id: string,
    device: "desktop" | "tablet" | "mobile",
    index: number | "add" | "remove",
    field?: keyof AnimationConfig,
    value?: any
  ) => void;
}

function cloneTree(tree: VisualTree): VisualTree {
  return JSON.parse(JSON.stringify(tree));
}

function findNode(nodes: VisualNode[], id: string): VisualNode | null {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const child = findNode(n.children, id);
      if (child) return child;
    }
  }
  return null;
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

          const MAX = 200;
          if (state.history.length > MAX) {
            state.history.shift();
            state.historyIndex = state.history.length - 1;
          }
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
      }),

    resetHistory: () =>
      set((state) => {
        state.history = [];
        state.historyIndex = -1;
      }),

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
      }),

    addBlock: (parentId, type) =>
      set((state) => {
        const parent = state.tree.root.find((n) => n.id === parentId);
        if (!parent) return;

        const presetsModule = require("../block-library/block-presets");
        const BlockPresets = presetsModule.BlockPresets;

        const preset = BlockPresets[type];
        if (!preset) return;

        const clone: VisualNode = JSON.parse(JSON.stringify(preset));
        clone.id = crypto.randomUUID();

        parent.children = parent.children || [];
        parent.children.push(clone);
      }),

    removeBlock: (parentId, blockId) =>
      set((state) => {
        const parent = state.tree.root.find((n) => n.id === parentId);
        if (!parent || !parent.children) return;

        parent.children = parent.children.filter((c) => c.id !== blockId);
      }),

    duplicateBlock: (parentId, blockId) =>
      set((state) => {
        const parent = state.tree.root.find((n) => n.id === parentId);
        if (!parent || !parent.children) return;

        const original = parent.children.find((c) => c.id === blockId);
        if (!original) return;

        const clone: VisualNode = JSON.parse(JSON.stringify(original));
        clone.id = crypto.randomUUID();

        parent.children.push(clone);
      }),

    moveBlock: (parentId, blockId, newIndex) =>
      set((state) => {
        const parent = state.tree.root.find((n) => n.id === parentId);
        if (!parent || !parent.children) return;

        const arr = parent.children;
        const oldIndex = arr.findIndex((c) => c.id === blockId);
        if (oldIndex === -1) return;

        const [node] = arr.splice(oldIndex, 1);
        const safeIndex = Math.max(0, Math.min(newIndex, arr.length));
        arr.splice(safeIndex, 0, node);
      }),

    updateStyle: (id, device, prop, value) =>
      set((state) => {
        const node = findNode(state.tree.root, id);
        if (!node) return;

        node.styles = node.styles || {};
        node.styles[device] = node.styles[device] || {};
        node.styles[device]![prop] = value;
      }),

    // ------------------------------------------------------------
    // NEW: updateAnimations()
    // ------------------------------------------------------------
    updateAnimations: (id, device, index, field, value) =>
      set((state) => {
        const node = findNode(state.tree.root, id);
        if (!node) return;

        node.animations = node.animations || {};
        node.animations[device] = node.animations[device] || [];

        const list = node.animations[device]!;

        // Add new animation
        if (index === "add") {
          list.push({
            type: "fade-in",
            duration: 600,
            delay: 0,
            easing: "ease-out",
            trigger: "on-visible",
            speed: 1,
            threshold: 0,
            loop: false
          });
          return;
        }

        // Remove animation
        if (index === "remove" && typeof field === "number") {
          list.splice(field, 1);
          return;
        }

        // Update animation field
        if (typeof index === "number" && field) {
          const anim = list[index];
          if (!anim) return;
          (anim as any)[field] = value;
        }
      })
  }))
);