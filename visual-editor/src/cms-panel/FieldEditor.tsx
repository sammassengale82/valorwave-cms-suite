import React from "react";
import { useCanvasState } from "../canvas/CanvasState";
import { updateNodeById } from "../canvas/VisualTree";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function FieldEditor({ label, value, onChange }: Props) {
  return (
    <div className="cms-field">
      <label>{label}</label>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
