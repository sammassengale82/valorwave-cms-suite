import React from "react";
import { useCanvasState } from "./CanvasState";

type Node = {
  id: string;
  type: string;
  [key: string]: any;
};

type Props = {
  node: Node;
  children?: React.ReactNode;
};

export default function SectionWrapper({ node, children }: Props) {
  const tree = useCanvasState((s) => s.tree); // keep hook usage if you later add selection, etc.

  return (
    <section className="canvas-section" data-node-id={node.id} data-node-type={node.type}>
      {children}
    </section>
  );
}
