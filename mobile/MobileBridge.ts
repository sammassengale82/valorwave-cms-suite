import { getMobileDraft, saveMobileDraft } from "./cms/mobile-draft";
import { getMobilePublish, saveMobilePublish } from "./cms/mobile-publish";
import { syncWithGitHub } from "./sync/github-sync";

export const MobileBridge = {
  getDraft: getMobileDraft,
  saveDraft: saveMobileDraft,
  getPublish: getMobilePublish,
  savePublish: saveMobilePublish,
  sync: syncWithGitHub
};