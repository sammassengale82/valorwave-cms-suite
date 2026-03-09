import React, { useRef } from "react";
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
      selectMultiple([...selectedIds, node.id]);
      return;
    }

    if (mod) {
      toggleSelect(node.id);
      return;
    }

    selectOne(node.id);
  }

  const isAbsolute = node.styles?.desktop?.position === "absolute";

  return (
    <div
      className={`block-wrapper ${isSelected ? "selected" : ""} ${
        isAbsolute ? "absolute" : ""
      }`}
      onClick={handleClick}
      style={isAbsolute ? node.styles?.desktop : {}}
    >
      {isSelected && <div className="selection-outline" />}

      <div className="block-actions">
        <button onClick={() => duplicateBlock(node.id)}>Duplicate</button>
        <button onClick={() => removeBlock(node.id)}>Delete</button>
      </div>

      {children}
    </div>
  );
}