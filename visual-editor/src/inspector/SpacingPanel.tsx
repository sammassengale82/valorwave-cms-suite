import React from "react";
import StyleInput from "./StyleInput";
import { useCanvasState } from "../canvas/CanvasState";
import { updateNodeById } from "../canvas/VisualTree";

export default function SpacingPanel({ node }) {
  const setTree = useCanvasState((s) => s.setTree);
  const tree = useCanvasState((s) => s.tree);

  function updateStyle(key: string, value: string) {
    const updated = updateNodeById(tree, node.id, (n) => {
      n.styles = n.styles || {};
      n.styles.desktop = n.styles.desktop || {};
      n.styles.desktop[key] = value;
    });
    setTree(updated);
  }

  return (
    <div className="inspector-panel">
      <h4>Spacing</h4>

      <StyleInput
        label="Padding"
        value={node.styles?.desktop?.padding}
        onChange={(v) => updateStyle("padding", v)}
      />

      <StyleInput
        label="Margin"
        value={node.styles?.desktop?.margin}
        onChange={(v) => updateStyle("margin", v)}
      />
    </div>
  );
}
