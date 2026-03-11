import React from "react";
import { useCanvasState } from "./CanvasState";
import BlockWrapper from "./BlockWrapper";
import SectionWrapper from "./SectionWrapper";

const ALLOWED_NESTED_TYPES = new Set(["section", "container", "card"]);

export default function Canvas() {
  const tree = useCanvasState((s: any) => s.tree);
  const insertSectionAt = useCanvasState((s: any) => s.insertSectionAt);
  const addSection = useCanvasState((s: any) => s.addSection);
  const insertBlockAt = useCanvasState((s: any) => s.insertBlockAt);

  function parseNode(e: React.DragEvent) {
    const raw = e.dataTransfer.getData("application/x-template-node");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function handleSectionDropAt(e: React.DragEvent, index: number) {
    e.preventDefault();
    const node = parseNode(e);
    if (!node) return;
    insertSectionAt(index, node);
  }

  function handleSectionDropEnd(e: React.DragEvent) {
    e.preventDefault();
    const node = parseNode(e);
    if (!node) return;
    addSection(node);
  }

  function handleBlockDropAt(
    e: React.DragEvent,
    parentId: string,
    index: number
  ) {
    e.preventDefault();
    const node = parseNode(e);
    if (!node) return;
    insertBlockAt(parentId, index, node);
  }

  return (
    <div className="canvas-container">
      <div className="canvas-content">
        <div
          className="canvas-dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleSectionDropAt(e, 0)}
        />

        {tree.map((section: any, sectionIndex: number) => (
          <React.Fragment key={section.id}>
            <SectionWrapper node={section}>
              {ALLOWED_NESTED_TYPES.has(section.type) && (
                <div
                  className="canvas-dropzone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleBlockDropAt(e, section.id, 0)}
                />
              )}

              {section.children?.map((child: any, childIndex: number) => (
                <React.Fragment key={child.id}>
                  <BlockWrapper node={child}>
                    {ALLOWED_NESTED_TYPES.has(child.type) && (
                      <div
                        className="canvas-dropzone"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) =>
                          handleBlockDropAt(e, child.id, 0)
                        }
                      />
                    )}

                    {child.children?.map((c: any, grandIndex: number) => (
                      <React.Fragment key={c.id}>
                        <BlockWrapper node={c} />
                        {ALLOWED_NESTED_TYPES.has(child.type) && (
                          <div
                            className="canvas-dropzone"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) =>
                              handleBlockDropAt(
                                e,
                                child.id,
                                grandIndex + 1
                              )
                            }
                          />
                        )}
                      </React.Fragment>
                    ))}

                    {ALLOWED_NESTED_TYPES.has(child.type) &&
                      (!child.children || child.children.length === 0) && (
                        <div
                          className="canvas-dropzone"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) =>
                            handleBlockDropAt(e, child.id, 0)
                          }
                        />
                      )}
                  </BlockWrapper>

                  {ALLOWED_NESTED_TYPES.has(section.type) && (
                    <div
                      className="canvas-dropzone"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) =>
                        handleBlockDropAt(
                          e,
                          section.id,
                          childIndex + 1
                        )
                      }
                    />
                  )}
                </React.Fragment>
              ))}

              {ALLOWED_NESTED_TYPES.has(section.type) &&
                (!section.children || section.children.length === 0) && (
                  <div
                    className="canvas-dropzone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) =>
                      handleBlockDropAt(e, section.id, 0)
                    }
                  />
                )}
            </SectionWrapper>

            <div
              className="canvas-dropzone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) =>
                handleSectionDropAt(e, sectionIndex + 1)
              }
            />
          </React.Fragment>
        ))}

        {tree.length === 0 && (
          <div
            className="canvas-dropzone active"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleSectionDropEnd}
          />
        )}
      </div>
    </div>
  );
}
