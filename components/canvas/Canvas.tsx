import React from "react";
import { RenderTreeNode } from "../../types/renderNode";
import { RenderNode } from "./RenderNode";
import { useCanvasState } from "../../hooks/useCanvasState";

export interface CanvasProps {
  initialTree: RenderTreeNode[];
}

export const Canvas: React.FC<CanvasProps> = ({ initialTree }) => {
  const {
    tree,
    selectedId,
    hoveredId,
    dropTarget,
    setSelectedId,
    setHoveredId,
    setDropTarget,
    clearDropTarget,
    insertAt
  } = useCanvasState(initialTree);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        background: "#e2e8f0",
        padding: 24,
        boxSizing: "border-box",
        overflow: "auto"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          background: "#ffffff",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)"
        }}
      >
        {tree.map((node) => (
          <RenderNode
            key={node.id}
            node={node}
            selectedId={selectedId}
            hoveredId={hoveredId}
            dropTarget={dropTarget}
            onSelect={setSelectedId}
            onHover={setHoveredId}
            onDropZoneEnter={setDropTarget}
            onDropZoneLeave={clearDropTarget}
            onDrop={(nodeId, position, data) => {
              insertAt(nodeId, position, data as RenderTreeNode);
            }}
          />
        ))}
      </div>
    </div>
  );
};