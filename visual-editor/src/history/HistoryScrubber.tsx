import React, { useRef, useState } from "react";
import { useCanvasState } from "../canvas/CanvasState";

export default function HistoryScrubber() {
  const history = useCanvasState((s) => s.history);
  const historyIndex = useCanvasState((s) => s.historyIndex);
  const setTree = useCanvasState((s) => s.setTree);

  const [dragging, setDragging] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  function jumpTo(index: number) {
    const entry = history[index];
    if (!entry) return;

    setTree(JSON.parse(JSON.stringify(entry.tree)), false);
    useCanvasState.setState({ historyIndex: index });
  }

  function handleClick(e: React.MouseEvent) {
    if (!barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;

    const index = Math.round(percent * (history.length - 1));
    jumpTo(index);
  }

  function handleDrag(e: React.MouseEvent) {
    if (!dragging || !barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));

    const index = Math.round(percent * (history.length - 1));
    jumpTo(index);
  }

  return (
    <div
      className="history-scrubber"
      onMouseMove={handleDrag}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
    >
      <div
        className="history-scrubber-bar"
        ref={barRef}
        onMouseDown={(e) => {
          setDragging(true);
          handleClick(e);
        }}
        onClick={handleClick}
      >
        {/* Ticks */}
        {history.map((entry, index) => {
          const percent = index / (history.length - 1);

          return (
            <div
              key={entry.id}
              className={`history-tick ${
                index === historyIndex ? "active" : ""
              }`}
              style={{ left: `${percent * 100}%` }}
              onClick={(e) => {
                e.stopPropagation();
                jumpTo(index);
              }}
            />
          );
        })}

        {/* Active indicator */}
        {history.length > 0 && (
          <div
            className="history-indicator"
            style={{
              left: `${(historyIndex / (history.length - 1)) * 100}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}