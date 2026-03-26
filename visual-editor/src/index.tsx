import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./app/app.css";
import "./styles/site.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);