import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function HeroFields({ node }) {
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
      <h4>Hero Section</h4>

      <FieldEditor
        label="Heading"
        value={node.props?.heading}
        onChange={(v) => update("heading", v)}
      />

      <FieldEditor
        label="Tagline"
        value={node.props?.tagline}
        onChange={(v) => update("tagline", v)}
      />

      <FieldEditor
        label="Subline"
        value={node.props?.subline}
        onChange={(v) => update("subline", v)}
      />

      <FieldEditor
        label="CTA Label"
        value={node.props?.ctaLabel}
        onChange={(v) => update("ctaLabel", v)}
      />

      <FieldEditor
        label="CTA Link"
        value={node.props?.ctaHref}
        onChange={(v) => update("ctaHref", v)}
      />
    </div>
  );
}
