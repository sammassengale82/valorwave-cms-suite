import React from "react";
import { RenderNodeProps } from "../../types/renderNode";
import { getComputedStyles } from "../../utils/mergeStyles";
import { RenderNode } from "../canvas/RenderNode";

export const SectionNode: React.FC<RenderNodeProps> = ({
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
    outline: isSelected ? "2px solid #1976d2" : isHovered ? "1px dashed #90caf9" : "none",
    outlineOffset: "-1px"
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
    <section
      data-node-id={node.id}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
    </section>
  );
};