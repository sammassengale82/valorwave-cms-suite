import { useCallback, useState } from "react";
import {
  DropPosition,
  DropTarget,
  RenderTreeNode
} from "../types/renderNode";

function insertRelativeToNode(
  nodes: RenderTreeNode[],
  targetId: string,
  position: DropPosition,
  newNode: RenderTreeNode
): RenderTreeNode[] {
  let changed = false;

  const next = nodes.flatMap((node) => {
    // handle before/after at this level
    if (node.id === targetId && (position === "before" || position === "after")) {
      changed = true;
      if (position === "before") {
        return [newNode, node];
      } else {
        return [node, newNode];
      }
    }

    // recurse into children for inside or deeper matches
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

    // handle inside at this node
    if (node.id === targetId && position === "inside") {
      changed = true;
      const children = node.children ? [...node.children, newNode] : [newNode];
      return [{ ...node, children }];
    }

    return [node];
  });

  return changed ? next : nodes;
}

export function useCanvasState(initialTree: RenderTreeNode[]) {
  const [tree, setTree] = useState<RenderTreeNode[]>(initialTree);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dropTarget, setDropTargetState] = useState<DropTarget | null>(null);

  const setDropTarget = useCallback((nodeId: string, position: DropPosition) => {
    setDropTargetState({ nodeId, position });
  }, []);

  const clearDropTarget = useCallback(() => {
    setDropTargetState(null);
  }, []);

  const insertAt = useCallback(
    (nodeId: string, position: DropPosition, block: RenderTreeNode) => {
      setTree((prev) => insertRelativeToNode(prev, nodeId, position, block));
      setDropTargetState(null);
    },
    []
  );

  return {
    tree,
    selectedId,
    hoveredId,
    dropTarget,
    setTree,
    setSelectedId,
    setHoveredId,
    setDropTarget,
    clearDropTarget,
    insertAt
  };
}