import React from "react";
import { RenderTreeNode } from "../../types/renderNode";
import { RenderNode } from "./RenderNode";

export interface CanvasProps {
  tree: RenderTreeNode[];
  selectedId?: string | null;
  hoveredId?: string | null;
  onSelectNode?: (id: string) => void;
  onHoverNode?: (id: string | null) => void;
}

/**
 * If you already have a CanvasState store, you can:
 * - lift selectedId / hoveredId from that store
 * - pass them into this component
 * - wire onSelectNode / onHoverNode back into your store
 */
export const Canvas: React.FC<CanvasProps> = ({
  tree,
  selectedId,
  hoveredId,
  onSelectNode,
  onHoverNode
}) => {
  const handleSelect = (id: string) => {
    onSelectNode?.(id);
  };

  const handleHover = (id: string | null) => {
    onHoverNode?.(id);
  };

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
            selectedId={selectedId ?? null}
            hoveredId={hoveredId ?? null}
            onSelect={handleSelect}
            onHover={handleHover}
          />
        ))}
      </div>
    </div>
  );
};