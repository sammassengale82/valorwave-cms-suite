import { create } from "zustand";

interface EditorState {
  preview: boolean;
  enterPreview: () => void;
  exitPreview: () => void;

  selectedNodeId: string | null;
  selectSingle: (id: string | null) => void;
}

export const useEditorState = create<EditorState>((set) => ({
  preview: false,
  enterPreview: () => set({ preview: true }),
  exitPreview: () => set({ preview: false }),

  selectedNodeId: null,
  selectSingle: (id) => set({ selectedNodeId: id }),
}));
