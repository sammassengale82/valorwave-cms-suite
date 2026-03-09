import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";

export const CMS = {
  // ------------------------------------------------------------
  // Existing CMS functions
  // ------------------------------------------------------------
  async readDraft() {
    try {
      const result = await Filesystem.readFile({
        path: "data/cms/draft.json",
        directory: Directory.Data,
      });
      return JSON.parse(result.data);
    } catch {
      return {
        sections: [],
        assets: { assets: [] },
        uploads: {},
        templateIndex: [],
        variantIndex: []
      };
    }
  },

  async writeDraft(data: any) {
    await Filesystem.writeFile({
      path: "data/cms/draft.json",
      data: JSON.stringify(data, null, 2),
      directory: Directory.Data,
    });
  },

  // ------------------------------------------------------------
  // TEMPLATE FOLDER OPERATIONS
  // ------------------------------------------------------------
  async listTemplateFolders(): Promise<string[]> {
    try {
      const dir = await Filesystem.readdir({
        path: "data/templates",
        directory: Directory.Data,
      });

      return dir.files.map((f) => f.name);
    } catch {
      return [];
    }
  },

  async writeTemplateFile(path: string, base64: string): Promise<void> {
    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Data,
      recursive: true,
    });
  },

  async deleteTemplateFolder(id: string): Promise<void> {
    try {
      await Filesystem.rmdir({
        path: `data/templates/${id}`,
        directory: Directory.Data,
        recursive: true,
      });
    } catch {}
  },

  // ------------------------------------------------------------
  // NEW: VARIANT FOLDER OPERATIONS
  // ------------------------------------------------------------
  async listVariantFolders(): Promise<string[]> {
    try {
      const dir = await Filesystem.readdir({
        path: "data/variants",
        directory: Directory.Data,
      });

      return dir.files.map((f) => f.name);
    } catch {
      return [];
    }
  },

  async writeVariantFile(path: string, base64: string): Promise<void> {
    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Data,
      recursive: true,
    });
  },

  async deleteVariantFolder(id: string): Promise<void> {
    try {
      await Filesystem.rmdir({
        path: `data/variants/${id}`,
        directory: Directory.Data,
        recursive: true,
      });
    } catch {}
  },
};