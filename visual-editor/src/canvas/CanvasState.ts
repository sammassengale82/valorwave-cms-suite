// src/canvas/CanvasState.ts
import { create } from "zustand";
import { loadTemplateFiles } from "./templateLoader";
import { templatesToTree } from "./templateMapper";

export type BlockType = "hero" | "text" | "image" | "button" | "grid";

export type Node = {
  id: string;
  type: "Section" | "Block";
  blockType?: BlockType;
  children?: Node[];

  content?: {
    text?: string;
    imageUrl?: string;
    alt?: string;
    buttonLabel?: string;
    buttonHref?: string;
    [key: string]: any;
  };

  layout?: {
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    width?: string;
    height?: string;
    position?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };

  style?: {
    background?: string;
    color?: string;
    textAlign?: string;
    padding?: string;
    margin?: string;
  };

  responsive?: {
    tablet?: Partial<Node["style"] & Node["layout"]>;
    mobile?: Partial<Node["style"] & Node["layout"]>;
  };

  [key: string]: any;
};

type CanvasState = {
  tree: Node[];
  setTree: (tree: Node[]) => void;

  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  toggleSelect: (id: string) => void;
  selectSingle: (id: string) => void;
  clearSelection: () => void;

  insertSectionAt: (index: number, node: Node) => void;
  addSection: (node: Node) => void;
  insertBlockAt: (parentId: string, index: number, node: Node) => void;

  addBlockToSection: (sectionId: string, block: Node) => void;
  moveBlockUp: (id: string) => void;
  moveBlockDown: (id: string) => void;

  deleteSelected: () => void;
};

const initialTemplates = loadTemplateFiles();
const initialTree = templatesToTree(initialTemplates);

export const useCanvasState = create<CanvasState>((set, get) => ({
  tree: initialTree,

  setTree: (tree) => set({ tree }),

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

  insertSectionAt: (index, node) => {
    const tree = [...get().tree];
    tree.splice(index, 0, node);
    set({ tree });
  },

  addSection: (node) => {
    const tree = [...get().tree, node];
    set({ tree });
  },

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
    set({ tree });
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
    set({ tree });
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
    set({ tree });
  },

  moveBlockDown: (id) => {
    const tree = structuredClone(get().tree) as Node[];

    function move(nodes: Node[]): boolean {
      for (const parent of nodes) {
        if (!parent.children) continue;
        const idx = parent.children.findIndex((c) => c.id === id);
        if (idx !== -1 && idx < parent.children.length - 1) {
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
    set({ tree });
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
    });
  },
}));
