import React, { useEffect, useState } from "react";
import { useCanvasState } from "./canvas/CanvasState";
import HistoryPanel from "./history/HistoryPanel";
import HistoryScrubber from "./history/HistoryScrubber";

export default function App() {
  const undo = useCanvasState((s) => s.undo);
  const redo = useCanvasState((s) => s.redo);

  const [historyOpen, setHistoryOpen] = useState(false);

  // ------------------------------------------------------------
  // KEYBOARD SHORTCUTS
  // ------------------------------------------------------------
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      // Undo: Cmd+Z / Ctrl+Z
      if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      // Redo: Cmd+Shift+Z / Ctrl+Shift+Z
      if (mod && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
        return;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [undo, redo]);

  return (
    <div className="app-container">
      {/* Top Bar */}
      <div className="top-bar">
        <button onClick={() => undo()}>Undo</button>
        <button onClick={() => redo()}>Redo</button>
        <button onClick={() => setHistoryOpen(true)}>History</button>
      </div>

      {/* Main Editor */}
      <div className="editor-container">
        {/* Your existing editor UI */}
      </div>

      {/* History Panel */}
      <HistoryPanel isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />

      {/* Timeline Scrubber */}
      <HistoryScrubber />
    </div>
  );
}