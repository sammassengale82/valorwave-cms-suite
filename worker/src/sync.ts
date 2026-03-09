import { Octokit } from "@octokit/rest";
import fs from "fs";
import path from "path";

const REPO_OWNER = process.env.GITHUB_OWNER!;
const REPO_NAME = process.env.GITHUB_REPO!;
const BRANCH = "main";

export class GitHubSync {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  // ------------------------------------------------------------
  // Helper: Read file from repo
  // ------------------------------------------------------------
  async getFile(path: string) {
    try {
      const res = await this.octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path,
        ref: BRANCH,
      });

      if ("content" in res.data) {
        return Buffer.from(res.data.content, "base64").toString("utf8");
      }
    } catch {
      return null;
    }
  }

  // ------------------------------------------------------------
  // Helper: Write file to repo
  // ------------------------------------------------------------
  async writeFile(repoPath: string, localPath: string) {
    const content = fs.readFileSync(localPath);
    const base64 = content.toString("base64");

    let sha: string | undefined = undefined;

    try {
      const existing = await this.octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: repoPath,
        ref: BRANCH,
      });

      if ("sha" in existing.data) {
        sha = existing.data.sha;
      }
    } catch {
      // file does not exist
    }

    await this.octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: repoPath,
      message: `Sync ${repoPath}`,
      content: base64,
      sha,
      branch: BRANCH,
    });
  }

  // ------------------------------------------------------------
  // Helper: Delete file from repo
  // ------------------------------------------------------------
  async deleteFile(repoPath: string) {
    try {
      const existing = await this.octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: repoPath,
        ref: BRANCH,
      });

      if ("sha" in existing.data) {
        await this.octokit.repos.deleteFile({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: repoPath,
          message: `Delete ${repoPath}`,
          sha: existing.data.sha,
          branch: BRANCH,
        });
      }
    } catch {
      // ignore if missing
    }
  }

  // ------------------------------------------------------------
  // MAIN SYNC FUNCTION
  // ------------------------------------------------------------
  async syncAll(localRoot: string) {
    // 1. Sync assets.json
    const assetsJson = path.join(localRoot, "data/assets.json");
    if (fs.existsSync(assetsJson)) {
      await this.writeFile("data/assets.json", assetsJson);
    }

    // 2. Sync uploaded images
    const uploadsDir = path.join(localRoot, "data/images/uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const localFiles = fs.readdirSync(uploadsDir);
    const repoFiles = await this.listRepoFiles("data/images/uploads");

    // Upload new or changed files
    for (const file of localFiles) {
      const localPath = path.join(uploadsDir, file);
      await this.writeFile(`data/images/uploads/${file}`, localPath);
    }

    // Delete removed files
    for (const file of repoFiles) {
      if (!localFiles.includes(file)) {
        await this.deleteFile(`data/images/uploads/${file}`);
      }
    }
  }

  // ------------------------------------------------------------
  // List files in repo directory
  // ------------------------------------------------------------
  async listRepoFiles(dir: string): Promise<string[]> {
    try {
      const res = await this.octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: dir,
        ref: BRANCH,
      });

      if (Array.isArray(res.data)) {
        return res.data.map((f) => f.name);
      }
    } catch {
      return [];
    }

    return [];
  }
}