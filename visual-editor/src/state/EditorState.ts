import { create } from "zustand";

interface EditorState {
  device: "desktop" | "tablet" | "mobile";
  preview: boolean;

  setDevice: (d: "desktop" | "tablet" | "mobile") => void;
  enterPreview: () => void;
  exitPreview: () => void;
}

export const useEditorState = create<EditorState>((set) => ({
  device: "desktop",
  preview: false,

  setDevice: (d) => set({ device: d }),

  enterPreview: () => set({ preview: true }),
  exitPreview: () => set({ preview: false })
}));