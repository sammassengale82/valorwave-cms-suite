import React from "react";
import { usePreviewState } from "./PreviewState";
import { useCanvasState } from "../canvas/CanvasState";
import PreviewRenderer from "./PreviewRenderer";

export default function PreviewContainer({ children }: any) {
  const mode = usePreviewState((s) => s.mode);
  const tree = useCanvasState((s) => s.tree);

  // Editor mode → show the canvas editor UI
  if (mode === "editor") return children;

  // Preview mode → show the React-based preview renderer
  return (
    <div className={`preview-container ${mode}`}>
      <PreviewRenderer tree={tree.root} />
    </div>
  );
}
