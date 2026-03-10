import React from "react";
import { useCanvasState } from "./CanvasState";
import { templates } from "../../../templates";
import { hasTemplateUpdateForNode } from "../templates/useTemplateVersioning";

export default function SectionWrapper({ node, children }: any) {
  const selectedIds = useCanvasState((s: any) => s.selectedIds);
  const selectOne = useCanvasState((s: any) => s.selectOne);
  const setSectionReplaceTarget = useCanvasState(
    (s: any) => s.setSectionReplaceTarget
  );
  const updateSectionToLatest = useCanvasState(
    (s: any) => s.updateSectionToLatest
  );

  const isSelected = selectedIds.includes(node.id);

  const template = node.templateId
    ? templates.find((t) => t.id === node.templateId)
    : undefined;

  const hasUpdate = hasTemplateUpdateForNode(node, template);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    selectOne(node.id);
  }

  function handleReplaceClick(e: React.MouseEvent) {
    e.stopPropagation();
    setSectionReplaceTarget(node.id);
  }

  function handleUpdateClick(e: React.MouseEvent) {
    e.stopPropagation();
    updateSectionToLatest(node.id);
  }

  return (
    <div
      className={`section-wrapper ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      style={{
        position: "relative",
        padding: "20px"
      }}
    >
      {isSelected && (
        <>
          <div className="selection-outline" />
          <button
            className="replace-btn"
            onClick={handleReplaceClick}
          >
            Replace Section
          </button>
          {hasUpdate && (
            <button
              className="update-btn"
              onClick={handleUpdateClick}
            >
              Update Template
            </button>
          )}
        </>
      )}
      {children}
    </div>
  );
}