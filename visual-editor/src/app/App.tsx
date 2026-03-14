import React, { useEffect } from "react";
import { ThemeProvider } from "../themes/ThemeManager";
import ThemeSwitcher from "../themes/ThemeSwitcher";
import PreviewToolbar from "../editor/PreviewToolbar";
import PreviewContainer from "../editor/PreviewContainer";
import Canvas from "../canvas/Canvas";
import InspectorPanel from "../inspector/InspectorPanel";

import { useCanvasState } from "../canvas/CanvasState";
import { loadTemplateFiles } from "../canvas/templateLoader";
import { templatesToTree } from "../canvas/templateMapper";

export default function App() {
  const setTree = useCanvasState((s) => s.setTree);

  useEffect(() => {
    // 1. Load all template JSON files
    const templates = loadTemplateFiles();

    // 2. Convert them into editor nodes
    const tree = templatesToTree(templates);

    // 3. Inject into CanvasState
    setTree(tree);
  }, []);

  return (
    <ThemeProvider>
      <ThemeSwitcher />

      <PreviewToolbar />

      <div className="app-main">
        <PreviewContainer>
          <Canvas />
        </PreviewContainer>

        <InspectorPanel />
      </div>
    </ThemeProvider>
  );
}