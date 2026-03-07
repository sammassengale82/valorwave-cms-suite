import type { CMSData, VersionInfo } from "../types";
import { CMSStorage } from "../storage";
import { GitHubSync } from "../github";

export class CMSSync {
  private storage: CMSStorage;
  private github: GitHubSync;

  constructor(storage: CMSStorage, github: GitHubSync) {
    this.storage = storage;
    this.github = github;
  }

  async pull(): Promise<void> {
    const remote = await this.github.pullAll();
    this.storage.setDraft(remote.draft);
    this.storage.setPublish(remote.publish);
    this.storage.setVersion(remote.version);
  }

  async push(): Promise<void> {
    const draft = this.storage.getDraft();
    const publish = this.storage.getPublish();
    const version = this.storage.getVersion();

    const nextVersion: VersionInfo = {
      version: version.version + 1,
      timestamp: Date.now(),
      hash: "" // TODO: compute hash of draft/publish
    };

    await this.github.pushAll({
      draft,
      publish,
      version: nextVersion
    });

    this.storage.setVersion(nextVersion);
  }
}
