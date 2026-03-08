import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import type { VisualNode } from "../canvas/VisualTree";

interface Props {
  node: VisualNode;
}

export function BlockWrapper({ node }: Props) {
  const select = useCanvasState((s) => s.select);
  const selectedId = useCanvasState((s) => s.selectedId);
  const hoveredId = useCanvasState((s) => s.hoveredId);

  const isSelected = selectedId === node.id;
  const isHovered = hoveredId === node.id;

  const style = {
    ...(node.styles?.desktop || {}),
    border: isSelected
      ? "2px solid #1d4ed8"
      : isHovered
      ? "1px dashed #6b7280"
      : "1px solid transparent",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "6px",
    background: "#0f0f14"
  };

  return (
    <div
      className="block-wrapper"
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        select(node.id);
      }}
      onMouseEnter={() => useCanvasState.getState().hover(node.id)}
      onMouseLeave={() => useCanvasState.getState().hover(null)}
    >
      {node.props?.text || node.props?.title || node.component}
    </div>
  );
}