import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import StyleInspector from "./StyleInspector";
import ContentInspector from "./ContentInspector";
import ComponentInspector from "./ComponentInspector";
import LayoutInspector from "./LayoutInspector";
import ResponsiveInspector from "./ResponsiveInspector";

export default function InspectorPanel() {
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const count = selectedIds.length;

  function getLabel() {
    if (count === 0) return "No selection";
    if (count === 1) return "1 block selected";
    return `${count} blocks selected`;
  }

  return (
    <div className="inspector-panel">
      <div className="inspector-header">
        <div className="inspector-title">Inspector</div>
        <div
          className={`inspector-badge ${
            count === 0 ? "empty" : count === 1 ? "single" : "multi"
          }`}
        >
          {getLabel()}
        </div>
      </div>

      {count === 0 ? (
        <div className="inspector-empty-state">
          <p>Select a block to edit.</p>
        </div>
      ) : (
        <div className="inspector-tabs">
          <div className="inspector-tab-group">
            <div className="inspector-tab-label">Component</div>
            <ComponentInspector />
          </div>

          <div className="inspector-tab-group">
            <div className="inspector-tab-label">Layout</div>
            <LayoutInspector />
          </div>

          <div className="inspector-tab-group">
            <div className="inspector-tab-label">Responsive</div>
            <ResponsiveInspector />
          </div>

          <div className="inspector-tab-group">
            <div className="inspector-tab-label">Styles</div>
            <StyleInspector />
          </div>

          <div className="inspector-tab-group">
            <div className="inspector-tab-label">Content</div>
            <ContentInspector />
          </div>
        </div>
      )}
    </div>
  );
}