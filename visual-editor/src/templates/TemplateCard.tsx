import React from "react";

export default function TemplateCard({
  template,
  onSelect,
  onDragStart
}: any) {
  return (
    <div
      className="template-card"
      draggable
      onDragStart={(e) => onDragStart(e, template)}
      onClick={() => onSelect(template)}
    >
      <img src={template.preview} className="template-preview" />
      <div className="template-name">{template.name}</div>
    </div>
  );
}