import React, { useEffect, useRef, useState } from "react";
import { compileToVisualTree } from "./compile/compileToVisualTree";

function PreviewRenderer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeReady, setIframeReady] = useState(false);

  // ⭐ Listen for iframe-ready handshake
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "iframe-ready") {
        console.log("Iframe signaled ready");
        setIframeReady(true);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ⭐ Send visual tree ONLY after iframe is ready
  useEffect(() => {
    if (!iframeReady) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    // ⭐ Always compile from template.data.json
    const visualTree = compileToVisualTree();

    console.log("visualTree compiled:", visualTree);

    const win = iframe.contentWindow;
    if (win && typeof win.renderVisualTree === "function") {
      win.renderVisualTree(visualTree);
    }
  }, [iframeReady]); // ❗ canvasTree removed

  return (
    <iframe
      ref={iframeRef}
      src="/preview.html"
      sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
      }}
    />
  );
}

export default React.memo(PreviewRenderer);
