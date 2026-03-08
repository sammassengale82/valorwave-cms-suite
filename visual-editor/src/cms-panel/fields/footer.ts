import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function FooterFields({ node }) {
  const setTree = useCanvasState((s) => s.setTree);
  const tree = useCanvasState((s) => s.tree);

  function update(key: string, value: string) {
    const updated = updateNodeById(tree, node.id, (n) => {
      n.props = n.props || {};
      n.props[key] = value;
    });
    setTree(updated);
  }

  return (
    <div className="cms-section">
      <h4>Footer Section</h4>

      <FieldEditor
        label="Line 1"
        value={node.props?.line1}
        onChange={(v) => update("line1", v)}
      />

      <FieldEditor
        label="Line 2"
        value={node.props?.line2}
        onChange={(v) => update("line2", v)}
      />

      <FieldEditor
        label="Line 3"
        value={node.props?.line3}
        onChange={(v) => update("line3", v)}
      />

      <FieldEditor
        label="Line 4"
        value={node.props?.line4}
        onChange={(v) => update("line4", v)}
      />

      <FieldEditor
        label="Social Links"
        value={node.props?.social}
        onChange={(v) => update("social", v)}
      />
    </div>
  );
}
