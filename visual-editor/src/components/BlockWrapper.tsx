import React from "react";
import { useCanvasState } from "./CanvasState";

export default function BlockWrapper({ node, children }: any) {
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const selectOne = useCanvasState((s) => s.selectOne);
  const toggleSelect = useCanvasState((s) => s.toggleSelect);
  const selectMultiple = useCanvasState((s) => s.selectMultiple);

  const removeBlock = useCanvasState((s) => s.removeBlock);
  const duplicateBlock = useCanvasState((s) => s.duplicateBlock);

  const isSelected = selectedIds.includes(node.id);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const mod = isMac ? e.metaKey : e.ctrlKey;

    if (e.shiftKey) {
      // Add to selection
      selectMultiple([...selectedIds, node.id]);
      return;
    }

    if (mod) {
      // Toggle selection
      toggleSelect(node.id);
      return;
    }

    // Normal click → single select
    selectOne(node.id);
  }

  return (
    <div
      className={`block-wrapper ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {/* Selection outline */}
      {isSelected && <div className="selection-outline" />}

      <div className="block-actions">
        <button onClick={() => duplicateBlock(node.id)}>Duplicate</button>
        <button onClick={() => removeBlock(node.id)}>Delete</button>
      </div>

      {children}
    </div>
  );
}