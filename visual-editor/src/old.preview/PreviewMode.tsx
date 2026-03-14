import React, { useEffect } from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { useEditorState } from "../state/EditorState";
import PreviewRenderer from "./PreviewRenderer";

export default function PreviewMode() {
  const preview = useEditorState((s) => s.preview);
  const exitPreview = useEditorState((s) => s.exitPreview);
  const tree = useCanvasState((s) => s.tree);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") exitPreview();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [exitPreview]);

  if (!preview) return null;

  return (
    <div className="preview-overlay">
      <button className="preview-exit-btn" onClick={exitPreview}>
        Exit Preview
      </button>

      <div className="preview-content">
        <PreviewRenderer tree={tree.root} />
      </div>
    </div>
  );
}
