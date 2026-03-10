import React, { useRef, useEffect } from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function InlineTextEditor({ node }: any) {
  const updateContent = useCanvasState((s) => s.updateContent);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = node.content?.text || "";
    }
  }, [node.id]);

  function handleInput() {
    if (!ref.current) return;
    updateContent(node.id, "text", ref.current.innerHTML);
  }

  return (
    <div
      ref={ref}
      className="inline-text-editor"
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
    />
  );
}