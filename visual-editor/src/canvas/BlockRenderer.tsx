import React from "react";
import type { Node } from "./CanvasState";

type Props = {
  node: Node;
};

export default function BlockRenderer({ node }: Props) {
  if (node.type === "Section") {
    // HERO: render as real hero header
    if (node.templateId === "hero" || node.templateName === "Hero") {
      return renderHeroSection(node);
    }

    // Default section wrapper (matches your <section> layout)
    return (
      <section
        id={node.templateId}
        data-theme-scope="all"
        style={{ ...(node.style ?? {}), ...(node.layout ?? {}) }}
      >
        {node.children?.map((child) => (
          <BlockRenderer key={child.id} node={child} />
        ))}
      </section>
    );
  }

  // Non-section blocks
  return renderBlock(node);
}

function renderHeroSection(node: Node) {
  const children = node.children ?? [];

  const logo = children.find((c) => c.id === "hero-logo");
  const kicker = children.find((c) => c.id === "hero-kicker");
  const headline = children.find((c) => c.id === "hero-headline");
  const tagline = children.find((c) => c.id === "hero-tagline");
  const subline = children.find((c) => c.id === "hero-subline");
  const cta = children.find((c) => c.id === "hero-cta");

  return (
    <header className="hero" data-theme-scope="all">
      <div className="hero-inner">
        {headline && (
          <h1 className="hero-h1">
            {headline.content?.text ?? ""}
          </h1>
        )}

        {logo && (
          <img
            className="hero-logo"
            src={logo.content?.imageUrl ?? "/logo.png"}
            alt={logo.content?.alt ?? "Valor Wave Entertainment"}
          />
        )}

        {kicker && (
          <div className="kicker">
            {kicker.content?.text ?? ""}
          </div>
        )}

        {tagline && (
          <div className="tagline">
            {tagline.content?.text ?? ""}
          </div>
        )}

        {subline && (
          <div className="subline">
            {subline.content?.text ?? ""}
          </div>
        )}

        {cta && (
          <a
            className="btn"
            href={cta.content?.buttonHref ?? "#"}
          >
            {cta.content?.buttonLabel ?? cta.content?.text ?? "Request a Quote"}
          </a>
        )}
      </div>
    </header>
  );
}

function renderBlock(node: Node) {
  const style = node.style ?? {};
  const layout = node.layout ?? {};
  const id = node.id ?? "";

  // IMAGE
  if (node.templateType === "image" || node.blockType === "image") {
    return (
      <img
        src={node.content?.imageUrl ?? ""}
        alt={node.content?.alt ?? ""}
        style={{ ...style, ...layout }}
      />
    );
  }

  // BUTTON
  if (node.templateType === "button" || node.blockType === "button") {
    const label =
      node.content?.buttonLabel ?? node.content?.text ?? "Button";
    const href = node.content?.buttonHref ?? "#";

    return (
      <a
        href={href}
        className="btn"
        style={{ ...style, ...layout }}
      >
        {label}
      </a>
    );
  }

  // TEXT → choose correct tag based on id
  const text = node.content?.text ?? "";

  if (id.endsWith("-heading")) {
    return (
      <h2 style={{ ...style, ...layout }}>
        {text}
      </h2>
    );
  }

  if (id.endsWith("-title")) {
    return (
      <h3 style={{ ...style, ...layout }}>
        {text}
      </h3>
    );
  }

  if (id === "bio-name" || id.endsWith("bio-name")) {
    return (
      <div className="bio-name" style={{ ...style, ...layout }}>
        {text}
      </div>
    );
  }

  if (id === "service-area-text" || id.includes("service-area")) {
    return (
      <p className="service-area" style={{ ...style, ...layout }}>
        {text}
      </p>
    );
  }

  // Default paragraph
  return (
    <p style={{ ...style, ...layout }}>
      {text}
    </p>
  );
}
