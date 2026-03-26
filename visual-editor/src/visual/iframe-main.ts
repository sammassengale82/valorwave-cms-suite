// Import global site styles so Vite injects them into the iframe bundle
import "../styles/site.css";
import "../app/app.css";

import { renderIntoIframe } from "./iframe-renderer";

declare global {
  interface Window {
    renderVisualTree?: (visualTree: any) => void;
    __previewRoot?: any;
  }
}

// ⭐ Tell the parent window that the iframe is ready
window.parent.postMessage({ type: "iframe-ready" }, "*");

// ⭐ Called by the parent AFTER the iframe is ready
window.renderVisualTree = (visualTree: any) => {
  console.log("visualTree received by iframe:", visualTree);
  renderIntoIframe(visualTree);
};
