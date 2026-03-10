import React from "react";
import { ThemeProvider } from "./themes/ThemeManager";
import ThemeSwitcher from "./themes/ThemeSwitcher";
import PreviewToolbar from "./preview/PreviewToolbar";
import PreviewContainer from "./preview/PreviewContainer";
import Canvas from "./canvas/Canvas";
import InspectorPanel from "./inspector/InspectorPanel";

export default function App() {
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