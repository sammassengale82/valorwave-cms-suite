import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";
import { useEditorState } from "../../state/EditorState";

export default function TypographyPanel({ node }) {
  const updateStyle = useCanvasState((s) => s.updateStyle);
  const device = useEditorState((s) => s.device);

  function set(prop, value) {
    updateStyle(node.id, device, prop, value);
  }

  const styles = node.styles?.[device] || {};

  return (
    <div className="panel typography-panel">
      <h4>Typography</h4>

      <label>Font Size</label>
      <input
        value={styles.fontSize || ""}
        onChange={(e) => set("fontSize", e.target.value)}
        placeholder="e.g. 16px"
      />

      <label>Font Weight</label>
      <input
        value={styles.fontWeight || ""}
        onChange={(e) => set("fontWeight", e.target.value)}
        placeholder="e.g. 400, 600, 700"
      />

      <label>Line Height</label>
      <input
        value={styles.lineHeight || ""}
        onChange={(e) => set("lineHeight", e.target.value)}
        placeholder="e.g. 1.4"
      />

      <label>Letter Spacing</label>
      <input
        value={styles.letterSpacing || ""}
        onChange={(e) => set("letterSpacing", e.target.value)}
        placeholder="e.g. 0.5px"
      />

      <label>Color</label>
      <input
        type="color"
        value={styles.color || "#ffffff"}
        onChange={(e) => set("color", e.target.value)}
      />
    </div>
  );
}