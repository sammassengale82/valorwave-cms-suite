import React from "react";

interface Props {
  label: string;
  value: string | number | undefined;
  onChange: (v: string) => void;
  type?: string;
}

export default function StyleInput({ label, value, onChange, type = "text" }: Props) {
  return (
    <div className="style-input">
      <label>{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
