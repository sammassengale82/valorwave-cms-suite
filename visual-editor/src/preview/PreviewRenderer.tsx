import React from "react";
import type { VisualNode } from "../canvas/VisualTree";
import { SectionComponents } from "../components/sections";
import WaveDivider from "../theme/wave-divider";

interface Props {
  nodes: VisualNode[];
}

export default function PreviewRenderer({ nodes }: Props) {
  return (
    <div className="preview-site">
      {nodes.map((node, i) => {
        const Component = SectionComponents[node.component];

        return (
          <React.Fragment key={node.id}>
            <Component {...node.props} childrenNodes={node.children} />

            {i < nodes.length - 1 && <WaveDivider />}
          </React.Fragment>
        );
      })}
    </div>
  );
}