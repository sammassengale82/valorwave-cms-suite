import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { useEditorState } from "../state/EditorState";
import BlockRenderer from "../canvas/BlockRenderer";
import { AnimationEngine } from "../animations/AnimationEngine";
import "../animations/animation-styles.css";

export default function PreviewRenderer({ tree }: { tree: any }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewActive = useEditorState((s) => s.previewActive);

  useEffect(() => {
    if (!previewActive) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    //
    // 1. Write base HTML into iframe
    //
    doc.open();
    doc.write(`
      <html>
        <head>
          <link rel="stylesheet" href="/styles/site.css" />
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
              font-family: system-ui, sans-serif;
            }
          </style>
        </head>
        <body>
          <div id="preview-root"></div>
        </body>
      </html>
    `);
    doc.close();

    //
    // 2. Mount React into iframe
    //
    const mountPoint = doc.getElementById("preview-root");
    if (!mountPoint) return;

    const root = createRoot(mountPoint);
    root.render(<BlockRenderer node={tree} />);

    //
    // 3. Initialize animations inside iframe
    //
    setTimeout(() => {
      try {
        AnimationEngine.init(doc);
      } catch (err) {
        console.error("Preview animation engine error:", err);
      }
    }, 50);
  }, [previewActive, tree]);

  return (
    <iframe
      ref={iframeRef}
      className="preview-iframe"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        background: "white",
      }}
    />
  );
}
