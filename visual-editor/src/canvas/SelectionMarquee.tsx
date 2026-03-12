// src/canvas/SelectionMarquee.tsx
import React, { useState } from "react";
import { useCanvasState } from "./CanvasState";

type Rect = { x: number; y: number; w: number; h: number };

type SelectionMarqueeProps = {
  canvasRef: React.RefObject<HTMLElement>;
};

export default function SelectionMarquee({ canvasRef }: SelectionMarqueeProps) {
  const [rect, setRect] = useState<Rect | null>(null);
  const setSelectedIds = useCanvasState((s) => s.setSelectedIds);

  function onMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;

    const startX = e.clientX;
    const startY = e.clientY;

    function onMove(ev: MouseEvent) {
      const x = Math.min(startX, ev.clientX);
      const y = Math.min(startY, ev.clientY);
      const w = Math.abs(ev.clientX - startX);
      const h = Math.abs(ev.clientY - startY);
      setRect({ x, y, w, h });
    }

    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);

      if (rect && canvasRef.current) {
        const ids = computeHits(rect, canvasRef.current);
        setSelectedIds(ids);
      }

      setRect(null);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  return (
    <>
      <div className="selection-marquee-layer" onMouseDown={onMouseDown} />
      {rect && (
        <div
          className="selection-marquee"
          style={{
            left: rect.x,
            top: rect.y,
            width: rect.w,
            height: rect.h,
          }}
        />
      )}
    </>
  );
}

function computeHits(rect: Rect, canvas: HTMLElement): string[] {
  const hits: string[] = [];
  const blocks = canvas.querySelectorAll("[data-block-id]");

  blocks.forEach((el: any) => {
    const r = el.getBoundingClientRect();
    const intersects =
      r.left < rect.x + rect.w &&
      r.right > rect.x &&
      r.top < rect.y + rect.h &&
      r.bottom > rect.y;

    if (intersects && el.dataset.blockId) hits.push(el.dataset.blockId);
  });

  return hits;
}
