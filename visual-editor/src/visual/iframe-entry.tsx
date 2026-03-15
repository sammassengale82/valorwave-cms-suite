import React from "react";
import { createRoot } from "react-dom/client";
import SectionRenderer from "./render/SectionRenderer";

declare global {
  interface Window {
    renderVisualTree?: (visualTree: any) => void;
  }
}

window.renderVisualTree = (visualTree: any) => {
  const mount = document.getElementById("root");
  if (!mount) return;

  const root = createRoot(mount);

  root.render(
    <>
      {visualTree.root.map((node: any) => (
        <SectionRenderer key={node.id} node={node} />
      ))}
    </>
  );
};
