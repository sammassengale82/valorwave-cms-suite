import React from "react";
import { useCanvasState } from "./CanvasState";

export default function SectionWrapper({ node, children }: any) {
  const selectedIds = useCanvasState((s: any) => s.selectedIds);
  const selectOne = useCanvasState((s: any) => s.selectOne);
  const setReplaceTarget = useCanvasState((s: any) => s.setReplaceTarget);

  const isSelected = selectedIds.includes(node.id);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    selectOne(node.id);
  }

  function handleReplaceClick(e: React.MouseEvent) {
    e.stopPropagation();
    setReplaceTarget(node.id);
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
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
              fontSize: 11,
              padding: "4px 8px",
              borderRadius: 999,
              border: "1px solid #1565c0",
              background: "#ffffff",
              cursor: "pointer"
            }}
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