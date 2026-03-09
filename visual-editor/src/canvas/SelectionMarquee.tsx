import React, { useState, useRef, useEffect } from "react";
import { useCanvasState } from "./CanvasState";

export default function SelectionMarquee({ getBlockRects }: any) {
  const selectOne = useCanvasState((s) => s.selectOne);
  const selectMultiple = useCanvasState((s) => s.selectMultiple);
  const toggleSelect = useCanvasState((s) => s.toggleSelect);
  const selectedIds = useCanvasState((s) => s.selectedIds);

  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const marqueeRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------
  // Begin drag
  // ------------------------------------------------------------
  function handleMouseDown(e: React.MouseEvent) {
    // Only start marquee if clicking empty canvas space
    if ((e.target as HTMLElement).closest(".block-wrapper")) return;

    const x = e.clientX;
    const y = e.clientY;

    setStart({ x, y });
    setRect({ x, y, w: 0, h: 0 });
    setDragging(true);

    // If not holding shift or cmd, clear selection
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const mod = isMac ? e.metaKey : e.ctrlKey;

    if (!e.shiftKey && !mod) {
      selectMultiple([]);
    }
  }

  // ------------------------------------------------------------
  // Dragging
  // ------------------------------------------------------------
  function handleMouseMove(e: MouseEvent) {
    if (!dragging) return;

    const x = Math.min(e.clientX, start.x);
    const y = Math.min(e.clientY, start.y);
    const w = Math.abs(e.clientX - start.x);
    const h = Math.abs(e.clientY - start.y);

    setRect({ x, y, w, h });
  }

  // ------------------------------------------------------------
  // End drag → compute selection
  // ------------------------------------------------------------
  function handleMouseUp() {
    if (!dragging) return;

    setDragging(false);

    const marquee = {
      left: rect.x,
      right: rect.x + rect.w,
      top: rect.y,
      bottom: rect.y + rect.h,
    };

    const blockRects = getBlockRects(); // Provided by parent canvas

    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const mod = isMac ? window.event?.metaKey : window.event?.ctrlKey;
    const shift = window.event?.shiftKey;

    let newSelection = [...selectedIds];

    for (const { id, rect: r } of blockRects) {
      const intersects =
        r.left < marquee.right &&
        r.right > marquee.left &&
        r.top < marquee.bottom &&
        r.bottom > marquee.top;

      if (intersects) {
        if (shift) {
          // Add to selection
          if (!newSelection.includes(id)) newSelection.push(id);
        } else if (mod) {
          // Toggle selection
          if (newSelection.includes(id)) {
            newSelection = newSelection.filter((x) => x !== id);
          } else {
            newSelection.push(id);
          }
        } else {
          // Replace selection
          newSelection.push(id);
        }
      }
    }

    selectMultiple(Array.from(new Set(newSelection)));
  }

  // ------------------------------------------------------------
  // Global listeners
  // ------------------------------------------------------------
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  // ------------------------------------------------------------
  // Render marquee
  // ------------------------------------------------------------
  return dragging ? (
    <div
      ref={marqueeRef}
      className="selection-marquee"
      style={{
        position: "fixed",
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        background: "rgba(0, 120, 255, 0.15)",
        border: "1px solid rgba(0, 120, 255, 0.5)",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  ) : (
    <div
      className="selection-marquee-hitbox"
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
      }}
    />
  );
}