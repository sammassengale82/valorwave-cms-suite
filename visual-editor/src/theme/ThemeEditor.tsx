import React from "react";
import { useTheme } from "./theme-manager";

export default function ThemeEditor() {
  const themeName = useTheme((s) => s.themeName);
  const setTheme = useTheme((s) => s.setTheme);
  const tokens = useTheme((s) => s.tokens);
  const updateToken = useTheme((s) => s.updateToken);

  return (
    <div className="theme-editor">
      <h3>Theme</h3>

      <select value={themeName} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="patriotic">Patriotic</option>
      </select>

      <h4>Colors</h4>
      {Object.entries(tokens.colors).map(([key, value]) => (
        <div key={key} className="theme-field">
          <label>{key}</label>
          <input
            type="color"
            value={value}
            onChange={(e) => updateToken(`colors.${key}`, e.target.value)}
          />
        </div>
      ))}

      <h4>Typography</h4>
      {Object.entries(tokens.typography).map(([key, value]) => (
        <div key={key} className="theme-field">
          <label>{key}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => updateToken(`typography.${key}`, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}