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

    return (
      <section
        className="ve-section"
        style={{ ...style, ...layout }}
      >
        <div className="ve-section-header">
          <span className="ve-section-id">{node.id}</span>
          {node.templateType && node.templateType !== "section" && (
            <span className="ve-section-type">{node.templateType}</span>
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
  const typeLabel = node.templateType || node.blockType || "block";

  // Prefer explicit blockType when we know it, otherwise fall back to templateType
  if (node.blockType === "hero") {
    return (
      <div className="ve-hero" style={{ ...style, ...layout }}>
        <div className="ve-block-meta">HERO</div>
        <h1>{node.content?.text ?? "Hero headline"}</h1>
      </div>
    );
  }

  if (node.blockType === "image" || node.templateType === "image") {
    return (
      <div className="ve-image" style={{ ...style, ...layout }}>
        <div className="ve-block-meta">IMAGE</div>
        <img
          src={node.content?.imageUrl ?? ""}
          alt={node.content?.alt ?? ""}
        />
      </div>
    );
  }

  if (node.blockType === "button" || node.templateType === "button") {
    return (
      <div className="ve-button-wrap" style={{ ...style, ...layout }}>
        <div className="ve-block-meta">BUTTON</div>
        <a
          href={node.content?.buttonHref ?? "#"}
          className="ve-button"
        >
          {node.content?.buttonLabel ?? node.content?.text ?? "Button"}
        </a>
      </div>
    );
  }

  if (node.blockType === "grid" || node.templateType === "grid") {
    return (
      <div className="ve-grid" style={{ ...style, ...layout }}>
        <div className="ve-block-meta">GRID</div>
        <div className="ve-grid-title">
          {node.content?.text ?? "Grid"}
        </div>
        {node.children?.map((child) => (
          <BlockRenderer key={child.id} node={child} />
        ))}
      </div>
    );
  }

  // Default: show type label + text content
  return (
    <div className="ve-text-block" style={{ ...style, ...layout }}>
      <div className="ve-block-meta">{typeLabel.toUpperCase()}</div>
      <div
        className="ve-text"
        dangerouslySetInnerHTML={{
          __html: node.content?.text ?? "",
        }}
      />
    </div>
  );
}
