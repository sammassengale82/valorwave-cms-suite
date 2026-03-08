import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function WeddingDJFields({ node }) {
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
      <h4>Wedding DJ Section</h4>

      <FieldEditor label="Heading" value={node.props?.heading} onChange={(v) => update("heading", v)} />
      <FieldEditor label="Intro" value={node.props?.intro} onChange={(v) => update("intro", v)} />

      <FieldEditor label="Card 1 Title" value={node.props?.c1title} onChange={(v) => update("c1title", v)} />
      <FieldEditor label="Card 1 Text" value={node.props?.c1text} onChange={(v) => update("c1text", v)} />

      <FieldEditor label="Card 2 Title" value={node.props?.c2title} onChange={(v) => update("c2title", v)} />
      <FieldEditor label="Card 2 Text" value={node.props?.c2text} onChange={(v) => update("c2text", v)} />

      <FieldEditor label="Card 3 Title" value={node.props?.c3title} onChange={(v) => update("c3title", v)} />
      <FieldEditor label="Card 3 Text" value={node.props?.c3text} onChange={(v) => update("c3text", v)} />
    </div>
  );
}
