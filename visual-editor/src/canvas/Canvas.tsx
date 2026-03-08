import React from "react";
import { useCanvasState } from "./CanvasState";
import CanvasRenderer from "./CanvasRenderer";

export default function Canvas() {
  const tree = useCanvasState((s) => s.tree);

  return (
    <div className="canvas-root">
      <CanvasRenderer nodes={tree.root} />
    </div>
  );
}