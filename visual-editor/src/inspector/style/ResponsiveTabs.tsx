import React from "react";
import { useEditorState } from "../../state/EditorState";

export default function ResponsiveTabs() {
  const device = useEditorState((s) => s.device);
  const setDevice = useEditorState((s) => s.setDevice);

  return (
    <div className="responsive-tabs">
      <button
        className={device === "desktop" ? "active" : ""}
        onClick={() => setDevice("desktop")}
      >
        Desktop
      </button>
      <button
        className={device === "tablet" ? "active" : ""}
        onClick={() => setDevice("tablet")}
      >
        Tablet
      </button>
      <button
        className={device === "mobile" ? "active" : ""}
        onClick={() => setDevice("mobile")}
      >
        Mobile
      </button>
    </div>
  );
}