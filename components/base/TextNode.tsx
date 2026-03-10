import React from "react";
import { RenderNodeProps } from "../../types/renderNode";
import { getComputedStyles } from "../../utils/mergeStyles";
import { createSafeHtml } from "../../utils/safeHtml";

export const TextNode: React.FC<RenderNodeProps> = ({
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
    position: "relative",
    outline: isSelected ? "1px solid #1976d2" : isHovered ? "1px dashed #90caf9" : "none",
    outlineOffset: "2px",
    cursor: "text"
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
  const hasHtml = text.includes("<") && text.includes(">");

  if (hasHtml) {
    return (
      <div
        data-node-id={node.id}
        style={style}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        dangerouslySetInnerHTML={createSafeHtml(text)}
      />
    );
  }

  return (
    <div
      data-node-id={node.id}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </div>
  );
};