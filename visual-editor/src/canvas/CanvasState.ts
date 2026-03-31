// src/canvas/CanvasState.ts
import { create } from "zustand";
import { loadTemplate } from "./loadTemplate";

export type Node = {
  id: string;
  type: "Section" | "Block";
  props?: Record<string, any>;
  children?: Node[];
};

type CanvasState = {
  tree: Node[];
  templateData: any;

  // INIT
  init: () => Promise<void>;
  setTree: (tree: Node[]) => void;

  // SELECTION
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  toggleSelect: (id: string) => void;
  selectSingle: (id: string) => void;
  clearSelection: () => void;

  // BLOCK + SECTION OPERATIONS
  insertSectionAt: (index: number, node: Node) => void;
  addSection: (node: Node) => void;
  insertBlockAt: (parentId: string, index: number, node: Node) => void;
  addBlockToSection: (sectionId: string, block: Node) => void;
  moveBlockUp: (id: string) => void;
  moveBlockDown: (id: string) => void;
  deleteSelected: () => void;

  // NEW — SECTION MANAGER
  removeSection: (id: string) => void;
  moveSection: (id: string, direction: "up" | "down") => void;
  duplicateSection: (id: string) => void;

  // NEW — THEME
  updateTheme: (updates: Record<string, string>) => void;

  // NEW — SITE SETTINGS
  updateSiteSettings: (updates: Record<string, any>) => void;

  // NEW — DIRTY STATE
  isDirty: boolean;
  lastSavedTree: Node[];
  markDirty: () => void;
  markClean: () => void;

  // NEW — PREVIEW MODE
  previewMode: "draft" | "published";
  setPreviewMode: (mode: "draft" | "published") => void;

  // NEW — MODALS
  modal: null | { name: string; data?: any };
  openModal: (name: string, data?: any) => void;
  closeModal: () => void;
};

export const useCanvasState = create<CanvasState>((set, get) => ({
  tree: [],
  templateData: null,

  // INIT — load template.data.json → tree + theme
  init: async () => {
    const sections = await loadTemplate();
    const templateData = await fetch(
      "/src/template/template.data.json"
    ).then((r) => r.json());

    // Apply theme tokens to :root
    if (templateData?.site?.theme) {
      Object.entries(templateData.site.theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, String(value));
      });
    }

    set({
      tree: sections,
      templateData,
      lastSavedTree: sections,
    });
  },

  setTree: (tree) => set({ tree, isDirty: true }),

  // SELECTION
  selectedIds: [],
  setSelectedIds: (ids) => set({ selectedIds: ids }),
  toggleSelect: (id) => {
    const current = get().selectedIds;
    if (current.includes(id)) {
      set({ selectedIds: current.filter((x) => x !== id) });
    } else {
      set({ selectedIds: [...current, id] });
    }
  },
  selectSingle: (id) => set({ selectedIds: [id] }),
  clearSelection: () => set({ selectedIds: [] }),

  // SECTION INSERTION
  insertSectionAt: (index, node) => {
    const tree = [...get().tree];
    tree.splice(index, 0, node);
    set({ tree, isDirty: true });
  },

  addSection: (node) => {
    const tree = [...get().tree, node];
    set({ tree, isDirty: true });
  },

  // BLOCK INSERTION
  insertBlockAt: (parentId, index, node) => {
    const tree = structuredClone(get().tree) as Node[];

    function insertInto(nodes: Node[]): boolean {
      for (const n of nodes) {
        if (n.id === parentId) {
          const children = n.children ? [...n.children] : [];
          children.splice(index, 0, node);
          n.children = children;
          return true;
        }
        if (n.children && insertInto(n.children)) return true;
      }
      return false;
    }

    insertInto(tree);
    set({ tree, isDirty: true });
  },

  addBlockToSection: (sectionId, block) => {
    const tree = structuredClone(get().tree) as Node[];

    function add(nodes: Node[]): boolean {
      for (const n of nodes) {
        if (n.id === sectionId && n.type === "Section") {
          const children = n.children ? [...n.children, block] : [block];
          n.children = children;
          return true;
        }
        if (n.children && add(n.children)) return true;
      }
      return false;
    }

    add(tree);
    set({ tree, isDirty: true });
  },

  moveBlockUp: (id) => {
    const tree = structuredClone(get().tree) as Node[];

    function move(nodes: Node[]): boolean {
      for (const parent of nodes) {
        if (!parent.children) continue;
        const idx = parent.children.findIndex((c) => c.id === id);
        if (idx > 0) {
          const arr = [...parent.children];
          const [item] = arr.splice(idx, 1);
          arr.splice(idx - 1, 0, item);
          parent.children = arr;
          return true;
        }
        if (parent.children && move(parent.children)) return true;
      }
      return false;
    }

    move(tree);
    set({ tree, isDirty: true });
  },

  moveBlockDown: (id) => {
    const tree = structuredClone(get().tree) as Node[];

    function move(nodes: Node[]): boolean {
      for (const parent of nodes) {
        if (!parent.children) continue;
        const idx = parent.children.findIndex((c) => c.id === id);
        if (idx !== - -1 && idx < parent.children.length - 1) {
          const arr = [...parent.children];
          const [item] = arr.splice(idx, 1);
          arr.splice(idx + 1, 0, item);
          parent.children = arr;
          return true;
        }
        if (parent.children && move(parent.children)) return true;
      }
      return false;
    }

    move(tree);
    set({ tree, isDirty: true });
  },

  deleteSelected: () => {
    const ids = get().selectedIds;
    if (ids.length === 0) return;

    const tree = structuredClone(get().tree) as Node[];

    function remove(nodes: Node[]): Node[] {
      return nodes
        .filter((n) => !ids.includes(n.id))
        .map((n) => ({
          ...n,
          children: n.children ? remove(n.children) : undefined,
        }));
    }

    set({
      tree: remove(tree),
      selectedIds: [],
      isDirty: true,
    });
  },

  // NEW — SECTION MANAGER
  removeSection: (id) => {
    set({
      tree: get().tree.filter((n) => n.id !== id),
      isDirty: true,
    });
  },

  moveSection: (id, direction) => {
    const tree = [...get().tree];
    const index = tree.findIndex((n) => n.id === id);
    if (index === -1) return;

    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= tree.length) return;

    [tree[index], tree[swapWith]] = [tree[swapWith], tree[index]];

    set({ tree, isDirty: true });
  },

  duplicateSection: (id) => {
    const tree = [...get().tree];
    const index = tree.findIndex((n) => n.id === id);
    if (index === -1) return;

    const clone = {
      ...tree[index],
      id: crypto.randomUUID(),
    };

    tree.splice(index + 1, 0, clone);

    set({ tree, isDirty: true });
  },

  // NEW — THEME
  updateTheme: (updates) => {
    set((state) => {
      if (!state.templateData?.site?.theme) return state;

      Object.entries(updates).forEach(([key, value]) => {
        state.templateData.site.theme[key] = value;
        document.documentElement.style.setProperty(`--${key}`, value);
      });

      state.isDirty = true;
      return state;
    });
  },

  // NEW — SITE SETTINGS
  updateSiteSettings: (updates) => {
    set((state) => {
      if (!state.templateData?.site) return state;

      Object.entries(updates).forEach(([key, value]) => {
        state.templateData.site[key] = value;
      });

      state.isDirty = true;
      return state;
    });
  },

  // NEW — DIRTY STATE
  isDirty: false,
  lastSavedTree: [],
  markDirty: () => set({ isDirty: true }),
  markClean: () => set({ isDirty: false, lastSavedTree: get().tree }),

  // NEW — PREVIEW MODE
  previewMode: "draft",
  setPreviewMode: (mode) => set({ previewMode: mode }),

  // NEW — MODALS
  modal: null,
  openModal: (name, data) => set({ modal: { name, data } }),
  closeModal: () => set({ modal: null }),
}));
