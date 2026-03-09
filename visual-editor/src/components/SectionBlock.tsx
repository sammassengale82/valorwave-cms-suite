import React from "react";
import type { VisualNode } from "../canvas/VisualTree";
import { useCanvasState } from "../canvas/CanvasState";
import { useEditorState } from "../state/EditorState";

interface Props {
  node: VisualNode;
  animAttrs?: Record<string, string>;
}

export function SectionBlock({ node, animAttrs = {} }: Props) {
  const select = useCanvasState((s) => s.select);
  const selectedId = useCanvasState((s) => s.selectedId);
  const device = useEditorState((s) => s.device);

  const isSelected = selectedId === node.id;
  const styles = node.styles?.[device] || {};

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    select(node.id);
  }

  return (
    <section
      className={`section-block ${isSelected ? "is-selected" : ""}`}
      onClick={handleClick}
      style={styles}
      {...animAttrs}
    >
      <div className="section-block-inner">
        <div className="section-label">{node.component}</div>
      </div>
    </section>
  );
}