import React from "react";
import ContentInspector from "./ContentInspector";
import StyleInspector from "./style/StyleInspector";

export default function Inspector() {
  return (
    <div className="inspector">
      <ContentInspector />
      <StyleInspector />
    </div>
  );
}