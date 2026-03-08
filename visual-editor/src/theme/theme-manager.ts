import { create } from "zustand";
import { Themes, ThemeTokens } from "./theme-tokens";

interface ThemeState {
  themeName: string;
  tokens: ThemeTokens;

  setTheme: (name: string) => void;
  updateToken: (path: string, value: string) => void;
}

export const useTheme = create<ThemeState>((set) => ({
  themeName: "patriotic",
  tokens: Themes["patriotic"],

  setTheme: (name) =>
    set(() => ({
      themeName: name,
      tokens: Themes[name]
    })),

  updateToken: (path, value) =>
    set((state) => {
      const parts = path.split(".");
      let obj: any = state.tokens;

      for (let i = 0; i < parts.length - 1; i++) {
        obj = obj[parts[i]];
      }

      obj[parts[parts.length - 1]] = value;
    })
}));