import { create } from "zustand";

type Node = {
  id: string;
  type: string;
  children?: Node[];
  [key: string]: any;
};

type CanvasState = {
  tree: Node[];
  setTree: (tree: Node[]) => void;
  insertSectionAt: (index: number, node: Node) => void;
  addSection: (node: Node) => void;
  insertBlockAt: (parentId: string, index: number, node: Node) => void;
};

export const useCanvasState = create<CanvasState>((set, get) => ({
  tree: [],
  setTree: (tree) => set({ tree }),

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
  }
}));
