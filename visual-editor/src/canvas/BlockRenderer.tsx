import React from "react";
import type { Node } from "../canvas/CanvasState";
import { useEditorState } from "../state/EditorState";

export default function BlockRenderer({ node }: { node: Node }) {
  const selectSingle = useEditorState((s) => s.selectSingle);
  const selectedIds = useEditorState((s) => s.selectedIds || []);
  const isSelected = selectedIds.includes(node.id);

  if (!node) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectSingle(node.id);
  };

  const highlight: React.CSSProperties = isSelected
    ? { outline: "2px solid #38bdf8", outlineOffset: "2px" }
    : {};

  // SECTION ROUTING
  if (node.type === "Section") {
    return (
      <div data-node-id={node.id} onClick={handleClick} style={highlight}>
        {renderSection(node)}
      </div>
    );
  }

  // BLOCK ROUTING
  return (
    <div data-node-id={node.id} onClick={handleClick} style={highlight}>
      {renderBlock(node)}
    </div>
  );
}

//
// ─────────────────────────────────────────────
//   SECTION ROUTER
// ─────────────────────────────────────────────
//

function renderSection(node: Node) {
  switch (node.templateId) {
    case "hero":
      return renderHero(node);
    case "services":
      return renderServices(node);
    case "service-area":
      return renderServiceArea(node);
    case "bio":
      return renderBio(node);
    case "wedding-dj":
      return renderWeddingDJ(node);
    case "faq":
      return renderFAQ(node);
    case "brand-meaning":
      return renderBrandMeaning(node);
    case "hero-discount":
      return renderHeroDiscount(node);
    case "calendar":
      return renderCalendar(node);
    case "testimonial-form":
      return renderTestimonialForm(node);
    case "testimonials":
      return renderTestimonials(node);
    case "footer":
      return renderFooter(node);
    default:
      return renderGenericSection(node);
  }
}

//
// ─────────────────────────────────────────────
//   SECTION RENDERERS
// ─────────────────────────────────────────────
//

function renderGenericSection(node: Node) {
  return (
    <section id={node.templateId} data-theme-scope="all">
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </section>
  );
}

function renderHero(node: Node) {
  const c = childMap(node);

  return (
    <header className="hero" data-theme-scope="all">
      <div className="hero-inner">
        {c["hero-h1"] && <h1 className="hero-h1">{c["hero-h1"].content?.text}</h1>}
        {c["hero-logo"] && (
          <img
            className="hero-logo"
            src={c["hero-logo"].content?.imageUrl}
            alt="Valor Wave Entertainment"
          />
        )}
        {c["hero-kicker"] && <div className="kicker">{c["hero-kicker"].content?.text}</div>}
        {c["hero-tagline"] && <div className="tagline">{c["hero-tagline"].content?.text}</div>}
        {c["hero-subline"] && <div className="subline">{c["hero-subline"].content?.text}</div>}
        {c["hero-cta"] && (
          <a className="btn" href={c["hero-cta"].content?.buttonHref}>
            {c["hero-cta"].content?.buttonLabel}
          </a>
        )}
      </div>
    </header>
  );
}

function renderServices(node: Node) {
  return (
    <section id="services" data-theme-scope="all">
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </section>
  );
}

function renderServiceArea(node: Node) {
  return (
    <section id="service-area" data-theme-scope="all">
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </section>
  );
}

function renderBio(node: Node) {
  return (
    <section id="bio" data-theme-scope="all">
      <h2>{getChild(node, "bio-heading")}</h2>
      <div className="bio-wrap">
        {node.children?.map((child) => (
          <BlockRenderer key={child.id} node={child} />
        ))}
      </div>
    </section>
  );
}

function renderWeddingDJ(node: Node) {
  return (
    <section id="chattanooga-wedding-dj" data-theme-scope="all">
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </section>
  );
}

function renderFAQ(node: Node) {
  return (
    <section id="faq" data-theme-scope="all">
      <h2>{getChild(node, "faq-heading")}</h2>
      <div className="bio-wrap">
        {node.children
          ?.filter((c) => c.id.startsWith("faq-"))
          .map((child) => (
            <BlockRenderer key={child.id} node={child} />
          ))}
      </div>
    </section>
  );
}

function renderBrandMeaning(node: Node) {
  return (
    <section id="brand-meaning" data-theme-scope="all">
      <h2>{getChild(node, "brand-meaning-heading")}</h2>
      <div className="bio-wrap">
        {node.children?.map((child) => (
          <BlockRenderer key={child.id} node={child} />
        ))}
      </div>
    </section>
  );
}

function renderHeroDiscount(node: Node) {
  return (
    <section id="hero-discount" data-theme-scope="all">
      <h2>{getChild(node, "hero-discount-heading")}</h2>
      <div className="bio-wrap">
        {node.children?.map((child) => (
          <BlockRenderer key={child.id} node={child} />
        ))}
      </div>
    </section>
  );
}

function renderCalendar(node: Node) {
  return (
    <section id="calendar" data-theme-scope="all">
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </section>
  );
}

function renderTestimonialForm(node: Node) {
  return (
    <section id="submit-testimonial" data-theme-scope="all">
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </section>
  );
}

function renderTestimonials(node: Node) {
  return (
    <section id="testimonials" data-theme-scope="all">
      <h2>{getChild(node, "testimonial-heading")}</h2>
      <div className="testimonial-scroll">
        {node.children?.map((child) => (
          <BlockRenderer key={child.id} node={child} />
        ))}
      </div>
    </section>
  );
}

function renderFooter(node: Node) {
  return (
    <footer data-theme-scope="all">
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </footer>
  );
}

//
// ─────────────────────────────────────────────
//   BLOCK RENDERER
// ─────────────────────────────────────────────
//

function renderBlock(node: Node) {
  const text = node.content?.text ?? "";

  switch (node.templateType || node.type) {
    case "text":
      return <p dangerouslySetInnerHTML={{ __html: text }} />;

    case "image":
      return <img src={node.content?.imageUrl} alt={node.content?.alt ?? ""} />;

    case "button":
      return (
        <a className="btn" href={node.content?.buttonHref}>
          {node.content?.buttonLabel}
        </a>
      );

    case "container":
      return (
        <div style={node.layout || {}}>
          {node.children?.map((child) => (
            <BlockRenderer key={child.id} node={child} />
          ))}
        </div>
      );

    default:
      return null;
  }
}

//
// ─────────────────────────────────────────────
//   HELPERS
// ─────────────────────────────────────────────
//

function childMap(node: Node) {
  const map: Record<string, Node> = {};
  node.children?.forEach((c) => (map[c.id] = c));
  return map;
}

function getChild(node: Node, id: string) {
  return node.children?.find((c) => c.id === id)?.content?.text ?? "";
}
