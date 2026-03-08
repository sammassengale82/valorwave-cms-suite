import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";
import { useEditorState } from "../../state/EditorState";

export default function ShadowPanel({ node }) {
  const updateStyle = useCanvasState((s) => s.updateStyle);
  const device = useEditorState((s) => s.device);

  function set(prop, value) {
    updateStyle(node.id, device, prop, value);
  }

  const styles = node.styles?.[device] || {};

  return (
    <div className="panel shadow-panel">
      <h4>Shadow</h4>

      <label>Box Shadow</label>
      <input
        value={styles.boxShadow || ""}
        onChange={(e) => set("boxShadow", e.target.value)}
        placeholder="e.g. 0 4px 12px rgba(0,0,0,0.2)"
      />
    </div>
  );
}