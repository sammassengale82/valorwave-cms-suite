// src/editor/panels/ThemeEditorPanel.tsx
import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";

export default function ThemeEditorPanel() {
  const templateData = useCanvasState((s) => s.templateData);
  const updateTheme = useCanvasState((s) => s.updateTheme);

  // ⭐ Prevent crashes while template loads
  if (!templateData) {
    return (
      <div className="theme-editor-panel">
        <h2>Theme</h2>
        <p>Loading theme…</p>
      </div>
    );
  }

  if (!templateData.site) {
    return (
      <div className="theme-editor-panel">
        <h2>Theme</h2>
        <p>No site data found.</p>
      </div>
    );
  }

  if (!templateData.site.theme) {
    return (
      <div className="theme-editor-panel">
        <h2>Theme</h2>
        <p>No theme tokens found.</p>
      </div>
    );
  }

  const theme = templateData.site.theme;

  function handleChange(key: string, value: string) {
    updateTheme({ [key]: value });
  }

  return (
    <div className="theme-editor-panel">
      <h2>Theme</h2>

      {Object.entries(theme).map(([token, value]) => (
        <div key={token} className="theme-field">
          <label>{token}</label>

          {/* Color picker for hex values */}
          {String(value).startsWith("#") && (
            <input
              type="color"
              value={value}
              onChange={(e) => handleChange(token, e.target.value)}
            />
          )}

          {/* Text input for rgba() or other formats */}
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(token, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
