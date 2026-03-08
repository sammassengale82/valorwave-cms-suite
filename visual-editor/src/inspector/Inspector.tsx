import React from "react";
import TypographyPanel from "./TypographyPanel";
import ColorPanel from "./ColorPanel";
import SpacingPanel from "./SpacingPanel";
import LayoutPanel from "./LayoutPanel";
import SectionSettings from "./SectionSettings";
import { useCanvasState } from "../canvas/CanvasState";
import { findNodeById } from "../canvas/VisualTree";

export default function Inspector() {
  const selectedId = useCanvasState((s) => s.selectedId);
  const tree = useCanvasState((s) => s.tree);

  if (!selectedId) {
    return (
      <div className="inspector-root empty">
        <p>Select a section or block to edit its styles</p>
      </div>
    );
  }

  const node = findNodeById(tree, selectedId);
  if (!node) {
    return (
      <div className="inspector-root empty">
        <p>Node not found</p>
      </div>
    );
  }

  return (
    <div className="inspector-root">
      <h3 className="inspector-title">{node.component}</h3>

      <SectionSettings node={node} />
      <TypographyPanel node={node} />
      <ColorPanel node={node} />
      <SpacingPanel node={node} />
      <LayoutPanel node={node} />
    </div>
  );
}
