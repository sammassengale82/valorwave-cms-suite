import React from "react";
import "../../../visual-editor/dist/style.css";
import VisualEditorApp from "../../../visual-editor/dist/VisualEditorApp";

export default function VisualEditor() {
  return <VisualEditorApp apiBase="capacitor://localhost" />;
}