import React from "react";
import StyleInput from "./StyleInput";
import { useCanvasState } from "../canvas/CanvasState";
import { updateNodeById } from "../canvas/VisualTree";

export default function SectionSettings({ node }) {
  const setTree = useCanvasState((s) => s.setTree);
  const tree = useCanvasState((s) => s.tree);

  function updateProp(key: string, value: string) {
    const updated = updateNodeById(tree, node.id, (n) => {
      n.props = n.props || {};
      n.props[key] = value;
    });
    setTree(updated);
  }

  return (
    <div className="inspector-panel">
      <h4>Section Settings</h4>

      <StyleInput
        label="Background Image URL"
        value={node.props?.backgroundImage}
        onChange={(v) => updateProp("backgroundImage", v)}
      />

      <StyleInput
        label="Parallax Speed"
        value={node.props?.parallaxSpeed}
        onChange={(v) => updateProp("parallaxSpeed", v)}
      />

      <StyleInput
        label="Section Height"
        value={node.styles?.desktop?.height}
        onChange={(v) =>
          setTree(
            updateNodeById(tree, node.id, (n) => {
              n.styles = n.styles || {};
              n.styles.desktop = n.styles.desktop || {};
              n.styles.desktop.height = v;
            })
          )
        }
      />
    </div>
  );
}
