import type { CMSData, GitHubConfig, VersionInfo } from "../types";

export class GitHubSync {
  private config: GitHubConfig;

  constructor(config: GitHubConfig) {
    this.config = config;
  }

  private api(path: string, init?: RequestInit) {
    return fetch(`https://api.github.com${path}`, {
      ...init,
      headers: {
        "Authorization": `Bearer ${this.config.token}`,
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
        ...(init?.headers || {})
      }
    });
  }

  private async getFile(path: string): Promise<string | null> {
    const res = await this.api(
      `/repos/${this.config.owner}/${this.config.repo}/contents/${path}?ref=${this.config.branch}`
    );

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub GET failed: ${res.status}`);

    const json = await res.json();
    return Buffer.from(json.content, "base64").toString("utf8");
  }

  private async putFile(path: string, content: string, message: string) {
    const existing = await this.api(
      `/repos/${this.config.owner}/${this.config.repo}/contents/${path}?ref=${this.config.branch}`
    );

    let sha: string | undefined = undefined;

    if (existing.ok) {
      const json = await existing.json();
      sha = json.sha;
    }

    const body = {
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch: this.config.branch,
      ...(sha ? { sha } : {})
    };

    const res = await this.api(
      `/repos/${this.config.owner}/${this.config.repo}/contents/${path}`,
      {
        method: "PUT",
        body: JSON.stringify(body)
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub PUT failed: ${text}`);
    }
  }

  async pullAll(): Promise<{
    draft: CMSData;
    publish: CMSData;
    version: VersionInfo;
  }> {
    const base = this.config.dataDirInRepo;

    const draftRaw = await this.getFile(`${base}/draft.json`);
    const publishRaw = await this.getFile(`${base}/publish.json`);
    const versionRaw = await this.getFile(`${base}/version.json`);

    if (!draftRaw || !publishRaw || !versionRaw) {
      throw new Error("Missing required CMS files in GitHub");
    }

    return {
      draft: JSON.parse(draftRaw),
      publish: JSON.parse(publishRaw),
      version: JSON.parse(versionRaw)
    };
  }

  async pushAll(payload: {
    draft: CMSData;
    publish: CMSData;
    version: VersionInfo;
  }): Promise<void> {
    const base = this.config.dataDirInRepo;

    await this.putFile(
      `${base}/draft.json`,
      JSON.stringify(payload.draft, null, 2),
      "Update draft.json"
    );

    await this.putFile(
      `${base}/publish.json`,
      JSON.stringify(payload.publish, null, 2),
      "Update publish.json"
    );

    await this.putFile(
      `${base}/version.json`,
      JSON.stringify(payload.version, null, 2),
      "Update version.json"
    );
  }

  async uploadImage(filename: string, bytes: Uint8Array): Promise<string> {
    const base = this.config.dataDirInRepo;
    const path = `${base}/images/uploads/${filename}`;

    const content = Buffer.from(bytes).toString("base64");

    const existing = await this.api(
      `/repos/${this.config.owner}/${this.config.repo}/contents/${path}?ref=${this.config.branch}`
    );

    let sha: string | undefined = undefined;

    if (existing.ok) {
      const json = await existing.json();
      sha = json.sha;
    }

    const body = {
      message: `Upload image ${filename}`,
      content,
      branch: this.config.branch,
      ...(sha ? { sha } : {})
    };

    const res = await this.api(
      `/repos/${this.config.owner}/${this.config.repo}/contents/${path}`,
      {
        method: "PUT",
        body: JSON.stringify(body)
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub image upload failed: ${text}`);
    }

    return `https://raw.githubusercontent.com/${this.config.owner}/${this.config.repo}/${this.config.branch}/${path}`;
  }
}
