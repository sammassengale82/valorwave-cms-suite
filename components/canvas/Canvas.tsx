import React from "react";
import { RenderNode } from "./RenderNode";
import { useCanvasState } from "../../stores/canvasState";

export const Canvas = () => {
  const {
    tree,
    selectedId,
    hoveredId,
    dropTarget,
    setSelectedId,
    setHoveredId,
    setDropTarget,
    clearDropTarget,
    insertAt
  } = useCanvasState();

  return (
    <div> ... </div>
  );
};