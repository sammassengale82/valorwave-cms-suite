import React from "react";

type Node = {
  id: string;
  type: string;
  [key: string]: any;
};

type Props = {
  node: Node;
  children?: React.ReactNode;
};

export default function BlockWrapper({ node, children }: Props) {
  return (
    <div className="canvas-block" data-node-id={node.id} data-node-type={node.type}>
      {children}
    </div>
  );
}
