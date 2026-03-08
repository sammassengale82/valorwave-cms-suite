import React from "react";
import { useEditorState } from "../state/EditorState";

export default function DeviceSwitcher() {
  const device = useEditorState((s) => s.device);
  const setDevice = useEditorState((s) => s.setDevice);

  return (
    <div className="device-switcher">
      <button onClick={() => setDevice("desktop")}>Desktop</button>
      <button onClick={() => setDevice("tablet")}>Tablet</button>
      <button onClick={() => setDevice("mobile")}>Mobile</button>
    </div>
  );
}