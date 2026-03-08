import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface EditorState {
  draft: any;
  selectedId: string | null;
  device: "desktop" | "tablet" | "mobile";

  setDraft: (data: any) => void;
  select: (id: string | null) => void;
  setDevice: (d: "desktop" | "tablet" | "mobile") => void;
}

export const useEditorState = create<EditorState>()(
  immer((set) => ({
    draft: {},
    selectedId: null,
    device: "desktop",

    setDraft: (data) => set((s) => { s.draft = data }),
    select: (id) => set((s) => { s.selectedId = id }),
    setDevice: (d) => set((s) => { s.device = d })
  }))
);