import create from "zustand";
import { nanoid } from "nanoid";
import type { HistoryEntry } from "../types/HistoryTypes";

function cloneNodeWithNewIds(node: any): any {
  const newId = nanoid();

  const cloned = {
    ...node,
    id: newId,
    children: node.children
      ? node.children.map((child: any) => cloneNodeWithNewIds(child))
      : []
  };

  return cloned;
}

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

function compressTree(tree: any[]): any[] {
  return JSON.parse(
    JSON.stringify(tree, (key, value) => {
      if (value === null) return undefined;
      if (typeof value === "object" && value && Object.keys(value).length === 0)
        return undefined;
      return value;
    })
  );
}

export const useCanvasState = create((set, get) => ({
  tree: [],

  selectedIds: [] as string[],

  selectOne: (id: string) =>
    set({
      selectedIds: [id]
    }),

  toggleSelect: (id: string) =>
    set((state: any) => {
      const exists = state.selectedIds.includes(id);
      return {
        selectedIds: exists
          ? state.selectedIds.filter((x: string) => x !== id)
          : [...state.selectedIds, id]
      };
    }),

  clearSelection: () =>
    set({
      selectedIds: []
    }),

  selectMultiple: (ids: string[]) =>
    set({
      selectedIds: [...ids]
    }),

  history: [] as HistoryEntry[],
  historyIndex: -1,
  lastPushTime: 0,
  debounceDelay: 250,
  maxHistory: 200,

  pushHistory: (label: string) => {
    const state = get();
    const now = Date.now();

    if (now - state.lastPushTime < state.debounceDelay) return;

    const compressed = compressTree(state.tree);

    const last = state.history[state.historyIndex];
    if (last && JSON.stringify(last.tree) === JSON.stringify(compressed)) {
      return;
    }

    const snapshot: HistoryEntry = {
      id: nanoid(),
      timestamp: now,
      label,
      tree: compressed
    };

    let newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(snapshot);

    if (newHistory.length > state.maxHistory) {
      newHistory = newHistory.slice(newHistory.length - state.maxHistory);
    }

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
      lastPushTime: now
    });
  },

  undo: () => {
    const state = get();
    if (state.historyIndex <= 0) return;

    const newIndex = state.historyIndex - 1;
    const entry = state.history[newIndex];

    set({
      tree: JSON.parse(JSON.stringify(entry.tree)),
      historyIndex: newIndex
    });
  },

  redo: () => {
    const state = get();
    if (state.historyIndex >= state.history.length - 1) return;

    const newIndex = state.historyIndex + 1;
    const entry = state.history[newIndex];

    set({
      tree: JSON.parse(JSON.stringify(entry.tree)),
      historyIndex: newIndex
    });
  },

  setTree: (tree: any[], pushHistory = true) => {
    if (pushHistory) {
      get().pushHistory("Set Tree");
    }
    set({ tree });
  },

  removeSection: (id: string) =>
    set((state: any) => {
      get().pushHistory("Remove Section");

      return {
        tree: state.tree.filter((n: any) => n.id !== id)
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
            children: duplicate(n.children || [])
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

  deleteSelected: () =>
    set((state: any) => {
      get().pushHistory("Delete Multiple Blocks");

      const ids = new Set(state.selectedIds);

      const remove = (nodes: any[]): any[] =>
        nodes
          .filter((n) => !ids.has(n.id))
          .map((n) => ({ ...n, children: remove(n.children || []) }));

      return {
        tree: remove(state.tree),
        selectedIds: []
      };
    }),

  duplicateSelected: () =>
    set((state: any) => {
      get().pushHistory("Duplicate Multiple Blocks");

      const ids = new Set(state.selectedIds);

      const duplicate = (nodes: any[]): any[] => {
        const result: any[] = [];

        for (const n of nodes) {
          result.push({
            ...n,
            children: duplicate(n.children || [])
          });

          if (ids.has(n.id)) {
            const clone = cloneNodeWithNewIds(n);
            result.push(clone);
          }
        }

        return result;
      };

      return {
        tree: duplicate(state.tree)
      };
    }),

  moveSelected: (direction: "up" | "down") =>
    set((state: any) => {
      get().pushHistory("Move Multiple Blocks");

      const ids = new Set(state.selectedIds);

      const move = (nodes: any[]): any[] => {
        const newNodes = [...nodes];

        for (let i = 0; i < newNodes.length; i++) {
          if (ids.has(newNodes[i].id)) {
            const targetIndex = direction === "up" ? i - 1 : i + 1;

            if (targetIndex >= 0 && targetIndex < newNodes.length) {
              const temp = newNodes[targetIndex];
              newNodes[targetIndex] = newNodes[i];
              newNodes[i] = temp;
            }
          }
        }

        return newNodes.map((n) => ({
          ...n,
          children: move(n.children || [])
        }));
      };

      return {
        tree: move(state.tree)
      };
    }),

  applyVariantToSelected: (variant: any) =>
    set((state: any) => {
      get().pushHistory("Apply Variant to Multiple");

      const ids = new Set(state.selectedIds);

      const apply = (nodes: any[]): any[] =>
        nodes.map((n) => {
          if (ids.has(n.id)) {
            const mergedStyles = deepMerge(n.styles || {}, variant.styles || {});
            const mergedContent = deepMerge(n.content || {}, variant.content || {});

            return {
              ...n,
              styles: mergedStyles,
              content: mergedContent
            };
          }

          return { ...n, children: apply(n.children || []) };
        });

      return { tree: apply(state.tree) };
    }),

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
              content: { ...(n.content || {}), [field]: value }
            };
          }
          return { ...n, children: update(n.children || []) };
        });

      return { tree: update(state.tree) };
    }),

  insertTemplate: (templateNode: any) =>
    set((state: any) => {
      get().pushHistory("Insert Template");

      const cloned = cloneNodeWithNewIds(templateNode);
      const newTree = [...state.tree, cloned];
      return { tree: newTree };
    }),

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
              content: mergedContent
            };
          }

          return { ...n, children: apply(n.children || []) };
        });

      return { tree: apply(state.tree) };
    }),

  // drag/insert helpers
  addSection: (node: any) =>
    set((state: any) => {
      get().pushHistory("Add Section");
      const cloned = cloneNodeWithNewIds(node);
      return { tree: [...state.tree, cloned] };
    }),

  insertSectionAt: (index: number, node: any) =>
    set((state: any) => {
      get().pushHistory("Insert Section");
      const cloned = cloneNodeWithNewIds(node);
      const newTree = [...state.tree];
      newTree.splice(index, 0, cloned);
      return { tree: newTree };
    }),

  // replace mode
  replaceTargetId: null as string | null,

  setReplaceTarget: (id: string) =>
    set({
      replaceTargetId: id
    }),

  clearReplaceTarget: () =>
    set({
      replaceTargetId: null
    }),

  replaceSection: (id: string, node: any) =>
    set((state: any) => {
      get().pushHistory("Replace Section");

      const cloned = cloneNodeWithNewIds(node);
      const newTree = state.tree.map((s: any) =>
        s.id === id ? cloned : s
      );

      return { tree: newTree };
    })
}));