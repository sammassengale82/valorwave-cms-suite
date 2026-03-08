import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";
import { useEditorState } from "../../state/EditorState";

export default function BorderPanel({ node }) {
  const updateStyle = useCanvasState((s) => s.updateStyle);
  const device = useEditorState((s) => s.device);

  function set(prop, value) {
    updateStyle(node.id, device, prop, value);
  }

  const styles = node.styles?.[device] || {};

  return (
    <div className="panel border-panel">
      <h4>Border</h4>

      <label>Border Width</label>
      <input
        value={styles.borderWidth || ""}
        onChange={(e) => set("borderWidth", e.target.value)}
        placeholder="e.g. 1px"
      />

      <label>Border Color</label>
      <input
        type="color"
        value={styles.borderColor || "#ffffff"}
        onChange={(e) => set("borderColor", e.target.value)}
      />

      <label>Border Radius</label>
      <input
        value={styles.borderRadius || ""}
        onChange={(e) => set("borderRadius", e.target.value)}
        placeholder="e.g. 8px"
      />
    </div>
  );
}