import { create } from "zustand";

export type PreviewMode = "editor" | "desktop" | "tablet" | "mobile";

interface PreviewState {
  mode: PreviewMode;
  setMode: (mode: PreviewMode) => void;
}

export const usePreviewState = create<PreviewState>((set) => ({
  mode: "editor",
  setMode: (mode) => set({ mode }),
}));
