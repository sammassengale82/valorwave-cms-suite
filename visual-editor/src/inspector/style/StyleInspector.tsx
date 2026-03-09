import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function StyleInspector() {
  const tree = useCanvasState((s) => s.tree);
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const updateStyle = useCanvasState((s) => s.updateStyle);

  if (selectedIds.length === 0) {
    return <div className="inspector-empty">No block selected</div>;
  }

  function findNodeById(nodes: any[], id: string): any | null {
    for (const n of nodes) {
      if (n.id === id) return n;
      const child = findNodeById(n.children || [], id);
      if (child) return child;
    }
    return null;
  }

  const selectedNodes = selectedIds
    .map((id) => findNodeById(tree, id))
    .filter(Boolean);

  function getMixedValue(device: string, prop: string) {
    const values = selectedNodes.map((n: any) => n.styles?.[device]?.[prop]);
    const unique = Array.from(new Set(values));
    if (unique.length === 1) return unique[0];
    return "__MIXED__";
  }

  function applyToAll(device: string, prop: string, value: any) {
    selectedIds.forEach((id) => updateStyle(id, device, prop, value));
  }

  const devices = ["desktop", "tablet", "mobile"];
  const styleProps = ["color", "fontSize", "padding", "margin"];

  return (
    <div className="style-inspector">
      {devices.map((device) => (
        <div key={device} className="style-device-group">
          <h4>{device.toUpperCase()}</h4>
          {styleProps.map((prop) => {
            const value = getMixedValue(device, prop);
            const isMixed = value === "__MIXED__";
            return (
              <div key={prop} className="style-row">
                <label>{prop}</label>
                <input
                  type="text"
                  placeholder={isMixed ? "— mixed —" : ""}
                  value={isMixed ? "" : value || ""}
                  onChange={(e) =>
                    applyToAll(device, prop, e.target.value)
                  }
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}