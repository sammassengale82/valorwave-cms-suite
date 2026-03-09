import React, { useState } from "react";
import { useCanvasState } from "./CanvasState";
import { useEditorState } from "../state/EditorState";
import { saveTemplate } from "../api/templates";

export default function SectionWrapper({ node, children }: any) {
  const removeSection = useCanvasState((s) => s.removeSection);
  const duplicateSection = useCanvasState((s) => s.duplicateSection);

  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateCategory, setTemplateCategory] = useState("General");

  async function handleSaveTemplate() {
    if (!templateName.trim()) {
      alert("Please enter a template name");
      return;
    }

    // Save template (no preview yet — added in Phase J Advanced)
    await saveTemplate(templateName, templateCategory, node);

    setTemplateModalOpen(false);
    setTemplateName("");
    setTemplateCategory("General");

    alert("Template saved");
  }

  return (
    <div className="section-wrapper">
      <div className="section-actions">
        <button onClick={() => duplicateSection(node.id)}>Duplicate</button>
        <button onClick={() => removeSection(node.id)}>Delete</button>

        {/* NEW: Save as Template */}
        <button onClick={() => setTemplateModalOpen(true)}>
          Save as Template
        </button>
      </div>

      {children}

      {/* Template Save Modal */}
      {templateModalOpen && (
        <div className="template-modal-overlay">
          <div className="template-modal">
            <h3>Save Section as Template</h3>

            <label>Name</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Hero Section"
            />

            <label>Category</label>
            <input
              type="text"
              value={templateCategory}
              onChange={(e) => setTemplateCategory(e.target.value)}
              placeholder="Hero, Gallery, CTA..."
            />

            <div className="template-modal-actions">
              <button onClick={handleSaveTemplate}>Save</button>
              <button onClick={() => setTemplateModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}