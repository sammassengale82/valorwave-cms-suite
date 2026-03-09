import { CMS } from "../plugins/cms";

export async function getDraft() {
  return CMS.getDraft();
}

export async function saveDraft(data: any) {
  return CMS.setDraft({ data });
}

export async function publish() {
  return CMS.publish();
}

export async function syncPull() {
  return CMS.syncPull();
}

export async function syncPush() {
  return CMS.syncPush();
}
