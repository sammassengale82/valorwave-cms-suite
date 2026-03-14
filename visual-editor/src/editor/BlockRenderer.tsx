import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function BlockRenderer({ node }: any) {
  const selectSingle = useCanvasState((s) => s.selectSingle);
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const isSelected = selectedIds.includes(node.id);

  const highlight = isSelected
    ? { outline: "2px solid #38bdf8", outlineOffset: "2px" }
    : {};

  return (
    <div
      data-node-id={node.id}
      onClick={(e) => {
        e.stopPropagation();
        selectSingle(node.id);
      }}
      style={{ ...(node.styles?.desktop || {}), ...highlight }}
    >
      {node.content?.text}
      {(node.children || []).map((child: any) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}
