import React from "react";

interface Props {
  label: string;
  onAdd: () => void;
}

export default function BlockItem({ label, onAdd }: Props) {
  return (
    <button className="block-item" onClick={onAdd}>
      {label}
    </button>
  );
}