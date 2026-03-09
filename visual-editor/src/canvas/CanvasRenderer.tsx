import React from "react";
import { useCanvasState } from "./CanvasState";
import { useEditorState } from "../state/EditorState";
import { SectionBlock } from "../components/SectionBlock";
import { BlockWrapper } from "../components/BlockWrapper";
import type { VisualNode } from "./VisualTree";

function renderNode(node: VisualNode) {
  if (node.type === "section") {
    return <SectionBlock key={node.id} node={node} />;
  }

  if (node.type === "block") {
    return <BlockWrapper key={node.id} node={node} />;
  }

  return null;
}

export default function CanvasRenderer() {
  const tree = useCanvasState((s) => s.tree);
  const device = useEditorState((s) => s.device);

  return (
    <div className={`canvas-renderer device-${device}`}>
      {tree.root.map((node) => renderNode(node))}
    </div>
  );
}