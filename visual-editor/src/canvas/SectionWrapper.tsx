import React from "react";
import { useCanvasState } from "./CanvasState";

export default function SectionWrapper({ node, children }: any) {
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const selectOne = useCanvasState((s) => s.selectOne);

  const isSelected = selectedIds.includes(node.id);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    selectOne(node.id);
  }

  return (
    <div
      className={`section-wrapper ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {isSelected && <div className="selection-outline" />}
      {children}
    </div>
  );
}