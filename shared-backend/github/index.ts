import type { CMSData, GitHubConfig, VersionInfo } from "../types";

export class GitHubSync {
  private config: GitHubConfig;

  constructor(config: GitHubConfig) {
    this.config = config;
  }

  async pullAll(): Promise<{
    draft: CMSData;
    publish: CMSData;
    version: VersionInfo;
  }> {
    // TODO: implement real GitHub API calls
    // This will:
    // - fetch data/draft.json
    // - fetch data/publish.json
    // - fetch data/version.json
    // - parse and return
    throw new Error("pullAll not implemented yet");
  }

  async pushAll(payload: {
    draft: CMSData;
    publish: CMSData;
    version: VersionInfo;
  }): Promise<void> {
    // TODO: implement real GitHub API calls
    // This will:
    // - commit draft.json, publish.json, version.json
    // - optionally commit images
    throw new Error("pushAll not implemented yet");
  }
}
