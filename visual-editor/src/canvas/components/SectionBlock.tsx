import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import type { VisualNode } from "../canvas/VisualTree";
import { BlockWrapper } from "./BlockWrapper";

interface Props {
  node: VisualNode;
}

export function SectionBlock({ node }: Props) {
  const select = useCanvasState((s) => s.select);
  const selectedId = useCanvasState((s) => s.selectedId);
  const hoveredId = useCanvasState((s) => s.hoveredId);

  const isSelected = selectedId === node.id;
  const isHovered = hoveredId === node.id;

  const baseStyles: React.CSSProperties = {
    position: "relative",
    padding: "60px 40px",
    boxSizing: "border-box",
    border: isSelected ? "2px solid #1d4ed8" : isHovered ? "1px dashed #6b7280" : "1px solid transparent",
    marginBottom: "24px",
    background: "#0b0b10"
  };

  return (
    <div
      className="section-block"
      style={baseStyles}
      onClick={(e) => {
        e.stopPropagation();
        select(node.id);
      }}
      onMouseEnter={() => useCanvasState.getState().hover(node.id)}
      onMouseLeave={() => useCanvasState.getState().hover(null)}
    >
      <div className="section-label">
        {node.component}
      </div>
      {node.children?.map((child) => (
        <BlockWrapper key={child.id} node={child} />
      ))}
    </div>
  );
}