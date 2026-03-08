import React from "react";
import StyleInput from "./StyleInput";
import { useCanvasState } from "../canvas/CanvasState";
import { updateNodeById } from "../canvas/VisualTree";

export default function ColorPanel({ node }) {
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
      <h4>Colors</h4>

      <StyleInput
        label="Text Color"
        value={node.styles?.desktop?.color}
        onChange={(v) => updateStyle("color", v)}
        type="color"
      />

      <StyleInput
        label="Background Color"
        value={node.styles?.desktop?.backgroundColor}
        onChange={(v) => updateStyle("backgroundColor", v)}
        type="color"
      />
    </div>
  );
}
