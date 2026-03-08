import { loadValue, saveValue } from "../storage/sqlite";

export async function getMobilePublish() {
  const data = await loadValue("publish");
  return data || {};
}

export async function saveMobilePublish(json: any) {
  await saveValue("publish", json);
}