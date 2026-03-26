// src/visual/render/SectionRenderer.tsx
import React from "react";

console.log("SECTION COMPONENTS IN IFRAME:", window.parent.__SECTION_COMPONENTS__);

export interface SectionConfig {
  id?: string | null;
  type?: string | null;
  props?: Record<string, any>;
}

interface SectionRendererProps {
  section: SectionConfig;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  const SectionComponents =
    (window.parent as any).__SECTION_COMPONENTS__ || {};

  const key = section.type || section.id;

  console.log("SECTION:", {
    id: section.id,
    type: section.type,
    resolvedKey: key,
    hasComponent: !!SectionComponents[key]
  });

  if (!key) return null;

  const Component = SectionComponents[key];
  if (!Component) {
    console.warn("Unknown component:", key);
    return null;
  }

  return <Component {...(section.props || {})} />;
}

