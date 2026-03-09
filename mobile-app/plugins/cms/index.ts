import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";

export const CMS = {
  // ------------------------------------------------------------
  // Existing CMS functions (draft, publish, sync)
  // ------------------------------------------------------------
  async readDraft() {
    try {
      const result = await Filesystem.readFile({
        path: "data/cms/draft.json",
        directory: Directory.Data,
      });
      return JSON.parse(result.data);
    } catch {
      return { sections: [], assets: { assets: [] }, uploads: {} };
    }
  },

  async writeDraft(data: any) {
    await Filesystem.writeFile({
      path: "data/cms/draft.json",
      data: JSON.stringify(data, null, 2),
      directory: Directory.Data,
    });
  },

  async readPublish() {
    try {
      const result = await Filesystem.readFile({
        path: "data/cms/publish.json",
        directory: Directory.Data,
      });
      return JSON.parse(result.data);
    } catch {
      return { sections: [], assets: { assets: [] }, uploads: {} };
    }
  },

  async writePublish(data: any) {
    await Filesystem.writeFile({
      path: "data/cms/publish.json",
      data: JSON.stringify(data, null, 2),
      directory: Directory.Data,
    });
  },

  // ------------------------------------------------------------
  // NEW: Asset File Operations
  // ------------------------------------------------------------

  async listFiles(): Promise<{ filename: string; size: number }[]> {
    try {
      const dir = await Filesystem.readdir({
        path: "data/images/uploads",
        directory: Directory.Data,
      });

      const entries: { filename: string; size: number }[] = [];

      for (const file of dir.files) {
        const stat = await Filesystem.stat({
          path: `data/images/uploads/${file.name}`,
          directory: Directory.Data,
        });

        entries.push({
          filename: file.name,
          size: stat.size ?? 0,
        });
      }

      return entries;
    } catch {
      return [];
    }
  },

  async uploadFile(filename: string, base64: string): Promise<void> {
    await Filesystem.writeFile({
      path: `data/images/uploads/${filename}`,
      data: base64,
      directory: Directory.Data,
    });
  },

  async deleteFile(filename: string): Promise<void> {
    try {
      await Filesystem.deleteFile({
        path: `data/images/uploads/${filename}`,
        directory: Directory.Data,
      });
    } catch {
      // ignore if file doesn't exist
    }
  },

  async renameFile(oldName: string, newName: string): Promise<void> {
    try {
      const file = await Filesystem.readFile({
        path: `data/images/uploads/${oldName}`,
        directory: Directory.Data,
      });

      await Filesystem.writeFile({
        path: `data/images/uploads/${newName}`,
        data: file.data,
        directory: Directory.Data,
      });

      await Filesystem.deleteFile({
        path: `data/images/uploads/${oldName}`,
        directory: Directory.Data,
      });
    } catch {
      // ignore if missing
    }
  },
};