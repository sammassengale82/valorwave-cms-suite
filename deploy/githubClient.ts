import { Octokit } from "@octokit/rest";
import config from "./config.json";

export function createGitHubClient(token: string) {
  return new Octokit({
    auth: token,
    userAgent: "ValorWave-Deployer"
  });
}

export async function commitFile(
  client: any,
  branch: string,
  path: string,
  content: string,
  message: string
) {
  const { repoOwner, repoName } = config;

  const { data: ref } = await client.git.getRef({
    owner: repoOwner,
    repo: repoName,
    ref: `heads/${branch}`
  });

  const shaLatest = ref.object.sha;

  const blob = await client.git.createBlob({
    owner: repoOwner,
    repo: repoName,
    content: Buffer.from(content).toString("base64"),
    encoding: "base64"
  });

  const tree = await client.git.createTree({
    owner: repoOwner,
    repo: repoName,
    base_tree: shaLatest,
    tree: [
      {
        path,
        mode: "100644",
        type: "blob",
        sha: blob.data.sha
      }
    ]
  });

  const commit = await client.git.createCommit({
    owner: repoOwner,
    repo: repoName,
    message,
    tree: tree.data.sha,
    parents: [shaLatest],
    author: config.commitAuthor
  });

  await client.git.updateRef({
    owner: repoOwner,
    repo: repoName,
    ref: `heads/${branch}`,
    sha: commit.data.sha,
    force: true
  });
}