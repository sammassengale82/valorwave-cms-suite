import React from "react";
import StyleInput from "./StyleInput";
import { useCanvasState } from "../canvas/CanvasState";
import { updateNodeById } from "../canvas/VisualTree";

export default function LayoutPanel({ node }) {
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
      <h4>Layout</h4>

      <StyleInput
        label="Display"
        value={node.styles?.desktop?.display}
        onChange={(v) => updateStyle("display", v)}
      />

      <StyleInput
        label="Flex Direction"
        value={node.styles?.desktop?.flexDirection}
        onChange={(v) => updateStyle("flexDirection", v)}
      />

      <StyleInput
        label="Justify Content"
        value={node.styles?.desktop?.justifyContent}
        onChange={(v) => updateStyle("justifyContent", v)}
      />

      <StyleInput
        label="Align Items"
        value={node.styles?.desktop?.alignItems}
        onChange={(v) => updateStyle("alignItems", v)}
      />
    </div>
  );
}
