import React from "react";

export default function SectionItem({ name, onAdd }) {
  return (
    <button className="section-item" onClick={onAdd}>
      {name.replace("Section", "")}
    </button>
  );
}