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
  if (node.type === "section") {
    return (
      <section
        id={node.templateId}
        data-node-id={node.id}
        onClick={handleClick}
        style={{ ...(node.styles?.desktop || {}), ...highlight }}
      >
        {renderSection(node)}
      </section>
    );
  }

  // BLOCK ROUTING
  return (
    <div
      data-node-id={node.id}
      onClick={handleClick}
      style={{ ...(node.styles?.desktop || {}), ...highlight }}
    >
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
    case "header": return renderHeader(node);
    case "hero": return renderHero(node);
    case "services": return renderServices(node);
    case "service-area": return renderServiceArea(node);
    case "bio": return renderBio(node);
    case "wedding-dj": return renderWeddingDJ(node);
    case "faq": return renderFAQ(node);
    case "brand-meaning": return renderBrandMeaning(node);
    case "hero-discount": return renderHeroDiscount(node);
    case "calendar": return renderCalendar(node);
    case "testimonial-form": return renderTestimonialForm(node);
    case "testimonials": return renderTestimonials(node);
    case "footer": return renderFooter(node);
    default: return renderGenericSection(node);
  }
}

//
// ─────────────────────────────────────────────
//   SECTION RENDERERS (FULL WEBSITE ACCURATE)
// ─────────────────────────────────────────────
//

function renderHeader(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderHero(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderServices(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderServiceArea(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderBio(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderWeddingDJ(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderFAQ(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderBrandMeaning(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderHeroDiscount(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderCalendar(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderTestimonialForm(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderTestimonials(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderFooter(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

function renderGenericSection(node: Node) {
  return (
    <div style={node.styles?.desktop}>
      {node.children?.map((child) => (
        <BlockRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}

//
// ─────────────────────────────────────────────
//   BLOCK RENDERER (ALL BLOCK TYPES)
// ─────────────────────────────────────────────
//

function renderBlock(node: Node) {
  switch (node.type) {
    case "text":
      return (
        <p
          style={node.styles?.desktop}
          dangerouslySetInnerHTML={{ __html: node.content?.text || "" }}
        />
      );

    case "image":
      return (
        <img
          src={node.content?.src}
          alt={node.content?.alt || ""}
          style={node.styles?.desktop}
        />
      );

    case "button":
      return (
        <a
          href={node.content?.href}
          style={node.styles?.desktop}
        >
          {node.content?.text}
        </a>
      );

    case "link":
      return (
        <a
          href={node.content?.href}
          style={node.styles?.desktop}
        >
          {node.content?.text}
        </a>
      );

    case "input":
      return (
        <input
          type="text"
          placeholder={node.content?.label}
          value={node.content?.value}
          readOnly
          style={node.styles?.desktop}
        />
      );

    case "textarea":
      return (
        <textarea
          placeholder={node.content?.label}
          value={node.content?.value}
          readOnly
          style={node.styles?.desktop}
        />
      );

    case "container":
      return (
        <div style={node.styles?.desktop}>
          {node.children?.map((child) => (
            <BlockRenderer key={child.id} node={child} />
          ))}
        </div>
      );

    case "card":
      return (
        <div style={node.styles?.desktop}>
          {node.children?.map((child) => (
            <BlockRenderer key={child.id} node={child} />
          ))}
        </div>
      );

    default:
      return null;
  }
}
