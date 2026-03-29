// src/editor/modals/PublishConfirmModal.tsx
import React from "react";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PublishConfirmModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Publish Site</h2>
        <p>
          This will generate <code>publish.json</code> and update the live
          website. Continue?
        </p>

        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button className="danger" onClick={onConfirm}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
