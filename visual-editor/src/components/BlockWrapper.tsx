import React, { useRef } from "react";
import { useCanvasState } from "./CanvasState";
import WysiwygWrapper from "../wysiwyg/WysiwygWrapper";

export default function BlockWrapper({ node, children }: any) {
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const selectOne = useCanvasState((s) => s.selectOne);
  const toggleSelect = useCanvasState((s) => s.toggleSelect);
  const selectMultiple = useCanvasState((s) => s.selectMultiple);

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

  return (
    <div
      className={`block-wrapper ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {isSelected ? (
        <WysiwygWrapper node={node}>{children}</WysiwygWrapper>
      ) : (
        children
      )}
    </div>
  );
}