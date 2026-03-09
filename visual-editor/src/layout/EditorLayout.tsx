import React from "react";
import HistoryScrubber from "../history/HistoryScrubber";

export default function EditorLayout({ children }: any) {
  return (
    <div className="editor-layout">
      <div className="editor-main">{children}</div>

      {/* Timeline Scrubber */}
      <div className="editor-scrubber">
        <HistoryScrubber />
      </div>
    </div>
  );
}