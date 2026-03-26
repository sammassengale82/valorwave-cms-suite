import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { findNodeById } from "../canvas/VisualTree";

import ContentInspector from "../inspector/ContentInspector";
import StyleInspector from "../inspector/style/StyleInspector";
import AnimationPanel from "../inspector/style/AnimationPanel";

export default function Inspector() {
  const selectedId = useCanvasState((s) => s.selectedId);
  const tree = useCanvasState((s) => s.tree);

  if (!selectedId) {
    return (
      <div className="inspector-root inspector-empty">
        <p>Select a section or block to edit</p>
      </div>
    );
  }

  const node = findNodeById(tree, selectedId);

  if (!node) {
    return (
      <div className="inspector-root inspector-empty">
        <p>Node not found</p>
      </div>
    );
  }

  return (
    <div className="inspector-root">
      <ContentInspector node={node} />
      <StyleInspector node={node} />
      <AnimationPanel node={node} />
    </div>
  );
}