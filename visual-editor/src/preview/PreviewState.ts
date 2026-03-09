import create from "zustand";

export const usePreviewState = create((set) => ({
  mode: "editor", // editor | preview | desktop | tablet | mobile

  setMode: (mode: string) => set({ mode }),
}));