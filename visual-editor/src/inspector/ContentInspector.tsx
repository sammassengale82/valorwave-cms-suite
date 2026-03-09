import React, { useState } from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { useEditorState } from "../state/EditorState";
import AssetPicker from "../asset-manager/AssetPicker";

interface Props {
  node: any;
}

export default function ContentInspector({ node }: Props) {
  const updateStyle = useCanvasState((s) => s.updateStyle);
  const device = useEditorState((s) => s.device);

  const updateContent = useCanvasState((s) => s.updateContent);
  const [pickerOpen, setPickerOpen] = useState(false);

  const content = node.content || {};

  function setContent(field: string, value: any) {
    updateContent(node.id, field, value);
  }

  const isImageBlock =
    node.component === "image" ||
    node.component === "hero-image" ||
    node.component === "gallery-image" ||
    node.component === "card-image";

  return (
    <div className="panel content-panel">
      <h4>Content</h4>

      {/* TEXT BLOCKS */}
      {node.component === "text" && (
        <>
          <label>Text</label>
          <textarea
            value={content.text || ""}
            onChange={(e) => setContent("text", e.target.value)}
          />
        </>
      )}

      {/* HEADING BLOCK */}
      {node.component === "heading" && (
        <>
          <label>Heading</label>
          <input
            type="text"
            value={content.text || ""}
            onChange={(e) => setContent("text", e.target.value)}
          />
        </>
      )}

      {/* BUTTON BLOCK */}
      {node.component === "button" && (
        <>
          <label>Label</label>
          <input
            type="text"
            value={content.label || ""}
            onChange={(e) => setContent("label", e.target.value)}
          />

          <label>Link</label>
          <input
            type="text"
            value={content.href || ""}
            onChange={(e) => setContent("href", e.target.value)}
          />
        </>
      )}

      {/* IMAGE BLOCKS */}
      {isImageBlock && (
        <>
          <label>Image</label>

          <div className="image-row">
            <input
              type="text"
              value={content.src || ""}
              placeholder="Image URL"
              onChange={(e) => setContent("src", e.target.value)}
            />

            <button
              className="choose-image-btn"
              onClick={() => setPickerOpen(true)}
            >
              Choose Image
            </button>
          </div>

          {content.src && (
            <div className="image-preview">
              <img src={content.src} alt="Preview" />
            </div>
          )}

          <AssetPicker
            isOpen={pickerOpen}
            onClose={() => setPickerOpen(false)}
            onSelect={(asset) => {
              setContent("src", asset.url);
            }}
          />
        </>
      )}

      {/* VIDEO BLOCK */}
      {node.component === "video" && (
        <>
          <label>Video URL</label>
          <input
            type="text"
            value={content.src || ""}
            onChange={(e) => setContent("src", e.target.value)}
          />
        </>
      )}

      {/* ICON BLOCK */}
      {node.component === "icon" && (
        <>
          <label>Icon Name</label>
          <input
            type="text"
            value={content.name || ""}
            onChange={(e) => setContent("name", e.target.value)}
          />
        </>
      )}
    </div>
  );
}