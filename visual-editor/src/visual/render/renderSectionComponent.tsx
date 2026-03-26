// src/visual/render/renderSectionComponent.tsx
import React from "react";

export function renderSectionComponent(name: string | null, props: any) {
  if (!name) return null;

  // ⭐ Pull components ONLY from global injection
  const SectionComponents = (window as any).__SECTION_COMPONENTS__ || {};

  const Component = SectionComponents[name];
  if (!Component) {
    console.warn("Missing section component:", name);
    return null;
  }

  return <Component {...props} />;
}
