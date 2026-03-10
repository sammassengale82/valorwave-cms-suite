import React from "react";

export default function DragLayer({ dragging }: any) {
  if (!dragging) return null;

  return (
    <div className="drag-layer">
      <div className="drag-ghost">{dragging.label}</div>
    </div>
  );
}