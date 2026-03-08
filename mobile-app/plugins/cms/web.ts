import { CMSStorage } from "@valorwave/shared-backend/storage";
import { CMSSync } from "@valorwave/shared-backend/sync";
import { GitHubSync } from "@valorwave/shared-backend/github";
import { createStorageConfig, createGitHubConfig } from "@valorwave/shared-backend/config";

export class CMSWeb {
  private storage: CMSStorage;
  private sync: CMSSync;

  constructor() {
    const root = "/"; // dev mode
    const storageConfig = createStorageConfig(root);
    const githubConfig = createGitHubConfig({
      GITHUB_OWNER: import.meta.env.VITE_GITHUB_OWNER,
      GITHUB_REPO: import.meta.env.VITE_GITHUB_REPO,
      GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN
    });

    const github = new GitHubSync(githubConfig);
    this.storage = new CMSStorage(storageConfig);
    this.sync = new CMSSync(this.storage, github);
  }

  async getDraft() {
    return this.storage.getDraft();
  }

  async setDraft({ data }: any) {
    this.storage.setDraft(data);
    return { saved: true };
  }

  async publish() {
    this.storage.setPublish(this.storage.getDraft());
    return { published: true };
  }

  async syncPull() {
    await this.sync.pull();
    return { pulled: true };
  }

  async syncPush() {
    await this.sync.push();
    return { pushed: true };
  }
}