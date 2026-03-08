import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function SEOFields({ node }) {
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
      <h4>SEO</h4>

      <FieldEditor
        label="Meta Title"
        value={node.props?.metaTitle}
        onChange={(v) => update("metaTitle", v)}
      />

      <FieldEditor
        label="Meta Description"
        value={node.props?.metaDescription}
        onChange={(v) => update("metaDescription", v)}
      />

      <FieldEditor
        label="Meta Keywords"
        value={node.props?.metaKeywords}
        onChange={(v) => update("metaKeywords", v)}
      />

      <FieldEditor
        label="OG Title"
        value={node.props?.ogTitle}
        onChange={(v) => update("ogTitle", v)}
      />

      <FieldEditor
        label="OG Description"
        value={node.props?.ogDescription}
        onChange={(v) => update("ogDescription", v)}
      />

      <FieldEditor
        label="OG Image URL"
        value={node.props?.ogImage}
        onChange={(v) => update("ogImage", v)}
      />
    </div>
  );
}
