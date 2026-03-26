import React, { useMemo } from "react";
import { useCanvasState } from "../canvas/CanvasState";
import PreviewRenderer from "../visual/PreviewRenderer";
import BlockRenderer from "./BlockRenderer";

export default function PreviewContainer({ mode }: any) {
  const tree = useCanvasState((s) => s.tree);
  const stableTree = useMemo(() => tree, [tree]);

  return (
    <>
      <div
        className="preview-container"
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          overflow: "auto",
          display: "flex",
        }}
      >
        {/* ⭐ PreviewRenderer now handles the iframe and sending the tree */}
        <PreviewRenderer canvasTree={stableTree} />
      </div>

      {mode !== "preview" && (
        <div className="editor-view">
          {tree.map((node: any) => (
            <BlockRenderer key={node.id} node={node} />
          ))}
        </div>
      )}
    </>
  );
}
