// src/editor/PreviewModeToggle.tsx
import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function PreviewModeToggle() {
  const previewMode = useCanvasState((s) => s.previewMode);
  const setPreviewMode = useCanvasState((s) => s.setPreviewMode);

  return (
    <div className="preview-mode-toggle">
      <button
        className={previewMode === "draft" ? "active" : ""}
        onClick={() => setPreviewMode("draft")}
      >
        Draft
      </button>

      <button
        className={previewMode === "published" ? "active" : ""}
        onClick={() => setPreviewMode("published")}
      >
        Published
      </button>
    </div>
  );
}
