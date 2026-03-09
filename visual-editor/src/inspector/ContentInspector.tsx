import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function ContentInspector() {
  const tree = useCanvasState((s) => s.tree);
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const updateContent = useCanvasState((s) => s.updateContent);

  if (selectedIds.length === 0) {
    return <div className="inspector-empty">No block selected</div>;
  }

  // ------------------------------------------------------------
  // COLLECT SELECTED NODES
  // ------------------------------------------------------------
  function findNodeById(nodes: any[], id: string): any | null {
    for (const n of nodes) {
      if (n.id === id) return n;
      const child = findNodeById(n.children || [], id);
      if (child) return child;
    }
    return null;
  }

  const selectedNodes = selectedIds
    .map((id) => findNodeById(tree, id))
    .filter(Boolean);

  // ------------------------------------------------------------
  // DETERMINE SHARED CONTENT FIELDS
  // ------------------------------------------------------------
  const allFields = selectedNodes.map((n: any) => Object.keys(n.content || {}));
  const sharedFields = allFields.reduce((acc, fields) =>
    acc.filter((f) => fields.includes(f))
  );

  if (sharedFields.length === 0) {
    return (
      <div className="inspector-empty">
        No shared content fields across selected blocks
      </div>
    );
  }

  // ------------------------------------------------------------
  // HELPER: GET MIXED OR UNIFIED VALUE
  // ------------------------------------------------------------
  function getMixedValue(field: string) {
    const values = selectedNodes.map((n: any) => n.content?.[field]);
    const unique = Array.from(new Set(values));

    if (unique.length === 1) return unique[0];
    return "__MIXED__";
  }

  // ------------------------------------------------------------
  // APPLY CONTENT TO ALL SELECTED
  // ------------------------------------------------------------
  function applyToAll(field: string, value: any) {
    selectedIds.forEach((id) => updateContent(id, field, value));
  }

  return (
    <div className="content-inspector">
      <h3>Content ({selectedIds.length} selected)</h3>

      {sharedFields.map((field) => {
        const value = getMixedValue(field);
        const isMixed = value === "__MIXED__";

        return (
          <div key={field} className="content-row">
            <label>{field}</label>

            <input
              type="text"
              placeholder={isMixed ? "— mixed —" : ""}
              value={isMixed ? "" : value || ""}
              onChange={(e) => applyToAll(field, e.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
}