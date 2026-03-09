import React, { useEffect, useRef } from "react";
import { useEditorState } from "../state/EditorState";
import { AnimationEngine } from "../animations/AnimationEngine";
import "../animations/animation-styles.css";

export default function PreviewRenderer({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewActive = useEditorState((s) => s.previewActive);

  useEffect(() => {
    if (!previewActive) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    // Inject HTML into iframe
    doc.open();
    doc.write(`
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
              font-family: system-ui, sans-serif;
            }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `);
    doc.close();

    // Wait for DOM to be ready
    const runEngine = () => {
      try {
        // Inject animation CSS
        const style = doc.createElement("style");
        style.textContent = require("../animations/animation-styles.css").default;
        doc.head.appendChild(style);

        // Run animation engine inside iframe
        AnimationEngine.init();
      } catch (err) {
        console.error("Preview animation engine error:", err);
      }
    };

    // Delay ensures DOM is fully parsed
    setTimeout(runEngine, 50);
  }, [previewActive, html]);

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