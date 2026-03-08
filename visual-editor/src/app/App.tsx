import React from "react";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import Canvas from "../canvas/Canvas";
import Inspector from "../inspector/Inspector";
import CMSPanel from "../cms-panel/CMSPanel";
import DeviceSwitcher from "../devices/DeviceSwitcher";

export default function App() {
  return (
    <div className="editor-root">
      <Toolbar />
      <div className="editor-body">
        <Sidebar />
        <Canvas />
        <Inspector />
      </div>
      <CMSPanel />
      <DeviceSwitcher />
    </div>
  );
}