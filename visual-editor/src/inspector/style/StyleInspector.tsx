import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";
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
    return <div className="style-inspector-empty">Select a component</div>;
  }

  const node = tree.root.find((n) => n.id === selectedId) ||
    tree.root.flatMap((n) => n.children || []).find((c) => c.id === selectedId);

  if (!node) {
    return <div className="style-inspector-empty">Select a component</div>;
  }

  return (
    <div className="style-inspector">
      <ResponsiveTabs />

      <LayoutPanel node={node} />
      <TypographyPanel node={node} />
      <BackgroundPanel node={node} />
      <BorderPanel node={node} />
      <ShadowPanel node={node} />
    </div>
  );
}