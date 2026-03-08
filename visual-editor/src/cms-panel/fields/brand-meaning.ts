import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function BrandMeaningFields({ node }) {
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
      <h4>Brand Meaning</h4>

      <FieldEditor label="Heading" value={node.props?.heading} onChange={(v) => update("heading", v)} />
      <FieldEditor label="Paragraph 1" value={node.props?.p1} onChange={(v) => update("p1", v)} />
      <FieldEditor label="Paragraph 2" value={node.props?.p2} onChange={(v) => update("p2", v)} />
      <FieldEditor label="Paragraph 3" value={node.props?.p3} onChange={(v) => update("p3", v)} />
    </div>
  );
}
