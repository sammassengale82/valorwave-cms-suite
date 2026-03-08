import type { CMSData, VersionInfo } from "../types";
import { CMSStorage } from "../storage";
import { GitHubSync } from "../github";
import crypto from "crypto";

function hashPayload(draft: CMSData, publish: CMSData): string {
  const json = JSON.stringify({ draft, publish });
  return crypto.createHash("sha256").update(json).digest("hex");
}

export class CMSSync {
  private storage: CMSStorage;
  private github: GitHubSync;

  constructor(storage: CMSStorage, github: GitHubSync) {
    this.storage = storage;
    this.github = github;
  }

  async pull(): Promise<void> {
    const localVersion = this.storage.getVersion();
    const remote = await this.github.pullAll();

    // simple rule: if remote version is newer, accept it
    if (remote.version.version > localVersion.version) {
      this.storage.setDraft(remote.draft);
      this.storage.setPublish(remote.publish);
      this.storage.setVersion(remote.version);
    }
  }

  async push(): Promise<void> {
    const draft = this.storage.getDraft();
    const publish = this.storage.getPublish();
    const current = this.storage.getVersion();

    const nextVersion: VersionInfo = {
      version: current.version + 1,
      timestamp: Date.now(),
      hash: hashPayload(draft, publish)
    };

    await this.github.pushAll({
      draft,
      publish,
      version: nextVersion
    });

    this.storage.setVersion(nextVersion);
  }
}
