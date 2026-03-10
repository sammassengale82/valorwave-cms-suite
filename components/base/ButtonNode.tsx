import React from "react";
import { RenderNodeProps } from "../../types/renderNode";
import { getComputedStyles } from "../../utils/mergeStyles";

export const ButtonNode: React.FC<RenderNodeProps> = ({
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
    display: "inline-block",
    cursor: "pointer",
    textDecoration: "none",
    outline: isSelected ? "2px solid #1976d2" : isHovered ? "1px dashed #90caf9" : "none",
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

  const text = node.content?.text ?? "";
  const href = node.content?.href;

  if (href) {
    return (
      <a
        data-node-id={node.id}
        href={href}
        style={style}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      type="button"
      data-node-id={node.id}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </button>
  );
};