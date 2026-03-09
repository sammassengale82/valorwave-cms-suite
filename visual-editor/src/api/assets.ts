// assets.ts
// Unified Asset Manager API for Web, Desktop, and Mobile
// Handles: upload, list, delete, rename, metadata, and saving assets.json

import { getDraft, saveDraft } from "./api"; // existing CMS API
import type { Asset } from "../types/AssetTypes";

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

function generateId() {
  return crypto.randomUUID();
}

async function loadAssetsJson(): Promise<{ assets: Asset[] }> {
  const cms = await getDraft();
  return cms.assets || { assets: [] };
}

async function saveAssetsJson(data: { assets: Asset[] }) {
  const cms = await getDraft();
  cms.assets = data;
  await saveDraft(cms);
}

// ------------------------------------------------------------
// Platform Detection
// ------------------------------------------------------------

const isTauri = typeof (window as any).__TAURI__ !== "undefined";
const isCapacitor = typeof (window as any).Capacitor !== "undefined";

// ------------------------------------------------------------
// 1. LIST ASSETS
// ------------------------------------------------------------

export async function listAssets(): Promise<Asset[]> {
  const data = await loadAssetsJson();
  return data.assets;
}

// ------------------------------------------------------------
// 2. UPLOAD ASSET
// ------------------------------------------------------------

export async function uploadAsset(file: File): Promise<Asset> {
  const id = generateId();
  const filename = file.name;
  const uploadPath = `/data/images/uploads/${filename}`;

  let url = uploadPath;

  // ------------------------------------------------------------
  // Web Upload (local + GitHub sync)
  // ------------------------------------------------------------
  if (!isTauri && !isCapacitor) {
    // Convert file to base64 for CMS storage
    const base64 = await fileToBase64(file);

    const cms = await getDraft();
    cms.uploads = cms.uploads || {};
    cms.uploads[filename] = base64;

    await saveDraft(cms);
  }

  // ------------------------------------------------------------
  // Desktop Upload (Tauri FS)
  // ------------------------------------------------------------
  if (isTauri) {
    const { writeBinaryFile, BaseDirectory } = (window as any).__TAURI__.fs;

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    await writeBinaryFile(
      {
        path: `data/images/uploads/${filename}`,
        contents: bytes,
      },
      { dir: BaseDirectory.App }
    );
  }

  // ------------------------------------------------------------
  // Mobile Upload (Capacitor Filesystem)
  // ------------------------------------------------------------
  if (isCapacitor) {
    const { Filesystem } = (window as any).Capacitor.Plugins;

    const base64 = await fileToBase64(file);

    await Filesystem.writeFile({
      path: `data/images/uploads/${filename}`,
      data: base64,
      directory: "DATA",
    });
  }

  // ------------------------------------------------------------
  // Extract metadata
  // ------------------------------------------------------------
  const metadata = await getImageMetadata(file);

  const asset: Asset = {
    id,
    url,
    filename,
    size: file.size,
    width: metadata.width,
    height: metadata.height,
    type: "image",
    createdAt: Date.now(),
  };

  // Save to assets.json
  const data = await loadAssetsJson();
  data.assets.push(asset);
  await saveAssetsJson(data);

  return asset;
}

// ------------------------------------------------------------
// 3. DELETE ASSET
// ------------------------------------------------------------

export async function deleteAsset(id: string): Promise<void> {
  const data = await loadAssetsJson();
  const asset = data.assets.find((a) => a.id === id);
  if (!asset) return;

  const filename = asset.filename;

  // Remove from assets.json
  data.assets = data.assets.filter((a) => a.id !== id);
  await saveAssetsJson(data);

  // ------------------------------------------------------------
  // Web delete
  // ------------------------------------------------------------
  if (!isTauri && !isCapacitor) {
    const cms = await getDraft();
    if (cms.uploads && cms.uploads[filename]) {
      delete cms.uploads[filename];
      await saveDraft(cms);
    }
  }

  // ------------------------------------------------------------
  // Desktop delete
  // ------------------------------------------------------------
  if (isTauri) {
    const { removeFile, BaseDirectory } = (window as any).__TAURI__.fs;
    await removeFile(
      `data/images/uploads/${filename}`,
      { dir: BaseDirectory.App }
    );
  }

  // ------------------------------------------------------------
  // Mobile delete
  // ------------------------------------------------------------
  if (isCapacitor) {
    const { Filesystem } = (window as any).Capacitor.Plugins;
    await Filesystem.deleteFile({
      path: `data/images/uploads/${filename}`,
      directory: "DATA",
    });
  }
}

// ------------------------------------------------------------
// 4. RENAME ASSET
// ------------------------------------------------------------

export async function renameAsset(id: string, newName: string): Promise<void> {
  const data = await loadAssetsJson();
  const asset = data.assets.find((a) => a.id === id);
  if (!asset) return;

  const oldName = asset.filename;
  const newFilename = newName;

  // Update metadata
  asset.filename = newFilename;
  asset.url = `/data/images/uploads/${newFilename}`;

  await saveAssetsJson(data);

  // ------------------------------------------------------------
  // Web rename
  // ------------------------------------------------------------
  if (!isTauri && !isCapacitor) {
    const cms = await getDraft();
    if (cms.uploads && cms.uploads[oldName]) {
      cms.uploads[newFilename] = cms.uploads[oldName];
      delete cms.uploads[oldName];
      await saveDraft(cms);
    }
  }

  // ------------------------------------------------------------
  // Desktop rename
  // ------------------------------------------------------------
  if (isTauri) {
    const { renameFile, BaseDirectory } = (window as any).__TAURI__.fs;
    await renameFile(
      `data/images/uploads/${oldName}`,
      `data/images/uploads/${newFilename}`,
      { dir: BaseDirectory.App }
    );
  }

  // ------------------------------------------------------------
  // Mobile rename
  // ------------------------------------------------------------
  if (isCapacitor) {
    const { Filesystem } = (window as any).Capacitor.Plugins;

    const file = await Filesystem.readFile({
      path: `data/images/uploads/${oldName}`,
      directory: "DATA",
    });

    await Filesystem.writeFile({
      path: `data/images/uploads/${newFilename}`,
      data: file.data,
      directory: "DATA",
    });

    await Filesystem.deleteFile({
      path: `data/images/uploads/${oldName}`,
      directory: "DATA",
    });
  }
}

// ------------------------------------------------------------
// 5. GET ASSET BY ID
// ------------------------------------------------------------

export async function getAssetById(id: string): Promise<Asset | null> {
  const data = await loadAssetsJson();
  return data.assets.find((a) => a.id === id) || null;
}

// ------------------------------------------------------------
// Utility: Convert File → Base64
// ------------------------------------------------------------

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(file);
  });
}

// ------------------------------------------------------------
// Utility: Extract image metadata
// ------------------------------------------------------------

function getImageMetadata(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () =>
      resolve({ width: img.width, height: img.height });
    img.src = URL.createObjectURL(file);
  });
}