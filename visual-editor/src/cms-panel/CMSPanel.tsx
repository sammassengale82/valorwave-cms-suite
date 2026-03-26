import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { serializeToCMS } from "../serialization/serializeToCMS";
import { getDraft, saveDraft } from "../api/api";
import SectionFields from "../editor/SectionFields";

export default function CMSPanel() {
  const tree = useCanvasState((s) => s.tree);

  async function handleSave() {
    const cms = await getDraft();
    const updated = serializeToCMS(tree, cms);
    await saveDraft(updated);
  }

  return (
    <div className="cms-panel-root">
      <h3>CMS Content</h3>
      <SectionFields />
      <button className="cms-save-btn" onClick={handleSave}>
        Save CMS Content
      </button>
    </div>
  );
}
