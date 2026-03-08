import React from "react";
import StyleInput from "./StyleInput";
import { useCanvasState } from "../canvas/CanvasState";
import { updateNodeById } from "../canvas/VisualTree";

export default function TypographyPanel({ node }) {
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
      <h4>Typography</h4>

      <StyleInput
        label="Font Size"
        value={node.styles?.desktop?.fontSize}
        onChange={(v) => updateStyle("fontSize", v)}
      />

      <StyleInput
        label="Font Weight"
        value={node.styles?.desktop?.fontWeight}
        onChange={(v) => updateStyle("fontWeight", v)}
      />

      <StyleInput
        label="Line Height"
        value={node.styles?.desktop?.lineHeight}
        onChange={(v) => updateStyle("lineHeight", v)}
      />

      <StyleInput
        label="Letter Spacing"
        value={node.styles?.desktop?.letterSpacing}
        onChange={(v) => updateStyle("letterSpacing", v)}
      />
    </div>
  );
}
