import { MobileBridge } from "../../../mobile/MobileBridge";

const isMobile = typeof navigator !== "undefined" && navigator.product === "ReactNative";

export async function getDraft() {
  if (isMobile) return MobileBridge.getDraft();
  return fetch("/draft.json").then((r) => r.json());
}

export async function saveDraft(json: any) {
  if (isMobile) return MobileBridge.saveDraft(json);

  return fetch("/api/save-draft", {
    method: "POST",
    body: JSON.stringify(json)
  });
}

export async function getPublish() {
  if (isMobile) return MobileBridge.getPublish();
  return fetch("/publish.json").then((r) => r.json());
}

export async function savePublish(json: any) {
  if (isMobile) return MobileBridge.savePublish(json);

  return fetch("/api/save-publish", {
    method: "POST",
    body: JSON.stringify(json)
  });
}

export async function syncGitHub() {
  if (isMobile) return MobileBridge.sync();
  return fetch("/api/sync-github");
}