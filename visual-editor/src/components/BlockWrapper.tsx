import React, { useState } from "react";
import { useCanvasState } from "./CanvasState";
import { saveVariant } from "../api/variants";

export default function BlockWrapper({ node, children }: any) {
  const removeBlock = useCanvasState((s) => s.removeBlock);
  const duplicateBlock = useCanvasState((s) => s.duplicateBlock);

  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [variantName, setVariantName] = useState("");
  const [variantCategory, setVariantCategory] = useState("Default");

  async function handleSaveVariant() {
    if (!variantName.trim()) {
      alert("Please enter a variant name");
      return;
    }

    await saveVariant(
      variantName,
      variantCategory,
      node.type,          // component type (button, card, etc.)
      node.styles || {},  // style overrides
      node.content || {}  // content overrides
    );

    setVariantModalOpen(false);
    setVariantName("");
    setVariantCategory("Default");

    alert("Variant saved");
  }

  return (
    <div className="block-wrapper">
      <div className="block-actions">
        <button onClick={() => duplicateBlock(node.id)}>Duplicate</button>
        <button onClick={() => removeBlock(node.id)}>Delete</button>

        {/* NEW: Save as Variant */}
        <button onClick={() => setVariantModalOpen(true)}>
          Save as Variant
        </button>
      </div>

      {children}

      {/* Variant Save Modal */}
      {variantModalOpen && (
        <div className="variant-modal-overlay">
          <div className="variant-modal">
            <h3>Save Block as Variant</h3>

            <label>Name</label>
            <input
              type="text"
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
              placeholder="Primary Button"
            />

            <label>Category</label>
            <input
              type="text"
              value={variantCategory}
              onChange={(e) => setVariantCategory(e.target.value)}
              placeholder="Primary, Outline, Hero..."
            />

            <div className="variant-modal-actions">
              <button onClick={handleSaveVariant}>Save</button>
              <button onClick={() => setVariantModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}