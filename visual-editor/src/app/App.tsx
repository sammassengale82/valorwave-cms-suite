import React, { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Canvas from "../canvas/Canvas";
import Inspector from "../inspector/Inspector";
import CMSPanel from "../cms-panel/CMSPanel";
import DeviceSwitcher from "../devices/DeviceSwitcher";
import SectionLibrary from "../section-library/SectionLibrary";

import { getDraft, saveDraft } from "../api/api";
import { deserializeFromCMS } from "../serialization/deserializeFromCMS";
import { serializeToCMS } from "../serialization/serializeToCMS";

import { useCanvasState } from "../canvas/CanvasState";

export default function App() {
  const setTree = useCanvasState((s) => s.setTree);

  // -----------------------------
  // INITIAL LOAD
  // -----------------------------
  useEffect(() => {
    (async () => {
      const cms = await getDraft();
      const tree = deserializeFromCMS(cms);
      setTree(tree, false);
    })();
  }, [setTree]);

  // -----------------------------
  // SAVE HANDLER
  // -----------------------------
  async function handleSave() {
    const state = useCanvasState.getState();
    const cms = await getDraft();
    const updated = serializeToCMS(state.tree, cms);
    await saveDraft(updated);
  }

  return (
    <div className="editor-root">
      <div className="editor-body">
        <SectionLibrary />
        <Sidebar />
        <Canvas />
        <Inspector />
      </div>

      <CMSPanel />
      <DeviceSwitcher />

      <button className="save-button" onClick={handleSave}>
        Save Draft
      </button>
    </div>
  );
}