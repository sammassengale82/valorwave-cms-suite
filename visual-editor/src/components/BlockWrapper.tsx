import React from "react";
import { useCanvasState } from "./CanvasState";
import { useDragBlock } from "../dragdrop/useDragBlock";

export default function BlockWrapper({ node, children }: any) {
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const selectOne = useCanvasState((s) => s.selectOne);

  const isSelected = selectedIds.includes(node.id);
  const { onMouseDown } = useDragBlock(node);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    selectOne(node.id);
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
      {children}
    </div>
  );
}