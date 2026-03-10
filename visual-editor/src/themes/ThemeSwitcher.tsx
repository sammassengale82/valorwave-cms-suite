import React from "react";
import { useTheme } from "./ThemeManager";
import themeConfig from "./theme-config.json";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      {Object.entries(themeConfig).map(([key, value]: any) => (
        <button
          key={key}
          className={theme === key ? "active" : ""}
          onClick={() => setTheme(key as any)}
        >
          {value.name}
        </button>
      ))}
    </div>
  );
}