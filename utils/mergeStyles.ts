import { NodeStyles, StyleMap } from "../types/renderNode";
import React from "react";

export function getComputedStyles(
  styles?: NodeStyles,
  breakpoint: "desktop" = "desktop"
): React.CSSProperties {
  const base: StyleMap = styles?.[breakpoint] ?? {};
  const result: Record<string, string | number> = {};

  Object.entries(base).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    result[key] = value;
  });

  return result as React.CSSProperties;
}