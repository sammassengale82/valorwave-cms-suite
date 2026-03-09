import React, { useEffect, useState } from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { listVariants, loadVariant, saveVariant } from "../api/variants";

export default function ContentInspector({ selected }: any) {
  const updateContent = useCanvasState((s) => s.updateContent);
  const applyVariantToNode = useCanvasState((s) => s.applyVariant);

  const [variants, setVariants] = useState([]);
  const [showVariantSave, setShowVariantSave] = useState(false);
  const [variantName, setVariantName] = useState("");
  const [variantCategory, setVariantCategory] = useState("Default");

  const component = selected?.type;

  useEffect(() => {
    if (component) load();
  }, [component]);

  async function load() {
    const list = await listVariants(component);
    setVariants(list);
  }

  async function handleApplyVariant(id: string) {
    const variant = await loadVariant(id);
    if (!variant) return;

    applyVariantToNode(selected.id, variant);
  }

  async function handleSaveVariant() {
    if (!variantName.trim()) {
      alert("Enter a variant name");
      return;
    }

    await saveVariant(
      variantName,
      variantCategory,
      component,
      selected.styles || {},
      selected.content || {}
    );

    setShowVariantSave(false);
    setVariantName("");
    setVariantCategory("Default");
    await load();
  }

  if (!selected) return null;

  return (
    <div className="inspector-section">
      <h3>Content</h3>

      {/* Existing content fields */}
      {Object.entries(selected.content || {}).map(([key, value]: any) => (
        <div key={key} className="inspector-field">
          <label>{key}</label>
          <input
            value={value}
            onChange={(e) => updateContent(selected.id, key, e.target.value)}
          />
        </div>
      ))}

      {/* VARIANT PANEL */}
      <div className="variant-panel">
        <h4>Variants</h4>

        <button onClick={() => setShowVariantSave(true)}>
          Save as Variant
        </button>

        <div className="variant-grid">
          {variants.map((v: any) => (
            <div key={v.id} className="variant-item">
              <div className="variant-preview">
                {v.previewImage ? (
                  <img
                    src={`/data/variants/${v.id}/${v.previewImage}`}
                    alt={v.name}
                  />
                ) : (
                  <div className="variant-placeholder">No Preview</div>
                )}
              </div>

              <div className="variant-info">
                <span>{v.name}</span>
                <span className="variant-category">{v.category}</span>
              </div>

              <button onClick={() => handleApplyVariant(v.id)}>
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SAVE VARIANT MODAL */}
      {showVariantSave && (
        <div className="variant-modal-overlay">
          <div className="variant-modal">
            <h3>Save Variant</h3>

            <label>Name</label>
            <input
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
            />

            <label>Category</label>
            <input
              value={variantCategory}
              onChange={(e) => setVariantCategory(e.target.value)}
            />

            <div className="variant-modal-actions">
              <button onClick={handleSaveVariant}>Save</button>
              <button onClick={() => setShowVariantSave(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}