import React from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function HistoryPanel({ isOpen, onClose }: any) {
  const history = useCanvasState((s) => s.history);
  const historyIndex = useCanvasState((s) => s.historyIndex);
  const setTree = useCanvasState((s) => s.setTree);

  function jumpTo(entryIndex: number) {
    const entry = history[entryIndex];
    if (!entry) return;

    // Replace tree without pushing new history
    setTree(JSON.parse(JSON.stringify(entry.tree)), false);
    useCanvasState.setState({ historyIndex: entryIndex });
  }

  if (!isOpen) return null;

  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>History</h3>
        <button onClick={onClose}>Close</button>
      </div>

      <div className="history-list">
        {history.map((entry, index) => {
          const active = index === historyIndex;

          return (
            <div
              key={entry.id}
              className={`history-item ${active ? "active" : ""}`}
              onClick={() => jumpTo(index)}
            >
              <div className="history-label">{entry.label}</div>
              <div className="history-timestamp">
                {new Date(entry.timestamp).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}