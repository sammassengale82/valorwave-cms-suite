// src/visual/iframe-renderer.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { PageRenderer } from "./render/PageRenderer";

export function renderIntoIframe(visualTree: any) {
  // ⭐ We are already inside the iframe — use its own document
  const doc = document;

  const mount = doc.getElementById("root");
  if (!mount) {
    console.warn("No #root inside iframe");
    return;
  }

  // ⭐ Store React root globally to avoid remounting
  if (!window.__previewRoot) {
    window.__previewRoot = createRoot(mount);
  }

  window.__previewRoot.render(
    <PageRenderer sections={visualTree.root} />
  );
}
