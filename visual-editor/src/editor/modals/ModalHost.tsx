// src/editor/modals/ModalHost.tsx
import React from "react";
import { useCanvasState } from "../../canvas/CanvasState";
import PublishConfirmModal from "./PublishConfirmModal";
import { treeToTemplates } from "../../canvas/saveTemplates";
import { publishSite } from "../../canvas/publishSite";

export default function ModalHost() {
  const modal = useCanvasState((s) => s.modal);
  const closeModal = useCanvasState((s) => s.closeModal);
  const tree = useCanvasState((s) => s.tree);
  const markClean = useCanvasState((s) => s.markClean);

  if (!modal) return null;

  if (modal.name === "publish") {
    const handleConfirm = () => {
      const templateData = treeToTemplates(tree);
      publishSite(templateData);
      markClean();
      closeModal();
    };

    return (
      <PublishConfirmModal
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    );
  }

  return null;
}
