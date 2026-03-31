// Import global site styles so Vite injects them into the iframe bundle
import "../styles/site.css";
import "../app/app.css";

import { renderIntoIframe } from "./iframe-renderer";

console.log("IFRAME RUNTIME LOADED");

declare global {
  interface Window {
    renderVisualTree?: (visualTree: any) => void;
    __previewRoot?: HTMLElement | null;
  }
}

// ------------------------------------------------------------
// ⭐ Notify parent that iframe is ready
// ------------------------------------------------------------
window.parent.postMessage({ type: "iframe-ready" }, "*");

// ------------------------------------------------------------
// ⭐ Attach click handlers to all editable fields
// ------------------------------------------------------------
function attachEditableHandlers() {
  const nodes = document.querySelectorAll("[data-ve-edit]");

  nodes.forEach((node) => {
    const key = node.getAttribute("data-ve-edit");
    if (!key) return;

    // Remove old listeners to avoid duplicates
    node.replaceWith(node.cloneNode(true));
  });

  // Re-select after clone
  const freshNodes = document.querySelectorAll("[data-ve-edit]");

  freshNodes.forEach((node) => {
    const key = node.getAttribute("data-ve-edit");
    if (!key) return;

    node.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // ⭐ Send selection event to parent
      window.parent.postMessage(
        {
          type: "ve-select",
          key,
        },
        "*"
      );
    });
  });

  console.log("Editable handlers attached:", freshNodes.length);
}

// ------------------------------------------------------------
// ⭐ Called by parent AFTER iframe is ready
// ------------------------------------------------------------
window.renderVisualTree = (visualTree: any) => {
  console.log("visualTree received by iframe:", visualTree);

  // Render into #root
  renderIntoIframe(visualTree);

  // ⭐ Re-attach editable handlers after DOM update
  attachEditableHandlers();

  console.log("Preview DOM rendered + handlers attached.");
};
