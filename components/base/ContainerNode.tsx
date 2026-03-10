import React from "react";
import {
  RenderNodeProps
} from "../../types/renderNode";
import { getComputedStyles } from "../../utils/mergeStyles";
import { RenderNode } from "../canvas/RenderNode";
import { DropZone } from "../canvas/DropZone";

export const ContainerNode: React.FC<RenderNodeProps> = ({
  node,
  selectedId,
  hoveredId,
  dropTarget,
  onSelect,
  onHover,
  onDropZoneEnter,
  onDropZoneLeave,
  onDrop
}) => {
  const isSelected = node.id === selectedId;
  const isHovered = node.id === hoveredId;

  const style: React.CSSProperties = {
    ...getComputedStyles(node.styles),
    position: "relative",
    outline: isSelected ? "2px solid #1976d2" : isHovered ? "1px dashed #90caf9" : "none",
    outlineOffset: "-1px"
  };

  const isBeforeActive =
    dropTarget?.nodeId === node.id && dropTarget.position === "before";
  const isInsideActive =
    dropTarget?.nodeId === node.id && dropTarget.position === "inside";
  const isAfterActive =
    dropTarget?.nodeId === node.id && dropTarget.position === "after";

  return (
    <div
      data-node-id={node.id}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(node.id);
      }}
      onMouseEnter={() => onHover?.(node.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <DropZone
        onEnter={() => onDropZoneEnter?.(node.id, "before")}
        onLeave={() => onDropZoneLeave?.()}
        onDrop={(data) => onDrop?.(node.id, "before", data)}
        isActive={!!isBeforeActive}
      />

      {node.children?.map((child) => (
        <RenderNode
          key={child.id}
          node={child}
          selectedId={selectedId}
          hoveredId={hoveredId}
          dropTarget={dropTarget}
          onSelect={onSelect}
          onHover={onHover}
          onDropZoneEnter={onDropZoneEnter}
          onDropZoneLeave={onDropZoneLeave}
          onDrop={onDrop}
        />
      ))}

      <DropZone
        onEnter={() => onDropZoneEnter?.(node.id, "inside")}
        onLeave={() => onDropZoneLeave?.()}
        onDrop={(data) => onDrop?.(node.id, "inside", data)}
        isActive={!!isInsideActive}
      />

      <DropZone
        onEnter={() => onDropZoneEnter?.(node.id, "after")}
        onLeave={() => onDropZoneLeave?.()}
        onDrop={(data) => onDrop?.(node.id, "after", data)}
        isActive={!!isAfterActive}
      />
    </div>
  );
};