import React from "react";
import TypographyPanel from "./TypographyPanel";
import ColorPanel from "./ColorPanel";
import LayoutPanel from "./LayoutPanel";
import SpacingPanel from "./SpacingPanel";

export default function Inspector() {
  return (
    <div className="inspector-root">
      <TypographyPanel />
      <ColorPanel />
      <LayoutPanel />
      <SpacingPanel />
    </div>
  );
}