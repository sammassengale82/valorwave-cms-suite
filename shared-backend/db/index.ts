import Database from "better-sqlite3";
import type { StorageConfig } from "../types";

export class CMSDatabase {
  private db: Database.Database;

  constructor(config: StorageConfig) {
    this.db = new Database(config.dbPath);
    this.init();
  }

  private init() {
    this.db
      .prepare(
        `
        CREATE TABLE IF NOT EXISTS cms (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        );
      `
      )
      .run();
  }

  get(key: string): string | null {
    const row = this.db
      .prepare("SELECT value FROM cms WHERE key = ?")
      .get(key) as { value: string } | undefined;
    return row?.value ?? null;
  }

  set(key: string, value: string): void {
    this.db
      .prepare(
        `
        INSERT INTO cms (key, value)
        VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value;
      `
      )
      .run(key, value);
  }

  deleteAll(): void {
    this.db.prepare("DELETE FROM cms;").run();
  }
}
