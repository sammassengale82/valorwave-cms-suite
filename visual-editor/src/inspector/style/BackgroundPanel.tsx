import React, { useState } from "react";
import { useCanvasState } from "../../canvas/CanvasState";
import { useEditorState } from "../../state/EditorState";
import AssetPicker from "../../asset-manager/AssetPicker";

interface Props {
  node: any;
}

export default function BackgroundPanel({ node }: Props) {
  const updateStyle = useCanvasState((s) => s.updateStyle);
  const device = useEditorState((s) => s.device);

  const [pickerOpen, setPickerOpen] = useState(false);

  const styles = node.styles?.[device] || {};
  const bgImage = styles.backgroundImage || "";

  function setBg(prop: string, value: string) {
    updateStyle(node.id, device, prop, value);
  }

  return (
    <div className="panel background-panel">
      <h4>Background</h4>

      {/* Background Color */}
      <label>Color</label>
      <input
        type="color"
        value={styles.backgroundColor || "#ffffff"}
        onChange={(e) => setBg("backgroundColor", e.target.value)}
      />

      {/* Background Image */}
      <label>Image</label>

      <div className="bg-image-row">
        <input
          type="text"
          value={bgImage}
          placeholder="Image URL"
          onChange={(e) => setBg("backgroundImage", e.target.value)}
        />

        <button
          className="choose-image-btn"
          onClick={() => setPickerOpen(true)}
        >
          Choose Image
        </button>
      </div>

      {bgImage && (
        <div className="bg-preview">
          <img src={bgImage} alt="Background preview" />
        </div>
      )}

      {/* Background Size */}
      <label>Size</label>
      <select
        value={styles.backgroundSize || "cover"}
        onChange={(e) => setBg("backgroundSize", e.target.value)}
      >
        <option value="cover">Cover</option>
        <option value="contain">Contain</option>
        <option value="auto">Auto</option>
      </select>

      {/* Background Position */}
      <label>Position</label>
      <select
        value={styles.backgroundPosition || "center"}
        onChange={(e) => setBg("backgroundPosition", e.target.value)}
      >
        <option value="center">Center</option>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>

      {/* Background Repeat */}
      <label>Repeat</label>
      <select
        value={styles.backgroundRepeat || "no-repeat"}
        onChange={(e) => setBg("backgroundRepeat", e.target.value)}
      >
        <option value="no-repeat">No Repeat</option>
        <option value="repeat">Repeat</option>
        <option value="repeat-x">Repeat X</option>
        <option value="repeat-y">Repeat Y</option>
      </select>

      {/* Asset Picker Modal */}
      <AssetPicker
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(asset) => {
          setBg("backgroundImage", asset.url);
        }}
      />
    </div>
  );
}