import { CMSDatabase } from "../db";
import { DEFAULT_DRAFT, DEFAULT_VERSION } from "../defaults";
import type { CMSData, StorageConfig, VersionInfo } from "../types";

const KEY_DRAFT = "draft";
const KEY_PUBLISH = "publish";
const KEY_SITE_THEME = "site_theme";
const KEY_CMS_THEME = "cms_theme";
const KEY_VERSION = "version_info";

export class CMSStorage {
  private db: CMSDatabase;
  private dataDir: string;

  constructor(config: StorageConfig) {
    this.db = new CMSDatabase(config);
    this.dataDir = config.dataDir;
  }

  getDraft(): CMSData {
    const raw = this.db.get(KEY_DRAFT);
    if (!raw) return DEFAULT_DRAFT;
    try {
      return JSON.parse(raw) as CMSData;
    } catch {
      return DEFAULT_DRAFT;
    }
  }

  setDraft(data: CMSData): void {
    this.db.set(KEY_DRAFT, JSON.stringify(data));
  }

  getPublish(): CMSData {
    const raw = this.db.get(KEY_PUBLISH);
    if (!raw) return DEFAULT_DRAFT;
    try {
      return JSON.parse(raw) as CMSData;
    } catch {
      return DEFAULT_DRAFT;
    }
  }

  setPublish(data: CMSData): void {
    this.db.set(KEY_PUBLISH, JSON.stringify(data));
  }

  getSiteTheme(): string {
    return this.db.get(KEY_SITE_THEME) ?? "original";
  }

  setSiteTheme(theme: string): void {
    this.db.set(KEY_SITE_THEME, theme);
  }

  getCmsTheme(): string {
    return this.db.get(KEY_CMS_THEME) ?? "original";
  }

  setCmsTheme(theme: string): void {
    this.db.set(KEY_CMS_THEME, theme);
  }

  getVersion(): VersionInfo {
    const raw = this.db.get(KEY_VERSION);
    if (!raw) return DEFAULT_VERSION;
    try {
      return JSON.parse(raw) as VersionInfo;
    } catch {
      return DEFAULT_VERSION;
    }
  }

  setVersion(info: VersionInfo): void {
    this.db.set(KEY_VERSION, JSON.stringify(info));
  }

  reset(): void {
    this.db.deleteAll();
    this.setDraft(DEFAULT_DRAFT);
    this.setPublish(DEFAULT_DRAFT);
    this.setSiteTheme("original");
    this.setCmsTheme("original");
    this.setVersion(DEFAULT_VERSION);
  }

  // placeholder for image handling; desktop/mobile will implement filesystem specifics
  async saveImage(filename: string, bytes: Uint8Array): Promise<string> {
    // Implementation will be platform-specific (Tauri/Capacitor)
    // For now, just return a logical path
    return `/images/uploads/${filename}`;
  }
}
