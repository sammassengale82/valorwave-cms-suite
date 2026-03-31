// src/editor/SectionManager.tsx
import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function SectionManager() {
  const tree = useCanvasState((s) => s.tree);
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const selectSingle = useCanvasState((s) => s.selectSingle);

  const addSection = useCanvasState((s) => s.addSection);
  const removeSection = useCanvasState((s) => s.removeSection);
  const moveSection = useCanvasState((s) => s.moveSection);
  const duplicateSection = useCanvasState((s) => s.duplicateSection);

  // ⭐ NEW: normalize tree to the new visualTree shape
  const sections = Array.isArray(tree) ? tree : tree?.root || [];

  return (
    <div className="section-manager">
      <div className="section-manager-header">
        <h2>Sections</h2>
        <button
          className="section-add-btn"
          onClick={() => addSection("HeroSection")}
        >
          + Add Section
        </button>
      </div>

      <ul className="section-list">
        {sections.map((node: any, index: number) => (
          <li
            key={node.id}
            className={
              "section-item" +
              (selectedIds.includes(node.id) ? " is-selected" : "")
            }
            onClick={() => selectSingle(node.id)}
          >
            <div className="section-item-main">
              <span className="section-label">
                {node.component || node.type || "Section"} #{index + 1}
              </span>
            </div>

            <div className="section-item-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveSection(node.id, "up");
                }}
              >
                ↑
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  moveSection(node.id, "down");
                }}
              >
                ↓
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  duplicateSection(node.id);
                }}
              >
                ⧉
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSection(node.id);
                }}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
