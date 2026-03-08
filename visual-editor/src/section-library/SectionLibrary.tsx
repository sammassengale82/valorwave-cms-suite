import React from "react";
import { SectionPresets } from "./section-presets";
import SectionItem from "./SectionItem";
import { useCanvasState } from "../canvas/CanvasState";
import { insertNodeAtRoot } from "../canvas/VisualTree";

export default function SectionLibrary() {
  const setTree = useCanvasState((s) => s.setTree);
  const tree = useCanvasState((s) => s.tree);

  function addSection(type: string) {
    const preset = JSON.parse(JSON.stringify(SectionPresets[type]));
    preset.id = crypto.randomUUID();

    if (preset.children) {
      preset.children = preset.children.map((c) => ({
        ...c,
        id: crypto.randomUUID()
      }));
    }

    const updated = insertNodeAtRoot(tree, preset, tree.root.length);
    setTree(updated);
  }

  return (
    <div className="section-library">
      <h3>Add Section</h3>
      {Object.keys(SectionPresets).map((key) => (
        <SectionItem key={key} name={key} onAdd={() => addSection(key)} />
      ))}
    </div>
  );
}