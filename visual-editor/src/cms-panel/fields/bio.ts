import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function BioFields({ node }) {
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
      <h4>Bio Section</h4>

      <FieldEditor
        label="Heading"
        value={node.props?.heading}
        onChange={(v) => update("heading", v)}
      />

      <FieldEditor
        label="Image URL"
        value={node.props?.image}
        onChange={(v) => update("image", v)}
      />

      <FieldEditor
        label="Name"
        value={node.props?.name}
        onChange={(v) => update("name", v)}
      />

      <FieldEditor
        label="Paragraph 1"
        value={node.props?.text1}
        onChange={(v) => update("text1", v)}
      />

      <FieldEditor
        label="Paragraph 2"
        value={node.props?.text2}
        onChange={(v) => update("text2", v)}
      />

      <FieldEditor
        label="Paragraph 3"
        value={node.props?.text3}
        onChange={(v) => update("text3", v)}
      />
    </div>
  );
}
