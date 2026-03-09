import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";
import { findNodeById } from "../../canvas/VisualTree";
import ResponsiveTabs from "./ResponsiveTabs";
import LayoutPanel from "./LayoutPanel";
import TypographyPanel from "./TypographyPanel";
import BackgroundPanel from "./BackgroundPanel";
import BorderPanel from "./BorderPanel";
import ShadowPanel from "./ShadowPanel";

export default function StyleInspector() {
  const selectedId = useCanvasState((s) => s.selectedId);
  const tree = useCanvasState((s) => s.tree);

  if (!selectedId) {
    return (
      <div className="style-inspector-empty">
        <p>Select a section or block to edit styles</p>
      </div>
    );
  }

  const node = findNodeById(tree, selectedId);
  if (!node) {
    return (
      <div className="style-inspector-empty">
        <p>Node not found</p>
      </div>
    );
  }

  return (
    <div className="style-inspector">
      <h3 className="inspector-title">Styles</h3>

      <ResponsiveTabs />

      <LayoutPanel node={node} />
      <TypographyPanel node={node} />
      <BackgroundPanel node={node} />
      <BorderPanel node={node} />
      <ShadowPanel node={node} />
    </div>
  );
}