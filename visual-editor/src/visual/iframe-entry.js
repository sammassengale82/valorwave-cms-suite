import React from "react";
import { createRoot } from "react-dom/client";
import SectionRenderer from "./render/SectionRenderer";

window.renderVisualTree = (visualTree) => {
  const mount = document.getElementById("root");
  if (!mount) return;

  const root = createRoot(mount);

  root.render(
    <>
      {visualTree.root.map((node) => (
        <SectionRenderer key={node.id} node={node} />
      ))}
    </>
  );
};
