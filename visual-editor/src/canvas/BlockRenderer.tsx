// src/canvas/BlockRenderer.tsx
import React from "react";
import type { Node } from "./CanvasState";

type Props = {
  node: Node;
};

export default function BlockRenderer({ node }: Props) {
  if (node.type === "Section") {
    const style = node.style ?? {};
    const layout = node.layout ?? {};

    const title =
      node.templateName ||
      node.templateCategory ||
      node.templateId ||
      node.id;

    return (
      <section
        className="ve-section"
        style={{ ...style, ...layout }}
      >
        <div className="ve-section-header">
          <span className="ve-section-title">{title}</span>
          {node.templateCategory && (
            <span className="ve-section-category">
              {node.templateCategory}
            </span>
          )}
        </div>
        {node.children?.map((child) => (
          <BlockRenderer key={child.id} node={child} />
        ))}
      </section>
    );
  }

  const style = node.style ?? {};
  const layout = node.layout ?? {};
  const typeLabel = (node.templateType || node.blockType || "block").toUpperCase();

  // IMAGE
  if (node.templateType === "image" || node.blockType === "image") {
    return (
      <div className="ve-image-block" style={{ ...style, ...layout }}>
        <div className="ve-block-meta">{typeLabel}</div>
        <img
          src={node.content?.imageUrl ?? ""}
          alt={node.content?.alt ?? ""}
        />
      </div>
    );
  }

  // BUTTON
  if (node.templateType === "button" || node.blockType === "button") {
    const label =
      node.content?.buttonLabel ?? node.content?.text ?? "Button";
    const href = node.content?.buttonHref ?? "#";

    return (
      <div className="ve-button-block" style={{ ...style, ...layout }}>
        <div className="ve-block-meta">{typeLabel}</div>
        <a href={href} className="ve-button">
          {label}
        </a>
      </div>
    );
  }

  // TEXT (default)
  return (
    <div className="ve-text-block" style={{ ...style, ...layout }}>
      <div className="ve-block-meta">{typeLabel}</div>
      <div
        className="ve-text"
        dangerouslySetInnerHTML={{
          __html: node.content?.text ?? "",
        }}
      />
    </div>
  );
}
