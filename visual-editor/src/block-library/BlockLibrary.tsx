import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { BlockPresets } from "./block-presets";
import BlockItem from "./BlockItem";
import type { VisualNode } from "../canvas/VisualTree";

export default function BlockLibrary() {
  const tree = useCanvasState((s) => s.tree);
  const selectedId = useCanvasState((s) => s.selectedId);

  const addBlock = useCanvasState((s) => s.addBlock);
  const removeBlock = useCanvasState((s) => s.removeBlock);
  const duplicateBlock = useCanvasState((s) => s.duplicateBlock);
  const moveBlock = useCanvasState((s) => s.moveBlock);

  if (!selectedId) {
    return (
      <div className="block-library">
        <h3>Blocks</h3>
        <p>Select a section to manage its blocks.</p>
      </div>
    );
  }

  const parent = tree.root.find((n) => n.id === selectedId);
  if (!parent || parent.type !== "section") {
    return (
      <div className="block-library">
        <h3>Blocks</h3>
        <p>Blocks are only available inside sections.</p>
      </div>
    );
  }

  const supportsBlocks = parent.component === "ServicesSection";
  if (!supportsBlocks) {
    return (
      <div className="block-library">
        <h3>Blocks</h3>
        <p>This section does not use blocks.</p>
      </div>
    );
  }

  const blocks: VisualNode[] = parent.children || [];

  function handleAddServiceCard() {
    addBlock(parent.id, "ServiceCard");
  }

  function handleMove(blockId: string, direction: "up" | "down") {
    const index = blocks.findIndex((b) => b.id === blockId);
    if (index === -1) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    moveBlock(parent.id, blockId, newIndex);
  }

  return (
    <div className="block-library">
      <h3>Blocks</h3>

      <BlockItem label="Service Card" onAdd={handleAddServiceCard} />

      <div className="block-list">
        {blocks.map((block, i) => (
          <div key={block.id} className="block-row">