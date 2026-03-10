// components/canvas/DropZone.tsx
import React from "react";

export const DropZone = ({
  onEnter,
  onLeave,
  onDrop,
  isActive,
  height = 12
}: {
  onEnter: () => void;
  onLeave: () => void;
  onDrop: (data: any) => void;
  isActive: boolean;
  height?: number;
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onEnter();
  };

  const handleDragLeave = () => {
    onLeave();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    onDrop(data);
    onLeave();
  };

  return (
    <div
      style={{
        height,
        background: isActive ? "#1976d2" : "transparent",
        transition: "background 0.15s",
        margin: "4px 0"
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    />
  );
};