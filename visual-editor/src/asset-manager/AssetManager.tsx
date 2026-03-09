import React, { useEffect, useState, useRef } from "react";
import {
  listAssets,
  uploadAsset,
  deleteAsset,
  renameAsset,
} from "../api/assets";
import type { Asset } from "../types/AssetTypes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (asset: Asset) => void; // optional: used by AssetPicker
}

export default function AssetManager({ isOpen, onClose, onSelect }: Props) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ------------------------------------------------------------
  // Load assets on open
  // ------------------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      load();
    }
  }, [isOpen]);

  async function load() {
    const list = await listAssets();
    setAssets(list);
  }

  // ------------------------------------------------------------
  // Upload handler
  // ------------------------------------------------------------
  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      await uploadAsset(file);
    }

    await load();
  }

  // ------------------------------------------------------------
  // Drag & Drop
  // ------------------------------------------------------------
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    await handleUpload(files);
  }

  // ------------------------------------------------------------
  // Delete asset
  // ------------------------------------------------------------
  async function handleDelete(asset: Asset) {
    if (!confirm(`Delete ${asset.filename}?`)) return;
    await deleteAsset(asset.id);
    await load();
  }

  // ------------------------------------------------------------
  // Rename asset
  // ------------------------------------------------------------
  async function handleRename(asset: Asset) {
    const newName = prompt("New filename:", asset.filename);
    if (!newName || newName === asset.filename) return;

    await renameAsset(asset.id, newName);
    await load();
  }

  // ------------------------------------------------------------
  // Copy URL
  // ------------------------------------------------------------
  function handleCopyUrl(asset: Asset) {
    navigator.clipboard.writeText(asset.url);
    alert("URL copied to clipboard");
  }

  // ------------------------------------------------------------
  // Select asset (for AssetPicker)
  // ------------------------------------------------------------
  function handleSelect(asset: Asset) {
    if (onSelect) {
      onSelect(asset);
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div className="asset-manager-overlay">
      <div className="asset-manager">
        <div className="asset-manager-header">
          <h3>Asset Manager</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="asset-manager-actions">
          <button
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Files
          </button>

          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => handleUpload(e.target.files)}
          />
        </div>

        <div
          className={`asset-dropzone ${dragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag & drop files here</p>
        </div>

        <div className="asset-grid">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="asset-item"
              onClick={() => handleSelect(asset)}
            >
              <img src={asset.url} alt={asset.filename} />

              <div className="asset-meta">
                <span className="asset-name">{asset.filename}</span>
                <span className="asset-size">
                  {(asset.size / 1024).toFixed(1)} KB
                </span>
              </div>

              <div className="asset-actions">
                <button onClick={(e) => { e.stopPropagation(); handleCopyUrl(asset); }}>
                  Copy URL
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleRename(asset); }}>
                  Rename
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(asset); }}>
                  Delete
                </button>
              </div>
            </div>
          ))}

          {assets.length === 0 && (
            <div className="asset-empty">
              <p>No assets uploaded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}