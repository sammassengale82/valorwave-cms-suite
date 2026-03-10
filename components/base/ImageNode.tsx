import React from "react";
import { RenderNodeProps } from "../../types/renderNode";
import { getComputedStyles } from "../../utils/mergeStyles";

export const ImageNode: React.FC<RenderNodeProps> = ({
  node,
  selectedId,
  hoveredId,
  onSelect,
  onHover
}) => {
  const isSelected = node.id === selectedId;
  const isHovered = node.id === hoveredId;

  const style: React.CSSProperties = {
    ...getComputedStyles(node.styles),
    display: "block",
    outline: isSelected ? "2px solid #1976d2" : isHovered ? "1px dashed #90caf9" : "none",
    outlineOffset: "2px",
    cursor: "pointer"
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

  const src = node.content?.src ?? "";
  const alt = node.content?.alt ?? "";

  return (
    <img
      data-node-id={node.id}
      src={src}
      alt={alt}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};