import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function FieldEditor({ label, value, onChange }: Props) {
  return (
    <div className="cms-field">
      <label>{label}</label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
