import { create } from "zustand";
import {
  RenderTreeNode,
  DropPosition,
  DropTarget
} from "../types/renderNode";

function insertRelativeToNode(
  nodes: RenderTreeNode[],
  targetId: string,
  position: DropPosition,
  newNode: RenderTreeNode
): RenderTreeNode[] {
  let changed = false;

  const next = nodes.flatMap((node) => {
    // BEFORE / AFTER at this level
    if (node.id === targetId && (position === "before" || position === "after")) {
      changed = true;
      return position === "before" ? [newNode, node] : [node, newNode];
    }

    // INSIDE
    if (node.id === targetId && position === "inside") {
      changed = true;
      const children = node.children ? [...node.children, newNode] : [newNode];
      return [{ ...node, children }];
    }

    // Recurse into children
    if (node.children && node.children.length > 0) {
      const updatedChildren = insertRelativeToNode(
        node.children,
        targetId,
        position,
        newNode
      );
      if (updatedChildren !== node.children) {
        changed = true;
        return [{ ...node, children: updatedChildren }];
      }
    }

    return [node];
  });

  return changed ? next : nodes;
}

interface CanvasState {
  tree: RenderTreeNode[];

  selectedId: string | null;
  hoveredId: string | null;

  dropTarget: DropTarget | null;

  setTree: (tree: RenderTreeNode[]) => void;

  setSelectedId: (id: string | null) => void;
  setHoveredId: (id: string | null) => void;

  setDropTarget: (nodeId: string, position: DropPosition) => void;
  clearDropTarget: () => void;

  insertAt: (nodeId: string, position: DropPosition, block: RenderTreeNode) => void;
}

export const useCanvasState = create<CanvasState>((set, get) => ({
  tree: [],

  selectedId: null,
  hoveredId: null,

  dropTarget: null,

  setTree: (tree) => set({ tree }),

  setSelectedId: (id) => set({ selectedId: id }),
  setHoveredId: (id) => set({ hoveredId: id }),

  setDropTarget: (nodeId, position) =>
    set({ dropTarget: { nodeId, position } }),

  clearDropTarget: () => set({ dropTarget: null }),

  insertAt: (nodeId, position, block) => {
    const { tree } = get();
    const updated = insertRelativeToNode(tree, nodeId, position, block);
    set({ tree: updated, dropTarget: null });
  }
}));