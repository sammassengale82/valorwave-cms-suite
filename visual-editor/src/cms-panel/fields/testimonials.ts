import React from "react";
import FieldEditor from "../FieldEditor";
import { useCanvasState } from "../../canvas/CanvasState";
import { updateNodeById } from "../../canvas/VisualTree";

export default function TestimonialsFields({ node }) {
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
      <h4>Testimonials Section</h4>

      <FieldEditor
        label="Heading"
        value={node.props?.heading}
        onChange={(v) => update("heading", v)}
      />

      <FieldEditor
        label="Testimonial 1 Text"
        value={node.props?.t1text}
        onChange={(v) => update("t1text", v)}
      />

      <FieldEditor
        label="Testimonial 1 Author"
        value={node.props?.t1author}
        onChange={(v) => update("t1author", v)}
      />

      <FieldEditor
        label="Testimonial 2 Text"
        value={node.props?.t2text}
        onChange={(v) => update("t2text", v)}
      />

      <FieldEditor
        label="Testimonial 2 Author"
        value={node.props?.t2author}
        onChange={(v) => update("t2author", v)}
      />

      <FieldEditor
        label="Testimonial 3 Text"
        value={node.props?.t3text}
        onChange={(v) => update("t3text", v)}
      />

      <FieldEditor
        label="Testimonial 3 Author"
        value={node.props?.t3author}
        onChange={(v) => update("t3author", v)}
      />
    </div>
  );
}
