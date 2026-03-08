import React from "react";
import { useEditorState } from "../state/EditorState";
import CanvasRenderer from "./CanvasRenderer";

export default function Canvas() {
  const draft = useEditorState((s) => s.draft);

  return (
    <div className="canvas-root">
      <CanvasRenderer data={draft} />
    </div>
  );
}