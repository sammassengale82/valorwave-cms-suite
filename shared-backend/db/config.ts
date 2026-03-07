import type { StorageConfig, GitHubConfig } from "./types";

export function createStorageConfig(rootDir: string): StorageConfig {
  return {
    dataDir: `${rootDir}/data`,
    dbPath: `${rootDir}/data/cms.db`
  };
}

export function createGitHubConfig(env: {
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  GITHUB_BRANCH?: string;
  GITHUB_TOKEN: string;
}): GitHubConfig {
  return {
    owner: env.GITHUB_OWNER,
    repo: env.GITHUB_REPO,
    branch: env.GITHUB_BRANCH || "main",
    token: env.GITHUB_TOKEN,
    dataDirInRepo: "data"
  };
}
