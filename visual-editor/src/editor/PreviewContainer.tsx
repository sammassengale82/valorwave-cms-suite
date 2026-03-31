import React from "react";
import PreviewRenderer from "../visual/PreviewRenderer";

export default function PreviewContainer() {
  return (
    <div
      className="preview-container"
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "auto",
        display: "flex",
      }}
    >
      <PreviewRenderer />
    </div>
  );
}
