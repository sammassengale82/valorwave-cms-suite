// src/inspector/ContentInspector.tsx
import React from "react";
import { useCanvasState, Node } from "../canvas/CanvasState";

export default function ContentInspector() {
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const tree = useCanvasState((s) => s.tree);
  const setTree = useCanvasState((s) => s.setTree);

  const nodes = findNodes(tree, selectedIds);

  if (nodes.length === 0) {
    return <div className="content-inspector empty">No selection</div>;
  }

  const sharedFields = getSharedContentFields(nodes);

  if (sharedFields.length === 0) {
    return (
      <div className="content-inspector empty">
        No shared content fields across selected blocks
      </div>
    );
  }

  function updateField(field: keyof NonNullable<Node["content"]>, value: string) {
    const newTree = structuredClone(tree) as Node[];

    selectedIds.forEach((id) => {
      const node = findNode(newTree, id);
      if (!node) return;
      if (!node.content) node.content = {};
      (node.content as any)[field] = value;
    });

    setTree(newTree);
  }

  function getValue(field: keyof NonNullable<Node["content"]>): string {
    const values = nodes.map((n) => n.content?.[field]);
    const unique = [...new Set(values)];
    if (unique.length === 1) {
      return (unique[0] as string) ?? "";
    }
    return "";
  }

  return (
    <div className="content-inspector">
      {sharedFields.includes("text") && (
        <div className="inspector-field">
          <label>Text</label>
          <textarea
            value={getValue("text")}
            onChange={(e) => updateField("text", e.target.value)}
          />
        </div>
      )}

      {sharedFields.includes("imageUrl") && (
        <div className="inspector-field">
          <label>Image URL</label>
          <input
            type="text"
            value={getValue("imageUrl")}
            onChange={(e) => updateField("imageUrl", e.target.value)}
          />
        </div>
      )}

      {sharedFields.includes("buttonLabel") && (
        <div className="inspector-field">
          <label>Button Label</label>
          <input
            type="text"
            value={getValue("buttonLabel")}
            onChange={(e) => updateField("buttonLabel", e.target.value)}
          />
        </div>
      )}

      {sharedFields.includes("buttonHref") && (
        <div className="inspector-field">
          <label>Button Link</label>
          <input
            type="text"
            value={getValue("buttonHref")}
            onChange={(e) => updateField("buttonHref", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

function findNodes(tree: Node[], ids: string[]): Node[] {
  const out: Node[] = [];
  ids.forEach((id) => {
    const n = findNode(tree, id);
    if (n) out.push(n);
  });
  return out;
}

function findNode(nodes: Node[], id: string): Node | null {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const found = findNode(n.children, id);
      if (found) return found;
    }
  }
  return null;
}

function getSharedContentFields(nodes: Node[]): (keyof NonNullable<Node["content"]>)[] {
  const allFields: (keyof NonNullable<Node["content"]>)[] = [
    "text",
    "imageUrl",
    "buttonLabel",
    "buttonHref",
  ];

  return allFields.filter((field) =>
    nodes.every((n) => n.content && field in n.content!)
  );
}
