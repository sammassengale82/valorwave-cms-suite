import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function GoogleFields({ node }) {
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
      <h4>Google Integrations</h4>

      <FieldEditor
        label="Analytics ID"
        value={node.props?.analytics}
        onChange={(v) => update("analytics", v)}
      />

      <FieldEditor
        label="Tag Manager ID"
        value={node.props?.gtm}
        onChange={(v) => update("gtm", v)}
      />

      <FieldEditor
        label="Site Verification"
        value={node.props?.verification}
        onChange={(v) => update("verification", v)}
      />
    </div>
  );
}
