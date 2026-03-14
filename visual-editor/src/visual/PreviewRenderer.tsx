import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import SectionRenderer from "./render/SectionRenderer";
import { compileToVisualTree } from "./compile/compileToVisualTree";

export default function PreviewRenderer({ canvasTree }: any) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument!;
    doc.open();
    doc.write(`<html><body><div id="root"></div></body></html>`);
    doc.close();

    const mount = doc.getElementById("root")!;
    const root = createRoot(mount);

    const visualTree = compileToVisualTree(canvasTree);

    root.render(
      <>
        {visualTree.root.map((node: any) => (
          <SectionRenderer key={node.id} node={node} />
        ))}
      </>
    );
  }, [canvasTree]);

  return <iframe ref={iframeRef} style={{ width: "100%", height: "100%" }} />;
}
