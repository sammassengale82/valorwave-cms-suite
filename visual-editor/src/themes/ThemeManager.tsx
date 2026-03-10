import React, { createContext, useContext, useEffect, useState } from "react";
import themeConfig from "./theme-config.json";

type ThemeName = keyof typeof themeConfig;

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "patriotic",
  setTheme: () => {}
});

export function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<ThemeName>("patriotic");

  useEffect(() => {
    const vars = themeConfig[theme].variables;
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value as string);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}