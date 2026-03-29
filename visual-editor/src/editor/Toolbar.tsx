// src/editor/Toolbar.tsx
import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

import { treeToTemplates } from "../canvas/saveTemplates";
import { saveDraft } from "../canvas/saveDraft";
import PreviewModeToggle from "./PreviewModeToggle";

export default function Toolbar() {
  const tree = useCanvasState((s) => s.tree);
  const isDirty = useCanvasState((s) => s.isDirty);
  const markClean = useCanvasState((s) => s.markClean);
  const openModal = useCanvasState((s) => s.openModal);

  function handleSaveDraft() {
    const templateData = treeToTemplates(tree);
    saveDraft(templateData);
    markClean();
  }

  function handlePublish() {
    openModal("publish");
  }

  return (
    <div className="app-toolbar">
      <div className="toolbar-left">
        <button
          className="toolbar-btn draft"
          onClick={handleSaveDraft}
          disabled={!isDirty}
        >
          {isDirty ? "Save Draft *" : "Save Draft"}
        </button>

        <button className="toolbar-btn publish" onClick={handlePublish}>
          Publish
        </button>
      </div>

      <div className="toolbar-right">
        <PreviewModeToggle />
      </div>
    </div>
  );
}
