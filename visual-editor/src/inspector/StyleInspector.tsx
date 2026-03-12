// src/inspector/StyleInspector.tsx
import React from "react";
import { useCanvasState, Node } from "../canvas/CanvasState";

export default function StyleInspector() {
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const tree = useCanvasState((s) => s.tree);
  const setTree = useCanvasState((s) => s.setTree);

  const nodes = findNodes(tree, selectedIds);

  function getMixed(prop: keyof NonNullable<Node["style"]>) {
    if (nodes.length === 0) return "";
    const values = nodes.map((n) => n.style?.[prop]);
    const unique = [...new Set(values)];
    return unique.length > 1 ? "" : (unique[0] as string) ?? "";
  }

  function update(prop: keyof NonNullable<Node["style"]>, value: string) {
    const newTree = structuredClone(tree) as Node[];

    selectedIds.forEach((id) => {
      const node = findNode(newTree, id);
      if (!node) return;
      if (!node.style) node.style = {};
      (node.style as any)[prop] = value;
    });

    setTree(newTree);
  }

  if (nodes.length === 0) {
    return <div className="style-inspector empty">No selection</div>;
  }

  return (
    <div className="style-inspector">
      <div className="inspector-field">
        <label>Background</label>
        <input
          type="color"
          value={getMixed("background") || "#ffffff"}
          onChange={(e) => update("background", e.target.value)}
        />
      </div>

      <div className="inspector-field">
        <label>Padding</label>
        <input
          type="number"
          value={getMixed("padding")}
          onChange={(e) => update("padding", e.target.value)}
        />
      </div>
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
