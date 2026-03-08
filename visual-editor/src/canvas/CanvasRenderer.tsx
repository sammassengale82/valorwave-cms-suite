import React from "react";
import type { VisualNode } from "./VisualTree";
import { SectionBlock } from "../components/SectionBlock";
import { BlockWrapper } from "../components/BlockWrapper";
import { useEditorState } from "../state/EditorState";
import WaveDivider from "../theme/wave-divider";

interface Props {
  nodes: VisualNode[];
}

export default function CanvasRenderer({ nodes }: Props) {
  const device = useEditorState((s) => s.device);
  const preview = useEditorState((s) => s.preview);

  if (preview) return null;

  const deviceStyles = {
    desktop: { transform: "scale(1)", maxWidth: "1200px", margin: "0 auto" },
    tablet: { transform: "scale(0.85)", maxWidth: "900px", margin: "0 auto" },
    mobile: { transform: "scale(0.7)", maxWidth: "480px", margin: "0 auto" }
  };

  return (
    <div className="canvas-device-wrapper">
      <div className="canvas-device-frame" style={deviceStyles[device]}>
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            {node.type === "section" ? (
              <SectionBlock node={node} />
            ) : (
              <BlockWrapper node={node} />
            )}

            {node.type === "section" &&
              i < nodes.length - 1 &&
              nodes[i + 1].type === "section" && <WaveDivider />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}