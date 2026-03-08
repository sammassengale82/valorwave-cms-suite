import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function ServiceAreaFields({ node }) {
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
      <h4>Service Area</h4>

      <FieldEditor label="Heading" value={node.props?.heading} onChange={(v) => update("heading", v)} />
      <FieldEditor label="Text" value={node.props?.text} onChange={(v) => update("text", v)} />
    </div>
  );
}
