import React, { useState } from "react";
import { useCanvasState } from "../canvas/CanvasState";
import type { VisualNode } from "../canvas/VisualTree";

interface Props {
  node: VisualNode;
}

export function BlockWrapper({ node }: Props) {
  const select = useCanvasState((s) => s.select);
  const selectedId = useCanvasState((s) => s.selectedId);
  const hoveredId = useCanvasState((s) => s.hoveredId);

  const isSelected = selectedId === node.id;
  const isHovered = hoveredId === node.id;

  const [editing, setEditing] = useState(false);

  const baseStyles: React.CSSProperties = {
    position: "relative",
    padding: "12px 16px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: isSelected ? "2px solid #1d4ed8" : isHovered ? "1px dashed #6b7280" : "1px solid #111827",
    background: "#020617",
    color: "#e5e7eb",
    cursor: "text"
  };

  const text = node.props?.text ?? node.props?.title ?? node.component;

  return (
    <div
      className="block-wrapper"
      style={baseStyles}
      onClick={(e) => {
        e.stopPropagation();
        select(node.id);
        setEditing(true);
      }}
      onMouseEnter={() => useCanvasState.getState().hover(node.id)}
      onMouseLeave={() => useCanvasState.getState().hover(null)}
    >
      {editing ? (
        <input
          autoFocus
          defaultValue={text}
          onBlur={(e) => {
            const value = e.target.value;
            const state = useCanvasState.getState();
            const tree = state.tree;
            const updated = JSON.parse(JSON.stringify(tree)) as typeof tree;

            function update(nodes) {
              for (const n of nodes) {
                if (n.id === node.id) {
                  n.props = { ...(n.props || {}), text: value };
                }
                if (n.children) update(n.children);
              }
            }

            update(updated.root);
            state.setTree(updated);
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            color: "inherit",
            outline: "none"
          }}
        />
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
}