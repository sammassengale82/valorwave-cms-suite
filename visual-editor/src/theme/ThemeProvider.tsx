import React, { useEffect } from "react";
import { useTheme } from "./theme-manager";

export default function ThemeProvider({ children }) {
  const tokens = useTheme((s) => s.tokens);

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(tokens.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    Object.entries(tokens.typography).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });

    Object.entries(tokens.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--space-${key}`, value);
    });

    Object.entries(tokens.radius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    Object.entries(tokens.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
  }, [tokens]);

  return <>{children}</>;
}