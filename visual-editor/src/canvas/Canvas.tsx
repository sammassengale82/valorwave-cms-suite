import React from "react";
import { useCanvasState } from "./CanvasState";
import BlockWrapper from "./BlockWrapper";
import SectionWrapper from "./SectionWrapper";

export default function Canvas() {
  const tree = useCanvasState((s: any) => s.tree);
  const insertSectionAt = useCanvasState((s: any) => s.insertSectionAt);
  const addSection = useCanvasState((s: any) => s.addSection);

  function handleDropAtIndex(e: React.DragEvent, index: number) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/x-template-node");
    if (!raw) return;
    const node = JSON.parse(raw);
    insertSectionAt(index, node);
  }

  function handleDropAtEnd(e: React.DragEvent) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/x-template-node");
    if (!raw) return;
    const node = JSON.parse(raw);
    addSection(node);
  }

  return (
    <div className="canvas-container">
      <div className="canvas-content">
        <div
          className="canvas-dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropAtIndex(e, 0)}
        />
        {tree.map((section: any, index: number) => (
          <React.Fragment key={section.id}>
            <SectionWrapper node={section}>
              {section.children?.map((child: any) => (
                <BlockWrapper key={child.id} node={child}>
                  {child.children?.map((c: any) => (
                    <BlockWrapper key={c.id} node={c} />
                  ))}
                </BlockWrapper>
              ))}
            </SectionWrapper>
            <div
              className="canvas-dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropAtIndex(e, index + 1)}
            />
          </React.Fragment>
        ))}
        {tree.length === 0 && (
          <div
            className="canvas-dropzone active"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropAtEnd}
          />
        )}
      </div>
    </div>
  );
}