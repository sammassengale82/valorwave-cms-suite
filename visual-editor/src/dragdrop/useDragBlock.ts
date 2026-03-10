import { useRef } from "react";
import { useCanvasState } from "../canvas/CanvasState";

export function useDragBlock(node: any) {
  const updateStyle = useCanvasState((s) => s.updateStyle);
  const isDragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const origin = useRef({ x: 0, y: 0 });

  function onMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;

    isDragging.current = true;
    start.current = { x: e.clientX, y: e.clientY };

    const s = node.styles?.desktop || {};
    origin.current = {
      x: parseInt(s.left || "0"),
      y: parseInt(s.top || "0")
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function onMove(e: MouseEvent) {
    if (!isDragging.current) return;

    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;

    updateStyle(node.id, "desktop", "left", origin.current.x + dx + "px");
    updateStyle(node.id, "desktop", "top", origin.current.y + dy + "px");
  }

  function onUp() {
    isDragging.current = false;
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  }

  return { onMouseDown };
}
