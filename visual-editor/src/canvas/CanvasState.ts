import create from "zustand";
import { nanoid } from "nanoid";
import type { HistoryEntry } from "../types/HistoryTypes";

// ------------------------------------------------------------
// Helper: Deep clone with new IDs
// ------------------------------------------------------------
function cloneNodeWithNewIds(node: any): any {
  const newId = nanoid();

  const cloned = {
    ...node,
    id: newId,
    children: node.children
      ? node.children.map((child: any) => cloneNodeWithNewIds(child))
      : [],
  };

  return cloned;
}

// ------------------------------------------------------------
// Helper: Deep merge for styles + content
// ------------------------------------------------------------
function deepMerge(target: any, source: any) {
  const output = { ...target };

  for (const key of Object.keys(source || {})) {
    const value = source[key];

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof target[key] === "object"
    ) {
      output[key] = deepMerge(target[key], value);
    } else {
      output[key] = value;
    }
  }

  return output;
}

// ------------------------------------------------------------
// Canvas State
// ------------------------------------------------------------
export const useCanvasState = create((set, get) => ({
  tree: [],

  // ------------------------------------------------------------
  // HISTORY ENGINE
  // ------------------------------------------------------------
  history: [] as HistoryEntry[],
  historyIndex: -1,

  pushHistory: (label: string) => {
    const state = get();

    const snapshot: HistoryEntry = {
      id: nanoid(),
      timestamp: Date.now(),
      label,
      tree: JSON.parse(JSON.stringify(state.tree)), // deep clone
    };

    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(snapshot);

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const state = get();
    if (state.historyIndex <= 0) return;

    const newIndex = state.historyIndex - 1;
    const entry = state.history[newIndex];

    set({
      tree: JSON.parse(JSON.stringify(entry.tree)),
      historyIndex: newIndex,
    });
  },

  redo: () => {
    const state = get();
    if (state.historyIndex >= state.history.length - 1) return;

    const newIndex = state.historyIndex + 1;
    const entry = state.history[newIndex];

    set({
      tree: JSON.parse(JSON.stringify(entry.tree)),
      historyIndex: newIndex,
    });
  },

  // ------------------------------------------------------------
  // SET TREE (manual)
  // ------------------------------------------------------------
  setTree: (tree: any[], pushHistory = true) => {
    if (pushHistory) {
      get().pushHistory("Set Tree");
    }
    set({ tree });
  },

  // ------------------------------------------------------------
  // SECTION OPERATIONS
  // ------------------------------------------------------------
  removeSection: (id: string) =>
    set((state: any) => {
      get().pushHistory("Remove Section");

      return {
        tree: state.tree.filter((n: any) => n.id !== id),
      };
    }),

  duplicateSection: (id: string) =>
    set((state: any) => {
      get().pushHistory("Duplicate Section");

      const index = state.tree.findIndex((n: any) => n.id === id);
      if (index === -1) return {};

      const original = state.tree[index];
      const clone = cloneNodeWithNewIds(original);

      const newTree = [...state.tree];
      newTree.splice(index + 1, 0, clone);

      return { tree: newTree };
    }),

  // ------------------------------------------------------------
  // BLOCK OPERATIONS
  // ------------------------------------------------------------
  removeBlock: (id: string) =>
    set((state: any) => {
      get().pushHistory("Remove Block");

      const remove = (nodes: any[]): any[] =>
        nodes
          .filter((n) => n.id !== id)
          .map((n) => ({ ...n, children: remove(n.children || []) }));

      return { tree: remove(state.tree) };
    }),

  duplicateBlock: (id: string) =>
    set((state: any) => {
      get().pushHistory("Duplicate Block");

      const duplicate = (nodes: any[]): any[] => {
        const result: any[] = [];

        for (const n of nodes) {
          result.push({
            ...n,
            children: duplicate(n.children || []),
          });

          if (n.id === id) {
            const clone = cloneNodeWithNewIds(n);
            result.push(clone);
          }
        }

        return result;
      };

      return { tree: duplicate(state.tree) };
    }),

  // ------------------------------------------------------------
  // STYLE + CONTENT UPDATES
  // ------------------------------------------------------------
  updateStyle: (id: string, device: string, prop: string, value: any) =>
    set((state: any) => {
      get().pushHistory("Update Style");

      const update = (nodes: any[]): any[] =>
        nodes.map((n) => {
          if (n.id === id) {
            const styles = { ...(n.styles || {}) };
            const dev = { ...(styles[device] || {}) };
            dev[prop] = value;
            styles[device] = dev;
            return { ...n, styles };
          }
          return { ...n, children: update(n.children || []) };
        });

      return { tree: update(state.tree) };
    }),

  updateContent: (id: string, field: string, value: any) =>
    set((state: any) => {
      get().pushHistory("Update Content");

      const update = (nodes: any[]): any[] =>
        nodes.map((n) => {
          if (n.id === id) {
            return {
              ...n,
              content: { ...(n.content || {}), [field]: value },
            };
          }
          return { ...n, children: update(n.children || []) };
        });

      return { tree: update(state.tree) };
    }),

  // ------------------------------------------------------------
  // TEMPLATE INSERTION
  // ------------------------------------------------------------
  insertTemplate: (templateNode: any) =>
    set((state: any) => {
      get().pushHistory("Insert Template");

      const cloned = cloneNodeWithNewIds(templateNode);
      const newTree = [...state.tree, cloned];
      return { tree: newTree };
    }),

  // ------------------------------------------------------------
  // APPLY VARIANT
  // ------------------------------------------------------------
  applyVariant: (nodeId: string, variant: any) =>
    set((state: any) => {
      get().pushHistory("Apply Variant");

      const apply = (nodes: any[]): any[] =>
        nodes.map((n) => {
          if (n.id === nodeId) {
            const mergedStyles = deepMerge(n.styles || {}, variant.styles || {});
            const mergedContent = deepMerge(n.content || {}, variant.content || {});

            return {
              ...n,
              styles: mergedStyles,
              content: mergedContent,
            };
          }

          return { ...n, children: apply(n.children || []) };
        });

      return { tree: apply(state.tree) };
    }),
}));