import React, { useEffect, useRef } from "react";
import { compileToVisualTree } from "./compile/compileToVisualTree";

export default function PreviewRenderer({ canvasTree }: any) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument!;
    doc.open();

    doc.write(`
  <html>
    <head>
      <link rel="stylesheet" href="/src/index.css" />
    </head>
    <body style="margin:0; padding:0;">
      <div id="root"></div>

      <script>
        console.log("IFRAME HTML LOADED");
      <\/script>

      <script type="module">
        console.log("IMPORTING IFRAME MAIN…");
        import "/src/visual/iframe-main.tsx"
          .then(() => console.log("IFRAME MAIN IMPORTED"))
          .catch(err => console.error("IMPORT ERROR", err));
      <\/script>
    </body>
  </html>
`);

    doc.close();

    const visualTree = compileToVisualTree(canvasTree);

    const interval = setInterval(() => {
      const fn = iframe.contentWindow?.renderVisualTree;
      console.log("CHECKING renderVisualTree:", fn);
      if (fn) {
        fn(visualTree);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [canvasTree]);

  return (
    <iframe
      ref={iframeRef}
      src="about:blank"
      sandbox="allow-scripts allow-same-origin"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        display: "block"
      }}
    />
  );
}
