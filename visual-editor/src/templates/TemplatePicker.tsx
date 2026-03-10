import React from "react";
import { templates } from "../../../templates";
import TemplateCard from "./TemplateCard";
import { useCanvasState } from "../canvas/CanvasState";
import "./templates.css";

export default function TemplatePicker() {
  const addSection = useCanvasState((s) => s.addSection);

  function handleSelect(t: any) {
    // Insert the root node of the template tree
    const root = t.data.tree[0];
    addSection(JSON.parse(JSON.stringify(root)));
  }

  return (
    <div className="template-picker">
      {templates.map((t) => (
        <TemplateCard key={t.id} template={t} onSelect={handleSelect} />
      ))}
    </div>
  );
}