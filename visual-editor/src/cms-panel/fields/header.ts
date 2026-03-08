import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function HeaderFields({ node }) {
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
      <h4>Header</h4>

      <FieldEditor label="Logo" value={node.props?.logo} onChange={(v) => update("logo", v)} />
      <FieldEditor label="Brand Text" value={node.props?.brandText} onChange={(v) => update("brandText", v)} />
      <FieldEditor label="Social Links" value={node.props?.socialLinks} onChange={(v) => update("socialLinks", v)} />
    </div>
  );
}
