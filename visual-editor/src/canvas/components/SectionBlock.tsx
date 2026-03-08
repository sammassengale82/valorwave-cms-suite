import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { BlockWrapper } from "./BlockWrapper";

export function SectionBlock({ node }) {
  const select = useCanvasState((s) => s.select);
  const selectedId = useCanvasState((s) => s.selectedId);

  const isSelected = selectedId === node.id;

  return (
    <div
      className={`section-block ${isSelected ? "selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        select(node.id);
      }}
      style={node.styles}
    >
      {node.children?.map((child) => (
        <BlockWrapper key={child.id} node={child} />
      ))}
    </div>
  );
}