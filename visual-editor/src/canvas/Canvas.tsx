import React, { useRef, useEffect } from "react";
import { useCanvasState } from "./CanvasState";
import BlockWrapper from "./BlockWrapper";
import SelectionMarquee from "./SelectionMarquee";

export default function Canvas() {
  const tree = useCanvasState((s) => s.tree);
  const clearSelection = useCanvasState((s) => s.clearSelection);

  // ------------------------------------------------------------
  // BLOCK REFS (for marquee selection)
  // ------------------------------------------------------------
  const blockRefs = useRef(new Map<string, React.RefObject<HTMLDivElement>>());

  function registerBlockRef(id: string, ref: React.RefObject<HTMLDivElement>) {
    blockRefs.current.set(id, ref);
  }

  // ------------------------------------------------------------
  // Compute rects for SelectionMarquee
  // ------------------------------------------------------------
  function getBlockRects() {
    const result: { id: string; rect: DOMRect }[] = [];

    blockRefs.current.forEach((ref, id) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      result.push({ id, rect });
    });

    return result;
  }

  // ------------------------------------------------------------
  // Click empty canvas → clear selection
  // ------------------------------------------------------------
  function handleCanvasClick(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest(".block-wrapper")) return;
    clearSelection();
  }

  return (
    <div className="canvas-container" onClick={handleCanvasClick}>
      {/* Drag-selection marquee */}
      <SelectionMarquee getBlockRects={getBlockRects} />

      {/* Render all blocks */}
      <div className="canvas-content">
        {tree.map((node: any) => (
          <BlockWithRef
            key={node.id}
            node={node}
            registerBlockRef={registerBlockRef}
          />
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Wrapper that attaches a ref to each BlockWrapper
// ------------------------------------------------------------
function BlockWithRef({ node, registerBlockRef }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerBlockRef(node.id, ref);
  }, [node.id]);

  return (
    <div ref={ref}>
      <BlockWrapper node={node}>
        {/* Render children recursively */}
        {node.children?.map((child: any) => (
          <BlockWithRef
            key={child.id}
            node={child}
            registerBlockRef={registerBlockRef}
          />
        ))}
      </BlockWrapper>
    </div>
  );
}