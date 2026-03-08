import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function HeroDiscountFields({ node }) {
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
      <h4>Hero Discount</h4>

      <FieldEditor label="Heading" value={node.props?.heading} onChange={(v) => update("heading", v)} />
      <FieldEditor label="Subheading" value={node.props?.subheading} onChange={(v) => update("subheading", v)} />
      <FieldEditor label="Text 1" value={node.props?.text1} onChange={(v) => update("text1", v)} />
      <FieldEditor label="Text 2" value={node.props?.text2} onChange={(v) => update("text2", v)} />
    </div>
  );
}
