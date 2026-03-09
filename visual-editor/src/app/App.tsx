import React, { useEffect, useState } from "react";
import { useCanvasState } from "./canvas/CanvasState";
import HistoryPanel from "./history/HistoryPanel";
import HistoryScrubber from "./history/HistoryScrubber";

export default function App() {
  const undo = useCanvasState((s) => s.undo);
  const redo = useCanvasState((s) => s.redo);

  const deleteSelected = useCanvasState((s) => s.deleteSelected);
  const duplicateSelected = useCanvasState((s) => s.duplicateSelected);
  const clearSelection = useCanvasState((s) => s.clearSelection);

  const selectedIds = useCanvasState((s) => s.selectedIds);

  const [historyOpen, setHistoryOpen] = useState(false);

  // ------------------------------------------------------------
  // KEYBOARD SHORTCUTS
  // ------------------------------------------------------------
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      // Undo
      if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      // Redo
      if (mod && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
        return;
      }

      // Duplicate selected: Cmd/Ctrl + D
      if (mod && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (selectedIds.length > 0) duplicateSelected();
        return;
      }

      // Delete selected
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedIds.length > 0) {
          e.preventDefault();
          deleteSelected();
        }
        return;
      }

      // Esc → clear selection
      if (e.key === "Escape") {
        clearSelection();
        return;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [undo, redo, deleteSelected, duplicateSelected, clearSelection, selectedIds]);

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
      <HistoryPanel
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />

      {/* Timeline Scrubber */}
      <div className="history-scrubber-container">
        <HistoryScrubber />
      </div>
    </div>
  );
}