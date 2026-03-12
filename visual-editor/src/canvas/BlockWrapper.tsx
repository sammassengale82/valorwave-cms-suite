// src/canvas/BlockWrapper.tsx
import React from "react";
import { useCanvasState } from "./CanvasState";

type BlockWrapperProps = {
  node: { id: string };
  children: React.ReactNode;
};

export default function BlockWrapper({ node, children }: BlockWrapperProps) {
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const selectSingle = useCanvasState((s) => s.selectSingle);
  const toggleSelect = useCanvasState((s) => s.toggleSelect);
  const setSelectedIds = useCanvasState((s) => s.setSelectedIds);
  const tree = useCanvasState((s) => s.tree);

  const isSelected = selectedIds.includes(node.id);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const mod = isMac ? e.metaKey : e.ctrlKey;

    if (e.shiftKey) {
      if (selectedIds.length === 0) {
        selectSingle(node.id);
        return;
      }

      const allIds = flattenIds(tree);
      const last = selectedIds[selectedIds.length - 1];

      const start = allIds.indexOf(last);
      const end = allIds.indexOf(node.id);

      if (start !== -1 && end !== -1) {
        const range =
          start < end ? allIds.slice(start, end + 1) : allIds.slice(end, start + 1);
        setSelectedIds(range);
      }
      return;
    }

    if (mod) {
      toggleSelect(node.id);
      return;
    }

    selectSingle(node.id);
  }

  return (
    <div
      className={`block-wrapper ${isSelected ? "selected" : ""}`}
      data-block-id={node.id}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

function flattenIds(nodes: any[]): string[] {
  const out: string[] = [];
  function walk(list: any[]) {
    for (const n of list) {
      out.push(n.id);
      if (n.children) walk(n.children);
    }
  }
  walk(nodes);
  return out;
}
