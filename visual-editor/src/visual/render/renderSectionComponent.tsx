import React from "react";
import { SectionComponents } from "../../components/sections";

export function renderSectionComponent(name: string | null, props: any) {
  if (!name) return null;

  const Component = (SectionComponents as any)[name];
  if (!Component) {
    console.warn("Missing section component:", name);
    return null;
  }

  return <Component {...props} />;
}
