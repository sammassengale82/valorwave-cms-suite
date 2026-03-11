import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("valorwave.db");

export function initSQLite() {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cms (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL
      );`
    );
  });
}

export function saveValue(key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `REPLACE INTO cms (key, value) VALUES (?, ?);`,
        [key, JSON.stringify(value)],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
}

export function loadValue(key: string): Promise<any | null> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT value FROM cms WHERE key = ?;`,
        [key],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(JSON.parse(rows.item(0).value));
          } else {
            resolve(null);
          }
        },
        (_, err) => reject(err)
      );
    });
  });
}