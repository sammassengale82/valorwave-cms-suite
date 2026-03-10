import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function ResponsiveInspector() {
  const tree = useCanvasState((s) => s.tree);
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const updateStyle = useCanvasState((s) => s.updateStyle);

  if (selectedIds.length !== 1) {
    return (
      <div className="inspector-empty">
        Select a single block to edit responsive styles.
      </div>
    );
  }

  const id = selectedIds[0];

  function findNode(nodes: any[]): any | null {
    for (const n of nodes) {
      if (n.id === id) return n;
      const child = findNode(n.children || []);
      if (child) return child;
    }
    return null;
  }

  const node = findNode(tree);
  if (!node) return null;

  const devices = ["tablet", "mobile"];
  const props = ["fontSize", "padding", "margin", "width", "height"];

  function getValue(device: string, prop: string) {
    return node.styles?.[device]?.[prop] || "";
  }

  function setValue(device: string, prop: string, value: any) {
    updateStyle(id, device, prop, value);
  }

  return (
    <div className="responsive-inspector">
      {devices.map((device) => (
        <div key={device} className="responsive-group">
          <h4>{device.toUpperCase()}</h4>

          {props.map((prop) => (
            <div key={prop} className="responsive-row">
              <label>{prop}</label>
              <input
                type="text"
                value={getValue(device, prop)}
                onChange={(e) => setValue(device, prop, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}