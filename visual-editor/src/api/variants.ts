// variants.ts
// Unified Variant API for Web, Desktop, and Mobile
// Folder-per-variant architecture:
// data/variants/<id>/variant.json
// data/variants/<id>/preview.jpg (optional)

import { getDraft, saveDraft } from "./api";
import type { BlockVariant } from "../types/VariantTypes";

const isTauri = typeof (window as any).__TAURI__ !== "undefined";
const isCapacitor = typeof (window as any).Capacitor !== "undefined";

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

function generateId() {
  return crypto.randomUUID();
}

async function readJson(path: string): Promise<any> {
  if (isTauri) {
    const { readTextFile, BaseDirectory } = (window as any).__TAURI__.fs;
    return JSON.parse(
      await readTextFile(path, { dir: BaseDirectory.App })
    );
  }

  if (isCapacitor) {
    const { Filesystem } = (window as any).Capacitor.Plugins;
    const res = await Filesystem.readFile({
      path,
      directory: "DATA",
    });
    return JSON.parse(res.data);
  }

  // Web fallback
  const cms = await getDraft();
  cms.variants = cms.variants || {};
  return cms.variants[path] || null;
}

async function writeJson(path: string, data: any): Promise<void> {
  const json = JSON.stringify(data, null, 2);

  if (isTauri) {
    const { writeTextFile, BaseDirectory } = (window as any).__TAURI__.fs;
    await writeTextFile(
      { path, contents: json },
      { dir: BaseDirectory.App }
    );
    return;
  }

  if (isCapacitor) {
    const { Filesystem } = (window as any).Capacitor.Plugins;
    await Filesystem.writeFile({
      path,
      data: json,
      directory: "DATA",
    });
    return;
  }

  // Web fallback
  const cms = await getDraft();
  cms.variants = cms.variants || {};
  cms.variants[path] = data;
  await saveDraft(cms);
}

async function writeBinary(path: string, base64: string): Promise<void> {
  if (isTauri) {
    const { writeBinaryFile, BaseDirectory } = (window as any).__TAURI__.fs;
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    await writeBinaryFile(
      { path, contents: bytes },
      { dir: BaseDirectory.App }
    );
    return;
  }

  if (isCapacitor) {
    const { Filesystem } = (window as any).Capacitor.Plugins;
    await Filesystem.writeFile({
      path,
      data: base64,
      directory: "DATA",
    });
    return;
  }

  // Web fallback
  const cms = await getDraft();
  cms.variants = cms.variants || {};
  cms.variants[path] = base64;
  await saveDraft(cms);
}

async function deleteFile(path: string): Promise<void> {
  if (isTauri) {
    const { removeFile, BaseDirectory } = (window as any).__TAURI__.fs;
    await removeFile(path, { dir: BaseDirectory.App }).catch(() => {});
    return;
  }

  if (isCapacitor) {
    const { Filesystem } = (window as any).Capacitor.Plugins;
    await Filesystem.deleteFile({
      path,
      directory: "DATA",
    }).catch(() => {});
    return;
  }

  // Web fallback
  const cms = await getDraft();
  if (cms.variants && cms.variants[path]) {
    delete cms.variants[path];
    await saveDraft(cms);
  }
}

async function ensureDir(path: string): Promise<void> {
  if (isTauri) {
    const { createDir, BaseDirectory } = (window as any).__TAURI__.fs;
    await createDir(path, { dir: BaseDirectory.App, recursive: true }).catch(
      () => {}
    );
    return;
  }

  if (isCapacitor) {
    const { Filesystem } = (window as any).Capacitor.Plugins;
    await Filesystem.mkdir({
      path,
      directory: "DATA",
      recursive: true,
    }).catch(() => {});
    return;
  }

  // Web fallback: no-op
}

// ------------------------------------------------------------
// 1. LIST VARIANTS FOR A COMPONENT
// ------------------------------------------------------------

export async function listVariants(component: string): Promise<BlockVariant[]> {
  const cms = await getDraft();
  cms.variantIndex = cms.variantIndex || [];

  return cms.variantIndex.filter((v: BlockVariant) => v.component === component);
}

// ------------------------------------------------------------
// 2. SAVE VARIANT
// ------------------------------------------------------------

export async function saveVariant(
  name: string,
  category: string,
  component: string,
  styles: any,
  content: any,
  previewBase64?: string
): Promise<BlockVariant> {
  const id = generateId();
  const folder = `data/variants/${id}`;

  await ensureDir(folder);

  const variant: BlockVariant = {
    id,
    name,
    category,
    component,
    previewImage: previewBase64 ? "preview.jpg" : undefined,
    styles,
    content,
    createdAt: Date.now(),
  };

  // Write variant.json
  await writeJson(`${folder}/variant.json`, variant);

  // Write preview image
  if (previewBase64) {
    await writeBinary(`${folder}/preview.jpg`, previewBase64);
  }

  // Update index
  const cms = await getDraft();
  cms.variantIndex = cms.variantIndex || [];
  cms.variantIndex.push(variant);
  await saveDraft(cms);

  return variant;
}

// ------------------------------------------------------------
// 3. DELETE VARIANT
// ------------------------------------------------------------

export async function deleteVariant(id: string): Promise<void> {
  const folder = `data/variants/${id}`;

  await deleteFile(`${folder}/variant.json`);
  await deleteFile(`${folder}/preview.jpg`);

  const cms = await getDraft();
  cms.variantIndex = (cms.variantIndex || []).filter((v: any) => v.id !== id);
  await saveDraft(cms);
}

// ------------------------------------------------------------
// 4. RENAME VARIANT
// ------------------------------------------------------------

export async function renameVariant(id: string, newName: string): Promise<void> {
  const folder = `data/variants/${id}`;
  const variant = await readJson(`${folder}/variant.json`);
  if (!variant) return;

  variant.name = newName;

  await writeJson(`${folder}/variant.json`, variant);

  const cms = await getDraft();
  cms.variantIndex = cms.variantIndex.map((v: any) =>
    v.id === id ? { ...v, name: newName } : v
  );
  await saveDraft(cms);
}

// ------------------------------------------------------------
// 5. LOAD VARIANT (for applying)
// ------------------------------------------------------------

export async function loadVariant(id: string): Promise<BlockVariant | null> {
  const folder = `data/variants/${id}`;
  return await readJson(`${folder}/variant.json`);
}