import { loadValue, saveValue } from "../storage/sqlite";

export async function getMobileDraft() {
  const data = await loadValue("draft");
  return data || {};
}

export async function saveMobileDraft(json: any) {
  await saveValue("draft", json);
}