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

  // ------------------------------------------------------------
  // MAIN SYNC FUNCTION
  // ------------------------------------------------------------
  async syncAll(localRoot: string) {
    // ------------------------------------------------------------
    // 1. Sync assets.json
    // ------------------------------------------------------------
    const assetsJson = path.join(localRoot, "data/assets.json");
    if (fs.existsSync(assetsJson)) {
      await this.writeFile("data/assets.json", assetsJson);
    }

    // ------------------------------------------------------------
    // 2. Sync uploaded images
    // ------------------------------------------------------------
    const uploadsDir = path.join(localRoot, "data/images/uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const localUploads = fs.readdirSync(uploadsDir);
    const repoUploads = await this.listRepoFiles("data/images/uploads");

    // Upload new or changed files
    for (const file of localUploads) {
      const localPath = path.join(uploadsDir, file);
      await this.writeFile(`data/images/uploads/${file}`, localPath);
    }

    // Delete removed files
    for (const file of repoUploads) {
      if (!localUploads.includes(file)) {
        await this.deleteFile(`data/images/uploads/${file}`);
      }
    }

    // ------------------------------------------------------------
    // 3. Sync templates
    // ------------------------------------------------------------
    const templatesDir = path.join(localRoot, "data/templates");

    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir, { recursive: true });
    }

    const localTemplateFolders = fs
      .readdirSync(templatesDir)
      .filter((f) => fs.statSync(path.join(templatesDir, f)).isDirectory());

    const repoTemplateFolders = await this.listRepoFiles("data/templates");

    // Upload or update template folders
    for (const folder of localTemplateFolders) {
      const folderPath = path.join(templatesDir, folder);

      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        const localPath = path.join(folderPath, file);
        const repoPath = `data/templates/${folder}/${file}`;
        await this.writeFile(repoPath, localPath);
      }
    }

    // Delete removed template folders
    for (const folder of repoTemplateFolders) {
      if (!localTemplateFolders.includes(folder)) {
        await this.deleteFile(`data/templates/${folder}/template.json`);
        await this.deleteFile(`data/templates/${folder}/preview.jpg`);
      }
    }

    // ------------------------------------------------------------
    // 4. NEW — Sync variants
    // ------------------------------------------------------------
    const variantsDir = path.join(localRoot, "data/variants");

    if (!fs.existsSync(variantsDir)) {
      fs.mkdirSync(variantsDir, { recursive: true });
    }

    const localVariantFolders = fs
      .readdirSync(variantsDir)
      .filter((f) => fs.statSync(path.join(variantsDir, f)).isDirectory());

    const repoVariantFolders = await this.listRepoFiles("data/variants");

    // Upload or update variant folders
    for (const folder of localVariantFolders) {
      const folderPath = path.join(variantsDir, folder);

      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        const localPath = path.join(folderPath, file);
        const repoPath = `data/variants/${folder}/${file}`;
        await this.writeFile(repoPath, localPath);
      }
    }

    // Delete removed variant folders
    for (const folder of repoVariantFolders) {
      if (!localVariantFolders.includes(folder)) {
        await this.deleteFile(`data/variants/${folder}/variant.json`);
        await this.deleteFile(`data/variants/${folder}/preview.jpg`);
      }
    }
  }
}