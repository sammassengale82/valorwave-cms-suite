import type { CMSData } from "../types";
import { CMSStorage } from "../storage";
import { CMSSync } from "../sync";

export class CMSApiRouter {
  private storage: CMSStorage;
  private sync: CMSSync;

  constructor(storage: CMSStorage, sync: CMSSync) {
    this.storage = storage;
    this.sync = sync;
  }

  // GET /draft.json
  getDraft(): CMSData {
    return this.storage.getDraft();
  }

  // PUT /draft.json
  setDraft(data: CMSData): void {
    this.storage.setDraft(data);
  }

  // GET /publish.json
  getPublish(): CMSData {
    return this.storage.getPublish();
  }

  // PUT /publish.json
  setPublish(data: CMSData): void {
    this.storage.setPublish(data);
  }

  // POST /publish
  publish(): void {
    const draft = this.storage.getDraft();
    this.storage.setPublish(draft);
  }

  // GET /site-theme.txt
  getSiteTheme(): string {
    return this.storage.getSiteTheme();
  }

  // PUT /site-theme.txt
  setSiteTheme(theme: string): void {
    this.storage.setSiteTheme(theme);
  }

  // GET /cms-theme.txt
  getCmsTheme(): string {
    return this.storage.getCmsTheme();
  }

  // PUT /cms-theme.txt
  setCmsTheme(theme: string): void {
    this.storage.setCmsTheme(theme);
  }

  // GET /preview.json
  getPreview(): { theme: string; data: CMSData } {
    const draft = this.storage.getDraft();
    const theme = this.storage.getSiteTheme();
    return { theme, data: draft };
  }

  // POST /reset-cms
  reset(): void {
    this.storage.reset();
  }

  // POST /sync/pull
  async syncPull(): Promise<void> {
    await this.sync.pull();
  }

  // POST /sync/push
  async syncPush(): Promise<void> {
    await this.sync.push();
  }
}
