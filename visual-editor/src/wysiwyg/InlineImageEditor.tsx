import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function InlineImageEditor({ node }: any) {
  const updateContent = useCanvasState((s) => s.updateContent);

  function handleChange(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateContent(node.id, "src", reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="inline-image-editor">
      <img src={node.content?.src} alt="" />
      <input type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
}