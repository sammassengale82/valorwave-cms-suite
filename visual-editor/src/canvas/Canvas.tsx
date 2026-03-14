// src/canvas/Canvas.tsx
import React, { useEffect, useRef } from "react";
import { useCanvasState, Node } from "./CanvasState";
import SelectionMarquee from "./SelectionMarquee";
import BlockWrapper from "./BlockWrapper";
import BlockRenderer from "../editor/BlockRenderer";

export default function Canvas() {
  const tree = useCanvasState((s) => s.tree);
  const deleteSelected = useCanvasState((s) => s.deleteSelected);
  const addSection = useCanvasState((s) => s.addSection);
  const addBlockToSection = useCanvasState((s) => s.addBlockToSection);
  const selectedIds = useCanvasState((s) => s.selectedIds);
  const moveBlockUp = useCanvasState((s) => s.moveBlockUp);
  const moveBlockDown = useCanvasState((s) => s.moveBlockDown);

  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Delete" || e.key === "Backspace") {
        deleteSelected();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deleteSelected]);

  function renderNode(node: Node): React.ReactNode {
    return (
      <BlockWrapper key={node.id} node={node}>
        <div className="canvas-block" data-block-id={node.id}>
          <BlockRenderer node={node} />
          {node.children && node.type === "Section" && (
            <div className="ve-section-controls">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addBlockToSection(node.id, {
                    id: `text-${Date.now()}`,
                    type: "Block",
                    blockType: "text",
                    content: { text: "New text block" },
                  });
                }}
              >
                + Add Block
              </button>
            </div>
          )}
        </div>
      </BlockWrapper>
    );
  }

  const primarySelectedId = selectedIds[0];

  return (
    <div className="canvas-root" ref={canvasRef}>
      <SelectionMarquee canvasRef={canvasRef} />

      <div className="ve-canvas-toolbar">
        <button
          type="button"
          onClick={() =>
            addSection({
              id: `section-${Date.now()}`,
              type: "Section",
              children: [],
            })
          }
        >
          + Add Section
        </button>

        {primarySelectedId && (
          <>
            <button
              type="button"
              onClick={() => moveBlockUp(primarySelectedId)}
            >
              Move Up
            </button>
            <button
              type="button"
              onClick={() => moveBlockDown(primarySelectedId)}
            >
              Move Down
            </button>
          </>
        )}
      </div>

      <div className="canvas-inner">
        {tree.map((node) => renderNode(node))}
      </div>
    </div>
  );
}
