import React from "react";
import { RenderNodeProps } from "../../types/renderNode";
import { getComputedStyles } from "../../utils/mergeStyles";
import { RenderNode } from "../canvas/RenderNode";

export const MetaNode: React.FC<RenderNodeProps> = ({
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
    padding: "8px 10px",
    borderRadius: 4,
    background: "#f1f5f9",
    fontSize: 12,
    color: "#475569",
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

  return (
    <div
      data-node-id={node.id}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <strong>Meta Node:</strong> {node.templateName ?? node.id}
      {node.children?.map((child) => (
        <RenderNode
          key={child.id}
          node={child}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
};