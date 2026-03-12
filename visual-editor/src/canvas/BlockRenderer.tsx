// src/canvas/BlockRenderer.tsx
import React from "react";
import type { Node } from "./CanvasState";

type Props = {
  node: Node;
};

export default function BlockRenderer({ node }: Props) {
  if (node.type === "Section") {
    return (
      <section className="ve-section">
        {node.children?.map((child) => (
          <BlockRenderer key={child.id} node={child} />
        ))}
      </section>
    );
  }

  switch (node.blockType) {
    case "hero":
      return (
        <div className="ve-hero">
          <h1>{node.content?.text ?? "Hero headline"}</h1>
        </div>
      );

    case "text":
      return (
        <p className="ve-text">
          {node.content?.text ?? "Text block"}
        </p>
      );

    case "image":
      return (
        <div className="ve-image">
          <img
            src={node.content?.imageUrl ?? "https://via.placeholder.com/800x400"}
            alt=""
          />
        </div>
      );

    case "button":
      return (
        <a
          href={node.content?.buttonHref ?? "#"}
          className="ve-button"
        >
          {node.content?.buttonLabel ?? "Button"}
        </a>
      );

    case "grid":
      return (
        <div className="ve-grid">
          <div className="ve-grid-title">
            {node.content?.text ?? "Grid"}
          </div>
        </div>
      );

    default:
      return <div className="ve-unknown">Unknown block</div>;
  }
}
