import React from "react";
import { useCanvasState } from "./CanvasState";

export default function SectionWrapper({ node, children }: any) {
  const selectedIds = useCanvasState((s: any) => s.selectedIds);
  const selectOne = useCanvasState((s: any) => s.selectOne);
  const setSectionReplaceTarget = useCanvasState(
    (s: any) => s.setSectionReplaceTarget
  );

  const isSelected = selectedIds.includes(node.id);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    selectOne(node.id);
  }

  function handleReplaceClick(e: React.MouseEvent) {
    e.stopPropagation();
    setSectionReplaceTarget(node.id);
  }

  return (
    <div
      className={`section-wrapper ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      style={{
        position: "relative",
        padding: "20px"
      }}
    >
      {isSelected && (
        <>
          <div className="selection-outline" />
          <button
            className="replace-btn"
            onClick={handleReplaceClick}
          >
            Replace Section
          </button>
        </>
      )}
      {children}
    </div>
  );
}