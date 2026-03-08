import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export function BlockWrapper({ node }) {
  const select = useCanvasState((s) => s.select);
  const selectedId = useCanvasState((s) => s.selectedId);

  const isSelected = selectedId === node.id;

  return (
    <div
      className={`block-wrapper ${isSelected ? "selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        select(node.id);
      }}
      style={node.styles}
    >
      {/* Later: dynamic component rendering */}
      <div className="block-content">
        {node.props?.text || node.component}
      </div>
    </div>
  );
}