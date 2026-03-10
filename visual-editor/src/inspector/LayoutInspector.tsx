import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function LayoutInspector() {
  const tree = useCanvasState((s) => s.tree);
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const updateStyle = useCanvasState((s) => s.updateStyle);

  if (selectedIds.length !== 1) {
    return (
      <div className="inspector-empty">
        Select a single block to edit layout.
      </div>
    );
  }

  const id = selectedIds[0];

  function findNode(nodes: any[]): any | null {
    for (const n of nodes) {
      if (n.id === id) return n;
      const child = findNode(n.children || []);
      if (child) return child;
    }
    return null;
  }

  const node = findNode(tree);
  if (!node) return null;

  const layoutProps = [
    "display",
    "flexDirection",
    "justifyContent",
    "alignItems",
    "gap",
    "width",
    "height",
    "position",
    "top",
    "left",
    "right",
    "bottom",
  ];

  function getValue(prop: string) {
    return node.styles?.desktop?.[prop] || "";
  }

  function setValue(prop: string, value: any) {
    updateStyle(id, "desktop", prop, value);
  }

  return (
    <div className="layout-inspector">
      {layoutProps.map((prop) => (
        <div key={prop} className="layout-row">
          <label>{prop}</label>
          <input
            type="text"
            value={getValue(prop)}
            onChange={(e) => setValue(prop, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}