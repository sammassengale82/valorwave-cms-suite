import React from "react";
import { RenderNodeProps } from "../../types/renderNode";
import { getComputedStyles } from "../../utils/mergeStyles";

export const InputNode: React.FC<RenderNodeProps> = ({
  node,
  selectedId,
  hoveredId,
  onSelect,
  onHover
}) => {
  const isSelected = node.id === selectedId;
  const isHovered = node.id === hoveredId;

  const wrapperStyle: React.CSSProperties = {
    ...getComputedStyles(node.styles),
    position: "relative",
    outline: isSelected ? "1px solid #1976d2" : isHovered ? "1px dashed #90caf9" : "none",
    outlineOffset: "2px"
  };

  const handleClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    onSelect?.(node.id);
  };

  const handleMouseEnter: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    onHover?.(node.id);
  };

  const handleMouseLeave: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    onHover?.(null);
  };

  const label = node.content?.label ?? "";
  const value = node.content?.value ?? "";

  return (
    <div
      data-node-id={node.id}
      style={wrapperStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label && (
        <label style={{ display: "block", marginBottom: 4, fontSize: 14 }}>{label}</label>
      )}
      <input
        style={{
          width: "100%",
          padding: "8px 10px",
          borderRadius: 4,
          border: "1px solid #cbd5e1",
          fontSize: 14
        }}
        value={value}
        readOnly
      />
    </div>
  );
};