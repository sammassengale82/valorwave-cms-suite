import React from "react";
import { SectionComponents } from "../../components/sections";

export function renderSectionComponent(componentName: string, props: any) {
  const Component = SectionComponents[componentName];
  if (!Component) return null;
  return <Component {...props} />;
}
