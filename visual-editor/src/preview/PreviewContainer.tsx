import React from "react";
import { usePreviewState } from "./PreviewState";
import PreviewFrame from "./PreviewFrame";

export default function PreviewContainer({ children }: any) {
  const mode = usePreviewState((s) => s.mode);

  if (mode === "editor") return children;

  return (
    <div className={`preview-container ${mode}`}>
      <PreviewFrame />
    </div>
  );
}