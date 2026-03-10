import { createGitHubClient, commitFile } from "./githubClient";
import { loadDraftFiles } from "./syncDraft";
import config from "./config.json";

export async function publishDraft(token: string) {
  const client = createGitHubClient(token);
  const files = loadDraftFiles();

  for (const file of files) {
    await commitFile(
      client,
      config.branchPublish,
      file.path,
      file.content,
      `Publish: ${file.path}`
    );
  }
}