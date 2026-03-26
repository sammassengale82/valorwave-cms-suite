import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";
import { useEditorState } from "../../state/EditorState";

export default function LayoutPanel({ node }) {
  const updateStyle = useCanvasState((s) => s.updateStyle);
  const device = useEditorState((s) => s.device);
  const styles = node.styles?.[device] || {};

  function set(prop, value) {
    updateStyle(node.id, device, prop, value);
  }

  return (
    <div className="panel layout-panel">
      <h4>Layout</h4>

      <label>Width</label>
      <input
        value={styles.width || ""}
        onChange={(e) => set("width", e.target.value)}
        placeholder="e.g. 100%, auto, 400px"
      />

      <label>Height</label>
      <input
        value={styles.height || ""}
        onChange={(e) => set("height", e.target.value)}
        placeholder="e.g. auto, 1800px"
      />

      <label>Padding</label>
      <input
        value={styles.padding || ""}
        onChange={(e) => set("padding", e.target.value)}
        placeholder="e.g. 16px 24px"
      />

      <label>Margin</label>
      <input
        value={styles.margin || ""}
        onChange={(e) => set("margin", e.target.value)}
        placeholder="e.g. 0 auto"
      />

      <label>Display</label>
      <select
        value={styles.display || ""}
        onChange={(e) => set("display", e.target.value)}
      >
        <option value=""></option>
        <option value="block">block</option>
        <option value="flex">flex</option>
        <option value="grid">grid</option>
      </select>

      <label>Flex Direction</label>
      <select
        value={styles.flexDirection || ""}
        onChange={(e) => set("flexDirection", e.target.value)}
      >
        <option value=""></option>
        <option value="row">row</option>
        <option value="column">column</option>
      </select>

      <label>Justify Content</label>
      <select
        value={styles.justifyContent || ""}
        onChange={(e) => set("justifyContent", e.target.value)}
      >
        <option value=""></option>
        <option value="flex-start">flex-start</option>
        <option value="center">center</option>
        <option value="flex-end">flex-end</option>
        <option value="space-between">space-between</option>
      </select>

      <label>Align Items</label>
      <select
        value={styles.alignItems || ""}
        onChange={(e) => set("alignItems", e.target.value)}
      >
        <option value=""></option>
        <option value="flex-start">flex-start</option>
        <option value="center">center</option>
        <option value="flex-end">flex-end</option>
      </select>

      <label>Gap</label>
      <input
        value={styles.gap || ""}
        onChange={(e) => set("gap", e.target.value)}
        placeholder="e.g. 16px"
      />
    </div>
  );
}