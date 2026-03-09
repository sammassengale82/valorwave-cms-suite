import React, { useRef, useEffect, useState } from "react";
import { useCanvasState } from "./CanvasState";
import BlockWrapper from "./BlockWrapper";
import SectionWrapper from "./SectionWrapper";
import SelectionMarquee from "./SelectionMarquee";

export default function Canvas() {
  const tree = useCanvasState((s) => s.tree);
  const clearSelection = useCanvasState((s) => s.clearSelection);

  // ------------------------------------------------------------
  // ZOOM + PAN STATE
  // ------------------------------------------------------------
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------
  // BLOCK + SECTION REFS (for marquee selection)
  // ------------------------------------------------------------
  const blockRefs = useRef(
    new Map<string, React.RefObject<HTMLDivElement>>()
  );

  function registerBlockRef(
    id: string,
    ref: React.RefObject<HTMLDivElement>
  ) {
    blockRefs.current.set(id, ref);
  }

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
  // CLICK EMPTY CANVAS → CLEAR SELECTION
  // ------------------------------------------------------------
  function handleCanvasClick(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest(".block-wrapper")) return;
    if ((e.target as HTMLElement).closest(".section-wrapper")) return;
    clearSelection();
  }

  // ------------------------------------------------------------
  // ZOOM HANDLERS
  // ------------------------------------------------------------
  function zoomIn() {
    setZoom((z) => Math.min(z + 0.1, 3));
  }

  function zoomOut() {
    setZoom((z) => Math.max(z - 0.1, 0.3));
  }

  // ------------------------------------------------------------
  // PAN HANDLING (middle mouse drag)
  // ------------------------------------------------------------
  function handleMouseDown(e: React.MouseEvent) {
    if (e.button !== 1) return; // middle mouse only

    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startPan = { ...pan };

    function move(ev: MouseEvent) {
      setPan({
        x: startPan.x + (ev.clientX - startX),
        y: startPan.y + (ev.clientY - startY),
      });
    }

    function up() {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }

  return (
    <div
      className="canvas-container"
      onClick={handleCanvasClick}
      onMouseDown={handleMouseDown}
      ref={canvasRef}
    >
      {/* Drag-selection marquee */}
      <SelectionMarquee getBlockRects={getBlockRects} />

      {/* Zoom UI */}
      <div className="canvas-zoom">
        <button onClick={zoomOut}>-</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={zoomIn}>+</button>
      </div>

      {/* Canvas content with zoom + pan */}
      <div
        className="canvas-content"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
      >
        {tree.map((section: any) => (
          <SectionWithRef
            key={section.id}
            node={section}
            registerBlockRef={registerBlockRef}
          />
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// SECTION + BLOCK RENDERING WITH REFS
// ------------------------------------------------------------
function SectionWithRef({ node, registerBlockRef }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerBlockRef(node.id, ref);
  }, [node.id]);

  return (
    <div ref={ref}>
      <SectionWrapper node={node}>
        {node.children?.map((child: any) => (
          <BlockWithRef
            key={child.id}
            node={child}
            registerBlockRef={registerBlockRef}
          />
        ))}
      </SectionWrapper>
    </div>
  );
}

function BlockWithRef({ node, registerBlockRef }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerBlockRef(node.id, ref);
  }, [node.id]);

  const isAbsolute = node.styles?.desktop?.position === "absolute";

  return (
    <div
      ref={ref}
      className={`block-wrapper ${isAbsolute ? "absolute" : ""}`}
      style={isAbsolute ? node.styles?.desktop : {}}
    >
      <BlockWrapper node={node}>
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