import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { usePreviewState } from "./PreviewState";
import { useCanvasState } from "../canvas/CanvasState";
import BlockRenderer from "../canvas/BlockRenderer";
import { AnimationEngine } from "../animations/AnimationEngine";
import "../animations/animation-styles.css";

export default function PreviewRenderer({ tree }: { tree: any }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mode = usePreviewState((s) => s.mode);
  const setScrollY = useCanvasState((s) => s.setScrollY);

  const width =
    mode === "desktop" ? "100%" :
    mode === "tablet" ? "768px" :
    mode === "mobile" ? "390px" :
    "100%";

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(`
      <html>
        <head>
          <link rel="stylesheet" href="/styles/site.css" />
          <style>
            body { margin: 0; padding: 0; overflow-x: hidden; }
          </style>
        </head>
        <body>
          <div id="preview-root"></div>
        </body>
      </html>
    `);
    doc.close();

    const mountPoint = doc.getElementById("preview-root");
    if (!mountPoint) return;

    const root = createRoot(mountPoint);
    root.render(<BlockRenderer node={tree} />);

    const onScroll = () => {
      setScrollY(doc.documentElement.scrollTop || doc.body.scrollTop || 0);
    };
    doc.addEventListener("scroll", onScroll);

    setTimeout(() => {
      try {
        AnimationEngine.init(doc);
      } catch (err) {
        console.error("Animation error:", err);
      }
    }, 50);

    return () => doc.removeEventListener("scroll", onScroll);
  }, [tree, mode, setScrollY]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <iframe
        ref={iframeRef}
        className="preview-iframe"
        style={{
          width,
          height: "100%",
          border: "none",
          background: "white",
        }}
      />
    </div>
  );
}
