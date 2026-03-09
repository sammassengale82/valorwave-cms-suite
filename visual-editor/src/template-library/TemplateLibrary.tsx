import React, { useEffect, useState } from "react";
import {
  listTemplates,
  deleteTemplate,
  renameTemplate,
  loadTemplateNode,
} from "../api/templates";
import type { TemplateData } from "../types/TemplateTypes";
import { useCanvasState } from "../canvas/CanvasState";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateLibrary({ isOpen, onClose }: Props) {
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [category, setCategory] = useState("All");

  const insertSection = useCanvasState((s) => s.insertTemplate);

  useEffect(() => {
    if (isOpen) load();
  }, [isOpen]);

  async function load() {
    const list = await listTemplates();
    setTemplates(list);
  }

  async function handleInsert(id: string) {
    const node = await loadTemplateNode(id);
    if (!node) return;

    insertSection(node);
    onClose();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this template?")) return;
    await deleteTemplate(id);
    await load();
  }

  async function handleRename(id: string, currentName: string) {
    const newName = prompt("New template name:", currentName);
    if (!newName || newName === currentName) return;

    await renameTemplate(id, newName);
    await load();
  }

  const categories = ["All", ...new Set(templates.map((t) => t.category))];

  if (!isOpen) return null;

  return (
    <div className="template-library-overlay">
      <div className="template-library">
        <div className="template-header">
          <h3>Section Templates</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Category Filter */}
        <div className="template-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={cat === category ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="template-grid">
          {templates
            .filter((t) => category === "All" || t.category === category)
            .map((template) => (
              <div key={template.id} className="template-item">
                <div className="template-preview">
                  {template.previewImage ? (
                    <img
                      src={`/data/templates/${template.id}/${template.previewImage}`}
                      alt={template.name}
                    />
                  ) : (
                    <div className="template-placeholder">
                      No Preview
                    </div>
                  )}
                </div>

                <div className="template-info">
                  <span className="template-name">{template.name}</span>
                  <span className="template-category">{template.category}</span>
                </div>

                <div className="template-actions">
                  <button onClick={() => handleInsert(template.id)}>
                    Insert
                  </button>

                  <button
                    onClick={() =>
                      handleRename(template.id, template.name)
                    }
                  >
                    Rename
                  </button>

                  <button onClick={() => handleDelete(template.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}

          {templates.length === 0 && (
            <div className="template-empty">
              <p>No templates saved yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}