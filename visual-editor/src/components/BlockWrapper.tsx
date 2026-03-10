import React from "react";
import { useCanvasState } from "./CanvasState";
import { useDragBlock } from "../dragdrop/useDragBlock";

export default function BlockWrapper({ node, children }: any) {
  const selectedIds = useCanvasState((s: any) => s.selectedIds);
  const selectOne = useCanvasState((s: any) => s.selectOne);
  const setBlockReplaceTarget = useCanvasState(
    (s: any) => s.setBlockReplaceTarget
  );

  const isSelected = selectedIds.includes(node.id);
  const { onMouseDown } = useDragBlock(node);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    selectOne(node.id);
  }

  function handleReplaceClick(e: React.MouseEvent) {
    e.stopPropagation();
    setBlockReplaceTarget(node.id);
  }

  const isAbsolute = node.styles?.desktop?.position === "absolute";

  return (
    <div
      className={`block-wrapper ${isSelected ? "selected" : ""} ${
        isAbsolute ? "absolute" : ""
      }`}
      onClick={handleClick}
      onMouseDown={isAbsolute ? onMouseDown : undefined}
      style={isAbsolute ? node.styles?.desktop : {}}
    >
      {isSelected && (
        <>
          <div className="selection-outline" />
          <button
            className="replace-btn"
            onClick={handleReplaceClick}
          >
            Replace Block
          </button>
        </>
      )}
      {children}
    </div>
  );
}