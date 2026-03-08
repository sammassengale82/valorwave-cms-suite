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

  getDraft(): CMSData {
    return this.storage.getDraft();
  }

  setDraft(data: CMSData): { saved: boolean } {
    this.storage.setDraft(data);
    return { saved: true };
  }

  getPublish(): CMSData {
    return this.storage.getPublish();
  }

  setPublish(data: CMSData): { saved: boolean } {
    this.storage.setPublish(data);
    return { saved: true };
  }

  publish(): { published: boolean } {
    const draft = this.storage.getDraft();
    this.storage.setPublish(draft);
    return { published: true };
  }

  getSiteTheme(): string {
    return this.storage.getSiteTheme();
  }

  setSiteTheme(theme: string): { saved: boolean } {
    this.storage.setSiteTheme(theme);
    return { saved: true };
  }

  getCmsTheme(): string {
    return this.storage.getCmsTheme();
  }

  setCmsTheme(theme: string): { saved: boolean } {
    this.storage.setCmsTheme(theme);
    return { saved: true };
  }

  getPreview(): { theme: string; data: CMSData } {
    const draft = this.storage.getDraft();
    const theme = this.storage.getSiteTheme();
    return { theme, data: draft };
  }

  reset(): { reset: boolean } {
    this.storage.reset();
    return { reset: true };
  }

  async syncPull(): Promise<{ pulled: boolean }> {
    await this.sync.pull();
    return { pulled: true };
  }

  async syncPush(): Promise<{ pushed: boolean }> {
    await this.sync.push();
    return { pushed: true };
  }

  async uploadImage(filename: string, bytes: Uint8Array): Promise<{ url: string }> {
    const url = await this.storage.saveImage(filename, bytes);
    return { url };
  }
}
