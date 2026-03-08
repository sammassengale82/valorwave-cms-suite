import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function FAQFields({ node }) {
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
      <h4>FAQ Section</h4>

      <FieldEditor
        label="Heading"
        value={node.props?.heading}
        onChange={(v) => update("heading", v)}
      />

      <FieldEditor
        label="FAQ 1"
        value={node.props?.faq1}
        onChange={(v) => update("faq1", v)}
      />

      <FieldEditor
        label="FAQ 2"
        value={node.props?.faq2}
        onChange={(v) => update("faq2", v)}
      />

      <FieldEditor
        label="FAQ 3"
        value={node.props?.faq3}
        onChange={(v) => update("faq3", v)}
      />
    </div>
  );
}
