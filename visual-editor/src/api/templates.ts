// templates.ts
// Unified Template API for Web, Desktop, and Mobile
// Folder-per-template architecture:
// data/templates/<id>/template.json
// data/templates/<id>/preview.jpg (optional)

import { getDraft, saveDraft } from "./api";
import type { TemplateData } from "../types/TemplateTypes";

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

  // Web fallback (stored in CMS draft)
  const cms = await getDraft();
  cms.templates = cms.templates || {};
  return cms.templates[path] || null;
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
  cms.templates = cms.templates || {};
  cms.templates[path] = data;
  await saveDraft(cms);
}

async function deleteFile(path: string): Promise<void> {
  if (isTauri) {
    const { removeFile, BaseDirectory } = (window as any).__TAURI__.fs;
    await removeFile(path, { dir: BaseDirectory.App });
    return;
  }

  if (isCapacitor) {
    const { Filesystem } = (window as any).Capacitor.Plugins;
    await Filesystem.deleteFile({
      path,
      directory: "DATA",
    });
    return;
  }

  // Web fallback
  const cms = await getDraft();
  if (cms.templates && cms.templates[path]) {
    delete cms.templates[path];
    await saveDraft(cms);
  }
}

async function ensureDir(path: string): Promise<void> {
  if (isTauri) {
    const { createDir, BaseDirectory } = (window as any).__TAURI__.fs;
    await createDir(path, { dir: BaseDirectory.App, recursive: true });
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
// 1. LIST TEMPLATES
// ------------------------------------------------------------

export async function listTemplates(): Promise<TemplateData[]> {
  const cms = await getDraft();
  cms.templateIndex = cms.templateIndex || [];

  return cms.templateIndex;
}

// ------------------------------------------------------------
// 2. SAVE TEMPLATE
// ------------------------------------------------------------

export async function saveTemplate(
  name: string,
  category: string,
  node: any,
  previewBase64?: string
): Promise<TemplateData> {
  const id = generateId();
  const folder = `data/templates/${id}`;

  await ensureDir(folder);

  const template: TemplateData = {
    id,
    name,
    category,
    previewImage: previewBase64 ? "preview.jpg" : undefined,
    node,
    createdAt: Date.now(),
  };

  // Write template.json
  await writeJson(`${folder}/template.json`, template);

  // Write preview image if provided
  if (previewBase64) {
    if (isTauri) {
      const { writeBinaryFile, BaseDirectory } = (window as any).__TAURI__.fs;
      const bytes = Uint8Array.from(atob(previewBase64), (c) =>
        c.charCodeAt(0)
      );
      await writeBinaryFile(
        { path: `${folder}/preview.jpg`, contents: bytes },
        { dir: BaseDirectory.App }
      );
    } else if (isCapacitor) {
      const { Filesystem } = (window as any).Capacitor.Plugins;
      await Filesystem.writeFile({
        path: `${folder}/preview.jpg`,
        data: previewBase64,
        directory: "DATA",
      });
    } else {
      // Web fallback
      const cms = await getDraft();
      cms.templates = cms.templates || {};
      cms.templates[`${folder}/preview.jpg`] = previewBase64;
      await saveDraft(cms);
    }
  }

  // Update template index
  const cms = await getDraft();
  cms.templateIndex = cms.templateIndex || [];
  cms.templateIndex.push(template);
  await saveDraft(cms);

  return template;
}

// ------------------------------------------------------------
// 3. DELETE TEMPLATE
// ------------------------------------------------------------

export async function deleteTemplate(id: string): Promise<void> {
  const folder = `data/templates/${id}`;

  // Delete template.json
  await deleteFile(`${folder}/template.json`);

  // Delete preview if exists
  await deleteFile(`${folder}/preview.jpg`);

  // Update index
  const cms = await getDraft();
  cms.templateIndex = (cms.templateIndex || []).filter((t: any) => t.id !== id);
  await saveDraft(cms);
}

// ------------------------------------------------------------
// 4. RENAME TEMPLATE
// ------------------------------------------------------------

export async function renameTemplate(id: string, newName: string): Promise<void> {
  const folder = `data/templates/${id}`;
  const template = await readJson(`${folder}/template.json`);
  if (!template) return;

  template.name = newName;

  await writeJson(`${folder}/template.json`, template);

  // Update index
  const cms = await getDraft();
  cms.templateIndex = cms.templateIndex.map((t: any) =>
    t.id === id ? { ...t, name: newName } : t
  );
  await saveDraft(cms);
}

// ------------------------------------------------------------
// 5. LOAD TEMPLATE NODE
// ------------------------------------------------------------

export async function loadTemplateNode(id: string): Promise<any> {
  const folder = `data/templates/${id}`;
  const template = await readJson(`${folder}/template.json`);
  return template?.node || null;
}