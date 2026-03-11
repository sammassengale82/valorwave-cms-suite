import { getMobileDraft, saveMobileDraft } from "../cms/mobile-draft";
import { getMobilePublish, saveMobilePublish } from "../cms/mobile-publish";

export async function syncWithGitHub() {
  const draft = await getMobileDraft();
  const publish = await getMobilePublish();

  // Pull latest from GitHub
  const remoteDraft = await fetch(
    "https://raw.githubusercontent.com/valorwave/site/main/draft.json"
  ).then((r) => r.json());

  const remotePublish = await fetch(
    "https://raw.githubusercontent.com/valorwave/site/main/publish.json"
  ).then((r) => r.json());

  // Merge strategy: local wins
  const mergedDraft = { ...remoteDraft, ...draft };
  const mergedPublish = { ...remotePublish, ...publish };

  // Save merged locally
  await saveMobileDraft(mergedDraft);
  await saveMobilePublish(mergedPublish);

  // Push back to GitHub
  await fetch("https://api.github.com/repos/valorwave/site/contents/draft.json", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Mobile sync draft.json",
      content: Buffer.from(JSON.stringify(mergedDraft, null, 2)).toString("base64")
    })
  });

  await fetch("https://api.github.com/repos/valorwave/site/contents/publish.json", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Mobile sync publish.json",
      content: Buffer.from(JSON.stringify(mergedPublish, null, 2)).toString("base64")
    })
  });
}