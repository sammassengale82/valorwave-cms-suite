import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";
import { useEditorState } from "../../state/EditorState";

export default function BackgroundPanel({ node }) {
  const updateStyle = useCanvasState((s) => s.updateStyle);
  const device = useEditorState((s) => s.device);

  function set(prop, value) {
    updateStyle(node.id, device, prop, value);
  }

  const styles = node.styles?.[device] || {};

  return (
    <div className="panel background-panel">
      <h4>Background</h4>

      <label>Background Color</label>
      <input
        type="color"
        value={styles.backgroundColor || "#000000"}
        onChange={(e) => set("backgroundColor", e.target.value)}
      />

      <label>Background Image URL</label>
      <input
        value={styles.backgroundImage || ""}
        onChange={(e) => set("backgroundImage", `url(${e.target.value})`)}
        placeholder="https://example.com/image.jpg"
      />

      <label>Background Size</label>
      <select
        value={styles.backgroundSize || ""}
        onChange={(e) => set("backgroundSize", e.target.value)}
      >
        <option value=""></option>
        <option value="cover">cover</option>
        <option value="contain">contain</option>
      </select>

      <label>Background Position</label>
      <input
        value={styles.backgroundPosition || ""}
        onChange={(e) => set("backgroundPosition", e.target.value)}
        placeholder="e.g. center, top left"
      />

      <label>Background Repeat</label>
      <select
        value={styles.backgroundRepeat || ""}
        onChange={(e) => set("backgroundRepeat", e.target.value)}
      >
        <option value=""></option>
        <option value="no-repeat">no-repeat</option>
        <option value="repeat">repeat</option>
      </select>
    </div>
  );
}