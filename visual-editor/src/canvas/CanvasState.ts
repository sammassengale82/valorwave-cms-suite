import create from "zustand";
import { nanoid } from "nanoid";

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

export const useCanvasState = create((set, get) => ({
  tree: [],

  setTree: (tree: any[], pushHistory = true) =>
    set({ tree }),

  removeSection: (id: string) =>
    set((state: any) => ({
      tree: state.tree.filter((n: any) => n.id !== id),
    })),

  duplicateSection: (id: string) =>
    set((state: any) => {
      const index = state.tree.findIndex((n: any) => n.id === id);
      if (index === -1) return {};

      const original = state.tree[index];
      const clone = cloneNodeWithNewIds(original);

      const newTree = [...state.tree];
      newTree.splice(index + 1, 0, clone);

      return { tree: newTree };
    }),

  updateStyle: (id: string, device: string, prop: string, value: any) =>
    set((state: any) => {
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
  // NEW: Insert Template
  // ------------------------------------------------------------
  insertTemplate: (templateNode: any) =>
    set((state: any) => {
      const cloned = cloneNodeWithNewIds(templateNode);

      // Insert at end if no selection
      const newTree = [...state.tree, cloned];

      return { tree: newTree };
    }),
}));