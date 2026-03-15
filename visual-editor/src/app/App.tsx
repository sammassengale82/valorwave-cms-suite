import React, { useEffect } from "react";
import { ThemeProvider } from "../themes/ThemeManager";
import ThemeSwitcher from "../themes/ThemeSwitcher";
import PreviewContainer from "../editor/PreviewContainer";
import Canvas from "../canvas/Canvas";
import InspectorPanel from "../inspector/InspectorPanel";

import { useCanvasState } from "../canvas/CanvasState";
import { loadTemplateFiles } from "../canvas/templateLoader";
import { templatesToTree } from "../canvas/templateMapper";

export default function App() {
  const setTree = useCanvasState((s) => s.setTree);

  useEffect(() => {
    const templates = loadTemplateFiles();
    const tree = templatesToTree(templates);
    setTree(tree);
  }, [setTree]);

  return (
    <ThemeProvider>
      <ThemeSwitcher />

      <div className="app-main">
        {/* Hard-coded preview mode for now */}
        <PreviewContainer mode="preview" />

        <InspectorPanel />
      </div>
    </ThemeProvider>
  );
}
