import React, { useEffect, useRef } from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function PreviewFrame() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const tree = useCanvasState((s) => s.tree);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(`
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            window.renderTree = ${renderTree.toString()};
            window.renderTree(${JSON.stringify(tree)});
          </script>
        </body>
      </html>
    `);
    doc.close();
  }, [tree]);

  return (
    <iframe
      ref={iframeRef}
      className="preview-frame"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}

function renderTree(tree) {
  const root = document.getElementById("root");
  root.innerHTML = "";

  function renderNode(node) {
    const el = document.createElement("div");
    el.style.position = node.styles?.desktop?.position || "relative";

    if (node.styles?.desktop) {
      Object.entries(node.styles.desktop).forEach(([k, v]) => {
        el.style[k] = v;
      });
    }

    if (node.content?.text) {
      el.textContent = node.content.text;
    }

    if (node.children) {
      node.children.forEach((child) => {
        el.appendChild(renderNode(child));
      });
    }

    return el;
  }

  tree.forEach((node) => {
    root.appendChild(renderNode(node));
  });
}