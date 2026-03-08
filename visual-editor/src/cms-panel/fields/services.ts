import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function ServicesFields({ node }) {
  const setTree = useCanvasState((s) => s.setTree);
  const tree = useCanvasState((s) => s.tree);

  function update(key: string, value: string) {
    const updated = updateNodeById(tree, node.id, (n) => {
      n.props = n.props || {};
      n.props[key] = value;
    });
    setTree(updated);
  }

  function updateCard(index: number, key: string, value: string) {
    const updated = updateNodeById(tree, node.id, (n) => {
      const card = n.children[index];
      card.props = card.props || {};
      card.props[key] = value;
    });
    setTree(updated);
  }

  return (
    <div className="cms-section">
      <h4>Services Section</h4>

      <FieldEditor
        label="Heading"
        value={node.props?.heading}
        onChange={(v) => update("heading", v)}
      />

      {node.children.map((card, i) => (
        <div key={card.id} className="cms-subsection">
          <h5>Service Card {i + 1}</h5>

          <FieldEditor
            label="Image URL"
            value={card.props?.image}
            onChange={(v) => updateCard(i, "image", v)}
          />

          <FieldEditor
            label="Title"
            value={card.props?.title}
            onChange={(v) => updateCard(i, "title", v)}
          />

          <FieldEditor
            label="Text"
            value={card.props?.text}
            onChange={(v) => updateCard(i, "text", v)}
          />
        </div>
      ))}
    </div>
  );
}
