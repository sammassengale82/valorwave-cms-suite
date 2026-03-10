import React from "react";

export default function TemplateCard({ template, onSelect }: any) {
  return (
    <div className="template-card" onClick={() => onSelect(template)}>
      <img src={template.preview} className="template-preview" />
      <div className="template-name">{template.name}</div>
    </div>
  );
}