import React from "react";
import type { VisualNode } from "./VisualTree";
import { BlockWrapper } from "../components/BlockWrapper";
import { SectionBlock } from "../components/SectionBlock";

export default function CanvasRenderer({ nodes }: { nodes: VisualNode[] }) {
  return (
    <>
      {nodes.map((node) => {
        if (node.type === "section") {
          return <SectionBlock key={node.id} node={node} />;
        }
        return <BlockWrapper key={node.id} node={node} />;
      })}
    </>
  );
}