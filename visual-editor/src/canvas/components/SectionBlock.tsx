import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { SectionComponents } from "./sections";
import type { VisualNode } from "../canvas/VisualTree";

interface Props {
  node: VisualNode;
}

export function SectionBlock({ node }: Props) {
  const select = useCanvasState((s) => s.select);
  const selectedId = useCanvasState((s) => s.selectedId);
  const hoveredId = useCanvasState((s) => s.hoveredId);

  const isSelected = selectedId === node.id;
  const isHovered = hoveredId === node.id;

  const Component = SectionComponents[node.component];

  const style = {
    ...(node.styles?.desktop || {}),
    border: isSelected
      ? "2px solid #1d4ed8"
      : isHovered
      ? "1px dashed #6b7280"
      : "1px solid transparent",
    marginBottom: "24px",
    position: "relative"
  };

  return (
    <div
      className="section-block"
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        select(node.id);
      }}
      onMouseEnter={() => useCanvasState.getState().hover(node.id)}
      onMouseLeave={() => useCanvasState.getState().hover(null)}
    >
      <Component {...node.props} childrenNodes={node.children} />
    </div>
  );
}