export type CMSTheme = "original" | "patriotic" | "multicam" | "dark";

export interface CMSData {
  site_theme: CMSTheme | string;
  [key: string]: string;
}

export interface VersionInfo {
  version: number;
  timestamp: number;
  hash: string;
}

export interface StorageConfig {
  dataDir: string;      // path to /data
  dbPath: string;       // path to SQLite file
}

export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
  dataDirInRepo: string; // e.g. "data"
}
