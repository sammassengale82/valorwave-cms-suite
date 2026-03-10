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
      <div className="template-name">
        {template.name}
        <span style={{ fontSize: 11, opacity: 0.7, marginLeft: 4 }}>
          v{template.version || 1}
        </span>
      </div>
    </div>
  );
}