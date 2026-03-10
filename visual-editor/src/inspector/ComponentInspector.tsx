import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function ComponentInspector() {
  const tree = useCanvasState((s) => s.tree);
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const updateContent = useCanvasState((s) => s.updateContent);

  if (selectedIds.length !== 1) {
    return (
      <div className="inspector-empty">
        Select a single block to edit component properties.
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

  const props = node.props || {};

  function updateProp(key: string, value: any) {
    updateContent(id, key, value);
  }

  return (
    <div className="component-inspector">
      {Object.keys(props).length === 0 && (
        <div className="inspector-empty">No component props</div>
      )}

      {Object.entries(props).map(([key, value]) => (
        <div key={key} className="component-row">
          <label>{key}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => updateProp(key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}