import React, { useEffect, useState } from "react";
import { listAssets } from "../api/assets";
import type { Asset } from "../types/AssetTypes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (asset: Asset) => void;
}

export default function AssetPicker({ isOpen, onClose, onSelect }: Props) {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    if (isOpen) {
      load();
    }
  }, [isOpen]);

  async function load() {
    const list = await listAssets();
    setAssets(list);
  }

  if (!isOpen) return null;

  return (
    <div className="asset-picker-overlay">
      <div className="asset-picker">
        <div className="asset-picker-header">
          <h3>Select Image</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="asset-picker-grid">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="asset-picker-item"
              onClick={() => {
                onSelect(asset);
                onClose();
              }}
            >
              <img src={asset.url} alt={asset.filename} />

              <div className="asset-picker-meta">
                <span>{asset.filename}</span>
                <span>{(asset.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>
          ))}

          {assets.length === 0 && (
            <div className="asset-picker-empty">
              <p>No assets available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}