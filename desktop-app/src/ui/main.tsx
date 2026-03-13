import React from "react";
import { createRoot } from "react-dom/client";
import VisualEditor from "./ui/mount-visual-editor";
import "./styles/site.css";

const root = createRoot(document.getElementById("root")!);
root.render(<VisualEditor />);
