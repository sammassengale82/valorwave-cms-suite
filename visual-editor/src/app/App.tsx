import React from "react";
import PreviewToolbar from "./preview/PreviewToolbar";
import PreviewContainer from "./preview/PreviewContainer";
import Canvas from "./canvas/Canvas";
import InspectorPanel from "./inspector/InspectorPanel";

export default function App() {
  return (
    <div className="app-container">
      <PreviewToolbar />

      <div className="app-main">
        <PreviewContainer>
          <Canvas />
        </PreviewContainer>

        <InspectorPanel />
      </div>
    </div>
  );
}