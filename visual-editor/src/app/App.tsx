import React, { useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Canvas from "../canvas/Canvas";
import Inspector from "../inspector/Inspector";
import CMSPanel from "../cms-panel/CMSPanel";
import DeviceSwitcher from "../devices/DeviceSwitcher";
import SectionLibrary from "../section-library/SectionLibrary";
import BlockLibrary from "../block-library/BlockLibrary";

import ThemeProvider from "../theme/ThemeProvider";
import ThemeEditor from "../theme/ThemeEditor";
import PreviewMode from "../preview/PreviewMode";

import { getDraft, saveDraft } from "../api/api";
import { deserializeFromCMS } from "../serialization/deserializeFromCMS";
import { serializeToCMS } from "../serialization/serializeToCMS";

import { useCanvasState } from "../canvas/CanvasState";
import { useEditorState } from "../state/EditorState";

export default function App() {
  const setTree = useCanvasState((s) => s.setTree);
  const enterPreview = useEditorState((s) => s.enterPreview);

  useEffect(() => {
    (async () => {
      const cms = await getDraft();
      const tree = deserializeFromCMS(cms);
      setTree(tree, false);
    })();
  }, [setTree]);

  async function handleSave() {
    const state = useCanvasState.getState();
    const cms = await getDraft();
    const updated = serializeToCMS(state.tree, cms);
    await saveDraft(updated);
  }

  return (
    <ThemeProvider>
      <PreviewMode />

      <div className="editor-root">
        <div className="editor-body">
          <SectionLibrary />
          <BlockLibrary />
          <Sidebar />
          <Canvas />
          <Inspector />
        </div>

        <ThemeEditor />
        <CMSPanel />
        <DeviceSwitcher />

        <div className="editor-actions">
          <button className="preview-button" onClick={enterPreview}>
            Preview
          </button>

          <button className="save-button" onClick={handleSave}>
            Save Draft
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}