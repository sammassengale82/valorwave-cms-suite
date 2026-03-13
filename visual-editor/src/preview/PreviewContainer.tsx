import React from "react";
import { usePreviewState } from "./PreviewState";
import { useCanvasState } from "../canvas/CanvasState";
import PreviewRenderer from "./PreviewRenderer";

export default function PreviewContainer({ children }: any) {
  const mode = usePreviewState((s) => s.mode);
  const tree = useCanvasState((s) => s.tree);

  if (mode === "editor") return children;

  return (
    <div className={`preview-container ${mode}`}>
      <PreviewRenderer tree={tree.root} />
    </div>
  );
}
