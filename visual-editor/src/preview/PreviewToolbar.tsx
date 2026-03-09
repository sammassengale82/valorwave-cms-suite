import React from "react";
import { usePreviewState } from "./PreviewState";

export default function PreviewToolbar() {
  const mode = usePreviewState((s) => s.mode);
  const setMode = usePreviewState((s) => s.setMode);

  return (
    <div className="preview-toolbar">
      <button
        className={mode === "editor" ? "active" : ""}
        onClick={() => setMode("editor")}
      >
        Editor
      </button>

      <button
        className={mode === "preview" ? "active" : ""}
        onClick={() => setMode("preview")}
      >
        Preview
      </button>

      <button
        className={mode === "desktop" ? "active" : ""}
        onClick={() => setMode("desktop")}
      >
        Desktop
      </button>

      <button
        className={mode === "tablet" ? "active" : ""}
        onClick={() => setMode("tablet")}
      >
        Tablet
      </button>

      <button
        className={mode === "mobile" ? "active" : ""}
        onClick={() => setMode("mobile")}
      >
        Mobile
      </button>
    </div>
  );
}