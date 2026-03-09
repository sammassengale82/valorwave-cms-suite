import React, { useEffect, useState } from "react";

import CanvasRenderer from "../canvas/CanvasRenderer";
import SectionLibrary from "../section-library/SectionLibrary";
import BlockLibrary from "../block-library/BlockLibrary";
import Inspector from "../inspector/Inspector";
import CMSPanel from "../cms-panel/CMSPanel";
import DeviceSwitcher from "../devices/DeviceSwitcher";
import PreviewMode from "../preview/PreviewMode";
import ThemeProvider from "../theme/ThemeProvider";
import ThemeEditor from "../theme/ThemeEditor";

import AssetManager from "../asset-manager/AssetManager";

import { getDraft, saveDraft, syncGitHub } from "../api/api";
import { deserializeFromCMS } from "../serialization/deserializeFromCMS";
import { serializeToCMS } from "../serialization/serializeToCMS";

import { useCanvasState } from "../canvas/CanvasState";
import { useEditorState } from "../state/EditorState";

export default function App() {
  const setTree = useCanvasState((s) => s.setTree);
  const enterPreview = useEditorState((s) => s.enterPreview);

  const [assetManagerOpen, setAssetManagerOpen] = useState(false);

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

  async function handleSync() {
    await syncGitHub();
  }

  return (
    <ThemeProvider>
      <PreviewMode />

      <AssetManager
        isOpen={assetManagerOpen}
        onClose={() => setAssetManagerOpen(false)}
      />

      <div className="editor-root">
        <div className="editor-body">
          <SectionLibrary />
          <BlockLibrary />
          <CanvasRenderer />
          <Inspector />
        </div>

        <ThemeEditor />
        <CMSPanel />
        <DeviceSwitcher />

        <div className="editor-actions">
          <button className="preview-button" onClick={enterPreview}>
            Preview
          </button>

          <button
            className="assets-button"
            onClick={() => setAssetManagerOpen(true)}
          >
            Assets
          </button>

          <button className="sync-button" onClick={handleSync}>
            Sync GitHub
          </button>

          <button className="save-button" onClick={handleSave}>
            Save Draft
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}