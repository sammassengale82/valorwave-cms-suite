import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import PreviewRenderer from "../visual/PreviewRenderer";
import BlockRenderer from "./BlockRenderer";

export default function PreviewContainer({ mode }: any) {
  const tree = useCanvasState((s) => s.tree);

  if (mode === "preview") {
    return <PreviewRenderer canvasTree={tree} />;
  }

  return (
    <div className="editor-view">
      {tree.map((node: any) => (
        <BlockRenderer key={node.id} node={node} />
      ))}
    </div>
  );
}
