import React from "react";
import type { VisualNode } from "./VisualTree";
import { SectionBlock } from "../components/SectionBlock";
import { BlockWrapper } from "../components/BlockWrapper";
import { useEditorState } from "../state/EditorState";

interface Props {
  nodes: VisualNode[];
}

export default function CanvasRenderer({ nodes }: Props) {
  const device = useEditorState((s) => s.device);

  const deviceStyles: Record<string, React.CSSProperties> = {
    desktop: {
      transform: "scale(1)",
      transformOrigin: "top center",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto"
    },
    tablet: {
      transform: "scale(0.85)",
      transformOrigin: "top center",
      width: "100%",
      maxWidth: "900px",
      margin: "0 auto"
    },
    mobile: {
      transform: "scale(0.7)",
      transformOrigin: "top center",
      width: "100%",
      maxWidth: "480px",
      margin: "0 auto"
    }
  };

  return (
    <div className="canvas-device-wrapper">
      <div className="canvas-device-frame" style={deviceStyles[device]}>
        {nodes.map((node) =>
          node.type === "section" ? (
            <SectionBlock key={node.id} node={node} />
          ) : (
            <BlockWrapper key={node.id} node={node} />
          )
        )}
      </div>
    </div>
  );
}